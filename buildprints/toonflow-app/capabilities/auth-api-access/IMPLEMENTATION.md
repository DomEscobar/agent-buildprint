# Implementation: Local Login, Token Gate, And API Shell

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Provide a local account login, issue bearer tokens, protect API and socket namespaces, and expose consistent JSON success/error responses without copying default credential values into implementation artifacts.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Invalid token and missing token must return 401 or disconnect socket.
2. Implement topology: Backend auth route, token middleware, socket auth guard, user/settings persistence, negative auth tests, security review.
3. Add runtime/browser/provider/persistence proof hooks: yarn lint && API auth smoke test against local server
4. Update root and capability verification ledgers with artifact paths.

## Repair Loop

- Failed check: capture command, API/browser path, and observed failure.
- Structured feedback: map failure to UI/API/domain/persistence/provider layer.
- Focused fix: repair only the failing layer and adjacent contract.
- Rerun: repeat the exact proof command plus relevant negative test.
- Pass or blocker: either attach artifact or downgrade with blocker.

## Fresh Review

Required when touching auth, uploads, provider code, destructive operations, persistence migration, socket streaming, Electron/Docker runtime, or user data.

## Stop Conditions

- Needs browser login proof, credential hardening, password hashing decision, and negative auth test artifacts.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

