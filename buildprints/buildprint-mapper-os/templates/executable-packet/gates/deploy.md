# Gate: Deploy

Active when posture is `private_authenticated` or `public_webapp`.

## Required evidence

- CI pipeline runs all verification commands (lint, typecheck, unit tests, smoke) on every commit.
- Deploy step is gated on CI pass.
- Zero-downtime or documented downtime window for deploy.
- Rollback procedure documented and tested.
- No manual deploy steps without runbook.

## Result

Write `gates/deploy/result.json`:

```json
{
  "gate": "deploy",
  "status": "passed | failed | inactive",
  "inactive_reason": null,
  "findings": [],
  "test_command": "<ci command>",
  "exit_code": 0
}
```

Auto-test sufficient. Provide the CI command and exit code.
