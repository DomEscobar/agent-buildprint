# Contracts: Storyboard And Flow Data Persistence

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Infinite canvas/flow board, empty hydrated workspace, saved state, reorder states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Malformed flow data, missing script, missing file, reorder update failure. | Browser/Electron artifact required. |
| API/socket | POST /api/production/getFlowData, /api/production/saveFlowData, /api/production/storyboard/addStoryboard. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | FlowData schema: script, scriptPlan, assets, storyboardTable, storyboard. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_agentWorkData, o_storyboard, o_assets2Storyboard, o_videoTrack. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Local persistence and OSS thumbnails. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

