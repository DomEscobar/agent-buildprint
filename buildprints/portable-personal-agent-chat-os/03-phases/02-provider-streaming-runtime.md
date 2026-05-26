# Phase 02 — Provider Streaming Runtime

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. declare phase objective
2. assemble required roles
3. dispatch bounded subagent tasks or simulate them explicitly if subagents are unavailable
4. collect reviews
5. integrate
6. verify
7. record evidence

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - test-and-verification

## Product outcome

Deliver the evented chat turn engine: provider registry, deterministic test provider, streaming runtime loop, context-builder skeleton, checkpoint persistence, failure events, and normalized usage events.

## Source evidence

- Source path agent/runner.py shows streaming turn lifecycle, checkpoints, tool loop integration, token tracking, and compaction trigger.
- Source paths agent/providers/base.py, registry.py, openai_compat.py, anthropic_provider.py, and bedrock_provider.py show provider families and registry capabilities.
- Source path agent/webui.py shows WebSocket/HTTP streaming boundary.

## Source surface dispositions

- Provider registry and adapter families: preserve with equivalent target behavior. Compatibility impact: live provider behavior is deferred; deterministic test provider is required now.
- Streaming lifecycle events: preserve event semantics including `turn.started`, `model.delta`, telemetry, `turn.completed`, and `turn.failed`.
- Context builder ordering: merge skeleton here, complete memory/skills/team context in later phases. Compatibility impact: this phase may use empty skill/team inputs.
- Checkpoint persistence: preserve; checkpoint must be inspectable after failure. Compatibility impact: exact source checkpoint format may be replaced.

## Implementation scope

Implement a runnable local chat turn using persisted session state and deterministic provider chunks. The loop must emit deltas before completion, persist user/final assistant messages, persist trace events, normalize token usage, and produce actionable failure events for unknown provider or provider error.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: internal chat-turn service and optional local stream endpoint if the chosen stack exposes one now.
- Provider/tool contracts: provider adapter interface, deterministic provider script, usage normalization.
- None — reason: tools/MCP execution is added in the next phase.

## State/runtime touched

- Database/persistence: session messages, trace events, checkpoints, provider choice, telemetry rows.
- Env/config: provider IDs, model IDs, context windows, generation defaults, capability flags, env var names only.
- Jobs/workers/runtime: streaming loop, cancellation boundary if supported.
- Runtime artifacts/generated outputs: runtime artifact stream trace and proof transcript.

## UX/UI requirements

No full UI required yet. Runtime events must be shaped so a UI can show empty chat, streaming/loading, provider blocked/error, and success states without parsing logs.

## Safety/security constraints

No live network calls by default. Unknown provider must fail with actionable diagnostics, not fallback silently. Live provider smoke tests require explicit env vars and cannot upgrade deterministic proof unless they actually run.

## Quality gates

- Static/typecheck gate.
- Unit tests for provider registry and unknown provider diagnostics.
- Integration test for deterministic stream order: `turn.started`, `model.delta` before completion, telemetry, final event.
- Persistence test for checkpoint or failure trace readback.

## Proof gate

Proof id: proof-provider-streaming-runtime
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: provider-streaming-runtime` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
