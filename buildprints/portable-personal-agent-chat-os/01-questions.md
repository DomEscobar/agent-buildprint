# Questions

Blank answers are not blockers. Blank answers authorize AI best judgment using the highest-quality appropriate default for a local, deterministic, self-hosted personal agent OS. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## 1. Preferred implementation stack

If unspecified, choose a stack that can deliver a streaming WebUI/API, durable local persistence, provider adapters, contract tests, and browser/API proof without unnecessary infrastructure.

AI best judgment default: TypeScript or Python backend with a modest web frontend, SQLite or equivalent local durable store, and deterministic test adapters.

## 2. Local proof versus live providers

Should the first implementation prove only deterministic local behavior, or include optional live provider smoke tests?

AI best judgment default: deterministic local proof first. Live OpenAI/Anthropic/Bedrock/Ollama-compatible smoke tests are optional, env-gated, and cannot upgrade claims unless credentials and network access are explicitly available.

## 3. Tool safety policy

Which tool risks may run by default?

AI best judgment default: allow `safe` and bounded `read`; deny `write`, `network`, `shell`, browser automation, and destructive filesystem actions unless explicitly enabled by config and covered by tests.

## 4. Persistence durability target

What durability is required for chat history, checkpoints, memory, traces, and token telemetry?

AI best judgment default: durable local persistence for product claims. In-memory state is allowed only for tests/prototypes and must be labeled as not production durability.

## 5. WebUI breadth for the first pass

Which surfaces are required in the first user-visible implementation?

AI best judgment default: chat stream, provider/model diagnostics, tool risk list, skills, MCP server/tool status, memory viewer/editor, team task view, token telemetry, and config diagnostics. Screens may be minimal but must be wired to real runtime state.

## 6. Deployment and multi-user posture

Is this a single-user local app or a hosted multi-user product?

AI best judgment default: single-user local/self-hosted app. Production auth, tenant isolation, billing, hosted deployment, and public publishing remain out of scope until explicitly requested and separately proven.
