// Original packet code. Shared by Node checks, editors and the production loader.
const fail = (message) => { throw new Error(message); };
const requireThat = (value, message) => { if (!value) fail(message); };
const finite = (n) => typeof n === 'number' && Number.isFinite(n);
const positive = (n) => finite(n) && n > 0;
const integer = (n) => Number.isInteger(n) && n >= 0;
const pair = (v) => Array.isArray(v) && v.length === 2 && v.every(finite);
const hash = (v) => typeof v === 'string' && /^[a-f0-9]{64}$/.test(v);
const text = (v) => typeof v === 'string' && v.trim().length > 0;
const list = (v) => Array.isArray(v) && v.every(text);
const close = (a, b) => Math.abs(a - b) < 1e-8;
const rect = (r) => r && finite(r.x) && finite(r.y) && positive(r.w) && positive(r.h);
const inside = (a, b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const translated = (r, x, y) => ({ ...r, x: r.x + x, y: r.y + y });
const sameRect = (a, b) => rect(a) && rect(b) && ['x', 'y', 'w', 'h'].every((k) => a[k] === b[k]);
function unique(items, label) {
  requireThat(Array.isArray(items), `${label}: expected array`);
  const ids = items.map((v) => v.id);
  requireThat(ids.every(text) && new Set(ids).size === ids.length, `${label}: duplicate/empty ID`);
}
export function safeAssetPath(value) {
  requireThat(typeof value === 'string' && /^(?:[\w-]+\/)*[\w.-]+$/.test(value) &&
    !value.split('/').some((v) => v === '.' || v === '..'), 'asset path must be local, relative and token-free');
  return value;
}
export async function sha256(bytes) {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (v) => v.toString(16).padStart(2, '0')).join('');
}
export function opaqueBounds(image, source, threshold) {
  let left = source.w, top = source.h, right = -1, bottom = -1;
  for (let y = 0; y < source.h; y++) for (let x = 0; x < source.w; x++) {
    const alpha = image.rgba[((source.y + y) * image.width + source.x + x) * 4 + 3];
    if (alpha >= threshold) {
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  return right < 0 ? null : { x: left, y: top, w: right - left + 1, h: bottom - top + 1 };
}
function validateAsset(a, image, manifest) {
  safeAssetPath(a.path);
  requireThat(image && integer(image.width) && integer(image.height) && image.rgba?.length === image.width * image.height * 4,
    `${a.id}: decoded RGBA data missing`);
  requireThat(a.width === image.width && a.height === image.height && positive(a.width) && positive(a.height), `${a.id}: dimensions mismatch`);
  requireThat(hash(a.sha256) && a.sha256 === image.sha256, `${a.id}: byte hash mismatch`);
  requireThat(['body', 'shadow', 'vfx', 'tile'].includes(a.role), `${a.id}: invalid role`);
  requireThat(positive(a.scale) && positive(a.nativePixelsPerWorldUnit) &&
    close(a.nativePixelsPerWorldUnit / a.scale, manifest.pixelsPerWorldUnit), `${a.id}: density mismatch`);
  requireThat(integer(a.alphaThreshold) && a.alphaThreshold > 0 && a.alphaThreshold <= 255, `${a.id}: alpha threshold invalid`);
  requireThat(a.provenance && text(a.provenance.source) && text(a.provenance.license) && text(a.provenance.approval) &&
    hash(a.provenance.seedSha256), `${a.id}: provenance/seed approval missing`);
  const s = a.sheet;
  requireThat(s && [s.cellWidth, s.cellHeight, s.columns, s.rows, s.count].every((n) => integer(n) && n > 0) &&
    integer(s.margin) && integer(s.gutter) && s.count <= s.columns * s.rows, `${a.id}: sheet layout invalid`);
  requireThat(a.width === 2 * s.margin + s.columns * s.cellWidth + (s.columns - 1) * s.gutter &&
    a.height === 2 * s.margin + s.rows * s.cellHeight + (s.rows - 1) * s.gutter, `${a.id}: sheet dimensions invalid`);
  requireThat(pair(a.anchor) && a.anchor[0] >= 0 && a.anchor[0] <= s.cellWidth && a.anchor[1] >= 0 &&
    a.anchor[1] <= s.cellHeight, `${a.id}: shared anchor invalid`);
  requireThat(Array.isArray(a.frames) && a.frames.length === s.count, `${a.id}: frame count mismatch`);
  requireThat(text(a.facing) && hash(a.animationSeedSha256) && a.animationSeedSha256 === a.provenance.seedSha256,
    `${a.id}: source identity lock mismatch`);
  requireThat(a.role !== 'body' || rect(a.footprint), `${a.id}: physical footprint missing`);
  a.frames.forEach((f, i) => {
    const expected = { x: s.margin + (i % s.columns) * (s.cellWidth + s.gutter),
      y: s.margin + Math.floor(i / s.columns) * (s.cellHeight + s.gutter), w: s.cellWidth, h: s.cellHeight };
    requireThat(sameRect(f.source, expected) && inside(f.source, { x: 0, y: 0, w: a.width, h: a.height }),
      `${a.id}: frame ${i} source rect/layout invalid`);
    requireThat(positive(f.durationMs), `${a.id}: frame ${i} timing invalid`);
    requireThat(!('scale' in f) && !('anchor' in f), `${a.id}: per-frame scale/anchor forbidden`);
    requireThat(pair(f.offset) && ((f.offset[0] === 0 && f.offset[1] === 0) || text(f.offsetReason)),
      `${a.id}: intentional displacement needs reason`);
    requireThat(sameRect(f.opaqueBounds, opaqueBounds(image, f.source, a.alphaThreshold)),
      `${a.id}: frame ${i} opaque bounds mismatch or empty`);
    requireThat(['idle', 'move', 'anticipation', 'active', 'recovery', 'hurt', 'other'].includes(f.phase),
      `${a.id}: frame ${i} phase missing`);
  });
  if (a.action === 'attack') {
    const phases = a.frames.map((f) => f.phase);
    requireThat(/^anticipation(?:,anticipation)*,active(?:,active)*,recovery(?:,recovery)*$/.test(phases.join(',')),
      `${a.id}: attack needs ordered anticipation-active-recovery`);
  }
}
function cells(r, scene, tile) {
  const b = scene.bounds;
  const out = [];
  // Half-open footprints: an exact tile edge does not occupy the neighboring tile.
  for (let y = Math.floor((r.y - b.y) / tile); y < Math.ceil((r.y + r.h - b.y) / tile); y++)
    for (let x = Math.floor((r.x - b.x) / tile); x < Math.ceil((r.x + r.w - b.x) / tile); x++) out.push([x, y]);
  return out;
}
export function validateScene(scene, assets, manifest) {
  const tile = manifest.tileWorldSize;
  requireThat(rect(scene.bounds) && close(scene.bounds.w / tile, Math.round(scene.bounds.w / tile)) &&
    close(scene.bounds.h / tile, Math.round(scene.bounds.h / tile)), `${scene.id}: bounds must be whole tiles`);
  const width = Math.round(scene.bounds.w / tile), height = Math.round(scene.bounds.h / tile);
  requireThat(list(scene.terrainTypes) && scene.terrainTypes.length > 0 && Array.isArray(scene.terrain) &&
    scene.terrain.length === height && scene.terrain.every((row) => Array.isArray(row) && row.length === width &&
      row.every((v) => scene.terrainTypes.includes(v))), `${scene.id}: terrain grid invalid`);
  requireThat(scene.layers && Object.keys(scene.layers).length > 0 && Object.values(scene.layers).every((l) =>
    typeof l.blocking === 'boolean' && ['feet-y', 'fixed'].includes(l.sort)), `${scene.id}: layers/sorting invalid`);
  requireThat(Array.isArray(scene.allowOverlap) && scene.allowOverlap.every((v) =>
    Array.isArray(v) && v.length === 2 && v.every((l) => Object.hasOwn(scene.layers, l))), `${scene.id}: overlap policy invalid`);
  requireThat(finite(scene.visualOverscan) && scene.visualOverscan >= 0, `${scene.id}: visual overscan invalid`);
  unique(scene.placements, `${scene.id} placements`);
  const bodies = scene.placements.map((p) => {
    const a = assets.get(p.asset);
    requireThat(a && pair(p.feet) && Object.hasOwn(scene.layers, p.layer) && list(p.tags), `${scene.id}/${p.id}: unknown asset/layer or feet/tags invalid`);
    requireThat(a.role === 'body' && rect(a.footprint), `${p.id}: only body assets occupy footprints; split shadow/VFX`);
    requireThat(list(a.allowedTerrain) && a.allowedTerrain.length > 0 && a.allowedTerrain.every((v) => scene.terrainTypes.includes(v)), `${p.id}: terrain permissions invalid`);
    const body = translated(a.footprint, ...p.feet);
    requireThat(inside(body, scene.bounds), `${p.id}: footprint outside bounds`);
    requireThat(cells(body, scene, tile).every(([x, y]) => a.allowedTerrain.includes(scene.terrain[y]?.[x])), `${p.id}: terrain forbidden`);
    const overscan = scene.visualOverscan, b = scene.bounds;
    const visualLimit = { x: b.x - overscan, y: b.y - overscan, w: b.w + 2 * overscan, h: b.h + 2 * overscan };
    for (const frame of a.frames) {
      const v = frame.opaqueBounds, factor = a.scale / manifest.pixelsPerWorldUnit;
      const visual = { x: p.feet[0] + (v.x - a.anchor[0] + frame.offset[0]) * factor,
        y: p.feet[1] + (v.y - a.anchor[1] + frame.offset[1]) * factor, w: v.w * factor, h: v.h * factor };
      requireThat(inside(visual, visualLimit), `${p.id}: visual bounds outside declared overscan`);
    }
    return { placement: p, body };
  });
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
    const a = bodies[i], b = bodies[j];
    const allowed = scene.allowOverlap.some(([x, y]) => (a.placement.layer === x && b.placement.layer === y) ||
      (a.placement.layer === y && b.placement.layer === x));
    requireThat(allowed || !overlaps(a.body, b.body), `${a.placement.id}/${b.placement.id}: occupancy overlap`);
  }
  requireThat(Array.isArray(scene.spacing) && Array.isArray(scene.adjacency), `${scene.id}: spacing/adjacency policies missing`);
  const distance = (a, b) => Math.hypot(a.feet[0] - b.feet[0], a.feet[1] - b.feet[1]);
  for (const rule of scene.spacing) {
    requireThat(text(rule.a) && text(rule.b) && finite(rule.min) && rule.min >= 0, `${scene.id}: spacing rule invalid`);
    for (const a of scene.placements.filter((p) => p.tags.includes(rule.a)))
      for (const b of scene.placements.filter((p) => p.id !== a.id && p.tags.includes(rule.b)))
        requireThat(distance(a, b) >= rule.min, `${a.id}/${b.id}: spacing violated`);
  }
  for (const rule of scene.adjacency) {
    requireThat(text(rule.from) && text(rule.to) && finite(rule.max) && rule.max >= 0, `${scene.id}: adjacency rule invalid`);
    for (const a of scene.placements.filter((p) => p.tags.includes(rule.from)))
      requireThat(scene.placements.some((b) => a.id !== b.id && b.tags.includes(rule.to) && distance(a, b) <= rule.max), `${a.id}: adjacency missing`);
  }
  const nav = scene.navigation;
  requireThat(nav && rect(nav.footprint) && list(nav.allowedTerrain) && nav.allowedTerrain.length > 0 &&
    nav.allowedTerrain.every((v) => scene.terrainTypes.includes(v)), `${scene.id}: navigation footprint/terrain invalid`);
  requireThat(Array.isArray(nav.required) && nav.required.length > 0, `${scene.id}: required route missing`);
  const validCell = (c) => pair(c) && c.every(integer) && c[0] < width && c[1] < height;
  requireThat(validCell(nav.spawn) && nav.required.every(validCell), `${scene.id}: navigation cell outside bounds`);
  const walkable = (x, y) => {
    const body = translated(nav.footprint, scene.bounds.x + (x + 0.5) * tile, scene.bounds.y + (y + 0.5) * tile);
    return x >= 0 && y >= 0 && x < width && y < height && inside(body, scene.bounds) &&
      cells(body, scene, tile).every(([cx, cy]) => nav.allowedTerrain.includes(scene.terrain[cy]?.[cx])) &&
      !bodies.some((b) => scene.layers[b.placement.layer].blocking && overlaps(body, b.body));
  };
  requireThat(walkable(...nav.spawn), `${scene.id}: spawn blocked`);
  const queue = [nav.spawn], seen = new Set([nav.spawn.join(',')]);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      const key = `${nx},${ny}`;
      if (!seen.has(key) && walkable(nx, ny)) {
        // Sweep between centers, not just endpoint occupancy (thin obstacles matter).
        const from = translated(nav.footprint, scene.bounds.x + (x + 0.5) * tile, scene.bounds.y + (y + 0.5) * tile);
        const sweep = { x: Math.min(from.x, from.x + (nx - x) * tile), y: Math.min(from.y, from.y + (ny - y) * tile),
          w: from.w + Math.abs(nx - x) * tile, h: from.h + Math.abs(ny - y) * tile };
        if (!cells(sweep, scene, tile).every(([cx, cy]) => nav.allowedTerrain.includes(scene.terrain[cy]?.[cx])) ||
          bodies.some((b) => scene.layers[b.placement.layer].blocking && overlaps(sweep, b.body))) continue;
        seen.add(key); queue.push([nx, ny]);
      }
    }
  }
  requireThat(nav.required.every((c) => seen.has(c.join(','))), `${scene.id}: required route disconnected`);
  return { id: scene.id, reachableCells: seen.size, placements: bodies.length };
}
export function validateManifest(manifest, decoded) {
  requireThat(manifest.schema === 'guided-2d-game/manifest/v1', 'manifest schema unsupported');
  requireThat(positive(manifest.pixelsPerWorldUnit) && positive(manifest.tileWorldSize), 'world units invalid');
  unique(manifest.assets, 'assets'); unique(manifest.scenes, 'scenes');
  requireThat(manifest.assets.length > 0 && manifest.scenes.length > 0, 'assets/scenes must not be empty');
  for (const a of manifest.assets) validateAsset(a, decoded.get(a.id), manifest);
  const assets = new Map(manifest.assets.map((a) => [a.id, a]));
  return manifest.scenes.map((s) => validateScene(s, assets, manifest));
}
export function freezeContract(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeContract); Object.freeze(value);
  }
  return value;
}
// Both a manual editor and generator pass their proposed manifest through this seam.
export function acceptPlacementProposal(manifest, decoded) {
  const result = structuredClone(manifest);
  validateManifest(result, decoded);
  return freezeContract(result);
}
export async function loadManifest(manifestBytes, readAssetBytes, decodeImage) {
  const manifest = JSON.parse(new TextDecoder().decode(manifestBytes));
  requireThat(Array.isArray(manifest.assets), 'manifest assets missing');
  const decoded = new Map();
  for (const a of manifest.assets) {
    const bytes = await readAssetBytes(safeAssetPath(a.path));
    const image = await decodeImage(bytes);
    decoded.set(a.id, { ...image, sha256: await sha256(bytes) });
  }
  const scenes = validateManifest(manifest, decoded);
  // Keep decoded resources private to the runtime; do not re-fetch images after validation.
  return { manifest: freezeContract(manifest), decoded, receipt: freezeContract({
    manifestSha256: await sha256(manifestBytes), assetSha256: Object.fromEntries([...decoded].map(([id, image]) => [id, image.sha256])), scenes
  }) };
}
