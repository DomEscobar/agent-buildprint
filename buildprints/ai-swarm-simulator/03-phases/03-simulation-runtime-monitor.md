# Phase 3: Simulation Preparation And Runtime Monitor

## Phase mode contract

- `phase_id`: `03-simulation-runtime-monitor`
- `blueprint_mode`: `product`
- `phase_style`: `outcome_flow`
- Outcome: the user can turn the graph world into agent personas and platform rules, then run or deterministically replay a bounded dual-platform rehearsal with observable runtime state.
- Owned surfaces: `surface-simulation-preparation-board`, `surface-dual-platform-event-monitor`

## Preconditions and inputs

- A completed or sandbox-built graph from Phase 2.
- Inputs: `simulation_id`, graph id, enabled platforms, optional entity type filters, profile-generation mode, max rounds, graph-memory update mode.
- Provider/runtime mode: live OASIS/LLM/Zep when configured; deterministic sandbox runtime when credentials or live runtime are unavailable.

## Implementation scope

Build the preparation board:

- create a simulation record from project and graph ids;
- read graph entities and filter by ontology-defined types;
- generate personas with names, handles, profession/role, biography, interested topics, stance, active hours, activity level, influence weight, and platform behavior rates;
- generate platform config for Info Plaza and Topic Community, including time windows, recommendation weights, viral/echo behavior, and total rounds;
- save `state.json`, persona files, config files, and readiness status.

Build the event monitor:

- start/stop a bounded run or deterministic replay;
- show separate platform round counters, elapsed simulated time, completed/running indicators, action counts, and available action vocabulary;
- render chronological action cards for posts, quotes, reposts, likes, comments, searches, follows, votes, and idle actions;
- persist and reload `run_state.json` and recent actions;
- expose failure, stopped, completed, and blocked-provider states.

## Interfaces touched

- Simulation create/prepare/status/run/stop APIs.
- Background job manager.
- OASIS runtime adapter and deterministic replay adapter.
- Graph-memory update adapter when enabled.
- Browser preparation and monitor surfaces.
- Simulation artifact storage.

## State and artifact effects

- Persist simulation state, personas, config, run state, stdout/stderr or runtime trace, recent action stream, platform counters, process id when live, and error state.
- Stopping a run updates status deterministically and does not lose prior actions.

## UX/UI requirements

- The preparation board should show agent/persona data as inspectable simulation participants, not generic cards.
- The monitor must make Info Plaza and Topic Community feel like two distinct platform lanes with different action vocabularies.
- A changing action timeline is required; a static "simulation complete" card is fake.
- Runtime controls must disable appropriately during starting/stopping and show honest blocked state when live runtime is unavailable.

## Safety/security constraints

- Running live simulation can spend provider budget; default to bounded rounds.
- No external platform writes; Info Plaza and Topic Community are simulated platform surfaces.
- Process control must not kill unrelated processes.
- Missing runtime/provider credentials produce blocker evidence, not fake live proof.

## Quality gates

- `proof-simulation-preparation-artifacts`: test creates a simulation, prepares personas/config, verifies required files, reloads state, and confirms counts match graph entities.
- `proof-dual-platform-event-runtime`: runtime/browser test starts deterministic run, sees action counts and timeline change, stops or completes run, reloads run state, and verifies action artifacts.
- `proof-runtime-stop-recovery`: test covers stop/failure/retry behavior without hanging or ambiguous exit.

## Proof gate

This phase reaches `phase_core_passed` only when simulation preparation artifacts exist and the event monitor reflects real runtime or deterministic replay state changes. Provider blockers can limit claim upgrades but cannot replace the local runtime proof.

## Failure/recovery

If entity extraction returns zero usable entities, block continuation with a visible explanation and preserve graph/project state. If run start fails, save error state and let the user retry after configuration changes.

## Non-goals

- No report generation or chat in this phase.
- No claim that sandbox replay is live OASIS proof.

## Source evidence

- `source/MiroFish/backend/app/api/simulation.py:165` creates simulations.
- `source/MiroFish/backend/app/api/simulation.py:359` prepares simulation environment.
- `source/MiroFish/backend/app/api/simulation.py:471` previews entity count.
- `source/MiroFish/backend/app/api/simulation.py:490` creates prepare task.
- `source/MiroFish/backend/app/services/simulation_manager.py:230` prepares simulation.
- `source/MiroFish/backend/app/services/simulation_runner.py:48` defines agent actions.
- `source/MiroFish/backend/app/services/simulation_runner.py:101` defines runtime state.
- `source/MiroFish/frontend/src/components/Step3Simulation.vue:7` shows dual platform status.
- `source/MiroFish/frontend/src/components/Step3Simulation.vue:127` renders action timeline.

## Repair routing

- Persona/config/job/runtime/state failures -> this phase.
- Graph entity absence caused by graph build defects -> Phase 2.
- Missing live runtime access -> blocker evidence row.
