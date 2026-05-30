# Phase 01 - Few-Shot: Ingestion to Durable Readback

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`.
1a. Write `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml` with lead decision, user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
2. Confirm the implementation scaffold and local guidance files required by `02-project-setup.md` exist.
3. Implement the first real vertical path.
4. Verify with commands and browser/runtime artifacts.
5. Write `.buildprint/phase-runs/<phase-id>/proof.md`.
6. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

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
3. Declare which `## Final product at a glance` surfaces this phase delivers. This is mandatory for bidirectional coverage: every phase must name at least one glance surface, and every glance surface must be owned by exactly one phase.
4. List mapped obligations as capabilities/primitives/boundaries/tasks/dataflows/operations, not source route parity.
5. Define the smallest real proof path: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
6. Split `Core-pass required` from `Claim-upgrade or blocker tracks`.
7. Name interfaces, state, runtime, UX/DX/operator experience, and safety boundaries.
8. Require tests and browser/runtime/import/CLI/provider/data/deployment proof that match the mode and slice.
9. Give evidence rows that prove only what the command or artifact actually proves.
10. Route failures back to the current phase, setup, questions, prior dependency, or runtime evidence ledger.

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

```yaml
phase_contract:
  phase_id: 01-example-phase
  blueprint_mode: product
  phase_style: outcome_flow
  glance_surfaces:
    - Project workbench entry
    - Document upload
    - Ontology preview
  owned_surface_ids:
    - surface-project-workbench-entry
    - surface-document-upload
    - surface-ontology-preview
  core_pass_required:
    - criterion-api-upload-readback
    - criterion-ui-runtime-readback
    - criterion-persistence-roundtrip
    - criterion-security-denied-path
    - criterion-no-fake-scan
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-worker-retry-cancel-recovery
    - criterion-deployment-operations-proof
```

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this example is a UI-bearing product workbench phase, so it is written as a user/operator outcome flow.
- Glance surfaces delivered: Project workbench entry; Document upload; Ontology preview (as named in `BUILDPRINT.md` `## Final product at a glance`). Every generated phase must name the glance surfaces it delivers; a phase that names none is delivering invented scope.
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
- UI/controller contracts: upload flow, project readback, provider-blocked state, retry, reset, delete confirmation, next-action link to graph phase.
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

- clear workflow rail or step header showing this is the ingestion/ontology step, in product language (do not label it "Phase 01" or show Buildprint/proof vocabulary)
- dense but readable technical layout
- stable spacing and hierarchy across empty, loading, error, blocked, success, retry, reset, and deleted states
- focus, disabled, hover, and error states for controls
- mobile and desktop layouts without overlapping text or controls
- every visible control performs a real action: interactions such as zoom, pan, drag, and selection are gestures/handlers on the surface, not pills or buttons that merely name the capability; a control that does nothing is a dead control and fails the gate
- no scaffolding leak: raw internal ids (`project_…`, `graph_…`), "deterministic mode", "local contract proof only", "test-only", or other proof/test strings must not appear on the user-facing surface
- screenshot critique that rejects generic dashboards, raw text-list substitutes, single-file demo shells, default browser-control pages, capability-label pill rows, and leaked packet/phase/proof scaffolding

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
  "proof_type": "runtime_api",
  "provider_mode": "deterministic",
  "upgrades_claim": true,
  "claim_type": "core_pass"
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
  "proof_type": "blocker",
  "provider_mode": "missing_live_credentials",
  "upgrades_claim": false,
  "claim_type": "blocker",
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
  "proof_type": "security_review",
  "provider_mode": "deterministic",
  "upgrades_claim": true,
  "claim_type": "claim_upgrade"
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

Generated selected phases must use this heading set. The outcome and obligations headings shift with the declared mode; all other headings are constant.

```md
# Phase NN - <phase title>

## How to implement this phase
## Product outcome          (product mode)
## Capability outcome       (framework / library / integration / automation / data-pipeline)
## Operation outcome        (infrastructure)
## Phase mode contract      (blueprint_mode + phase_style + lens + shared proof spine)
## Mapped product obligations       (product mode)
## Mapped capability obligations    (framework / library / integration / automation / data-pipeline)
## Mapped operation obligations     (infrastructure)
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

---

## Per-mode positive few-shot examples

Use the right example as the structural pattern for each mode. Do not copy product nouns into non-product phases.

---

### Framework positive few-shot — primitive/composition map phase

```md
# Phase 01 — Record validator primitive and composition contract

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Capability outcome

