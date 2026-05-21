# Implementation: Simulation Runtime Monitoring

## Agent Brief

- Goal: implement simulation runtime boundary.
- Dependencies: prepared simulation config.
- Stable behavior: long-running worker status and safe stop.
- Implementation freedom: worker technology.
- Forbidden substitutions: fake completion and no-op stop.
- First verification gate: `npm test -- simulation-runtime`.
- Required evidence: runtime status artifact, action log, stop proof.
- Required team packs: all selected teams.
- Stop or escalate when: deployment target cannot run workers.

## First Real Vertical Slice

- User/API entry: `POST /api/simulation/start`, `POST /api/simulation/stop`, status APIs.
- Domain/service behavior: start worker, parse actions, expose rounds/timeline/stats.
- Persistence/state effect: store run state and action log.
- Provider/runtime effect: deterministic worker or OASIS adapter.
- UI/browser proof when applicable: run monitor shows running, stopped, failed, completed.
- Negative/failure path: stop terminates worker and failed start is recoverable.

## Milestones

1. Runtime adapter and run-state repository.
2. Start/stop/status APIs with action log parsing.
3. Run monitor UI with polling and report handoff.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | runtime topology | worker evidence | missing |
| ux-ui-craft | run state screenshots | screenshots | missing |
| test-and-verification | runtime tests | proof rows | missing |
| integration-runtime | worker adapter proof | log artifact | missing |
| security-boundary | stop/destructive safety | negative proof | missing |
| data-persistence | run-state readback | restart proof | missing |

## Stop Conditions

- Stop endpoint does not terminate owned worker.
- UI reports completion without worker/action evidence.
