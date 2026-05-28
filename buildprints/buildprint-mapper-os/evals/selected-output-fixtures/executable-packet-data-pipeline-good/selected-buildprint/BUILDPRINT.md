# BUILDPRINT: fixtures/executable-packet-data-pipeline-good

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

## Product brief

- Product: fixtures/executable-packet-data-pipeline-good
- Primary outcome: prove the event enrichment dataflow: input schema, transform semantics, output schema, lineage, backfill/idempotency, and data quality proof
- Primary users: developers, operators, or consumers of this capability
- Main surfaces: pipeline runner, input schema, transform stage, output artifact, lineage store, quality gate
- What this packet must not become: a pipeline without lineage, idempotency, and data quality gates

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the role contracts under `06-contracts/` required by the active phase `requires_roles`.
8. Read only the current active phase file. For a fresh run, use `active_phase` from `03-phases/phase-index.yaml`; for a targeted or resumed run, use the assignment or `.buildprint` state override after confirming the phase exists in `03-phases/phase-index.yaml`.
9. Read `04-evaluation.md`.
10. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl`.

Read these files sequentially. Do not batch, parallelize, or reorder the initial context reads, even when using multi-command tooling.

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
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md`, `.buildprint/phase-runs/<phase-id>/team-gates.md`, bounded handoffs for every role in `requires_roles`, and return files for every role. Use subagents or delegated workers when available; when unavailable, self-simulate each role through the same handoff/return artifacts. Collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated mode-aware slice, not a waterfall task bucket. Each phase must declare its `blueprint_mode` and `phase_style` in `## Phase mode contract`, and must define outcome (product/capability/operation depending on mode), mapped obligations, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements (or non-UI statement), safety/security constraints, quality gates, proof gate, and repair routing. Use subagents or delegated workers when available; self-simulate each role when unavailable.