Define and prove the reusable record-validation primitive: accept a record object, enforce required-field invariants, expose composition rules for downstream adapters, document extension points, and provide misuse cases with typed errors.

## Phase mode contract

- blueprint_mode: framework
- phase_style: primitive_composition_map
- Lens: this phase maps the primitive, invariants, composition rules, extension points, invalid states, and compatibility surface — not one downstream app story.
- Shared proof spine:
  - Preconditions/inputs: consumer imports or calls the validation primitive with record fields.
  - Entrypoint/use site: SDK import or callable API.
  - Execution behavior: enforce invariants, validate required fields, surface typed errors.
  - State/artifact effects: validation result, typed error contract, adapter write/read proof.
  - Observable proof: import/API/CLI tests prove primitive usage, invalid states, and adapter behavior.
  - Failure/recovery: missing fields, adapter failure, and idempotent writes fail clearly.
  - Non-goals: downstream UI product flow, live providers, worker lifecycle claims.

## Mapped capability obligations

- Obligation: PRIMITIVE-VALIDATE-RECORD
- Preserve: record input acceptance, required-field enforcement, typed error contract, and readback.
- Composition rules: validators can be composed with adapters; adapters must not bypass field invariants.
- Extension points: custom field validators may be registered; primitive core invariants must not be overridable.
- Misuse cases: null record, missing required field, unknown field types, empty string as required value.

## Behavior compatibility contract

- Disposition: preserve primitive capability; target callable API may differ from source route.
- Equivalent target behavior: primitive, invariants, composition, typed errors, and readback.
- Compatibility impact: mapped route name is evidence, not a mandatory clone target.

## UX/UI requirements

None — this phase is not UI-bearing. Consumer experience proof must include import/API/CLI usage examples for empty, validation error, success/readback, and recovery states. Screenshot critique applies only if an optional UI demo is added.

## Proof gate

- Proof id: proof-01-record-validator
- Required proofs: import_api_contract_trace, cli_or_reference_example_trace, persistence_roundtrip, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only
- Negative tests: rejects missing required fields, rejects misuse cases.
```

---

### Library positive few-shot — callable-contract phase

```md
# Phase 01 — HTTP client callable contract and semver surface

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Capability outcome

Define and prove the public HTTP client callable surface: typed request/response, error contract, semver/compat surface, and consumer import patterns.

## Phase mode contract

- blueprint_mode: library
- phase_style: callable_contract
- Lens: this phase defines the public API consumers import and call — typed contracts, semver boundaries, compat surface, and reference patterns.
- Shared proof spine:
  - Preconditions/inputs: consumer imports the library and calls the HTTP client with typed request options.
  - Entrypoint/use site: import/require call in consumer code.
  - Execution behavior: resolve typed request, execute against a fake/sandbox server, return typed response or typed error.
  - State/artifact effects: response object, error type, idempotency behavior.
  - Observable proof: import/API tests prove callable surface, response types, and error contract.
  - Failure/recovery: network error, timeout, invalid response, and semver-breaking change detect clearly.
  - Non-goals: downstream product UI, live third-party calls, worker queue.

## Mapped capability obligations

- Public API surface: named exports, TypeScript types, and JSDoc.
- Semver contract: patch: bug fixes only; minor: additive; major: breaking type or behavior change.
- Compat surface: consumers must import without knowing internal implementation.
- Reference patterns: at least one complete usage example per public method.

## UX/UI requirements

None — this phase is a library with no UI. Consumer experience proof must include at least one import/usage example, typed error demonstration, and semver compat validation test.

## Proof gate

- Proof id: proof-01-http-client
- Required proofs: import_api_contract_trace, fake_provider_proof, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only
```

---

### Integration positive few-shot — boundary transaction contract phase

```md
# Phase 01 — Stripe payment intent boundary transaction

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Capability outcome

Implement and prove the Stripe payment intent boundary: config/secrets, request/response contract, webhook/callback dispatch, idempotency, retry/error mapping, sandbox/live split, and fake-provider tests.

