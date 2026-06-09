# Agentic Chat

Agentic Chat is a portable self-hosted agent chat workbench with streaming chat, provider routing, tools, skills, MCP seams, memory, subagents, telemetry, and local safety boundaries.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Build](https://img.shields.io/badge/build-local%20checks%20required-yellow)
![License](https://img.shields.io/badge/license-TBD-lightgrey)
![Runtime](https://img.shields.io/badge/runtime-trusted--local%20webapp-lightgrey)
![Status](https://img.shields.io/badge/status-local%20build%20requires%20review-yellow)

## Features

- Produce and inspect the central artifact: Durable personal agent session with streamed messages, selected provider, tool policy decisions, memory/checkpoint readback, subagent trace, and telemetry summary.
- Configure provider/API access without hiding missing-key blockers.
- Persist product state when durability is claimed.
- Keep external publishing, deployment, and side effects approval-gated.

## Requirements

- Provider/API keys only when live providers are enabled.
- Database or storage configuration only when saved state is enabled.
- Export, publishing, OAuth, webhook, or deployment credentials only when those features are enabled.
- No live keys are required for deterministic local proof mode.

## Environment And Provider Keys

```bash
TEXT_PROVIDER_API_KEY=
IMAGE_PROVIDER_API_KEY=
DATABASE_URL=
APP_DATA_DIR=
SESSION_SECRET=
```

## Quick Start

```bash
install-command
configure-env-command
run-dev-command
test-or-check-command
```

## Verification

Verify build/test commands, the main product path, scenario-specific output quality, persistence/readback, missing-provider blocked states, and desktop/narrow visual behavior.

## Limitations

This package defines the product contract; it does not prove a downstream implementation by itself.
