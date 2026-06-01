# Phase 1: Scenario Intake And Ontology Review

## Phase mode contract

- `phase_id`: `01-scenario-ontology-intake`
- `blueprint_mode`: `product`
- `phase_style`: `outcome_flow`
- Outcome: the user can create or reload a scenario from seed files and a prediction request, then inspect the generated social ontology before graph construction.
- Owned surfaces: `surface-scenario-intake-console`, `surface-ontology-review-lane`

## Preconditions and inputs

- Accepted files: PDF, Markdown, `.md`, `.txt`, and `.markdown`; reject unsupported files before upload.
- Required user input: non-empty prediction/simulation requirement.
- Optional inputs: project name, additional context, locale.
- Provider mode: live LLM when configured; deterministic sandbox ontology generator when credentials are absent.

## Implementation scope

Build a real scenario intake flow:

- drag/drop and browse upload with per-file display, remove action, disabled/loading state, and validation messages;
- project creation that stores files, extracted text, total text length, requirement, timestamps, and error state;
- ontology generation that returns entity types, relationship types, attributes, examples, source/target pairs, and analysis summary;
- project list/reload enough to reopen a created scenario after restart;
- honest failed states for empty requirement, missing files, unsupported file type, parser failure, and missing live provider credentials.

The ontology must stay domain-shaped. Entities are people, organizations, institutions, media outlets, agencies, companies, communities, or other subjects that can plausibly speak or act in a public simulation. Relationship types must express influence, affiliation, reporting, support, opposition, response, regulation, or comparable social links.

## Interfaces touched

- Browser intake console and ontology lane.
- API endpoints for project create/read/list/delete/reset, ontology generation, file parsing, and project persistence.
- Provider adapter for LLM ontology generation and deterministic sandbox fallback.
- Storage for project metadata, original upload references, extracted text, and ontology JSON.

## State and artifact effects

- Create a stable `project_id`.
- Persist `project.json`, uploaded file metadata, extracted text, ontology JSON, analysis summary, status, and error.
- Reloading by `project_id` restores the same scenario without resubmitting files.

## UX/UI requirements

- The intake screen should feel like a simulation console, not a marketing landing page or default upload form.
- The ontology lane must make entity and relationship definitions inspectable: clicking a type opens attributes, examples, description, and relation source/target pairs.
- Empty, loading, processing, success, and error states must be visually distinct.
- Do not represent ontology as loose decorative tags only; each tag must open meaningful details.

## Safety/security constraints

- Never log or expose uploaded document contents beyond explicit user-visible previews needed for the product.
- Enforce file type and size limits.
- Record env var names only; no secret values.
- Missing LLM credentials block live-provider proof but do not block deterministic local flow.

## Quality gates

- `proof-scenario-intake-roundtrip`: automated API or integration test creates a scenario, persists files/extracted text/ontology, restarts or reloads storage, and fetches the same scenario.
- `proof-ontology-domain-validation`: test verifies entity/relationship shape, reserved-name handling, required fallback types or equivalent fallback behavior, and input-sensitive deterministic output.
- `proof-intake-ui-browser`: browser test exercises upload validation, requirement validation, submit, ontology inspection click, and reload.

## Proof gate

This phase reaches `phase_core_passed` only when the intake-to-ontology path works locally with durable state and the UI proof shows user actions changing visible state. Live LLM proof may remain a non-upgrading blocker row if credentials are unavailable.

## Failure/recovery

Failures must leave the project in a recoverable state with an error message, no fake success status, and a retry path. If the parser cannot extract text, the UI should identify the file and preserve the user's requirement.

## Non-goals

- No graph canvas work beyond linking to the next phase.
- No simulation run, report generation, or chat in this phase.

## Source evidence

- `source/MiroFish/frontend/src/views/Home.vue:136` upload zone accepts files.
- `source/MiroFish/frontend/src/views/Home.vue:181` captures the simulation prompt.
- `source/MiroFish/frontend/src/views/Home.vue:238` requires prompt and files before submit.
- `source/MiroFish/backend/app/api/graph.py:122` defines ontology generation.
- `source/MiroFish/backend/app/api/graph.py:175` creates project state.
- `source/MiroFish/backend/app/api/graph.py:210` persists extracted text.
- `source/MiroFish/backend/app/services/ontology_generator.py:29` defines social ontology generation.
- `source/MiroFish/backend/app/models/project.py:168` saves project metadata.

## Repair routing

- Parser/provider/persistence failures -> this phase.
- Architecture storage contradiction -> `02-project-setup.md`.
- Missing credential for live LLM proof -> blocker evidence row with `provider_mode: live`.
