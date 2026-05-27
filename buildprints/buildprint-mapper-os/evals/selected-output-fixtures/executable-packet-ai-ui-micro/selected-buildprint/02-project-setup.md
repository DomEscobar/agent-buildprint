# Project Setup

## Human preferences

No blocking preference is required for the first implementation. Use AI best judgment and highest-quality appropriate defaults from `01-questions.md`.

## Inferred project shape

Build a source-independent micro AI chat UI runtime: provider adapter, deterministic test double, persisted conversations, readback, validation, one interactive chat UI surface, negative provider paths, and evidence honesty.

## Stack decisions

- Runtime: dependency-free Node.js plus one minimal interactive UI file. Do not choose Python or install packages for this micro eval.
- Provider: generic local AI adapter with deterministic no-network test double and live runtime mode.
- Persistence: durable local file or SQLite store with setup command and readback proof.
- Tests: built-in Node test runner or a dependency-free Node script, negative provider/persistence paths, UI interaction/state-transition proof, and no-fake scan.
- Missing credentials or missing live provider block only live proof after adapter/config/test/runtime wiring exists.

## Production readiness contract

- Auth/session/tenant boundary: define local session ownership for conversations and destructive actions even if auth is single-user by default.
- Provider integration contract: implement provider adapters, configuration, timeout/error handling, streaming contract, deterministic tests, and live-proof blocker rows when Ollama is unavailable.
- Durable persistence contract: implement setup, readback, restart behavior, and sensitive data handling.
- Worker/runtime contract: define whether the micro chat path is synchronous or queued; if synchronous, record worker retry/cancel/recovery as non-upgrading not-applicable/blocker.
- Deployment and operations contract: document local dev, Docker-ready production shape, environment variables, logs, health checks, and CI/test gates.
- Browser/e2e contract: this packet is UI-bearing. Create the interactive chat UI and local UI action/state-transition proof. Provide repeatable browser tests when tooling is available or honest non-upgrading blockers for unavailable browser tooling; screenshots alone do not qualify UI behavior.

Do not downgrade to a local MVP or fake local MVP. Missing credentials or live provider availability block only live proof, not provider seams, persistence, tests, or runtime wiring. Runtime shopping is forbidden: use dependency-free Node.js so proof can finish quickly on this machine.

## Source contract anchors

Source fixture: eval-fixture/micro-ai-chat.

Observed source anchors:

- Fixture describes provider adapter, deterministic fallback, durable conversation readback, required chat UI states, negative provider paths, and honest live-provider/browser blockers.

Use these observations to preserve product behavior. Do not require the implementation agent to clone or depend on the source repo.

## Source capability/surface ledger

Target disposition values: preserve | replace | merge | defer | drop.

| Source surface | Target disposition | Equivalent target behavior | Compatibility impact |
| --- | --- | --- | --- |
| Chat/provider route | preserve | User sends a prompt and receives an assistant response through a provider adapter | Route names may differ; this is not route/function parity |
| Durable conversation store | preserve | Conversation and messages can be read back through a separate operation | Storage internals may differ if proof passes |
| UI workbench | preserve | User can submit a prompt and inspect empty, loading, blocked-provider, error, and success chat states in a tiny UI | Browser qualification may remain blocked if tooling is unavailable |

## Architecture rules

Implement a vertical slice, not a route-shaped shell. Provider adapters, persistence, UI state surface, and evidence commands must connect through real code paths. Deterministic test doubles may support local proof but cannot satisfy live provider claims.

## Team operating model

Required roles for all phases: product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary, and test-and-verification. The main session may perform these roles directly, but it must record compact gates in `.buildprint/phase-runs/<phase-id>/team-gates.md`.

## Execution authority model

The Buildprint packet controls scope. The implementation project may have a root/local `AGENTS.md` as a scope governor only. `.buildprint/next-agent.md` controls continuity and handoff state between sessions.

## Delegation and handoff protocol

Use bounded assignment when real delegation happens. Each assignment must name the phase, files or surfaces allowed, proof command or verification command, expected return, evidence row requirements, and integration review owner. If no real delegation happens, write compact team-gates instead of fake handoff paperwork.

## AGENTS.md plan

Create implementation-project `AGENTS.md` only after this setup is understood. It must state: follow this Buildprint, execute one phase at a time, do not edit packet snapshots, write runtime proof to `.buildprint/evidence/evidence-ledger.jsonl`, preserve provider/persistence/browser proof honesty, and route failures through `03-phases/phase-flow.md`.

## Runtime setup artifact

Before starting any `03-phases/*` work, write `.buildprint/setup.md` or files under `.buildprint/setup/` in the implementation workspace. This is runtime state, not packet content. Creating only `AGENTS.md` is not enough.

The setup artifact must record concrete decisions for auth/session/tenant ownership, provider adapters/env/config/test doubles, durable persistence and readback/restart behavior, worker/runtime mode, deployment/ops, browser/e2e or UI-tooling blocker handling, safety, and verification commands.

## Quality gates

Minimum gates: dependency install/build or syntax check, unit/integration tests for provider and persistence, local UI interaction/state-transition proof, negative tests for provider/persistence failures, no-fake scan, and evidence ledger validation.

## Safety and permissions

Ask before external writes, paid providers, deployments, secrets, irreversible migrations, or destructive actions beyond local test data. Never expose secrets in logs, screenshots, UI, reports, or evidence rows.

## Open questions and assumptions

Assume local deterministic provider mode until live provider runtime is supplied. Assume dependency-free Node.js, durable file persistence, local dev only, and single-user local mode unless user asks for multi-user auth.

## Phase start gate

Do not start `03-phases/*` until this setup has been converted into implementation-project structure, local `AGENTS.md`, environment plan, persistence plan, provider plan, and test commands.
