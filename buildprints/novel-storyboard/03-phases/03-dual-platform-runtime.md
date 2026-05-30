# Phase 03 - Dual Platform Runtime

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Write `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml` with lead decision, user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
2. Declare the phase objective in `.buildprint/phase-runs/PHASE_ID/plan.md`.
3. Confirm the implementation scaffold and local guidance files required by `02-project-setup.md` exist.
4. Implement the first real vertical path.
5. Verify with commands and browser/runtime artifacts.
6. Write `.buildprint/phase-runs/PHASE_ID/proof.md` and `.buildprint/phase-runs/PHASE_ID/evidence.json`.
7. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Capability outcome

This phase delivers dual_platform_simulation_runtime for the MiroFish canvas simulation workbench without claiming live-provider, deployment, security, worker, visual, or lifecycle qualification beyond direct matching proof.

## Phase mode contract

```yaml
phase_contract:
  phase_id: 03-dual-platform-runtime
  blueprint_mode: automation
  phase_style: task_loop_contract
  glance_surfaces:
    - dual_platform_simulation_runtime
  owned_surface_ids:
    - surface-dual-platform-simulation-runtime
  core_pass_required:
    - criterion-automation-trace
    - criterion-worker-retry-cancel-recovery
    - criterion-runtime-api
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-deployment-operations-proof
    - criterion-visual-quality-gate
```

- blueprint_mode: automation
- phase_style: task_loop_contract
- Glance surfaces delivered: dual_platform_simulation_runtime.
- Shared proof spine: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped obligations

- Preserve the mapped MiroFish behavior for dual_platform_simulation_runtime.
- Implement source-independent target behavior; do not require opening the original source repo during implementation.
- Keep deterministic/fake provider proof separate from live provider claim upgrades.

## Stable vs free

Stable: user-visible workflow, provider boundaries, persistence/readback, runtime status, failure states, and evidence ceilings.
Free: exact framework, component names, storage engine, queue implementation, and visual style if the product-grade graph/simulation/report experience is preserved.

## Implementation scope

Implement the smallest real vertical path for this phase. Avoid standalone demos, generic dashboards, raw JSON substitutes, in-memory-only production claims, no-op controls, and route-shaped handlers without service/storage/runtime behavior.

## Interfaces touched

- UI/controller/API boundary for phase-owned surfaces.
- Provider adapter boundary where this phase touches LLM, graph memory, report, or runtime behavior.
- Test/e2e/no-fake verifier boundary.

## State/runtime touched

- Durable project/workflow state and runtime artifacts owned by this phase.
- `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml`, `plan.md`, `proof.md`, and `evidence.json` as runtime proof artifacts.
- `.buildprint/evidence/evidence-ledger.jsonl` for narrow evidence/blocker rows.

## UX / DX / operator requirements

UI-bearing phases must look like a product-grade graph/simulation/report workbench. Non-UI proof must use mode-equivalent API, dataflow, automation, provider, or operations proof. Screenshots alone do not upgrade claims without browser action traces and visual critique.

## Safety constraints

Protect uploads, generated artifacts, provider secrets, destructive actions, chat/report data, and runtime process controls. Missing credentials or deployment authorization may block claim upgrades but must not remove adapters, config contracts, tests, or fail-closed states from scope.

## Quality gates

- Unit/integration tests for phase-owned behavior.
- `verify:no-fake`.
- `verify:phase-artifacts` with `PHASE_ID=03-dual-platform-runtime`.
- Browser/runtime/API/provider/dataflow/automation proof matching this phase mode.

## Proof gate

`phase_core_passed` requires the phase-owned local vertical path to run with command output or artifact paths saved under `.buildprint/phase-runs/PHASE_ID/`. Evidence rows must include `phase_id`, `proof_type`, `provider_mode`, `claim_type`, and `upgrades_claim` with narrow `proves` values.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase
- external/live-provider/deployment blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

## Source-specific contract notes

## Operation outcome

Deliver dual_platform_simulation_runtime and graph_memory_update. A prepared simulation can start, run, stream actions, update run status, stop safely, close the environment, and preserve enough trace data for report generation and later interaction.

## Phase mode contract

blueprint_mode: automation
phase_style: task_loop_contract
Glance surfaces delivered: dual_platform_simulation_runtime, provider_persistence_operability

This phase uses an automation lens because it owns a task loop with plan-execute-observe behavior. It must define stop condition, approval point, trace, runtime recovery, and safe cancellation.

## Mapped capability obligations

- Establish process or job control for starting, stopping, and polling simulation runs.
- Stream runtime actions and event logs through a durable task loop with robust cancellation.
- Batch and apply simulation action streams into a graph memory updater queue.
- Require user confirmation and audits before destructive simulation stop or close actions.

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
