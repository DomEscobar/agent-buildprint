# Phase 01 - Provider Chat Runtime

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

Fast replay constraint: do not spend the first pass building a full HTTP server, package-install stack, Docker shape, or polished frontend. First implement the smallest dependency-free provider/persistence/chat path plus a minimal interactive chat UI surface, run provider/persistence/UI-state proof commands, write architecture/UX/QA review artifacts, and append the first valid `.buildprint/evidence/evidence-ledger.jsonl` checkpoint. Optional HTTP serving, browser automation, live Ollama proof, and polish happen only after that checkpoint exists.

The first checkpoint is not phase completion. After `checkpoint_recorded`, finish the phase core path: message input -> send action/controller -> provider seam -> persisted assistant response -> visible success/readback state. Static state cards, dead buttons, or a browser blocker without local interaction proof do not satisfy `phase_core_passed`.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

User can create or open a conversation, configure an Ollama-compatible model, send a chat message, receive streamed assistant output, and read the persisted conversation back after restart.

## Mapped product obligations

Source surface IDs: SRC-RAG-001, SRC-RAG-002.

Product obligations: local-first chat, no cloud key required by default, streaming responses, configurable models, and persisted conversations.

Mapped product obligation refs:
- https://github.com/Maxkrvo/OllamaChat README describes self-hosted Ollama chat, streaming responses, configurable models, persistent history, and SQLite setup.
- https://github.com/Maxkrvo/OllamaChat README architecture lists chat pipeline, model router, Ollama wrapper, config, and database modules.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Surface id: SRC-RAG-001 provider/chat runtime.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: user message flows through configured provider adapter into streamed assistant output and persistence.
  - Compatibility impact: API names may differ; this is not route/function parity.
- Surface id: SRC-RAG-002 model settings.
  - Disposition: preserve capability.
  - Equivalent target behavior: model/provider config controls default, code, and embedding model choices.
  - Compatibility impact: settings UI may differ if behavior and proof pass.

## Implementation scope

1. Implement the smallest real streaming chat path.
2. Implement provider adapter/config/test seams for Ollama-compatible runtime and deterministic no-network test double.
3. Persist conversation, messages, provider mode, model selection, and errors.
4. Implement a minimal interactive chat UI-state surface for empty, loading/streaming, provider-blocked, error, and success/readback states before any optional server polish.
5. Prove at least one local UI action path: message input -> send action -> provider/runtime call -> persisted assistant response -> readback state transition.
6. Add failure paths for missing provider, timeout, malformed provider response, and persistence failure.
7. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 01-provider-chat-runtime` immediately after the first provider/persistence/UI-state proof commands pass. Do not defer ledger writing until after browser automation, live Ollama checks, HTTP-server polish, or final summary.

Inputs: conversation id, user message, model selection, provider mode.

Outputs/downstream handoff: persisted conversation id, message records, provider-mode disclosure, streamed response transcript, and error state contract.

## Interfaces touched

- Chat API or server action.
- Provider adapter and config boundary.
- Conversation persistence model.
- Chat UI empty/loading/streaming/error/success states.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Streaming output must come from provider seam or deterministic test double, never static text.
- Persisted messages must survive readback.
- Provider mode must be disclosed.
- First evidence checkpoint must exist before optional serving/polish work.
- `phase_core_passed` requires a local interaction/state-transition trace, not only static DOM hooks.

Free choices:
- Framework, schema tool, database library, and UI components may vary if contracts and proofs pass.
- For the fast replay loop, prefer dependency-free Node.js modules, a local durable file or SQLite store, and a static UI file. A full HTTP server is optional and must not delay the first evidence checkpoint.

Boundary requirements:
Provider-backed behavior must disclose deterministic-test-double, sandbox live, or production live mode. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Chat UI must include empty, loading/streaming, provider-blocked, error, and success states. It must expose at least one real action/control path for message submission and readback. UI-bearing proof must include repeatable browser/e2e coverage plus screenshot or DOM evidence for claim qualification. Screenshots alone do not satisfy UI completion.

If browser tooling is unavailable, run a local UI interaction/state-transition proof against the UI/controller/runtime path and record a separate non-upgrading browser/UX blocker with `blocks_continuation: false`. Do not leave the runtime evidence ledger missing because browser tooling is unavailable.

## Safety/security constraints

- Define session ownership for local conversations and settings.
- Never expose provider secrets, prompts containing secrets, or local file paths in logs, screenshots, or evidence rows.
- Ask before external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on secret exposure, destructive-action ambiguity, failed core local runtime/API proof, or missing persistence proof. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run API/provider tests for streaming, missing provider, timeout, and malformed response.
- Run persistence readback tests for conversations and messages.
- Run a local UI interaction/state-transition proof for chat states, then run browser/e2e proof if tooling is available or record an honest non-upgrading browser blocker.
- Run no-fake scan for static assistant responses and no-op controls.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


- Proof id: proof-01-provider-chat-runtime
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - ui_action_path
  - state_transition_proof
  - phase_core_passed
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

Live credentials, local Ollama runtime, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

- Negative tests: missing provider, timeout, malformed provider response, persistence failure, and phase safety/security constraints.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 01-provider-chat-runtime` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

Evidence timing requirement: write the ledger directly after the local provider/persistence/UI-state proof commands pass, before optional server polish, browser automation retries, live Ollama checks, docs, or final response. A replay that implements behavior but times out before the ledger is still a failed replay. A replay with only `checkpoint_recorded` but no `ui_action_path`, `state_transition_proof`, and `phase_core_passed` row is still incomplete for this phase.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
