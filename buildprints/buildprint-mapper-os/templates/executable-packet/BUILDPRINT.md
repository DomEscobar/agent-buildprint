# BUILDPRINT: <mapped-app>

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

**Before reading anything else:** verify this file begins with `# BUILDPRINT:` and that `02-project-setup.md`, `blueprint.yaml`, and `03-phases/phase-index.yaml` exist in the snapshot directory and are not empty or error strings. If any critical snapshot file is absent, empty, or contains only `not found`, **STOP** — do not improvise phases, do not invent phase IDs, do not substitute a mirror source. Record the corruption in `.buildprint/blockers.md` and instruct the user to re-run `agb start`.

## Product brief

- Product: <capability name — not the source app or brand name; describe what kind of tool or system this is>
- Primary outcome: <one concrete user-visible result: what the user can do and what they receive; do not repeat surface names as a list>
- Primary users: <who uses it>
- Main surfaces: <capability surfaces, e.g. browser workbench, API service, worker/runtime boundary, provider adapters, persistence, export/report surfaces; avoid concrete source framework names unless the framework itself is the mapped product>
- What this packet must not become: a generic local MVP, static demo, source clone, or single-file product shell.

## Final product at a glance

This section is the product north star. It is read first and stays bounded: no architecture, no API detail, no per-phase spec. Depth lives in the owning phase file. Every surface named here must appear in the `02-project-setup.md` obligation/surface matrix with exactly one owning phase, and vice versa.

**Golden path:** <one short paragraph — the single primary end-to-end journey a user takes through the core surfaces from first action to final result. Use product language; do not use source-internal node or route names.>

**Surfaces** (one line each; depth in the owning phase):

- <Surface name> — <what the user does here> — Phase <N>
- <Surface name> — <what the user does here> — Phase <N>
- …

**Done looks like:**

- <Observable end-state 1, e.g. a saved entity reloads intact after restart>
- <Observable end-state 2, e.g. real interaction — drag/edit/generate — not static markup or dead controls>
- <Observable end-state 3, e.g. honest blocked-provider states when credentials are absent>

This package is `PROOF_REQUIRED`. The glance describes the target product, not a claim that it is built.

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

## Completion semantics

Read this before interpreting any phase status, evidence row, or progress file.

- `PROOF_REQUIRED`, `checkpoint_recorded`, `phase_core_passed`, and `complete-bounded-proof` describe **bounded packet proof**, not production-product completion. A run may honestly finish all phases with blockers and still not deliver the final product the user expects.
- A role return, review file (`reviews/*.md`), handoff, or self-simulated adversarial review is **permission to record evidence**, never evidence itself. Prose that says "tests passed", "screenshots captured", or "no dead handlers" without a rerunnable command output or an on-disk artifact an independent reader can reopen does not prove anything.
- Every `pass` or `pass-with-scoped-debt` verdict must point to at least one of: (a) an exact command that was run and whose stdout/stderr is quoted or saved under `.buildprint/phase-runs/<phase-id>/`, or (b) a file path under the implementation project or `.buildprint/phase-runs/<phase-id>/` that exists and matches the claim.
- When subagents are unavailable, the implementer and reviewer share one context. Treat `06-contracts/test-and-verification.md` **Self-simulation referee** plus the scaffold **runnable verification commands** from `02-project-setup.md` as the minimum substitute for an independent reviewer — not optional narration.

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

A phase is a proof-gated mode-aware slice, not a waterfall task bucket. Each phase must declare its `blueprint_mode` and `phase_style` in `## Phase mode contract`, and must define outcome (product/capability/operation depending on mode), mapped obligations, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements (or non-UI statement), safety/security constraints, quality gates, proof gate, and repair routing.
