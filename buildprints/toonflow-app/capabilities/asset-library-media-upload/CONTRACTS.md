# Contracts: Asset Library And Media Upload

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Asset grid/list, upload loading/success/error, preview and empty states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Unsupported or malformed base64, path escape, missing file, thumbnail failure fallback. | Browser/Electron artifact required. |
| API/socket | POST /api/assets/addAssets, /api/assets/uploadClip and related asset get/update/delete routes. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Asset type categorization, media extension detection, image record linkage. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_assets, o_image plus data/oss files. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Local file runtime; sharp for thumbnails. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

