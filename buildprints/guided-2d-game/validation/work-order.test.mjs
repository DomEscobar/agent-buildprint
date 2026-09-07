// Offline packet regressions: independent art entry, convergent proof, real bootstrap.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const packet = fileURLToPath(new URL('../', import.meta.url));
const repo = path.resolve(packet, '../..');
const read = (file) => fs.readFileSync(path.join(packet, file), 'utf8');
const index = read('loops/loop-index.yaml');
const loops = [...index.matchAll(/  - loop_id: ([\w-]+)\n    file: ([^\n]+)\n    status: included\n    depends_on: \[([^\]]*)\]/g)].map((m) => ({ id: m[1], file: m[2], deps: m[3].split(',').map(s => s.trim()).filter(Boolean) }));

test('gameplay and art have independent entry points; integration joins all proof', () => {
  assert.equal(loops.length, 5);
  assert.deepEqual(loops.find(l => l.id === '01-gameplay-direction').deps, []);
  assert.deepEqual(loops.find(l => l.id === '02-art-motion').deps, []);
  assert.deepEqual(loops.find(l => l.id === '03-world-contract').deps, ['02-art-motion']);
  assert.deepEqual(loops.find(l => l.id === '04-core-integration').deps, ['01-gameplay-direction', '02-art-motion', '03-world-contract']);
  assert.deepEqual(loops.find(l => l.id === '05-release-handover').deps, ['04-core-integration']);
  for (const loop of loops) assert.ok(fs.existsSync(path.join(packet, loop.file)));
  assert.match(index, /active_loop: loops\/01-gameplay-direction\.md/);
  assert.doesNotMatch(index, /gr[ae]ybox/i);
});

test('entry instructions allow early art and keep graybox optional', () => {
  for (const file of ['BUILDPRINT.md', '00-goal.md', 'README.md', 'blueprint.yaml', 'loops/loop-flow.md', 'templates/slice-agreement.md']) {
    assert.match(read(file), /graybox is optional/i, file);
  }
  assert.match(read('01-setup.md'), /may start during setup/);
  assert.match(read('02-identity.md'), /no duplicate graybox pass is required/);
  assert.match(read('loops/02-art-motion.md'), /completion of `01-gameplay-direction` is not required/);
  assert.match(read('templates/asset-request.md'), /no already-approved seed is required to create the first seed/);
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
  for (const file of walk(packet).filter(f => /\.(md|yaml)$/.test(f))) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /01-graybox|approved graybox feel|graybox approval|then test the same space as graybox|Graybox jump arc[^\n]*before art/i, file);
  }
});

test('gameplay, visual and independent review obligations remain', () => {
  const goal = read('00-goal.md');
  for (const pattern of [/before\*\* content scaling/, /including negative cases/, /movement across frame rates, collisions/, /animation recordings/, /Independent reviewer/]) assert.match(goal, pattern);
  assert.match(read('loops/01-gameplay-direction.md'), /continuous input-driven objective\/failure-or-undo\/restart run; measured frame-rate travel/);
  assert.match(read('loops/02-art-motion.md'), /source rectangles validated; contact sheet and animation recording/);
  assert.match(read('loops/04-core-integration.md'), /production code/);
  assert.match(read('review.md'), /Same implementing session means \*\*REVIEW_INVALID\*\*/);
});

test('preferred quality stack and Media4Agents URL policy remain intact', () => {
  const providers = read('references/providers-and-sources.md');
  for (const text of ['WaveSpeed + (RetroDiffusion OR Media4Agents)', 'bytedance/seedream-v5.0-pro/edit', 'bria/remove-background', 'approval before any paid usage', 'only free solutions or suitably licensed free assets']) assert.ok(providers.includes(text), text);
  assert.match(read('references/media4agents-url-sprites.md'), /PUBLIC_MEDIA4AGENTS_TOKEN/);
  assert.match(read('loops/02-art-motion.md'), /media4agents-url-sprites\.md/);
});

test('actual agb bootstrap preserves parallel routing and continuation', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guided-work-order-'));
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
  try {
    const manifest = path.join(tmp, 'packet.json'), target = path.join(tmp, 'target');
    fs.writeFileSync(manifest, JSON.stringify({ slug: 'guided-2d-game', files: walk(packet).map(f => ({ path: path.relative(packet, f), rawUrl: pathToFileURL(f).href })) }));
    execFileSync(process.execPath, [path.join(repo, 'bin/agb.js'), 'start', manifest, target], { stdio: 'pipe' });
    const snapshot = path.join(target, '.buildprint/snapshots');
    assert.equal(fs.readFileSync(path.join(snapshot, 'loops/loop-index.yaml'), 'utf8'), index);
    for (const loop of loops) assert.equal(fs.readFileSync(path.join(snapshot, loop.file), 'utf8'), read(loop.file));
    assert.ok(fs.existsSync(path.join(target, '.buildprint/next-agent.md')));
    assert.ok(!fs.existsSync(path.join(snapshot, 'loops/01-graybox.md')));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
