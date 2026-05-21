# Simulation Runtime Monitoring

Status: `INCLUDED`

## Agent Brief

Goal: run and monitor a long-lived social simulation with safe stop/close behavior.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: `03-simulation-setup`
Stable behavior: start, stop, run status, action timeline, platform status, persisted logs.
Implementation freedom: local worker, subprocess, queue, or hosted job system.
Forbidden substitutions: instant fake completion, no-op stop, static action feed.
First implementation slice: deterministic worker emits rounds/actions and stop terminates it safely.
First verification gate: `npm test -- simulation-runtime`
Required evidence: runtime log, stop negative test, browser run monitor screenshots.
No-fake checks: actions come from worker artifact; status survives refresh.
Stop or escalate when: worker hosting model is unknown.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Behavior Contract

- User/system action: user starts/stops simulation and monitors progress.
- Accepted inputs: simulation id, platform, max rounds, graph memory update option.
- Observable outputs: running/completed/failed status, rounds, recent actions, posts/comments/timeline/stats.
- Important state: process/job id, run state, action logs, stdout/stderr, platform completion.
- Failure/empty/loading/blocked states: no config, worker start failure, stop timeout, partial platform failure.
- Provider/persistence/runtime/operational boundary: OASIS-compatible runtime adapter and action log parser.

## Source Evidence

- OBSERVED: `backend/app/api/simulation.py:1451` starts simulation.
- OBSERVED: `backend/app/api/simulation.py:1644` stops simulation.
- OBSERVED: `backend/app/services/simulation_runner.py` manages subprocesses, run states, actions, and cleanup.
- OBSERVED: `frontend/src/components/Step3Simulation.vue` controls run/report flow.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
