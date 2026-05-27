# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped product obligations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped product obligations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Inferred project shape

- Product: <mapped-app>
- Frontend/UI surfaces: list the mapped screens, flows, states, and interaction entry points. Do not leave this as a generic placeholder when mapped product obligations exists.
- Backend/API surfaces: list mapped route/API/job/provider contract families with prefixes, request/response shape notes, and side effects. Do not leave this as a generic placeholder when mapped product obligations exists.
- State/runtime surfaces: list mapped durable state, task/runtime state, provider/runtime dependencies, files/artifacts, import/export, and lifecycle operations. Do not leave this as a generic placeholder when mapped product obligations exists.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Stack decisions

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

## Workbench UX quality contract

If the selected output has a browser UI, define this before phase work:

- UI architecture: the implementation must have an explicit frontend/UI boundary. A full-suite browser product cannot pass as a single server file with embedded HTML/CSS/JS unless the selected scope is explicitly tiny and non-product.
- Product composition: define the screens, navigation/workflow structure, primary jobs, status surfaces, and next-action model. Do not let agents stack independent forms and call it a workbench.
- Domain-specific affordances: replace raw text lists with appropriate domain controls and visualizations where the product calls for graph, timeline, media, document, report, or chat interactions.
- Visual system: define typography, spacing, color, density, surface hierarchy, focus/disabled states, alerts, and responsive behavior. Default browser controls, generic dashboard cards, and one-note pale panels fail visual QA.
- State quality: every major surface needs intentional empty, loading, error, blocked-provider, success, and recovery states with useful copy and stable layout.
- Screenshot critique: browser proof must be visually inspected. If the screenshot reads as a quick local MVP, admin form, generic dashboard, or test harness, the UX review is a blocker even when tests pass.

## Mapped contract anchors

Promote compiled product observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers:
- Request/response payloads and validation errors:
- Provider/runtime boundaries and env var names only:
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: label future product outputs as runtime artifacts/generated outputs, not packet files.
- UI flow/state anchors including empty/loading/error/blocked/success states:


## Product obligation/surface ledger

Before phase work, account for every high-signal mapped surface from the mapper census/evidence: user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this format for each entry:

- Surface id:
  - Mapping note: mapped note plus line/section or route/job/provider marker.
  - Product obligation: what user/product capability this surface provides.
  - Target disposition: preserve | replace | merge | defer | drop.
  - Target contract: equivalent target behavior or explicit out-of-scope reason.
  - Compatibility impact: API/UX/data/provider behavior that changes, if any.
  - Phase(s): `03-phases/<phase>.md` or blocker/evaluation destination.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No mapped surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Origin repository filenames such as package manifests, lockfiles, or route files are mapping notes, not packet file references. Label them as mapped notes instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in `selected-buildprint/`.

If a mapped contract cannot be made self-contained, record the blocker before phase work instead of relying on the original repository checkout.

## Architecture rules

- Preserve product behavior and mapped product obligations; frameworks are replaceable when behavior and proof remain intact.
- Keep dependency direction explicit: UI -> application/service -> domain -> data/provider adapters.
- Keep routes/controllers thin; put business rules in domain/service layers.
- Put external API/provider/database access behind adapters or repositories.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as a prototype blocker.
- Generated code must be marked and regenerated through documented commands.
- Defaults must be appropriate, evidence-grounded, and no more complex than the product needs.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, product-faithful behavior.
- UX/UI: polished flows, empty/loading/error/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/tenant/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, env/config, workers/jobs, runtime observability.
- QA/evaluation: tests, build, browser/runtime checks, evidence quality, no fake proof.
- Security/infra: secrets, destructive actions, external writes, deployment and cost approvals.


## Execution authority model

- Root/local `AGENTS.md` files in the implementation project are scope governors, not product brains. They preserve architecture, safety, quality gates, and local workflow; they do not broaden the current phase.
- `.buildprint/next-agent.md` is continuity for fresh sessions. It must identify current phase, objective, recommended next action, known blockers, and which phase-run artifacts already exist.
- `03-phases/phase-flow.md` is the executable phase-entry constitution. It controls how each phase begins, how roles are assembled, how bounded handoffs are created, and when evidence may be appended.
- Explicit task or handoff text is the only valid source of delegated role, allowed scope, proof command, and evidence requirements. Do not rely on workers guessing their authority.

## Delegation and handoff protocol

For each phase, the orchestrating main session must create bounded assignments before delegating or simulating specialist work. Each assignment includes phase id, proof gate, files to read, allowed edit scope, non-goals, success criteria, verification command, evidence row requirements, and risks/blockers. Specialist workers return changed files, proof results, an evidence row draft, and risks. The orchestrator reviews and integrates their output, runs the phase proof gate, appends runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, and updates `.buildprint/progress.md` plus `.buildprint/next-agent.md` before moving on. Vague global delegation is invalid.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: project shape, architecture rules, quality gates, safety/permissions, workflow, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, packages/ui, data/db, infra, or tests/e2e.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, or architecture invariants.

## Runtime setup artifact

Before starting any `03-phases/*` work, the implementation workspace must write `.buildprint/setup.md` or files under `.buildprint/setup/`. This is not packet content and must not be copied into `selected-buildprint/`.

The setup artifact must record concrete decisions for:

- auth/session/tenant or ownership boundary
- provider adapters, env/config names, deterministic test doubles, live-proof blockers
- durable persistence, schema/storage ownership, readback/restart behavior
- worker/runtime model, queue/retry/cancel/recovery ownership, or explicit synchronous-phase limitation
- deployment/operations shape, health/logging/metrics/CI expectations, and local dev command
- browser/e2e and screenshot proof plan for UI-bearing phases
- product-grade visual QA plan for UI-bearing phases, including anti-patterns that block `ux_design_gate`
- safety/permission rules for secrets, destructive actions, paid services, external writes, and deployments
- verification commands required before evidence rows may upgrade claims

Creating only `AGENTS.md` is not enough to satisfy the setup gate.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For UI-facing work, browser proof must include visual-quality review against the workbench UX quality contract. Functional Playwright assertions alone do not prove acceptable product UI.
- For backend/provider/state work, verify real request/path, persistence/readback, or record an honest blocker.
- For production-grade work, implement auth/session/tenant, provider adapter/config/test, durable persistence, worker/runtime, deployment/ops, and repeatable e2e paths that are applicable to the phase before accepting live-proof blockers.
- Do not skip tests, hide failures, or upgrade claims without proof.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, or public data changes.

Never commit secrets, private logs, credentials, or provider tokens.

## Open questions and assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices should become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-example-phase.md`
