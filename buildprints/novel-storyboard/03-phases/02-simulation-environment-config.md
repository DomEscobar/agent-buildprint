# Phase 02 - Simulation Environment Config

## Capability outcome

Deliver env_setup_profiles_config. A completed graph can become a simulation environment with agent profiles, platform-ready config, progress polling, bounded run options, and persisted preparation artifacts.

## Phase mode contract

blueprint_mode: data-pipeline
phase_style: dataflow_contract
Glance surfaces delivered: env_setup_profiles_config

This phase uses a data-pipeline lens because it transforms graph entities and source text into profiles and simulation_config artifacts. Required dataflow terms apply: schema, transform, lineage, backfill, idempotency, and data quality.

## Mapped source notes

- Simulation create from project_id and graph_id: frontend/src/components/Step1GraphBuild.vue:215-234.
- Step 2 preparation and polling: frontend/src/components/Step2EnvSetup.vue:638-849.
- Simulation API create/prepare/status/config/profile routes: backend/app/api/simulation.py:165-642 and 990-1294.
- Simulation manager writes state.json, reddit_profiles.json, and simulation_config.json: backend/app/services/simulation_manager.py:127-510.
- Profile/config generation uses LLM/Zep context: backend/app/services/oasis_profile_generator.py:145-239 and backend/app/services/simulation_config_generator.py:122-423.

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
