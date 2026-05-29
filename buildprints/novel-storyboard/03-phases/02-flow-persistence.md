# Phase 2 - Episode Flow Persistence

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase makes the board durable. The outcome flow is: select an episode, load board data, edit/order board state, save it, restart or reload, and see the same board.

## Build target

Implement project/episode scoped persistence for:

- prose source excerpt or imported episode text;
- script content;
- script plan;
- asset list and derived assets;
- storyboard table;
- storyboard items, order, shot numbers, scene/beat labels, frame prompts, notes, review status, image state, continuity tags and associated character/asset IDs;
- workbench/video metadata sufficient for later media phases.

## Interfaces touched

- API endpoints for flow load and save.
- Database schema/migrations for users, projects, episodes/scripts, assets, storyboards, work data and media references.
- Client store methods for `getFlowData` and `saveFlowData`.

## State/runtime touched

Use durable database-backed persistence. In-memory state is allowed only as request-local cache. Board data must survive browser reload and backend restart.

## UX/UI requirements

- Episode selector loads available episodes.
- Save/load failures show user-visible errors.
- Persisted frame metadata must rehydrate into the storyboard strip/grid and selected-frame inspector without dropping notes, status or continuity tags.
- Unsaved or streaming episode switch must require confirmation if it would drop in-flight work.

## Safety/security constraints

API routes must require authenticated session. Project/episode IDs must be authorized for the current user/session. Destructive overwrite must be deliberate and tested.

## Implementation loop

1. Define database schema and fixture seed.
2. Implement flow load/save API contracts.
3. Wire client store to API.
4. Preserve storyboard ordering.
5. Run persistence/restart proof.

## Proof gate

- API contract tests for initial load, saved load, missing episode and invalid auth.
- Persistence roundtrip test: save board, restart service or recreate app process, reload board and compare canonical state.
- Browser test: edit node/storyboard order, selected-frame notes/status/continuity tags, reload and confirm state.
- Evidence row: `phase_id=02-flow-persistence`, `proof_type=persistence_roundtrip`.

## Repair routing

If data is lost on reload/restart, repair persistence before advancing. If auth can be bypassed, route through security-boundary contract before continuing.

## Stop condition

Stop if durable storage cannot be configured in the environment. Record blocker rather than replacing persistence with memory.

## Unlocks

Unlocks Phase 3 once board state is loaded/saved through the API and survives restart.
