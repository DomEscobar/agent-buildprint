// Runtime regression tests; the original overhaul authored these before execution.
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

test('v2 staged bootstrap, immutable snapshots, resume and collision preservation', async t => {
  const f = await fixture(t)
  const before = fs.readFileSync(path.join(f.project, '.buildprint/HEAD.json'))
  assert.equal(load(f.project).state.schema, 'agb/state/v2')
  assert.equal(fs.existsSync(path.join(f.project, '.buildprint/state.json')), false)
  await assert.rejects(bootstrap(f.manifest, f.project, {}, () => {}), /existing .buildprint/)
  assert.deepEqual(fs.readFileSync(path.join(f.project, '.buildprint/HEAD.json')), before)
  assert.equal((await bootstrap(f.manifest, f.project, { resume: true }, () => {})).resumed, true)
  write(path.join(f.packet, 'loops/a.md'), 'Changed source after snapshot was frozen.\n')
  await assert.rejects(bootstrap(f.manifest, f.project, { resume: true }, () => {}), /payload differs/)
})

test('explicit approvals, begin, selected attestation and advance; no implicit promotion', async t => {
  const f = await fixture(t)
  await assert.rejects(f.change('begin', { loop: 'a' }), /approval/)
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  await f.record('a-source')
  await assert.rejects(f.change('advance', { loop: 'a' }), /explicit implemented/)
  await f.change('accept', { loop: 'a', evidence: 'a-source' })
  assert.equal(load(f.project).state.loops.a.acceptance.implemented.status, 'implemented_attested')
  await f.change('advance', { loop: 'a' })
  assert.equal(load(f.project).state.activeLoop, 'b')
  assert.equal(load(f.project).state.loops.b.status, 'pending')
  assert.match(next(f.project), /Synthetic loop b/)
  assert.match(status(f.project).claimCeiling, /not verify/)
})

test('expected revision rejects concurrent/stale writer without HEAD change', async t => {
  const f = await fixture(t); await f.approve()
  const before = fs.readFileSync(path.join(f.project, '.buildprint/HEAD.json'))
  await assert.rejects(mutate(f.project, 0, 'begin', c => operation(c, 'begin', receipt({ loop: 'a' }))), /revision conflict/)
  assert.deepEqual(fs.readFileSync(path.join(f.project, '.buildprint/HEAD.json')), before)
})

test('snapshot and history corruption fail closed', async t => {
  const f = await fixture(t); await f.approve()
  const first = load(f.project).state.previous.file
  const old = fs.readFileSync(inside(path.join(f.project, '.buildprint'), first))
  write(inside(path.join(f.project, '.buildprint'), first), 'corrupt')
  assert.throws(() => load(f.project), /integrity mismatch/)
  write(inside(path.join(f.project, '.buildprint'), first), old)
  write(path.join(f.project, '.buildprint/snapshots/loops/a.md'), 'corrupt snapshot')
  assert.throws(() => load(f.project), /snapshot changed/)
})

test('orphan revision/temp is ignored; HEAD remains sole commit pointer', async t => {
  const f = await fixture(t)
  write(path.join(f.project, '.buildprint/revisions/99999999-orphan.json'), 'uncommitted')
  write(path.join(f.project, '.buildprint/HEAD.json.orphan.tmp'), 'uncommitted')
  assert.equal(load(f.project).state.revision, 0)
})

test('contract edits stale approval, and source/build edits stale acceptance', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('source')
  write(path.join(f.project, 'dist/main.js'), '// changed built output\n')
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'source' }), /stale/)
  write(path.join(f.project, 'PROJECT_CONTRACT.md'), '# Amended synthetic contract\n')
  await assert.rejects(f.change('advance', { loop: 'a' }), /approval/)
})

test('fresh bind does not silently reuse historical prerequisite receipts', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('a-old')
  await f.change('accept', { loop: 'a', evidence: 'a-old' }); await f.change('advance', { loop: 'a' }); await f.bind()
  await assert.rejects(f.change('begin', { loop: 'b' }), /stale evidence/)
  await f.record('a-fresh'); await f.change('accept', { loop: 'a', evidence: 'a-fresh' }); await f.change('begin', { loop: 'b' })
  assert.equal(load(f.project).state.loops.b.status, 'active')
})

test('newer fail/unverified record revokes acceptance; older pass cannot win', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('pass')
  await f.change('accept', { loop: 'a', evidence: 'pass' })
  await f.record('later-unverified', 'a', { verdict: 'unverified' })
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'pass' }), /older verdict/)
  await assert.rejects(f.change('advance', { loop: 'a' }), /explicit implemented/)
})

