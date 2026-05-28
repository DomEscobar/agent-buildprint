# Phase 02: Simulation Preparation Dataflow

## How to implement this phase

phase_id: 02-simulation-preparation-dataflow

Before writing code, read:

- Packet file `03-phases/phase-flow.md`
- Runtime artifact `.buildprint/next-agent.md` if it exists
- `AGENTS.md` in the implementation project
- Packet file `02-project-setup.md`
- Packet file `01-questions.md`
- Resolve requires_roles through `06-contracts/<role>.md`
- Packet file `06-contracts/product-architect.md`
- Packet file `06-contracts/ux-ui-craft.md`
- Packet file `06-contracts/integration-runtime.md`
- Packet file `06-contracts/security-boundary.md`
- Packet file `06-contracts/data-persistence.md`
- Packet file `06-contracts/test-and-verification.md`

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification]

Follow phase-flow required artifacts before code and before evidence. Packet seed evidence remains in packet file `05-evidence/evidence-ledger.jsonl`; runtime evidence belongs only in `.buildprint/evidence/evidence-ledger.jsonl`.

A handoff and return artifact is required for every role in requires_roles before phase_core_passed.

## Phase mode contract

blueprint_mode: data-pipeline
phase_style: dataflow_contract

This phase is a dataflow contract. It transforms Zep entity/profile context and project document context into OASIS-ready simulation profiles, platform config, previewable artifacts, and data quality readbacks with schema, transform, lineage, idempotency, backfill, and data quality proof.

## Capability outcome

Create and prepare a simulation from a project graph, producing durable Twitter/Reddit profile artifacts and `simulation_config` content that the OASIS runtime phase can consume. The workbench must show profile/config progress, partial files, final summaries, and blocked-provider states.

## Mapped capability obligations

- Preserve entity/stat reads with type filtering, detail lookup, edge enrichment, pagination, retry/error mapping, and not-found behavior.
- Preserve simulation creation from project/graph with Twitter and Reddit enable flags and missing project/graph validation.
- Preserve preparation dataflow from graph entities and document context to OASIS agent profiles, platform-specific files, and runtime configuration.
- Preserve realtime profile/config reads for missing file, partial JSON/CSV, final summary, and concurrent write tolerance.
- Preserve environment setup UI with simulation id, time/agent/platform parameters, profile preview, config preview, progress, partial-data state, and blocked-provider state.

## Behavior compatibility contract

Target disposition: preserve/replace. Equivalent target behavior is required, not route/function parity. The phase may replace storage formats if it still provides explicit schema ownership, transform rules, lineage from graph/document inputs to generated artifacts, idempotency/backfill through force_regenerate, and downstream OASIS compatibility.

Compatibility impact:

- Entity APIs may be renamed, but filters, detail, by-type behavior, retry/error mapping, and graph context must remain.
- Generated artifacts may be normalized, but Twitter CSV, Reddit JSON or compatible platform-profile exports, and simulation config must be available for runtime and download phases.
- Missing live Zep credentials cannot remove entity/config adapters; provider_adapter_config_test_required and live_provider_proof_blocker_only still apply.

## Implementation scope

Implement simulation state creation, entity reader adapter, preparation task, profile/config repository, schema validators, progress/read APIs, force_regenerate semantics, partial/final readers, and the setup UI surface. Include deterministic graph/entity fixtures as test inputs only, never production truth.

## Interfaces touched

- API/controller endpoints for entity list/detail/by-type, simulation create/read, prepare start/status, profile/config realtime reads.
- Domain services for entity normalization, profile transform, platform config transform, lineage metadata, backfill/idempotency, and data quality checks.
- Persistence for simulation state, generated profiles, config files, task progress, partial write handling, and readback.
- Browser setup view with profile/config previews, parameter controls, partial/final progress, and disabled reasons.

## State/runtime touched

Own simulation state, platform enable flags, preparation task state, generated profile/config artifacts, lineage metadata, force_regenerate state, and data quality reports. State must support durable readback and safe overwrite/backfill semantics.

## UX/UI requirements

This phase is UI-bearing because users inspect preparation progress and generated artifacts. The setup view must show schema-valid previews, partial-data labels, progress, missing graph/provider blockers, and retry/force controls with clear consequences. UI proof needs repeatable_browser_e2e, visual_quality_gate, Screenshot critique, responsive layout, and no raw text-list substitute for profile/config inspection.

## Safety/security constraints

Do not expose raw private project text unnecessarily in profiles, logs, screenshots, or evidence. Validate generated schemas before runtime handoff. Treat force_regenerate as destructive overwrite of generated artifacts with confirmation or explicit disabled reason. Provider and storage errors must be redacted and mapped.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- schema_validation_for_profiles_and_config
- transform_lineage_assertions
- force_regenerate_backfill_idempotency
- data_quality_assertions_for_required_profile_fields

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: profile_config_schema_lineage_quality_proof.

Required proof includes entity filter/detail/not-found tests, simulation create/readback tests, schema validation, transform lineage proof, idempotency/backfill on force_regenerate, partial/final profile/config read proof, browser preparation proof, blocked live-provider row when needed, and evidence row with phase_id: 02-simulation-preparation-dataflow.

## Repair routing

Repair the current phase for schema, transform, lineage, preparation, UI, persistence, or adapter failures. Route missing graph prerequisites to Phase 01. Route architecture contradictions to packet file `02-project-setup.md`. Route product/credential forks to packet file `01-questions.md`. Record non-upgrading live-provider blockers only in `.buildprint/evidence/evidence-ledger.jsonl`.
