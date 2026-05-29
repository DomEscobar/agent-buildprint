# Phase 03 - Simulation Environment Preparation

## How to implement this phase

Before writing code, read: packet file `03-phases/phase-flow.md`, runtime continuity file `.buildprint/next-agent.md`, and current project `AGENTS.md`. Then resolve requires_roles through `06-contracts/<role>.md`, create phase-flow required artifacts, and block runtime evidence until plan, team-gates, handoffs, returns, reviews, and proof exist.

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence]

## Product outcome

A user can create a simulation from a graph-backed project, prepare the environment by selecting entity filters/platforms, generate agent profiles and simulation config, watch staged progress, inspect generated profiles/config, reuse an already prepared environment, force regeneration with confirmation, and proceed to simulation run.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this outcome flow turns graph entities into an executable simulation environment the user can inspect before running.
- Shared proof spine:
  - Preconditions/inputs: Phase 02 graph id and project requirement exist.
  - Entrypoint/use site: user opens setup step and starts prepare.
  - Execution behavior: create simulation, read/filter entities, generate profiles, generate config, persist runtime artifacts, expose progress.
  - State/artifact effects: simulation state, expected entity count, entity types, profile files, simulation config, prepare task, errors.
  - Observable proof: setup UI path, prepare status traces, artifact readback, idempotent already-prepared path.
  - Failure/recovery: missing graph/project/requirement, missing LLM/Zep config, profile-generation error, config-generation error, forced regenerate, denied access.
  - Non-goals: launching OASIS process, live action stream, reports, and chat.

## Mapped product obligations

- Preserve simulation create from project/graph with Twitter/Reddit platform flags.
- Preserve prepare workflow: read filtered entities, generate OASIS-compatible profiles, generate LLM simulation config, save runtime artifacts, and report staged progress.
- Preserve realtime profile/config readback where available.
- Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Behavior compatibility contract

- preserve: create simulation, prepare/status, profiles/config retrieval, idempotent already-prepared check, force regeneration.
- replace: storage location, queue, profile generator internals, config schema details may change when equivalent target behavior and compatibility impact are explicit.
- merge: direct profile generation endpoint may be folded into prepare if developer/operator access remains available through tests or admin surface.
- defer: simulation run process, action feed, IPC, report generation, and interviews belong to later phases.
- drop: copying source scripts into simulation folders is not required if runtime commands are reproducible and audited.

## Implementation scope

Implement simulation state store, create API, prepare worker with stage progress, entity reader adapter, profile generator adapter, config generator adapter, deterministic/fake provider tests, generated profile/config artifact storage, setup UI, force-regenerate confirmation, platform toggles, profile/config preview, blocked states, and owner/session checks.

## Interfaces touched

- API/controller contracts: create, prepare, prepare/status, get simulation, list/history, profiles/realtime, config/realtime, config download.
- Provider/tool contracts: graph entity reader, LLM profile/config generation, deterministic test doubles.
- UI/controller contracts: setup panel, graph sidecar, staged progress, entity/profile/config previews, force regenerate, proceed.
- Resolve required roles through `06-contracts/<role>.md`; write handoff and return artifacts before phase_core_passed.

## State/runtime touched

- Durable state: simulation id, project id, graph id, status, platform flags, entity counts/types, profile artifacts, config artifact, prepare task, errors.
- Runtime artifact paths `reddit_profiles.json`, `twitter_profiles.csv`, and `simulation_config.json` are implementation runtime artifacts, not packet files.
- Runtime state: worker stages reading/generating_profiles/generating_config/copying_scripts, retry/cancel/timeout, progress detail.
- Upstream inputs: graph entities, project requirement, extracted text are read-only. Downstream run state/actions are not owned by this phase.

## UX/UI requirements

This phase is UI-bearing. The setup view must feel like a simulation staging bay, not a generic settings form. Required states: graph missing, create ready, preparing, staged progress, profile preview, config preview, already prepared, force-regenerate confirmation, provider blocked, partial data, error, retry, mobile/desktop. Screenshot critique must reject local MVP forms, raw JSON dumps as the primary UI, default controls without status, and disconnected graph context.

## Safety/security constraints

Owner/session checks guard simulation create/read/prepare/download; provider secrets are server-side; generated profiles may contain sensitive inferred traits and must be private; force regenerate is destructive for generated artifacts and requires confirmation; log/evidence redaction is mandatory.

## Quality gates

Required: unit tests for simulation schema and config/profile generators; fake-provider integration test for prepare path; API tests for create, missing graph, missing requirement, prepare status, already prepared, force regenerate, profile/config readback; worker_retry_cancel_recovery; persistence restart/readback; browser/e2e for setup; no_fake_scan_pass.

## Proof gate

Proof id: proof-03-simulation-environment

Runtime evidence must use `phase_id: 03-simulation-environment` and append only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; packet file `05-evidence/evidence-ledger.jsonl` remains seed-only.

Core tracks: provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, persistence_roundtrip, security_denied_path_test, repeatable_browser_e2e, visual_quality_gate, no_fake_scan_pass.

## Repair routing

If verification fails, route back to the current phase before editing again.

- Current phase: simulation create/prepare, profile/config, setup UI, progress, artifact, or evidence failures.
- Packet file `02-project-setup.md`: missing worker/persistence/provider architecture.
- Packet file `01-questions.md`: expensive profile-generation policy or credentialed provider fork.
- Required prior phase: `02-graph-memory-build` if graph id/entity data are missing.
- Runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`: live provider or runtime unavailable blockers.
