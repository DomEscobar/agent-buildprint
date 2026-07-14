# Phase 05 — First Loop Integration

## How to implement this phase

Integrate the already certified battle and Pallet Town systems into the first continuous world loop. Read `references/battle-verification.md`, `references/starter-town-verification.md`, `references/world-verification.md`, the Phase 03-04 proof receipts, `data/story/map-manifest.yaml`, and the canonical Route 1 encounter data.

Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Prove one uninterrupted production path:

**Pallet Town spawn → north exit → Route 1 movement/ledge/grass → certified battle → Win or Run → correct Route 1 restoration → Viridian City.**

This phase adds Route 1 and Viridian City to the certified Pallet foundation and connects canonical encounter data to the exact Phase 03 BattleScene/state machine. It does not rebuild or fork battle logic.

## World extension

Author `route_1` and `viridian_city` through the same semantic catalog/compiler/TMX pipeline proven in Phase 04. Both maps require:

- production `Ground`, `Collision`, `Overhead`, and `Events` layers
- valid entry/exit spawns and reciprocal warps/transitions
- camera clamp, correct player foot point, and integer pixel rendering
- distinct composition and semantic-source/TMX hashes
- walkable route/city paths with collision matching visible geometry

Route 1 additionally requires:

- tall-grass semantic tiles tied to encounter zones
- at least one correctly directional ledge
- canonical `route_1` encounter table id
- safe return tile that cannot immediately retrigger a locked encounter

Viridian City must provide a valid arrival path and enough real map structure to prove CP-A; it cannot be an empty completion tile or debug landing room.

## Encounter integration

On a seeded legal grass step:

1. resolve the zone's canonical encounter-table id
2. select species and level from the real weighted Route 1 table
3. create a wild Pokemon instance from the normalized PokeAPI/manual data cache
4. snapshot the current map id, player tile/facing, encounter tile, and return contract
5. transition to the exact certified production BattleScene and battle engine
6. after Win or successful Run, restore `route_1`, player tile/facing, camera, and input ownership
7. clear the encounter lock only after restoration and require a new legal step before another roll

Record encounter seed, table hash, selected slot/species/level, BattleScene build hash, initial battle-state hash, result, and restored world-state hash. A second encounter reducer, battle scene, or shortcut fixture is an automatic failure.

## Test-first requirements

Pin current Pallet north-exit, map transition, and certified battle entry contracts with characterization tests. Then add failing integration tests for:

- Pallet north exit resolves exactly to `route_1` and correct spawn
- reciprocal transition returns to valid Pallet tile
- weighted seeded encounter selects a legal Route 1 slot and level
- non-grass movement never rolls a grass encounter
- encounter lock prevents duplicate launch while transition/restoration is active
- Win restores the correct map/tile/facing and clears lock
- successful Run restores the correct map/tile/facing and clears lock
- failed Run remains in the same battle
- Viridian arrival is reachable from Pallet without debug teleport
- ledge blocks/repositions in the correct direction

## CP-A continuous traversal

Playwright drives the production browser build from the canonical Pallet spawn with cheats, fixture shortcuts, and debug controls disabled. One trace must:

1. traverse Pallet and use its north exit
2. enter Route 1 at the canonical spawn
3. exercise collision and the directional ledge
4. step into real tall grass and trigger an encounter
5. complete a Win path and verify exact Route 1 restoration
6. repeat from the persisted world state, complete a successful Run path, and verify restoration
7. continue north and enter Viridian City

Debug teleport may diagnose maps but cannot satisfy CP-A. CP-A remains Pallet → Route 1 → Viridian; do not silently shorten it.

## Visual and state continuity review

Capture current Pallet exit, Route 1 approach/grass/ledge, battle entry, post-Win return, post-Run return, and Viridian arrival at 1280px and the critical movement/battle-return states at 375px.

Review must confirm:

- battle transition does not flash stale map tiles, debug state, or fractional scaling
- battle entry and return preserve the same visual language and input focus
- player returns to the expected tile/facing with no overlap, instant retrigger, or camera jump
- Route 1 and Viridian do not degrade the semantic tile/compound-stamp quality proven in Pallet
- no proof/evaluator terms appear in the player surface

An independent reviewer writes `.buildprint/first-loop-review.md` and `.buildprint/reviewer-attestations/first-loop.json`; the proof generator may never create or modify them. The attestation binds reviewer and implementer session identities, the clean commit/source-manifest hash, exact reviewed artifact hashes, five worst findings, verdict, and timestamp. Identity overlap is failure.

`npm run first-loop:proof -- --collect` produces events, traversal, trace, renders, and screenshot indexes but cannot emit a passing `.buildprint/first-loop-proof.json`. After review, `npm run first-loop:proof -- --finalize` consumes the review and attestation read-only and generates the final proof last. The final proof binds the clean commit, source-manifest hash, current battle- and Pallet-proof hashes, event/traversal/trace/render/screenshot hashes, review hash, reviewer-attestation hash, and status. Missing or mismatched review bindings force `fail` or `blocked`; file presence alone is never sufficient.

