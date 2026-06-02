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

// Simulate a future generated packet that is unbootstrappable or lost the product-leadership alignment layer.
edit('blueprint.yaml', (s) => s.replace(/^qualification_label:.*\n/m, '').replace(/^claim_status:.*\n/m, '').replace(/^setup_tier:.*\n/m, '').replace(/blueprint_mode:[\s\S]*?agent_contract:/m, 'agent_contract:'))
edit('03-phases/phase-index.yaml', (s) => s.replace('active_phase: 03-phases/00-product-system-alignment.md', 'active_phase: 00-product-system-alignment'))
edit('generated/agent-prompt.md', () => '# Agent prompt\n\nGenerated from: blueprint.yaml\n\nBuild the requested files.\n')
edit('01-questions.md', () => '# Questions\n\nWhat should we build?\n')
edit('02-project-setup.md', () => '# Setup\n\nRun the tests.\n')
edit('03-phases/00-product-system-alignment.md', () => `# Phase 00 - Alignment

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
fs.rmSync(path.join(bad, '04-review.md'))
fs.rmSync(path.join(bad, '05-handover.md'))

let output = ''
let failed = false
try {
  output = execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), 'packet', 'check', bad], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
} catch (error) {
  failed = true
  output = `${error.stdout || ''}${error.stderr || ''}`
}

const requiredFailures = [
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
  'phase 00 implements skeleton, not duplicate setup',
  'phase index names active phase file',
  'generated prompt is alignment speech, not authority',
  'generated prompt includes anti-slop/product reviewer when present'
]

const missing = requiredFailures.filter((label) => !output.includes(`✗ ${label}`))
if (!failed || missing.length) {
  console.error(output)
  console.error(`Mapper overhaul negative eval failed; missing expected checker failures: ${missing.join(', ') || '(none)'}`)
  process.exit(1)
}

console.log('✓ mapper executable-integrity eval rejected malformed selected packet')
console.log(requiredFailures.map((label) => `  - ${label}`).join('\n'))
