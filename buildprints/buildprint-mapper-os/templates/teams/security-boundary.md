# security-boundary

Purpose: prevent unsafe assumptions around sensitive operations.

## Required Output

- Auth, permission, secret, destructive-action, abuse, and data exposure boundaries.
- Negative tests for denied access, invalid input, unsafe side effects, and missing secrets.
- Secret-name-only contracts; no secret values in generated output or evidence.

## Blocks

- Plaintext secrets.
- Admin/destructive actions without permission and confirmation semantics.
- Public deployment posture without threat model and abuse controls.
- Sensitive capability promotion without security proof or blocker.
