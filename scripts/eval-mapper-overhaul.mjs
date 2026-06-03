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
edit(malformed, 'blueprint.yaml', (s) => s
  .replace(/^slices_dir:.*\n/m, '')
  .replace(/^gates_dir:.*\n/m, '')
  .replace(/^capsules_dir:.*\n/m, '')
  .replace(/state_json_path:.*\n/m, '')
  .replace(/Agent must never write \.buildprint\/state\.json manually\.\n/m, '')
  .replace(/Build the product loop honestly[\s\S]*?Blockers are partial, not done\.\n/m, ''))
edit(malformed, '03-ux-contract.md', () => '# UX Contract\n\nNice UI.\n')
edit(malformed, '02-architecture.md', () => '# Architecture\n\nUse good code.\n')
edit(malformed, '04-handover.md', () => '# Handover\n\nDone.\n')
edit(malformed, 'slices/_template/slice.yaml', () => 'id: example\n')
fs.rmSync(path.join(malformed, 'gates/gate-index.yaml'))

expectFailures('mapper v2 integrity eval rejected malformed selected packet', malformed, [
  'v2 packet has gate index',
  'v2 blueprint declares slices_dir',
  'v2 blueprint declares gates_dir',
  'v2 blueprint declares capsules_dir',
  'v2 blueprint derived-state rule present',
  'v2 blueprint agent_contract has partial-not-complete rule',
  'v2 ux-contract has Path Map',
  'v2 ux-contract has operator acceptance rows (sample_can_satisfy: false)',
  'v2 ux-contract has novice acceptance rows',
  'v2 architecture defines stack',
  'v2 architecture defines persistence',
  'v2 handover template has slice status section',
  'v2 handover template has overall readiness block',
  'v2 gate index has active_when_posture entries',
  'v2 gate index has human signoff gate',
  'v2 slice template has paths field',
  'v2 slice template has core_proof_required field',
  'v2 slice template has persona field'
])

const missingSliceTemplate = copyTemplate('missing-slice-template')
fs.rmSync(path.join(missingSliceTemplate, 'slices/_template/slice.yaml'))
expectFailures('mapper v2 eval rejected missing slice template', missingSliceTemplate, [
  'v2 packet has slices template'
])

const missingGateIndex = copyTemplate('missing-gate-index')
fs.rmSync(path.join(missingGateIndex, 'gates/gate-index.yaml'))
expectFailures('mapper v2 eval rejected missing gate index', missingGateIndex, [
  'v2 packet has gate index',
  'v2 gate index has active_when_posture entries',
  'v2 gate index has human signoff gate'
])

const obsoleteRouter = copyTemplate('obsolete-router')
fs.writeFileSync(path.join(obsoleteRouter, 'START_HERE.md'), '# Legacy router\n', { flag: 'wx' })
expectFailures('mapper v2 eval rejected obsolete phase router', obsoleteRouter, [
  'v2 packet avoids obsolete routers/files recursively'
])

const weakUx = copyTemplate('weak-ux-contract')
edit(weakUx, '03-ux-contract.md', (s) => s
  .replace(/##\s*Path Map/ig, '## Paths')
  .replace(/sample_can_satisfy:\s*false/ig, 'sample_can_satisfy: true')
  .replace(/novice/ig, 'new user'))
expectFailures('mapper v2 eval rejected weak UX contract', weakUx, [
  'v2 ux-contract has Path Map',
  'v2 ux-contract has operator acceptance rows (sample_can_satisfy: false)',
  'v2 ux-contract has novice acceptance rows'
])

const weakArchitecture = copyTemplate('weak-architecture')
edit(weakArchitecture, '02-architecture.md', () => '# Architecture\n\nDecide later.\n')
expectFailures('mapper v2 eval rejected weak architecture contract', weakArchitecture, [
  'v2 architecture defines stack',
  'v2 architecture defines persistence'
])

const weakHandover = copyTemplate('weak-handover')
edit(weakHandover, '04-handover.md', () => '# Handover\n\nShip it.\n')
expectFailures('mapper v2 eval rejected weak handover template', weakHandover, [
  'v2 handover template has slice status section',
  'v2 handover template has overall readiness block'
])

const weakGateIndex = copyTemplate('weak-gate-index')
edit(weakGateIndex, 'gates/gate-index.yaml', (s) => s
  .replace(/active_when_posture:/ig, 'active_when:')
  .replace(/requires_human_signoff:\s*true/ig, 'requires_human_signoff: false'))
expectFailures('mapper v2 eval rejected weak gate index', weakGateIndex, [
  'v2 gate index has active_when_posture entries',
  'v2 gate index has human signoff gate'
])

const weakSliceTemplate = copyTemplate('weak-slice-template')
edit(weakSliceTemplate, 'slices/_template/slice.yaml', (s) => s
  .replace(/^paths:.*\n/m, '')
  .replace(/core_proof_required/g, 'core-proof-required')
  .replace(/^persona:.*\n/m, ''))
expectFailures('mapper v2 eval rejected weak slice template', weakSliceTemplate, [
  'v2 slice template has paths field',
  'v2 slice template has core_proof_required field',
  'v2 slice template has persona field'
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
