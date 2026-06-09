# Agentic Chat

A self-hosted personal agent chatbot with streaming turns, provider routing, tools, MCP policy, memory, subagents, telemetry, persistence, and WebUI/API workbench.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Features

- Streaming chat turn runtime with deterministic provider proof.
- Provider registry, usage telemetry, and failure events.
- Tools, skills, MCP policy, and audit trails.
- Durable sessions, memory, compaction, subagents, and checkpoints.
- WebUI/API workbench with honest blocked and recovery states.

## Requirements

- Local backend/UI stack with durable storage selected during setup.
- Blank env handles for live model providers and MCP/tool configuration.
- No live provider/tool/browser proof without explicit credentials and allowlists.

## Provider Keys

- Optional OpenAI/OpenRouter/Anthropic/Bedrock-compatible provider keys for live models.
- Optional MCP/tool provider credentials depending on enabled integrations.
- Optional browser automation credentials only when browser paths are explicitly enabled.

## Proof Boundary

Deterministic provider tests can prove streaming order, persistence, telemetry, memory, tool policy, and UI states. They do not prove live provider quality, live MCP side effects, browser automation, or public hosting.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer only hard-stop questions in `00-questions.md`, run setup through `01-project-setup.md`, generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`.

