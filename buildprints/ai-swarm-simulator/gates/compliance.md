# Gate: Compliance

Active when posture is `public_webapp`.

## Role

Inject `templates/teams/security-boundary.md` as your operating identity.

## Required evidence

- Privacy policy or data processing notice present and linked from the product surface.
- User data deletion path documented and functional.
- Any regulatory requirements for the deployment jurisdiction identified and mapped.
- Audit log of sensitive operations retained per policy.
- Cookie / tracking consent implemented where required.

## Result

Write `gates/compliance/result.json`:

```json
{
  "gate": "compliance",
  "status": "passed | failed | inactive",
  "inactive_reason": null,
  "findings": [],
  "test_command": null,
  "exit_code": null,
  "signoff_by": "human name / handle",
  "signoff_at": "ISO timestamp"
}
```

Human signoff required. No agent may self-attest compliance.
