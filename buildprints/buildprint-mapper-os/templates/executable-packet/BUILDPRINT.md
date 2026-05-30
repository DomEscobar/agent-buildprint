# BUILDPRINT: <mapped-app>

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

**Before reading anything else:** verify this file begins with `# BUILDPRINT:` and that `02-project-setup.md`, `blueprint.yaml`, and `03-phases/phase-index.yaml` exist in the snapshot directory and are not empty or error strings. If any critical snapshot file is absent, empty, or contains only `not found`, **STOP** — do not improvise phases, do not invent phase IDs, do not substitute a mirror source. Record the corruption in `.buildprint/blockers.md` and instruct the user to re-run `agb start`.

## Product brief

- Product: <capability name — not the source app or brand name; describe what kind of tool or system this is>
- Primary outcome: <one concrete user-visible result: what the user can do and what they receive; do not repeat surface names as a list>
- Primary users: <who uses it>
- Main surfaces: <capability surfaces, e.g. browser workbench, API service, worker/runtime boundary, provider adapters, persistence, export/report surfaces; avoid concrete source framework names unless the framework itself is the mapped product>
- What this packet must not become: a generic local MVP, static demo, source clone, single-file product shell, generic dashboard, default-form stack, or product-agnostic UI.

## Final product at a glance

This section is the product north star generated from Mapper OS `vision.md`. It is read first and stays bounded: no architecture, no API detail, no per-phase spec. Depth lives in the owning phase file. Every surface named here must appear in the `02-project-setup.md` obligation/surface matrix with exactly one owning phase, and vice versa.

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

## Product Engineering Lead contract

You are the Product Engineering Lead for this implementation run. This is an accountability contract, not a persona. Your job is to preserve the product intent, coordinate phase work, challenge shallow implementation, require evidence before claims, and escalate blockers. Do not use role language as proof. If phases need revision, split, merge, or blocking, record that explicitly in the phase preflight before coding.

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read `generated/agent-prompt.md` as the implementation alignment speech. It is not source authority, but it must shape how you implement the packet.
4. Read and complete `02-project-setup.md`.
5. Read `blueprint.yaml` as the machine-readable mirror.
6. Read `03-phases/phase-index.yaml`.
7. Read `03-phases/phase-flow.md`.
8. Read only the current active phase file. For a fresh run, use `active_phase` from `03-phases/phase-index.yaml`; for a targeted or resumed run, use the assignment or `.buildprint` state override after confirming the phase exists in `03-phases/phase-index.yaml`.
9. Read `04-evaluation.md`.
10. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl`.

Read this `BUILDPRINT.md` first. After this file establishes authority, the remaining required spine files may be read in one batch when tooling makes that safer or faster, but their instructions must be interpreted in the listed order.

## Project setup gate

Do not start `03-phases/*` until `02-project-setup.md` has enough explicit architecture, team rules, quality gates, safety rules, and an `AGENTS.md` plan that carries the alignment speech into implementation instead of letting agents settle for literal-minimum compliance.

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

Before step 2 for each phase, create `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml`. It must record the lead decision (`accept`, `revise`, `split`, `merge`, or `block`), user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers. A missing preflight blocks `phase_core_passed`.

## Completion semantics

Read this before interpreting any phase status, evidence row, or progress file.

- `PROOF_REQUIRED`, `checkpoint_recorded`, `phase_core_passed`, and `complete-bounded-proof` describe **bounded packet proof**, not production-product completion. A run may honestly finish all phases with blockers and still not deliver the final product the user expects.
- Review prose, summaries, screenshots, or status notes are **permission to record evidence**, never evidence themselves. Prose that says "tests passed", "screenshots captured", or "no dead handlers" without a rerunnable command output or an on-disk artifact an independent reader can reopen does not prove anything.
- Every `pass` or `pass-with-scoped-debt` verdict must point to at least one of: (a) an exact command that was run and whose stdout/stderr is quoted or saved under `.buildprint/phase-runs/<phase-id>/`, or (b) a file path under the implementation project or `.buildprint/phase-runs/<phase-id>/` that exists and matches the claim.
- When independent reviewers are unavailable, the implementer must still run the scaffold **runnable verification commands** from `02-project-setup.md`; verification output is the minimum substitute for review prose.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md`, implement the smallest real vertical path, run verification, write `.buildprint/phase-runs/<phase-id>/proof.md`, and only then append runtime evidence.

A phase is a proof-gated mode-aware slice, not a waterfall task bucket. Each phase must declare its `blueprint_mode` and `phase_style` in `## Phase mode contract`, and must define outcome (product/capability/operation depending on mode), mapped obligations, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements (or non-UI statement), safety/security constraints, quality gates, proof gate, and repair routing.

## Final critical reviewer

After the final phase passes its continuation gate — or when the run stops with honest blockers on remaining phases — switch modes before handover: become a harsh reviewer instead of the optimistic implementer.

Assume the product is trying to fool you. Inspect source, run the runnable verification commands from `02-project-setup.md`, and for UI-bearing products use browser/e2e or screenshots to exercise the real surface. Click every visible control. Try empty, loading, error, blocked, and reload states. Look for placeholder copy, TODO/FIXME-visible behavior, raw ids, debug/proof vocabulary, generic dashboard/form/list leakage, canned output, mock-only paths, dead buttons, fake controls, missing persistence, and the absence of the obvious next user action.

Fix local issues before handover. Only leave work unfixed when it is genuinely blocked, credentialed, destructive, expensive, or too large for this run, and name the reason plainly.

## Handover

After the final critical reviewer pass is complete — or when the run stops with honest blockers on remaining phases — write `.buildprint/handover.md`. This is a runtime artifact for the human developer, not a packet file. Do not restate packet prose. Compare the actual built state against `## Final product at a glance`, the final reviewer findings, and `## Completion semantics`.

In `.buildprint/handover.md`, use these six `##` section headings:

### Build state

One short paragraph: current run status from `.buildprint/state.json`, phase states from `03-phases/phase-index.yaml`, what the evidence ledger shows, and whether the final reviewer found unresolved required repairs. State clearly whether the run reached `complete-bounded-proof`, stopped on blockers, or is incomplete. Bounded proof is not production completion.

### North star comparison

One row per surface named in `## Final product at a glance`:

| Surface | Status | Honest gap |
|---|---|---|
| <surface name> | built / partial / blocked / not started | <specific fact, file path, or blocker reason> |

Honest gap rule: a surface is **built** only if its owning phase reached `phase_core_passed` **and** the relevant **Done looks like** criteria are satisfied by real artifacts or command output. `checkpoint_recorded`, review prose, or blocker rows alone do not count as built.

### What was built

Bullet list of surfaces and capabilities that meet the built bar above. Cite `phase_id` and the proof artifact or command that supports each item.

### What is missing or blocked

Bullet list of every glance surface, done-looks-like criterion, or claim that is not yet honestly satisfied. Cite the glance surface, phase, and reason (missing proof, stub handler, live credential blocker, etc.).

### What the human must do next

Numbered list of atomic actions the human can take without rereading the packet. Each item must be completable in one sitting by one developer. Include live credential setup, deployment approval, security review, or fixing a named stub/blocker when applicable. Do not omit external dependencies.

### Micro roadmap

3–7 numbered items in dependency order to reach production-ready from the current state. Each item is one sentence plus an effort label (`small`, `medium`, or `large`). Omit work already done. This is the smallest next sequence, not a full project plan.

Tone: state facts, not aspirations. Write for a developer who has never seen this Buildprint.
