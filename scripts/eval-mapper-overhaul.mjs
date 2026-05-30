#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const template = path.join(root, 'buildprints/buildprint-mapper-os/templates/executable-packet')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mapper-overhaul-eval-'))
const bad = path.join(tmp, 'bad-selected')
fs.cpSync(template, bad, { recursive: true })

function edit(rel, fn) {
  const file = path.join(bad, rel)
  fs.writeFileSync(file, fn(fs.readFileSync(file, 'utf8')))
}

// Simulate a future generated packet that is unbootstrappable or lost the current alignment layer.
edit('blueprint.yaml', (s) => s.replace(/qualification_label: PROOF_REQUIRED\n/, '').replace(/setup_tier: <compact_setup\|full_setup>\n/, ''))
edit('03-phases/phase-index.yaml', (s) => s.replace('active_phase: 03-phases/01-example-phase.md', 'active_phase: 01-example-phase'))
edit('generated/agent-prompt.md', () => '# Agent prompt\n\nGenerated from: blueprint.yaml\n\nBuild the requested files.\n')
edit('05-evidence/evidence-ledger.jsonl', (s) => `${s.trim()}\n{bad json\n`)

let output = ''
let failed = false
try {
  output = execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), 'packet', 'check', bad], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
} catch (error) {
  failed = true
  output = `${error.stdout || ''}${error.stderr || ''}`
}

const requiredFailures = [
  'blueprint declares setup tier',
  'phase index names active phase file',
  'seed evidence JSONL parses',
  'generated prompt is alignment speech, not authority',
  'generated prompt includes anti-slop reviewer when present'
]

const missing = requiredFailures.filter((label) => !output.includes(`✗ ${label}`))
if (!failed || missing.length) {
  console.error(output)
  console.error(`Mapper overhaul negative eval failed; missing expected checker failures: ${missing.join(', ') || '(none)'}`)
  process.exit(1)
}

console.log('✓ mapper executable-integrity eval rejected malformed selected packet')
console.log(requiredFailures.map((label) => `  - ${label}`).join('\n'))
