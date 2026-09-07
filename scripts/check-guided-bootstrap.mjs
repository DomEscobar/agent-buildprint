// Regression: bootstrap the actual packet, not a parallel hand-maintained fixture.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packet = path.join(repo, 'buildprints/guided-2d-game');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guided-bootstrap-'));
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
try {
  const files = walk(packet);
  const manifest = path.join(tmp, 'package.json'), target = path.join(tmp, 'target');
  fs.writeFileSync(manifest, JSON.stringify({ slug: 'guided-2d-game', files: files.map((f) =>
    ({ path: path.relative(packet, f), rawUrl: pathToFileURL(f).href })) }));
  execFileSync(process.execPath, [path.join(repo, 'bin/agb.js'), 'start', manifest, target], { stdio: 'pipe' });
  const snapshot = path.join(target, '.buildprint/snapshots');
  for (const file of files) assert.deepEqual(fs.readFileSync(path.join(snapshot, path.relative(packet, file))), fs.readFileSync(file));
  execFileSync(process.execPath, [path.join(snapshot, 'validation/check.mjs'), path.join(snapshot, 'validation/fixtures/manifest.json')], { stdio: 'pipe' });
  assert.ok(fs.existsSync(path.join(target, '.buildprint/next-agent.md')));
  console.log(`Guided bootstrap: PASS (${files.length} byte-exact files, decoded PNG, continuation created)`);
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
