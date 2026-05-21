# Contracts: Script Asset Extraction

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Script table, export flow, extraction pending/running/success/failure states need browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | No selected scripts, missing scripts, AI returns no assets, provider error. | Browser/Electron artifact required. |
| API/socket | POST /api/script/addScript, /api/script/exportScript, /api/script/extractAssets. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Batch grouping, result tool schema, asset deduplication, script-asset relation replacement. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_script, o_assets, o_scriptAssets. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | universalAi text model with resultTool. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

