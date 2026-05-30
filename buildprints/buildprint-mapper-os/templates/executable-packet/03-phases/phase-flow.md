# Phase Flow

You are the orchestrator for this phase only. Keep the active context small: route work through the active phase and runtime phase-run artifacts.

## Snapshot integrity gate

Before any phase work, verify:

1. `.buildprint/snapshots/BUILDPRINT.md` starts with `# BUILDPRINT:`.
2. `.buildprint/snapshots/03-phases/phase-index.yaml` contains `active_phase:`.
3. `.buildprint/snapshots/02-project-setup.md` is not empty or an error string.

If any of these checks fail, **STOP**. Do not improvise phases. Do not use a mirror source as a substitute. Record a blocker in `.buildprint/blockers.md` naming the corrupt files and instruct the user to re-run `agb start`.

## Phase identity contract

Every `.buildprint/phase-runs/<dir>/` directory name and every evidence row `phase_id` must exactly match a `phase_id` listed in `.buildprint/snapshots/03-phases/phase-index.yaml`. Creating phase-run directories with names that do not appear in the index, or writing evidence rows with invented `phase_id` values, is a fake-completion violation.

Evidence proof artifacts (test files, screenshots, trace logs) must be distinct per phase. Reusing an artifact from an earlier phase as primary evidence for a later phase is an evidence ceiling violation.

## Phase-Entry Protocol

Before writing code for any phase:

### Lead Phase Preflight Gate

Create `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml` before implementation. Required fields:

```yaml
phase_id: <phase-id>
lead_decision: accept # accept | revise | split | merge | block
user_visible_outcomes: []
affected_boundaries: []
surface_ids: []
criterion_ids: []
proof_ids: []
fake_done_risks: []
verifier_commands: []
claim_ceiling: target # target | core_pass | claim_upgrade | blocker
blockers: []
```

The Product Engineering Lead may revise, split, merge, or block Mapper OS proposed phases, but must preserve every mapped surface through an owning phase, explicit blocker, or user-approved exclusion. A missing preflight means no `phase_core_passed` claim is valid.

0. Verify the implementation project foundation exists: root `AGENTS.md`, `.buildprint/setup.md` or `.buildprint/setup/`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` for UI-bearing products. Root `AGENTS.md` must explicitly carry the generated alignment speech and list those files as mandatory reads before code edits. If the Foundation scaffold gate is missing, incomplete, or inconsistent, stop phase work and create/repair the scaffold first, exiting deterministically through the setup repair route instead of drifting into phase code.
1. Read root `AGENTS.md`, the generated alignment speech if it is not already embedded there, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` when UI-bearing; then read the active phase file named by `03-phases/phase-index.yaml`.
2. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, including how this phase extends the base project structure and local standards rather than bypassing them.
3. Implement the first real vertical path inside the scaffold.
4. Verify with the phase's exact proof commands and browser/screenshot artifacts where required.
5. Reflect against the phase proof gate, write `.buildprint/phase-runs/<phase-id>/proof.md`, then record evidence.

A phase cannot reach `phase_core_passed` if it violates `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, or `ui-identity.md`; implements a standalone demo outside the agreed base project structure; bypasses provider/persistence/worker/schema boundaries; or uses a browser/e2e/runtime blocker that hangs or exits ambiguously instead of writing a blocker artifact and exiting deterministically.

## Required Phase Artifacts

Before implementation:

- `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml`
- `.buildprint/phase-runs/<phase-id>/plan.md`

Before evidence:

- `.buildprint/phase-runs/<phase-id>/proof.md`
- `.buildprint/phase-runs/<phase-id>/evidence.json` with command/artifact manifest

Only then:

- append `.buildprint/evidence/evidence-ledger.jsonl`
- update `.buildprint/progress.md`, `.buildprint/state.json`, and `.buildprint/next-agent.md`

## Phase State Model

Every phase must distinguish three states:

- `checkpoint_recorded`: the runtime evidence ledger has at least one valid proof or blocker row for this phase.
- `phase_core_passed`: the phase's first real local vertical path is implemented, verified, reviewed against local standards, and recorded without core blockers.
- `claim_qualified`: live-provider, browser/e2e, screenshot, deployment, security, worker, or data-lifecycle proof has enough matching evidence to upgrade the corresponding claim.

An early checkpoint is not phase completion. A phase may continue after `checkpoint_recorded`, but it is not `phase_core_passed` until the owned implementation path works end to end.

Claim typing is mandatory: `target` describes intended behavior, `core_pass` requires local executable proof, `claim_upgrade` requires direct matching evidence, and `blocker` preserves scope without claiming implementation. `phase_core_passed` does not qualify live provider, deployment, worker, security, visual, or lifecycle claims unless matching claim-upgrade evidence exists.

For UI-bearing phases, `phase_core_passed` requires at least one user action path through a UI/controller boundary into runtime behavior and back into visible state or readback. Static state cards, dead buttons, generic dashboards, stacked forms, raw text-list substitutes, default browser controls, and screenshots that read as local MVPs do not satisfy the UI path.

## Evidence Gate

Runtime proof/blocker rows go only to `.buildprint/evidence/evidence-ledger.jsonl`. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence and remains immutable after bootstrap.

Before writing runtime evidence, read `05-evidence/evidence-ledger.schema.json` and conform to it. Every runtime row must include `artifact_id`, `type`, `phase_id`, valid `status`, `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.

Use the evidence ceiling rule from `04-evaluation.md`: Do not copy every required proof label into every evidence row; HTTP/API runtime traces prove API/runtime behavior, not browser behavior; Provider adapter/config tests can prove adapter seams but not live provider behavior; Review prose cannot upgrade implementation proof by itself; `visual_quality_gate` requires screenshot/browser critique, not default-control shells or raw text-list substitutes; use `blocks_continuation: false` only when a blocker limits qualification but not downstream implementation.

## Continuation gate

Continue to the next dependency-ready phase only when this phase has:

- core implementation/API/domain/persistence tests passing for the first real vertical path
- required plan, proof, and evidence rows written
- for UI-bearing phases, a local user action path and product-grade screenshot/browser review, or a non-upgrading blocker that does not block core continuation
- non-upgrading blocker rows for live-provider, deployment, or external-service proof that could not run in the current environment

Do not continue when the blocker means the current phase did not implement its core product path, did not persist state it owns, failed required tests, has unresolved destructive/security ambiguity, or cannot provide honest local runtime/API proof.
