# Phase 02 — Project And Source Writing Studio

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/02-project-source-studio/plan.md` and proof exist.

## Product outcome

A creator can create a project, import or edit source writing, split or organize chapters, extract story events, and create script episode records. The studio shows empty, importing, extracting, validation error, retry, success, and restart-readback states so users understand what text is ready for agent scripting.

## Phase mode contract

blueprint_mode: product

phase_style: outcome_flow

Glance surfaces delivered: Project and source writing studio

This phase uses a product outcome flow because the user-facing result is a durable project/source workspace that later agents and media workflows consume.

## Mapped product obligations

- Project records with creative metadata, art/video preferences, director/visual notes, and ownership.
- Novel/source chapters, event extraction states, script/episode records, validation, and durable readback.

## Behavior compatibility contract

Preserve the observable workflow from quick start: create project, import source, extract events, prepare script episodes. Target architecture may rename tables/routes while preserving payload semantics, validation errors, and restart durability.

## Implementation scope

- Project list/create/edit/delete with ownership checks.
- Source writing import/edit/chapter management and event extraction job request.
- Script episode records with content, extract state, error reason, timestamps, and project association.
- UI flows for project creation, chapter table/detail, event graph/list, script episode readiness.

## Interfaces touched

Browser project/source studio, API controllers for projects/source/events/scripts, domain services, validation schemas, repositories, event-extraction worker enqueue.

## State/runtime touched

Owns projects, source chapters, event records/links, script episodes, import metadata, extraction job state, and audit events. Reads authenticated user/session from Phase 01. Downstream agents read these artifacts but do not own them.

## UX/UI requirements

Use production-writing affordances: searchable project list, chapter/event side-by-side review, clear extraction progress, retry/error banners, durable saved indicators, and responsive layouts. Avoid raw textareas as the entire product.

## Safety/security constraints

Project ownership enforcement, input size limits, safe text handling, no production text in logs/evidence, and undo/confirmation for deletes.

## Quality gates

- Unit tests for schemas and repositories.
- Integration tests for create/import/extract-state/update/delete.
- Browser e2e for project creation and source import.
- Restart/readback proof for project, chapter, event, and script records.
- `verify:no-fake` and `PHASE_ID=02-project-source-studio verify:phase-artifacts`.

## Proof gate

Required labels: `durable_persistence`, `repeatable_browser_e2e`, `security_boundary`, `no_fake`.

Proof must show a project with imported source reloads after restart with chapters, event state, and script episode records intact. If AI event extraction provider is unavailable, record a blocked-provider state only after deterministic extraction job state and retry path exist.

## Repair routing

Persistence, validation, browser, or extraction-state failures route to this phase. Missing runtime auth routes to Phase 01.

