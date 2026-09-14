// Synthetic routing fixtures only. Skill hashes establish file availability, never agent reading.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { bootstrap } from '../src/runtime/bootstrap.js'
import { hash, jsonBytes } from '../src/runtime/io.js'
import { definitionCheck, load, mutate, next, operation, status } from '../src/runtime/state.js'
import { skillReadiness } from '../src/runtime/skills.js'

const write = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, typeof value === 'string' ? value : jsonBytes(value)) }
const receipt = value => ({ schema: 'agb/receipt/v2', ...value })

async function fixture(t, customize = () => {}) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-runtime-skills-'))
  t.after(() => fs.rmSync(base, { recursive: true, force: true }))
  const packet = path.join(base, 'packet'); const project = path.join(base, 'project')
  const definition = { schema: 'agb/loops/v2', approvals: ['contract'], bindingFiles: ['PROJECT_CONTRACT.md'], skillRoot: '.agents/skills', loops: [
    { id: 'setup', file: 'loops/setup.md', dependsOn: [], approvals: ['contract'], requirements: ['setup'], acceptance: ['implemented'], independentReview: false },
    { id: 'build', file: 'loops/build.md', dependsOn: ['setup'], approvals: ['contract'], requirements: ['build'], acceptance: ['implemented'], independentReview: false,
      skills: { required: ['setup-runbook'], optional: [{ id: 'frontend-ui-product-design', when: 'the loop changes UI' }] } }
  ] }
  customize(definition)
  write(path.join(packet, 'runtime.json'), definition)
  write(path.join(packet, 'BUILDPRINT.md'), '# Synthetic skill routing fixture\n')
  for (const id of ['setup', 'build']) write(path.join(packet, `loops/${id}.md`), `# ${id}\n`)
  const manifest = path.join(packet, 'package.json')
  write(manifest, { slug: 'skills-fixture', runtime: { schema: 'agb/runtime/v2', definition: 'runtime.json' }, files: ['BUILDPRINT.md', 'runtime.json', 'loops/setup.md', 'loops/build.md'] })
  await bootstrap(manifest, project, {}, () => {})
  write(path.join(project, 'PROJECT_CONTRACT.md'), '# Synthetic contract\n')
  const change = (action, value) => mutate(project, load(project).state.revision, action, context => operation(context, action, receipt(value)))
  const approve = () => change('approve', { id: 'contract', decision: 'approved', actor: 'synthetic operator', basis: 'Synthetic routing authorization.', contractSha256: hash(fs.readFileSync(path.join(project, 'PROJECT_CONTRACT.md'))) })
  return { project, change, approve, definition }
}

function installSkill(project, id, contents = '# Synthetic skill\n') {
  write(path.join(project, '.agents/skills/README.md'), '# Synthetic catalog\n')
  write(path.join(project, '.agents/skills', id, 'SKILL.md'), contents)
}

test('valid required and optional declarations report project and absolute paths with hashes', async t => {
  const f = await fixture(t)
  installSkill(f.project, 'setup-runbook')
  const ready = skillReadiness(f.project, f.definition, f.definition.loops[1])
  assert.equal(ready.ready, true)
  assert.equal(ready.catalog.projectPath, '.agents/skills/README.md')
  assert.equal(path.isAbsolute(ready.catalog.absolutePath), true)
  assert.match(ready.catalog.sha256, /^[a-f0-9]{64}$/)
  assert.equal(ready.optional[0].availability, 'missing')
  assert.match(ready.optional[0].when, /UI/)
  assert.equal(status(f.project).skillReadiness.build.ready, true)
})

test('missing required catalog or skill blocks begin and next provides actionable setup direction', async t => {
  const blocked = await fixture(t, d => { d.loops[0].skills = d.loops[1].skills; d.loops.splice(1, 1) })
  write(path.join(blocked.project, '.agents/skills/README.md'), '# Synthetic catalog\n')
  await blocked.approve()
  const revision = load(blocked.project).state.revision
  assert.match(next(blocked.project), /install or restore required skill: setup-runbook/)
  assert.match(next(blocked.project), new RegExp(path.resolve(blocked.project, '.agents/skills/setup-runbook/SKILL.md').replace(/\\/g, '\\\\')))
  assert.match(status(blocked.project).skillReadiness.setup.blockers.join(' '), /required skill: setup-runbook/)
  assert.equal(load(blocked.project).state.revision, revision)
  await assert.rejects(blocked.change('begin', { loop: 'setup' }), /skill setup blocked.*required skill: setup-runbook/)
  assert.equal(load(blocked.project).state.loops.setup.status, 'pending')
})

