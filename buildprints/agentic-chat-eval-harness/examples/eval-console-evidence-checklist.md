# Eval Console Evidence Checklist

Required screenshot evidence for phase 05 / phase 06 console proof. Store under `.buildprint/eval-console-evidence/`.

## Required captures (desktop)

| File | View | Must show |
| --- | --- | --- |
| `run-detail.png` | Run Detail | run id, scenario id, gate results, claim ceiling banner, artifact paths |
| `gate-failure.png` | Gate Failure Panel | failure record triad: verifier outcome, agent behavior excerpt, abstract mechanism |
| `regression-diff.png` | Regression Diff | baseline vs current gate delta, missing span types, pass/fail change |

## Optional captures (when profile enabled)

| File | View | Must show |
| --- | --- | --- |
| `trace-timeline.png` | Trace Timeline | parent/child spans, span_type filter active |
| `scenario-debugger.png` | Scenario Debugger | stepped turn or operator cancel injection |
| `adversarial-library.png` | Adversarial Library | case version, bypass/blocked classification |
| `ui-artifact-diff.png` | UI Artifact Diff | expected vs captured screenshot/DOM |

## Evidence rules

- Screenshots must come from real host runs, not mock/seeded data
- Claim ceiling banner must match receipt `proof_level`
- Failed gates must be visible — do not screenshot only happy paths
- Redact secrets and private transcript content per safety plan
- Link evidence paths in `.buildprint/agentic-chat-eval-receipt.md`

## Blocker template

If console cannot be built, record in receipt:

```text
Console blocker: <reason>
Claim ceiling capped at: fixture
Next action: <what unblocks console>
```
