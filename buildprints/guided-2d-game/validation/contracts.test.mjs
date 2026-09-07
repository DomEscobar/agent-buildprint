import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
import { loadManifest, validateManifest, acceptPlacementProposal, opaqueBounds, sha256 } from './contracts.mjs';
import { loadNodeManifest } from './load-node.mjs';
import { decodePng, crc32 } from './png.mjs';
const fixtureDir = fileURLToPath(new URL('./fixtures/', import.meta.url));
const fixture = path.join(fixtureDir, 'manifest.json');
const bytes = await readFile(fixture);
const base = JSON.parse(bytes);
const png = await readFile(path.join(fixtureDir, base.assets[0].path));
const load = (m) => loadManifest(new TextEncoder().encode(JSON.stringify(m)), async () => png, decodePng);
const a = (m) => m.assets[0], s = (m) => m.scenes[0];

test('actual on-disk manifest and PNG load, validate, freeze and report exact consumed hashes', async () => {
  const loaded = await loadNodeManifest(fixture);
  assert.equal(loaded.receipt.manifestSha256, await sha256(bytes));
  assert.equal(loaded.receipt.assetSha256['fixture-body'], await sha256(png));
  assert.equal(loaded.receipt.scenes[0].placements, 3);
  assert.ok(loaded.receipt.scenes[0].reachableCells > 20);
  assert.ok(Object.isFrozen(loaded.manifest.scenes[0].placements));
  assert.throws(() => { loaded.manifest.assets[0].scale = 7; }, TypeError);
});

test('opaque threshold ignores low-alpha shadow but preserves legitimate opaque black outline', () => {
  const image = decodePng(png), frame = base.assets[0].frames[0];
  assert.deepEqual(opaqueBounds(image, frame.source, 128), frame.opaqueBounds);
  const black = (3 * image.width + 4) * 4;
  assert.deepEqual([...image.rgba.slice(black, black + 4)], [0, 0, 0, 255]);
  assert.equal(opaqueBounds(image, frame.source, 1).h, 12);
});

test('shared intentional displacement accepted, never normalized away', async () => {
  const m = structuredClone(base);
  a(m).frames[1].offset = [0, -3]; a(m).frames[1].offsetReason = 'intentional hop apex, visual-only fixture';
  const loaded = await load(m);
  assert.deepEqual(loaded.manifest.assets[0].frames[1].offset, [0, -3]);
});

