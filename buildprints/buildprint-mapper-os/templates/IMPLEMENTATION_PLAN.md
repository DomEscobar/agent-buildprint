# IMPLEMENTATION_PLAN

## Current State

- Requested scope:
- Selected target / first slice:
- Active capability:
- Completed packs:
- Blocked packs:
- Next pack:

## Implementation Team / Harness Plan

Use `TEAM_STACK.md` as the implementation team router before coding. Record the selected team packs and why.

- product-architect:
- ux-ui-craft:
- test-and-verification:
- integration-runtime:
- security-boundary:
- data-persistence:

## Evidence-Producing Role Chain

Roles are not free-form thoughts. Each pass must produce an artifact that the next pass consumes. If an artifact is missing or too vague, stop and repair it before coding or promotion.

| Pass | Team | Must produce | Consumed by | Artifact location | Status |
|---:|---|---|---|---|---|
| 1 | source mapper / archaeologist | source evidence ledger for each included capability, with observed files/routes/screens/jobs/configs or explicit inference/blocker notes | product-architect | `CAPABILITY_INDEX.md` Source evidence column and `capabilities/*/CAPABILITY.md` | missing |
| 2 | product-architect | product obligation, topology, architecture decision notes, first vertical slice, and included/excluded boundaries without silent scope shrink | implementation planner | `CAPABILITY_INDEX.md` Product obligation/Required topology/Topology status columns and `CURRENT_STATE.md` | missing |
| 3 | ux-ui-craft when selected | screen inventory, workflow states, taste variables, responsive behavior, visual quality bar, and browser proof plan | builder and QA | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, and `CAPABILITY_INDEX.md` UI/UX status column | missing / not-applicable |
| 4 | integration-runtime / security-boundary / data-persistence when selected | owned boundary contracts and proof/blocker requirements | builder and QA | `PROVIDERS.md`, `SECURITY.md`, `DATA_LIFECYCLE.md`, capability packs | missing / not-applicable |
| 5 | test-and-verification | proof command, proof artifact, negative test, runtime/browser evidence, and blocker rows | skeptical reviewer | `VERIFICATION.md` Capability Proof Ledger and capability `VERIFICATION.md` files | missing |
| 6 | skeptical reviewer | promotion/downgrade decision; reject fake completion and record exact promotion blockers | final handoff | `CAPABILITY_INDEX.md` Depth status/Promotion blocker columns and `REVERSAL_REPORT.md` | missing |

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

## Architecture Decision Notes

| Decision | Chosen approach | Alternatives rejected | Tradeoff | Reversal trigger |
|---|---|---|---|---|
|  |  |  |  |  |

## Team-Pack Gate

Before implementation begins, confirm `TEAM_STACK.md` has selected every required team and that each selected team owns a milestone gate.

| Team | Trigger | Milestone gate | Evidence path | Status |
|---|---|---|---|---|
| product-architect | medium/large/full-suite, UI-bearing, or broad surface | topology and first real vertical slice approved | `CAPABILITY_INDEX.md`, this plan | missing |
| ux-ui-craft | user-facing UI/browser/dashboard/graph/report | UX contract, design quality bar, and browser proof plan approved | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, root/capability `VERIFICATION.md` | missing / not-applicable |
| test-and-verification | always | proof ledger rows ready before claims | root/capability `VERIFICATION.md` | missing |
| integration-runtime | provider/API/upload/job/runtime/webhook | provider/runtime boundary proof or blocker | `PROVIDERS.md`, capability pack | missing / not-applicable |
| security-boundary | auth/admin/user data/payment/destructive/secrets | threat/permission/abuse proof or blocker | `SECURITY.md`, capability pack | missing / not-applicable |
| data-persistence | persistence/import/export/reporting/project data | restart/readback/data lifecycle proof or blocker | `DATA_LIFECYCLE.md`, capability pack | missing / not-applicable |

## Capability Depth Matrix

Every included capability must be scored before "implemented" can be claimed. `CONTRACT_SEAM_ONLY` may preserve scope, but it is not implementation completion.

| Capability | Required teams | Source evidence | Product obligation | Required topology | Topology status | UI/UX status | API | Domain logic | Persistence/state | Provider/runtime | Failure states | Proof command | Proof artifact | Negative test | Runtime/browser evidence | Depth status | Promotion blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  | test-and-verification | missing | missing | missing | missing | missing / not-applicable | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing |

Depth status values: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.

## Milestones

Milestones are implementation order, not scope definition. Do not remove or hide capabilities because they are not first-slice work.

| Order | Capability | Readiness state | First real vertical slice | First verification gate | Required teams | Status |
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
