# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped product obligations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped product obligations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Inferred project shape

- Product: Portable AI Swarm Simulation Workbench
- Mapped stack hints: MiroFish-style Flask API, Vue/Vite browser workbench, Docker-ready local/runtime packaging, OpenAI-compatible LLM adapters, Zep-compatible graph memory, OASIS/CAMEL-compatible simulation runtime, env-driven provider modes, and file-backed/object-storage persistence seams.
- Frontend/UI surfaces: infer from phase UX/UI requirements and mapped product obligations; preserve the Vue/Vite workbench behavior as a mapping note even if the implementation chooses a different browser framework.
- Backend/API surfaces: infer from phase interfaces touched and mapped product obligations; preserve the Flask-style route/task semantics as mapped contract anchors even if the implementation chooses a different server framework.
- State/runtime surfaces: infer from phase state/runtime touched and mapped product obligations.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Stack decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapped Flask/Vue/Vite mapped stack shape, Docker/runtime expectations, product requirements, and phase proof gates.
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

- Auth/session/tenant boundary: define users/sessions, ownership, tenant/privacy isolation, audit-relevant actions, upload ownership, and access-control behavior for projects, reports, histories, and generated artifacts. If the first implementation is local, keep a real session/project boundary and migration path to real auth.
- Provider integration contract: implement live provider adapters for LLM ontology/report generation, Zep-compatible graph memory, and OASIS/CAMEL-compatible simulation runtime behind env/config contracts, deterministic test doubles, error semantics, and integration tests. Missing credentials block only live proof, not adapter/config/test implementation.
- Durable persistence contract: define database/object storage ownership for uploads, parsed text, ontology, graph, simulation tasks, reports, interactions, exports, deletes, migrations, restart/readback, backup/export, retention, quotas, and sensitive data handling.
- Worker/runtime contract: define queue/job ownership for ontology generation, graph build, simulation run, report generation, retries, cancellation, timeout behavior, failure recovery, progress persistence, idempotency, and dead-letter or repair handling.
- Deployment and operations contract: define local dev and production build/run commands, container or hosting shape, health/readiness probes, structured logging, metrics/tracing, rate limits, upload/request-size limits, and CI gates.
- Browser/e2e contract: define repeatable Playwright or equivalent browser flows for upload-to-ontology, graph build, simulation setup/run, report/chat interaction, history/export/delete, and blocked-provider states. Screenshots support evidence but do not replace automated e2e coverage.

## Workbench UX quality contract

This product is a browser workbench, not an API demo. The implementation must define a product-grade UI architecture before phase work:

- UI architecture: use a real frontend boundary for user-facing surfaces. For a full-suite browser workbench, a single Python/Node server file with embedded HTML/CSS/JS is a scoped prototype only and must not pass `ux_design_gate` or `visual_quality_gate`.
- Product composition: expose the product as a staged workflow with persistent project context, phase/status navigation, graph/simulation/report areas, and clear next actions. Do not stack every phase as unrelated forms on one long page.
- Domain-specific affordances: graph output must be visually inspectable as graph/network or structured relationship workbench, not only as raw node/edge text lists. Simulation runtime must show timeline/progress/action activity, not only rows of status text. Reports and chat must read like an analysis workspace, not a textarea bolted under a form.
- Visual system: define tokens for typography, spacing, color, surface hierarchy, focus states, disabled states, alerts, and responsive layout. Default browser controls, unstyled file inputs, generic dashboard cards, and one-note pale panels fail the UX gate.
- State quality: every major workflow area must show intentional empty, loading, error, blocked-provider, success, and recovery states with useful copy and stable layout.
- Responsive/accessibility: prove at least desktop and mobile widths, keyboard-reachable primary actions, visible focus, no text overlap, and adequate contrast.
- Screenshot critique: after browser proof, inspect the screenshot as a product artifact. If the screenshot looks like a quick local MVP, plain admin form, generic card stack, or developer test harness, the UX review must be `blocker` even when Playwright assertions pass.

## Mapped contract anchors

Promote compiled product observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: graph upload/ontology, graph build, simulation configuration/runtime, reports/interactions, project history, reset/delete/export.
- Request/response payloads and validation errors: upload type/size validation, project/task IDs, ontology/graph/report payloads, task status/error payloads, export manifests, and blocked-provider responses.
- Provider/runtime boundaries and env var names only: LLM provider, Zep graph memory, OASIS/CAMEL simulation runtime, deterministic test doubles, and sandbox/live mode disclosure.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: uploads, parsed source text, ontology, graph nodes/edges, task state, reports, interactions, exports, reset/delete history, and generated runtime artifacts.
- UI flow/state anchors including empty/loading/error/blocked/success states: upload workbench, graph explorer, simulation setup/run monitor, report/chat view, history/export/delete screens.

## Product obligation/surface ledger

- Surface id: SRC-SWARM-WORKBENCH
  - Mapping note: mapped notes and mapped evidence for MiroFish upload, graph, simulation, report, interaction, history, and data lifecycle surfaces.
  - Product obligation: source-independent AI swarm simulation workbench from seed upload through report interaction and lifecycle management.
  - Target disposition: preserve | replace | merge | defer | drop. Preserve the product capability while allowing cleaner target architecture.
  - Target contract: equivalent target behavior for upload-to-ontology, graph build, simulation setup/run, report/chat interaction, history/export/delete, provider mode disclosure, and durable state.
  - Compatibility impact: route/function names may change; API/UX/data/provider behavior changes must be explicit in the owning phase. This is not route/function parity.
  - Phase(s): all files under `03-phases/`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No mapped surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline.

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
- Explicit task or handoff text is the only valid source of delegated role, allowed scope, proof command, and evidence requirements.

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
- For UI-facing work, browser proof must include a visual-quality review against the workbench UX quality contract. Functional Playwright assertions alone do not prove acceptable product UI.
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

- `03-phases/01-ingestion-ontology.md`
- `03-phases/02-graph-builder.md`
- `03-phases/03-simulation-setup.md`
- `03-phases/04-simulation-runtime.md`
- `03-phases/05-report-interaction.md`
- `03-phases/06-data-lifecycle.md`
