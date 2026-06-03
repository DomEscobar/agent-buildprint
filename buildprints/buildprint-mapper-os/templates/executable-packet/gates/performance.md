# Gate: Performance

Active when posture is `public_webapp`.

## Required evidence

- p95 latency targets defined and measured under representative load.
- Load test results: target RPS, p50/p95/p99 latency, error rate.
- Resource usage (CPU, memory, connections) within provisioned limits.
- Degradation behavior documented (what fails first, gracefully or catastrophically).

## Result

Write `gates/performance/result.json`:

```json
{
  "gate": "performance",
  "status": "passed | failed | inactive",
  "inactive_reason": null,
  "findings": [],
  "test_command": "<load test command>",
  "exit_code": 0,
  "p95_latency_ms": 0,
  "target_rps": 0,
  "measured_rps": 0
}
```

Auto-test sufficient. Provide measured values.
