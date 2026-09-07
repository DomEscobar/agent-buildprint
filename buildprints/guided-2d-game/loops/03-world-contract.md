# A traversable, layered place

## How to implement this loop
Read `loops/loop-flow.md`, `.buildprint/next-agent.md`, host `AGENTS.md`, `02-identity.md`, the agreement and current proof. Missing runtime context is a blocker, not permission to guess. Work on the smallest real path and inspect it before expanding.

## Building objective
Read `references/world-and-tiles.md` and `validation/README.md`. Establish pixels-per-world-unit and tile-size conversion once; define terrain, placement layers, feet origins, physical footprints and separate canopy/shadow/VFX. Build the agreed scene from the actual loaded manifest. Run manual placements and generated proposals through the identical validator before committing them, then validate again at load. Configure spacing and adjacency for this particular scene rather than enforcing a universal aesthetic. Keep spawn, objectives and required exits connected for the player's footprint and movement rules; the supplied grid checker covers only static cardinal traversal and must be extended for platform jumps or moving blockers. Show feet, footprint, collision and sorting overlays in the production renderer and walk behind/in front of tall props from several directions and camera edges. Validate repeated tile fields for seams and grain with the actual palette and texture filter. Reject plausible-looking but unnavigable or density-inconsistent scenes before filling extra content.

## DO NOT
Do not pass placeholders as finished art, ship functionless buttons, count mocked/sample data as live proof, or substitute a proof-only runtime for production. Do not expand scope, spend, upload references or change asset rights without agreement. Do not advance on a page-loaded screenshot.

## Minimum proof before moving on
Shared validator passes actual loaded manifest and affected negative cases; route traversal and overlaps/occlusion captured in engine; repeated tiles previewed at native and camera scales; spawn/objective/exits reachable with actual actor clearance.

## Handoff note
Record changed runtime/manifest paths, decisions, commands and observed results, evidence version, remaining blockers, active loop and next smallest repair. State loop_core_passed separately from claim_qualified; use `review.md` before claiming qualification.
