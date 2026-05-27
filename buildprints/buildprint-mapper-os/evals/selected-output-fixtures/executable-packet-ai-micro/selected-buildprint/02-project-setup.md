# Project Setup

## Human preferences

No blocking preference is required for the first implementation. Use AI best judgment and highest-quality appropriate defaults from `01-questions.md`.

## Inferred project shape

Build a source-independent micro AI chat runtime: provider adapter, deterministic test double, persisted conversations, readback, validation, negative provider paths, and evidence honesty.

## Stack decisions

- Runtime: dependency-free Node.js only. Do not choose Python or install packages for this micro eval.
- Provider: generic local AI adapter with deterministic no-network test double and live runtime mode.
- Persistence: durable local file or SQLite store with setup command and readback proof.
- Tests: built-in Node test runner or a dependency-free Node script, negative provider/persistence paths, and no-fake scan.
- Missing credentials or missing live provider block only live proof after adapter/config/test/runtime wiring exists.

## Production readiness contract

- Auth/session/tenant boundary: define local session ownership for conversations and destructive actions even if auth is single-user by default.
- Provider integration contract: implement provider adapters, configuration, timeout/error handling, streaming contract, deterministic tests, and live-proof blocker rows when Ollama is unavailable.
- Durable persistence contract: implement setup, readback, restart behavior, and sensitive data handling.
- Worker/runtime contract: define whether the micro chat path is synchronous or queued; if synchronous, record worker retry/cancel/recovery as non-upgrading not-applicable/blocker.
- Deployment and operations contract: document local dev, Docker-ready production shape, environment variables, logs, health checks, and CI/test gates.
- Browser/e2e contract: API/runtime proof is enough when no UI is implemented. If UI is implemented, provide repeatable browser tests or honest non-upgrading blockers for unavailable browser tooling; screenshots alone do not qualify UI behavior.

Do not downgrade to a local MVP or fake local MVP. Missing credentials or live provider availability block only live proof, not provider seams, persistence, tests, or runtime wiring. Runtime shopping is forbidden: use dependency-free Node.js so proof can finish quickly on this machine.

## Source contract anchors

Source fixture: eval-fixture/micro-ai-chat.

Observed source anchors:

- Fixture describes provider adapter, deterministic fallback, durable conversation readback, negative provider paths, and honest live-provider blockers.

Use these observations to preserve product behavior. Do not require the implementation agent to clone or depend on the source repo.

## Source capability/surface ledger

Target disposition values: preserve | replace | merge | defer | drop.

| Source surface | Target disposition | Equivalent target behavior | Compatibility impact |
| --- | --- | --- | --- |
| Chat/provider route | preserve | User sends a prompt and receives an assistant response through a provider adapter | Route names may differ; this is not route/function parity |
| Durable conversation store | preserve | Conversation and messages can be read back through a separate operation | Storage internals may differ if proof passes |
| UI workbench | defer | UI is optional for the micro packet | Must not be claimed unless implemented and proven |

## Architecture rules

Implement a vertical slice, not a route-shaped shell. Provider adapters, persistence, and evidence commands must connect through real code paths. Deterministic test doubles may support local proof but cannot satisfy live provider claims.

## Team operating model

Required roles for all phases: product-architect, integration-runtime, data-persistence, security-boundary, and test-and-verification. UX/UI applies only if a UI is implemented. The main session may perform these roles directly, but it must record compact gates in `.buildprint/phase-runs/<phase-id>/team-gates.md`.

## Execution authority model

The Buildprint packet controls scope. The implementation project may have a root/local `AGENTS.md` as a scope governor only. `.buildprint/next-agent.md` controls continuity and handoff state between sessions.

## Delegation and handoff protocol

Use bounded assignment when real delegation happens. Each assignment must name the phase, files or surfaces allowed, proof command or verification command, expected return, evidence row requirements, and integration review owner. If no real delegation happens, write compact team-gates instead of fake handoff paperwork.

## AGENTS.md plan

Create implementation-project `AGENTS.md` only after this setup is understood. It must state: follow this Buildprint, execute one phase at a time, do not edit packet snapshots, write runtime proof to `.buildprint/evidence/evidence-ledger.jsonl`, preserve provider/persistence/browser proof honesty, and route failures through `03-phases/phase-flow.md`.

## Quality gates

Minimum gates: dependency install/build or syntax check, unit/integration tests for provider and persistence, negative tests for provider/persistence failures, no-fake scan, and evidence ledger validation.

## Safety and permissions

Ask before external writes, paid providers, deployments, secrets, irreversible migrations, or destructive actions beyond local test data. Never expose secrets in logs, screenshots, UI, reports, or evidence rows.

## Open questions and assumptions

Assume local deterministic provider mode until live provider runtime is supplied. Assume dependency-free Node.js, durable file persistence, local dev only, and single-user local mode unless user asks for multi-user auth.

## Phase start gate

Do not start `03-phases/*` until this setup has been converted into implementation-project structure, local `AGENTS.md`, environment plan, persistence plan, provider plan, and test commands.
