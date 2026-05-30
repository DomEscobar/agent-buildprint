# Phase 03 - Dual Platform Runtime

## Operation outcome

Deliver dual_platform_simulation_runtime and graph_memory_update. A prepared simulation can start, run, stream actions, update run status, stop safely, close the environment, and preserve enough trace data for report generation and later interaction.

## Phase mode contract

blueprint_mode: automation
phase_style: task_loop_contract
Glance surfaces delivered: dual_platform_simulation_runtime, provider_persistence_operability

This phase uses an automation lens because it owns a task loop with plan-execute-observe behavior. It must define stop condition, approval point, trace, runtime recovery, and safe cancellation.

## Mapped source notes

- Step 3 starts/stops simulation, polls run status/detail, displays actions, and generates report: frontend/src/components/Step3Simulation.vue:293-669.
- Simulation start/stop/status/detail/action/timeline/post/comment/interview/env routes: backend/app/api/simulation.py:1451-2712.
- Runtime process, subprocess, run_state.json, action logs, stop, cleanup, env status, IPC, and close-env: backend/app/services/simulation_runner.py:208-489 and 721-1632.
- Graph memory updater batches simulation actions into Zep: backend/app/services/zep_graph_memory_updater.py:232-549.

## Implementation scope

- Start simulation through a durable worker/runtime controller, not a request-thread-only action.
- Runtime task loop: plan inputs, execute platform processes/adapters, observe status/actions/logs, update state, and expose stop/close controls.
- Preserve dual-platform status even if one platform is disabled, failed, completed, or blocked.
- Write action streams with platform, actor, action type, round/time, payload summary, and correlation ids.
- Implement graph memory update queue with retry, idempotency, provider failure mapping, and backpressure.
- UI must display per-platform current round, action counts, running/completed/failed states, timeline cards, empty waiting state, stop control, and close-env state.
- Approval point: destructive stop/close actions require explicit user intent and audit record.

## Interfaces touched

- API: start, stop, run-status, run-status/detail, actions, timeline, posts, comments, agent-stats, env-status, close-env.
- State: run_state, action streams, platform logs, process handles or worker records, graph memory update queue, audit events.

## Proof gate

- worker_retry_cancel_recovery: start, observe, stop, retry failure, and close-env paths are tested without orphaning processes.
- repeatable_browser_e2e: browser shows running state, action timeline, stop control, completed state, and blocked provider state.
- live_provider_proof_blocker_only: live OASIS/LLM/Zep execution is required to upgrade runtime claims; fake-provider proof cannot qualify it.
- security_boundary_review: stop/close/delete controls are idempotent, audited, and role-gated where public.
- clean_room_implementation_trace: proof records that behavior was built from this Buildprint, not copied source internals.

## Repair routing

If subprocess/runtime execution is unsafe locally, implement the real worker interface and deterministic lifecycle tests, then record the runtime proof blocker. Do not replace the simulation with static timeline fixtures.

## Unlock condition

Unlock Phase 04 only after the run-status/action/log contracts exist and either runtime proof passes or the live runtime blocker is recorded.