const negatives = [
  ['schema', (m) => { m.schema = 'other'; }, /schema/],
  ['nonfinite units', (m) => { m.pixelsPerWorldUnit = null; }, /world units/],
  ['duplicate asset', (m) => m.assets.push(structuredClone(a(m))), /duplicate/],
  ['empty scenes', (m) => { m.scenes = []; }, /must not be empty/],
  ['dimensions', (m) => { a(m).width++; }, /dimensions/],
  ['wrong bytes hash', (m) => { a(m).sha256 = '0'.repeat(64); }, /hash mismatch/],
  ['provenance', (m) => { a(m).provenance.license = ''; }, /provenance/],
  ['identity drift', (m) => { a(m).animationSeedSha256 = '0'.repeat(64); }, /identity lock/],
  ['frame count', (m) => a(m).frames.pop(), /frame count/],
  ['out-of-bounds rect', (m) => { a(m).frames[0].source.x = 31; }, /source rect/],
  ['fractional rect', (m) => { a(m).frames[0].source.x = .5; }, /source rect/],
  ['sheet gutter', (m) => { a(m).sheet.gutter = 1; }, /sheet dimensions/],
  ['frame timing', (m) => { a(m).frames[0].durationMs = 0; }, /timing/],
  ['per-frame rescale', (m) => { a(m).frames[0].scale = 2; }, /per-frame scale/],
  ['per-frame anchor', (m) => { a(m).frames[0].anchor = [1, 2]; }, /per-frame scale\/anchor/],
  ['unexplained jump', (m) => { a(m).frames[1].offset = [0, -3]; }, /displacement/],
  ['alpha threshold', (m) => { a(m).alphaThreshold = 0; }, /threshold/],
  ['declared opaque bounds', (m) => { a(m).frames[0].opaqueBounds.h++; }, /opaque bounds/],
  ['density drift', (m) => { a(m).scale = 2; }, /density/],
  ['missing attack phases', (m) => { a(m).action = 'attack'; }, /anticipation-active-recovery/],
  ['unknown layer', (m) => { s(m).placements[0].layer = 'missing'; }, /unknown asset\/layer/],
  ['unknown asset', (m) => { s(m).placements[0].asset = 'missing'; }, /unknown asset\/layer/],
  ['duplicate placement', (m) => s(m).placements.push(structuredClone(s(m).placements[0])), /duplicate/],
  ['nonfinite feet', (m) => { s(m).placements[0].feet[0] = null; }, /feet/],
  ['negative footprint', (m) => { a(m).footprint.w = -1; }, /footprint/],
  ['canopy not footprint', (m) => { a(m).role = 'shadow'; }, /only body assets/],
  ['footprint bounds', (m) => { s(m).placements[0].feet = [0, 0]; }, /footprint outside/],
  ['visual overscan', (m) => { s(m).visualOverscan = 0; s(m).placements[0].feet = [2.5, .3]; }, /visual bounds/],
  ['terrain permission', (m) => { s(m).terrain[2][2] = 'water'; }, /terrain forbidden/],
  ['terrain rows', (m) => s(m).terrain[0].pop(), /terrain grid/],
  ['occupancy', (m) => { s(m).placements[1].feet = s(m).placements[0].feet; }, /occupancy overlap/],
  ['scene spacing', (m) => { s(m).spacing[0].min = 2.1; }, /spacing violated/],
  ['scene adjacency', (m) => { s(m).adjacency[0].max = .5; }, /adjacency missing/],
  ['blocked spawn', (m) => { s(m).navigation.spawn = [2, 2]; }, /spawn blocked/],
  ['disconnected goal', (m) => { s(m).terrain[1] = Array(6).fill('water'); }, /disconnected/],
  ['actor clearance', (m) => { s(m).navigation.footprint = { x: -.6, y: -.6, w: 1.2, h: 1.2 }; }, /spawn blocked/],
  ['out-of-range target', (m) => { s(m).navigation.required = [[6, 4]]; }, /outside bounds/],
  ['unsafe URL', (m) => { a(m).path = 'https://example.invalid/image.png'; }, /local, relative/],
  ['path traversal', (m) => { a(m).path = '../image.png'; }, /local, relative/],
  ['query URL', (m) => { a(m).path = 'image.png?secret=forbidden'; }, /local, relative/],
];
for (const [name, mutate, error] of negatives) test(`production load rejects ${name}`, async () => {
  const m = structuredClone(base); mutate(m); await assert.rejects(load(m), error);
});

test('manual and generated placement proposals use the identical validator', async () => {
  const loaded = await loadNodeManifest(fixture);
  const invalid = structuredClone(base); s(invalid).placements[0].feet = [-1, -1];
  // Producers differ; acceptance intentionally does not.
  for (const producer of ['manual', 'generated']) {
    assert.throws(() => acceptPlacementProposal(invalid, loaded.decoded), /outside bounds/, producer);
    assert.deepEqual(acceptPlacementProposal(base, loaded.decoded), loaded.manifest, producer);
  }
});

test('per-layer overlap exception is explicit, not a global collision bypass', async () => {
  const m = structuredClone(base); s(m).placements[2].feet = [...s(m).placements[0].feet];
  await load(m); // solid/decor overlap explicitly permitted
  s(m).allowOverlap = [];
  await assert.rejects(load(m), /occupancy overlap/);
});

test('all footprint-touched terrain cells validated, not feet alone', async () => {
  const m = structuredClone(base); s(m).placements[0].feet = [2.9, 2.5]; s(m).terrain[2][3] = 'water';
  await assert.rejects(load(m), /terrain forbidden/);
});

test('swept navigation rejects thin blockers between otherwise walkable centers', async () => {
  const m = structuredClone(base);
  a(m).footprint = { x: -.05, y: -2.5, w: .1, h: 5 };
  s(m).placements = [{ id: 'thin-wall', asset: a(m).id, feet: [3, 2.5], layer: 'solid', tags: [] }];
  s(m).spacing = []; s(m).adjacency = [];
  await assert.rejects(load(m), /disconnected/);
});

