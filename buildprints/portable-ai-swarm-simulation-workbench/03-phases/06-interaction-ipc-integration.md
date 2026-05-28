# Phase 06: Interaction And Interview IPC Integration

## How to implement this phase

phase_id: 06-interaction-ipc-integration

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

blueprint_mode: integration
phase_style: boundary_transaction_contract

This phase is an integration boundary transaction contract. It covers report-agent chat, graph search tool use, filesystem IPC commands/responses, callback/response handling, idempotency, timeout, sandbox/live split, retry/error mapping, close-env, and interview history readback.

## Capability outcome

Enable post-report interaction: users chat with the report agent using graph/simulation context, select agents, run single/batch/all interviews through IPC, view interview history, inspect tool-call transcripts, and close the environment safely.

## Mapped capability obligations

- Preserve report-agent chat with graph/simulation context, history, tool-call transcript, Zep search tool boundary, and missing-provider blockers.
- Preserve single, batch, and all-agent interviews through filesystem IPC command/response behavior.
- Preserve env status and close-env through integration boundary state.
- Preserve interview history readback from platform simulation DBs with platform/agent filters and missing DB empty state.
- Preserve interaction UI with report chat, agent dropdown, profile card, survey/interview tools, loading/error/history states.

## Behavior compatibility contract

Target disposition: preserve/replace. Equivalent target behavior is required, not route/function parity. The IPC transport may be reimplemented if command/response semantics, timeout, idempotency, callback or response correlation, close-env state, retry/error mapping, and sandbox/live split remain explicit.

Compatibility impact:

- Fake IPC/sandbox providers can prove boundary behavior but cannot claim live OASIS environment behavior.
- Chat can use replaceable LLM/Zep adapters, but provider_adapter_config_test_required and live_provider_proof_blocker_only remain mandatory.
- Interview history cannot be fabricated as UI state; it must read from durable platform stores or a clearly scoped test fixture.

## Implementation scope

Implement chat request/history, graph search adapter, IPC command writer, response reader, timeout/error mapper, idempotency key/correlation handling, close-env command, env status read, interview history readers, and interaction UI states. Include sandbox IPC tests and live blocker rows where needed.

## Interfaces touched

- API/controller endpoints for report chat, chat history, interview single/batch/all, env status, close-env, and interview history.
- Integration adapters for LLM, Zep search, IPC command/response store, timeout/retry/error mapping, and sandbox/live split.
- Persistence for chat history, tool-call transcript, interview requests/responses, close-env state, and history readback.
- Browser interaction screen with report chat, agent selector, profile context, interview actions, history, loading/error/blocked states.

## State/runtime touched

Own chat history, tool-call transcript, interview transaction records, IPC command ids, response ids, timeout state, close-env state, env status cache, and interview history read models. State must be idempotent across retries and durable enough for readback.

## UX/UI requirements

This phase is UI-bearing. The interaction surface must present chat plus context, agent selection, profile card, interview controls, survey/batch states, history, tool-call visibility, blocked-provider labels, and recovery states. UI proof needs repeatable_browser_e2e, visual_quality_gate, Screenshot critique, and no generic chat shell disconnected from graph/simulation context.

## Safety/security constraints

Validate agent ids, platform filters, command ids, and close-env permissions. Do not expose secrets, raw private documents, or unsafe provider responses. Close-env and batch/all interviews require explicit user intent or disabled reasons. IPC paths must prevent traversal and stale response confusion.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- fake_provider_proof for callback/response, idempotency, sandbox/live split, retry/error mapping
- ipc_timeout_and_close_env_tests
- interview_history_db_readback_tests

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: interview_ipc_chat_boundary_transaction_proof.

Required proof includes chat request/history, graph-search tool transcript, IPC command/response correlation, idempotency, timeout/error mapping, sandbox/live split, close-env state, interview history filters, browser interaction path, provider blocker/proof rows, and evidence row with phase_id: 06-interaction-ipc-integration.

## Repair routing

Repair the current phase for chat, IPC, boundary transaction, timeout, close-env, history, UI, or persistence failures. Route missing report prerequisites to Phase 05 and missing runtime env prerequisites to Phase 03. Route architecture contradictions to packet file `02-project-setup.md`. Route product/credential forks to packet file `01-questions.md`. Record live-provider blockers only in `.buildprint/evidence/evidence-ledger.jsonl`.
