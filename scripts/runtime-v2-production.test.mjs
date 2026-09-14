// Targeted phase gate regression fixtures. Never game/provider acceptance.
// Synthetic receipts below test state/claim plumbing; they are NOT game evidence.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { productionCurrent } from '../src/runtime/production.js'
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
  for (const { id } of definition.loops) write(path.join(packet, `loops/${id}.md`), `# Synthetic loop ${id}\n\nThis deliberately tests routing, not game implementation or visual quality.\n`)
  const manifest = path.join(packet, 'package.json')
  write(manifest, { slug: 'runtime-fixture', runtime: { schema: 'agb/runtime/v2', definition: 'runtime.json' }, files: ['BUILDPRINT.md', 'runtime.json', ...definition.loops.map(l => l.file)] })
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
  let linked = '.game-quality/link.txt';
  if (process.platform === 'win32') {
    fs.symlinkSync(f.file('.game-quality'), f.file('linked-quality'), 'junction');
    linked = 'linked-quality/measurement.txt';
  } else fs.symlinkSync(f.file('.game-quality/measurement.txt'), f.file(linked));
  f.phase('preflight', { evidence: [{ path: linked, sha256: f.sha('.game-quality/measurement.txt'), view: 'desktop' }] });
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

async function completeFixture(t) {
  const stages = ['preflight', 'layout', 'assembly', 'static', 'motion', 'final']
  const f = await fixture(t, d => {
    d.acceptancePlan = '.game-quality/plan.json'
    d.productionEvidence = { baseline: '.game-quality/baseline.json', receipts: '.game-quality/production', validationVersion: 2 }
    d.loops = ['a', 'b', 'c', 'd', 'e', 'f'].map((id, i) => ({ id, file: `loops/${id}.md`, dependsOn: i ? [String.fromCharCode(id.charCodeAt(0) - 1)] : [], approvals: ['contract'], requirements: [id], independentReview: false, acceptance: ['implemented', 'visual'], productionStages: [['preflight', 'layout'], ['assembly'], ['static'], ['motion'], ['final'], stages][i] }))
  })
  const file = rel => path.join(f.project, rel)
  const sha = rel => hash(fs.readFileSync(file(rel)))
  write(file('.game-quality/measurement.txt'), 'Authored synthetic observation, not game evidence.')
  write(file('.game-quality/synthetic.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'))
  write(file('.game-quality/synthetic.gif'), 'GIF89a synthetic signature only, not decoded or played')
  const plan = { version: 3, root: '..', contract: 'PROJECT_CONTRACT.md', artChecks: [], comparisons: [{ reference: '.game-quality/synthetic.png' }], reviewMode: 'self', inputRoots: ['src', 'package.json'], requirements: [
    { id: 'geometry', domain: 'visual', views: ['desktop'] }, { id: 'walking', domain: 'motion', views: ['desktop'] }
  ], production: { version: 1, rigidAssets: [], checks: stages.map(stage => ({ id: stage, stage, method: stage === 'layout' ? 'layout' : 'review', inputs: ['src', 'package.json'], requirements: [stage === 'motion' ? 'walking' : 'geometry'], views: ['desktop'], evidenceKind: stage === 'motion' ? 'motion' : ['assembly', 'static', 'final'].includes(stage) ? 'image' : 'measurement', ...(stage === 'layout' ? { source: 'src/main.js', requiredScope: { regions: ['room'], instances: [], routes: ['path'], bridges: [] } } : {}) })) } }
  plan.production.checks.push({ ...plan.production.checks[1], id: 'static-layout', stage: 'static' })
  function freeze() {
    write(file('.game-quality/plan.json'), plan)
    write(file('.game-quality/baseline.json'), { version: 1, plan: file('.game-quality/plan.json'), planSha256: sha('.game-quality/plan.json'), artSpecs: {}, references: { [file('.game-quality/synthetic.png')]: sha('.game-quality/synthetic.png') }, contract: { [file('PROJECT_CONTRACT.md')]: sha('PROJECT_CONTRACT.md') } })
  }
  freeze(); fs.mkdirSync(file('.game-quality/production'))
  function phase(id, extra = {}, name = id) {
    const check = plan.production.checks.find(c => c.id === id)
    const evidence = `.game-quality/${{ image: 'synthetic.png', motion: 'synthetic.gif', measurement: 'measurement.txt' }[check.evidenceKind]}`
    write(file(`.game-quality/production/${name}.json`), { kind: 'production-receipt', baselineSha256: sha('.game-quality/baseline.json'), check: id, inputs: { 'src/main.js': sha('src/main.js'), 'package.json': sha('package.json') }, ticketSha256: 'a'.repeat(64), startedAt: '2026-01-01T00:00:00Z', completedAt: '2026-01-01T00:01:00Z', status: 'pass', reviewer: 'SYNTHETIC', observed: 'Authored plumbing fixture only', automatic: check.method === 'review' ? null : { passed: true }, evidence: [{ path: evidence, sha256: sha(evidence), view: 'desktop' }], ...extra })
  }
  const definition = load(f.project).state.definition
  const current = id => productionCurrent(f.project, definition, definition.loops.find(l => l.id === id))
  async function advance(id, finish = true) {
    await f.change('begin', { loop: id }); await f.record(`${id}-source`, id)
    await f.change('accept', { loop: id, evidence: `${id}-source` })
    // Visual attestation is exercised separately; this helper records real required
    // artifact kinds with synthetic signatures and explicit non-game observations.
    const artifacts = [['src/main.js', 'review'], ['src/main.js', 'interaction'], ['.game-quality/synthetic.png', 'running-capture'], ['.game-quality/synthetic.gif', 'motion'], [current(id)[0].path, 'production-receipt']].map(([path, kind]) => ({ path, kind, sha256: sha(path), observation: 'Synthetic fixture only' }))
    await f.record(`${id}-visual`, id, { dimension: 'visual', artifacts, runningBuildObservation: 'Synthetic, not running game', viewportAndState: 'Synthetic desktop', review: { actor: 'SYNTHETIC', mode: 'self', observation: 'Schema fixture only' } })
    await f.change('accept', { loop: id, evidence: `${id}-visual` }); if (finish) await f.change('advance', { loop: id })
  }
  await f.approve(); await f.bind()
  return { ...f, file, sha, plan, phase, freeze, current, advance, definition }
}

