# Contracts: Database Backup, Import, And Destructive Admin Operations

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Backup download, import preview, destructive confirmation, success/failure states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Invalid import format, partial import failure, unauthorized destructive action. | Browser/Electron artifact required. |
| API/socket | GET /api/setting/dbConfig/exportData, POST /importData, GET /clearData, POST /api/other/deleteAllData. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Table enumeration, drop/reinit/import in batches, backup JSON contract. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | Whole SQLite database. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Local database runtime. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

