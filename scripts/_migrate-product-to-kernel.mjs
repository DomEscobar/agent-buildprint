/**
 * Structural migrate a product packet from v3 phase spine to kernel_loop.
 * Usage: node scripts/_migrate-product-to-kernel.mjs buildprints/<name>
 */
import fs from 'fs'
import path from 'path'

const root = process.argv[2]
if (!root) {
  console.error('usage: node scripts/_migrate-product-to-kernel.mjs <packet-dir>')
  process.exit(1)
}
const dir = path.resolve(root)
const exists = (p) => fs.existsSync(path.join(dir, p))
const read = (p) => fs.readFileSync(path.join(dir, p), 'utf8')
const write = (p, t) => {
  const full = path.join(dir, p)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, t)
}
const rm = (p) => {
  const full = path.join(dir, p)
  if (!fs.existsSync(full)) return
  fs.rmSync(full, { recursive: true, force: true })
}

function transformLoopMd(text) {
  return text
    .replace(/## How to implement this phase/gi, '## How to implement this loop')
    .replace(/03-phases\/phase-flow\.md/g, 'loops/loop-flow.md')
    .replace(/02-ui-identity\.md/g, '02-identity.md')
    .replace(/01-project-setup\.md/g, '01-setup.md')
    .replace(/00-questions\.md/g, '00-goal.md')
    .replace(/this phase/g, 'this loop')
    .replace(/This phase/g, 'This loop')
    .replace(/active phase/g, 'active loop')
    .replace(/Phase /g, 'Loop ')
    .replace(/phase work/g, 'loop work')
    .replace(/before phase/g, 'before loop')
}

// Goal from questions
if (exists('00-questions.md') && !exists('00-goal.md')) {
  let q = read('00-questions.md')
  q = q
    .replace(/^# 00 Questions/m, '# 00 Goal')
    .replace(/stop before `01-project-setup\.md`/g, 'stop before `01-setup.md`')
    .replace(/01-project-setup\.md/g, '01-setup.md')
    .replace(/02-ui-identity\.md/g, '02-identity.md')
  if (!/^## Goal/m.test(q)) {
    q = q.replace(
      /^# 00 Goal\n/,
      `# 00 Goal

Lock the observable goal before setup. If a hard-stop question is unanswered, stop before \`01-setup.md\`.

## Goal

Deliver the product's golden path as a real runnable loop with honest blockers and proof against the acceptance criteria below.

## Acceptance criteria

- User/operator can complete the primary golden-path action
- Central output meets the quality bar in \`blueprint.yaml\`
- Failures and missing providers block honestly
- Independent contract review can pass or record external blockers

`
    )
  }
  write('00-goal.md', q)
  rm('00-questions.md')
}

if (exists('01-project-setup.md') && !exists('01-setup.md')) {
  let s = read('01-project-setup.md')
  s = s
    .replace(/^# 01 Project Setup|^# 01 — Project Setup|^# Project Setup/m, '# 01 Setup')
    .replace(/03-phases\/\*/g, 'loops/*')
    .replace(/03-phases\//g, 'loops/')
    .replace(/02-ui-identity\.md/g, '02-identity.md')
    .replace(/00-questions\.md/g, '00-goal.md')
    .replace(/phase work/g, 'loop work')
    .replace(/before phase/g, 'before loop')
    .replace(/Do not start `loops\/\*`/g, 'Do not start `loops/*`')
  if (!/Do not start `loops\//i.test(s) && !/before loop work/i.test(s)) {
    s += '\n\nDo not start `loops/*` until setup receipt and harness exist.\n'
  }
  write('01-setup.md', s)
  rm('01-project-setup.md')
}

if (exists('02-ui-identity.md') && !exists('02-identity.md')) {
  let u = read('02-ui-identity.md')
  u = u
    .replace(/^# 02 UI Identity|^# 02 — UI Identity|^# UI Identity/m, '# 02 Identity')
    .replace(/after `01-project-setup\.md`/g, 'after `01-setup.md`')
    .replace(/before `03-phases\/\*`/g, 'before `loops/*`')
    .replace(/01-project-setup\.md/g, '01-setup.md')
    .replace(/03-phases\//g, 'loops/')
    .replace(/00-questions\.md/g, '00-goal.md')
    .replace(/phase obligation/gi, 'loop obligation')
    .replace(/later phase/g, 'later loop')
    .replace(/every phase/g, 'every loop')
  write('02-identity.md', u)
  rm('02-ui-identity.md')
}

if (exists('03-phases') && !exists('loops/loop-index.yaml')) {
  fs.mkdirSync(path.join(dir, 'loops'), { recursive: true })
  const phaseDir = path.join(dir, '03-phases')
  for (const name of fs.readdirSync(phaseDir)) {
    const src = path.join(phaseDir, name)
    if (name === 'critical-review-pushback.md') continue
    if (name === 'phase-flow.md') {
      let flow = read('03-phases/phase-flow.md')
      flow = transformLoopMd(flow)
        .replace(/^# Phase Flow/m, '# Loop Flow')
        .replace(/active phase only/gi, 'active loop only')
        .replace(/Do not read every phase upfront/gi, 'Do not read every loop upfront')
        .replace(/phase-index\.yaml/g, 'loop-index.yaml')
        .replace(/03-phases\//g, 'loops/')
        .replace(/99-critical-review-pushback|critical-review-pushback\.md/g, 'review.md')
        .replace(/Final mandatory phase/gi, 'Final mandatory review')
      if (!/bare agentic loop/i.test(flow)) {
        flow = flow.replace(
          /^# Loop Flow\n/,
          `# Loop Flow

Use this kernel for the active loop only. Do not read every loop upfront. Do not turn loop execution into paperwork.

\`\`\`text
goal → bare agentic loop → optional independent fan-out → contract review
\`\`\`

`
        )
      }
      if (!/review\.md/i.test(flow)) {
        flow += '\n\nBefore claiming done, run `review.md` with an independent fresh-context reviewer.\n'
      }
      write('loops/loop-flow.md', flow)
      continue
    }
    if (name === 'phase-index.yaml') {
      let idx = read('03-phases/phase-index.yaml')
      idx = idx
        .replace(/schema_version:\s*mapper-os\/phase-index\/v3/g, 'schema_version: buildprint/loop-index/v1')
        .replace(/active_phase:/g, 'active_loop:')
        .replace(/^\s*phases:\s*$/m, 'loops:')
        .replace(/phase_id:/g, 'loop_id:')
        .replace(/03-phases\//g, 'loops/')
        .replace(/^\s*-\s*loop_id:\s*99-critical-review-pushback[\s\S]*?(?=^\s*-\s*loop_id:|^\S|\Z)/gm, '')
      write('loops/loop-index.yaml', idx)
      continue
    }
    if (name.endsWith('.md')) {
      write(`loops/${name}`, transformLoopMd(read(`03-phases/${name}`)))
    }
  }
  rm('03-phases')
}

if (!exists('review.md')) {
  const review = `# Contract Review

Independent review is mandatory before claiming done. The builder must not score its own work.

## Reviewer independence

Use a fresh-context reviewer — a dispatched subagent or a new agent session that did not implement the artifact.

Provide only:

- \`00-goal.md\` (goal + acceptance criteria)
- active loop contract(s) / Building objectives that claim completion
- diff and proof artifacts (commands, screenshots, readbacks)
- \`02-identity.md\` / generated identity when UI-bearing

Do **not** provide builder chat or builder rationale.

The review note must include a \`## Reviewer independence\` section. If the same agent/session that implemented the artifact performed the review, record \`REVIEW_INVALID\` and fail.

## What to judge

Pass or fail against the contract: goal/acceptance, central output quality, anti-fake-success, honest blockers, and identity fit when UI-bearing.

Do not invent an evidence ledger or claim-gates JSON product.

## Outcomes

- \`loop_core_passed\` — local loops proved their paths
- \`claim_qualified\` — independent review passes and claim ceiling matches evidence
- \`blocked\` — external missing dependency
- \`REVIEW_INVALID\` — reviewer was not independent
`
  write('review.md', review)
}

if (exists('blueprint.yaml')) {
  let bp = read('blueprint.yaml')
  bp = bp
    .replace(/schema_version:\s*mapper-os\/executable-blueprint\/v3/g, 'schema_version: buildprint/kernel/v1')
    .replace(/style:\s*phase_driven_comprehensive[^\n]*/g, 'style: kernel_loop')
    .replace(/00-questions\.md/g, '00-goal.md')
    .replace(/01-project-setup\.md/g, '01-setup.md')
    .replace(/02-ui-identity\.md/g, '02-identity.md')
    .replace(/03-phases\/phase-index\.yaml/g, 'loops/loop-index.yaml')
    .replace(/03-phases\/phase-flow\.md/g, 'loops/loop-flow.md')
    .replace(/03-phases\//g, 'loops/')
    .replace(/phase_contract:/g, 'loop_contract:')
    .replace(/phase_id:/g, 'loop_id:')
    .replace(/How to implement this phase/g, 'How to implement this loop')
  if (!/kernel:\s*\n/i.test(bp)) {
    bp = bp.replace(
      /packet_shape:/,
      `kernel:
  flow: goal → bare_agentic_loop → optional_independent_fan_out → contract_review
  bare_agentic_loop: think → act → observe until done or stuck
  independent_fan_out: clean ownership only; each worker gets goal slice + contract
  contract_review: fresh-context reviewer against 00-goal.md and active loop contract
  rule: Production maturity is never the floor for first success.

maturity_upgrades:
  rule: Optional and claim-gated. Do not require these for the first successful loop.
  examples:
    - budgets_and_loop_breakers
    - run_receipts_and_session_logs
    - swarm_ledgers_and_concurrency_proof
    - trust_zones_and_capability_grants

packet_shape:`
    )
  }
  if (!/forbidden_shapes:/i.test(bp)) {
    bp += `\nforbidden_shapes:\n  - slices/\n  - gates/\n  - 03-phases/\n  - evidence-ledger\n  - claim-gates.json\n`
  } else if (!/03-phases\//.test(bp)) {
    bp = bp.replace(/forbidden_shapes:\s*\n/, 'forbidden_shapes:\n    - 03-phases/\n    - evidence-ledger\n    - claim-gates.json\n')
  }
  if (!bp.includes('review.md')) {
    bp = bp.replace(
      /required_files:\s*\n/,
      'required_files:\n    - review.md\n'
    )
  }
  write('blueprint.yaml', bp)
}

if (exists('BUILDPRINT.md')) {
  let b = read('BUILDPRINT.md')
  b = b
    .replace(/00-questions\.md/g, '00-goal.md')
    .replace(/01-project-setup\.md/g, '01-setup.md')
    .replace(/02-ui-identity\.md/g, '02-identity.md')
    .replace(/03-phases\/phase-index\.yaml/g, 'loops/loop-index.yaml')
    .replace(/03-phases\/phase-flow\.md/g, 'loops/loop-flow.md')
    .replace(/03-phases\//g, 'loops/')
    .replace(/The active phase file/g, 'The active loop file')
    .replace(/active phase/g, 'active loop')
  if (!/bare agentic loop/i.test(b)) {
    b = b.replace(
      /## Perfection alignment/,
      `## Kernel

Default execution is:

\`\`\`text
goal → bare agentic loop → optional independent fan-out → contract review
\`\`\`

Run a bare agentic loop against \`00-goal.md\`. Fan out independent subagents only when ownership is clean. Finish with independent contract review in \`review.md\`. Production maturity is an upgrade claimed with proof — never the path to first success.

## Perfection alignment`
    )
  }
  if (!/review\.md/i.test(b)) {
    b = b.replace(
      /(`loops\/loop-flow\.md`\n)/,
      '$1\n9. `review.md` before claiming completion\n'
    )
  }
  write('BUILDPRINT.md', b)
}

// Clean claim-gates product references from loop-flow if present as requirements
if (exists('loops/loop-flow.md')) {
  let flow = read('loops/loop-flow.md')
  flow = flow
    .replace(/claim-gates\.json/g, 'contract review')
    .replace(/evidence-ledger\.jsonl/g, 'direct proof')
  write('loops/loop-flow.md', flow)
}

console.log('migrated', dir)
