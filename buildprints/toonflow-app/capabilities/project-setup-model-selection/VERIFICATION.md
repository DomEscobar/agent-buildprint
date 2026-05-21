# Verification: Project Setup And Model Selection

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | API create/edit/list smoke test with SQLite readback | missing | artifacts/project-crud.log |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/project-crud.log |
| runtime/API/browser | BLOCKED_WITH_REASON: API/runtime proof not executed. | blocked | Needs runtime CRUD proof and UI state screenshots. |
| persistence/restart | write/read/restart proof required | missing | artifacts/project-crud.log |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Reject missing required project fields. | missing | artifacts/project-crud.log |

## Blockers

- Needs runtime CRUD proof and UI state screenshots.

