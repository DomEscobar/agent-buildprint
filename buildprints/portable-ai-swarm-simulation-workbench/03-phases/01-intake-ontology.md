# Phase 01 - Intake, Ontology, and Project State

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: create the phase-flow required artifacts, resolve every role through `06-contracts/<role>.md`, write handoff and return artifacts for every role, implement, verify, review, write proof, and only then append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`. The packet seed ledger `05-evidence/evidence-ledger.jsonl` is read-only context.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

A user can create an owned MiroFish project from seed files and a prediction requirement, receive a deterministic or live ontology preview, and read back durable project state with upload, extraction, reset, delete, blocked-provider, and validation states.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: UI-bearing product workflow with API, provider, persistence, and admin lifecycle boundaries.
- Shared proof spine: user/API input -> validation -> extraction -> ontology adapter -> durable project state -> visible/API readback -> denied-path and destructive-action proof.

## Mapped product obligations

- Own `home.intake-upload`: browser upload, requirement entry, empty/loading/error/success states, project readback.
- Own `api.ontology-generate`: multipart validation, extraction, ontology generation, project creation, typed failures.
- Own `service.file-extraction`: PDF/MD/TXT policy, upload limits, safe storage, malformed file behavior.
- Own `provider.llm-ontology`: deterministic ontology adapter, live adapter config, fail-closed missing credentials.
- Own `data.project-persistence`: replace source file-only persistence with durable DB/object storage and restart/readback.
- Own `admin.project-list-delete-reset`: get/list/delete/reset with owner checks, confirmation, and cleanup.

## Behavior compatibility contract

- Target disposition values are preserve for intake, ontology, extraction, provider adapter, and admin lifecycle; replace for project persistence.
- Equivalent target behavior is required for upload, ontology, project readback, list, reset, and delete even if routes or functions are renamed.
- Compatibility impact: replacing storage is allowed only when durable readback, owner isolation, cleanup, and migration semantics are proven.

## Implementation scope

- Implement local-owner or authenticated project ownership.
- Validate multipart files, file count, size, extension, MIME, safe names, and traversal attempts.
- Extract and normalize text from supported formats; reject unsupported or malformed inputs clearly.
- Generate ontology through deterministic and live-mode adapter boundaries.
- Persist project metadata, uploads, extracted text, ontology, status, errors, owner, and timestamps.
- Implement project get/list/reset/delete and a browser workbench intake path.

## Interfaces touched

- Browser intake/controller surface, project API/controllers, ontology service, upload parser, project repository, LLM adapter, owner/session guard.

## State/runtime touched

- Durable owner/project/upload/extracted-text/ontology records, upload artifacts, provider config names, validation errors, delete/reset cleanup outputs. Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must be a polished workbench step with file picker/drop zone, requirement input, selected-file review, progress, blocked-provider state, success ontology preview, reset/delete confirmation, visible next action, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Secrets stay server-side. Enforce owner/session checks, upload size/type/path controls, destructive confirmation, redacted logs/evidence, and denied cross-owner tests.

## Quality gates

- Unit tests for validation, extraction, ontology adapter, persistence, owner denial, reset/delete cleanup.
- API/integration upload -> ontology -> persisted readback, plus missing requirement/files, unsupported/malformed file, provider blocked, not found, denied owner.
- Browser e2e for intake, blocked-provider, success, reset/delete, responsive states.
- Restart/readback and no-fake scan.

## Proof gate

Proof id: proof-01-intake-ontology

- phase_id: 01-intake-ontology
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery blocker row only if async ontology workers are claimed
- repeatable_browser_e2e
- visual_quality_gate
- persistence_roundtrip
- security_denied_path_test
- no_fake_scan_pass

## Repair routing

- current phase: failed validation, extraction, ontology adapter, project lifecycle, UI, or proof.
- `02-project-setup.md`: architecture or persistence contradiction.
- `01-questions.md`: credentialed, destructive, expensive, or product-defining fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading live LLM/browser/deployment blockers.