test('complete six-loop progression validates static/motion/final and handover current coverage', async t => {
  const f = await completeFixture(t)
  for (const c of f.plan.production.checks) f.phase(c.id)
  for (const id of ['a', 'b', 'c', 'd', 'e', 'f']) await f.advance(id)
  assert.equal(load(f.project).state.activeLoop, null)
  assert.equal(f.current('f').length, 7)
  f.phase('static', { status: 'fail', completedAt: '2026-01-01T00:02:00Z' }, 'new-static')
  assert.throws(() => f.current('f'), /static is fail/)
  assert.match(status(f.project).productionReadiness.f, /static is fail/)
})

for (const [id, stage] of [['c', 'static'], ['d', 'motion'], ['e', 'final']]) {
  test(`${stage}: missing/latest failed/unverified blocks despite existing implementation and visual passes`, async t => {
    const f = await completeFixture(t)
    for (const c of f.plan.production.checks) f.phase(c.id)
    for (const before of ['a', 'b', 'c', 'd'].filter(x => x < id)) await f.advance(before)
    await f.advance(id, false)
    const head = fs.readFileSync(f.file('.buildprint/HEAD.json'))
    fs.unlinkSync(f.file(`.game-quality/production/${stage}.json`))
    await assert.rejects(f.change('advance', { loop: id }), /receipt missing/)
    f.phase(stage)
    for (const status of ['fail', 'unverified']) {
      f.phase(stage, { status, completedAt: '2026-01-01T00:02:00Z' }, 'newest')
      await assert.rejects(f.change('advance', { loop: id }), /not pass/)
    }
    assert.deepEqual(fs.readFileSync(f.file('.buildprint/HEAD.json')), head)
  })
}

