# Apply

Apply this bounded capability only after reading:

1. `BUILDPRINT.md`
2. `references/evolution-runtime-basis.md`
3. `00-host-assessment.md`
4. `00-assessment-questions.md`
5. `01-integration-plan.md`
6. `02-implementation-phases/`
7. `verify.md`

## Inspect

Host assessment is a hard gate. Classify findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. Record the decision and block when the evaluator, editable surfaces, hidden tests, sandbox, budget, rollback, or claim target is unsafe or unclear.

Minimum inspect outputs:

- baseline and best-snapshot commands;
- visible vs hidden test locations;
- evaluator checksum feasibility;
- editable-surface allowlist draft;
- sandbox boundary and secret isolation;
- archive persistence path.

## Steps

- Produce `.buildprint/host-assessment.md`.
- Ask unresolved hard-stop questions from `00-assessment-questions.md`.
- Record integration path decision in `.buildprint/capability-plan.md`.
- Produce `.buildprint/evolution-runtime-plan.md` and `.buildprint/evolution-runtime-safety-plan.md`.
- Implement phases in order.
- Run `verify.md`.
- Write `.buildprint/evolution-runtime-receipt.md` and `.buildprint/capability-receipt.md`; reconcile every blocker.

## Forbidden

- Do not redesign the whole product or rebuild a generic eval framework from scratch.
- Do not mutate secrets, env files, deployment files, billing code, or production data.
- Do not allow the agent to patch evaluator, hidden tests, guardrails, or archive.
- Do not run generated candidate code without sandbox limits.
- Do not skip unit-test gate before benchmark eval.
- Do not claim self-improvement unless a repeated evaluator run beats the best snapshot or records a clear no-improvement result.

## Default v1 shape

Unless the capability plan explicitly chooses otherwise, implement **patch-loop** profile first:

```text
task spec -> snapshot -> one focused patch -> unit tests -> benchmark -> promote/rollback -> archive
```

Defer population-evolution and scaffold-self-improve until patch-loop receipts exist.
