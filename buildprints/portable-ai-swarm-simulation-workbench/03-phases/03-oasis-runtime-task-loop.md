# Phase 03: OASIS Runtime Task Loop

## How to implement this phase

phase_id: 03-oasis-runtime-task-loop

Before writing code, read:

- Packet file `03-phases/phase-flow.md`
- Runtime artifact `.buildprint/next-agent.md` if it exists
- `AGENTS.md` in the implementation project
- Packet file `02-project-setup.md`
- Packet file `01-questions.md`
- Resolve requires_roles through `06-contracts/<role>.md`
- Packet file `06-contracts/product-architect.md`
- Packet file `06-contracts/ux-ui-craft.md`
- Packet file `06-contracts/integration-runtime.md`
- Packet file `06-contracts/security-boundary.md`
- Packet file `06-contracts/data-persistence.md`
- Packet file `06-contracts/test-and-verification.md`

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification]

Follow phase-flow required artifacts before code and before evidence. Packet seed evidence remains in packet file `05-evidence/evidence-ledger.jsonl`; runtime evidence belongs only in `.buildprint/evidence/evidence-ledger.jsonl`.

A handoff and return artifact is required for every role in requires_roles before phase_core_passed.

## Phase mode contract

blueprint_mode: automation
phase_style: task_loop_contract

This phase is an automation task loop. It must plan-execute-observe OASIS runtime starts, enforce stop condition handling, require approval for force cleanup/restart, and record trace proof for subprocess state, max_rounds, action monitoring, and graph memory behavior.

## Capability outcome

Start and monitor OASIS-backed Twitter, Reddit, or parallel simulation runtime from prepared artifacts. Show running/completed/error state in the workbench and emit action traces that downstream observability, report, and interaction phases can read.

## Mapped capability obligations

- Preserve OASIS runtime start for Twitter, Reddit, and parallel scripts with max_rounds, force, graph memory option, and subprocess state.
- Preserve runtime monitoring of per-platform action JSONL, completion events, round counters, action counters, and dynamic Zep memory updates.
- Preserve simulation monitor UI controls for start, running, completed, force restart, graph memory update, polling, action preview, and report transition.
- Preserve approval and safe cleanup semantics before force restart, with trace evidence.

## Behavior compatibility contract

Target disposition: preserve/replace. Equivalent target behavior is required, not route/function parity. The OASIS script implementation may be wrapped or replaced only if runtime commands, task loop state, platform selection, max_rounds, action-log observation, stop conditions, and graph memory adapter calls remain compatible with the selected product.

Compatibility impact:

- A fake runtime may prove local automation trace shape, but it cannot replace OASIS as production runtime.
- Force restart must not silently delete runtime artifacts; approval and trace are required.
- Missing live OASIS/Zep credentials block live proof only after provider_adapter_config_test_required, command construction, runtime state, fake trace, and adapter/config/test/runtime wiring exists.

## Implementation scope

Implement runtime command builder, subprocess runner, task state, status/detail APIs, polling monitor, action JSONL parser, completion detector, graph memory update adapter, force approval guard, and monitor UI states. Include deterministic runtime fixtures only as test infrastructure.

## Interfaces touched

- API/controller endpoints for runtime start, status, detail, action preview, force restart request, graph memory toggle.
- Runtime worker for command assembly, subprocess lifecycle, stop condition checks, trace collection, action-log reads, completion updates, and Zep memory calls.
- Persistence for runtime state, action logs, counters, process metadata, and errors.
- Browser simulation monitor with start controls, status, timeline preview, graph memory state, force confirmation, and report transition.

## State/runtime touched

Own running process metadata, task loop trace, platform flags, max_rounds, force approval state, action counters, round counters, completion state, graph memory update state, and runtime errors. State must support recovery/readback rather than in-memory-only claims.

## UX/UI requirements

This phase is UI-bearing. The simulation monitor must show idle, starting, running, completed, failed, stopped, force-confirmation, missing runtime, and graph-memory-blocked states. UI proof needs repeatable_browser_e2e, visual_quality_gate, Screenshot critique, responsive behavior, and no generic dashboard or raw log dump as the primary simulation surface.

## Safety/security constraints

Validate runtime paths and command arguments. Do not expose provider keys or raw private prompts in logs/evidence. Force restart, cleanup, and external provider writes require explicit approval or blocked state. Subprocess failures need redacted error mapping and no orphan process leakage.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- automation_trace_proof for task loop, stop condition, approval, and trace
- max_rounds_command_assertion
- action_jsonl_monitor_fixture
- graph_memory_adapter_call_or_blocker

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: oasis_runtime_trace_stop_force_memory_proof.

Required proof includes runtime start trace, command/max_rounds assertion, force approval path, process state readback, stop condition behavior, action JSONL monitoring, graph memory adapter calls or blocker, browser monitor path, no_fake scan, and evidence row with phase_id: 03-oasis-runtime-task-loop.

## Repair routing

Repair the current phase for task loop, subprocess, command, monitor, graph memory, UI, or persistence failures. Route missing prepared artifacts to Phase 02. Route architecture contradictions to packet file `02-project-setup.md`. Route credential/product forks to packet file `01-questions.md`. Record live-provider or live-OASIS blockers only in `.buildprint/evidence/evidence-ledger.jsonl`.
