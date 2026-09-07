#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
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

function runAgb(args) {
  try {
    return {
      failed: false,
      output: execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), ...args], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 30000,
      }),
    }
  } catch (error) {
    return { failed: true, output: `${error.stdout || ''}${error.stderr || ''}` }
  }
}

function expectPass(name, args, snippets) {
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

expectPass('mapper kernel template packet passes', ['packet', 'check', template], ['Packet check: PASS'])

const mapperRoot = path.join(root, 'buildprints/buildprint-mapper-os')
expectPass('mapper os root packet passes', ['packet', 'check', mapperRoot], ['Packet check: PASS'])

const mapperMissingReviewSource = path.join(tmp, 'mapper-missing-review-source')
fs.cpSync(mapperRoot, mapperMissingReviewSource, { recursive: true })
edit(mapperMissingReviewSource, 'buildprint.json', (s) =>
  s.replaceAll('templates/executable-packet/review.md', 'templates/executable-packet/loops/loop-flow.md'))
expectFailure(
  'mapper eval rejects root manifest without review template source',
  ['packet', 'check', mapperMissingReviewSource],
  ['✗ mapper manifest includes review template source'],
)

const mapperMissingKernel = path.join(tmp, 'mapper-missing-kernel')
fs.cpSync(mapperRoot, mapperMissingKernel, { recursive: true })
for (const file of ['buildprint.json', 'SPEC.md', 'CONTRACTS.md', 'README.md', 'vision.md', 'policies/quality.md']) {
  edit(mapperMissingKernel, file, (s) =>
    s
      .replaceAll('buildprint/kernel/v1', 'mapper-os/executable-blueprint/v3')
      .replaceAll('kernel_loop', 'phase_driven_comprehensive')
      .replaceAll('bare agentic loop', 'phase flow'))
}
expectFailure(
  'mapper eval rejects root without kernel packet shape',
  ['packet', 'check', mapperMissingKernel],
  ['✗ mapper root requires kernel packet shape'],
)

const obsoletePacket = copyTemplate('obsolete-v2-packet')
fs.mkdirSync(path.join(obsoletePacket, 'slices/_template'), { recursive: true })
fs.writeFileSync(path.join(obsoletePacket, 'slices/_template/slice.yaml'), 'id: obsolete\npaths: []\n')
fs.mkdirSync(path.join(obsoletePacket, 'gates'), { recursive: true })
fs.writeFileSync(path.join(obsoletePacket, 'gates/gate-index.yaml'), 'gates: []\n')
edit(obsoletePacket, 'blueprint.yaml', (s) =>
  s.replace(
    'schema_version: buildprint/kernel/v1',
    'schema_version: mapper-os/executable-blueprint/v2\nslices_dir: slices\ngates_dir: gates\ncapsules_dir: teams',
  ))
expectFailure(
  'mapper eval rejects obsolete v2 packet',
  ['packet', 'check', obsoletePacket],
  ['✗ packet rejects obsolete v2 packet shape', '✗ packet has no obsolete useless files'],
)

const obsoletePhase = copyTemplate('obsolete-v3-phase')
fs.mkdirSync(path.join(obsoletePhase, '03-phases'), { recursive: true })
fs.writeFileSync(path.join(obsoletePhase, '03-phases/phase-index.yaml'), 'schema_version: mapper-os/phase-index/v3\nactive_phase: 03-phases/x.md\n')
edit(obsoletePhase, 'blueprint.yaml', (s) =>
  s
    .replace('schema_version: buildprint/kernel/v1', 'schema_version: mapper-os/executable-blueprint/v3')
    .replace('style: kernel_loop', 'style: phase_driven_comprehensive'))
expectFailure(
  'mapper eval rejects obsolete v3 phase spine',
  ['packet', 'check', obsoletePhase],
  ['✗ packet rejects obsolete v3 phase spine'],
)

const missingGoal = copyTemplate('missing-goal')
fs.rmSync(path.join(missingGoal, '00-goal.md'))
expectFailure('mapper eval requires 00-goal', ['packet', 'check', missingGoal], ['✗ packet file exists: 00-goal.md'])

const weakHardStopQuestions = copyTemplate('weak-hard-stop-questions')
edit(weakHardStopQuestions, '00-goal.md', (s) =>
  s
    .replace(
      /These require `confirmed_by: user`[\s\S]*?\.buildprint\/decisions\.md`\./,
      'These require explicit human confirmation before setup:',
    )
    .replace(
      /Assumable defaults apply only[\s\S]*?scope-presentation mismatch\./,
      'If not answered, the agent may choose a reversible default and record it in setup.',
    )
    .replace(/`confirmed_by: agent_assumption` is invalid for hard-stop rows\.[^\n]*\n/, ''))
expectFailure(
  'mapper eval rejects hard-stop questions that can self-default',
  ['packet', 'check', weakHardStopQuestions],
  ['✗ goal forbids hard-stop self-defaults'],
)

const missingCentralOutput = copyTemplate('missing-central-output-contract')
edit(missingCentralOutput, 'blueprint.yaml', (s) => s.replace(/central_output_contract:/g, 'central_output_contract_removed:'))
expectFailure(
  'mapper eval requires central output quality contract',
  ['packet', 'check', missingCentralOutput],
  ['✗ blueprint declares central output quality contract'],
)

const missingTypedGates = copyTemplate('missing-typed-quality-gates')
edit(missingTypedGates, 'blueprint.yaml', (s) => s.replace(/typed_quality_gates:/g, 'typed_quality_gates_removed:'))
expectFailure(
  'mapper eval requires typed quality gate routing',
  ['packet', 'check', missingTypedGates],
  ['✗ blueprint declares typed quality gate routing'],
)

const missingProvenRequirements = copyTemplate('missing-proven-implementation-requirements')
edit(missingProvenRequirements, 'blueprint.yaml', (s) =>
  s.replace(/proven_implementation_requirements:/g, 'proven_implementation_requirements_removed:'))
expectFailure(
  'mapper eval requires proven implementation requirements',
  ['packet', 'check', missingProvenRequirements],
  ['✗ blueprint declares proven implementation requirements'],
)

const weakObjective = copyTemplate('weak-objective')
edit(weakObjective, 'loops/02-core-product-loop.md', (s) =>
  s.replace(/## Building objective[\s\S]*?## DO NOT/, '## Building objective\n\nBuild stuff.\n\n## DO NOT'))
expectFailure(
  'mapper eval rejects tiny loop objectives',
  ['packet', 'check', weakObjective],
  ['✗ loops/02-core-product-loop.md has substantial building objective'],
)

const missingHeading = copyTemplate('missing-heading')
edit(missingHeading, 'loops/03-state-runtime-and-integrations.md', (s) => s.replace('## Handoff note', '## Notes'))
expectFailure(
  'mapper eval rejects missing comprehensive loop heading',
  ['packet', 'check', missingHeading],
  ['✗ loops/03-state-runtime-and-integrations.md has comprehensive loop headings'],
)

const weakFlow = copyTemplate('weak-flow')
edit(weakFlow, 'loops/loop-flow.md', () => '# Loop Flow\n\nJust code all loops.\n')
expectFailure(
  'mapper eval rejects weak loop flow',
  ['packet', 'check', weakFlow],
  ['✗ loop flow defines kernel execution'],
)

const weakReview = copyTemplate('weak-review')
edit(weakReview, 'review.md', () => '# Review\n\nLooks good to me.\n')
expectFailure(
  'mapper eval rejects weak independent review',
  ['packet', 'check', weakReview],
  ['✗ review requires independent fresh-context reviewer'],
)

const productPackets = [
  'buildprints/agentic-chat',
  'buildprints/ai-influencer-os',
  'buildprints/automated-ai-blog-os',
]
for (const packet of productPackets) {
  expectPass(`${packet} kernel packet passes`, ['packet', 'check', path.join(root, packet)], ['Packet check: PASS'])
}

const capabilityPackets = [
  'buildprints/api-key-management',
  'buildprints/stripe-subscriptions',
  'buildprints/rbac-permissions',
  'buildprints/design-quality-lift',
  'buildprints/secure-hybrid-rag-mcp',
  'buildprints/agentic-chat-eval-harness',
  'buildprints/evolutionary-coding-agent-runtime',
]
for (const packet of capabilityPackets) {
  expectPass(`${packet} kernel capability passes`, ['packet', 'check', path.join(root, packet)], ['Packet check: PASS'])
}

expectPass(
  'capability author packet passes',
  ['packet', 'check', path.join(root, 'buildprints/capability-buildprint-author')],
  ['Packet check: PASS'],
)

// CLI start smoke with local template package.json-like manifest
const startDir = path.join(tmp, 'start-target')
fs.mkdirSync(startDir, { recursive: true })
const manifestPath = path.join(tmp, 'kernel-smoke-package.json')
const minimalFiles = [
  'BUILDPRINT.md',
  '00-goal.md',
  '01-setup.md',
  '02-identity.md',
  'blueprint.yaml',
  'loops/loop-index.yaml',
  'loops/loop-flow.md',
  'loops/01-foundation-and-first-loop.md',
  'loops/02-core-product-loop.md',
  'loops/03-state-runtime-and-integrations.md',
  'loops/04-ui-polish-and-interaction.md',
  'loops/05-verification-and-handover.md',
  'review.md',
  'README.md',
  'HANDOVER.md',
]
fs.writeFileSync(
  manifestPath,
  JSON.stringify(
    {
      slug: 'kernel-template-smoke',
      title: 'Kernel Template Smoke',
      files: minimalFiles.map((filePath) => ({
        path: filePath,
        rawUrl: pathToFileURL(path.join(template, filePath)).href,
      })),
    },
    null,
    2,
  ),
)

expectPass('agb start bootstraps kernel packet', ['start', manifestPath, startDir], [])
const nextAgent = fs.readFileSync(path.join(startDir, '.buildprint/next-agent.md'), 'utf8')
if (!/kernel_loop|bare agentic loop/i.test(nextAgent) || !/00-goal\.md/.test(nextAgent) || !/loops\/loop-flow\.md/.test(nextAgent)) {
  console.error(nextAgent)
  console.error('agb start next-agent.md missing kernel instructions')
  process.exit(1)
}
console.log('✓ agb start writes kernel next-agent instructions')

console.log('\nMapper overhaul eval: PASS')
