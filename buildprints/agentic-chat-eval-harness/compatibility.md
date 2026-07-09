# Compatibility

## Good host candidates

This capability fits host projects that already have:

- an Agentic Chat runtime or conversation service
- a way to send user turns into the runtime from tests or scripts
- model/provider adapter or router
- tool registry, MCP surface, or action executor
- transcript, run, state, memory, or trace storage
- safe local/test mode for tool side effects
- test runner or CI command

The applying agent must name these host signals in `.buildprint/host-assessment.md`: chat runtime entrypoint, provider routing path, tool/action registry, safe execution mode, transcript/state storage, trace hooks, test command, and optional RAG/UI proof surfaces.

## Weak host candidates

Proceed only after explicit user approval when the host:

- has chat UI but no callable runtime/test entrypoint
- has tools that can only run against production services
- has no trace hooks and no place to add adapter spans
- has no harness event stream and no session replay path when harness-runtime is required
- has no governance hooks when security-governance is required
- has no persistent transcript/state model
- relies on live models with high cost or unstable outputs
- has RAG but no citation/evidence surface

## Incompatible hosts

Do not apply this capability when:

- there is no chat/agent runtime to evaluate
- the host cannot run any meaningful scenario locally, in CI, or in a sandbox
- destructive tools cannot be blocked, mocked, or sandboxed
- private transcripts must be sent to external judges but approval is refused
- the user refuses receipts or regression commands

Block conditions must be written explicitly. A host with no callable runtime, no safe tool mode, no scenario owner, or no validation command is not compatible until the missing prerequisite is supplied.

## Optional backend compatibility

The capability is backend-adaptable:

- OpenTelemetry-compatible spans are preferred when available.
- Host-neutral JSON span files are acceptable for MVP.
- Langfuse, Phoenix, Braintrust, OpenLLMetry, OpenAI Evals, Inspect AI, DeepEval, Ragas, TruLens, and LlamaIndex may be used when they match the host stack.
- SaaS observability or judge backends require explicit approval for private transcripts, tool outputs, and retrieved evidence.
