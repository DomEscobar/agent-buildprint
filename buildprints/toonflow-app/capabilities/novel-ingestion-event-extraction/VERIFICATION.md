# Verification: Novel Import And Chapter Event Extraction

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | API import + generate event using sandbox text provider | missing | artifacts/novel-event-extraction.log |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/novel-event-extraction.log |
| runtime/API/browser | BLOCKED_WITH_REASON: AI provider proof unavailable. | blocked | Needs provider sandbox, asynchronous state proof, and malformed AI-output handling evidence. |
| persistence/restart | write/read/restart proof required | missing | artifacts/novel-event-extraction.log |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Empty novelIds returns failure response and does not mutate unrelated chapters. | missing | artifacts/novel-event-extraction.log |

## Blockers

- Needs provider sandbox, asynchronous state proof, and malformed AI-output handling evidence.

