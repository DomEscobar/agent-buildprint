# Contracts: Script Agent Workspace

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Chat stream, thinking, stop, error, plan workspace updates, and empty workspace states require browser/runtime proof. | User actions and visible state | Empty/loading/success/error/blocked states | Invalid token, missing isolationKey, provider errors, abort handling. | Browser/Electron artifact required. |
| API/socket | Socket /api/socket/scriptAgent events: chat, updateThinkConfig, stop; workspace events through socket callbacks. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Decision agent delegates to story skeleton, adaptation strategy, script writer, and supervisor with XML workspace contracts. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | Memory table and script/workspace tables. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | scriptAgent model family and tools. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

