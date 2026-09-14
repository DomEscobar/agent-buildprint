// Targeted phase gate regression fixtures. Never game/provider acceptance.
// Synthetic receipts below test state/claim plumbing; they are NOT game evidence.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { bootstrap } from '../src/runtime/bootstrap.js'
import { hash, jsonBytes, relative, manifestSource, inside, readJson, put, unlock } from '../src/runtime/io.js'
import { load, mutate, operation, status, next } from '../src/runtime/state.js'

const cli = fileURLToPath(new URL('../bin/agb.js', import.meta.url))
const receipt = value => ({ schema: 'agb/receipt/v2', ...value })
function write(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, typeof value === 'string' || Buffer.isBuffer(value) ? value : jsonBytes(value)) }
async function fixture(t, customize = () => {}) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-runtime-regression-'))
  t.after(() => fs.rmSync(base, { recursive: true, force: true }))
  const packet = path.join(base, 'packet'); const project = path.join(base, 'game')
  const definition = { schema: 'agb/loops/v2', approvals: ['contract'], bindingFiles: ['PROJECT_CONTRACT.md'], loops: ['a', 'b'].map((id, i) => ({ id, file: `loops/${id}.md`, dependsOn: i ? ['a'] : [], approvals: ['contract'], requirements: [id], acceptance: ['implemented'], independentReview: false })) }
  customize(definition)
  write(path.join(packet, 'runtime.json'), definition)
  write(path.join(packet, 'BUILDPRINT.md'), '# BUILDPRINT: Synthetic runtime regression packet\n\nOnly a test fixture, never game acceptance.\n')
  for (const id of ['a', 'b']) write(path.join(packet, `loops/${id}.md`), `# Synthetic loop ${id}\n\nThis deliberately tests routing, not game implementation or visual quality.\n`)
  const manifest = path.join(packet, 'package.json')
  write(manifest, { slug: 'runtime-fixture', runtime: { schema: 'agb/runtime/v2', definition: 'runtime.json' }, files: ['BUILDPRINT.md', 'runtime.json', 'loops/a.md', 'loops/b.md'] })
  await bootstrap(manifest, project, {}, () => { throw new Error('v2 must not call legacy writer') })
  write(path.join(project, 'PROJECT_CONTRACT.md'), '# Synthetic contract\nNot an actual user authorization.\n')
  write(path.join(project, 'package.json'), { private: true })
  write(path.join(project, 'src/main.js'), '// Synthetic source fixture\n')
  write(path.join(project, 'dist/main.js'), '// Synthetic output fixture; never executed\n')
  const change = (action, data) => mutate(project, load(project).state.revision, action, context => operation(context, action, receipt(data)))
  const approve = () => change('approve', { id: 'contract', decision: 'approved', actor: 'synthetic operator', basis: 'Synthetic fixture authorization only.', contractSha256: hash(fs.readFileSync(path.join(project, 'PROJECT_CONTRACT.md'))) })
  const bind = () => change('bind', { buildCommand: 'synthetic fixture; not executed', servedUrl: 'http://fixture.invalid', sourceToBuild: 'Synthetic claim plumbing only, no runtime correspondence.', buildFiles: ['dist/main.js'], runtimeFiles: ['package.json'] })
  async function record(id, loop = 'a', extra = {}) {
    const state = load(project).state
    return change('evidence', { id, loop, candidate: state.candidate.id, generation: state.generation, dimension: 'implemented', verdict: 'pass', actor: 'synthetic builder', method: 'Synthetic static fixture inspection.', executedAt: 'synthetic fixture timestamp', coverage: [{ requirement: loop, verdict: 'pass', observation: 'Synthetic requirement coverage only.' }], artifacts: [{ path: 'src/main.js', sha256: hash(fs.readFileSync(path.join(project, 'src/main.js'))), kind: 'source', observation: 'Synthetic source fixture.' }], ...extra })
  }
  return { base, packet, project, manifest, change, approve, bind, record }
}

