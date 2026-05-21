# Contracts: Image Generation For Assets And Storyboards

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Generate button, progress, retry/cancel, completed preview, failure reason states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Unsupported type, missing project, provider error, asset deleted mid-generation. | Browser/Electron artifact required. |
| API/socket | POST /api/assetsGenerate/generateAssets and production storyboard image routes. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Prompt construction by asset type, reference image handling, imageId state transitions. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_image, o_assets, o_tasks, data/oss images. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Configured image provider. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

