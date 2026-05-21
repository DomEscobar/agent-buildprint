# Contracts: Project Setup And Model Selection

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Create/edit/list/empty/error states for projects and model pickers require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Invalid schema, missing models, stale model IDs. | Browser/Electron artifact required. |
| API/socket | POST /api/project/addProject, /api/project/editProject, /api/project/getProject. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Project metadata and model selections become downstream generation context. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_project SQLite rows. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Depends on configured vendor model IDs for image/video. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

