# Contracts: Production Agent Workbench

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Canvas/workbench chat, active skill display, streaming/thinking/stop/error, flow updates require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Missing project, missing model, missing skill files, provider errors, abort. | Browser/Electron artifact required. |
| API/socket | Socket /api/socket/productionAgent events and production REST routes. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Skill-conditioned production planning and storyboard creation. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_agentWorkData, o_assets, o_storyboard, memories. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | productionAgent model family plus image/video providers as downstream actions. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

