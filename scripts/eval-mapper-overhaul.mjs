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

function runPacketCheck(folder) {
  return runAgb(['packet', 'check', folder])
}

function runAgb(args) {
  try {
    return {
      failed: false,
      output: execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 })
    }
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

function expectFailures(name, folder, labels) {
  const { failed, output } = runPacketCheck(folder)
  const missing = labels.filter((label) => !output.includes(`✗ ${label}`))
  if (!failed || missing.length) {
    console.error(output)
    console.error(`${name} failed; missing expected checker failures: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
  console.log(labels.map((label) => `  - ${label}`).join('\n'))
}

function expectAgbFailure(name, args, snippets) {
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

const malformed = copyTemplate('bad-selected')
edit(malformed, 'blueprint.yaml', (s) => s.replace(/^qualification_label:.*\n/m, '').replace(/^claim_status:.*\n/m, '').replace(/^setup_tier:.*\n/m, '').replace(/blueprint_mode:[\s\S]*?agent_contract:/m, 'agent_contract:'))
edit(malformed, '03-phases/phase-index.yaml', (s) => s.replace('active_phase: 03-phases/00-product-system-alignment.md', 'active_phase: 00-product-system-alignment'))
edit(malformed, 'generated/agent-prompt.md', () => '# Agent prompt\n\nGenerated from: blueprint.yaml\n\nBuild the requested files.\n')
edit(malformed, '01-questions.md', () => '# Questions\n\nWhat should we build?\n')
edit(malformed, '02-project-setup.md', () => '# Setup\n\nRun the tests.\n')
edit(malformed, '03-phases/00-product-system-alignment.md', () => `# Phase 00 - Alignment

requires_roles: [product-architect]

## Product intention

Discuss the product direction.

## Build

Write notes.

## Required output (product-architect)

Summarize alignment.

## Blocks (product-architect)

None.

## Quality bar

Looks aligned.

## Do not ship

Confusion.

## Repair routing

Repair here.
`)
fs.rmSync(path.join(malformed, '04-review.md'))
fs.rmSync(path.join(malformed, '05-handover.md'))

expectFailures('mapper executable-integrity eval rejected malformed selected packet', malformed, [
  'packet includes review/handover',
  'blueprint declares qualification label',
  'blueprint declares setup tier',
  'blueprint declares artifact mode',
  'questions classify blocking power',
  'questions hard-stop sensitive decisions',
  'project setup defines implementation alignment',
  'project setup consumes questions into decisions',
  'project setup requires durable setup artifacts',
  'project setup requires agent and UI identity contracts',
  'project setup forces architect base not vibes',
  'phase 00 defines product system alignment',
  'phase index names active phase file',
  'generated prompt is alignment speech, not authority',
  'generated prompt includes anti-slop/product reviewer when present'
])

const missingHardening = copyTemplate('missing-hardening')
edit(missingHardening, '03-phases/phase-index.yaml', (s) => s.replace(/  - phase_id: 09-auth-and-tenancy[\s\S]*?(?=  - phase_id: 99-final-review-handover)/, ''))
expectFailures('mapper eval rejected missing hardening phases', missingHardening, [
  'phase index includes posture hardening phases'
])

const nonProductWrongSpine = copyTemplate('non-product-wrong-spine')
edit(nonProductWrongSpine, 'blueprint.yaml', (s) => s.replace('primary: product', 'primary: integration').replace('consumer: end_user', 'consumer: developer').replace('selected_spine: product_app_consumer_first', 'selected_spine: developer_first_framework'))
expectFailures('mapper eval rejected non-product product-only spine', nonProductWrongSpine, [
  'developer_first_framework spine uses Developer-First phases'
])

const nonProductProductSpine = copyTemplate('non-product-product-spine')
edit(nonProductProductSpine, 'blueprint.yaml', (s) => s.replace('primary: product', 'primary: integration').replace('consumer: end_user', 'consumer: developer'))
expectFailures('mapper eval rejected non-product primary with product spine', nonProductProductSpine, [
  'blueprint primary uses matching executable spine'
])

const unknownSpine = copyTemplate('unknown-spine')
edit(unknownSpine, 'blueprint.yaml', (s) => s.replace('selected_spine: product_app_consumer_first', 'selected_spine: custom_productish_spine'))
expectFailures('mapper eval rejected unknown selected spine', unknownSpine, [
  'selected spine uses known executable spine'
])

const invalidPosture = copyTemplate('invalid-posture')
edit(invalidPosture, 'blueprint.yaml', (s) => s.replace('current: trusted_local', 'current: trusted-local'))
edit(invalidPosture, '03-phases/phase-index.yaml', (s) => s.replace('deployment_posture: trusted_local', 'deployment_posture: trusted-local'))
expectFailures('mapper eval rejected invalid posture spelling', invalidPosture, [
  'packet uses canonical posture and phase status values'
])

const invalidStatus = copyTemplate('invalid-status')
edit(invalidStatus, '03-phases/phase-index.yaml', (s) => s.replace(/status: included_blocked/g, 'status: INCLUDED_BLOCKED'))
expectFailures('mapper eval rejected invalid phase status spelling', invalidStatus, [
  'packet uses canonical posture and phase status values'
])

const observabilityWithoutRole = copyTemplate('observability-without-role')
edit(observabilityWithoutRole, '03-phases/conditional/observability-and-health.md', (s) => s.replace('requires_roles: [integration-runtime, product-architect, security-boundary]', 'requires_roles: [integration-runtime, product-architect]'))
expectFailures('mapper eval rejected observability without security-boundary role', observabilityWithoutRole, [
  'observability phase embeds security-boundary'
])

const observabilityWithoutOutput = copyTemplate('observability-without-output')
edit(observabilityWithoutOutput, '03-phases/conditional/observability-and-health.md', (s) => s.replace(/\n## Required output \(security-boundary\)[\s\S]*?(?=\n## Blocks \(security-boundary\))/, '\n'))
expectFailures('mapper eval rejected observability without security-boundary output', observabilityWithoutOutput, [
  'observability phase embeds security-boundary'
])

const observabilityWithoutBlocks = copyTemplate('observability-without-blocks')
edit(observabilityWithoutBlocks, '03-phases/conditional/observability-and-health.md', (s) => s.replace(/\n## Blocks \(security-boundary\)[\s\S]*?(?=\n## Quality bar)/, '\n'))
expectFailures('mapper eval rejected observability without security-boundary blocks', observabilityWithoutBlocks, [
  'observability phase embeds security-boundary'
])

const renamedObservabilityWithoutSecurity = copyTemplate('renamed-observability-without-security')
edit(renamedObservabilityWithoutSecurity, '03-phases/phase-index.yaml', (s) => s.replace('file: 03-phases/conditional/observability-and-health.md', 'file: 03-phases/conditional/operator-observability.md'))
fs.renameSync(
  path.join(renamedObservabilityWithoutSecurity, '03-phases/conditional/observability-and-health.md'),
  path.join(renamedObservabilityWithoutSecurity, '03-phases/conditional/operator-observability.md')
)
edit(renamedObservabilityWithoutSecurity, '03-phases/conditional/operator-observability.md', (s) => s
  .replace('requires_roles: [integration-runtime, product-architect, security-boundary]', 'requires_roles: [integration-runtime, product-architect]'))
expectFailures('mapper eval rejected renamed observability without security-boundary', renamedObservabilityWithoutSecurity, [
  'observability phase embeds security-boundary'
])

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
const staleReadmePatterns = [/Buildprint v3 Draft/i, /04-evaluation\.md/i, /05-evidence\//i]
const staleReadmeMatches = staleReadmePatterns.filter((pattern) => pattern.test(readme))
if (staleReadmeMatches.length) {
  console.error(`Root README still contains stale selected-output packet references: ${staleReadmeMatches.map((pattern) => pattern.toString()).join(', ')}`)
  process.exit(1)
}
console.log('✓ mapper eval rejected stale selected-output README references')

const traversalPackage = path.join(tmp, 'traversal-package')
fs.mkdirSync(traversalPackage, { recursive: true })
const traversalManifest = path.join(traversalPackage, 'package.json')
fs.writeFileSync(traversalManifest, JSON.stringify({ files: [{ path: '../escape.txt' }] }, null, 2))
expectAgbFailure('cli eval rejected manifest path traversal during packet check', ['packet', 'check', traversalManifest], [
  'unsafe manifest file path'
])
if (fs.existsSync(path.join(tmp, 'escape.txt'))) {
  console.error('cli eval failed; packet check wrote outside the manifest materialization directory')
  process.exit(1)
}

const traversalStartPackage = path.join(tmp, 'traversal-start-package')
fs.mkdirSync(traversalStartPackage, { recursive: true })
const traversalStartManifest = path.join(traversalStartPackage, 'package.json')
fs.writeFileSync(traversalStartManifest, JSON.stringify({
  slug: 'traversal-start',
  files: [{ path: '../escape.txt', rawUrl: 'escape.txt' }]
}, null, 2))
expectAgbFailure('cli eval rejected manifest path traversal during start', ['start', traversalStartManifest, path.join(tmp, 'traversal-target')], [
  'unsafe manifest file path'
])
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
      { path: 'blueprint.yaml', rawUrl: 'blueprint.yaml?fileToken=leaksecret' },
      { path: '03-phases/phase-index.yaml', rawUrl: '03-phases/phase-index.yaml?fileToken=leaksecret' }
    ],
    entrypoints: {
      agent: 'agent.md?agentToken=leaksecret',
      prompt: 'prompt.md?promptToken=leaksecret',
      github: 'https://example.invalid/repo?githubToken=leaksecret',
      rawBase: 'https://example.invalid/raw?rawToken=leaksecret'
    }
  }, null, 2),
  '/BUILDPRINT.md': '# BUILDPRINT: Redaction Package\n\nThis file is long enough for snapshot minimum checks.\n',
  '/blueprint.yaml': 'schema_version: mapper-os/executable-blueprint\nexecution_start: BUILDPRINT.md\n',
  '/03-phases/phase-index.yaml': 'active_phase: 03-phases/00-start.md\nphase_order:\n  - phase_id: 00-start\n    file: 03-phases/00-start.md\n'
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
  if (failed) {
    console.error(output)
    console.error('cli eval failed to start redaction fixture')
    process.exit(1)
  }
  const sourceJson = fs.readFileSync(path.join(redactionTarget, '.buildprint/source.json'), 'utf8')
  const source = JSON.parse(sourceJson)
  const urlFields = [
    source.manifestUrl,
    source.agentUrl,
    source.promptUrl,
    source.githubUrl,
    source.rawBase,
    ...source.downloaded.map((file) => file.sourceUrl)
  ]
  if (/leaksecret|manifestToken|fileToken|agentToken|promptToken|githubToken|rawToken/.test(sourceJson) || !urlFields.every((value) => typeof value === 'string' && value.includes('redacted=1'))) {
    console.error(sourceJson)
    console.error('cli eval failed to redact tokenized source metadata')
    process.exit(1)
  }
  console.log('✓ cli eval redacted tokenized source metadata')
} finally {
  for (const socket of redactionSockets) socket.destroy()
  await new Promise((resolve) => redactionServer.close(resolve))
}
