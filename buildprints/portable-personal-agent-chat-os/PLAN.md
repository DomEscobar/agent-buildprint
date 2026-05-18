# PLAN

## Phase 0 — Scope and safety

- Choose fidelity target: default `workflow-proof + contract-parity + mocked-runtime-proof`.
- Choose stack and UI framework.
- Decide enabled channels: WebUI first; CLI/Telegram/Discord optional.
- Define allowed tool risk policy and filesystem root.

## Phase 1 — Contracts and storage

- Implement core types from `CONTRACTS.md`.
- Implement durable local stores first, or explicitly label any temporary in-memory store as test-only and not production durability. SQLite/Postgres adapters are preferred for persisted chat/memory/checkpoints.
- Add trace/event log and token usage model.

## Phase 2 — Provider router and streaming loop

- Add provider registry with fake provider for tests.
- Implement streaming turn lifecycle and checkpoint persistence.
- Add context builder and compaction threshold behavior.

## Phase 3 — Tools, skills, MCP

- Implement tool registry and policy checks.
- Add deterministic fixture filesystem/search/todo tools for tests; do not count them as production external-tool integrations.
- Implement skill discovery/matching.
- Implement MCP adapter contract with deterministic test fixtures; production MCP/tool integrations must be separately wired and gated.

## Phase 4 — Memory and subagents

- Add raw history, daily episode, long-term memory, and checkpoint stores.
- Add compactor adapter with deterministic test compactor.
- Add team task/subagent event bus and result summarization.

## Phase 5 — WebUI/API

- Expose bootstrap state.
- Render chat stream and traces.
- Add model/tools/skills/MCP/memory/team/tokens/config workbench views.
- Add accessible error states and no-credential local mode.

## Phase 6 — QA

- Run unit/contract tests.
- Run mocked end-to-end chat turn.
- Run browser/runtime click path if UI is built.
- Record remaining parity gaps in `PARITY_CLAIMS.md` or a validation report.
