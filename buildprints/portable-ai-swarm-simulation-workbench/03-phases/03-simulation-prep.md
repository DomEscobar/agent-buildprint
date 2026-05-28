# Phase 03 - Entity Filtering, Profiles, and Simulation Config

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

A user can select graph entities, create a simulation for Twitter and/or Reddit, prepare platform-specific profiles and config artifacts, observe preparation progress, preview/download artifacts, and continue to runtime only when required preparation is complete or honestly blocked.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: API workflow, worker preparation, generated artifact pipeline, and UI setup workbench.
- Shared proof spine: owned graph -> entity filter -> simulation create -> async prepare -> profile/config artifacts -> UI/API readback.

## Mapped product obligations

- Own `api.entities-filter`: list/detail/by-type filtering with optional edge enrichment.
- Own `api.simulation-create`: create/list/get simulation from project/graph and selected platforms.
- Own `worker.simulation-prepare`: profile/config generation with progress, failures, and force regenerate.
- Own `provider.oasis-profiles-twitter`: Twitter CSV profile artifact and realtime state.
- Own `provider.oasis-profiles-reddit`: Reddit JSON profile artifact and realtime state.
- Own `config.simulation-config`: preview, download, summarize, schema validate simulation config.
- Own `ui.env-setup`: Step 2 setup UI for profiles, config, progress, reasoning, next action.

## Behavior compatibility contract

- Target disposition values are preserve for filtering, create/list/get, preparation worker, profile artifacts, config, and setup UI.
- Equivalent target behavior preserves entity-to-profile/config preparation without route/function parity.
- Compatibility impact: artifact formats may be versioned only if schemas, previews, downloads, and runtime handoff are explicit.

## Implementation scope

- Implement entity reader adapter and filters by label/type/id with enrichment.
- Create durable simulation records tied to owner, project, graph, platform selection, status, errors, and timestamps.
- Prepare Twitter CSV and Reddit JSON profile artifacts plus simulation config.
- Expose progress, partial artifact readback, force regenerate, and download.
- Build setup UI with profile/config previews, blocked-provider/runtime states, progress, errors, and next action.

## Interfaces touched

- Entity API, simulation API/controllers, preparation worker, artifact store, graph/entity adapter, setup UI, download endpoints, owner/session guard.

## State/runtime touched

- Durable simulation, selected entities/platforms, profile artifacts, config artifact, preparation job state, progress/errors, schema versions. Missing live credentials or runtime dependencies block live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must show entity selection/readback, profile and config cards, progress, retries, blocked-provider/runtime notices, downloads, responsive states, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Owner checks on entity/simulation/artifact reads and downloads, no secrets in config previews, safe generated paths, artifact schema validation, redacted logs.

## Quality gates

- Entity filtering tests including missing graph and enrichment cases.
- Simulation create/list/get tests and dependency failures.
- Async prepare tests for progress, failure, force regenerate, artifact schemas, and downloads.
- Browser e2e for setup progress, previews, downloads, errors, and next action.

## Proof gate

Proof id: proof-03-simulation-prep

- phase_id: 03-simulation-prep
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- persistence_roundtrip
- artifact_schema_validation
- security_denied_path_test
- no_fake_scan_pass

## Repair routing

- current phase: failed entity filtering, simulation creation, preparation worker, artifacts, setup UI, or proof.
- `02-project-setup.md`: artifact/runtime ownership contradiction.
- `01-questions.md`: platform/runtime product fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading provider/runtime/browser blockers.
