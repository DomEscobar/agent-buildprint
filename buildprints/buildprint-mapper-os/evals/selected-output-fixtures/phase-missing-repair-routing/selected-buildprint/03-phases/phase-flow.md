# Phase Flow

You are the orchestrator for this phase only.

Your job is not to implement everything yourself first. Your job is to produce a phase plan, assemble the right review lenses, dispatch bounded work or explicitly simulate bounded specialist passes when subagents are unavailable, review returns, integrate, verify, and record proof.

## Phase-entry protocol

Before writing code for any phase:

1. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`.
2. Assemble the required roles in `.buildprint/phase-runs/<phase-id>/team.md` from the phase signals; do not use a fixed team when the phase does not need it.
3. Create bounded handoffs before implementation in `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md`.
4. Dispatch specialist work when subagents are available, or simulate each role explicitly and write the simulated return.
5. Collect returns in `.buildprint/phase-runs/<phase-id>/returns/<role>.md`.
6. Integrate only after reviewing role returns against the phase proof gate.
7. Verify with the phase quality gates.
8. Write proof/review artifacts before appending runtime evidence.

You may not append runtime evidence or mark this phase passed until the required phase-run artifacts exist.

## Required phase artifacts

Before code:

- `.buildprint/phase-runs/<phase-id>/plan.md`
- `.buildprint/phase-runs/<phase-id>/team.md`

During work:

- `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md`
- `.buildprint/phase-runs/<phase-id>/returns/<role>.md`

Before evidence:

- `.buildprint/phase-runs/<phase-id>/reviews/architecture.md`
- `.buildprint/phase-runs/<phase-id>/reviews/ux.md` if UI-bearing
- `.buildprint/phase-runs/<phase-id>/reviews/qa.md`
- `.buildprint/phase-runs/<phase-id>/proof.md`

Only then:

- append `.buildprint/evidence/evidence-ledger.jsonl`
- update `.buildprint/progress.md`, `.buildprint/state.json`, and `.buildprint/next-agent.md`

## Team assembly

Team assembly is phase-derived. Use `requires_roles` from the phase file when present. If absent, infer the smallest useful team from the phase content:

- `product-architect`: source surface dispositions, capability preservation, dependency direction, project structure.
- `ux-ui-craft`: UI-bearing work, empty/loading/error/blocked/success states, accessibility, responsive behavior.
- `integration-runtime`: APIs, providers, workers, jobs, external side effects, error semantics.
- `data-persistence`: durable state, migrations, import/export, retention, restart proof.
- `security-boundary`: auth, tenant/privacy, secrets, destructive actions, uploads, external writes.
- `test-and-verification`: test/build/browser/runtime proof, no-fake scan, evidence quality.

Do not create busywork roles. Every role must have a bounded assignment, success criteria, proof expectation, and return artifact.

## Bounded handoff shape

Each handoff must include:

- phase id and phase file
- role/lens
- files to read
- allowed edit scope, if any
- non-goals
- success criteria
- verification command or proof artifact expected
- evidence row requirements
- risks/blockers to report

## Review and integration

The orchestrator integrates returns, but cannot silently discard dissent. If a role reports a blocker or quality gap, either fix it, route it to setup/questions/prior phase/external blocker, or record why it is out of scope.

## Review contracts

Reviews are not status summaries. A review may pass only if it answers the required rejection questions with evidence, scoped deferral, or a blocker. Do not write a generic "looks good" review. If a required question is not applicable, say why and name the phase that owns it.

### Architecture review contract

Write `.buildprint/phase-runs/<phase-id>/reviews/architecture.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Dependency direction`: what depends on what; name any illegal dependency introduced.
- `## Source capability preservation`: preserved/replaced/merged/deferred/dropped surfaces reviewed.
- `## State and runtime ownership`: who owns persistence, tasks, providers, env, artifacts.
- `## Provider/live claim honesty`: whether deterministic proof, live proof, or blocker applies.
- `## Scoped shortcuts`: shortcuts accepted for this phase, why they do not upgrade claims.
- `## Next-phase boundary`: what later phases must not inherit or incorrectly own.
- `## Required repair before evidence`: none, or exact repair/blocker.

### UX review contract

If the phase is UI-bearing, write `.buildprint/phase-runs/<phase-id>/reviews/ux.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Primary user job`: the main task this screen or flow serves.
- `## Screen composition`: layout, hierarchy, primary and secondary actions.
- `## State matrix`: empty, loading, error, blocked, and success/ready states.
- `## Responsive/accessibility proof`: mobile/desktop, keyboard path, contrast, and no-overlap evidence.
- `## Destructive/sensitive actions`: confirmation, reversibility, and copy clarity.
- `## Screenshot or DOM evidence`: path/command, or blocker.
- `## Required repair before evidence`: none, or exact repair/blocker.

If the phase is not UI-bearing, `.buildprint/phase-runs/<phase-id>/reviews/ux.md` must still exist and use these headings:

- `## Verdict`: not-ui-bearing
- `## Reason`
- `## Downstream UI obligations`

### QA review contract

Write `.buildprint/phase-runs/<phase-id>/reviews/qa.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Commands run`
- `## What passed`
- `## What this does not prove`
- `## Blockers and claim limits`
- `## Evidence row check`: whether `upgrades_claim` matches the actual proof level.

If any review verdict is `blocker`, do not append passing evidence. Append a blocker row only after the required review and proof artifacts exist.

## Evidence gate

Runtime proof/blocker rows go only to `.buildprint/evidence/evidence-ledger.jsonl`. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence and remains immutable after bootstrap.