test('defects reopen work and require fix plus newer same-dimension evidence', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('old')
  await f.change('defect', { id: 'broken-contact', loop: 'a', dimension: 'implemented', description: 'Synthetic fixture defect.' })
  await assert.rejects(f.change('begin', { loop: 'a' }), /defects/)
  await assert.rejects(f.change('resolve-defect', { id: 'broken-contact', fix: 'Synthetic fix.', evidence: ['old'] }), /fresh/)
  await f.bind(); await f.record('new')
  await f.change('resolve-defect', { id: 'broken-contact', fix: 'Synthetic fix.', evidence: ['new'] })
  await f.change('begin', { loop: 'a' })
  assert.equal(load(f.project).state.defects[0].status, 'resolved')
})

test('alignment/setup/identity return cannot silently resolve or approve', async t => {
  const f = await fixture(t); await f.approve()
  await f.change('return', { id: 'setup-gap', loop: 'a', target: 'setup', reason: 'Synthetic missing prerequisite.' })
  await assert.rejects(f.change('begin', { loop: 'a' }), /return/)
  await assert.rejects(f.change('resolve-return', { id: 'setup-gap' }), /resolution/)
  await f.change('resolve-return', { id: 'setup-gap', resolution: 'Synthetic prerequisite addressed.', actor: 'synthetic operator' })
  assert.equal(load(f.project).state.loops.a.status, 'pending')
  assert.equal(load(f.project).state.approvals.contract.decision, 'approved')
})

test('visual structural data alone cannot omit media or required reviewer claim', async t => {
  const f = await fixture(t, d => { d.loops[0].acceptance = ['visual']; d.loops[0].independentReview = true })
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  await assert.rejects(f.record('missing-media', 'a', { dimension: 'visual' }), /required artifact kinds/)
  const artifacts = []
  // Minimal headers intentionally test ONLY format detection, not real pixels/playback.
  for (const [kind, name, raw] of [
    ['running-capture', 'capture.png', Buffer.from([137,80,78,71,13,10,26,10])],
    ['motion', 'motion.webm', Buffer.from([26,69,223,163])],
    ['interaction', 'input.txt', Buffer.from('synthetic input claim')],
    ['review', 'review.txt', Buffer.from('synthetic review claim')]
  ]) {
    const rel = `.game-quality/${name}`; write(path.join(f.project, rel), raw)
    artifacts.push({ kind, path: rel, sha256: hash(raw), observation: 'Synthetic plumbing; no actual game evidence.' })
  }
  await assert.rejects(f.record('self-review', 'a', { dimension: 'visual', artifacts, runningBuildObservation: 'Synthetic claim.', viewportAndState: 'Synthetic viewport.', review: { actor: 'synthetic builder', mode: 'self', observation: 'Synthetic claim.' } }), /reviewer capability/)
  await f.record('unverified', 'a', { dimension: 'visual', verdict: 'unverified', artifacts, runningBuildObservation: 'Synthetic claim.', viewportAndState: 'Synthetic viewport.', review: { actor: 'unavailable reviewer', mode: 'unavailable', observation: 'No independent review performed.' } })
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'unverified' }), /passing evidence/)
})

test('full coverage binds original target and requires every protected plan view', async t => {
  const f = await fixture(t, d => { d.acceptancePlan = '.game-quality/acceptance-plan.json'; d.loops[0].fullCoverage = true })
  write(path.join(f.project, '.game-quality/target.txt'), 'synthetic protected reference')
  write(path.join(f.project, '.game-quality/acceptance-plan.json'), { version: 3, root: '..', contract: 'PROJECT_CONTRACT.md', requirements: [{ id: 'full-scope', views: ['mobile', 'desktop'] }], comparisons: [{ reference: '.game-quality/target.txt' }] })
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  await assert.rejects(f.record('missing-plan-coverage'), /protected requirement/)
  write(path.join(f.project, '.game-quality/target.txt'), 'changed original target')
  await assert.rejects(f.record('stale-target'), /binding stale/)
})

test('artifact tampering is detected even inside excluded quality directory', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  const rel = '.game-quality/inspection.txt'; write(path.join(f.project, rel), 'original synthetic observation')
  await f.record('inspection', 'a', { artifacts: [{ path: rel, sha256: hash(fs.readFileSync(path.join(f.project, rel))), kind: 'source', observation: 'Synthetic source inspection.' }] })
  write(path.join(f.project, rel), 'changed synthetic observation')
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'inspection' }), /evidence changed/)
})

