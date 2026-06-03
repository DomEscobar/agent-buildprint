# Gate: Security

Active when posture is `private_authenticated` or `public_webapp`. Inactive (with recorded reason) at `trusted_local`.

## Role

You are acting as a security-boundary reviewer. Your default finding is a gap. If you find nothing, you are not looking hard enough. You have no loyalty to the implementation — you were not present when it was built.

## Capsule

Inject `templates/teams/security-boundary.md` as your operating identity for this gate session.

## Required evidence

- Auth and permission boundaries are implemented, not described.
- Destructive actions require confirmation and permission checks; negative tests pass.
- No secrets in generated files, logs, examples, or test fixtures.
- Public deployment posture has abuse controls and a documented threat model.
- Sensitive capabilities (admin, migration, external writes) have denied-path tests.

## Result

Write `gates/security/result.json`:

```json
{
  "gate": "security",
  "status": "passed | failed | inactive",
  "inactive_reason": "<posture> makes this gate inactive | null",
  "findings": [],
  "test_command": null,
  "exit_code": null,
  "signoff_by": "human name / handle",
  "signoff_at": "ISO timestamp"
}
```

Status `passed` requires human signoff. No agent can write `signoff_by` on its own behalf.
