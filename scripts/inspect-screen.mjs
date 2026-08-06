/**
 * One-off probe: prints the node hierarchy, per-mesh local bounds, and the
 * world transform chain, so we know exactly where the screen sits in the
 * phone model's local space and how to align a screenshot plane to it.
 *
 * Run: node scripts/inspect-screen.mjs
 */
import { NodeIO } from '@gltf-transform/core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = await new NodeIO().read(path.join(root, 'public/models/phone.glb'));

for (const node of doc.getRoot().listNodes()) {
  const mesh = node.getMesh();
  console.log(
    `node "${node.getName()}"  t=${fmt(node.getTranslation())} ` +
      `r=${fmt(node.getRotation())} s=${fmt(node.getScale())}` +
      (mesh ? `  mesh="${mesh.getName()}"` : '')
  );
}

console.log('\n--- mesh bounds (local) ---');
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION');
    console.log(
      `${mesh.getName()}\n  min=${fmt(pos.getMin([]))}  max=${fmt(pos.getMax([]))}` +
        `\n  uvSets=${prim.listSemantics().filter((s) => s.startsWith('TEXCOORD')).join(',')}` +
        `\n  material="${prim.getMaterial()?.getName()}"`
    );
  }
}

function fmt(a) {
  return `[${a.map((n) => n.toFixed(5)).join(', ')}]`;
}