Any new critical/high battle or world visual finding invalidates the relevant scoped proof and must be repaired before integration can pass.

## Required proof

Run:

```bash
npm run battle:proof:verify -- --recompute
npm run pallet:proof:verify -- --recompute
npm run maps:compile -- --maps pallet_town,route_1,viridian_city
npm run maps:validate -- --maps pallet_town,route_1,viridian_city
npm run maps:render-proof -- --maps pallet_town,route_1,viridian_city
npm run world:traverse-proof -- --checkpoint CP-A
npm run first-loop:proof -- --collect
# independent reviewer writes review + attestation here
npm run first-loop:proof -- --finalize
npm run first-loop:proof:verify -- --recompute
npm run typecheck
npm run build
```

Required current artifacts:

- existing `.buildprint/battle-slice-proof.json` pass
- existing `.buildprint/pallet-world-proof.json` pass
- `.buildprint/first-loop-events.json`
- `.buildprint/first-loop-traversal.json`
- `.buildprint/traces/first-loop.zip`
- current renders/index entries for `pallet_town`, `route_1`, and `viridian_city`
- `.buildprint/first-loop-screenshot-index.json`
- `.buildprint/first-loop-review.md`
- `.buildprint/reviewer-attestations/first-loop.json`
- `.buildprint/source-manifest.json` binding normalized paths and SHA-256 hashes to a clean commit
- `.buildprint/first-loop-proof.json`
- `.buildprint/playthrough-receipt.md` entries for CP-A and CP-B
- `.buildprint/evidence-phase-05-integration.md`

The battle, Pallet, and integration proofs must bind the same clean commit and deterministic source-manifest hash. Dirty runs may produce diagnostics but can never certify. The manifest is a sorted normalized `path + SHA-256` list covering production source, proof/verifier scripts, fixtures, configs, manifests, dependency lockfile, and assets; relevant untracked files, omissions, absolute/out-of-root paths, and symlinks fail. Stale upstream proof is failure, not inherited trust.

The raw `.buildprint/traces/first-loop.zip` is a hash-bound diagnostic artifact, not a deterministic byte-comparison target. Recompute verifies the submitted trace hash and existence, then reruns the flow and compares normalized semantic traversal, encounter, battle-return events, screenshots, and asserted states. Exclude timestamps, trace ids, ZIP metadata, and render timing only; never exclude gameplay or world-state fields.

## Automatic failures

- CP-A starts through debug teleport, omits Viridian, or is split into unrelated traces
- encounter species/level is hardcoded or ignores the canonical weighted table
- non-grass movement launches a grass encounter
- a second battle scene/engine/reducer handles the encounter
- Win or Run returns to wrong map/tile/facing, leaves input locked, or retriggers instantly
- only Run or only Win passes
- Route 1/Viridian is empty, flat single-fill, debug-only, inaccessible, or visually below Phase 04 rules
- current battle/Pallet/integration proofs do not bind the same source state
- hand-authored pass JSON, stale hashes, recompute mismatch, or prose-only handoff
- self-review, missing/mismatched reviewer attestation, identity overlap, or generator-written review files
- dirty-worktree pass, incomplete source manifest, relevant untracked file, symlinked input, unsafe map id/path, unsafe YAML/XML parsing, or shell-string interpolation

## DO NOT

- Do not weaken CP-A to Pallet → Route 1 only
- Do not accept partial or Run-only proof
- Do not duplicate certified systems to make the trace easier
- Do not start Oak/starter story scripting in this phase
- Do not advance Phase 06 with any stale or failed upstream receipt

## Minimum proof before moving on

- current battle and Pallet recompute verifiers pass
- Route 1 and Viridian compile, validate, render, and remain visually coherent
- canonical seeded Route 1 encounter enters the exact certified battle implementation
- both Win and successful Run restore correct world state and clear the lock
- one continuous CP-A trace reaches Viridian from Pallet with debug controls disabled
- CP-B records the real encounter, Win, Run, and return assertions
- `npm run first-loop:proof:verify -- --recompute` passes
- all three proof receipts bind the same source state
- claim ceiling is stated as exactly `overworld_core`

If any item fails, keep Phase 05 active and cap maturity at `starter_town_core`. Only after every item passes may `active_phase` advance to `06-script-vm-dialogue`.

## Handoff note

Record map ids/source hashes, encounter table/seed/slot, certified battle build hash, Win/Run restoration hashes, CP-A/CP-B trace and screenshot paths, verifier output, same-commit binding result, remaining medium/low findings, and the current claim ceiling.
