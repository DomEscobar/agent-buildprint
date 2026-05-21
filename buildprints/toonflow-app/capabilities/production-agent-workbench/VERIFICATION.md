# Verification: Production Agent Workbench

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | Socket + flow integration test with sandbox text provider | missing | artifacts/production-agent.trace |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/production-agent.trace |
| runtime/API/browser | BLOCKED_WITH_REASON: no socket/browser/provider proof. | blocked | Needs browser canvas proof, socket stream proof, and skill activation evidence. |
| persistence/restart | write/read/restart proof required | missing | artifacts/production-agent.trace |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Missing project/model returns errors, stop aborts stream without fake completion. | missing | artifacts/production-agent.trace |

## Blockers

- Needs browser canvas proof, socket stream proof, and skill activation evidence.

