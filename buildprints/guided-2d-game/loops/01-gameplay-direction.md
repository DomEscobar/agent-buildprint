# Gameplay and direction convergence

## How to implement this loop
Read `loops/loop-flow.md`, `.buildprint/next-agent.md`, host `AGENTS.md`, `02-identity.md`, the agreement and current proof. Missing runtime context is a blocker, not permission to guess. Work on the smallest real path and inspect it before expanding.

## Building objective
Read the agreement, chosen genre branch in `references/genre-modules.md`, engine/input docs and `02-identity.md`. Build the smallest playable room/level/plot with real player input, objective state, failure or undo and restart. Use high-quality assets from the outset when available and iterate art direction and animation alongside gameplay. Optional labeled graybox shapes may isolate a targeted mechanic question; they are never required before graphics, provider usage or art iteration and never count as finished art. Establish simulation units, collision scale and camera bounds. Measure movement under the frame-rate matrix in `references/qa.md`; prove the core action through input-driven runtime behavior, not visual appeal alone. Test the actual art composition for legibility and reachability as it becomes available. Ask the user to approve feel and direction at convergence, recording uncomfortable timings, unclear affordances and changes. These approvals control content scaling, not the start of art or motion work. For online scope, prove two clients and authority/reconnect now or negotiate a different bounded slice; never postpone architectural risk until polish.

## DO NOT
Do not pass placeholders as finished art, ship functionless buttons, count mocked/sample data as live proof, or substitute a proof-only runtime for production. Do not expand scope, spend, upload references or change asset rights without agreement. Do not advance on a page-loaded screenshot.

## Minimum proof before moving on
One continuous input-driven objective/failure-or-undo/restart run; measured frame-rate travel; approved gameplay feel and in-engine direction composition. These qualify convergence and content scaling, not permission to start the independent art/motion track. No mandatory graybox artifact; keep content expansion subject to both approvals and agreed bounds.

## Handoff note
Record changed runtime/manifest paths, decisions, commands and observed results, evidence version, remaining blockers, active loop and next smallest repair. State loop_core_passed separately from claim_qualified; use `review.md` before claiming qualification.
