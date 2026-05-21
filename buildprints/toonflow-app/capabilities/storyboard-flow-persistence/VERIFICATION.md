# Verification: Storyboard And Flow Data Persistence

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | Save/read/restart/readback contract test | missing | artifacts/flow-persistence.log |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/flow-persistence.log |
| runtime/API/browser | BLOCKED_WITH_REASON: persistence restart proof not run. | blocked | Needs restart/readback/delete/reorder proof and browser canvas screenshots. |
| persistence/restart | write/read/restart proof required | missing | artifacts/flow-persistence.log |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Malformed flow payload rejected; restart retains order. | missing | artifacts/flow-persistence.log |

## Blockers

- Needs restart/readback/delete/reorder proof and browser canvas screenshots.

