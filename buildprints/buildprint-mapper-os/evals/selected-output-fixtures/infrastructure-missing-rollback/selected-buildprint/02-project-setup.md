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
  - Primary: infrastructure
  - Secondary: []
  - Phase style: operations_contract
  - Why this mode fits: fixture maps a service deployment operation with health/readiness, rollback, drift detection, and observability.
- Product / capability: fixtures/executable-packet-infrastructure-good service deployment
- Deploy/apply entrypoint: apply manifests to target environment.
- Rollback: previous revision retained; rollback command documented.
- Observability: structured logs and metrics endpoint exposed.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapping, infrastructure mode requirements, and phase proof gates.
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

- UI architecture: for infrastructure-mode: not UI-bearing unless explicitly added; define the callable/import/CLI/operator surface.
- Product composition: for infrastructure-mode, define the mode-specific composition, flow, or operation sequence.
- Domain-specific affordances: define DX/operator affordances such as typed examples, error messages, trace output, or reference patterns.
- Visual system: for non-UI, define documentation/readability, API ergonomics, output format stability, logging.
- State quality: every major surface needs empty, error, blocked, success, and recovery states.
- Screenshot critique: for non-UI outputs, replace screenshots with import/API/CLI/provider/data/deployment proof.

## Mapped contract anchors

Promote compiled infrastructure observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: mapped note fixtures/infrastructure-target records the infrastructure capability.
- Request/response payloads and validation errors: infrastructure obligation requires validation and returns result.
- Provider/runtime boundaries and env var names only: none required for this fixture unless mode is integration.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: durable result storage and readback required where claimed.
- UI flow/state anchors: applicable only for UI-bearing phases.

## Mapped obligation/surface matrix

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| SRC-SERVICE-DEPLOY | mapped note: fixtures/infra-target:1-60 | Implement deployment operations: deploy/apply, health/readiness, rollback, drift detection, observability. | preserve | Equivalent target behavior: apply manifests, health/readiness check, rollback revision, drift detection. | `03-phases/01-service-deploy.md` | Health/readiness probe response, rollout status, drift-detection report. |

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

- Assumption: production implementation uses infrastructure-appropriate proof gates.
- Evidence: mapped obligations and phase proof gates.
- Risk: minimal for a test fixture.
- Blocks phase work: no

Unanswered ordinary engineering choices become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and `.buildprint/setup.md` without inventing architecture.

Initial phase set:

- `03-phases/01-service-deploy.md`
