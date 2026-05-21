# Verification: Local Login, Token Gate, And API Shell

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | yarn lint && API auth smoke test against local server | missing | artifacts/auth-api-smoke.log and artifacts/browser-login.png |
| contract test | API/domain contract rejects malformed input and proves success state | missing | artifacts/auth-api-smoke.log and artifacts/browser-login.png |
| runtime/API/browser | BLOCKED_WITH_REASON: server/browser auth flow was not run in this mapping. | blocked | Needs browser login proof, credential hardening, password hashing decision, and negative auth test artifacts. |
| persistence/restart | write/read/restart proof required | missing | artifacts/auth-api-smoke.log and artifacts/browser-login.png |
| no-fake | zero critical findings; no seam-only proof promoted | missing | CAPABILITY_INDEX.md |
| negative test | Invalid token and missing token must return 401 or disconnect socket. | missing | artifacts/auth-api-smoke.log and artifacts/browser-login.png |

## Blockers

- Needs browser login proof, credential hardening, password hashing decision, and negative auth test artifacts.

