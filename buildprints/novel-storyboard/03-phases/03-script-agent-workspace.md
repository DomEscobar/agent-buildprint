# Phase 03 — Script Agent Workspace

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/03-script-agent-workspace/plan.md` and proof exist.

## Capability outcome

A creator can ask the script agent to plan, adapt, and draft an episode from prepared source writing while seeing streamed progress, supervision feedback, memory context, stop/cancel controls, and blocked-provider explanations. Failed, cancelled, retried, and completed runs remain traceable.

## Phase mode contract

blueprint_mode: automation

phase_style: task_loop_contract

Glance surfaces delivered: Script agent workspace

This phase is an automation task loop: it must define task objective, plan/execute/observe behavior, stop condition, approval point, trace artifacts, memory use, and escalation when provider proof is blocked.

## Mapped capability obligations

- ScriptAgent decision/execution/supervision layers for skeleton, adaptation strategy, and script generation.
- Websocket or streaming runtime, persisted messages/summaries, per-project/episode isolation, stop/cancel, and think/config controls.

## Behavior compatibility contract

Preserve the observable agent collaboration model, not source internals. The target must keep separate planning/drafting/supervision steps, memory continuity, streamed responses, and safe cancellation.

## Implementation scope

- Agent run model with queued/running/observing/supervising/complete/failed/cancelled states.
- Streaming UI with message timeline, trace drawer, memory panel, retry/cancel, and approval before overwriting script content.
- Memory repository for messages/summaries with isolation by project, episode, and agent type.
- Deterministic provider test double and blocked live-provider state.

## Interfaces touched

Agent workspace UI, streaming/socket or SSE API, task-loop service, provider adapter interface, memory repository, script update service, trace/audit logs.

## State/runtime touched

Owns script-agent runs, messages, summaries, trace events, cancellation tokens, and script draft artifacts. Reads source/project/script records from Phase 02. Does not own production canvas or media artifacts.

## UX/UI requirements

Streaming must be readable and controllable: progress indicators, current step labels, trace detail, memory chips, stop control, retry, approval prompts, and clear blocked-provider cards.

## Safety/security constraints

No prompt or source text leakage in logs/evidence. Approval required before destructive overwrite. Stop condition must terminate runtime work deterministically. Memory isolation tests are mandatory.

## Quality gates

- automation_trace_proof for a full fake-provider plan/execute/observe loop.
- Memory add/retrieve/clear tests with isolation.
- Stop/cancel integration test.
- Browser trace for streaming, approval, blocked provider, and saved draft.
- `verify:no-fake` and `PHASE_ID=03-script-agent-workspace verify:phase-artifacts`.

## Proof gate

Required labels: `automation_trace_proof`, `worker_retry_cancel_recovery`, `provider_adapter_config_test_required`, `live_provider_proof_blocker_only`, `durable_persistence`.

Proof must include trace output showing task loop steps, stop condition behavior, approval point, persisted memory, and script draft readback. Missing live model credentials block only provider_live.

## Repair routing

Agent runtime, trace, memory, provider seam, cancellation, or browser failures route to this phase. Missing source/project setup routes to Phase 02.

