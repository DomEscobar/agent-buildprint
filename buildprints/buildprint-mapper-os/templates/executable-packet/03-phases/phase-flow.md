# Phase Flow

You are the orchestrator for this phase only. Keep the active context small: route work through the active phase, the required role contracts in `06-contracts/`, and runtime phase-run artifacts.

## Snapshot integrity gate

Before any phase work, verify:

1. `.buildprint/snapshots/BUILDPRINT.md` starts with `# BUILDPRINT:`.
2. `.buildprint/snapshots/03-phases/phase-index.yaml` contains `active_phase:`.
3. `.buildprint/snapshots/02-project-setup.md` is not empty or an error string.

If any of these checks fail, **STOP**. Do not improvise phases. Do not use a mirror source as a substitute. Record a blocker in `.buildprint/blockers.md` naming the corrupt files and instruct the user to re-run `agb start`.

## Phase identity contract

Every `.buildprint/phase-runs/<dir>/` directory name and every evidence row `phase_id` must exactly match a `phase_id` listed in `.buildprint/snapshots/03-phases/phase-index.yaml`. Creating phase-run directories with names that do not appear in the index, or writing evidence rows with invented `phase_id` values, is a fake-completion violation. Invented phase IDs cannot satisfy proof gates and must not be claimed as `phase_core_passed`.

Evidence proof artifacts (test files, screenshots, trace logs) must be distinct per phase. Reusing an artifact from an earlier phase as primary evidence for a later phase is an evidence ceiling violation — write a separate row with a distinct command and artifact path.

## Phase-Entry Protocol

Before writing code for any phase:

0. Verify the implementation project foundation exists: root `AGENTS.md`, `.buildprint/setup.md` or `.buildprint/setup/`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` for UI-bearing products. Root `AGENTS.md` must explicitly require coding agents to read those files before code edits. If the Foundation scaffold gate is missing, incomplete, or inconsistent, stop phase work and create/repair the scaffold first.
1. Read root `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` when UI-bearing; then read the active phase file named by `03-phases/phase-index.yaml`.
2. Resolve every `requires_roles` entry to `06-contracts/<role>.md`.
3. Read only the role contracts required by the active phase.
4. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, including how this phase extends the base project structure and local standards rather than bypassing them.
5. Write `.buildprint/phase-runs/<phase-id>/team-gates.md` with active roles, contract files, blocking gates, and proof expectations.
6. Write bounded `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md` for every required role.
7. Use subagents, delegated workers, or parallel specialist sessions when the environment supports them.
8. If subagents are unavailable, self-simulate each required role and write `.buildprint/phase-runs/<phase-id>/returns/<role>.md`.
9. Integrate role returns, implement the first real vertical path inside the scaffold, verify, review, write proof, then record evidence.

Subagents are optional tooling. Role-gated delegation artifacts are mandatory. Do not mark `phase_core_passed` until every required role has a handoff and a return file, or an explicit blocker routed through the evidence ledger.

A phase cannot reach `phase_core_passed` if it violates `architecture.md`, `engineering-standards.md`, `test-strategy.md`, or `ui-identity.md`; implements a standalone demo outside the agreed base project structure; bypasses provider/persistence/worker/schema boundaries; or uses a browser/e2e/runtime blocker that hangs or exits ambiguously instead of writing a blocker artifact and exiting deterministically.

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

### Handoff anti-boilerplate rule

A handoff is a real brief, not a formatted placeholder. Before writing any handoff:

1. Every path listed under `files to read` must exist in the implementation project at the time the handoff is written. Do not guess likely paths  before the project structure exists. List only paths you have confirmed by reading or listing the directory. If a needed file does not yet exist, say so explicitly and name the file as a precondition, not as a read target.
2. `success criteria` must name the concrete user action path for this phase (e.g. "operator submits a new project form, project row appears in the list, API call returns 200 with persisted ID"). Generic criteria such as "action path and readback are recorded" are invalid.
3. `verification command or proof artifact expected` must be the exact command string or file path that the role must produce (e.g. `npm test -- --grep "project create"` or `screenshot: .buildprint/phase-runs/01-.../browser-after-project.png`). "Run tests" is not a valid entry.
4. `evidence row expectations` must name the `proof_type` values and `upgrades_claim` verdict for each row this role is expected to contribute.

A handoff that omits items 1–4 or uses generic boilerplate is invalid. The orchestrator may not use an invalid handoff as the basis for a return and must not count the role gate as satisfied.

## Adversarial self-review

When subagents are unavailable and the orchestrator self-simulates a role, the simulated return must be written as an adversarial falsification, not as a narrator of the quality bar.

For each applicable `## Reject If` criterion in the role contract, the return must:

