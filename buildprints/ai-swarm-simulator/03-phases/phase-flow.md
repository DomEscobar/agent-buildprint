# Phase Flow

You are the orchestrator for this phase only. Keep the active context small: route work through the active phase, the required role contracts in `06-contracts/`, and runtime phase-run artifacts.

## Phase-Entry Protocol

Before writing code for any phase:

0. Verify the implementation project foundation exists: root `AGENTS.md`, `.buildprint/setup.md` or `.buildprint/setup/`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` for UI-bearing products. Root `AGENTS.md` must explicitly require coding agents to read those files before code edits. If the Foundation scaffold gate is missing, incomplete, or inconsistent, stop phase work and create/repair the scaffold first.
1. Read root `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` when UI-bearing; then read the active phase file named by `03-phases/phase-index.yaml`.
2. Resolve every `requires_roles` entry to `06-contracts/<role>.md`.
3. Read only the role contracts required by the active phase.
4. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, including how this phase extends the base project structure and local standards rather than bypassing them.
5. Write `.buildprint/phase-runs/<phase-id>/team-gates.md` with active roles, contract files, blocking gates, and proof expectations.
6. Write bounded `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md` for every required role.
7. Use subagents, delegated workers, or parallel specialist sessions when the environment supports them.
8. If subagents are unavailable, self-simulate each required role and write `.buildprint/phase-runs/<phase-id>/returns/<role>.md`.
9. Integrate role returns, implement the first real vertical path inside the scaffold, verify, review, write proof, then record evidence.

Subagents are optional tooling. Role-gated delegation artifacts are mandatory. Do not mark `phase_core_passed` until every required role has a handoff and a return file, or an explicit blocker routed through the evidence ledger.

A phase cannot reach `phase_core_passed` if it violates `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, or `ui-identity.md`; implements a standalone demo outside the agreed base project structure; bypasses provider/persistence/worker/schema boundaries; or uses a browser/e2e/runtime blocker that hangs or exits ambiguously instead of writing a blocker artifact and exiting deterministically.

## Required Phase Artifacts

Before implementation:

- `.buildprint/phase-runs/<phase-id>/plan.md`
- `.buildprint/phase-runs/<phase-id>/team-gates.md`
- `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md` for every role in `requires_roles`

Before evidence:

- `.buildprint/phase-runs/<phase-id>/returns/<role>.md` for every role in `requires_roles`, unless that role has an explicit blocker
- `.buildprint/phase-runs/<phase-id>/reviews/architecture.md`
- `.buildprint/phase-runs/<phase-id>/reviews/ux.md`
- `.buildprint/phase-runs/<phase-id>/reviews/qa.md`
- `.buildprint/phase-runs/<phase-id>/proof.md`

Only then:

- append `.buildprint/evidence/evidence-ledger.jsonl`
- update `.buildprint/progress.md`, `.buildprint/state.json`, and `.buildprint/next-agent.md`

## Phase State Model

Every phase must distinguish three states:

- `checkpoint_recorded`: the runtime evidence ledger has at least one valid proof or blocker row for this phase.
- `phase_core_passed`: the phase's first real local vertical path is implemented, verified, reviewed, and recorded without core blockers.
- `claim_qualified`: live-provider, browser/e2e, screenshot, deployment, security, worker, or data-lifecycle proof has enough matching evidence to upgrade the corresponding claim.

An early checkpoint is not phase completion. A phase may continue after `checkpoint_recorded`, but it is not `phase_core_passed` until the owned implementation path works end to end.

For UI-bearing phases, `phase_core_passed` requires at least one user action path through a UI/controller boundary into runtime behavior and back into visible state or readback. Static state cards, dead buttons, generic dashboards, stacked forms, raw text-list substitutes, default browser controls, and screenshots that read as local MVPs do not satisfy the UI path.

## Delegation Protocol

Each handoff must include:

- phase id and active phase file
- role contract path under `06-contracts/`
- files to read
- allowed edit scope
- non-goals
- success criteria
- verification command or proof artifact expected
- evidence row expectations
- risks/blockers to report

Each return file must use the headings required by its role contract. The main agent remains responsible for integration, final verification, claim limits, and evidence rows even when subagents produce the role returns.

## Review and Integration

The orchestrator cannot silently discard dissent. If a role return reports a blocker or quality gap, either fix it, route it to setup/questions/prior phase/external blocker, or record why it is out of scope.

Required runtime artifact reviews:

- `.buildprint/phase-runs/<phase-id>/reviews/architecture.md`: use the `product-architect` return to verify topology, dependency direction, state/runtime ownership, product obligation preservation, ADR-lite tradeoffs, and next-phase boundary.
- `.buildprint/phase-runs/<phase-id>/reviews/ux.md`: use the `ux-ui-craft` return for UI-bearing phases; for non-UI phases, write `## Verdict: not-ui-bearing`, `## Reason`, and `## Downstream UI obligations`.
- `.buildprint/phase-runs/<phase-id>/reviews/qa.md`: write a phase proof review that verifies commands, negative cases, evidence row scope, and claim limits.

## Evidence Gate

Runtime proof/blocker rows go only to `.buildprint/evidence/evidence-ledger.jsonl`. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence and remains immutable after bootstrap.

Before writing runtime evidence, read `05-evidence/evidence-ledger.schema.json` and conform to it. Every runtime row must include `artifact_id`, `type`, `phase_id`, valid `status`, `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.

Use the evidence ceiling rule from `06-contracts/proof-and-evidence.md`: Do not copy every required proof label into every evidence row; HTTP/API runtime traces prove API/runtime behavior, not browser behavior; Provider adapter/config tests can prove adapter seams but not live provider behavior; Review prose cannot upgrade implementation proof by itself; QA review must explicitly audit every `upgrades_claim: true` row; `visual_quality_gate` requires screenshot/browser critique, not default-control shells or raw text-list substitutes; use `blocks_continuation: false` only when a blocker limits qualification but not downstream implementation.

## Continuation gate

Continue to the next dependency-ready phase only when this phase has:

- core implementation/API/domain/persistence tests passing for the first real vertical path
- required handoffs, returns, reviews, proof, and evidence rows written
- for UI-bearing phases, a local user action path and product-grade screenshot/browser review, or a non-upgrading blocker that does not block core continuation
- non-upgrading blocker rows for live-provider, deployment, or external-service proof that could not run in the current environment

Do not continue when the blocker means the current phase did not implement its core product path, did not persist state it owns, failed required tests, has unresolved destructive/security ambiguity, or cannot provide honest local runtime/API proof.