test('traversal, normalized collisions, symlinks and partial sources are refused', async t => {
  const f = await fixture(t)
  for (const name of ['../escape', '/absolute', 'a/../b', 'a\\b', 'a//b', 'C:/file', 'NUL', 'a\u0000b']) assert.throws(() => relative(name))
  const manifest = readJson(f.manifest)
  manifest.files.push('LOOPS/a.md'); write(f.manifest, manifest)
  await assert.rejects(manifestSource(f.manifest), /colliding/)
  manifest.files = ['missing.md']; write(f.manifest, manifest)
  const target = path.join(f.base, 'failed-target')
  await assert.rejects(bootstrap(f.manifest, target, {}, () => {}), /ENOENT/)
  assert.equal(fs.existsSync(target), false)
  if (process.platform === 'win32') {
    // Junctions exercise the same path-component rejection without symlink privilege.
    manifest.files = ['linked/PROJECT_CONTRACT.md']
    fs.symlinkSync(f.project, path.join(f.packet, 'linked'), 'junction')
  } else {
    manifest.files = ['link.md']
    fs.symlinkSync(path.join(f.project, 'PROJECT_CONTRACT.md'), path.join(f.packet, 'link.md'))
  }
  write(f.manifest, manifest)
  await assert.rejects(manifestSource(f.manifest), /symlink/)
})

test('target symlink and existing user files survive bootstrap refusal', async t => {
  const f = await fixture(t)
  const link = path.join(f.base, 'game-link'); fs.symlinkSync(f.project, link, process.platform === 'win32' ? 'junction' : 'dir')
  await assert.rejects(bootstrap(f.manifest, link, {}, () => {}), /symlink/)
  const other = path.join(f.base, 'other'); write(path.join(other, 'user.txt'), 'preserve me')
  await assert.rejects(bootstrap(f.manifest, other, { scaffold: true, allowScaffold: true }, () => {}), /contract-only/)
  assert.equal(fs.readFileSync(path.join(other, 'user.txt'), 'utf8'), 'preserve me')
})

test('scaffold requires explicit consent and never executes manifest commands', async t => {
  const f = await fixture(t)
  const marker = path.join(f.base, 'MUST-NOT-EXIST')
  const manifest = readJson(f.manifest); manifest.scripts = { postinstall: `touch ${marker}` }; manifest.scaffold = { command: `touch ${marker}` }; write(f.manifest, manifest)
  await assert.rejects(bootstrap(f.manifest, path.join(f.base, 'new-scaffold'), { scaffold: true }, () => {}), /allow-scaffold/)
  await bootstrap(f.manifest, path.join(f.base, 'no-execution'), {}, () => {})
  assert.equal(fs.existsSync(marker), false)
})

test('unknown runtime versions/digests and live-lock recovery fail closed', async t => {
  const f = await fixture(t)
  await assert.rejects(manifestSource(f.manifest, '0'.repeat(64)), /manifest SHA/)
  const manifest = readJson(f.manifest); manifest.runtime.schema = 'agb/runtime/v999'; write(f.manifest, manifest)
  await assert.rejects(manifestSource(f.manifest), /unsupported runtime/)
  const file = path.join(f.project, '.buildprint/write.lock')
  put(file, jsonBytes({ pid: process.pid, token: 'synthetic-recovery-nonce' }))
  assert.throws(() => unlock(file, 'wrong'), /token mismatch/)
  assert.throws(() => unlock(file, 'synthetic-recovery-nonce'), /still alive/)
  await assert.rejects(f.approve(), /lock exists/)
})

test('legacy CLI start preserves explicit out-of-directory file URLs and old state shape', async t => {
  const f = await fixture(t)
  const manifest = path.join(f.base, 'legacy/package.json')
  write(manifest, { slug: 'legacy-fixture', files: [{ path: 'BUILDPRINT.md', rawUrl: pathToFileURL(path.join(f.packet, 'BUILDPRINT.md')).href }] })
  const target = path.join(f.base, 'legacy-target')
  execFileSync(process.execPath, [cli, 'start', manifest, target], { stdio: 'pipe' })
  const state = readJson(path.join(target, '.buildprint/state.json'))
  assert.equal(state.buildprint, 'legacy-fixture')
  assert.equal(fs.existsSync(path.join(target, '.buildprint/HEAD.json')), false)
  assert.deepEqual(fs.readFileSync(path.join(target, '.buildprint/snapshots/BUILDPRINT.md')), fs.readFileSync(path.join(f.packet, 'BUILDPRINT.md')))
})

