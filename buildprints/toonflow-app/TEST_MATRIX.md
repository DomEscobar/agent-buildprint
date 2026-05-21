# TEST_MATRIX

This mapped Buildprint is `SELECTED_UNQUALIFIED`; tests are required gates for downstream implementation, not proof already completed.

| Surface | Required check | Evidence artifact | Current status |
|---|---|---|---|
| Static/build | Install dependencies and run lint/build/type checks for chosen target stack | `artifacts/static-build.log` | BLOCKED: `yarn` unavailable during mapping and `node_modules` absent |
| API/auth | Local API smoke tests including missing/invalid token branches | `artifacts/api-auth-smoke.log` | BLOCKED |
| Browser/Electron UI | Browser or Electron automation for user-facing flows and empty/loading/error/success states | screenshots/traces under `artifacts/browser/` | BLOCKED |
| Provider/runtime | Sandbox/live provider proof where safe, otherwise explicit blocker | `artifacts/provider-runtime.log` | BLOCKED |
| Persistence | Restart/readback/delete/export proof where claimed | `artifacts/persistence-proof.log` | BLOCKED |
| Security/privacy | Auth, uploads, provider VM, destructive admin, secret handling, and file/path boundary review | `artifacts/security-review.md` | BLOCKED |
| No-fake scan | Reject mocks/placeholders/no-op controls as product behavior | `artifacts/no-fake-scan.log` | Required |
| Clean-room reversal | Implement from Buildprint without source access and compare behavior contracts | `artifacts/reversal-report.md` | BLOCKED |
