# Agentic Chat

A self-hosted personal Agentic Chat that streams real model tokens, routes across providers, persists/inspects every turn, and proves an agentic goal-to-action loop before claiming full maturity — built to a shippable local-first quality bar, with honest blocked states for anything not yet proven.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Scope And Maturity

This packet is **stack-neutral**. Provider/model, framework, transport, and persistence are chosen by the user in `00-questions.md`, not pre-committed. It separates the streaming foundation from the full Agentic Chat claim.

`streaming_chat_core` is the foundation floor:

- Real streaming chat — a user-selected real provider streams tokens incrementally (a local Ollama model is the suggested free, no-key option).
- Provider routing — one `ChatProvider` interface for the default and configured paid providers, with a normalized error taxonomy and bounded retry/backoff.
- Durable persistence — sessions, messages, stream events, provider routes, and telemetry survive readback.
- Honest states — empty, streaming, blocked, error, retry/recovery, and success, inspectable without log parsing.
- Polished chat WebUI — conversation-first surface, not a dashboard.

`agentic_chat` is the full claim:

- Goal intake — the user states an objective in the chat context.
- Plan/next-step state — the assistant exposes what it is about to do in product language.
- Action selection — model, tool, skill, MCP, memory, or delegation actions are typed.
- Policy and approval — side-effecting actions block or wait for approval before execution.
- Observation and critique — action results flow back into the conversation with retry/recovery.
- Resumability — agent runs, steps, traces, memory decisions, and delegation records survive readback.
- Benchmark proof — the Buildprint-guided result is compared against a normal plan-mode baseline.

`EXTENSIONS.md` documents optional adapters and policy details, but they are no longer an excuse to call a streaming-only app complete. If tools/skills, MCP, memory/compaction, or subagents are not implemented, the full `agentic_chat` claim remains blocked.

## Requirements

- A local backend/UI stack and durable persistence store chosen during setup.
- A reachable real provider for the outcome floor (a local model runtime such as Ollama needs no paid key).
- Blank env handles for optional paid providers (OpenAI/OpenRouter/Anthropic/Bedrock-compatible).

## Provider Keys

- None required when the selected default provider is a local model.
- Optional paid provider keys enable additional providers; they stay blocked/unverified until a real credentialed streaming call is captured.

## Proof Boundary

The outcome floor is real model tokens, not a deterministic echo. The first implementation phase must prove a usable local loop: create or open a session, send a turn to the selected real provider, observe the first token before completion, persist messages/events/telemetry, read them back after restart, prove cancellation, and surface blocked provider states. The deterministic provider exists only as a test fixture. Local default-provider proof does not prove paid-provider quality, public hosting, or full Agentic Chat maturity.

The full Agentic Chat proof must additionally show goal intake, plan/next-step state, action selection, policy/approval, execution or honest block, observation ingestion, critique/retry/recovery, persisted trace readback, and benchmark comparison against normal plan mode.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer the hard-stop questions in `00-questions.md` (provider/model, stack, design direction, and the safety/scope gates), run setup through `01-project-setup.md` (which records the user-chosen stack), generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`. The active first phase is the real streaming chat slice; do not stop at contracts/storage and do not ship the deterministic echo as the product. Continue through `04-agentic-loop-runtime.md` before claiming complete Agentic Chat.
