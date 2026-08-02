/**
 * Structural migrate a capability packet to kernel shape.
 * Usage: node scripts/_migrate-capability-to-kernel.mjs buildprints/<name>
 */
import fs from 'fs'
import path from 'path'

const root = process.argv[2]
if (!root) {
  console.error('usage: node scripts/_migrate-capability-to-kernel.mjs <packet-dir>')
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

const name = path.basename(dir)

// 00-goal from assessment questions + host assessment summary
if (!exists('00-goal.md')) {
  const aq = exists('00-assessment-questions.md') ? read('00-assessment-questions.md') : ''
  const ha = exists('00-host-assessment.md') ? read('00-host-assessment.md') : ''
  let goal = `# 00 Goal

Install the bounded \`${name}\` capability into a compatible host so the declared verify checks pass or blockers are honest.

## Acceptance criteria

- Host assessment completed and hard stops confirmed or blocked
- Capability seams wired without whole-product rewrite
- \`verify.md\` structural/runtime checks pass or blockers recorded
- Independent contract review against this goal

## Hard-stop questions

`
  if (/Hard-stop questions/i.test(aq)) {
    goal += aq.split(/## Hard-stop questions/i)[1]?.split(/## Assumable defaults/i)[0] || ''
    goal += '\n## Assumable defaults\n'
    goal += aq.split(/## Assumable defaults/i)[1]?.split(/## Deferrable/i)[0] || '- Prefer host conventions; do not invent new product scope.\n'
    goal += '\n## Deferrable questions\n'
    goal += aq.split(/## Deferrable/i)[1] || '- Non-blocking polish after verify.\n'
  } else {
    goal += `
These require confirmed_by user or explicit_user_delegation before host wiring.

1. **Deployment posture** - trusted local, private authenticated, or public web?
2. **Secrets and provider policy** - Which credentials may be used and where may they live?
3. **Destructive/data-loss behavior** - Can this capability delete, overwrite, charge, or mutate external systems?
4. **Privacy/compliance exposure** - Private/regulated data implications?
5. **Product/artifact identity** - Is this still a bounded capability install (not a whole product rebuild)?

## Assumable defaults

- Keep host stack; do not redesign the product
- Block live providers until configured
- Record claim ceilings honestly

## Deferrable questions

- Non-blocking polish after verify
`
  }
  if (ha) {
    goal += `\n## Host assessment notes\n\nSee also \`01-host.md\` (merged assessment + plan).\n`
  }
  if (!/Assumable defaults/i.test(goal)) goal += '\n## Assumable defaults\n\n- Keep host conventions.\n'
  if (!/Deferrable questions/i.test(goal)) goal += '\n## Deferrable questions\n\n- Polish after verify.\n'
  write('00-goal.md', goal)
}

// 01-host from assessment + plan
if (!exists('01-host.md')) {
  const ha = exists('00-host-assessment.md') ? read('00-host-assessment.md') : ''
  const plan = exists('01-integration-plan.md') ? read('01-integration-plan.md') : ''
  const apply = exists('apply.md') ? read('apply.md') : ''
  write(
    '01-host.md',
    `# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before \`00-goal.md\` hard stops and this host plan.

## Host assessment

${ha || 'Assess host signals from capability.yaml host_detection. Record compatible / blocked / needs decision.'}

## Integration plan

${plan || 'Plan bounded seams: config, core integration, host wiring, operator surface. Do not redesign the whole product.'}

## Apply order

Follow:

1. \`00-goal.md\`
2. \`01-host.md\` (this file)
3. \`loops/\` in order
4. \`review.md\`
5. \`verify.md\`

${apply ? '### Legacy apply notes\n\n' + apply : ''}

Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
`
  )
}

// loops from phases
fs.mkdirSync(path.join(dir, 'loops'), { recursive: true })
if (!exists('loops/loop-flow.md')) {
  write(
    'loops/loop-flow.md',
    `# Loop Flow

\`\`\`text
goal → bare agentic loop → optional independent fan-out → contract review
\`\`\`

Use the active capability loop only. Do not turn execution into paperwork.

1. Read \`BUILDPRINT.md\`, \`capability.yaml\`, \`00-goal.md\`, \`01-host.md\`.
2. Run a bare agentic loop against the active loop objective.
3. Fan out only with clean file ownership.
4. Verify locally, then continue.
5. Finish with independent \`review.md\`, then \`verify.md\`.

Repair: return to \`00-goal.md\` for hard stops, \`01-host.md\` for host mismatch. Do not fake live success. Do not invent evidence ledgers.
`
  )
}

const phaseMap = [
  ['02-implementation-phases/01-contract-and-config.md', 'loops/01-contract-and-config.md'],
  ['02-implementation-phases/02-core-integration.md', 'loops/02-core-integration.md'],
  ['02-implementation-phases/03-host-wiring.md', 'loops/03-host-wiring.md'],
  ['02-implementation-phases/04-user-operator-surface.md', 'loops/04-operator-surface.md'],
  ['02-implementation-phases/05-verification-and-receipt.md', 'loops/04-operator-surface.md'],
]

for (const [from, to] of phaseMap) {
  if (!exists(from)) continue
  if (exists(to) && to.endsWith('04-operator-surface.md') && from.includes('05-')) {
    // append verification notes into operator surface or skip if already migrated
    continue
  }
  let t = read(from)
  t = t
    .replace(/## Objective/i, '## Building objective')
    .replace(/this phase/gi, 'this loop')
    .replace(/02-implementation-phases/g, 'loops')
  if (!/^# /m.test(t)) t = `# ${path.basename(to, '.md')}\n\n` + t
  if (!/## How to implement this loop/i.test(t)) {
    t = t.replace(/^# .+\n/, (m) => `${m}\n## How to implement this loop\n\nRead \`loops/loop-flow.md\`, \`00-goal.md\`, and \`01-host.md\`, then implement the building objective.\n`)
  }
  if (!/## DO NOT/i.test(t)) {
    t += `\n## DO NOT\n\n- Do not redesign the whole host product\n- Do not ship placeholders or functionless buttons as proof\n- Do not count mocked/sample data as live proof\n`
  }
  if (!/## Minimum proof|## Proof before/i.test(t)) {
    t += `\n## Minimum proof before moving on\n\n- Run the relevant verify/runtime check or record a blocker\n`
  }
  if (!/## Handoff note/i.test(t)) {
    t += `\n## Handoff note\n\nRecord what was wired, proof, and blockers.\n`
  }
  if (!exists(to)) write(to, t)
}

// Ensure all four loop files exist
const stubs = {
  'loops/01-contract-and-config.md': 'contract and config seams',
  'loops/02-core-integration.md': 'core integration logic',
  'loops/03-host-wiring.md': 'host wiring',
  'loops/04-operator-surface.md': 'operator/user surface and verification readiness',
}
for (const [file, label] of Object.entries(stubs)) {
  if (exists(file)) continue
  write(
    file,
    `# ${path.basename(file, '.md')}

## How to implement this loop

Read \`loops/loop-flow.md\`, \`00-goal.md\`, and \`01-host.md\`, then implement the building objective.

## Building objective

Implement ${label} for the bounded \`${name}\` capability without redesigning the host. Keep changes scoped to capability.yaml touches. Leave honest blockers when host signals are missing.

## DO NOT

- Do not redesign the whole host product
- Do not ship placeholders or functionless buttons as proof
- Do not count mocked/sample data as live proof

## Minimum proof before moving on

- Run relevant structural or runtime checks from \`verify.md\` or record blockers

## Handoff note

Record what was wired, proof, and blockers.
`
  )
}

if (!exists('review.md')) {
  write(
    'review.md',
    `# Contract Review

Independent review is mandatory before claiming capability install success. The builder must not score its own work.

## Reviewer independence

Use a fresh-context reviewer. Provide only \`00-goal.md\`, \`01-host.md\`, active loop contracts, diff/proof, and \`capability.yaml\`. Do not provide builder chat or builder rationale.

Include a \`## Reviewer independence\` section. Same-session self-review is \`REVIEW_INVALID\`.

## What to judge

- Goal/acceptance met or honestly blocked
- Bounded capability scope preserved
- Verify structural/runtime checks match claims
- No plaintext secrets or forbidden apply actions
- Claim ceiling reconciled (downgrade when partial)

Do not invent evidence ledgers. Reconcile assessment assumptions with proof; downgrade claim ceiling when blocked or not-proven.

## Outcomes

- \`loop_core_passed\`
- \`claim_qualified\`
- \`blocked\`
- \`REVIEW_INVALID\`
`
  )
}

// BUILDPRINT read order
if (exists('BUILDPRINT.md')) {
  let b = read('BUILDPRINT.md')
  const order = `

## Required read order

1. \`BUILDPRINT.md\`
2. \`capability.yaml\`
3. \`compatibility.md\`
4. \`00-goal.md\`
5. \`01-host.md\`
6. \`loops/\` (see \`loops/loop-flow.md\`)
7. \`review.md\`
8. \`verify.md\`

No source edits before \`00-goal.md\` hard stops and \`01-host.md\` assessment/plan. Kernel: goal → bare agentic loop → optional independent fan-out → contract review.
`
  if (!/00-goal\.md[\s\S]*01-host\.md[\s\S]*loops\/[\s\S]*review\.md[\s\S]*verify\.md/i.test(b)) {
    if (/## Required read order|## Read order/i.test(b)) {
      b = b.replace(/## (?:Required )?read order[\s\S]*?(?=\n## |$)/i, order.trim() + '\n\n')
    } else {
      b = b.trimEnd() + '\n' + order
    }
  }
  if (!/No source edits before/i.test(b)) {
    b += '\nNo source edits before goal and host assessment.\n'
  }
  if (!/bounded capability/i.test(b)) {
    b = b.replace(/^# .+\n/, (m) => m + '\nThis packet installs a bounded capability, not a whole-product rebuild.\n')
  }
  write('BUILDPRINT.md', b)
}

// capability.yaml packet_shape if present
if (exists('capability.yaml')) {
  let c = read('capability.yaml')
  if (/packet_shape:/i.test(c) && /00-host-assessment/.test(c)) {
    c = c.replace(
      /packet_shape:[\s\S]*?(?=\n[a-z_]+:|\z)/i,
      `packet_shape:
  required_files:
    - BUILDPRINT.md
    - capability.yaml
    - compatibility.md
    - 00-goal.md
    - 01-host.md
    - review.md
    - verify.md
    - loops/loop-flow.md
    - loops/01-contract-and-config.md
    - loops/02-core-integration.md
    - loops/03-host-wiring.md
    - loops/04-operator-surface.md
`
    )
    write('capability.yaml', c)
  }
}

// Keep verify.md; ensure receipt language remains
if (exists('verify.md')) {
  let v = read('verify.md')
  if (!/reconcile|claim ceiling|downgrade|not-proven/i.test(v)) {
    v += `\n\n## Claim reconciliation\n\nReconcile host assessment assumptions with proof. Downgrade claim ceiling when checks are partial or blocked. Record not-proven honestly before any success claim.\n`
    write('verify.md', v)
  }
}

// Remove old phase dirs / assessment files from being required (keep as archives? plan says no parallel spines)
rm('02-implementation-phases')
rm('00-host-assessment.md')
rm('00-assessment-questions.md')
rm('01-integration-plan.md')
// keep apply.md if present for credential-specific forbid language — checker reads it optionally

console.log('migrated capability', dir)
