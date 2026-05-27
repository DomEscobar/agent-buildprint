# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped mapped observations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Product shape

- Product: Portable Novel-to-Storyboard Pipeline
- Frontend/UI surfaces: infer from phase UX/UI requirements and mapped observations.
- Backend/API surfaces: infer from phase interfaces touched and mapped observations.
- State/runtime surfaces: infer from phase state/runtime touched and mapped observations.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapped source, product requirements, and phase proof gates.
- Package manager:
  - Decision: choose source-faithful or ecosystem-standard default.
  - Evidence: lockfiles/workspace evidence if available.
- Data/storage:
  - Decision: real persistence where the product requires durable state.
  - Evidence: state/runtime requirements in phases.
- Auth/providers/deployment:
  - Decision: best-fit default unless credentials, cost, or irreversible deployment choices require human confirmation.

## Production readiness contract

Production-grade architecture is the default for the selected full-suite packet. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, media/export seams, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define local login/session, project ownership, API/realtime channel protection, provider key handling, export ownership, and hosted/multi-user blockers before exposing claims.
- Provider integration contract: implement model/LLM/image/media/storyboard adapter seams, deterministic proof adapters, live config validation, fail-closed missing-credential behavior, cost/latency labels, and tests that do not upgrade deterministic adapters to live providers.
- Durable persistence contract: define users, settings, projects, novel source text, extracted events, scripts, assets, storyboard entities, media previews, exports, evidence reports, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define ingestion, extraction, script generation, storyboard generation, media preview/export jobs, status/progress, cancellation, retry/failure recovery, and restart behavior.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, metrics/traces, upload limits, export limits, CI/browser/export gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for project setup, novel ingestion, script workspace, storyboard board, media preview, export, blocked provider states, desktop/mobile screenshots, accessibility, and no-overlap responsive behavior.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: local login, project add/edit/get, novel ingestion, script workspace, storyboard flow, media preview/export, and safety/runtime boundary surfaces are source anchors only.
- Request/response payloads and validation errors: project metadata, model/provider settings, novel source input, extracted events, generated script/storyboard records, media preview/export manifests, and blocked/error states must be explicit.
- Provider/runtime boundaries and env var names only: model, media, storyboard, export, and storage providers sit behind adapters; live credentials are never required for deterministic proof.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: generated output: scripts/storyboards/media previews/exports; runtime artifact: evidence reports and browser screenshots.
- UI flow/state anchors including empty/loading/error/blocked/success states: project setup, ingestion, script workspace, storyboard board, media task states, export manifest, and provider-blocked states must be visible.

## Product obligation/surface matrix

- Surface id: SRC-AUTH-PROJECT
  - Source anchor: local login, project metadata, settings, and DB initialization surfaces.
  - Source capability: authenticated project workspace and persisted project/provider settings.
  - Target disposition: preserve
  - Target contract: equivalent workspace/auth/settings behavior with deterministic local proof.
  - Compatibility impact: not route/function parity; target may use cleaner services.
  - Phase(s): `03-phases/01-project-workspace-auth.md`.
- Surface id: SRC-NOVEL-INGESTION
  - Source anchor: novel/source ingestion and event extraction surfaces.
  - Source capability: ingest novel text and derive structured narrative events.
  - Target disposition: preserve
  - Target contract: equivalent ingestion, validation, extraction, persistence, and readback behavior.
  - Compatibility impact: provider choices may differ; semantics and proof remain.
  - Phase(s): `03-phases/02-novel-event-ingestion.md`.
- Surface id: SRC-SCRIPT-ASSETS
  - Source anchor: script workspace and asset generation surfaces.
  - Source capability: transform events into script beats, assets, and editable workspace state.
  - Target disposition: preserve
  - Target contract: equivalent script/asset workflow with deterministic proof adapters.
  - Compatibility impact: UI and API shape can improve while preserving behavior.
  - Phase(s): `03-phases/03-script-agent-assets.md`.
- Surface id: SRC-STORYBOARD-FLOW
  - Source anchor: production storyboard board and workflow surfaces.
  - Source capability: create, edit, and review storyboard sequence from script/assets.
  - Target disposition: preserve
  - Target contract: equivalent storyboard board with states, persistence, and browser proof.
  - Compatibility impact: route/function parity is not required.
  - Phase(s): `03-phases/04-production-storyboard-flow.md`.
- Surface id: SRC-MEDIA-EXPORT
  - Source anchor: media preview/export surfaces.
  - Source capability: preview media tasks and export a manifest/artifact set.
  - Target disposition: preserve
  - Target contract: equivalent media preview/export lifecycle with blocked/live-provider honesty.
  - Compatibility impact: live provider proof is separate.
  - Phase(s): `03-phases/05-media-preview-export.md`.
- Surface id: SRC-SAFETY-RUNTIME
  - Source anchor: auth/channel/provider/export/runtime safety surfaces.
  - Source capability: protect secrets, projects, destructive actions, providers, and runtime claims.
  - Target disposition: preserve
  - Target contract: equivalent safety, evidence, and claim-boundary behavior.
  - Compatibility impact: production security claims require direct proof.
  - Phase(s): `03-phases/06-safety-runtime-boundary.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- Target disposition values are `preserve | replace | merge | defer | drop`.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames are source anchors, not packet file references.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files.

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

- `03-phases/01-project-workspace-auth.md`
- `03-phases/02-novel-event-ingestion.md`
- `03-phases/03-script-agent-assets.md`
- `03-phases/04-production-storyboard-flow.md`
- `03-phases/05-media-preview-export.md`
- `03-phases/06-safety-runtime-boundary.md`
