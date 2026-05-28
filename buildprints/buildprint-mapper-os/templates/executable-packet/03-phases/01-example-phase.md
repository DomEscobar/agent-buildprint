# Phase 01 - Few-Shot: Ingestion to Durable Readback

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`.
2. Resolve every role in `requires_roles` to `06-contracts/<role>.md`.
3. Write `.buildprint/phase-runs/<phase-id>/team-gates.md`.
4. Write bounded handoffs and returns for every required role, unless the active packet's phase-flow explicitly allows compact self-simulation.
5. Implement the first real vertical path.
6. Review architecture, UX, and QA.
7. Verify with commands and browser/runtime artifacts.
8. Write `.buildprint/phase-runs/<phase-id>/proof.md`.
9. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Few-shot target

This is not a generic phase placeholder. It is a few-shot reference for Mapper OS phase generation: copy the pattern, not the product nouns.

Target agent: Codex/GPT-style coding agent executing a Mapper OS selected Buildprint.

Optimization goal: produce phase Markdown that prevents fake MVP completion by showing a small real vertical slice, explicit proof ceilings, role gates, repair routing, and narrow evidence rows.

## Context to preserve

- Mapper OS phases are not wish lists. Each phase must define one coherent product slice that can be implemented, verified, reviewed, and recorded.
- A phase may be production-grade in architecture without fully qualifying every production claim in one run.
- `phase_core_passed` means the owned local path works end to end with real persistence and proof.
- `claim_qualified` means a specific live-provider, browser, worker, security, deployment, or lifecycle claim has direct matching evidence.
- Missing credentials, paid services, deployment approval, unavailable browser tooling, or unavailable worker infrastructure may create non-upgrading blocker rows only after the adapter/config/test/runtime boundary exists.
- Do not upgrade claims from review prose, route-shaped handlers, static screenshots, string checks, deterministic mocks alone, or in-memory state.

## Few-shot pattern to copy

When generating a selected phase, use this sequence:

1. Classify the blueprint mode and phase style before choosing language.
2. Name the meaningful capability in the right lens: `## Product outcome` for product mode, `## Capability outcome` for framework/library/integration/automation/data phases, or `## Operation outcome` for infrastructure/operations phases.
3. List mapped obligations as capabilities/primitives/boundaries/tasks/dataflows/operations, not source route parity.
4. Define the smallest real proof path: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
5. Split `Core-pass required` from `Claim-upgrade or blocker tracks`.
6. Name interfaces, state, runtime, UX/DX/operator experience, and safety boundaries.
7. Require tests and browser/runtime/import/CLI/provider/data/deployment proof that match the mode and slice.
8. Give evidence rows that prove only what the command or artifact actually proves.
9. Route failures back to the current phase, setup, questions, prior dependency, or runtime evidence ledger.

## Negative few-shot - bad phase slice

Do not generate phases like this:

```md
## Product outcome
Users can upload files and get AI insights.

## Implementation scope
Create an upload route, call the LLM, show a dashboard, and save results.

## Quality gates
Run tests.

## Proof gate
Screenshots and deterministic provider prove the phase.
```

Why this fails:

- It assumes product-app language and would be even worse for a framework, integration, automation, data pipeline, or infrastructure packet.
- "AI insights" is not a product contract.
- It does not define owner/session behavior, file validation, extraction semantics, persistence, provider modes, blocked states, or readback.
- It lets route-shaped handlers pass without a service/domain/storage boundary.
- It treats screenshots and deterministic output as proof for broader production claims.
- It gives no evidence ceiling, no repair routing, and no distinction between core completion and claim qualification.

## Positive few-shot - prime phase slice

The following example shows the expected level of specificity.

For non-product selected packets, rename the outcome heading to `## Capability outcome` or `## Operation outcome`, and rename mapped obligations to `## Mapped capability obligations` or `## Mapped operation obligations`. Keep the same proof spine.

## Product outcome

A user can create an owned project by uploading text or Markdown seed documents plus a natural-language prediction requirement. The system validates the files, extracts text, generates a deterministic ontology preview with entity and relationship types, stores project metadata, upload records, extracted text, and ontology data durably, then shows the result in the workbench with empty, loading, validation-error, provider-blocked, success, retry, reset, and deleted states.

