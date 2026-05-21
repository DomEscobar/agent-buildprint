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

| Capability | UI/UX | API | Domain logic | Persistence/state | Provider/runtime | Failure states | Tests | Proof | Depth status |
|---|---|---|---|---|---|---|---|---|---|
|  | missing | missing | missing | missing | missing | missing | missing | missing | missing |

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
