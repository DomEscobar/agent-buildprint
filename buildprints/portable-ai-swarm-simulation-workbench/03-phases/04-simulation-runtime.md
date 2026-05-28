# Phase 04 - OASIS Runtime and Action Memory

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: create the phase-flow required artifacts, resolve every role through `06-contracts/<role>.md`, write handoff and return artifacts for every role, implement, verify, review, write proof, and only then append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`. The packet seed ledger `05-evidence/evidence-ledger.jsonl` is read-only context.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

A user can start, monitor, stop, and close a prepared Twitter/Reddit/parallel OASIS simulation, inspect durable run state, action timelines, posts, comments, and optional graph-memory updates, then return to later report and interaction phases with trustworthy runtime history.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: subprocess/runtime boundary, durable state, parser/data API, optional provider writeback, and UI runtime control.
- Shared proof spine: prepared simulation -> runtime start -> progress/log parsing -> persisted run state/actions/posts/comments -> stop/close -> UI/API readback.

## Mapped product obligations

- Own `runtime.oasis-start`: Twitter/Reddit/parallel subprocess, max rounds, logs, optional memory update.
- Own `runtime.oasis-stop-close`: process-tree stop and graceful IPC close with status.
- Own `data.run-state-progress`: current rounds, platform state, counts, failure/completion, recent actions.
- Own `data.action-logs`: parse actions, timeline, per-round and per-agent stats.
- Own `data.posts-comments`: read OASIS platform DB posts/comments with filters.
- Own `provider.graph-memory-update`: optional action-to-Zep memory queue/batch/retry.
- Own `ui.simulation-run`: Step 3 runtime UI for start/progress/stop/back/refresh.

## Behavior compatibility contract

- Target disposition values are preserve for runtime start/stop/close, run state, actions, posts/comments, optional memory update, and UI.
- Equivalent target behavior preserves OASIS execution and observability without route/function parity.
- Compatibility impact: live OASIS execution can be blocked only after subprocess contracts, command construction, status, logs, and local tests exist.


## Source-derived runtime compatibility details

Preserve these source-derived runtime behaviors unless a later architecture decision explicitly replaces them with an equivalent, safer contract:

- Start request supports:
  - `simulation_id` required
  - `platform`: `twitter | reddit | parallel`
  - `max_rounds`: optional positive integer
  - `enable_graph_memory_update`: optional boolean
  - `force`: optional restart flag
- `max_rounds` must be validated and, when lower than configured total rounds, truncate runtime execution rather than mutate the saved simulation config.
- `force` restart must:
  - detect whether a run is truly active
  - stop the active process when needed
  - clean runtime logs/state such as run state, action logs, and simulation log
  - preserve prepared config/profile artifacts
- Platform selection must map to distinct runner modes:
  - Twitter-only
  - Reddit-only
  - parallel Twitter + Reddit
- Runtime logs/artifacts must preserve equivalent semantics to:
  - `simulation.log`
  - `twitter/actions.jsonl`
  - `reddit/actions.jsonl`
  - platform simulation DBs for posts/comments
- Stop must terminate the process tree/process group, not only mark state as stopped.
- Close-env must be modeled separately from stop: it is an IPC/environment lifecycle action and must report status/timeouts.
- Missing posts/comments DBs are valid empty runtime states, not hard failures.
- Graph memory update requires a valid graph id. If enabled without one, fail before starting runtime.
- Live OASIS execution may be blocked, but command construction, process lifecycle, log parsing, state persistence, and failure handling must still be implemented and tested.

## Implementation scope

- Implement runtime start API/controller behavior for:
  - required `simulation_id`
  - platform validation: `twitter | reddit | parallel`
  - positive integer `max_rounds`
  - `enable_graph_memory_update`
  - `force` restart
- Implement runner command construction without shell interpolation:
  - Twitter mode uses the Twitter runner contract
  - Reddit mode uses the Reddit runner contract
  - parallel mode starts the parallel runner contract
  - all commands receive the prepared simulation config path
  - `max_rounds` is passed as a bounded runtime argument when present
- Implement force restart semantics:
  - detect active run
  - stop/cleanup active process
  - clean runtime-only artifacts/logs
  - preserve prepared config and profile artifacts
  - return whether force restart occurred
- Persist durable run state:
  - status: starting/running/stopping/stopped/completed/failed
  - platform running flags
  - process/runtime handle
  - started/completed timestamps
  - total/current rounds
  - counts and recent actions
  - error/failure state
- Implement process lifecycle:
  - start process with isolated working directory
  - redirect stdout/stderr into runtime log artifact
  - monitor action logs while running
  - terminate full process tree/process group on stop
  - handle timeout and forced kill
  - close file handles/resources
- Implement close-env as an IPC/environment lifecycle operation separate from process stop.
- Parse runtime artifacts:
  - platform action JSONL logs
  - per-platform action timelines
  - per-round/per-agent statistics
  - posts from platform DBs
  - comments from Reddit DB
- Missing platform DBs must return empty posts/comments with an explanatory empty state.
- Queue optional graph-memory updates:
  - require graph id before enabling
  - batch meaningful actions
  - retry/fail safely
  - record live Zep blocker without removing implementation scope
- Build runtime UI:
  - start controls
  - force restart affordance
  - max rounds input/validation
  - graph-memory toggle with graph-id blocked state
  - platform progress
  - current/total rounds
  - action timeline filters
  - posts/comments tabs
  - stop and close-env controls
  - back navigation that respects running-state safety
  - missing DB empty states
  - blocked OASIS/Zep states

## Interfaces touched

- Runtime API/controllers, subprocess runner, IPC client, log parsers, platform DB readers, graph-memory updater, run-state repository, runtime UI, owner/session guard.

## State/runtime touched

- Durable simulation run state, action logs, timeline stats, posts/comments read models, process metadata, IPC status, graph-memory update queue. Missing OASIS/Zep runtime blocks live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must provide start/stop/close controls, platform and round progress, action timeline filters, posts/comments views, blocked-runtime state, error recovery, responsive layout, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Runtime commands must use explicit allowlisted runner modes; never build shell strings from user input.
- `platform`, `max_rounds`, `simulation_id`, and file paths must be validated before process start.
- Runtime working directories must be confined to the owning simulation/project scope.
- Stop/close/delete/force-restart actions require owner/session checks and safe confirmation or disabled states.
- Process termination must target only the owned runtime process group/tree.
- Logs must redact secrets and avoid exposing provider credentials, env values, or raw filesystem internals.
- Graph-memory update must fail closed when graph id or Zep config is missing.
- Public/local source posture does not authorize production exposure; denied-path tests are required before production readiness.

## Quality gates

- Runtime API tests:
  - missing `simulation_id`
  - invalid platform
  - invalid/negative/non-numeric `max_rounds`
  - start when not prepared
  - start when already running with and without `force`
  - graph-memory enabled without graph id
- Subprocess contract tests:
  - Twitter command construction
  - Reddit command construction
  - parallel command construction
  - config path passed correctly
  - max rounds passed only when valid
  - no shell interpolation
- Force restart tests:
  - active process stopped
  - runtime-only logs/state cleaned
  - prepared config/profile artifacts preserved
  - response records `force_restarted`
- Lifecycle tests:
  - start -> running state
  - monitor -> progress update
  - stop -> process tree cleanup
  - close-env -> IPC status/timeout handling
  - failure -> failed state with error
- Parser/data tests:
  - `twitter/actions.jsonl`
  - `reddit/actions.jsonl`
  - malformed JSONL line handling
  - timeline filters
  - per-agent/per-round stats
  - missing posts DB returns empty state
  - missing comments DB returns empty state
- Persistence tests:
  - restart/readback of run state
  - progress survives service restart where target architecture supports it
  - completed/failed/stopped states are durable
- Graph-memory tests:
  - queue/batch/retry behavior
  - meaningful-action filtering
  - live Zep proof blocker when credentials/runtime unavailable
- Browser e2e:
  - start with platform + max rounds
  - progress counts update
  - timeline renders actions
  - posts/comments empty and populated states
  - stop/close controls
  - blocked OASIS state
  - graph-memory blocked state
  - responsive screenshot critique

## Proof gate

Proof id: proof-04-simulation-runtime

This phase passes only when evidence proves the owned surfaces individually:

- `runtime.oasis-start`
  - API validation tests pass
  - command construction tests pass for Twitter, Reddit, and parallel
  - max-round truncation behavior is proven
  - force restart behavior is proven
- `runtime.oasis-stop-close`
  - stop terminates the owned process tree/group
  - close-env IPC success/timeout/failure paths are tested
- `data.run-state-progress`
  - run state persists status, timestamps, rounds, counts, errors, and recent actions
  - restart/readback proof exists
- `data.action-logs`
  - Twitter and Reddit JSONL parsers are tested
  - malformed/empty logs do not crash the runtime surface
- `data.posts-comments`
  - posts/comments DB readers are tested
  - missing DB returns empty state rather than unhandled failure
- `provider.graph-memory-update`
  - graph id is required before enablement
  - queue/batch/retry is tested
  - live Zep proof blocker is recorded without removing adapter implementation
- `ui.simulation-run`
  - browser e2e covers start, progress, timeline, posts/comments, stop, close/back, blocked states, and visual quality

Required evidence labels:

- phase_id: 04-simulation-runtime
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- runtime_subprocess_contract
- persistence_roundtrip
- security_denied_path_test
- no_fake_scan_pass

## Repair routing

- current phase: failed OASIS runner, stop/close, run-state persistence, parsers, graph-memory update, runtime UI, or proof.
- `02-project-setup.md`: runtime/process/security contradiction.
- `01-questions.md`: external runtime/deployment/destructive fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading OASIS/Zep/browser/deployment blockers.
