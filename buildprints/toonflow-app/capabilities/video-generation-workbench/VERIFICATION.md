# Verification: Video Generation Workbench

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | Sandbox video provider or blocked live-provider proof with polling trace | missing | artifacts/video-generation.trace |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/video-generation.trace |
| runtime/API/browser | BLOCKED_WITH_REASON: no video provider credentials. | blocked | Needs sandbox/live video proof, long-running job proof, and browser timeline evidence. |
| persistence/restart | write/read/restart proof required | missing | artifacts/video-generation.trace |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Provider failure updates o_video.state and errorReason. | missing | artifacts/video-generation.trace |

## Blockers

- Needs sandbox/live video proof, long-running job proof, and browser timeline evidence.