PDF support is not required for `phase_core_passed` unless the selected product explicitly makes PDF the first required upload format. If PDF extraction is not implemented, the UI and API must reject PDF with a clear non-upgrading blocker or unsupported-file response.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this example is a UI-bearing product workbench phase, so it is written as a user/operator outcome flow.
- Shared proof spine:
  - Preconditions/inputs: project owner/session exists; text or Markdown files and prediction requirement are available.
  - Entrypoint/use site: user submits the upload/ontology form or equivalent API/controller action.
  - Execution behavior: validate files, extract text, call deterministic/live ontology adapter, persist project and ontology.
  - State/artifact effects: owner, project, upload records, extracted text, ontology JSON, status, errors, timestamps.
  - Observable proof: API readback, UI success preview, restart/readback, validation and denied-path tests.
  - Failure/recovery: missing requirement/files, unsupported file, extraction failure, provider blocked, cross-owner denial, reset/delete recovery.
  - Non-goals: graph memory, simulation setup, report generation, agent chat, deployment, and live provider calls beyond blocked/live-proof tracks.
- Framework/library adaptation: if this were a framework packet, replace this product flow with primitive, invariants, composition rules, reference patterns, extension points, invalid states, compatibility surface, and proof examples.
- Integration adaptation: if this were a provider/plugin packet, replace this product flow with boundary transaction, config/secrets, request/response, webhook/callback, idempotency, retry/error mapping, sandbox/live split, persistence/audit, and fake-provider proof.
- Automation adaptation: if this were an agent packet, replace this product flow with task objective, tool/action boundaries, plan/execute/observe loop, evidence requirements, stop conditions, approval points, recovery/escalation, and trace proof.

## Mapped product obligations

- Preserve the mapped upload plus ontology-generation product boundary.
- Preserve seed-document intake, text extraction, preprocessing, project metadata, total text length, prediction requirement, ontology entity definitions, relationship definitions, and analysis summary.
- Preserve project get/list/delete/reset behavior, hardened with owner/session checks and destructive-action confirmation.
- Preserve the LLM provider boundary through an adapter. Deterministic mode is required for tests; missing `LLM_API_KEY` blocks only live-provider proof.

## Behavior compatibility contract

- Upload and ontology endpoint: preserve the user-visible boundary. Route names may change only if the frontend adapter and API docs are updated together.
- Project metadata store: may replace source-shaped file storage with database or object storage only if durable readback, ownership, delete/reset, and migration semantics are implemented; the equivalent target behavior and compatibility impact must be explicit.
- LLM ontology generator: preserve behavior through `OntologyProvider` or an equivalent adapter with deterministic and live modes.
- Error envelope: preserve clear success/data/error semantics for missing requirement, missing files, unsupported type, extraction failure, provider blocked, denied owner access, and project not found.

## Implementation scope

Implement the smallest real vertical path:

- local-owner or authenticated project creation
- multipart upload for `.txt`, `.md`, and `.markdown`
- file size, extension, MIME, safe-name, and path traversal validation
- text extraction and normalization for text/Markdown
- deterministic ontology generation test double
- live LLM adapter seam with fail-closed missing-config behavior
- durable persistence for owner, project, upload record, extracted text, ontology, status, errors, and timestamps
- project create/get/list/delete/reset API paths
- upload UI that submits through the real controller/API boundary and reads back the persisted project
- success preview showing extracted-text summary, entity types, relationship types, provider mode, and next action

Do not implement graph memory, simulation setup, report generation, agent chat, deployment, or live provider calls in this phase except as explicit disabled/blocked next actions.

## Core-pass required

`phase_core_passed` requires all of the following:

- API/domain/persistence path works from upload to ontology readback.
- UI path performs at least one real user action through UI -> controller/API -> service -> persistence -> visible readback.
- Text/Markdown extraction is real and tested.
- Deterministic ontology output is clearly labeled as deterministic/test mode.
- Missing live LLM config produces a blocked-provider state, not fake success.
- Owner/session checks prevent cross-owner read/delete/reset.
- Delete/reset requires confirmation and is verified.
- Runtime evidence rows are narrow and match the commands or artifacts that produced them.
- The phase mode contract is reflected in implementation proof; product UI proof, framework import/API proof, integration fake/sandbox proof, automation trace proof, data validation proof, or infrastructure health/rollback proof must match the selected mode.

## Claim-upgrade or blocker tracks

These tracks can upgrade claims only with direct matching proof. If not implemented or not runnable, record non-upgrading blocker rows with `blocks_continuation: false` when the core path is still valid.

