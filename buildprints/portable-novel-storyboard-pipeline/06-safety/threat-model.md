# Threat Model

| Surface | Risk | Required control |
|---|---|---|
| Auth/session | unauthenticated API or realtime access | token/session checks and negative tests |
| Provider credentials | secret leakage | secret-name-only config and redacted logs |
| Uploads/files | path traversal or unsafe media reads | app data root containment and type checks |
| Generated structured output | corrupt state from malformed model output | validate before persistence |
| Destructive admin | accidental data loss | confirmation, auth, audit, isolated proof |
| Public deployment | local-only assumptions exposed | deployment hardening before public claim |

