# SPEC

This legacy spine file is retained for package compatibility. The authoritative implementation contract is `BUILDPRINT.md`; executable phase detail lives in `03-phases/phase-index.yaml` and `03-phases/phase-flow.md`.

## Product specification — capability ladder

The stack is stack-neutral and chosen via `00-questions.md`. The product is built as three strictly increasing claims (`capability_maturity` in `blueprint.yaml`).

### Level 1 — streaming_chat_core (foundation floor)

- setup-generated architecture diagrams and project structure that use product-specific Agentic Chat responsibilities, labeled flows, component-to-code mappings, and component/file/proof traceability before implementation starts;
- a real-model streaming chat runtime over an incrementally readable transport, with the deterministic provider as a test double only;
- a `ChatProvider` interface routing the user-selected default provider and optional paid providers via official/well-supported clients;
- a normalized error taxonomy with bounded retry/backoff and explicit credential posture;
- normalized token/usage telemetry per turn and provider;
- durable persistence for sessions, messages, stream events, provider routes, and telemetry with a migration path;
- a polished chat WebUI/API with honest empty, streaming, blocked, error, retry, and success states;
- diagnostics that keep paid-provider, public hosting, and higher-maturity claims honest.

### Level 2 — agentic_chat (model-driven single-agent loop)

Implemented through `03-phases/04-agentic-loop-runtime.md`.

- model-driven action selection via the provider's native tool/function-calling interface (or a structured-output equivalent) — the model decides when to act; slash commands and keyword/regex intent matching do not qualify;
- one allowlist-gated policy path for tools, skills, and MCP servers with typed inputs/outputs, audit records, and inline approval/block UI attached to the message;
- scoped memory read/write decisions (auto-write/ask/skip/block) and compaction summaries in product language, with privacy/retention posture;
- observation re-ingestion so each tool/memory result informs the next model step, with a bounded step/retry budget and a resumable agent run trace;
- a final synthesis tied to the original user goal;
- no execution from implicit model text and no side effect without an approval record.

### Level 3 — agentic_swarm (parallel multi-agent dispatching)

Implemented through `03-phases/05-swarm-dispatching.md`.

- a supervisor that decomposes a goal into typed, parallelizable subtasks;
- bounded-concurrency parallel subagent dispatch over a real concurrency primitive (worker pool/queue), never sequential calls relabeled as parallel;
- isolated per-subagent context, scoped tool/MCP access, independent trace, and a per-subagent run record;
- fan-in aggregation that the supervisor synthesizes into one goal-tied answer with honest partial-failure handling;
- approval gate before spawning a side-effecting swarm, plus per-subagent and whole-swarm cancellation;
- bounded per-subagent retry and resumable swarm/subagent state after restart.

## Honesty rule

Lower levels do not imply higher levels. A streaming-only build is not agentic; a single-agent loop is not a swarm. Tools/skills, MCP policy, memory/compaction, and subagents are documented in `EXTENSIONS.md`; unproven levels remain honestly blocked seams, never stubbed or advertised as working.
