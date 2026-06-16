#!/usr/bin/env node
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { execFile, execFileSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const template = path.join(root, 'buildprints/buildprint-mapper-os/templates/executable-packet')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mapper-overhaul-eval-'))

function copyTemplate(name) {
  const target = path.join(tmp, name)
  fs.cpSync(template, target, { recursive: true })
  return target
}

function edit(folder, rel, fn) {
  const file = path.join(folder, rel)
  fs.writeFileSync(file, fn(fs.readFileSync(file, 'utf8')))
}

function runAgb(args) {
  try {
    return { failed: false, output: execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 }) }
  } catch (error) {
    return { failed: true, output: `${error.stdout || ''}${error.stderr || ''}` }
  }
}

function runAgbAsync(args) {
  return new Promise((resolve) => {
    execFile(process.execPath, [path.join(root, 'bin/agb.js'), ...args], { encoding: 'utf8' }, (error, stdout, stderr) => {
      resolve({ failed: !!error, output: `${stdout || ''}${stderr || ''}` })
    })
  })
}

function expectPass(name, args, snippets = []) {
  const { failed, output } = runAgb(args)
  const missing = snippets.filter((snippet) => !output.includes(snippet))
  if (failed || missing.length) {
    console.error(output)
    console.error(`${name} failed; missing expected output: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
}

function expectFailure(name, args, snippets) {
  const { failed, output } = runAgb(args)
  const missing = snippets.filter((snippet) => !output.includes(snippet))
  if (!failed || missing.length) {
    console.error(output)
    console.error(`${name} failed; missing expected output: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
  console.log(snippets.map((snippet) => `  - ${snippet}`).join('\n'))
}

expectPass('mapper v3 template packet passes', ['packet', 'check', template], ['Packet check: PASS'])

const mapperDocs = [
  'BUILDPRINT.md',
  'SPEC.md',
  'CONTRACTS.md',
  'README.md',
  'vision.md',
  'policies/quality.md'
].map((rel) => [rel, fs.readFileSync(path.join(root, 'buildprints/buildprint-mapper-os', rel), 'utf8')])
const docCorpus = mapperDocs.map(([rel, text]) => `\n--- ${rel} ---\n${text}`).join('\n')
for (const required of [
  /BUILDPRINT\.md`? is (the )?(execution start and )?AI-builder briefing only/i,
  /UX is a must/i,
  /UI identity/i,
  /product metaphor/i,
  /dominant object/i,
  /primary gesture/i,
  /forbidden default silhouette/i,
  /Every phase (file )?must read `?02-ui-identity\.md`?/i,
  /blueprint\.yaml`? (is|mirrors|routes).*product[- ]contract/i,
  /Typed proof/i,
  /proof obligations by artifact type/i,
  /project-local skill harness/i,
  /harness\.profiles/i,
  /setup-runbook/i,
  /frontend UI product design|frontend-ui-product-design/i,
  /subagent-driven implementation|subagent-driven-implementation/i,
  /verify-and-review/i,
]) {
  if (!required.test(docCorpus)) {
    console.error(docCorpus)
    console.error(`mapper docs invariant missing: ${required}`)
    process.exit(1)
  }
}
for (const forbidden of [
  /BUILDPRINT\.md`? owns product identity/i,
  /BUILDPRINT\.md`? owns .*golden path/i,
  /artifact named in `BUILDPRINT\.md`/i,
  /if this phase touches UI/i,
  /only as needed for the active phase/i,
]) {
  if (forbidden.test(docCorpus)) {
    console.error(docCorpus.match(forbidden)?.[0] || forbidden)
    console.error(`mapper docs invariant violated: ${forbidden}`)
    process.exit(1)
  }
}
console.log('✓ mapper root docs teach v3 responsibility split')

const obsoletePacket = copyTemplate('obsolete-v2-packet')
fs.mkdirSync(path.join(obsoletePacket, 'slices/_template'), { recursive: true })
fs.writeFileSync(path.join(obsoletePacket, 'slices/_template/slice.yaml'), 'id: obsolete\npaths: []\n')
fs.mkdirSync(path.join(obsoletePacket, 'gates'), { recursive: true })
fs.writeFileSync(path.join(obsoletePacket, 'gates/gate-index.yaml'), 'gates: []\n')
edit(obsoletePacket, 'blueprint.yaml', (s) => s.replace('schema_version: mapper-os/executable-blueprint/v3', 'schema_version: mapper-os/executable-blueprint/v2\nslices_dir: slices\ngates_dir: gates\ncapsules_dir: teams'))
expectFailure('mapper eval rejects obsolete v2 packet', ['packet', 'check', obsoletePacket], ['✗ packet rejects obsolete v2 packet shape', '✗ packet has no obsolete useless files'])

const staleFiles = copyTemplate('stale-files')
fs.writeFileSync(path.join(staleFiles, '04-review.md'), '# Review\n')
fs.writeFileSync(path.join(staleFiles, '05-handover.md'), '# Old handover\n')
expectFailure('mapper eval rejects obsolete review/handover files', ['packet', 'check', staleFiles], ['✗ packet has no obsolete useless files'])

const missingQuestions = copyTemplate('missing-questions')
fs.rmSync(path.join(missingQuestions, '00-questions.md'))
expectFailure('mapper eval requires 00-questions', ['packet', 'check', missingQuestions], ['✗ packet file exists: 00-questions.md'])

const missingCentralOutput = copyTemplate('missing-central-output-contract')
edit(missingCentralOutput, 'blueprint.yaml', (s) => s.replace(/central_output_contract:/g, 'central_output_contract_removed:'))
expectFailure('mapper eval requires central output quality contract', ['packet', 'check', missingCentralOutput], ['✗ blueprint declares central output quality contract'])

const missingTypedGates = copyTemplate('missing-typed-quality-gates')
edit(missingTypedGates, 'blueprint.yaml', (s) => s.replace(/typed_quality_gates:/g, 'typed_quality_gates_removed:'))
expectFailure('mapper eval requires typed quality gate routing', ['packet', 'check', missingTypedGates], ['✗ blueprint declares typed quality gate routing'])

const missingProvenRequirements = copyTemplate('missing-proven-implementation-requirements')
edit(missingProvenRequirements, 'blueprint.yaml', (s) => s.replace(/proven_implementation_requirements:/g, 'proven_implementation_requirements_removed:'))
expectFailure('mapper eval requires proven implementation requirements', ['packet', 'check', missingProvenRequirements], ['✗ blueprint declares proven implementation requirements'])

const missingArchitectureProof = copyTemplate('missing-architecture-proof')
edit(missingArchitectureProof, '01-project-setup.md', (s) => s
  .replace(/docs\/architecture\.md/g, 'docs/architecture-removed.md')
  .replace(/applicable\/not applicable/g, 'selected or skipped')
  .replace(/command\/proof path/g, 'proof target'))
expectFailure('mapper eval requires architecture-routed typed proof setup', ['packet', 'check', missingArchitectureProof], ['✗ project setup routes typed quality through architecture'])

const missingSkillHarness = copyTemplate('missing-skill-harness')
edit(missingSkillHarness, '01-project-setup.md', (s) => s
  .replace(/agb harness init/g, 'manual setup')
  .replace(/agb harness checkup/g, 'manual check')
  .replace(/setup-runbook/g, 'setup')
  .replace(/Buildprint skill harness/gi, 'project notes')
  .replace(/frontend-ui-product-design/g, 'frontend')
  .replace(/subagent-driven-implementation/g, 'subagents')
  .replace(/verify-and-review/g, 'review')
  .replace(/completion_signal/g, 'done marker')
  .replace(/\.agents\/skills/g, '.agents/files'))
expectFailure('mapper eval requires local skill harness setup', ['packet', 'check', missingSkillHarness], ['✗ project setup requires local skill harness'])

const weakArchitectureQuality = copyTemplate('weak-architecture-quality')
edit(weakArchitectureQuality, '01-project-setup.md', (s) => s
  .replace(/Architecture is a best-effort engineering decision[\s\S]*?minimal-scope win\./, '')
  .replace(/- `docs\/architecture\.md` must include an engineering quality bar:[\s\S]*?enforce them\./, '')
  .replace(/- Do not ship a thin or default architecture[\s\S]*?keep scope minimal\./, '')
  .replace(/- `docs\/architecture\.md` names scalability seams[\s\S]*?type-check gates;/, ''))
expectFailure('mapper eval requires engineering quality bar in setup',
  ['packet', 'check', weakArchitectureQuality],
  ['✗ project setup requires engineering quality bar'])

const missingScreenStateContract = copyTemplate('missing-screen-state-contract')
edit(missingScreenStateContract, '02-ui-identity.md', (s) => s
  .replace(/docs\/ui-identity\.md/g, 'docs/identity-removed.md')
  .replace(/dominant object/g, 'main thing')
  .replace(/primary gesture/g, 'main action')
  .replace(/screen states|screen-state/g, 'screens')
  .replace(/visible-together/g, 'shown')
  .replace(/hidden\/reachable/g, 'later')
  .replace(/forbidden default silhouette/g, 'blocked layout')
  .replace(/first-run comprehension/g, 'first impression'))
expectFailure('mapper eval requires UI identity screen-state contract', ['packet', 'check', missingScreenStateContract], ['✗ ui identity requires product metaphor and manipulation model'])

const weakUiIdentityConcept = copyTemplate('weak-ui-identity-concept')
edit(weakUiIdentityConcept, '02-ui-identity.md', (s) => s
  .replace(/## Required sections in the generated UI identity[\s\S]*?## Minimum proof before moving to phases/, '## Required sections in the generated UI identity\n\nWrite style and layout rules.\n\n## Minimum proof before moving to phases')
  .replace(/The generated identity also fails[\s\S]*?screenshot-level acceptance criteria\.\n/, ''))
expectFailure('mapper eval rejects UI identity without product concept', ['packet', 'check', weakUiIdentityConcept], ['✗ ui identity requires product metaphor and manipulation model'])

const weakUiIdentitySilhouette = copyTemplate('weak-ui-identity-silhouette')
edit(weakUiIdentitySilhouette, '02-ui-identity.md', (s) => s
  .replace(/3\. Silhouette rejection:[\s\S]*?\n4\. First-run comprehension contract:/, '3. Layout preference: use a clear responsive layout.\n4. First-run comprehension contract:')
  .replace(/The generated identity also fails[\s\S]*?screenshot-level acceptance criteria\./, 'The generated identity must be clear and product-specific.'))
expectFailure('mapper eval rejects UI identity without silhouette rejection', ['packet', 'check', weakUiIdentitySilhouette], ['✗ ui identity rejects default product silhouette'])

const weakUiIdentityDistinctiveness = copyTemplate('weak-ui-identity-distinctiveness')
edit(weakUiIdentityDistinctiveness, '02-ui-identity.md', (s) => s
  .replace(/Name the adjacent at-risk silhouette[\s\S]*?distinguishing treatment\./, '')
  .replace(/Include an anti-silhouette distinctiveness screenshot check:[\s\S]*?do not satisfy this obligation\./, ''))
expectFailure('mapper eval rejects UI identity without distinctiveness proof',
  ['packet', 'check', weakUiIdentityDistinctiveness],
  ['✗ ui identity requires nearest-silhouette distinguishing treatment',
    '✗ ui identity requires anti-silhouette distinctiveness proof'])

const weakHandoverTypedGates = copyTemplate('weak-handover-typed-gates')
edit(weakHandoverTypedGates, 'HANDOVER.md', (s) => s.replace(/- Typed quality gates:[\s\S]*?(?=- Central output quality evidence:)/, ''))
expectFailure('mapper eval requires typed gate handover', ['packet', 'check', weakHandoverTypedGates], ['✗ handover captures typed quality gate results'])

const weakObjective = copyTemplate('weak-objective')
edit(weakObjective, '03-phases/02-core-product-loop.md', (s) => s.replace(/## Building objective[\s\S]*?## DO NOT/, '## Building objective\n\nBuild stuff.\n\n## DO NOT'))
expectFailure('mapper eval rejects tiny phase objectives', ['packet', 'check', weakObjective], ['✗ 03-phases/02-core-product-loop.md has substantial building objective'])

const missingHeading = copyTemplate('missing-phase-heading')
edit(missingHeading, '03-phases/03-state-runtime-and-integrations.md', (s) => s.replace('## Handoff note', '## Notes'))
expectFailure('mapper eval rejects missing comprehensive phase heading', ['packet', 'check', missingHeading], ['✗ 03-phases/03-state-runtime-and-integrations.md has comprehensive phase headings'])

const weakFlow = copyTemplate('weak-flow')
edit(weakFlow, '03-phases/phase-flow.md', () => '# Phase Flow\n\nJust code all phases.\n')
expectFailure('mapper eval rejects weak phase flow', ['packet', 'check', weakFlow], ['✗ phase flow defines active phase loop', '✗ phase flow rejects proof theater', '✗ phase flow defines repair routing'])

const weakCriticalReviewExperience = copyTemplate('weak-critical-review-experience')
edit(weakCriticalReviewExperience, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/5\. Run screenshot delta review[\s\S]*?\n8\. Score the artifact/, '5. Look at screenshots.\n8. Score the artifact')
  .replace(/- Experience originality:[^\n]*\n/, '')
  .replace(/- Progressive disclosure and screen-state hierarchy:[^\n]*\n/, '')
  .replace(/experience originality[^.\n]*\./gi, '')
  .replace(/progressive-disclosure review[^.\n]*\./gi, '')
  .replace(/screenshot delta review[^.\n]*\./gi, ''))
expectFailure('mapper eval rejects weak critical review experience gate', ['packet', 'check', weakCriticalReviewExperience], ['✗ critical-review-pushback requires experience originality, disclosure, and screenshot delta'])

const weakCriticalReviewIndependence = copyTemplate('weak-critical-review-independence')
edit(weakCriticalReviewIndependence, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/## External reviewer independence protocol[\s\S]*?## How to implement this phase/, '## How to implement this phase')
  .replace(/Objective auto-fail triggers[\s\S]*?## Rubric/, '## Rubric')
  .replace(/five worst flaws[^.\n]*\./gi, '')
  .replace(/prose-only justification[^.\n]*\./gi, ''))
expectFailure('mapper eval rejects weak critical review independence gate', ['packet', 'check', weakCriticalReviewIndependence], ['✗ critical-review-pushback requires external reviewer independence', '✗ critical-review-pushback defines objective auto-fail triggers'])

const weakCriticalReviewArchitecture = copyTemplate('weak-critical-review-architecture')
edit(weakCriticalReviewArchitecture, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/- \*\*Thin or default architecture\*\*:[\s\S]*?Runtime\/proof integrity\*\* at 2\.\r?\n/, ''))
expectFailure('mapper eval rejects critical review without architecture auto-fail', ['packet', 'check', weakCriticalReviewArchitecture], ['✗ critical-review-pushback defines objective auto-fail triggers'])

const weakCriticalReviewCapture = copyTemplate('weak-critical-review-capture')
edit(weakCriticalReviewCapture, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/ Capture UI screenshots using the screenshot-capture protocol:[\s\S]*?desktop-only or single capture\./, ''))
expectFailure('mapper eval rejects critical review without capture protocol', ['packet', 'check', weakCriticalReviewCapture], ['✗ critical-review-pushback defines screenshot capture protocol'])

const cliHelp = runAgb(['--help']).output
for (const stale of ['persona --slice', 'state derive', 'slice status']) {
  if (cliHelp.includes(stale)) {
    console.error(cliHelp)
    console.error(`cli eval failed; help still exposes obsolete command: ${stale}`)
    process.exit(1)
  }
}
console.log('✓ cli help no longer exposes obsolete runner commands')
expectFailure('cli eval rejects removed persona command', ['persona', '--slice', 'slices/x/slice.yaml', '--role', 'build'], ['Usage:'])

const harnessFixture = path.join(tmp, 'harness-fixture')
fs.mkdirSync(harnessFixture, { recursive: true })
expectFailure('cli eval detects missing project harness', ['harness', 'check', harnessFixture], ['Harness check: MISSING'])
expectPass('cli eval initializes project harness', ['harness', 'init', harnessFixture], ['Harness check: PASS', 'Providers: agents'])
expectPass('cli eval verifies initialized project harness', ['harness', 'check', harnessFixture], ['Harness check: PASS', 'Providers: agents'])
for (const required of [
  'AGENTS.md',
  '.agents/skills/setup-runbook/SKILL.md',
  '.agents/skills/frontend-ui-product-design/SKILL.md',
  '.agents/skills/subagent-driven-implementation/SKILL.md',
  '.agents/skills/verify-and-review/SKILL.md'
]) {
  if (!fs.existsSync(path.join(harnessFixture, required))) {
    console.error(`cli eval failed; harness init missing ${required}`)
    process.exit(1)
  }
}
for (const forbidden of ['.codex/skills', '.claude/skills', '.cline/skills', '.cursor/rules']) {
  if (fs.existsSync(path.join(harnessFixture, forbidden))) {
    console.error(`cli eval failed; default harness should not create ${forbidden}`)
    process.exit(1)
  }
}
expectPass('cli eval checkup warns until setup artifacts exist', ['harness', 'checkup', harnessFixture], ['Harness checkup: WARN', '.buildprint/setup-receipt.md exists'])
expectPass('cli eval initializes webapp profile skills', ['harness', 'init', harnessFixture, '--profile', 'webapp'], ['Profiles: webapp', 'frontend-visual-qa', 'asset-pipeline'])
expectPass('cli eval initializes multiple profile skills', ['harness', 'init', harnessFixture, '--profile', 'webapp', '--profile', 'backend'], ['Profiles: webapp, backend', 'api-contract-checks', 'frontend-visual-qa'])
const harnessAgentsMd = fs.readFileSync(path.join(harnessFixture, 'AGENTS.md'), 'utf8')
if (!/Buildprint Skill Harness/.test(harnessAgentsMd) || !/setup-runbook/.test(harnessAgentsMd) || !/frontend-ui-product-design/.test(harnessAgentsMd) || !/subagent-driven-implementation/.test(harnessAgentsMd) || !/verify-and-review/.test(harnessAgentsMd) || !/completion_signal/.test(harnessAgentsMd)) {
  console.error(harnessAgentsMd)
  console.error('cli eval failed; AGENTS.md harness section is incomplete')
  process.exit(1)
}
console.log('✓ cli eval writes project-local skill harness')

const claudeFixture = path.join(tmp, 'claude-fixture')
expectPass('cli eval initializes claude provider only', ['harness', 'init', claudeFixture, '--provider', 'claude', '--profile', 'webapp'], ['Providers: claude', '.claude/skills/frontend-ui-product-design/SKILL.md'])
if (fs.existsSync(path.join(claudeFixture, '.agents/skills')) || !fs.existsSync(path.join(claudeFixture, '.claude/skills/frontend-ui-product-design/SKILL.md'))) {
  console.error('cli eval failed; claude provider should write only .claude/skills plus AGENTS.md')
  process.exit(1)
}

const clineFixture = path.join(tmp, 'cline-fixture')
expectPass('cli eval initializes cline provider only', ['harness', 'init', clineFixture, '--provider', 'cline', '--profile', 'webapp'], ['Providers: cline', '.cline/skills/frontend-ui-product-design/SKILL.md'])
if (fs.existsSync(path.join(clineFixture, '.agents/skills')) || !fs.existsSync(path.join(clineFixture, '.cline/skills/frontend-ui-product-design/SKILL.md'))) {
  console.error('cli eval failed; cline provider should write only .cline/skills plus AGENTS.md')
  process.exit(1)
}

const cursorFixture = path.join(tmp, 'cursor-fixture')
expectPass('cli eval initializes cursor rules provider only', ['harness', 'init', cursorFixture, '--provider', 'cursor', '--profile', 'webapp'], ['Providers: cursor', '.cursor/rules/buildprint-frontend-ui-product-design.mdc'])
if (fs.existsSync(path.join(cursorFixture, '.agents/skills')) || !fs.existsSync(path.join(cursorFixture, '.cursor/rules/buildprint-frontend-ui-product-design.mdc'))) {
  console.error('cli eval failed; cursor provider should write only .cursor/rules plus AGENTS.md')
  process.exit(1)
}
console.log('✓ cli eval writes only the requested evidence-backed provider folder')

const traversalPackage = path.join(tmp, 'traversal-package')
fs.mkdirSync(traversalPackage, { recursive: true })
const traversalManifest = path.join(traversalPackage, 'package.json')
fs.writeFileSync(traversalManifest, JSON.stringify({ files: [{ path: '../escape.txt' }] }, null, 2))
expectFailure('cli eval rejects manifest path traversal during packet check', ['packet', 'check', traversalManifest], ['unsafe manifest file path'])
if (fs.existsSync(path.join(tmp, 'escape.txt'))) {
  console.error('cli eval failed; packet check wrote outside the manifest materialization directory')
  process.exit(1)
}

const traversalStartPackage = path.join(tmp, 'traversal-start-package')
fs.mkdirSync(traversalStartPackage, { recursive: true })
const traversalStartManifest = path.join(traversalStartPackage, 'package.json')
fs.writeFileSync(traversalStartManifest, JSON.stringify({ slug: 'traversal-start', files: [{ path: '../escape.txt', rawUrl: 'escape.txt' }] }, null, 2))
expectFailure('cli eval rejects manifest path traversal during start', ['start', traversalStartManifest, path.join(tmp, 'traversal-target')], ['unsafe manifest file path'])
if (fs.existsSync(path.join(tmp, 'escape.txt'))) {
  console.error('cli eval failed; start wrote outside the snapshot directory')
  process.exit(1)
}

const redactionFiles = {
  '/package.json': JSON.stringify({
    slug: 'redaction-package',
    title: 'Redaction Package',
    files: [
      { path: 'BUILDPRINT.md', rawUrl: 'BUILDPRINT.md?fileToken=leaksecret' },
      { path: '00-questions.md', rawUrl: '00-questions.md?fileToken=leaksecret' },
      { path: '01-project-setup.md', rawUrl: '01-project-setup.md?fileToken=leaksecret' },
      { path: '02-ui-identity.md', rawUrl: '02-ui-identity.md?fileToken=leaksecret' },
      { path: 'blueprint.yaml', rawUrl: 'blueprint.yaml?fileToken=leaksecret' },
      { path: '03-phases/phase-index.yaml', rawUrl: '03-phases/phase-index.yaml?fileToken=leaksecret' },
      { path: '03-phases/phase-flow.md', rawUrl: '03-phases/phase-flow.md?fileToken=leaksecret' },
      { path: '03-phases/01-start.md', rawUrl: '03-phases/01-start.md?fileToken=leaksecret' },
      { path: 'README.md', rawUrl: 'README.md?fileToken=leaksecret' },
      { path: 'HANDOVER.md', rawUrl: 'HANDOVER.md?fileToken=leaksecret' }
    ],
    entrypoints: {
      agent: 'agent.md?agentToken=leaksecret',
      prompt: 'prompt.md?promptToken=leaksecret',
      github: 'https://example.invalid/repo?githubToken=leaksecret',
      rawBase: 'https://example.invalid/raw?rawToken=leaksecret'
    }
  }, null, 2),
  '/BUILDPRINT.md': '# BUILDPRINT: Redaction Package\n\nThis file is long enough for snapshot minimum checks. Read 00-questions.md, 01-project-setup.md, 02-ui-identity.md, 03-phases/phase-index.yaml, 03-phases/phase-flow.md, README.md, HANDOVER.md.\n',
  '/00-questions.md': '# 00 Questions\n\nHard-stop questions, Assumable defaults, and Deferrable questions. If blocked, stop before 01-project-setup.md.\n',
  '/01-project-setup.md': '# 01 Project Setup\n\nThis project setup file is long enough for snapshot checks and requires agb harness init, agb harness checkup, Buildprint skill harness, setup-runbook, frontend-ui-product-design, subagent-driven-implementation, verify-and-review, triggers, skips, completion_signal, .agents/skills, docs/architecture.md, command/proof path, applicable/not applicable setup, AGENTS.md, .env.example, setup-receipt.md, placeholder commands, real secrets, hide hard-stop, proven_implementation_requirements, libraries, runtimes, SDKs, platform services, hand-roll, and from-scratch.\n',
  '/02-ui-identity.md': '# 02 UI Identity\n\nUX is a must. The experience must be understandable and a confusing interface is not a finished product. This runs after 01-project-setup.md and before 03-phases/*. Generate a local docs/ui-identity.md or UI-IDENTITY.md after setup and before phase work. Load frontend-ui-product-design from .agents/skills/frontend-ui-product-design/SKILL.md and references/screen-states.md, returning to 01-project-setup.md if missing. Required sections include First-run comprehension contract, User-language map, Creative product concept, product metaphor, dominant object, primary gesture, moment-to-moment manipulation, Silhouette rejection, forbidden default silhouette, generic dashboard, renamed workbench, card grid, proof console, Product identity thesis, Chosen style direction, Layout model, Interaction model, Component language, Color and typography tokens, Content stress fixtures, Proof obligations, screenshot delta review, exact semantic color, typography, state colors, focus, empty/loading/error/blocked, functionless buttons, dead controls, raw JSON, and evaluator language. Think deeply about the golden path and central output before phase implementation.\n',
  '/blueprint.yaml': 'schema_version: mapper-os/executable-blueprint/v3\nexecution_start: BUILDPRINT.md\nmachine_contract: blueprint.yaml\nharness:\n  provider: agents\n  profiles:\n    - webapp\n    - backend\nproven_implementation_requirements:\n  rule: use proven libraries, proven packages, or a proven tool path for fixed-format export, rich text editing, document parsing, drag reorder behavior, provider clients, task status, migrations, and any from-scratch custom implementation.\n',
  '/03-phases/phase-index.yaml': 'schema_version: mapper-os/phase-index/v3\nactive_phase: 03-phases/01-start.md\nphases:\n  - phase_id: 01-start\n    file: 03-phases/01-start.md\n    status: included\n',
  '/03-phases/phase-flow.md': '# Phase Flow\n\nUse active phase only.\n',
  '/03-phases/01-start.md': '# Phase 01\n\n## How to implement this phase\n\nRead phase-flow.\n\n## Building objective\n\nBuild a real path.\n\n## DO NOT\n\nNo placeholders.\n\n## Minimum proof before moving on\n\nRun checks.\n\n## Handoff note\n\nRecord proof.\n',
  '/README.md': '# Product Name\n\n![Version](https://img.shields.io/badge/version-0.1.0-blue)\n\nFeatures, requirements, provider keys, quick start, verification, and limitations.\n',
  '/HANDOVER.md': '# Handover\n\nBuilt, verified, blocked, not proven, next.\n'
}
const redactionServer = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname
  const body = redactionFiles[pathname]
  if (!body) {
    res.writeHead(404, { connection: 'close' })
    res.end('not found')
    return
  }
  res.writeHead(200, { 'content-type': pathname.endsWith('.json') ? 'application/json' : 'text/plain', connection: 'close' })
  res.end(body)
})
const redactionSockets = new Set()
redactionServer.on('connection', (socket) => {
  redactionSockets.add(socket)
  socket.on('close', () => redactionSockets.delete(socket))
})
await new Promise((resolve) => redactionServer.listen(0, '127.0.0.1', resolve))
try {
  const { port } = redactionServer.address()
  const redactionTarget = path.join(tmp, 'redaction-target')
  const redactionManifestUrl = `http://127.0.0.1:${port}/package.json?manifestToken=leaksecret`
  const { failed, output } = await runAgbAsync(['start', redactionManifestUrl, redactionTarget])
  if (failed && !fs.existsSync(path.join(redactionTarget, '.buildprint/source.json'))) {
    console.error(output)
    console.error('cli eval failed to start redaction fixture')
    process.exit(1)
  }
  const sourceJson = fs.readFileSync(path.join(redactionTarget, '.buildprint/source.json'), 'utf8')
  const source = JSON.parse(sourceJson)
  const urlFields = [source.manifestUrl, source.agentUrl, source.promptUrl, source.githubUrl, source.rawBase, ...source.downloaded.map((file) => file.sourceUrl)]
  if (/leaksecret|manifestToken|fileToken|agentToken|promptToken|githubToken|rawToken/.test(sourceJson) || !urlFields.every((value) => typeof value === 'string' && value.includes('redacted=1'))) {
    console.error(sourceJson)
    console.error('cli eval failed to redact tokenized source metadata')
    process.exit(1)
  }
  const nextAgent = fs.readFileSync(path.join(redactionTarget, '.buildprint/next-agent.md'), 'utf8')
  for (const expected of ['00-questions.md', '01-project-setup.md', '02-ui-identity.md', '03-phases/phase-flow.md', 'HANDOVER.md']) {
    if (!nextAgent.includes(expected)) {
      console.error(nextAgent)
      console.error(`cli eval failed; next-agent missing v3 read order item: ${expected}`)
      process.exit(1)
    }
  }
  if (!nextAgent.includes('agb harness init .')) {
    console.error(nextAgent)
    console.error('cli eval failed; next-agent missing local harness initialization step')
    process.exit(1)
  }
  if (!nextAgent.includes('agb harness checkup .')) {
    console.error(nextAgent)
    console.error('cli eval failed; next-agent missing local harness checkup step')
    process.exit(1)
  }
  if (!nextAgent.includes('agb harness init . --provider agents --profile webapp --profile backend')) {
    console.error(nextAgent)
    console.error('cli eval failed; next-agent missing blueprint-declared harness profiles')
    process.exit(1)
  }
  if (/01-ui-identity\.md|02-project-setup\.md|02-uiux-decision\.md|04-review\.md|05-handover\.md|smallest real usable slice/.test(nextAgent)) {
    console.error(nextAgent)
    console.error('cli eval failed; next-agent still references obsolete v2 files/language')
    process.exit(1)
  }
  console.log('✓ cli eval redacted tokenized source metadata and wrote v3 next-agent')
} finally {
  for (const socket of redactionSockets) socket.destroy()
  await new Promise((resolve) => redactionServer.close(resolve))
}

const nestedStartPackage = path.join(tmp, 'nested-start-package')
const nestedTarget = path.join(tmp, 'nested-start-target')
const nestedPrefix = 'templates/executable-packet'
fs.mkdirSync(path.join(nestedStartPackage, nestedPrefix, '03-phases'), { recursive: true })
const nestedFiles = [
  'BUILDPRINT.md',
  '00-questions.md',
  '01-project-setup.md',
  '02-ui-identity.md',
  'blueprint.yaml',
  '03-phases/phase-index.yaml',
  '03-phases/phase-flow.md',
  '03-phases/01-start.md',
  'README.md',
  'HANDOVER.md'
]
fs.writeFileSync(path.join(nestedStartPackage, 'package.json'), JSON.stringify({
  slug: 'nested-start-package',
  title: 'Nested Start Package',
  files: nestedFiles.map((file) => ({ path: `${nestedPrefix}/${file}` }))
}, null, 2))
for (const file of nestedFiles) {
  const body = redactionFiles[`/${file}`]
  const target = path.join(nestedStartPackage, nestedPrefix, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, body)
}
expectPass('cli eval starts nested executable packet template', ['start', path.join(nestedStartPackage, 'package.json'), nestedTarget], ['Downloaded 10 snapshot files'])
const nestedNextAgent = fs.readFileSync(path.join(nestedTarget, '.buildprint/next-agent.md'), 'utf8')
if (!nestedNextAgent.includes('.buildprint/snapshots/templates/executable-packet/01-project-setup.md') || !nestedNextAgent.includes('agb harness init . --provider agents --profile webapp --profile backend')) {
  console.error(nestedNextAgent)
  console.error('cli eval failed; nested executable packet start did not preserve template paths and harness profiles')
  process.exit(1)
}
console.log('✓ cli eval starts nested executable packet template with profile handoff')

// ---------------------------------------------------------------------------
// Packet-check: decisions hard-stop requirement in setup (negative test)
// ---------------------------------------------------------------------------
const weakDecisionsSetup = copyTemplate('weak-decisions-setup')
edit(weakDecisionsSetup, '01-project-setup.md', (text) =>
  text.replace(/- Do not start phase work while.*\r?\n/, '')
    .replace(/- `\.buildprint\/decisions\.md` records confirmed answers.*\r?\n/, '')
)
expectFailure(
  'mapper eval rejects setup without decisions hard-stop requirement',
  ['packet', 'check', weakDecisionsSetup],
  ['✗ project setup requires decisions hard-stop before phase work']
)

// ---------------------------------------------------------------------------
// Packet-check: critical-review artifact verification reference (negative test)
// ---------------------------------------------------------------------------
const weakCrNoArtifactRef = copyTemplate('weak-cr-no-artifact-ref')
edit(weakCrNoArtifactRef, '03-phases/critical-review-pushback.md', (text) =>
  text.replace(/agb verify ui \./gi, 'run verification').replace(/artifact-check\.md/gi, 'verification-check.md')
)
expectFailure(
  'mapper eval rejects critical-review without artifact-check reference',
  ['packet', 'check', weakCrNoArtifactRef],
  ['✗ critical-review-pushback references artifact verification']
)

// ---------------------------------------------------------------------------
// Packet-check: critical-review three-track pass requirement (negative test)
// ---------------------------------------------------------------------------
const weakCrNoThreeTracks = copyTemplate('weak-cr-no-three-tracks')
edit(weakCrNoThreeTracks, '03-phases/critical-review-pushback.md', (text) =>
  text.replace(/Track B \(product\/UI\) and Track C[\s\S]*?open\.\*\*/m, '')
    .replace(/\*\*Track B.*Track C.*must both be fully clear[^*]*\*\*/g, '')
)
expectFailure(
  'mapper eval rejects critical-review without three-track pass requirement',
  ['packet', 'check', weakCrNoThreeTracks],
  ['✗ critical-review-pushback defines three-track pass requirement']
)

// ---------------------------------------------------------------------------
// Packet-check: critical-review blocks pass on UI/decisions track (negative test)
// ---------------------------------------------------------------------------
const weakCrNoTrackBlock = copyTemplate('weak-cr-no-track-block')
edit(weakCrNoTrackBlock, '03-phases/critical-review-pushback.md', (text) =>
  text.replace(/may not reach PASS or PENDING_RECHECK.*Track B[^\n]*/g, '')
    .replace(/PASS or PENDING_RECHECK.*resolving only Track A[^\n]*/g, '')
)
expectFailure(
  'mapper eval rejects critical-review that does not block pass on UI/decisions track',
  ['packet', 'check', weakCrNoTrackBlock],
  ['✗ critical-review-pushback blocks pass on UI/decisions track failure']
)

// ---------------------------------------------------------------------------
// agb verify ui: slop project fixture (expect fail on 3 checks)
// ---------------------------------------------------------------------------
const slopProject = path.join(tmp, 'slop-project')
fs.mkdirSync(path.join(slopProject, '.buildprint'), { recursive: true })
fs.mkdirSync(path.join(slopProject, 'public'), { recursive: true })
fs.writeFileSync(path.join(slopProject, '.buildprint', 'decisions.md'), '# Decisions\n\nNo implementation decisions recorded yet. Add confirmed alignment choices here.\n')
fs.writeFileSync(path.join(slopProject, '.buildprint', 'state.json'), JSON.stringify({ completedPhases: ['01-setup', '02-ui'] }))
fs.writeFileSync(path.join(slopProject, 'public', 'index.html'), `<!doctype html>
<html><head><title>Slop Workbench</title></head>
<body>
<script>
function renderEvents(events) {
  document.getElementById('events').textContent = JSON.stringify(events, null, 2);
}
</script>
<div id="events"></div>
</body></html>
`)
{
  const { failed, output } = runAgb(['verify', 'ui', slopProject])
  const missing = ['decisions-stub', 'raw-json-in-dom'].filter((id) => !output.includes(id))
  if (!failed || missing.length) {
    console.error(output)
    console.error(`agb verify ui slop fixture test failed; missing expected checks: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log('✓ agb verify ui correctly fails slop project (decisions-stub + raw-json-in-dom)')
  console.log(['  - decisions-stub', '  - raw-json-in-dom'].join('\n'))
}

// ---------------------------------------------------------------------------
// agb verify ui: clean project fixture (expect pass)
// ---------------------------------------------------------------------------
const cleanProject = path.join(tmp, 'clean-project')
fs.mkdirSync(path.join(cleanProject, '.buildprint'), { recursive: true })
fs.mkdirSync(path.join(cleanProject, 'public'), { recursive: true })
fs.mkdirSync(path.join(cleanProject, 'docs'), { recursive: true })
fs.writeFileSync(path.join(cleanProject, '.buildprint', 'decisions.md'), '# Decisions\n\n| Question | Answer |\n|---|---|\n| Deployment posture | trusted_local |\n')
fs.writeFileSync(path.join(cleanProject, '.buildprint', 'state.json'), JSON.stringify({ completedPhases: ['01-setup'] }))
fs.writeFileSync(path.join(cleanProject, 'docs', 'ui-identity.md'), '# UI Identity\n\n## 5) User-language map\n\n- Forbidden main surface words:\n  - "proof"\n')
fs.writeFileSync(path.join(cleanProject, 'public', 'index.html'), `<!doctype html>
<html><head><title>Clean App</title></head>
<body>
<script>
function renderMessages(messages) {
  const container = document.getElementById('feed');
  messages.forEach((m) => {
    const el = document.createElement('div');
    el.textContent = m.content;
    container.appendChild(el);
  });
}
</script>
<div id="feed"></div>
</body></html>
`)
expectPass('agb verify ui passes clean project', ['verify', 'ui', cleanProject])