test('HTTPS transport is bounded, same-origin, digest-required, and never remote-to-local', async t => {
  const original = globalThis.fetch
  t.after(() => { globalThis.fetch = original })
  const payload = Buffer.from('synthetic bounded remote file')
  let manifest = { slug: 'remote-fixture', runtime: { schema: 'agb/runtime/v2', definition: 'runtime.json' }, files: [{ path: 'runtime.json', sha256: hash(payload) }] }
  let calls = []
  globalThis.fetch = async (url, options) => {
    calls.push(String(url)); assert.equal(options.redirect, 'error')
    return new Response(String(url).endsWith('/package.json') ? jsonBytes(manifest) : payload)
  }
  const url = 'https://fixture.invalid/packet/package.json'
  await assert.rejects(manifestSource(url), /requires --manifest-sha256/)
  const source = await manifestSource(url, hash(jsonBytes(manifest)))
  assert.deepEqual(source.entries[0].payload, payload)
  assert.ok(calls.includes('https://fixture.invalid/packet/runtime.json'))
  manifest.files[0].url = 'file:///etc/passwd'
  await assert.rejects(manifestSource(url, hash(jsonBytes(manifest))), /remote manifest/)
  manifest.files[0].url = 'https://other.invalid/file'
  await assert.rejects(manifestSource(url, hash(jsonBytes(manifest))), /cross-origin/)
  await assert.rejects(manifestSource('http://fixture.invalid/package.json'), /HTTPS/)
  globalThis.fetch = async () => new Response('too large', { headers: { 'content-length': String(2 * 1024 * 1024) } })
  await assert.rejects(manifestSource(url, '0'.repeat(64)), /too large/)
})

test('unavailable captures can be honestly recorded without placeholder media, never accepted', async t => {
  const f = await fixture(t, d => { d.loops[0].acceptance = ['visual'] })
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  await f.record('missing-capability', 'a', { dimension: 'visual', verdict: 'unverified', capabilityGap: 'No authorized browser/media or reviewer capability.', executedAt: null, artifacts: [], coverage: [{ requirement: 'a', verdict: 'unverified', observation: 'No actual capture or review was run.' }] })
  assert.equal(load(f.project).state.evidence[0].artifacts.length, 0)
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'missing-capability' }), /passing evidence/)
})

test('failed evidence creates retained defects and forces fresh candidate repair', async t => {
  const f = await fixture(t); await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind()
  await f.record('failure', 'a', { verdict: 'fail', findings: [{ id: 'source-finding', description: 'Synthetic broken implementation.' }], coverage: [{ requirement: 'a', verdict: 'fail', observation: 'Synthetic finding, not a real game failure.' }] })
  assert.equal(load(f.project).state.candidate, null)
  assert.equal(load(f.project).state.defects[0].status, 'open')
  await assert.rejects(f.change('begin', { loop: 'a' }), /defects/)
  await f.bind(); await f.record('repaired')
  await f.change('resolve-defect', { id: 'source-finding', fix: 'Synthetic source repair.', evidence: ['repaired'] })
  assert.equal(load(f.project).state.evidence[0].verdict, 'fail')
})

test('invalid state mutation creates no bootstrap state as a side effect', async t => {
  const f = await fixture(t)
  const target = path.join(f.base, 'uninitialized'); fs.mkdirSync(target)
  await assert.rejects(mutate(target, 0, 'begin', c => operation(c, 'begin', receipt({ loop: 'a' }))), /ENOENT/)
  assert.equal(fs.existsSync(path.join(target, '.buildprint')), false)
})

test('installed runtime changes invalidate the bound candidate', async t => {
  const f = await fixture(t, d => { d.runtimeRoots = ['node_modules/runtime-fixture'] })
  write(path.join(f.project, 'node_modules/runtime-fixture/index.js'), '// original synthetic installed runtime')
  await f.approve(); await f.change('begin', { loop: 'a' }); await f.bind(); await f.record('runtime-bound')
  write(path.join(f.project, 'node_modules/runtime-fixture/index.js'), '// changed synthetic installed runtime')
  await assert.rejects(f.change('accept', { loop: 'a', evidence: 'runtime-bound' }), /installed runtime stale/)
})