1. State the criterion explicitly.
2. Cite the concrete disproving evidence: a source file path and line (or a range), a captured artifact path, or a specific runtime trace entry that demonstrates the criterion is not violated. A general statement that the criterion is satisfied is not disproving evidence.
3. If disproving evidence cannot be cited, emit `## Verdict: blocker` and name the missing evidence as `## Required repair before evidence`.

Additional requirements for UI roles when self-simulated:

- Read the relevant component/handler source before writing the return. Look specifically for empty event callbacks, route-shaped stubs that return a static response without side effects, and UI state that does not update after user actions. Name each one found as a defect or confirm each one is absent with its source location.
- At least one captured screenshot or trace must exist and must visibly differ from the initial page load before a UI pass verdict is valid. Name the two artifacts (initial and post-action) and describe the visible difference.

The self-simulated role is a committed adversary, not a narrator. If it cannot produce falsifying evidence, it blocks.

## Review and Integration

The orchestrator cannot silently discard dissent. If a role return reports a blocker or quality gap, either fix it, route it to setup/questions/prior phase/external blocker, or record why it is out of scope.

Required runtime artifact reviews:

- `.buildprint/phase-runs/<phase-id>/reviews/architecture.md`: use the `product-architect` return to verify topology, dependency direction, state/runtime ownership, product obligation preservation, ADR-lite tradeoffs, and next-phase boundary.
- `.buildprint/phase-runs/<phase-id>/reviews/ux.md`: use the `ux-ui-craft` return for UI-bearing phases; for non-UI phases, write `## Verdict: not-ui-bearing`, `## Reason`, and `## Downstream UI obligations`.
- `.buildprint/phase-runs/<phase-id>/reviews/qa.md`: use the `test-and-verification` return to verify commands, negative cases, evidence row scope, and claim limits.

## Evidence Gate

Runtime proof/blocker rows go only to `.buildprint/evidence/evidence-ledger.jsonl`. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence and remains immutable after bootstrap.

Before writing runtime evidence, read `05-evidence/evidence-ledger.schema.json` and conform to it. Every runtime row must include `artifact_id`, `type`, `phase_id`, valid `status`, `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.

Use the evidence ceiling rule from `06-contracts/test-and-verification.md`: Do not copy every required proof label into every evidence row; HTTP/API runtime traces prove API/runtime behavior, not browser behavior; Provider adapter/config tests can prove adapter seams but not live provider behavior; Review prose cannot upgrade implementation proof by itself; QA review must explicitly audit every `upgrades_claim: true` row; `visual_quality_gate` requires screenshot/browser critique, not default-control shells or raw text-list substitutes; use `blocks_continuation: false` only when a blocker limits qualification but not downstream implementation.

## Continuation gate

Continue to the next dependency-ready phase only when this phase has:

- core implementation/API/domain/persistence tests passing for the first real vertical path
- required handoffs, returns, reviews, proof, and evidence rows written
- for UI-bearing phases, a local user action path and product-grade screenshot/browser review, or a non-upgrading blocker that does not block core continuation
- non-upgrading blocker rows for live-provider, deployment, or external-service proof that could not run in the current environment

Do not continue when the blocker means the current phase did not implement its core product path, did not persist state it owns, failed required tests, has unresolved destructive/security ambiguity, or cannot provide honest local runtime/API proof.
