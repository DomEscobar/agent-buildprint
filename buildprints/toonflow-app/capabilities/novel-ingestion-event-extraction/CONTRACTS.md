# Contracts: Novel Import And Chapter Event Extraction

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Import progress, empty chapter list, event pending/success/failure states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | No matching chapters, provider failure, AI malformed event. | Browser/Electron artifact required. |
| API/socket | POST /api/novel/addNovel, /api/novel/getNovel, /api/novel/event/generateEvents. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Chapter indexing, AI event extraction prompt contract, eventState transitions. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | o_novel rows with chapterData, event, eventState, errorReason. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | universalAi text model required. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

