/**
 * Shrinks the raw Sketchfab phone .glb (33 MB) into something a web page can
 * actually load.
 *
 * Nearly all of the weight is textures: three 4096x4096 PNGs plus a handful of
 * 2048s. gltf-transform's built-in `optimize --texture-compress` fails on these
 * particular PNGs (sharp errors with "colourspace: parameter space not set",
 * since Sketchfab exported them without a declared color space), so we resize
 * and re-encode each texture by hand, forcing sRGB before writing WebP.
 *
 * Geometry is only ~280 KB and already cheap, so we leave it uncompressed
 * rather than adding a Draco decoder to the client bundle for no real gain.
 *
 * Run: node scripts/optimize-model.mjs
 */
import { NodeIO } from '@gltf-transform/core';
import { dedup, prune, weld } from '@gltf-transform/functions';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets/phone-raw.glb');
const DST = path.join(root, 'public/models/phone.glb');

// The screen texture stays sharper than the body maps: it sits flat-on to the
// camera for most of the scroll, where softness is obvious. Body normal/ORM
// maps are only ever seen at a glancing angle on the phone's edges.
const SIZE_BY_SLOT = {
  emissiveTexture: 1024,
  baseColorTexture: 1024,
  normalTexture: 512,
  metallicRoughnessTexture: 512,
  occlusionTexture: 512,
};

const io = new NodeIO();
const doc = await io.read(SRC);

await doc.transform(weld(), dedup(), prune());

const textures = doc.getRoot().listTextures();
let before = 0;
let after = 0;

for (const texture of textures) {
  const image = texture.getImage();
  if (!image) continue;
  before += image.byteLength;

  // A texture can fill more than one slot (e.g. occlusion + metallicRoughness
  // packed into one map); size to the largest requirement among them.
  const slots = listSlots(doc, texture);
  const size = Math.max(...slots.map((s) => SIZE_BY_SLOT[s] ?? 512));

  const encoded = await sharp(Buffer.from(image))
    // Force a known color space — this is the step the built-in pipeline skips.
    .toColourspace('srgb')
    .resize(size, size, { fit: 'fill' })
    .webp({ quality: 88, effort: 6 })
    .toBuffer();

  texture.setImage(new Uint8Array(encoded)).setMimeType('image/webp');
  after += encoded.byteLength;

  console.log(
    `  ${slots.join(', ') || 'unused'} -> ${size}px webp  ` +
      `${mb(image.byteLength)} -> ${mb(encoded.byteLength)}`
  );
}

await io.write(DST, doc);

console.log(`\ntextures: ${mb(before)} -> ${mb(after)}`);
console.log(`written:  ${DST}`);

/** Material slots (baseColorTexture, normalTexture, ...) a texture is bound to. */
function listSlots(doc, texture) {
  const slots = new Set();
  for (const material of doc.getRoot().listMaterials()) {
    for (const slot of [
      'baseColorTexture',
      'normalTexture',
      'metallicRoughnessTexture',
      'occlusionTexture',
      'emissiveTexture',
    ]) {
      const getter = `get${slot[0].toUpperCase()}${slot.slice(1)}`;
      if (material[getter]?.() === texture) slots.add(slot);
    }
  }
  return [...slots];
}

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
