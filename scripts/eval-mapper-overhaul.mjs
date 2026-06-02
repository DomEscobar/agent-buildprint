#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

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
  try {
    return {
      failed: false,
      output: execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), 'packet', 'check', folder], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    }
  } catch (error) {
    return { failed: true, output: `${error.stdout || ''}${error.stderr || ''}` }
  }
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

const unknownSpine = copyTemplate('unknown-spine')
edit(unknownSpine, 'blueprint.yaml', (s) => s.replace('selected_spine: product_app_consumer_first', 'selected_spine: custom_productish_spine'))
expectFailures('mapper eval rejected unknown selected spine', unknownSpine, [
  'selected spine uses known executable spine'
])

const invalidPosture = copyTemplate('invalid-posture')
edit(invalidPosture, 'blueprint.yaml', (s) => s.replace('current: trusted_local', 'current: trusted-local'))
edit(invalidPosture, '03-phases/phase-index.yaml', (s) => s.replace('deployment_posture: trusted_local', 'deployment_posture: trusted-local').replace(/status: included_blocked/g, 'status: INCLUDED_BLOCKED'))
expectFailures('mapper eval rejected invalid posture and status vocabulary', invalidPosture, [
  'packet uses canonical posture and phase status values'
])

const observabilityWithoutSecurity = copyTemplate('observability-without-security')
edit(observabilityWithoutSecurity, '03-phases/conditional/observability-and-health.md', (s) => s
  .replace('requires_roles: [integration-runtime, product-architect, security-boundary]', 'requires_roles: [integration-runtime, product-architect]')
  .replace(/\n## Required output \(security-boundary\)[\s\S]*?(?=\n## Quality bar)/, '\n'))
expectFailures('mapper eval rejected observability without security-boundary', observabilityWithoutSecurity, [
  'observability phase embeds security-boundary'
])

const renamedObservabilityWithoutSecurity = copyTemplate('renamed-observability-without-security')
edit(renamedObservabilityWithoutSecurity, '03-phases/phase-index.yaml', (s) => s.replace('file: 03-phases/conditional/observability-and-health.md', 'file: 03-phases/conditional/operator-observability.md'))
fs.renameSync(
  path.join(renamedObservabilityWithoutSecurity, '03-phases/conditional/observability-and-health.md'),
  path.join(renamedObservabilityWithoutSecurity, '03-phases/conditional/operator-observability.md')
)
edit(renamedObservabilityWithoutSecurity, '03-phases/conditional/operator-observability.md', (s) => s
  .replace('requires_roles: [integration-runtime, product-architect, security-boundary]', 'requires_roles: [integration-runtime, product-architect]')
  .replace(/\n## Required output \(security-boundary\)[\s\S]*?(?=\n## Quality bar)/, '\n'))
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
