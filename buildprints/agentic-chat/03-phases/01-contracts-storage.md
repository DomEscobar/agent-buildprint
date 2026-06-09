# Phase 01 — Contracts And Storage

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`,

1. declare phase objective
2. write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` with required roles
3. create handoff/return files only for real delegation
4. collect reviews
5. integrate
6. verify
7. record evidence

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - data-persistence
  - integration-runtime
  - test-and-verification

## Product outcome

Create the implementation foundation for Agentic Chat: core domain contracts, config model, durable local stores for sessions/messages/checkpoints/memory/traces/telemetry, and a bootstrap service that can expose current runtime state without live providers or network.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: this phase proves the user/operator outcome of starting a real local workbench runtime foundation, not merely defining schemas.
- Shared proof spine: preconditions are selected stack and Foundation scaffold complete; entrypoint is bootstrap/config service plus repositories; execution behavior creates/reads durable records; state/artifact effects include local DB/files, migrations, and bootstrap response; observable proof is repository/config/bootstrap tests; failure/recovery covers invalid config, missing provider credentials, and restart readback; non-goals are live provider calls, tool execution, and UI rendering.

## Mapped product obligations

- Source path agent/runner.py implies sessions, checkpoints, stream traces, token tracking, and compaction triggers.
- Source path agent/webui.py implies bootstrap/config/memory/tokens/model routes.
- Source path agent/memory.py and compactor signals imply raw history, daily episodes, long-term memory, checkpoints, and attachment summaries.
- Source path agent/telemetry.py implies normalized usage counters persisted or queryable for UI.

## Behavior compatibility contract

- Streaming session and checkpoint state: preserve through equivalent target behavior in `AgentSession`, message store, trace store, and checkpoint store. Compatibility impact: storage shape may differ; session recovery behavior must remain.
- Provider/tool/skill/MCP config records: preserve through typed config contracts. Compatibility impact: exact source config file formats may be replaced by a cleaner target format.
- Memory tiers and attachment/source summaries: preserve. Compatibility impact: route/function parity is not required; durable behavior and context-builder inputs are required.
- Token usage model: merge into shared telemetry contract. Compatibility impact: deterministic values do not prove live provider accounting.

## Implementation scope

Implement the smallest real foundation that later phases can build on: domain types, persistence repositories, config loading/validation, bootstrap state, and test fixtures. If the chosen stack cannot persist locally yet, record the temporary store as a blocker and do not claim durable persistence.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: bootstrap state and repository/service boundaries.
- Provider/tool contracts: typed placeholders for provider config, tool specs, skill specs, MCP server specs, and runtime events.
- None — reason: no live external provider call is required in this phase.

## State/runtime touched

- Database/persistence: sessions, messages, checkpoints, traces, memory tiers, token aggregates, enabled config.
- Env/config: provider env var names only; no secrets stored.
- Jobs/workers/runtime: none beyond local service initialization.
- Runtime artifacts/generated outputs: runtime artifact local persistence files or migrations; runtime artifact bootstrap response captures.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


No full UI implementation yet. Downstream UI obligations: bootstrap must expose enough state for chat/model/tools/skills/MCP/memory/team/tokens/config views to render empty, blocked, and ready states.

## Safety/security constraints

Secrets must be represented by env var name or secret handle only. Local storage must not contain provider keys. Billing, publishing, browser, shell, network, and media/retrieval integrations are non-claims. Persistence proof must not use private user data.

## Quality gates

- Typecheck or equivalent static validation.
- Unit tests for core contracts and repository roundtrip.
- Bootstrap service test proving config, empty memory/checkpoint state, and telemetry defaults load.
- Security scan or manual assertion that no secrets are committed.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-01-contracts-storage
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tools, MCP, memory, team, telemetry, security, and WebUI/API paths.

Required runtime evidence row must use `phase_id: 01-contracts-storage` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
