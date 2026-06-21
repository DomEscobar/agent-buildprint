# CONTRACTS

This compatibility file summarizes product vocabulary only. `BUILDPRINT.md`, `01-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, and the active files under `03-phases/` are authoritative.

## Core contracts (1.0)

- `ArchitecturePacket`: setup-created `architecture/*.md` files with Mermaid diagrams, product-specific components, labeled edges, state/failure notes, claim ceilings, and implementation mappings.
- `ProjectStructurePlan`: setup-created `PROJECT_STRUCTURE.md` organized by Agentic Chat product/runtime responsibility, with ownership, exclusions, architecture mapping, and tests/evals for each top-level source area.
- `ArchitectureStructureTrace`: setup-created `ARCHITECTURE_STRUCTURE_TRACE.md` proving component-to-file-to-proof traceability and recording the anti-lazy architecture score.
- `Session`: conversation with messages, active provider/model route, checkpoints, events, and usage.
- `Message`: id, session id, role, content, status (`pending`/`streaming`/`completed`/`failed`/`blocked`), and timestamps.
- `Turn`: id, session id, provider id, model id, status, timing, cancellation/timeout/error fields, and checkpoint id.
- `StreamEvent`: ordered SSE records — `turn.started`, `model.delta`, `usage.delta`, `turn.completed`, `turn.failed`, `turn.blocked`.
- `ChatProvider`: `stream(req, signal): AsyncIterable<ProviderStreamEvent>` plus `countTokens(messages)`; backs the default local model, the deterministic test double, and paid providers.
- `ProviderRoute`: selected provider, model, credential posture, real/test mode, and blocked reason when applicable.
- `ProviderFailure`: normalized code, retryability, and user-facing recovery text.
- `Telemetry`: prompt/output tokens, latency, provider id, model id, and cost (zero/unknown when not paid).

## Full Agentic Chat contracts (EXTENSIONS.md and phase 04)

- `ToolSpec`, `SkillSpec`, `McpServerSpec`, `MemoryState`, and `TeamTask` are full-maturity contracts. They may remain blocked at the streaming-core floor, but a complete `agentic_chat` claim must prove typed runtime paths, policy states, audit records, product-loop evidence, or explicit blockers for each enabled capability.

## Setup architecture gate

- Implementation must not start until `ArchitecturePacket`, `ProjectStructurePlan`, and `ArchitectureStructureTrace` exist and score `4` or `5` on the setup architecture rubric, or until an exact external blocker lowers the claim ceiling.
- Generic diagrams are invalid: unlabeled edges, vague boxes such as `Frontend`, `Backend`, `API`, `Agent`, `Service`, `Utils`, or `DB`, and missing component-to-code mappings fail the gate.
- Generic file structures are invalid: `components/`, `utils/`, `services/`, `api/`, `pages/`, `lib/`, `helpers/`, or `misc/` may exist only when narrowed by product/runtime responsibility, explicit exclusions, architecture traceability, and proof mapping.
