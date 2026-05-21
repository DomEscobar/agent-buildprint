# SECURITY

Security-boundary review is required before qualification.

| Risk surface | Required hardening | Negative test / artifact | Status |
|---|---|---|---|
| Local auth/token gate | password/token policy, invalid/expired token behavior, socket auth isolation | `artifacts/auth-api-smoke.log` | blocked |
| Uploads/local files | path containment, file type/size policy, delete boundaries | upload traversal/invalid-file tests | blocked |
| Programmable vendor VM | sandbox escape prevention, secret-name-only config, adapter validation | VM escape and unsafe code tests | blocked |
| Destructive DB admin | confirmation UX, backup-before-reset policy, restore validation, audit/result feedback | isolated export/import/clear roundtrip | blocked |
| User/project data | secret scan, no production data in artifacts, export/delete semantics | generated-output and runtime secret scans | blocked |
| Public/deployment posture | explicit trusted-local/private/public decision before exposure | deployment decision record | blocked |
