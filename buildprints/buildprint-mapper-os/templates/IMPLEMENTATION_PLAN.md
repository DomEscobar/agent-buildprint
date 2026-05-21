# IMPLEMENTATION_PLAN

## Current State

- Requested scope:
- Selected target / first slice:
- Active capability:
- Completed packs:
- Blocked packs:
- Next pack:

## Implementation Team / Harness Plan

Choose the implementation team from Buildprint signals before coding. Record the selected roles/passes and why.

- Product/UX design pass:
- Frontend implementation pass:
- Backend/runtime architecture pass:
- Provider/integration pass:
- Security/privacy review pass:
- Browser/API QA pass:
- Coverage/final Buildprint-readiness review:

## Evidence-Producing Role Chain

Roles are not free-form thoughts. Each pass must produce an artifact that the next pass consumes. If an artifact is missing or too vague, stop and repair it before coding or promotion.

| Pass | Role | Must produce | Consumed by | Artifact location | Status |
|---:|---|---|---|---|---|
| 1 | Source mapper / archaeologist | source evidence ledger for each included capability, with observed files/routes/screens/jobs/configs or explicit inference/blocker notes | product architect | `CAPABILITY_INDEX.md` Source evidence column and `capabilities/*/CAPABILITY.md` | missing |
| 2 | Product architect | product obligation and quality bar per capability; explicit included/excluded boundaries without silent scope shrink | implementation planner | `CAPABILITY_INDEX.md` Product obligation column and `CURRENT_STATE.md` | missing |
| 3 | Implementation planner | required topology/layers/files and first vertical slice per capability | builder | `CAPABILITY_INDEX.md` Required topology column and Milestones table | missing |
| 4 | QA verifier | proof command, proof artifact, negative test, runtime/browser evidence, and blocker rows | skeptical reviewer | `VERIFICATION.md` Capability Proof Ledger and capability `VERIFICATION.md` files | missing |
| 5 | Skeptical reviewer | promotion/downgrade decision; reject fake completion and record exact promotion blockers | final handoff | `CAPABILITY_INDEX.md` Depth status/Promotion blocker columns and `REVERSAL_REPORT.md` | missing |

## Architecture Topology Gate

Before implementation begins, define the target product topology. This is a hard gate for medium, large, UI-bearing, provider-backed, or full-suite scopes.

| Surface | Required topology | Actual topology | Evidence | Status |
|---|---|---|---|---|
| Frontend/UI | feature/module/component structure for each user-facing flow; not a single static shell unless scope is tiny and explicitly justified |  |  | missing |
| Backend/API | route layer separated from domain/service/provider/storage/task concerns for broad scopes |  |  | missing |
| Providers/integrations | explicit adapters, config boundaries, retries/errors, secret-name-only handling |  |  | missing |
| Persistence/state | durable state model, lifecycle, restart/readback, delete/export semantics where claimed |  |  | missing |
| Tasks/runtime | job model, status/progress/logs/cancel/failure semantics for long-running work |  |  | missing |

Fail the implementation review if a medium/large/full-suite product is delivered as a mostly single-file backend, one static UI file, route-shaped endpoints, or seam-only adapters without a recorded blocker and downgraded qualification.

## Capability Depth Matrix

Every included capability must be scored before “implemented” can be claimed. `CONTRACT_SEAM_ONLY` may preserve scope, but it is not implementation completion.

| Capability | Source evidence | Product obligation | Required topology | UI/UX | API | Domain logic | Persistence/state | Provider/runtime | Failure states | Proof command | Proof artifact | Negative test | Runtime/browser evidence | Depth status | Promotion blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing |

Depth status values: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.

## Milestones

Milestones are implementation order, not scope definition. Do not remove or hide capabilities because they are not first-slice work.

| Order | Capability | Readiness state | First slice | First verification gate | Required builder/review passes | Status |
|---:|---|---|---|---|---|---|
| 1 |  |  |  |  |  | pending |

## Decision Log

-

## Risk Register

-

## Evidence Update Rule

After each milestone, update `CURRENT_STATE.md`, the capability `VERIFICATION.md`, and root `VERIFICATION.md`.

## Proof Ledger Stop Rule

Do not begin final status/handoff while any included capability is missing a Capability Proof Ledger row. Do not claim implementation completion for a capability until its proof command and artifact are present, or it is explicitly downgraded with a promotion blocker.