test('on-disk loader rejects actual altered manifest, image corruption, missing file and symlink escape', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'guided-contract-'));
  try {
    const manifest = path.join(dir, 'manifest.json'), asset = path.join(dir, a(base).path);
    await writeFile(manifest, bytes); await writeFile(asset, png);
    await loadNodeManifest(manifest);
    const changed = structuredClone(base); a(changed).frames[0].source.w = 99;
    await writeFile(manifest, JSON.stringify(changed));
    await assert.rejects(loadNodeManifest(manifest), /source rect/);
    await writeFile(manifest, bytes);
    const corrupt = Buffer.from(png); corrupt[corrupt.length - 1] ^= 1;
    await writeFile(asset, corrupt); await assert.rejects(loadNodeManifest(manifest), /PNG: CRC/);
    await rm(asset); await assert.rejects(loadNodeManifest(manifest), /ENOENT/);
    await symlink(path.join(fixtureDir, a(base).path), asset);
    await assert.rejects(loadNodeManifest(manifest), /symlink escapes/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

function chunk(type, body) {
  const name = Buffer.from(type), header = Buffer.alloc(4), crc = Buffer.alloc(4);
  header.writeUInt32BE(body.length); crc.writeUInt32BE(crc32(Buffer.concat([name, body])));
  return Buffer.concat([header, name, body, crc]);
}
function encoded(filter, colorType = 6, interlace = 0) {
  const width = 3, height = 3, stride = width * 4;
  const rgba = Buffer.from(Array.from({ length: width * height * 4 }, (_, i) => (i * 71) % 256));
  const raw = Buffer.alloc((stride + 1) * height);
  const paeth = (a, b, c) => {
    const p = a + b - c, d = [Math.abs(p - a), Math.abs(p - b), Math.abs(p - c)];
    return [a, b, c][d.indexOf(Math.min(...d))];
  };
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = filter;
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x, l = x >= 4 ? rgba[i - 4] : 0, u = y ? rgba[i - stride] : 0, c = y && x >= 4 ? rgba[i - stride - 4] : 0;
      const prediction = [0, l, u, Math.floor((l + u) / 2), paeth(l, u, c)][filter] ?? 0;
      raw[y * (stride + 1) + x + 1] = (rgba[i] - prediction + 256) % 256;
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = colorType; ihdr[12] = interlace;
  return { rgba, png: Buffer.concat([png.subarray(0, 8), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]) };
}
for (let filter = 0; filter <= 4; filter++) test(`PNG filter ${filter} decodes exact pixels`, () => {
  const sample = encoded(filter); assert.deepEqual(Buffer.from(decodePng(sample.png).rgba), sample.rgba);
});
test('decoder explicitly rejects unsupported format, malformed filter and truncation', () => {
  assert.throws(() => decodePng(encoded(0, 2).png), /RGBA8/);
  assert.throws(() => decodePng(encoded(0, 6, 1).png), /RGBA8/);
  assert.throws(() => decodePng(encoded(5).png), /filter/);
  assert.throws(() => decodePng(png.subarray(0, -2)), /chunk/);
});

test('valid ordered attack accepted; reversed phase order rejected using real decoded cells', async () => {
  const m = structuredClone(base);
  // Use a real 3-cell encoded PNG so the action test never invents decoded pixels.
  const image = encoded(0), decoded = decodePng(image.png), digest = await sha256(image.png);
  const asset = a(m);
  Object.assign(asset, { width: 3, height: 3, sha256: digest, action: 'attack', anchor: [0, 1],
    sheet: { cellWidth: 1, cellHeight: 3, columns: 3, rows: 1, count: 3, margin: 0, gutter: 0 } });
  asset.frames = ['anticipation', 'active', 'recovery'].map((phase, x) => {
    const source = { x, y: 0, w: 1, h: 3 };
    return { source, phase, durationMs: 100, offset: [0, 0], opaqueBounds: opaqueBounds(decoded, source, 128) };
  });
  const resources = new Map([[asset.id, { ...decoded, sha256: digest }]]);
  validateManifest(m, resources);
  asset.frames[0].phase = 'recovery'; assert.throws(() => validateManifest(m, resources), /anticipation-active-recovery/);
});
