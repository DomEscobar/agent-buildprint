# Phase 01 - Provider Chat Runtime

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, declare the phase objective, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, create handoffs and returns, collect reviews, integrate, verify, and record evidence.

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`. You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - ux-ui-craft
  - test-and-verification

## Product outcome

Deliver the first real Local RAG Chat Workbench path: conversation navigation, message persistence, Ollama-compatible provider adapter seam, deterministic streaming provider, provider diagnostics, markdown/code rendering states, and visible blocked/live-provider states.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of sending a chat turn through UI/controller/runtime/provider/persistence and seeing a streamed assistant response or actionable blocked-provider state.
- Shared proof spine: preconditions are Foundation scaffold and setup decisions; entrypoint is chat UI/API; execution validates input, creates/selects conversation, persists user message, streams deterministic provider chunks, persists assistant message, and renders readback; state/artifact effects include durable messages and stream transcript; observable proof is provider adapter/config tests, persistence roundtrip, local runtime trace, and browser or blocker evidence; failure/recovery covers missing provider, malformed provider response, timeout, empty prompt, and delete/readback.

## Mapped product obligations

- Source path `src/lib/ollama.ts` implies provider adapter config, model listing/show metadata, streaming chat, and provider error mapping.
- Source path `src/app/api/chat/route.ts` implies conversation lookup, user/assistant persistence, streaming response, title update, and non-fatal downstream hooks.
- Source path `src/components/chat.tsx` implies conversation create/select/delete, composer states, markdown/code rendering, thinking/loading states, and provider-blocked errors.
- Source path `prisma/schema.prisma` implies durable Conversation and Message records.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve local-first Ollama-compatible behavior through equivalent target behavior without copying source code. Compatibility impact: the exact source framework, routes, and UI style may be replaced, but provider configuration, deterministic test mode, streaming deltas, provider errors, conversation lifecycle, persisted message readback, and user-visible chat states must remain.

## Implementation scope

Implement the smallest complete chat runtime slice: foundation-created project structure, provider interface, deterministic provider, optional Ollama adapter config contract, conversation/message repositories, chat service or route, UI chat surface, and tests. Live Ollama proof may remain `PROOF_REQUIRED` after adapter/config/error tests exist.

## Interfaces touched

- UI/controller: chat workbench, conversation list, composer, message stream, delete confirmation, provider status.
- API/application service: create/select/delete conversation, send message, stream response, list/read messages.
- Provider contracts: deterministic provider, Ollama-compatible adapter, model metadata, timeout/error mapping.

## State/runtime touched

- Persistence: conversations, messages, provider mode metadata, timestamps, delete/readback.
- Runtime: streaming loop, cancellation/timeout boundary if supported, provider diagnostics.
- Runtime artifacts: stream transcript, persistence readback output, browser/DOM/screenshot artifact or non-upgrading browser blocker.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. The first viewport must be a usable chat workbench, not a landing page. Required states: empty conversation, streaming/loading, success, provider blocked, provider error, message persistence readback, delete confirmation, keyboard/focus behavior, and no raw JSON state dumps.

## Safety/security constraints

Do not store provider secrets. Missing provider must fail closed with visible diagnostics. Deterministic provider proof cannot upgrade live-provider claims. User messages may contain private content and should not be copied into public evidence.

## Quality gates

- Static/typecheck/build gate for selected stack.
- Unit tests for provider config, timeout/error mapping, and deterministic provider chunks.
- Integration test for chat turn order and persistence readback.
- UI/browser/e2e path or non-upgrading blocker for chat send and conversation delete/readback.
- No-fake scan for route-shaped handlers, in-memory-only state, no-op controls, and fake streaming.

## Proof gate

Proof id: proof-01-provider-chat-runtime
Required proof types:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: 01-provider-chat-runtime` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, missing foundation scaffold to setup, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
