# The complete bounded play loop

## How to implement this loop
Read `loops/loop-flow.md`, `.buildprint/next-agent.md`, host `AGENTS.md`, `02-identity.md`, the agreement and current proof. Missing runtime context is a blocker, not permission to guess. Work on the smallest real path and inspect it before expanding.

## Building objective
Read the selected genre module and `references/qa.md`; integrate only the content and mechanics agreed in the slice. Replace graybox art only after its production assets pass approval, leaving no fake controls or missing transitions. Bind visual animation phases to gameplay events and test simultaneous input, release, interruption and restart using production code. Make the objective discoverable without debug UI. Brawler attacks must contact only in active windows, avoid repeated damage per swing unless designed, and preserve feet/air-height semantics; other genres use their module's corresponding state and failure rules. Test loss or undo, victory/objective completion, and fresh restart without stale actors, timers or input. Exercise touch and keyboard on agreed devices, multiple frame rates, directions and camera positions, plus two-client latency/disconnect cases if online. Freeze a first full milestone, collect recordings and only then consider optional content expansion through a new agreement.

## DO NOT
Do not pass placeholders as finished art, ship functionless buttons, count mocked/sample data as live proof, or substitute a proof-only runtime for production. Do not expand scope, spend, upload references or change asset rights without agreement. Do not advance on a page-loaded screenshot.

## Minimum proof before moving on
Full slice campaign from start to objective, failure/undo and restart; production input tests and frame-rate evidence; manifest/assets hashes from actual loader; no test-only reducer or parallel scene used as proof. Complete the applicable QA matrix once for this milestone.

## Handoff note
Record changed runtime/manifest paths, decisions, commands and observed results, evidence version, remaining blockers, active loop and next smallest repair. State loop_core_passed separately from claim_qualified; use `review.md` before claiming qualification.
