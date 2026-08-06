/**
 * Finds the phone's screen rectangle in world space.
 *
 * The "Emission" mesh is not a flat quad — it wraps the bezel — so we can't
 * just take its bounding box. Instead we group its triangles by normal
 * direction, total the area per group, and report the largest front-facing
 * planar cluster. That cluster is the screen, and its extent gives us exactly
 * where to float the app-screenshot plane.
 *
 * Everything is reported in world space (after the full node transform chain),
 * which is the space the R3F component works in.
 *
 * Run: node scripts/find-screen-rect.mjs
 */
import { NodeIO } from '@gltf-transform/core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = await new NodeIO().read(path.join(root, 'public/models/phone.glb'));

const target = doc
  .getRoot()
  .listNodes()
  .find((n) => n.getMesh()?.getName() === 'MobilePhone_Phone_Emission_0');

const matrix = worldMatrix(target);
const prim = target.getMesh().listPrimitives()[0];
const pos = prim.getAttribute('POSITION');
const idx = prim.getIndices();

// Bucket triangles by quantised normal, accumulating area and extent.
const groups = new Map();
const count = idx ? idx.getCount() : pos.getCount();

for (let i = 0; i < count; i += 3) {
  const tri = [0, 1, 2].map((k) => {
    const v = pos.getElement(idx ? idx.getScalar(i + k) : i + k, []);
    return apply(matrix, v);
  });

  const n = normal(tri);
  const a = area(tri);
  const key = n.map((c) => Math.round(c * 8) / 8).join(',');

  let g = groups.get(key);
  if (!g) {
    g = { normal: n, area: 0, tris: 0, min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
    groups.set(key, g);
  }
  g.area += a;
  g.tris++;
  for (const v of tri) {
    for (let d = 0; d < 3; d++) {
      g.min[d] = Math.min(g.min[d], v[d]);
      g.max[d] = Math.max(g.max[d], v[d]);
    }
  }
}

const sorted = [...groups.values()].sort((a, b) => b.area - a.area);

console.log('Planar clusters of the Emission mesh, largest first (world space):\n');
for (const g of sorted.slice(0, 6)) {
  const size = g.max.map((m, d) => m - g.min[d]);
  console.log(
    `normal ${fmt(g.normal)}  area=${g.area.toExponential(3)}  tris=${g.tris}\n` +
      `  min  ${fmt(g.min)}\n  max  ${fmt(g.max)}\n` +
      `  size ${fmt(size)}   aspect(w/h)=${(size[0] / size[1]).toFixed(4)}\n`
  );
}

function worldMatrix(node) {
  // Walk up to the scene root, composing parent transforms.
  const chain = [];
  for (let n = node; n; n = n.getParentNode?.()) chain.unshift(n);
  let m = identity();
  for (const n of chain) m = multiply(m, trs(n.getTranslation(), n.getRotation(), n.getScale()));
  return m;
}

function trs([tx, ty, tz], [qx, qy, qz, qw], [sx, sy, sz]) {
  const x2 = qx + qx, y2 = qy + qy, z2 = qz + qz;
  const xx = qx * x2, xy = qx * y2, xz = qx * z2;
  const yy = qy * y2, yz = qy * z2, zz = qz * z2;
  const wx = qw * x2, wy = qw * y2, wz = qw * z2;
  // Column-major, matching glTF.
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    tx, ty, tz, 1,
  ];
}

function identity() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      for (let k = 0; k < 4; k++) out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return out;
}

function apply(m, [x, y, z]) {
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

function normal([a, b, c]) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const len = Math.hypot(...n) || 1;
  return n.map((c) => c / len);
}

function area([a, b, c]) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  return Math.hypot(...n) / 2;
}

function fmt(a) {
  return `[${a.map((n) => n.toFixed(6).padStart(10)).join(', ')}]`;
}
