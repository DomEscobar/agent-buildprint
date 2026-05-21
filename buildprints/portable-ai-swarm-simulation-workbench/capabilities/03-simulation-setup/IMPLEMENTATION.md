# Implementation: Simulation Setup

## Agent Brief

- Goal: implement graph-to-config setup.
- Dependencies: graph builder.
- Stable behavior: simulation record and persisted config.
- Implementation freedom: config generator internals.
- Forbidden substitutions: static profiles and non-persisted state.
- First verification gate: `npm test -- simulation-setup`.
- Required evidence: generated config and screenshots.
- Required team packs: all selected teams.
- Stop or escalate when: supported platforms are ambiguous.

## First Real Vertical Slice

- User/API entry: `POST /api/simulation/create` then `POST /api/simulation/prepare`.
- Domain/service behavior: fetch entities, generate profiles and platform/time/event config.
- Persistence/state effect: save simulation, profiles, config, prepare status.
- Provider/runtime effect: LLM adapter and graph entity adapter.
- UI/browser proof when applicable: setup loading/partial/success/error states.
- Negative/failure path: empty graph blocks prepare and shows recovery.

## Milestones

1. Simulation repository and create API.
2. Config generator adapter with deterministic profile generation.
3. Setup UI with progress polling and persisted readback.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | graph-to-config topology | config evidence | missing |
| ux-ui-craft | setup state screenshots | screenshots | missing |
| test-and-verification | config tests | proof rows | missing |
| integration-runtime | LLM/entity adapter proof | adapter log | missing |
| security-boundary | provider redaction proof | negative proof | missing |
| data-persistence | config readback | restart proof | missing |

## Stop Conditions

- Profiles are hardcoded without graph entity mapping.
- UI allows start before config is ready.
