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

// Simulate a future generated packet that lost the new protocol in ways the checker must reject.
edit('blueprint.yaml', (s) => s.replace(/qualification_label: PROOF_REQUIRED\n/, '').replace(/setup_tier: <compact_setup\|full_setup>\n/, ''))
edit('03-phases/phase-flow.md', (s) => s.replace(/[\s\S]*?## Phase identity contract/, '# Phase Flow\n\n## Phase identity contract'))
edit('03-phases/01-example-phase.md', (s) => s.replace(/```yaml\nphase_contract:[\s\S]*?```\n\n/, '').replace(/1a\. Write `\.buildprint\/phase-runs\/<phase-id>\/phase-preflight\.yaml`[^\n]*\n/, ''))
edit('02-project-setup.md', (s) => s.replace(/\|  \| mapped note:[^\n]+\n/, '| dashboard | mapped note: source path app | Core app | preserve | Build a dashboard |  | tests pass |\n'))

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
  '01-example-phase.md includes structured phase contract',
  '01-example-phase.md requires preflight with criteria/proofs/fake-done risks',
  'setup matrix rows have one owning phase or explicit drop/block',
  'glance surfaces trace into setup matrix',
  'no generated sentinel placeholders remain'
]

const missing = requiredFailures.filter((label) => !output.includes(`✗ ${label}`))
if (!failed || missing.length) {
  console.error(output)
  console.error(`Mapper overhaul negative eval failed; missing expected checker failures: ${missing.join(', ') || '(none)'}`)
  process.exit(1)
}

console.log('✓ mapper overhaul negative eval rejected malformed selected packet')
console.log(requiredFailures.map((label) => `  - ${label}`).join('\n'))