async function phaseFixture(t) {
  const f = await fixture(t, d => {
    d.acceptancePlan = '.game-quality/plan.json';
    d.productionEvidence = { baseline: '.game-quality/baseline.json', receipts: '.game-quality/production' };
    d.loops[0].productionStages = ['preflight', 'layout']; d.loops[1].productionStages = ['assembly'];
  });
  const file = rel => path.join(f.project, rel);
  const sha = rel => hash(fs.readFileSync(file(rel)));
  write(file('.game-quality/target.txt'), 'Synthetic reference, not artwork.');
  write(file('.game-quality/measurement.txt'), 'Synthetic observation, not executed gameplay.');
  const plan = { version: 3, root: '..', contract: 'PROJECT_CONTRACT.md', artChecks: [], reviewMode: 'self', inputRoots: ['src'],
    requirements: [{ id: 'fixture', domain: 'visual', description: 'Synthetic coverage', views: ['desktop'] }],
    comparisons: [{ reference: '.game-quality/target.txt' }],
    production: { version: 1, rigidAssets: [], checks: ['preflight', 'layout', 'assembly'].map(stage => ({ id: stage, stage, method: stage === 'layout' ? 'layout' : 'review', inputs: ['src'], requirements: ['fixture'], views: ['desktop'], evidenceKind: stage === 'assembly' ? 'image' : 'measurement' })) } };
  write(file('.game-quality/plan.json'), plan);
  write(file('.game-quality/baseline.json'), { version: 1, plan: file('.game-quality/plan.json'), planSha256: sha('.game-quality/plan.json'), artSpecs: {}, references: { [file('.game-quality/target.txt')]: sha('.game-quality/target.txt') }, contract: { [file('PROJECT_CONTRACT.md')]: sha('PROJECT_CONTRACT.md') } });
  fs.mkdirSync(file('.game-quality/production'));
  function phase(check, extra = {}, name = check) {
    write(file(`.game-quality/production/${name}.json`), { kind: 'production-receipt', baselineSha256: sha('.game-quality/baseline.json'), check,
      inputs: { 'src/main.js': sha('src/main.js') }, ticketSha256: 'a'.repeat(64), startedAt: '2026-01-01T00:00:00Z', completedAt: '2026-01-01T00:01:00Z',
      status: 'pass', reviewer: 'SYNTHETIC FIXTURE', observed: 'Schema regression, not game acceptance.', automatic: check === 'layout' ? { passed: true } : null,
      evidence: [{ path: '.game-quality/measurement.txt', sha256: sha('.game-quality/measurement.txt'), view: 'desktop' }], ...extra });
  }
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('source'); await f.change('accept', { loop: 'a', evidence: 'source' });
  return { ...f, phase, file, sha, plan };
}

test('phase gate blocks source-only, wrong identity, stale inputs, then accepts current preflight/layout only', async t => {
  const f = await phaseFixture(t);
  const advance = () => f.change('advance', { loop: 'a' });
  const before = fs.readFileSync(f.file('.buildprint/HEAD.json'));
  await assert.rejects(advance(), /production receipt missing/);
  assert.deepEqual(fs.readFileSync(f.file('.buildprint/HEAD.json')), before);
  assert.match(next(f.project), /Advance blocked: production receipt missing/);
  f.phase('preflight', { baselineSha256: 'b'.repeat(64) }); f.phase('layout');
  await assert.rejects(advance(), /receipt missing: preflight/);
  f.phase('preflight', { inputs: { 'src/main.js': '0'.repeat(64) } });
  await assert.rejects(advance(), /inputs stale: preflight/);
  f.phase('preflight'); await advance();
  assert.equal(load(f.project).state.activeLoop, 'b');
  assert.match(status(f.project).productionReadiness.b, /missing: assembly/);
});

test('latest failed/unverified receipt prevents selecting older pass; no mutation on failure', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout');
  f.phase('layout', { completedAt: '2026-01-01T00:02:00Z', status: 'fail' }, 'layout-new');
  await assert.rejects(f.change('advance', { loop: 'a' }), /layout is fail/);
  f.phase('layout', { completedAt: '2026-01-01T00:02:00Z', status: 'unverified' }, 'layout-new');
  await assert.rejects(f.change('advance', { loop: 'a' }), /layout is unverified/);
});

test('assembly needs actual image-kind receipt; missing/stale ancestor receipts block later begin', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout'); await f.change('advance', { loop: 'a' });
  f.phase('layout', { automatic: { passed: false } });
  await assert.rejects(f.change('begin', { loop: 'b' }), /automatic check did not pass/);
  f.phase('layout'); await f.change('begin', { loop: 'b' }); await f.record('b-source', 'b'); await f.change('accept', { loop: 'b', evidence: 'b-source' });
  await assert.rejects(f.change('advance', { loop: 'b' }), /missing: assembly/);
  f.phase('assembly'); await assert.rejects(f.change('advance', { loop: 'b' }), /evidence changed\/invalid/);
  write(f.file('.game-quality/synthetic.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
  f.phase('assembly', { evidence: [{ path: '.game-quality/synthetic.png', sha256: f.sha('.game-quality/synthetic.png'), view: 'desktop' }] });
  await f.change('advance', { loop: 'b' }); assert.equal(load(f.project).state.activeLoop, null);
});

test('protected plan/contract/reference mutations and unsafe evidence paths fail closed', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout');
  f.phase('preflight', { evidence: [{ path: '../escape.txt', sha256: 'a'.repeat(64), view: 'desktop' }] });
  await assert.rejects(f.change('advance', { loop: 'a' }), /unsafe path/);
  f.phase('preflight'); write(f.file('.game-quality/target.txt'), 'Changed protected target');
  await assert.rejects(f.change('advance', { loop: 'a' }), /references binding/);
});