test('v2 reader rejects incomplete final inputs, wrong motion kind, omitted coverage/stage and malformed checker semantics', async t => {
  for (const [edit, error] of [
    [p => { p.production.checks.find(c => c.stage === 'final').inputs = ['src'] }, /every input root/],
    [p => { p.production.checks.find(c => c.stage === 'motion').evidenceKind = 'image' }, /motion evidence/],
    [p => { p.requirements[0].views.push('portrait') }, /requirement\/view coverage/],
    [p => { p.production.checks = p.production.checks.filter(c => c.stage !== 'final') }, /stage missing/],
    [p => { p.production.checks.find(c => c.stage === 'layout').source = 'missing.json' }, /declared dependency/],
    [p => { p.production.checks.find(c => c.stage === 'layout').requiredScope.routes = [] }, /protected scope/],
    [p => { p.production.rigidAssets = ['bed'] }, /rigid asset coverage/]
  ]) {
    const f = await completeFixture(t); edit(f.plan); f.freeze()
    assert.throws(() => f.current('f'), error)
  }
})

test('fresh arbitrary JSON mislabeled production-receipt cannot satisfy visual evidence', async t => {
  const f = await completeFixture(t)
  for (const c of f.plan.production.checks) f.phase(c.id)
  await f.change('begin', { loop: 'a' })
  write(f.file('.game-quality/arbitrary.json'), { status: 'pass', looksNice: true })
  const artifacts = [['src/main.js', 'review'], ['src/main.js', 'interaction'], ['.game-quality/synthetic.png', 'running-capture'], ['.game-quality/synthetic.gif', 'motion'], ['.game-quality/arbitrary.json', 'production-receipt']].map(([path, kind]) => ({ path, kind, sha256: f.sha(path), observation: 'Synthetic' }))
  await assert.rejects(f.record('fake', 'a', { dimension: 'visual', artifacts, runningBuildObservation: 'Synthetic', viewportAndState: 'Synthetic', review: { actor: 'Synthetic', mode: 'self', observation: 'Synthetic' } }), /must name a current required stage receipt/)
})

test('measured geometry negatives cannot be compensated by aesthetics; bounded positives are only attestations', async t => {
  const f = await fixture(t, d => { d.loops[0].requirements.push('assembly-measured-geometry', 'aesthetic') })
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  // Authored numeric fixtures, no pixel extraction or private artwork. Judgment is
  // supplied to existing coverage: this does NOT implement a geometry checker.
  const cases = [
    { name: 'shallow-7', rise: 7, residual: -19.6, verdict: 'fail' },
    { name: 'shallow-10', rise: 10, residual: -16.6, verdict: 'fail' },
    { name: 'wrong-bed', observation: 'Authored long-SE bed bound long-SW as 2x3', verdict: 'fail' },
    { name: 'inverse-fit', observation: 'Zero inverse-fit residual is not independent proof', verdict: 'unverified' },
    { name: 'repaired-rail', rise: 27.1, residual: 0.5, verdict: 'pass' },
    { name: 'repaired-bed', observation: 'Authored correctly mapped 3x2 long-SE; hidden contact inferred', verdict: 'pass' }
  ]
  for (const c of cases) {
    if (c.rise !== undefined) assert.ok(Math.abs((c.rise - 26.6) - c.residual) < 1e-9)
    const coverage = [{ requirement: 'a', verdict: 'pass', observation: 'Synthetic implementation' }, { requirement: 'aesthetic', verdict: 'pass', observation: 'Authored 16/16, cannot compensate' }, { requirement: 'assembly-measured-geometry', verdict: c.verdict, observation: c.observation || `Authored rise ${c.rise}, expected 26.6, residual ${c.residual}` }]
    if (c.verdict !== 'pass') await assert.rejects(f.record(c.name, 'a', { coverage }), /non-pass requirement/)
    else await f.record(c.name, 'a', { coverage })
  }
  await f.change('accept', { loop: 'a', evidence: 'repaired-bed' }); await f.change('advance', { loop: 'a' })
  await f.change('defect', { id: 'user-rejection', loop: 'a', dimension: 'implemented', description: 'Synthetic later user rejection of same candidate; not real authorization.' })
  assert.notEqual(load(f.project).state.loops.a.status, 'complete')
  await assert.rejects(f.change('advance', { loop: 'a' }), /defect/)
  await assert.rejects(f.change('resolve-defect', { id: 'user-rejection', fix: 'Reuse old PASS', evidence: ['repaired-bed'] }), /fresh/)
})

