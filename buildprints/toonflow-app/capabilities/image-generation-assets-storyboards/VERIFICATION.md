# Verification: Image Generation For Assets And Storyboards

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | Sandbox image provider run or deterministic test-only provider plus live-proof blocker | missing | artifacts/image-generation.log |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/image-generation.log |
| runtime/API/browser | BLOCKED_WITH_REASON: no image provider credentials. | blocked | Needs sandbox/live image provider proof and browser polling evidence. |
| persistence/restart | write/read/restart proof required | missing | artifacts/image-generation.log |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Provider failure updates image state and errorReason. | missing | artifacts/image-generation.log |

## Blockers

- Needs sandbox/live image provider proof and browser polling evidence.

