# Agentic Chat

A self-hosted personal chat that streams real model tokens, routes across providers, and persists/inspects every turn — built to a shippable local-first quality bar, with honest blocked states for anything not yet proven.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Scope — capability ladder

This packet is deliberately deep and **stack-neutral**. Provider/model, framework, transport, and persistence are chosen by the user in `00-questions.md`, not pre-committed. It is built as three strictly increasing claims (`capability_maturity` in `blueprint.yaml`):

**Level 1 — streaming_chat_core (foundation floor)**

- Real streaming chat — a user-selected real provider streams tokens incrementally (a local Ollama model is the suggested free, no-key option).
- Provider routing — one `ChatProvider` interface for the default and configured paid providers, with a normalized error taxonomy and bounded retry/backoff.
- Durable persistence — sessions, messages, stream events, provider routes, and telemetry survive readback.
- Honest states — empty, streaming, blocked, error, retry/recovery, and success, inspectable without log parsing.
- Polished chat WebUI — conversation-first surface, not a dashboard.

**Level 2 — agentic_chat (model-driven action loop)**

- The model itself selects actions via provider tool/function calling — no slash commands, no keyword/regex intent matching.
- One allowlist-gated policy path for tools, skills, and MCP servers, with typed results, inline approval/block cards, and audit records.
- Scoped memory read/write decisions and compaction summaries in product language.
- Observations feed back into the loop; bounded retry; resumable agent-run trace; final synthesis tied to the goal.

**Level 3 — agentic_swarm (parallel multi-agent dispatching)**

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

The outcome floor is real model tokens, not a deterministic echo. The first implementation phase must prove a usable local loop: create or open a session, send a turn to the selected real provider, observe the first token before completion, persist messages/events/telemetry, read them back after restart, prove cancellation, and surface blocked provider states. The deterministic provider exists only as a test fixture. Local default-provider proof does not prove paid-provider quality or public hosting. The `agentic_chat` claim additionally requires a model-driven action-selection trace plus an approval-gated, audited tool/MCP/memory execution; the `agentic_swarm` claim additionally requires a real parallel subagent run with supervisor fan-in synthesis. Each higher claim needs its own proof and is otherwise an honest blocker.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer the hard-stop questions in `00-questions.md` (provider/model, stack, design direction, and the safety/scope gates), run setup through `01-project-setup.md` (which records the user-chosen stack), generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`. The active first phase is the real streaming chat slice; do not stop at contracts/storage and do not ship the deterministic echo as the product.
