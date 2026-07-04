# Agentic Chat

A self-hosted personal Agentic Chat that streams real model tokens, routes across providers, persists/inspects every turn, and proves an agentic goal-to-action loop before claiming full maturity — built to a shippable local-first quality bar, with honest blocked states for anything not yet proven.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Scope — capability ladder

This packet is deliberately deep and **stack-neutral**. Provider/model, framework, transport, and persistence are chosen by the user in `00-questions.md`, not pre-committed. It is built as three strictly increasing claims (`capability_maturity` in `blueprint.yaml`):

**Level 1 — streaming_chat_core (foundation floor)**

- Real streaming chat — a user-selected real provider streams tokens incrementally (a local Ollama model is the suggested free, no-key option).
- Provider routing — one `ChatProvider` interface for the default and configured paid providers, with a normalized error taxonomy and bounded retry/backoff.
- Durable persistence — sessions, messages, stream events, provider routes, and telemetry survive readback.
- Honest states — empty, streaming, blocked, error, retry/recovery, and success, inspectable without log parsing.
- Polished chat WebUI — conversation-first surface, not a dashboard.

**Level 2 — agentic_chat (model-driven action loop with production runtime)** — built through `03-phases/04-agentic-loop-runtime.md`; technique basis in `references/runtime-techniques-basis.md`

- Stateful harness with steering queue, cancellation, and dangling tool-call repair.
- The model itself selects actions via provider tool/function calling — no slash commands, no keyword/regex intent matching.
- Plan/next-step state with stale-plan replan; context packing with trust zones.
- Prompt-injection action screening and scoped capability grants per action.
- One allowlist-gated policy path for tools, skills, and MCP servers, with typed results, inline approval/block cards, and audit records.
- Runtime budget policy, loop detection, tool error recovery, and idempotency on write/external effects.
- Scoped memory read/write decisions and compaction summaries in product language.
- Verifier/done-check before final synthesis; run receipt and append-only session events.
- Observations feed back into the loop; bounded retry; resumable agent-run trace; final synthesis tied to the goal.

**Level 3 — agentic_swarm (parallel multi-agent dispatching)** — built through `03-phases/05-swarm-dispatching.md`

- A supervisor decomposes a goal and dispatches real parallel subagents with isolated context and scoped tool access.
- Fan-in synthesis into one goal-tied answer, honest partial-failure handling, cancellation, and resumable swarm/subagent runs.

Each level is a higher claim with its own proof. Lower levels never imply higher ones. Unproven levels stay honest blocked seams (`EXTENSIONS.md`) — designed but never stubbed or advertised as working.

## Requirements

- A local backend/UI stack and durable persistence store chosen during setup.
- A reachable real provider for the outcome floor (a local model runtime such as Ollama needs no paid key).
- Blank env handles for optional paid providers (OpenAI/OpenRouter/Anthropic/Bedrock-compatible).

## Provider Keys

- None required when the selected default provider is a local model.
- Optional paid provider keys enable additional providers; they stay blocked/unverified until a real credentialed streaming call is captured.

## Proof Boundary

Project setup must first produce the architecture start model that coding agents will build against:

- `architecture/system-architecture.md`
- `architecture/agent-runtime-loop.md`
- `architecture/chat-turn-sequence.md`
- `architecture/state-and-memory-model.md`
- `architecture/failure-recovery-flow.md`
- `PROJECT_STRUCTURE.md`
- `ARCHITECTURE_STRUCTURE_TRACE.md`

The architecture packet must use product-specific components, labeled Mermaid edges, component-to-code mappings, and an anti-lazy score of `4` or `5`. Generic diagrams or file trees are setup failures, not harmless documentation gaps.

The outcome floor is real model tokens, not a deterministic echo. The first implementation phase must prove a usable local loop: create or open a session, send a turn to the selected real provider, observe the first token before completion, persist messages/events/telemetry, read them back after restart, prove cancellation, and surface blocked provider states. The deterministic provider exists only as a test fixture. Local default-provider proof does not prove paid-provider quality or public hosting.

The `agentic_chat` claim additionally requires a model-driven action-selection trace plus harness/budget/loop-breaker/runtime-governance proof, approval-gated audited tool/MCP/memory execution, context packing, verifier/done-check, run receipt, observation ingestion, critique/retry/recovery, persisted trace and session-event readback, and benchmark comparison against normal plan mode. The `agentic_swarm` claim additionally requires a real parallel subagent run with delegation ledger, supervisor fan-in synthesis, and per-worker run receipts. Each higher claim needs its own proof and is otherwise an honest blocker.

Final readiness is controlled by `03-phases/06-claim-verification.md`. The generated artifact must produce `.buildprint/claim-gates.json` and `.buildprint/claim-check.md`; these files derive the highest honest claim from evidence. A missing gate file, a prose-only proof, a slash-command/regex action router, non-reingested tool output, sequential subagents relabeled as parallel, unscoped worker access, or missing restart readback lowers the claim even when the UI advertises the feature.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer the hard-stop questions in `00-questions.md` (provider/model, stack, design direction, and the safety/scope gates), run setup through `01-project-setup.md` (which records the user-chosen stack and generates the architecture/project-structure packet), generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`. The active first phase is the real streaming chat slice; do not stop at contracts/storage and do not ship the deterministic echo as the product. Continue through `04-agentic-loop-runtime.md` before claiming `agentic_chat`, through `05-swarm-dispatching.md` before claiming `agentic_swarm`, and through `06-claim-verification.md` before publishing either higher claim.
