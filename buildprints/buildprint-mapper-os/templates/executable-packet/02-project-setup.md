# Project Setup

This file is the project constitution for implementation. Keep it compact. It should contain mode-specific decisions an agent needs before phase work, not repeat the global execution protocol from `BUILDPRINT.md`, `03-phases/phase-flow.md`, `04-evaluation.md`, or `06-contracts/*`.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers authorize AI best-fit decisions grounded in mapped obligations.
- Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Full-suite packets default to production-grade architecture, not a local MVP.
- Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.

## Product / capability shape

- Blueprint mode:
  - Primary: <product|framework|integration|automation|library|data-pipeline|infrastructure|mixed>
  - Secondary: <ui/api/worker/provider/sdk/cli/agent/data/deployment as applicable>
  - Phase style: <outcome_flow|primitive_composition_map|callable_contract|boundary_transaction_contract|task_loop_contract|dataflow_contract|operations_contract|mixed_contract>
  - Why this mode fits: <source-grounded reason; do not force framework/integration/infra into product-app language>
- Product / capability: <mapped-app or framework/integration/automation/pipeline/infra name>
- For product / mixed: Primary user jobs, Frontend/UI surfaces, Backend/API surfaces, State/runtime surfaces.
- For framework / library: Public API surfaces, callable entry points, primitives, extension points, consumer patterns.
- For integration: External provider/service, boundary type, config/secrets, sandbox vs live split.
- For automation: Task scope, tool/action inventory, plan-execute-observe loop, stop conditions.
- For data-pipeline: Input datasets/schemas, transform stages, output artifacts, quality gates.
- For infrastructure: Target environment, resources managed, deploy/apply entrypoint, health/readiness shape.
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

Complete these decisions before phase work. Missing credentials block only live proof after implementation includes adapters, config contracts, tests, and runtime wiring. Paid-service approval or deployment authorization can also block only the matching live/deployment proof track after the local boundary exists.

- Auth/session/tenant boundary: define users/sessions, roles or ownership, tenant/privacy isolation, audit-relevant actions, and denied-path tests. If the mapped product has no auth, define the minimum local/session boundary plus migration path.
- Provider integration contract: define live provider adapters, env/config names, request/response/error contracts, deterministic test doubles, sandbox/live mode disclosure, and tests.
- Durable persistence contract: define database or storage choice, schema ownership, migrations, restart/readback proof, backup/export/delete semantics, retention, quotas, and sensitive data handling.
- Worker/runtime contract: define queue/job ownership, progress, retries, cancellation, timeout behavior, failure recovery, idempotency, and dead-letter or repair handling for async/runtime work.
- Deployment and operations contract: define local dev, production build/run command, container or hosting shape, health/readiness checks, structured logging, metrics/tracing, rate/request-size limits, and CI gates.
- Browser/e2e contract: define repeatable browser flows for major UI paths and states. Screenshots support evidence but do not replace automated e2e coverage for UI-bearing phases.
- Screenshot critique: UI/browser proof must inspect visual hierarchy, responsive behavior, accessibility, and local-MVP risk.

## Experience quality contract

Adapt this to the selected mode. UI-bearing outputs need product-grade UX; non-UI frameworks, libraries, CLIs, integrations, data pipelines, and infrastructure need product-grade developer/operator experience instead of fake UI requirements.

- UI architecture: for UI-bearing outputs, define the frontend/UI boundary. A full-suite browser product cannot pass as a single server file with embedded HTML/CSS/JS. For non-UI outputs, state `not UI-bearing` and define the callable/import/CLI/operator surface instead.
- Product composition: for products, define screens, navigation/workflow structure, primary jobs, status surfaces, and next-action model. For non-products, define primitive/API composition, command flow, provider boundary, task loop, dataflow, or operation sequence.
- Domain-specific affordances: use domain controls and visualizations where the product calls for graph, timeline, media, document, report, chat, or simulation interactions; otherwise define domain-specific DX/operator affordances such as typed examples, error messages, trace output, dry-run, rollback, or reference patterns.
- Visual system: for UI, define typography, spacing, color, density, surface hierarchy, focus/disabled states, alerts, and responsive behavior. For non-UI, define documentation/readability, API ergonomics, output format stability, logging, and discoverability.
- State quality: every major surface needs empty, loading, error, blocked-provider, success, and recovery states with stable layout or mode-equivalent states.
- Screenshot critique: if UI/browser proof is used, screenshots must reject quick local MVP, admin form, generic dashboard, or test harness visuals. For non-UI outputs, replace screenshots with import/API/CLI/provider/data/deployment proof and critique the consumer/operator experience.

## Mapped contract anchors

Promote compiled product observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers:
- Request/response payloads and validation errors:
- Provider/runtime boundaries and env var names only:
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior:
- UI flow/state anchors:

## Mapped obligation/surface matrix

Account for every high-signal mapped surface according to blueprint mode: product flows, framework primitives/composition rules, integration boundary transactions, automation task loops, dataflow contracts, infrastructure operations, user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this compact format:

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
|  | mapped note: <source evidence or Needs clarification/Blocked> |  | preserve \| replace \| merge \| defer \| drop \| blocked |  | `03-phases/<phase>.md` | <surface-specific proof gate> |

The "Mapped obligation" column label is required regardless of mode. "Product obligation", "Capability obligation", and "Operation obligation" are accepted aliases but "Mapped obligation" is the canonical label.
Rules:

- Mapped obligation entries must use Target disposition values: preserve | replace | merge | defer | drop | blocked.
- Every high-signal mapped surface must appear exactly once with one owning phase, or be marked dropped/blocked with rationale.
- If a surface is split, name one primary owning phase and supporting phases in the target contract; do not leave ambiguous shared ownership.
- Required proof must reference the owned surface specifically, not only “tests pass”, “app builds”, or “feature preserved”.
- Generic buckets like “simulation”, “dashboard”, “memory”, “reports”, “runtime”, or “core app” are invalid unless decomposed into sub-surfaces.
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
