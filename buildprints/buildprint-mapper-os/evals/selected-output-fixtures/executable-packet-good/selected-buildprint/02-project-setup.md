# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped product obligations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped product obligations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Product shape

- Product: executable packet good fixture
- Frontend/UI surfaces: infer from phase UX/UI requirements and mapped product obligations.
- Backend/API surfaces: infer from phase interfaces touched and mapped product obligations.
- State/runtime surfaces: infer from phase state/runtime touched and mapped product obligations.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapping, product requirements, and phase proof gates.
- Package manager:
  - Decision: choose product-faithful or ecosystem-standard default.
  - Evidence: lockfiles/workspace evidence if available.
- Data/storage:
  - Decision: real persistence where the product requires durable state.
  - Evidence: state/runtime requirements in phases.
- Auth/providers/deployment:
  - Decision: production-grade architecture is the default for full-suite mapped packets. Missing credentials, paid-service approval, or deployment authorization may block live proof, but they do not remove auth/session/tenant design, provider adapters, config contracts, tests, deployment shape, or runtime wiring from scope.

## Production readiness contract

Complete these decisions before phase work. Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.

- Auth/session/tenant boundary: define users/sessions, roles or ownership, tenant/privacy isolation, audit-relevant actions, and access-control behavior. If the mapped product has no auth, define the minimum product-appropriate local/session boundary and the migration path to real auth.
- Provider integration contract: define live provider adapters, env/config names, request/response/error contracts, deterministic test doubles, sandbox/live mode disclosure, and tests. Missing credentials block only live proof, not adapter/config/test implementation.
- Durable persistence contract: define database or storage choice, schema ownership, migrations, restart/readback proof, backup/export/delete semantics, retention, quotas, and sensitive data handling.
- Worker/runtime contract: define queue or job ownership, retries, cancellation, timeout behavior, failure recovery, progress persistence, idempotency, and dead-letter or repair handling for async/runtime work.
- Deployment and operations contract: define local dev, production build/run command, container or hosting shape, health/readiness checks, structured logging, metrics/tracing, rate/request-size limits, and CI gates.
- Browser/e2e contract: define repeatable Playwright or equivalent browser flows for major UI paths and states. Screenshots support evidence but do not replace automated e2e coverage for UI-bearing phases.
- Screenshot critique: browser proof must inspect screenshots as product artifacts, not only as assertion attachments.

## Workbench UX quality contract

UI-bearing work must define product-grade interaction and visual quality before phase work:

- UI architecture: use a real UI boundary and state model instead of embedded static markup or server-rendered test harness pages.
- Product composition: expose the workflow as a coherent product surface with navigation, primary actions, state regions, and recovery paths instead of unrelated stacked forms.
- Domain-specific affordances: represent the source product's core objects with domain-appropriate controls and visualization; raw text lists or generic dashboard cards are blockers when the domain needs richer inspection.
- Visual system: define typography, spacing, color, hierarchy, focus, disabled, alert, and responsive behavior. Default browser controls, pale status panels, and unstyled file inputs do not pass.
- State quality: empty, loading, error, blocked, success, and recovery states must be intentional and stable.
- Screenshot critique: screenshot review must reject local MVP visuals, plain admin forms, generic card stacks, raw text-list substitutes, unreadable density, missing focus/disabled states, and mobile/desktop overlap.

## Mapped contract anchors

Promote compiled product observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: mapped note api/records.ts records ingest capability; target route may differ if equivalent behavior is preserved.
- Request/response payloads and validation errors: submitted record requires validation for missing required fields and returns stored/readback result.
- Provider/runtime boundaries and env var names only: none required for this fixture.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: durable record storage and readback are required; optional exports must be labeled as runtime artifacts, e.g. runtime artifact `records.json`.
- UI flow/state anchors including empty/loading/error/blocked/success states: ingest form/list states are UI-bearing if implemented.

## Product obligation/surface matrix

- Surface id: SRC-INGEST-API
  - Mapping note: mapped note api/records.ts:1-20.
  - Product obligation: accept user-submitted records, validate required fields, persist results, and expose readback.
  - Target disposition: preserve | replace | merge | defer | drop. This fixture uses preserve.
  - Target contract: equivalent ingest and readback behavior; route/function names may change.
  - Compatibility impact: mapped route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/01-ingest-record.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No mapped surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Origin repository filenames such as package manifests, lockfiles, or route files are mapping notes, not packet file references. Label them as mapped notes instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in `selected-buildprint/`.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices should become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-ingest-record.md`
