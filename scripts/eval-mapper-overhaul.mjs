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

const legacy = copyTemplate('legacy-slice-gate')
fs.mkdirSync(path.join(legacy, 'slices/_template'), { recursive: true })
fs.writeFileSync(path.join(legacy, 'slices/_template/slice.yaml'), 'id: legacy\npaths: []\n')
fs.mkdirSync(path.join(legacy, 'gates'), { recursive: true })
fs.writeFileSync(path.join(legacy, 'gates/gate-index.yaml'), 'gates: []\n')
edit(legacy, 'blueprint.yaml', (s) => s.replace('schema_version: mapper-os/executable-blueprint/v3', 'schema_version: mapper-os/executable-blueprint/v2\nslices_dir: slices\ngates_dir: gates\ncapsules_dir: teams'))
expectFailure('mapper eval rejects legacy slice/gate packet', ['packet', 'check', legacy], ['✗ packet rejects legacy v2 slice/gate shape', '✗ packet has no legacy useless files'])

const staleFiles = copyTemplate('stale-files')
fs.writeFileSync(path.join(staleFiles, '04-review.md'), '# Review\n')
fs.writeFileSync(path.join(staleFiles, '05-handover.md'), '# Old handover\n')
expectFailure('mapper eval rejects obsolete review/handover files', ['packet', 'check', staleFiles], ['✗ packet has no legacy useless files'])

const missingQuestions = copyTemplate('missing-questions')
fs.rmSync(path.join(missingQuestions, '00-questions.md'))
expectFailure('mapper eval requires 00-questions', ['packet', 'check', missingQuestions], ['✗ packet file exists: 00-questions.md'])

const weakObjective = copyTemplate('weak-objective')
edit(weakObjective, '03-phases/02-core-product-loop.md', (s) => s.replace(/## Building objective[\s\S]*?## DO NOT/, '## Building objective\n\nBuild stuff.\n\n## DO NOT'))
expectFailure('mapper eval rejects tiny phase objectives', ['packet', 'check', weakObjective], ['✗ 03-phases/02-core-product-loop.md has substantial building objective'])

const missingHeading = copyTemplate('missing-phase-heading')
edit(missingHeading, '03-phases/03-state-runtime-and-integrations.md', (s) => s.replace('## Handoff note', '## Notes'))
expectFailure('mapper eval rejects missing comprehensive phase heading', ['packet', 'check', missingHeading], ['✗ 03-phases/03-state-runtime-and-integrations.md has comprehensive phase headings'])

const weakFlow = copyTemplate('weak-flow')
edit(weakFlow, '03-phases/phase-flow.md', () => '# Phase Flow\n\nJust code all phases.\n')
expectFailure('mapper eval rejects weak phase flow', ['packet', 'check', weakFlow], ['✗ phase flow defines active phase loop', '✗ phase flow rejects proof theater', '✗ phase flow defines repair routing'])

const cliHelp = runAgb(['--help']).output
for (const stale of ['persona --slice', 'state derive', 'slice status']) {
  if (cliHelp.includes(stale)) {
    console.error(cliHelp)
    console.error(`cli eval failed; help still exposes legacy command: ${stale}`)
    process.exit(1)
  }
}
console.log('✓ cli help no longer exposes legacy slice/gate runner commands')
expectFailure('cli eval rejects removed persona command', ['persona', '--slice', 'slices/x/slice.yaml', '--role', 'build'], ['Usage:'])

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
      { path: 'blueprint.yaml', rawUrl: 'blueprint.yaml?fileToken=leaksecret' },
      { path: '03-phases/phase-index.yaml', rawUrl: '03-phases/phase-index.yaml?fileToken=leaksecret' },
      { path: '03-phases/phase-flow.md', rawUrl: '03-phases/phase-flow.md?fileToken=leaksecret' },
      { path: '03-phases/01-start.md', rawUrl: '03-phases/01-start.md?fileToken=leaksecret' },
      { path: 'HANDOVER.md', rawUrl: 'HANDOVER.md?fileToken=leaksecret' }
    ],
    entrypoints: {
      agent: 'agent.md?agentToken=leaksecret',
      prompt: 'prompt.md?promptToken=leaksecret',
      github: 'https://example.invalid/repo?githubToken=leaksecret',
      rawBase: 'https://example.invalid/raw?rawToken=leaksecret'
    }
  }, null, 2),
  '/BUILDPRINT.md': '# BUILDPRINT: Redaction Package\n\nThis file is long enough for snapshot minimum checks. Read 00-questions.md, 01-project-setup.md, 03-phases/phase-index.yaml, 03-phases/phase-flow.md, HANDOVER.md.\n',
  '/00-questions.md': '# 00 Questions\n\nHard-stop questions, Assumable defaults, and Deferrable questions.\n',
  '/01-project-setup.md': '# 01 Project Setup\n\nThis project setup file is long enough for snapshot checks.\n',
  '/blueprint.yaml': 'schema_version: mapper-os/executable-blueprint/v3\nexecution_start: BUILDPRINT.md\nmachine_contract: blueprint.yaml\n',
  '/03-phases/phase-index.yaml': 'schema_version: mapper-os/phase-index/v3\nactive_phase: 03-phases/01-start.md\nphases:\n  - phase_id: 01-start\n    file: 03-phases/01-start.md\n    status: included\n',
  '/03-phases/phase-flow.md': '# Phase Flow\n\nUse active phase only.\n',
  '/03-phases/01-start.md': '# Phase 01\n\n## How to implement this phase\n\nRead phase-flow.\n\n## Building objective\n\nBuild a real path.\n\n## DO NOT\n\nNo placeholders.\n\n## Minimum proof before moving on\n\nRun checks.\n\n## Handoff note\n\nRecord proof.\n',
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
  if (failed) {
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
  for (const expected of ['00-questions.md', '01-project-setup.md', '03-phases/phase-flow.md', 'HANDOVER.md']) {
    if (!nextAgent.includes(expected)) {
      console.error(nextAgent)
      console.error(`cli eval failed; next-agent missing v3 read order item: ${expected}`)
      process.exit(1)
    }
  }
  if (/02-project-setup\.md|04-review\.md|05-handover\.md|smallest real usable slice/.test(nextAgent)) {
    console.error(nextAgent)
    console.error('cli eval failed; next-agent still references obsolete v2 files/language')
    process.exit(1)
  }
  console.log('✓ cli eval redacted tokenized source metadata and wrote v3 next-agent')
} finally {
  for (const socket of redactionSockets) socket.destroy()
  await new Promise((resolve) => redactionServer.close(resolve))
}