## Phase mode contract

- blueprint_mode: integration
- phase_style: boundary_transaction_contract
- Lens: this phase defines the external boundary transaction — config, request/response, webhook dispatch, idempotency, sandbox/live split, and fake-provider behavior — not a generic product feature.
- Shared proof spine:
  - Preconditions/inputs: Stripe API key in env; idempotency key per request.
  - Entrypoint/use site: service calls the payment adapter with a typed payment request.
  - Execution behavior: validate config, build request, call fake/sandbox Stripe API, parse response, map errors.
  - State/artifact effects: payment intent record, idempotency key stored, webhook event dispatched.
  - Observable proof: fake-provider tests prove request shape, response mapping, idempotency, error mapping, and webhook dispatch.
  - Failure/recovery: invalid key, rate limit, card decline, webhook signature mismatch, duplicate idempotency key fail with typed errors.
  - Non-goals: billing UI, product checkout flow, deployment.

## Mapped capability obligations

- Config/secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`; fail-closed when missing.
- Request/response: typed `PaymentIntentRequest` and `PaymentIntentResult`; error envelope for decline/network/rate-limit.
- Webhook/callback: verify signature, dispatch typed event, record audit row.
- Idempotency: per-request idempotency key required; duplicate key returns stored result.
- Sandbox/live split: sandbox mode for tests; live mode requires credentials and integration approval.

## UX/UI requirements

None — this is a provider integration with no UI. Operator experience proof includes config status endpoint, webhook dispatch log, and error map reference.

## Proof gate

- Proof id: proof-01-stripe-payment
- Required proofs: fake_provider_proof, provider_adapter_config_test_required, live_provider_proof_blocker_only, no_fake_scan_pass, security_denied_path_test
- Negative tests: missing config fails closed; duplicate idempotency key returns cached result; invalid webhook signature is rejected.
```

---

### Automation positive few-shot — task loop contract phase

```md
# Phase 01 — Document summarization agent task loop

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Capability outcome

Define and prove the document summarization agent task loop: task objective, tool/action inventory, plan/execute/observe loop, stop conditions, human approval points, recovery/escalation, and trace proof.

## Phase mode contract

- blueprint_mode: automation
- phase_style: task_loop_contract
- Lens: this phase defines the task loop contract — objective, tool boundaries, plan/execute/observe loop, stop conditions, approval points, and trace proof — not a checklist of features.
- Shared proof spine:
  - Preconditions/inputs: input document path, max iterations, approval-required flag.
  - Entrypoint/use site: agent runner receives task descriptor and executes the loop.
  - Execution behavior: plan action, select tool, call tool, observe result, reflect, repeat until stop condition met.
  - State/artifact effects: task trace log, summary artifact, intermediate observations, approval checkpoint records.
  - Observable proof: trace proves loop execution, tool calls, stop condition trigger, and at least one approval point.
  - Failure/recovery: tool failure, token limit, max iterations reached, human rejection at approval point.
  - Non-goals: multi-agent coordination, deployment, UI.

## Mapped capability obligations

- Task objective: summarize input document into structured sections.
- Tool/action inventory: read_file, chunk_text, call_llm_summarize, write_output.
- Plan/execute/observe loop: agent plans next action, executes tool, observes output, reflects.
- Stop conditions: all sections summarized; max_iterations reached; human rejection at approval point.
- Approval points: before writing final output when approval_required is true.
- Recovery/escalation: on tool failure, retry once; on max retries, escalate with trace artifact.

## UX/UI requirements

None — this phase has no browser UI. Operator experience proof includes the trace log artifact, approval checkpoint file, and readable summary output.

## Proof gate

- Proof id: proof-01-doc-summarization
- Required proofs: automation_trace_proof, provider_adapter_config_test_required, live_provider_proof_blocker_only, no_fake_scan_pass
- Negative tests: max_iterations stop condition halts the loop; tool failure triggers escalation; human rejection at approval point halts execution.
```

---

### Data-pipeline positive few-shot — dataflow contract phase

