# CONTRACTS

## Shared Boundaries

- Source independence: downstream implementers must not need `source-real` to understand product obligations.
- Reimplementation freedom: match behavior and proof obligations, not source internals.
- Secret handling: record env/config/field names only. Do not copy default credentials, provider keys, tokens, or user data into tests/logs/docs.
- Provider handling: production provider behavior requires sandbox/live proof. Test doubles are allowed only as test fixtures and must not qualify live provider behavior.
- Persistence: stateful claims require create/read/update/delete plus restart/readback proof where applicable.
- Observability: long-running provider jobs, destructive admin actions, upload operations, and auth failures require logs or audit events.

## Cross-Capability Contracts

| Contract | Applies to | Stable behavior | Verification |
|---|---|---|---|
| Auth gate | All API/socket capabilities after login | Login is the only unauthenticated route; protected APIs reject missing/invalid token; protected sockets disconnect unauthenticated clients. | Auth smoke and negative token tests. |
| Local data root | Persistence, files, skills, vendors, models | All app-local data lives under a configured local data root and rejects path escape. | Path traversal tests and filesystem readback. |
| Task state | AI generation/extraction/video/memory summaries | Long-running tasks expose pending/running/success/failure with error reason and no fake success. | Polling and failure-state tests. |
| Provider boundary | Text, image, video, tts, model tests | Adapters declare inputs/models and return contract-shaped outputs; missing credentials fail clearly. | Schema tests plus sandbox/live provider proof. |
| UI evidence | All user-facing flows | UI states must be proven in browser/Electron, including empty/loading/error/success/blocked states. | Playwright/Electron screenshots/traces. |
| Destructive admin | DB import/export/clear/reset | Requires explicit confirmation, auth, backup safety, audit log, and isolated test DB. | Security review and isolated roundtrip tests. |