test('optional missing skill is reported as conditional advice and does not block its loop', async t => {
  const f = await fixture(t, d => { d.loops[0].skills = d.loops[1].skills; d.loops.splice(1, 1) })
  installSkill(f.project, 'setup-runbook')
  await f.approve(); await f.change('begin', { loop: 'setup' })
  assert.match(next(f.project), /Open optional recipes only when applicable/)
  assert.equal(status(f.project).skillReadiness.setup.ready, true)
  assert.equal(status(f.project).skillReadiness.setup.optional[0].availability, 'missing')
})

test('unsafe, malformed, duplicate, oversized, and rootless skill declarations are refused', () => {
  const base = { schema: 'agb/loops/v2', approvals: [], bindingFiles: ['PROJECT_CONTRACT.md'], skillRoot: 'skills', loops: [{ id: 'a', file: 'loops/a.md', dependsOn: [], approvals: [], requirements: ['a'], acceptance: ['implemented'], independentReview: false }] }
  const reject = skills => {
    const value = structuredClone(base); value.loops[0].skills = skills
    assert.throws(() => definitionCheck(value, [{ path: 'loops/a.md' }]), /skill/)
  }
  reject({ required: ['../escape'], optional: [] })
  reject({ required: ['same'], optional: [{ id: 'same', when: 'anything' }] })
  reject({ required: [], optional: [{ id: 'fine', when: '' }] })
  reject({ required: ['Uppercase'], optional: [] })
  reject({ required: Array.from({ length: 101 }, (_, index) => `skill-${index}`), optional: [] })
  const unsafeRoot = structuredClone(base); unsafeRoot.skillRoot = '../skills'; unsafeRoot.loops[0].skills = { required: [], optional: [] }
  assert.throws(() => definitionCheck(unsafeRoot, [{ path: 'loops/a.md' }]), /unsafe path/)
  const rootless = structuredClone(base); delete rootless.skillRoot; rootless.loops[0].skills = { required: [], optional: [] }
  assert.throws(() => definitionCheck(rootless, [{ path: 'loops/a.md' }]), /require definition.skillRoot/)
})

test('empty or symlinked required skills report invalid without mutating state, and loops remain isolated', async t => {
  const f = await fixture(t)
  write(path.join(f.project, '.agents/skills/README.md'), '# Catalog\n')
  const target = path.join(f.project, 'skill-target'); write(path.join(target, 'SKILL.md'), '# Target\n')
  const link = path.join(f.project, '.agents/skills/setup-runbook')
  fs.symlinkSync(target, link, 'junction')
  const revision = load(f.project).state.revision
  const readiness = skillReadiness(f.project, f.definition, f.definition.loops[1])
  assert.equal(readiness.required[0].availability, 'invalid')
  assert.match(readiness.required[0].reason, /symlink/)
  assert.equal(load(f.project).state.revision, revision)
  assert.equal(skillReadiness(f.project, f.definition, f.definition.loops[0]).ready, true)
  const empty = await fixture(t, d => { d.loops[0].skills = d.loops[1].skills; d.loops.splice(1, 1) })
  installSkill(empty.project, 'setup-runbook', '')
  await empty.approve()
  assert.equal(status(empty.project).skillReadiness.setup.required[0].availability, 'invalid')
  await assert.rejects(empty.change('begin', { loop: 'setup' }), /empty skill file refused/)
})

test('definitions without skill declarations remain backward compatible', async t => {
  const f = await fixture(t, d => { delete d.skillRoot; delete d.loops[1].skills })
  await f.approve(); await f.change('begin', { loop: 'setup' })
  assert.equal(status(f.project).skillReadiness.setup.declared, false)
  assert.doesNotMatch(next(f.project), /Skill routing/)
})
