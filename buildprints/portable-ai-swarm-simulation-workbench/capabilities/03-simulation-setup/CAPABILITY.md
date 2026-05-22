# Simulation Setup

Status: `INCLUDED`

## Agent Brief

Goal: create simulations and generate agent/platform/time configuration from graph entities.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: `02-graph-builder`
Stable behavior: simulation record, entity/profile/config generation, progress polling, persisted config.
Implementation freedom: config schema details and worker queue.
Forbidden substitutions: static profiles, no-op prepare button, config not persisted.
First implementation slice: create simulation from graph, generate deterministic profiles/config, reload config.
First verification gate: `npm test -- simulation-setup`
Required evidence: config artifact, setup screenshots, empty graph negative test.
No-fake checks: profiles map to graph entities; platform config is not hardcoded success.
Stop or escalate when: platform requirements or provider mode are unclear.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Owned source surfaces

- `backend/app/api/simulation.py:165`
- `backend/app/api/simulation.py:359`
- `backend/app/services/simulation_config_generator.py`
- `frontend/src/components/Step2EnvSetup.vue`

## Product obligations

- Create simulation records from graph-backed projects.
- Generate platform, time, event, and agent profile configuration from graph entities.
- Persist setup progress, generated config, and failure reasons for restart/readback proof.

## Behavior Contract

- User/system action: user creates and prepares simulation.
- Accepted inputs: project id, graph id, enabled platforms, entity types, generation options.
- Observable outputs: simulation id, profiles, time/event/platform config, progress.
- Important state: simulation metadata, config JSON, profile artifacts, preparation task.
- Failure/empty/loading/blocked states: no graph, empty entity list, provider failure, partial profile generation.
- Provider/persistence/runtime/operational boundary: graph entity reader and LLM config generator.

## Source Evidence

- OBSERVED: `backend/app/api/simulation.py:165` creates simulations.
- OBSERVED: `backend/app/api/simulation.py:359` prepares simulation.
- OBSERVED: `backend/app/services/simulation_config_generator.py` generates time/event/agent/platform config.
- OBSERVED: `frontend/src/components/Step2EnvSetup.vue` polls preparation state.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
