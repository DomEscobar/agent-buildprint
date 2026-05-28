# Phase 01 - Seed Intake And Ontology Workbench

## How to implement this phase

Before writing code, read: packet file `03-phases/phase-flow.md`, runtime continuity file `.buildprint/next-agent.md`, and current project `AGENTS.md`. Then resolve requires_roles through `06-contracts/<role>.md`, create phase-flow required artifacts, and block runtime evidence until plan, team-gates, handoffs, returns, reviews, and proof exist.

requires_roles: [product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence]

## Product outcome

A user can start MiroFish by selecting seed documents, writing a prediction requirement, submitting the intake, watching ontology generation progress, and landing in a workbench that reads back the persisted project, extracted text summary, ontology entity/relationship definitions, provider mode, errors, and next action to build graph memory.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this is a UI-bearing product outcome flow from first user action to durable ontology readback.
- Shared proof spine:
  - Preconditions/inputs: owner/session exists; seed files and prediction requirement are supplied.
  - Entrypoint/use site: browser intake surface and equivalent API/controller action.
  - Execution behavior: validate files and request, extract text, call deterministic/live LLM ontology adapter, persist project and ontology.
  - State/artifact effects: owner/session, project metadata, uploaded files, extracted text, ontology JSON, analysis summary, status, errors, timestamps.
  - Observable proof: UI upload path, API readback, restart/readback, invalid-input tests, blocked-provider state.
  - Failure/recovery: missing files, missing requirement, unsupported type, oversized file, extraction failure, missing LLM config, provider error, denied project access, reset/delete.
  - Non-goals: Zep graph build, simulation setup, OASIS run, report generation, and chat.

## Mapped product obligations

- Preserve seed-document intake for PDF, Markdown, text, and multiple files.
- Preserve natural-language prediction requirement and optional project naming/context.
- Preserve extracted text, total length, ontology entity/edge definitions, analysis summary, project create/get/list/delete/reset behavior, and next-step handoff.
- Preserve LLM provider boundary through adapters. Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Behavior compatibility contract

- preserve: Upload plus ontology product boundary remains the first required workflow step.
- replace: route names, framework, storage backend, and component structure may change when equivalent target behavior and compatibility impact are explicit.
- merge: project list/history can be merged with the intake shell if deletion/reset/readback remain visible and tested.
- defer: graph visualization and simulation affordances must be disabled or shown as next steps until later phases own them.
- drop: source-specific static marketing assets may be replaced by product-grade workbench identity.

## Implementation scope

Implement the smallest real vertical path: owner/session boundary, seed intake UI, file review/removal, request validation, safe upload parsing, text extraction, deterministic ontology adapter, live LLM adapter seam, durable project state, create/get/list/delete/reset APIs, workbench readback, provider-blocked state, and bilingual-ready user copy.

## Interfaces touched

- UI/controller contracts: intake form, selected-file review, validation, submit, progress, ontology preview, project list/readback, reset/delete confirmation.
- API/routes/adapters: project lifecycle, ontology generation, provider status.
- Provider/tool contracts: LLM ontology adapter with deterministic and live modes.
- Resolve required roles through `06-contracts/<role>.md`; write handoff and return artifacts before phase_core_passed.

## State/runtime touched

- Durable state: owner/session, project, file records, extracted text, ontology JSON, status, analysis summary, timestamps, errors.
- Runtime artifacts/generated outputs: uploaded seed files and extracted text records are implementation runtime artifacts, not packet files.
- Env/config: LLM provider key/base/model env names only, upload limits, deterministic-provider flag, secret/session config.
- Upstream inputs: none except user-provided files and prompt. Downstream artifacts such as graph id and simulations are not owned by this phase.

## UX/UI requirements

This phase is UI-bearing. The intake surface must be a polished prediction workbench start, not stacked default forms. Required states: empty, drag-over, files selected, validation error, loading, provider-blocked, success, retry, reset confirmation, delete confirmation, and mobile/desktop layouts. Screenshot critique must reject default browser controls, generic cards, raw text-list substitutes, local MVP screens, overlapping text, and weak hierarchy.

## Safety/security constraints

Keep secrets server-side; redact uploaded content in logs/evidence; enforce owner/session checks; validate extension, MIME, size, safe names, path traversal, empty files, and malformed PDF/text; deny cross-owner get/delete/reset; require destructive confirmation; rate/request-size limits must exist or be a non-upgrading blocker.

## Quality gates

Required: unit tests for validation/extraction/ontology adapter/project store; integration tests for upload -> ontology -> persisted readback; negative tests for missing requirement/files, unsupported type, provider blocked, denied access, reset/delete; browser/e2e for intake and readback; restart/readback proof; no_fake_scan_pass.

## Proof gate

Proof id: proof-01-seed-ontology-workbench

Runtime evidence must use `phase_id: 01-seed-ontology-workbench` and append only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; packet file `05-evidence/evidence-ledger.jsonl` remains seed-only.

Core tracks: provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, persistence_roundtrip, security_denied_path_test, repeatable_browser_e2e, visual_quality_gate, no_fake_scan_pass.

## Repair routing

- Current phase: test/build/runtime/UI/proof failures, provider blocked UI, upload validation defects, or broad evidence rows.
- Packet file `02-project-setup.md`: architecture contradictions, missing base project structure, missing persistence/provider boundaries.
- Packet file `01-questions.md`: irreversible product identity, paid provider, destructive, credentialed, or public deployment fork.
- Required prior phase: none.
- Runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`: live credential blocker, browser tooling blocker, or deployment blocker. Do not mark current phase complete from checkpoint_recorded alone.
