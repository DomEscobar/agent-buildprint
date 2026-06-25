# Apply

Apply this bounded capability only after reading:

1. `00-host-assessment.md`
2. `00-assessment-questions.md`
3. `01-integration-plan.md`
4. `02-implementation-phases/`
5. `verify.md`
6. `.buildprint/capability-receipt.md`

## Inspect

Host assessment is a hard gate. Classify findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. Record the decision and block when the evaluator, sandbox, budget, mutation scope, rollback, or claim target is unsafe or unclear.

## Steps

- Produce `.buildprint/host-assessment.md`.
- Ask unresolved hard-stop questions.
- Produce `.buildprint/capability-plan.md`.
- Implement phases in order.
- Run `verify.md`.
- Write `.buildprint/capability-receipt.md` and reconcile every blocker.

## Forbidden

- Do not redesign the whole product.
- Do not mutate secrets, env files, deployment files, billing code, or production data.
- Do not run generated candidate code without sandbox limits.
- Do not claim self-improvement unless a repeated evaluator run beats baseline or records a clear no-improvement result.

