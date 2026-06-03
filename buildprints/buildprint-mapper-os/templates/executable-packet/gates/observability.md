# Gate: Observability

Active when posture is `private_authenticated` or `public_webapp`.

## Required evidence

- Structured logs emitted for all significant operations, errors, and state transitions.
- Health/readiness endpoint or equivalent returns machine-readable status.
- Error events observable from outside the process (logs, metrics, alerts).
- No sensitive data (PII, secrets) in log output.

## Result

Write `gates/observability/result.json`:

```json
{
  "gate": "observability",
  "status": "passed | failed | inactive",
  "inactive_reason": null,
  "findings": [],
  "test_command": "<command>",
  "exit_code": 0
}
```

Human signoff not required. Auto-test exit code 0 is sufficient.