```md
# Phase 01 — Event ingestion and enrichment dataflow

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Capability outcome

Define and prove the event ingestion and enrichment dataflow: input schema, transform semantics, output schema, lineage, backfill/idempotency, and data quality proof.

## Phase mode contract

- blueprint_mode: data-pipeline
- phase_style: dataflow_contract
- Lens: this phase defines the dataflow contract — input datasets/schemas, transform semantics, output artifacts, lineage, backfill/idempotency, and quality proof — not a UI or API product feature.
- Shared proof spine:
  - Preconditions/inputs: raw events in `events` table or source JSONL.
  - Entrypoint/use site: pipeline runner reads input schema and executes the transform DAG.
  - Execution behavior: validate input schema, apply enrichment transform, write to `enriched_events`, record lineage row.
  - State/artifact effects: `enriched_events` table, lineage record, quality assertion results.
  - Observable proof: schema validation test, transform proof with sample data, lineage assertion, at least one data quality check.
  - Failure/recovery: invalid schema, missing event fields, duplicate idempotency key, quality threshold failure.
  - Non-goals: serving API, UI, downstream ML training.

## Mapped capability obligations

- Input schema: `events(id, type, payload, created_at)`.
- Transform: enrich `type` field with category lookup; add `enriched_at` timestamp.
- Output schema: `enriched_events(id, type, category, payload, created_at, enriched_at)`.
- Lineage: append one lineage row per pipeline run recording source version, transform version, row counts.
- Backfill/idempotency: re-running the same run_id produces the same output rows; duplicate rows are deduplicated.
- Data quality: row count matches input; no null `category` for known types; latency within SLA.

## UX/UI requirements

None — this phase is a data-pipeline with no browser UI. Operator experience proof includes lineage record, quality assertion output, and schema-validation report.

## Proof gate

- Proof id: proof-01-event-enrichment
- Required proofs: dataflow_quality_proof, durable_persistence, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only
- Negative tests: invalid input schema rejects the batch; duplicate run_id is idempotent; quality threshold breach fails the gate.
```

---

### Infrastructure positive few-shot — operations contract phase

```md
# Phase 01 — Kubernetes API service deploy and health operations

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`. Execute through phase-flow; block evidence until phase-flow artifacts exist.

## Operation outcome

Define and prove the API service Kubernetes deployment operations: deploy/apply entrypoint, resources changed, health/readiness, rollback, drift detection, observability, and environment proof.

## Phase mode contract

- blueprint_mode: infrastructure
- phase_style: operations_contract
- Lens: this phase defines the operations contract — deploy/apply, resources changed, health/readiness, rollback, drift detection, observability, and permissions — not a UI or API product feature.
- Shared proof spine:
  - Preconditions/inputs: Kubernetes cluster access; image tag; target namespace.
  - Entrypoint/use site: `kubectl apply -f manifests/` or Helm install.
  - Execution behavior: apply Deployment, Service, ConfigMap; wait for rollout; assert health/readiness.
  - State/artifact effects: Deployment revision bumped; readiness probe passes; rollback available.
  - Observable proof: health/readiness probe response, rollout status, and at least one drift-detection assertion.
  - Failure/recovery: rollout failure triggers automatic rollback; drift from declared state is detected and reported.
  - Non-goals: application feature development, product UI, CI pipeline design.

## Mapped operation obligations

- Deploy/apply entrypoint: `kubectl apply -f manifests/api-service/`.
- Resources changed: Deployment `api-service`, Service `api-service`, ConfigMap `api-config`.
- Health/readiness: `/healthz` returns 200 within 30 s; `/readyz` returns 200 when DB migrations complete.
- Rollback: previous Deployment revision is retained; rollback command is documented.
- Drift detection: `kubectl diff` detects undeclared changes; CI gate fails on drift.
- Observability: structured logs to stdout; Prometheus metrics at `/metrics`; liveness/readiness exposed.
- Permissions: deploy service account has namespace-scoped `create/update/patch` only.

## UX/UI requirements

None — this phase is infrastructure with no browser UI. Operator experience proof includes health/readiness endpoint response, rollout status output, and drift-detection CI report.

## Proof gate

- Proof id: proof-01-k8s-api-deploy
- Required proofs: operations_health_rollback_proof, no_fake_scan_pass, security_denied_path_test
- Negative tests: invalid image tag fails rollout and triggers rollback; drift from declared state is detected by `kubectl diff`.
```
