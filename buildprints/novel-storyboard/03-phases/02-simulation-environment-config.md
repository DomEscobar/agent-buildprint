# Phase 02 - Simulation Environment Config

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Write `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml` with lead decision, user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
2. Declare the phase objective in `.buildprint/phase-runs/PHASE_ID/plan.md`.
3. Confirm the implementation scaffold and local guidance files required by `02-project-setup.md` exist.
4. Implement the first real vertical path.
5. Verify with commands and browser/runtime artifacts.
6. Write `.buildprint/phase-runs/PHASE_ID/proof.md` and `.buildprint/phase-runs/PHASE_ID/evidence.json`.
7. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Capability outcome

This phase delivers env_setup_profiles_config for the MiroFish canvas simulation workbench without claiming live-provider, deployment, security, worker, visual, or lifecycle qualification beyond direct matching proof.

## Phase mode contract

```yaml
phase_contract:
  phase_id: 02-simulation-environment-config
  blueprint_mode: data-pipeline
  phase_style: dataflow_contract
  glance_surfaces:
    - env_setup_profiles_config
  owned_surface_ids:
    - surface-env-setup-profiles-config
  core_pass_required:
    - criterion-dataflow-quality
    - criterion-provider-fake
    - criterion-persistence-roundtrip
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-deployment-operations-proof
    - criterion-visual-quality-gate
```

- blueprint_mode: data-pipeline
- phase_style: dataflow_contract
- Glance surfaces delivered: env_setup_profiles_config.
- Shared proof spine: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped obligations

- Preserve the mapped MiroFish behavior for env_setup_profiles_config.
- Implement source-independent target behavior; do not require opening the original source repo during implementation.
- Keep deterministic/fake provider proof separate from live provider claim upgrades.

## Stable vs free

Stable: user-visible workflow, provider boundaries, persistence/readback, runtime status, failure states, and evidence ceilings.
Free: exact framework, component names, storage engine, queue implementation, and visual style if the product-grade graph/simulation/report experience is preserved.

## Implementation scope

Implement the smallest real vertical path for this phase. Avoid standalone demos, generic dashboards, raw JSON substitutes, in-memory-only production claims, no-op controls, and route-shaped handlers without service/storage/runtime behavior.

## Interfaces touched

- UI/controller/API boundary for phase-owned surfaces.
- Provider adapter boundary where this phase touches LLM, graph memory, report, or runtime behavior.
- Test/e2e/no-fake verifier boundary.

## State/runtime touched

- Durable project/workflow state and runtime artifacts owned by this phase.
- `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml`, `plan.md`, `proof.md`, and `evidence.json` as runtime proof artifacts.
- `.buildprint/evidence/evidence-ledger.jsonl` for narrow evidence/blocker rows.

## UX / DX / operator requirements

UI-bearing phases must look like a product-grade graph/simulation/report workbench. Non-UI proof must use mode-equivalent API, dataflow, automation, provider, or operations proof. Screenshots alone do not upgrade claims without browser action traces and visual critique.

## Safety constraints

Protect uploads, generated artifacts, provider secrets, destructive actions, chat/report data, and runtime process controls. Missing credentials or deployment authorization may block claim upgrades but must not remove adapters, config contracts, tests, or fail-closed states from scope.

## Quality gates

- Unit/integration tests for phase-owned behavior.
- `verify:no-fake`.
- `verify:phase-artifacts` with `PHASE_ID=02-simulation-environment-config`.
- Browser/runtime/API/provider/dataflow/automation proof matching this phase mode.

## Proof gate

`phase_core_passed` requires the phase-owned local vertical path to run with command output or artifact paths saved under `.buildprint/phase-runs/PHASE_ID/`. Evidence rows must include `phase_id`, `proof_type`, `provider_mode`, `claim_type`, and `upgrades_claim` with narrow `proves` values.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase
- external/live-provider/deployment blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

## Source-specific contract notes

## Capability outcome

Deliver env_setup_profiles_config. A completed graph can become a simulation environment with agent profiles, platform-ready config, progress polling, bounded run options, and persisted preparation artifacts.

## Phase mode contract

blueprint_mode: data-pipeline
phase_style: dataflow_contract
Glance surfaces delivered: env_setup_profiles_config

This phase uses a data-pipeline lens because it transforms graph entities and source text into profiles and simulation_config artifacts. Required dataflow terms apply: schema, transform, lineage, backfill, idempotency, and data quality.

## Mapped capability obligations

- Preserve simulation creation from a completed project graph, mapping the graph entities and source text.
- Standardize the data schema for agent profiles, preparation tasks, and platform-ready config files.
- Enable step-by-step progress tracking and status polling during environment preparation.
- Implement idempotency and backfill/retry logic for interrupted profile or config generation.

## Implementation scope

- Create simulation from completed project graph and persist simulation_id, project_id, graph_id, status, provider mode, and preparation metadata.
- Data schema for profiles, config, state, and preparation tasks must be explicit and validated.
- Transform graph entities into platform profiles with stable ids, persona fields, visible fallback/blocker behavior, and source lineage.
- Generate simulation_config with bounded defaults, max-round override, validation, and data quality checks.
- Poll preparation task status in the UI and show loading, partial, failed, blocked, and completed states.
- Support idempotency for repeated prepare calls and backfill/retry for interrupted profile/config generation.

## Interfaces touched

- API: simulation create, prepare, prepare/status, profiles, profiles/realtime, config, config/realtime, config download.
- State: simulation state, preparation jobs, profile artifacts, config artifacts, provider status, data lineage.

## Proof gate

- data_quality_test: generated profiles/config validate against schemas and include lineage from graph entity ids.
- provider_adapter_config_test_required: LLM/Zep adapters validate env vars and return typed blocked states without fake profiles.
- persistence_roundtrip: simulation state, profiles, and config reload after process restart.
- repeatable_browser_e2e: browser shows preparation progress, completed config summary, custom max rounds, and failure/blocker states.
- migration_retention_backup_upload_limits: persisted artifacts have retention and backup assumptions documented.

## Repair routing

If live providers are unavailable, deterministic provider adapter tests may pass only configuration/error behavior. They do not upgrade live profile generation claims.

## Unlock condition

Unlock Phase 03 only after a simulation can be prepared or is honestly blocked at live_provider_proof_blocker_only with UI/API/state proof complete.
