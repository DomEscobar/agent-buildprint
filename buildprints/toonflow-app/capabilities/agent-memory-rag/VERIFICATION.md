# Verification: Agent Memory And Local RAG

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | Memory add/get/clear test with local ONNX model and restart readback | missing | artifacts/memory-rag.log |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/memory-rag.log |
| runtime/API/browser | BLOCKED_WITH_REASON: ONNX/runtime test not run. | blocked | Needs ONNX proof, summary provider proof, and isolation-key negative tests. |
| persistence/restart | write/read/restart proof required | missing | artifacts/memory-rag.log |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Missing model file fails clearly; clear scope does not delete unrelated isolation keys. | missing | artifacts/memory-rag.log |

## Blockers

- Needs ONNX proof, summary provider proof, and isolation-key negative tests.

