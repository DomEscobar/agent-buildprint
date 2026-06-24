# 01 - Integration Plan

Write `.buildprint/capability-plan.md`, `.buildprint/agentic-chat-eval-plan.md`, and `.buildprint/agentic-chat-eval-safety-plan.md` before source edits.

## Capability plan

The plan must name:

- host chat runtime entrypoint
- test runner and regression command
- scenario directory and schema format
- trace/span export format
- receipt output path
- enabled profiles
- disabled/not-proven profiles
- provider/model usage
- observability backend or local-only trace policy
- CI integration path

## Eval harness plan

The harness plan must define:

- `Scenario` fields
- `TraceSpan` fields
- `EvalRun` fields
- `ScoreResult` fields
- `Receipt` fields
- core runner command
- simulated user or recorded-turn strategy
- deterministic scorer registry
- model-judge scorer policy
- fixture versioning strategy
- artifact retention strategy

## Safety plan

The safety plan must define:

- safe tool/action mode
- blocked/destructive tool list
- mock/sandbox strategy
- external provider privacy policy
- private transcript handling
- private RAG evidence handling
- cost/latency ceilings
- flake handling and retry policy
- claim ceiling when proof is unavailable

## Profile plan

For each enabled profile, define at least one scenario:

- `core-chat`: multi-turn task or blocked-state flow
- `tool-actions`: tool selection plus side-effect proof
- `memory-state`: memory/state write or no-write proof
- `provider-routing`: fallback/retry/degraded-mode proof
- `ui-proof`: streaming/action/error/blocked proof
- `rag`: allow/deny/citation/weak-evidence proof

Profiles can be marked `not-proven` when the host lacks the surface. Do not silently skip requested profiles.

## Assessment Reconciliation

The plan must reconcile with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking.

## Scope control

Keep the first implementation small but real:

- one runner command
- one trace schema
- one receipt schema
- one core-chat scenario
- one tool-action scenario when tools exist
- one blocked/error scenario
- optional RAG/UI profiles only when proof surfaces exist

Do not build a dashboard, hosted benchmark service, or new agent runtime until the core proof passes.
