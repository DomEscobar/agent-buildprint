# SPEC

This legacy spine file is retained for package compatibility. The authoritative implementation contract is `BUILDPRINT.md`; executable phase detail lives in `03-phases/phase-index.yaml` and `03-phases/phase-flow.md`.

## Product specification (1.0 core)

The stack is stack-neutral and chosen via `00-questions.md`. Build a local personal chat with:

- setup-generated architecture diagrams and project structure that use product-specific Agentic Chat responsibilities, labeled flows, component-to-code mappings, and component/file/proof traceability before implementation starts;
- a real-model streaming chat runtime over an incrementally readable transport, with the deterministic provider as a test double only;
- a `ChatProvider` interface routing the user-selected default provider and optional paid providers via official/well-supported clients;
- a normalized error taxonomy with bounded retry/backoff and explicit credential posture;
- normalized token/usage telemetry per turn and provider;
- durable persistence for sessions, messages, stream events, provider routes, and telemetry with a migration path;
- a polished chat WebUI/API with honest empty, streaming, blocked, error, retry, and success states;
- diagnostics that keep paid-provider, public hosting, and full agentic-capability claims honest.

## Full Agentic Chat maturity

Tools/skills, MCP adapter policy, memory/compaction, and subagent delegation are documented in `EXTENSIONS.md` and implemented through `03-phases/04-agentic-loop-runtime.md` when claiming full `agentic_chat` maturity. They may remain blocked after the streaming core floor, but they must not be stubbed or claimed as working without typed runtime paths, policy states, audit records, and product-loop proof.
