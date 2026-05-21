# Contracts: Local Login, Token Gate, And API Shell

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Login screen and expired/invalid-token states require browser proof from bundled or rebuilt UI. | User actions and visible state | Empty/loading/success/error/blocked states | Missing tokenKey, no token, invalid token, socket missing isolationKey. | Browser/Electron artifact required. |
| API/socket | POST /api/login/login, token-protected /api/* routes, /api/socket/scriptAgent and /api/socket/productionAgent namespaces. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Username/password check, token signing/verification, missing-token and invalid-token branches. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_user and o_setting.tokenKey in SQLite. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Local runtime only; no external provider. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

