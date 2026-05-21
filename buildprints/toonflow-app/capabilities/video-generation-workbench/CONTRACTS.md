# Contracts: Video Generation Workbench

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Track list/timeline, generation modal, progress, success preview, failure reason, retry/delete states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Missing reference file, provider failure, timeout, unsupported mode. | Browser/Electron artifact required. |
| API/socket | POST /api/production/workbench/addTrack, /generateVideo, /checkVideoStateList and related video routes. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Reference media conversion, ratio/resolution/duration/audio/mode passing, async state transitions. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_videoTrack, o_video, data/oss video files, o_tasks. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Configured video provider. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