test('new validation policy is explicit and cannot silently migrate old snapshots', async t => {
  await assert.rejects(fixture(t, d => { d.acceptancePlan = 'plan.json'; d.productionEvidence = { baseline: 'baseline.json', receipts: 'receipts', validationVersion: 99 } }), /validationVersion/)
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout')
  const original = fs.readFileSync(f.file('.buildprint/HEAD.json'))
  const definition = readJson(path.join(f.packet, 'runtime.json')); definition.productionEvidence.validationVersion = 2
  write(path.join(f.packet, 'runtime.json'), definition)
  await assert.rejects(bootstrap(f.manifest, f.project, { resume: true }, () => {}), /payload differs/)
  assert.deepEqual(fs.readFileSync(f.file('.buildprint/HEAD.json')), original)
  await f.change('advance', { loop: 'a' }) // Original partial-plan snapshot still works.
})

test('latest receipt comparison uses instants, not lexical timezone order', async t => {
  const f = await phaseFixture(t); f.phase('preflight'); f.phase('layout')
  f.phase('layout', { completedAt: '2025-12-31T23:02:00-01:00', status: 'fail' }, 'newest')
  await assert.rejects(f.change('advance', { loop: 'a' }), /layout is fail/)
})

test('real Node discovery canary: archived source is non-executable; active failures still fail', t => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-discovery-'))
  t.after(() => fs.rmSync(base, { recursive: true, force: true }))
  write(path.join(base, 'evidence/old.test.mjs.txt'), 'throw new Error("ARCHIVED_MUST_NOT_RUN")')
  write(path.join(base, 'active.test.mjs'), 'import test from "node:test"; test("active", () => {})')
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT // child must perform real discovery
  const run = () => execFileSync(process.execPath, ['--test'], { cwd: base, env, encoding: 'utf8', stdio: 'pipe' })
  assert.doesNotMatch(run(), /ARCHIVED_MUST_NOT_RUN/)
  write(path.join(base, 'active.test.mjs'), 'throw new Error("ACTIVE_MUST_FAIL")')
  assert.throws(run, e => { assert.equal(e.status, 1); assert.match(e.stdout, /ACTIVE_MUST_FAIL/); assert.doesNotMatch(e.stdout, /ARCHIVED_MUST_NOT_RUN/); return true })
})

test('published standalone packet snapshots all authored payloads and retains exact stage/geometry policy', async t => {
  const manifest = fileURLToPath(new URL('../buildprints/standalone-isometric-game/package.json', import.meta.url))
  const source = await manifestSource(manifest)
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-real-packet-'))
  t.after(() => fs.rmSync(base, { recursive: true, force: true }))
  const project = path.join(base, 'host')
  await bootstrap(manifest, project, {}, () => { throw new Error('v2 only') })
  const { state } = load(project)
  assert.equal(state.definition.productionEvidence.validationVersion, 2)
  assert.deepEqual(state.definition.loops.map(l => l.productionStages), [['preflight', 'layout'], ['assembly'], ['static'], ['motion'], ['final'], ['preflight', 'layout', 'assembly', 'static', 'motion', 'final']])
  assert.ok(state.definition.loops[1].requirements.includes('assembly-measured-geometry'))
  assert.ok(source.entries.some(e => e.path === 'templates/measured-geometry-review.md'))
  for (const e of source.entries) {
    assert.equal(hash(fs.readFileSync(path.join(project, '.buildprint/snapshots', e.path))), e.sha256)
    assert.equal(state.inventory.find(i => i.path === e.path).sha256, e.sha256)
  }
  const actual = fs.readdirSync(path.dirname(manifest), { recursive: true }).filter(p => fs.statSync(path.join(path.dirname(manifest), p)).isFile() && p !== 'package.json').map(p => p.split(path.sep).join('/')).sort()
  assert.deepEqual(source.entries.map(e => e.path).sort(), actual)
  assert.equal((await bootstrap(manifest, project, { resume: true }, () => {})).resumed, true)
})