- Live LLM ontology proof: requires real credentials, live request/response artifact, redacted logs, and adapter config proof.
- PDF extraction: requires real parser behavior, malformed-PDF handling, and extraction-failure tests.
- Worker retry/cancel/recovery: requires an actual queued ontology job, persisted progress, timeout, retry, cancel, and recovery tests.
- Migration/retention/backup/export: requires migration command, restart/readback proof, upload limits, delete/reset lifecycle, and backup/export artifact proof.
- Browser/e2e and visual quality: requires browser automation plus inspected screenshots on desktop and mobile.
- Deployment/operations: requires production build/run, health/readiness, logs, and deployment or container proof.

Do not claim these tracks from review prose, generic smoke tests, static screenshots, string checks, or deterministic provider output alone.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: project create/get/list/delete/reset, upload and ontology generation, provider config status.
- Provider/tool contracts: LLM-compatible ontology adapter with deterministic and live modes.
- UI/controller contracts: upload flow, project readback, provider-blocked state, retry, reset, delete confirmation, next-action handoff to graph phase.
- None - reason: not applicable only if this phase is converted to a non-interactive backend-only product, which this example is not.

## State/runtime touched

- Database/persistence: owner, project, upload records, extracted text, ontology JSON, status, errors, created/updated timestamps.
- Env/config: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, upload size/type limits, secret/session config, deterministic-provider flag.
- Jobs/workers/runtime: synchronous ontology generation is acceptable for core local proof only when bounded by file-size limits. Any worker claim requires a real queue, progress persistence, retry, cancel, timeout, and recovery proof.
- Production runtime: define queue ownership, restart behavior, health/readiness hooks, redacted structured logs, and observability points before upgrading runtime claims.
- Data lifecycle: define migrations, upload limits, retention/delete/export, backup/readback, object/file storage, sensitive-data handling, and safe cleanup before upgrading lifecycle claims.
- Runtime artifacts/generated outputs: uploaded seed files, extracted text records, ontology JSON, project metadata, browser screenshots, API traces, and proof logs are runtime artifacts owned by the implementation project, not packet files.

## UX/UI requirements

The upload surface must be a polished workbench step, not a default form stack.

Required UI elements:

- project name input
- prediction requirement input
- file picker or drop zone
- selected-file review with type, size, validation state, and remove action
- upload/extraction/ontology progress
- blocked-provider state with missing-config explanation and retry path
- extraction-failed state with actionable error
- success preview with extracted-text summary, entity types, relationship types, provider mode, and next action to graph build
- project list/readback, reset confirmation, delete confirmation, and deleted state

Visual contract:

- clear workflow rail or step header showing this is the ingestion/ontology step
- dense but readable technical layout
- stable spacing and hierarchy across empty, loading, error, blocked, success, retry, reset, and deleted states
- focus, disabled, hover, and error states for controls
- mobile and desktop layouts without overlapping text or controls
- screenshot critique that rejects generic dashboards, raw text-list substitutes, single-file demo shells, and default browser-control pages

## Safety/security constraints

- Secrets stay server-side and are never rendered in UI, logs, screenshots, or evidence.
- Enforce owner/session checks on create, get, list, delete, reset, upload, and provider-status paths.
- Enforce content length, file count, extension, MIME, safe-name, and path traversal checks.
- Do not allow arbitrary file reads, absolute paths, remote URLs, or archive extraction as upload inputs.
- Apply rate/request-size limits or record a non-upgrading blocker if the runtime does not support them yet.
- Redact request bodies and provider errors where seed documents may contain sensitive material.
- Delete and reset require confirmation and must be covered by denied-path or destructive-action tests.

## Quality gates

Required for `phase_core_passed`:

- Unit tests for file validation, safe names, text/Markdown extraction, deterministic ontology adapter, project persistence, and denied owner access.
- API/integration test for upload -> ontology -> persisted readback.
- API/integration tests for missing requirement, missing files, unsupported type, extraction failure, provider blocked, project not found, cross-owner denied, reset, and delete.
- UI/browser test for upload flow, provider-blocked state, success preview, retry or reset, delete confirmation, and responsive layout.
- Restart/readback proof for persisted project, extracted text, and ontology.
- No-fake scan proving deterministic labels exist and hardcoded green success is absent.

Claim-upgrade gates:

