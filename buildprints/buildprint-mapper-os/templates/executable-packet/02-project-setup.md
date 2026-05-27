# Project Setup

This file is the project constitution for implementation. Keep it compact. It should contain product-specific decisions an agent needs before phase work, not repeat the global execution protocol from `BUILDPRINT.md`, `03-phases/phase-flow.md`, `04-evaluation.md`, or `06-contracts/*`.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers authorize AI best-fit decisions grounded in mapped product obligations.
- Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Full-suite packets default to production-grade architecture, not a local MVP.

## Product shape

- Product: <mapped-app>
- Primary user jobs:
- Frontend/UI surfaces:
- Backend/API surfaces:
- State/runtime surfaces:
- External providers/runtime:
- Tests/evaluation source: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record concrete decisions the implementation project must follow:

- Framework/runtime:
  - Decision:
  - Why this fits:
- Package/build system:
  - Decision:
  - Why this fits:
- Module topology:
  - Decision: name frontend, API/controller, service/domain, provider adapter, repository/store, worker/runtime, security, and test boundaries.
  - Why this prevents local-MVP collapse:
- Data/storage:
  - Decision:
  - Restart/readback requirement:
- Auth/providers/deployment:
  - Decision:
  - Live-proof blockers:

## Production readiness contract

Complete these decisions before phase work. Missing credentials, paid-service approval, or deployment authorization can block live proof only after implementation includes adapters, config contracts, tests, and runtime wiring.

- Auth/session/tenant boundary: define users/sessions, roles or ownership, tenant/privacy isolation, audit-relevant actions, and denied-path tests. If the mapped product has no auth, define the minimum local/session boundary plus migration path.
- Provider integration contract: define live provider adapters, env/config names, request/response/error contracts, deterministic test doubles, sandbox/live mode disclosure, and tests.
- Durable persistence contract: define database or storage choice, schema ownership, migrations, restart/readback proof, backup/export/delete semantics, retention, quotas, and sensitive data handling.
- Worker/runtime contract: define queue/job ownership, progress, retries, cancellation, timeout behavior, failure recovery, idempotency, and dead-letter or repair handling for async/runtime work.
- Deployment and operations contract: define local dev, production build/run command, container or hosting shape, health/readiness checks, structured logging, metrics/tracing, rate/request-size limits, and CI gates.
- Browser/e2e contract: define repeatable browser flows for major UI paths and states. Screenshots support evidence but do not replace automated e2e coverage for UI-bearing phases.
- Screenshot critique: UI/browser proof must inspect visual hierarchy, responsive behavior, accessibility, and local-MVP risk.

## Workbench UX quality contract

Use this only when the selected output has UI:

- UI architecture: define the frontend/UI boundary. A full-suite browser product cannot pass as a single server file with embedded HTML/CSS/JS.
- Product composition: define screens, navigation/workflow structure, primary jobs, status surfaces, and next-action model.
- Domain-specific affordances: use domain controls and visualizations where the product calls for graph, timeline, media, document, report, chat, or simulation interactions.
- Visual system: define typography, spacing, color, density, surface hierarchy, focus/disabled states, alerts, and responsive behavior.
- State quality: every major surface needs empty, loading, error, blocked-provider, success, and recovery states with stable layout.
- Screenshot critique: if a screenshot reads as a quick local MVP, admin form, generic dashboard, or test harness, UX review is a blocker even when tests pass.

## Mapped contract anchors

Promote compiled product observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers:
- Request/response payloads and validation errors:
- Provider/runtime boundaries and env var names only:
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior:
- UI flow/state anchors:

## Product obligation/surface matrix

Account for every high-signal mapped surface: user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this compact format:

| Surface id | Product obligation | Target disposition | Target contract | Owning phase |
|---|---|---|---|---|
|  |  | preserve \| replace \| merge \| defer \| drop |  | `03-phases/<phase>.md` |

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No mapped surface may disappear silently.
- Source repo filenames are mapping notes, not packet-file references.
- Future implementation outputs are runtime artifacts or generated outputs, not packet files.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

For each unresolved choice that affects implementation, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and `.buildprint/setup.md` without inventing architecture.

Initial phase set:

- `03-phases/01-example-phase.md`
