# BUILDPRINT: executable packet good fixture

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files.

## Required read order

1. Read this `BUILDPRINT.md`.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the active phase file: `03-phases/01-ingest-record.md`.
7. Read `04-evaluation.md`.
8. Append proof or blocker rows to `05-evidence/evidence-ledger.jsonl`.

## Project setup gate

Do not start `03-phases/*` until `02-project-setup.md` has enough explicit architecture, team rules, quality gates, safety rules, and `AGENTS.md` plan to prevent agents from inventing project structure.

Blank answers in `01-questions.md` are not blockers. They authorize AI best-fit decisions unless the choice is irreversible, expensive, credentialed, destructive, or product-defining.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect existing project files, nearest `AGENTS.md`, current behavior, and constraints.
2. Plan: state the smallest coherent change, likely files, and verification gate.
3. Execute: make scoped changes without silently expanding architecture.
4. Verify: run the planned test/build/browser/runtime gate and inspect output.
5. Reflect: compare results against the phase proof gate.
6. Record: append evidence or blocker rows before claiming progress.

A phase cannot be marked done from code edits alone.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase
- external blocker -> `05-evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md` and `.buildprint/phase-runs/<phase-id>/team.md`, dispatch or explicitly simulate bounded role work, collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated product slice, not a waterfall task bucket. Each phase must define product outcome, source evidence, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.
