# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped obligations into concrete project architecture, team operating rules, quality gates, and the future project AGENTS.md plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped obligations and mode-appropriate quality goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Full-suite packets default to production-grade architecture, not a local MVP.
- Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.

## Product / capability shape

- Blueprint mode:
  - Primary: integration
  - Secondary: []
  - Phase style: boundary_transaction_contract
  - Why this mode fits: fixture maps an external provider boundary transaction with webhook dispatch, idempotency, and sandbox/live split.
- Product / capability: fixtures/executable-packet-integration-good webhook dispatch boundary
- Provider boundary: external webhook provider with sandbox and live modes.
- Config/secrets: `WEBHOOK_SECRET`, `PROVIDER_API_KEY`; fail-closed when missing.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapping, integration mode requirements, and phase proof gates.
- Package manager:
  - Decision: choose product-faithful or ecosystem-standard default.
- Data/storage:
  - Decision: real persistence where the capability requires durable state.
- Auth/providers/deployment:
  - Decision: production-grade architecture is the default. Missing credentials may block live proof but not implementation scope.

## Production readiness contract

Complete these decisions before phase work. Missing credentials block only live proof after implementation includes adapters, config contracts, tests, and runtime wiring.

- Auth/session/tenant boundary: define the minimum appropriate boundary.
- Provider integration contract: define adapters, env/config names, deterministic test doubles, sandbox/live split, and tests.
- Durable persistence contract: define storage, schema ownership, migrations, restart/readback proof.
- Worker/runtime contract: define job ownership, retries, cancellation, timeout, failure recovery.
- Deployment and operations contract: define local dev, health/readiness checks, logging, CI gates.
- Browser/e2e contract: for non-UI modes, define import/API/CLI/operator proof instead of browser flows.
- Screenshot critique: for non-UI modes, critique consumer/operator experience, not UI screenshots.

## Experience quality contract

Adapt to the selected mode. Non-UI modes need product-grade developer/operator experience.

- UI architecture: for integration-mode: not UI-bearing unless explicitly added; define the callable/import/CLI/operator surface.
- Product composition: for integration-mode, define the mode-specific composition, flow, or operation sequence.
- Domain-specific affordances: define DX/operator affordances such as typed examples, error messages, trace output, or reference patterns.
- Visual system: for non-UI, define documentation/readability, API ergonomics, output format stability, logging.
- State quality: every major surface needs empty, error, blocked, success, and recovery states.
- Screenshot critique: for non-UI outputs, replace screenshots with import/API/CLI/provider/data/deployment proof.

## Mapped contract anchors

Promote compiled integration observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: mapped note fixtures/integration-target records the integration capability.
- Request/response payloads and validation errors: integration obligation requires validation and returns result.
- Provider/runtime boundaries and env var names only: none required for this fixture unless mode is integration.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: durable result storage and readback required where claimed.
- UI flow/state anchors: applicable only for UI-bearing phases.

## Mapped obligation/surface matrix

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| SRC-WEBHOOK-DISPATCH | mapped note: fixtures/integration-target:1-30 | Implement webhook dispatch boundary: config, webhook/callback, idempotency, sandbox/live split, fake-provider tests. | preserve | Equivalent target behavior: webhook dispatch, idempotency key, sandbox/live split, error mapping. | `03-phases/01-webhook-dispatch.md` | Fake-provider proof proves dispatch shape, idempotency, and error mapping. |

The "Mapped obligation" column label is required regardless of mode.

Rules:

- Mapped obligation entries must use Target disposition values: preserve | replace | merge | defer | drop | blocked.
- Every high-signal mapped surface must appear exactly once with one owning phase, or be marked dropped/blocked with rationale.
- Required proof must reference the owned surface specifically, not only "tests pass", "app builds", or "feature preserved".
- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No mapped surface may disappear silently.
- Origin repository filenames are mapping notes, not packet file references.
- Future files produced by the implementation are runtime artifacts or generated outputs, not packet files.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

For each unresolved choice, record:

- Assumption: production implementation uses integration-appropriate proof gates.
- Evidence: mapped obligations and phase proof gates.
- Risk: minimal for a test fixture.
- Blocks phase work: no

Unanswered ordinary engineering choices become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and `.buildprint/setup.md` without inventing architecture.

Initial phase set:

- `03-phases/01-webhook-dispatch.md`