- Live-provider proof only after adapter/config/test/runtime wiring exists.
- Worker proof only from actual queued job retry/cancel/recovery tests.
- Data-lifecycle proof only from actual migration, retention/delete/export, backup/readback, and upload-limit commands.
- Visual-quality proof only from browser screenshots inspected against the UX contract.

## Proof gate

Proof id: proof-01-example-phase

Core-pass proof tracks:

- unit_or_integration_test
- provider_adapter_config_test_required
- runtime_or_browser_trace
- persistence_roundtrip
- security_denied_path_test
- repeatable_browser_e2e_for_core_path
- visual_quality_gate_for_core_path
- no_fake_scan_pass
- evidence_ledger_entry

Claim-upgrade or non-upgrading blocker tracks:

- live_provider_proof_blocker_only
- pdf_extraction_proof
- worker_retry_cancel_recovery
- migration_retention_backup_upload_limits
- deployment_operations_proof
- public_auth_tenant_hardening

Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, data-lifecycle, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

Live credentials, paid services, external deployment approval, unavailable browser tooling, or missing worker infrastructure may block claim qualification only after the core adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

Required runtime evidence rows must use `phase_id: 01-example-phase` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Evidence row few-shot

Passing core API row:

```json
{
  "artifact_id": "proof-01-api-upload-readback",
  "type": "runtime_trace",
  "phase_id": "01-example-phase",
  "status": "passed",
  "source": ".buildprint/phase-runs/01-example-phase/proof.md#api-upload-readback",
  "proves": ["unit_or_integration_test", "runtime_or_browser_trace", "persistence_roundtrip"],
  "proof_type": "api_integration_test",
  "provider_mode": "deterministic",
  "upgrades_claim": true
}
```

Non-upgrading live-provider blocker row:

```json
{
  "artifact_id": "proof-01-live-llm-blocked",
  "type": "provider_blocker",
  "phase_id": "01-example-phase",
  "status": "blocked",
  "source": ".buildprint/phase-runs/01-example-phase/proof.md#live-provider-blocker",
  "proves": ["live_provider_proof_blocker_only"],
  "proof_type": "provider_config_blocker",
  "provider_mode": "missing_live_credentials",
  "upgrades_claim": false,
  "blocks_continuation": false
}
```

Bad overclaim row:

```json
{
  "artifact_id": "proof-01-everything",
  "type": "review_artifact",
  "phase_id": "01-example-phase",
  "status": "passed",
  "source": ".buildprint/phase-runs/01-example-phase/reviews/qa.md",
  "proves": ["live_provider_proof_blocker_only", "worker_retry_cancel_recovery", "visual_quality_gate_for_core_path"],
  "proof_type": "review",
  "provider_mode": "deterministic",
  "upgrades_claim": true
}
```

Why the bad row fails:

- Review prose cannot upgrade implementation proof.
- Deterministic provider mode cannot prove live provider behavior.
- Worker recovery and visual quality require separate executable proof or screenshot/browser artifacts.
- The `proves` array is broader than the source artifact.

## Implementation loop

Observe -> Plan -> Execute -> Verify -> Reflect -> Record

## Repair routing

If this phase fails verification, return here before editing again.

- Architecture contradiction -> `02-project-setup.md`
- Missing product-defining human choice -> `01-questions.md`
- Missing dependency from prior work -> required prior phase or setup gate
- Failed test/build/runtime/UI/proof -> this phase file
- Live provider, deployment, browser, worker, or lifecycle proof unavailable after core wiring exists -> `.buildprint/evidence/evidence-ledger.jsonl` as a non-upgrading blocker row
- Packet seed-only issue -> `05-evidence/evidence-ledger.jsonl`

Do not continue to the next phase if the core path does not persist state, cannot be read back, has unresolved security/destructive ambiguity, fails tests, or only proves static UI.

## Output skeleton for generated phases

Generated selected phases should keep this heading set unless the phase is explicitly non-UI or non-provider:

```md
# Phase NN - <phase title>

## How to implement this phase
## Product outcome
## Mapped product obligations
## Behavior compatibility contract
## Implementation scope
## Core-pass required
## Claim-upgrade or blocker tracks
## Interfaces touched
## State/runtime touched
## UX/UI requirements
## Safety/security constraints
## Quality gates
## Proof gate
## Evidence row few-shot
## Implementation loop
## Repair routing
```

For a non-UI phase, keep `## UX/UI requirements` and write `None - reason:` plus downstream UI obligations. For a non-provider phase, keep provider sections only when an adapter, tool, external service, or runtime boundary exists.
