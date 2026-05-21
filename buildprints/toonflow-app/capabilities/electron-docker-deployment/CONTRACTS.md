# Contracts: Electron Desktop And Docker Runtime

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Electron loading window and main window need desktop/browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Data directory permission failure, missing web directory, native module packaging failure. | Browser/Electron artifact required. |
| API/socket | Local service on port 10588 by default; random port for Electron service. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Data initialization/copy on version changes, serving bundled web assets and local media. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | Electron userData/data or cwd/data. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | OS/Electron/Docker runtime. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

