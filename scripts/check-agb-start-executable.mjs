#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const packet = path.join(root, 'buildprints', 'local-rag-chat-workbench')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-start-executable-'))
const manifestPath = path.join(temp, 'package.json')
const out = path.join(temp, 'out')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function fail(message) {
  console.error(`✗ ${message}`)
  process.exit(1)
}

const files = walk(packet)
  .map((file) => path.relative(packet, file).split(path.sep).join('/'))
  .filter((file) => !file.startsWith('.'))
  .sort()

const manifest = {
  slug: 'local-rag-chat-workbench',
  title: 'Local RAG Chat Workbench',
  category: 'Mapped Project',
  tier: 'agent-grade',
  status: 'proof-required',
  files: files.map((file) => ({ path: file, rawUrl: path.join(packet, file) })),
  instructions: {
    // Regression shape: manifests may omit phase-flow and role contracts from readOrder.
    // agb start must still produce an executable handoff read order that includes them.
    readOrder: [
      'BUILDPRINT.md',
      '01-questions.md',
      '02-project-setup.md',
      'blueprint.yaml',
      '03-phases/phase-index.yaml',
      '03-phases/01-provider-chat-runtime.md',
      '04-evaluation.md',
      '05-evidence/evidence-ledger.jsonl'
    ]
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
execFileSync(process.execPath, [path.join(root, 'bin', 'agb.js'), 'start', manifestPath, out], { stdio: 'pipe' })

const state = JSON.parse(fs.readFileSync(path.join(out, '.buildprint', 'state.json'), 'utf8'))
const source = JSON.parse(fs.readFileSync(path.join(out, '.buildprint', 'source.json'), 'utf8'))
const nextAgent = fs.readFileSync(path.join(out, '.buildprint', 'next-agent.md'), 'utf8')
const readOrder = source.readOrder || []

if (state.activePhaseId !== '01-provider-chat-runtime') fail(`activePhaseId lost canonical phase id: ${state.activePhaseId}`)
if (!readOrder.includes('03-phases/phase-flow.md')) fail('readOrder missing phase-flow.md')
if (!readOrder.includes('03-phases/01-provider-chat-runtime.md')) fail('readOrder missing active phase')
for (const contract of [
  '06-contracts/product-architect.md',
  '06-contracts/integration-runtime.md',
  '06-contracts/data-persistence.md',
  '06-contracts/ux-ui-craft.md',
  '06-contracts/test-and-verification.md'
]) {
  if (!readOrder.includes(contract)) fail(`readOrder missing active role contract ${contract}`)
  if (!nextAgent.includes(`.buildprint/snapshots/${contract}`)) fail(`next-agent missing active role contract ${contract}`)
}

console.log('agb start executable handoff check passed')
