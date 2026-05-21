# Implementation: History And Data Lifecycle

## Agent Brief

- Goal: implement durable lifecycle and history.
- Dependencies: all product artifacts.
- Stable behavior: restart/readback and safe destructive actions.
- Implementation freedom: persistence backend.
- Forbidden substitutions: memory-only persistence and unconfirmed delete.
- First verification gate: `npm test -- data-lifecycle`.
- Required evidence: restart/readback and delete proof.
- Required team packs: all selected teams.
- Stop or escalate when: retention/export policy is missing.

## First Real Vertical Slice

- User/API entry: history list, resume links, delete/reset/download APIs.
- Domain/service behavior: query records, derive current state, delete owned artifacts.
- Persistence/state effect: projects/simulations/reports/logs survive restart and delete cleanly.
- Provider/runtime effect: cleanup provider graph/runtime where configured or record blocker.
- UI/browser proof when applicable: empty/populated/history/delete confirmation screenshots.
- Negative/failure path: delete without confirmation/ownership is rejected.

## Milestones

1. Repository schema and lifecycle service.
2. History/resume/delete APIs with confirmation.
3. History UI and restart/readback proof.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | lifecycle topology | lifecycle evidence | missing |
| ux-ui-craft | history/destructive screenshots | screenshots | missing |
| test-and-verification | lifecycle tests | proof rows | missing |
| integration-runtime | cleanup hook proof | blocker or evidence | missing |
| security-boundary | destructive negative proof | evidence | missing |
| data-persistence | restart/readback proof | evidence | missing |

## Stop Conditions

- Delete leaves local artifacts without recorded blocker.
- History shows stale records after restart.
