# Storyboard And Flow Data Persistence

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- routes.production.getFlowData
- routes.production.saveFlowData
- routes.production.storyboard.*
- tables.o_agentWorkData
- tables.o_storyboard
- tables.o_assets2Storyboard
- tables.o_videoTrack

## Product obligations

- Preserve flow hydration/save, storyboard record/order/link persistence, restart readback, and canvas/browser states.

## Agent Brief

Goal: Users persist per-episode production flow data, hydrate flow workspaces from scripts/assets/storyboards, order storyboard frames, and create storyboard records linked to tracks.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Flow editor UI, REST persistence, schema validation, storyboard/asset join tables, restart/readback tests.
Stable behavior: FlowData schema: script, scriptPlan, assets, storyboardTable, storyboard.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Save/read/restart/readback contract test
Required evidence: artifacts/flow-persistence.log; BLOCKED_WITH_REASON: persistence restart proof not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs restart/readback/delete/reorder proof and browser canvas screenshots.

## Behavior Contract

- User/system action: Users persist per-episode production flow data, hydrate flow workspaces from scripts/assets/storyboards, order storyboard frames, and create storyboard records linked to tracks.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_agentWorkData, o_storyboard, o_assets2Storyboard, o_videoTrack.
- Failure/empty/loading/blocked states: Malformed flow data, missing script, missing file, reorder update failure.
- Provider/persistence/runtime/operational boundary: Local persistence and OSS thumbnails.

## Stable vs Free

| Stable | Free |
|---|---|
| Users persist per-episode production flow data, hydrate flow workspaces from scripts/assets/storyboards, order storyboard frames, and create storyboard records linked to tracks. | Implementation framework/component/database abstraction. |
| Malformed flow data, missing script, missing file, reorder update failure. | Exact internal error class names. |
| Save/read/restart/readback contract test | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/getFlowData.ts:9-162; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/saveFlowData.ts:9-63; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/storyboard/addStoryboard.ts:15-47