test('optional gates absent preserve legacy v2 transitions', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('source'); await f.change('accept', { loop: 'a', evidence: 'source' }); await f.change('advance', { loop: 'a' });
  assert.equal(load(f.project).state.activeLoop, 'b');
});

test('invalid stage config rejected and phase-local manifest produces matching handover', async t => {
  await assert.rejects(fixture(t, d => { d.loops[0].productionStages = ['unknown']; }), /productionStages/);
  const f = await fixture(t);
  const manifest = readJson(f.manifest); manifest.instructions = { readOrder: ['BUILDPRINT.md'], phaseReadOrder: { alignment: ['BUILDPRINT.md'], production: ['loops/a.md'] } }; write(f.manifest, manifest);
  const target = path.join(f.base, 'phase-host'); await bootstrap(f.manifest, target, {}, () => {});
  const note = fs.readFileSync(path.join(target, '.buildprint/next-agent.md'), 'utf8');
  assert.match(note, /independently answerable/); assert.match(note, /production: snapshots\/loops\/a.md/); assert.match(note, /Do not pre-read/);
  manifest.instructions.phaseReadOrder.production = ['missing.md']; write(f.manifest, manifest);
  await assert.rejects(bootstrap(f.manifest, path.join(f.base, 'invalid-host'), {}, () => {}), /phaseReadOrder/);
});

test('changed real input bytes/new files and changed evidence invalidate phase receipts', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout');
  write(f.file('src/added.js'), '// new protected dependency');
  await assert.rejects(f.change('advance', { loop: 'a' }), /inputs stale/);
  fs.unlinkSync(f.file('src/added.js'));
  write(f.file('.game-quality/measurement.txt'), 'Changed observation');
  await assert.rejects(f.change('advance', { loop: 'a' }), /evidence changed/);
});

test('wrong check identity, missing completion, missing views, and tied latest timestamps fail closed', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout');
  f.phase('preflight', { check: 'wrong-check' });
  await assert.rejects(f.change('advance', { loop: 'a' }), /unknown check/);
  f.phase('preflight', { completedAt: null });
  await assert.rejects(f.change('advance', { loop: 'a' }), /completion time invalid/);
  f.phase('preflight', { evidence: [{ path: '.game-quality/measurement.txt', sha256: f.sha('.game-quality/measurement.txt'), view: 'wrong-view' }] });
  await assert.rejects(f.change('advance', { loop: 'a' }), /views incomplete/);
  f.phase('preflight'); f.phase('preflight', {}, 'duplicate');
  await assert.rejects(f.change('advance', { loop: 'a' }), /ambiguous completion/);
});

test('symlinked evidence storage is refused', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout');
  fs.symlinkSync(f.file('.game-quality/measurement.txt'), f.file('.game-quality/link.txt'));
  f.phase('preflight', { evidence: [{ path: '.game-quality/link.txt', sha256: f.sha('.game-quality/measurement.txt'), view: 'desktop' }] });
  await assert.rejects(f.change('advance', { loop: 'a' }), /symlink/);
});

test('real CLI phase transition: missing, wrong-baseline, stale, valid receipts (synthetic only)', async t => {
  const f = await phaseFixture(t);
  const request = f.file('.game-quality/advance.json'); write(request, receipt({ loop: 'a' }));
  const advance = () => JSON.parse(execFileSync(process.execPath, [cli, 'loop', 'advance', f.project, '--revision', String(load(f.project).state.revision), '--receipt', request], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  const blocked = expected => {
    const before = fs.readFileSync(f.file('.buildprint/HEAD.json'));
    assert.throws(advance, error => { assert.equal(error.status, 1); assert.match(error.stderr.toString(), expected); return true; });
    assert.deepEqual(fs.readFileSync(f.file('.buildprint/HEAD.json')), before);
  };
  blocked(/production receipt missing/);
  f.phase('preflight', { baselineSha256: 'b'.repeat(64) }); f.phase('layout'); blocked(/receipt missing: preflight/);
  f.phase('preflight', { inputs: { 'src/main.js': '0'.repeat(64) } }); blocked(/inputs stale: preflight/);
  f.phase('preflight'); const result = advance();
  assert.equal(result.result.completed, 'a'); assert.equal(result.result.activeLoop, 'b');
  console.log('SYNTHETIC CLI TRACE: missing=blocked wrong-baseline=blocked stale-input=blocked valid-preflight-layout=advanced; no game acceptance.');
});
