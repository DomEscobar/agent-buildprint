# Contracts: Programmable Vendor Provider System

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Vendor list/editor, secret inputs, validation errors, model tests, disabled/enabled states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Invalid schema, duplicate id, missing functions, provider credential missing, VM execution error. | Browser/Electron artifact required. |
| API/socket | Vendor config routes under /api/setting/vendorConfig/*. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Vendor schema, model list merge, text/image/video/tts function contracts. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_vendorConfig rows and data/vendor/<id>.ts files. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | External AI providers: OpenAI-compatible, Toonflow, Volcengine, Kling, Vidu, Minimax, AtlasCloud, DeepSeek, GRSai, template adapter. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

