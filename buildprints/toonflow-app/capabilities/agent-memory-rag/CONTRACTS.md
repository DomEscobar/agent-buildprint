# Contracts: Agent Memory And Local RAG

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Memory settings and clear-confirm states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Missing ONNX model, malformed embedding JSON, summary provider failure. | Browser/Electron artifact required. |
| API/socket | Agent memory routes and memory tool exposed to agents. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Summarization thresholds, vector search, relevance judging, summarized flags. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | memories and o_setting rows; local ONNX model files. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Local ONNX embedding plus configured text model for summaries/relevance. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

