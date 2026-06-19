# CONTRACTS

This compatibility file summarizes product vocabulary only. `BUILDPRINT.md`, `01-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, and the active files under `03-phases/` are authoritative.

## Core contracts (1.0)

- `Session`: conversation with messages, active provider/model route, checkpoints, events, and usage.
- `Message`: id, session id, role, content, status (`pending`/`streaming`/`completed`/`failed`/`blocked`), and timestamps.
- `Turn`: id, session id, provider id, model id, status, timing, cancellation/timeout/error fields, and checkpoint id.
- `StreamEvent`: ordered SSE records — `turn.started`, `model.delta`, `usage.delta`, `turn.completed`, `turn.failed`, `turn.blocked`.
- `ChatProvider`: `stream(req, signal): AsyncIterable<ProviderStreamEvent>` plus `countTokens(messages)`; backs the default local model, the deterministic test double, and paid providers.
- `ProviderRoute`: selected provider, model, credential posture, real/test mode, and blocked reason when applicable.
- `ProviderFailure`: normalized code, retryability, and user-facing recovery text.
- `Telemetry`: prompt/output tokens, latency, provider id, model id, and cost (zero/unknown when not paid).

## Deferred contracts (EXTENSIONS.md, not in 1.0)

- `ToolSpec`, `SkillSpec`, `McpServerSpec`, `MemoryState`, and `TeamTask` are designed as future seams only; they are not built in 1.0.
