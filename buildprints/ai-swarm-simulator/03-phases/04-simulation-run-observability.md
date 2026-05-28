# Phase 04 - Simulation Run And Observability

## How to implement this phase

Before writing code, read: packet file `03-phases/phase-flow.md`, runtime continuity file `.buildprint/next-agent.md`, and current project `AGENTS.md`. Then resolve requires_roles through `06-contracts/<role>.md`, create phase-flow required artifacts, and block runtime evidence until plan, team-gates, handoffs, returns, reviews, and proof exist.

requires_roles: [product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence]

## Product outcome

A user can start a prepared simulation, choose platform and graph-memory update behavior, observe run status, rounds, actions, posts, comments, timeline, agent stats, logs, graph-memory update signals, stop or close the runtime safely, and keep the environment alive for later interview commands when supported.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this product outcome flow owns long-running simulation execution and operator observability.
- Shared proof spine:
  - Preconditions/inputs: Phase 03 simulation is ready with profiles/config.
  - Entrypoint/use site: user starts simulation run from the browser/API.
  - Execution behavior: launch runtime process or sandbox runner, monitor status/actions/logs/DBs, update graph memory when enabled, support stop/close.
  - State/artifact effects: run state, process id, action logs, timeline, platform statuses, posts/comments DBs, env status, IPC command/response files.
  - Observable proof: runtime trace, UI dashboard, API status/action/timeline/posts/comments, stop/close path, restart/readback.
  - Failure/recovery: missing prepared artifacts, runtime launch failure, timeout, provider blocked, process crash, stop failure, env not alive, denied access.
  - Non-goals: report generation and chat answers beyond keeping runtime available for later interaction.

## Mapped product obligations

- Preserve start/stop simulation with platform selection and optional graph-memory update.
- Preserve realtime status, detailed action stream, timeline, agent stats, posts/comments access, env status, close-env, and IPC readiness.
- Preserve graceful close distinct from force stop.
- Missing live OASIS runtime or provider credentials block live proof only after adapter/config/test/runtime wiring exists.

## Behavior compatibility contract

- preserve: start, stop, run status, detailed actions, timeline, posts/comments, env status, close-env, IPC command/response semantics.
- replace: exact OASIS process launcher, DB filenames, log paths, and polling implementation may change when equivalent target behavior and compatibility impact are explicit.
- merge: action feed, timeline, and posts/comments can share one query service if API/browser contracts stay clear.
- defer: report generation and report-agent chat belong to Phase 05.
- drop: unbounded background processes and unredacted raw logs are forbidden.

## Implementation scope

Implement runtime launcher adapter, sandbox/fake runner, live OASIS runner seam, run state store, action log parser, posts/comments repository, timeline/agent stats services, IPC client/server contract for env status/close, simulation dashboard UI, stop/close controls, progress/timeline/action feed, graph-memory update status, and runtime failure recovery.

## Interfaces touched

- API/controller contracts: start, stop, run-status, run-status/detail, actions, timeline, agent-stats, posts, comments, env-status, close-env.
- Provider/tool/runtime contracts: OASIS-compatible runner, process lifecycle, IPC command/response, graph-memory updater.
- UI/controller contracts: simulation run dashboard, controls, action feed, timeline, platform tabs, logs, close/stop confirmation.
- Resolve required roles through `06-contracts/<role>.md`; write handoff and return artifacts before phase_core_passed.

## State/runtime touched

- Durable state: run state, simulation status, platform statuses, action/event records, posts/comments, logs metadata, env status, IPC responses.
- Runtime artifact paths `run_state.json`, `actions.jsonl`, `simulation.log`, platform SQLite databases, `env_status.json`, IPC command/response files are implementation runtime artifacts.
- Runtime state: process handles, monitor thread/worker, queue, retry/cancel/timeout, graph-memory updater.
- Upstream inputs: prepared profiles/config are read-only. Downstream reports are not owned by this phase.

## UX/UI requirements

This phase is UI-bearing. The run dashboard must feel like a simulation control room, not a raw log page. Required states: ready, starting, running, platform partial, graph-memory update enabled, action stream, timeline, posts/comments, stop confirmation, closing env, stopped, completed, failed, env not alive, provider/runtime blocked, mobile/desktop. Screenshot critique must reject raw text-list substitutes for timeline/action feed, default-control shells, local MVP process logs, and unclear destructive controls.

## Safety/security constraints

Starting live runtime, graph-memory updates, stopping processes, and closing env are side-effecting actions and need approval/confirmation as appropriate. Enforce owner/session checks; restrict command/script inputs; prevent arbitrary file path execution; redact logs/evidence; bound process timeouts; clean up runtime handles.

## Quality gates

Required: unit tests for run state, log/action parsing, IPC commands, repository queries; fake runner integration test for start/status/actions/timeline/stop/close; API negative tests; worker_retry_cancel_recovery; persistence/restart readback; browser/e2e for dashboard and stop/close; no_fake_scan_pass.

## Proof gate

Proof id: proof-04-simulation-run-observability

Runtime evidence must use `phase_id: 04-simulation-run-observability` and append only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; packet file `05-evidence/evidence-ledger.jsonl` remains seed-only.

Core tracks: provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, persistence_roundtrip, security_denied_path_test, repeatable_browser_e2e, visual_quality_gate, no_fake_scan_pass.

## Repair routing

If verification fails, route back to the current phase before editing again.

- Current phase: runtime, IPC, status, dashboard, stop/close, persistence, or evidence failures.
- Packet file `02-project-setup.md`: missing runtime/worker/security architecture.
- Packet file `01-questions.md`: destructive runtime permission, live OASIS runtime, or external-write fork.
- Required prior phase: `03-simulation-environment` if prepared profiles/config are missing.
- Runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`: live runtime unavailable, provider credential, or deployment blocker.
