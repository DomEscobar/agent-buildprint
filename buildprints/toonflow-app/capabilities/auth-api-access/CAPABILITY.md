# Local Login, Token Gate, And API Shell

Status: `INCLUDED_RISKY_REQUIRES_HARDENING`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Provide a local account login, issue bearer tokens, protect API and socket namespaces, and expose consistent JSON success/error responses without copying default credential values into implementation artifacts.
Status: INCLUDED_RISKY_REQUIRES_HARDENING; CONTRACT_SEAM_ONLY.
Dependencies: Backend auth route, token middleware, socket auth guard, user/settings persistence, negative auth tests, security review.
Stable behavior: Username/password check, token signing/verification, missing-token and invalid-token branches.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: yarn lint && API auth smoke test against local server
Required evidence: artifacts/auth-api-smoke.log and artifacts/browser-login.png; BLOCKED_WITH_REASON: server/browser auth flow was not run in this mapping.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs browser login proof, credential hardening, password hashing decision, and negative auth test artifacts.

## Behavior Contract

- User/system action: Provide a local account login, issue bearer tokens, protect API and socket namespaces, and expose consistent JSON success/error responses without copying default credential values into implementation artifacts.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_user and o_setting.tokenKey in SQLite.
- Failure/empty/loading/blocked states: Missing tokenKey, no token, invalid token, socket missing isolationKey.
- Provider/persistence/runtime/operational boundary: Local runtime only; no external provider.

## Stable vs Free

| Stable | Free |
|---|---|
| Provide a local account login, issue bearer tokens, protect API and socket namespaces, and expose consistent JSON success/error responses without copying default credential values into implementation artifacts. | Implementation framework/component/database abstraction. |
| Missing tokenKey, no token, invalid token, socket missing isolationKey. | Exact internal error class names. |
| yarn lint && API auth smoke test against local server | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/app.ts:100-118; source-real/src/routes/login/login.ts:17-41; source-real/src/lib/initDB.ts:13-25,264-315; source-real/src/socket/routes/scriptAgent.ts:7-34; source-real/src/socket/routes/productionAgent.ts:7-34

