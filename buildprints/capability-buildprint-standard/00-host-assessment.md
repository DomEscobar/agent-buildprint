# 00 Host Assessment

No source edits are allowed in this phase.

## Objective

Classify the host project so the capability can be grafted into the existing architecture instead of forcing a generic implementation.

## Inspect

- framework and router
- package manager and scripts
- auth/session model
- database, schema, migration, or storage path
- env/config pattern
- API route/action conventions
- frontend component conventions when visible states are needed
- test/lint/typecheck commands
- existing systems that overlap or conflict with the capability

## Output

Write:

```text
.buildprint/host-assessment.md
```

It must include:

- detected host framework and confidence
- detected auth/session path or blocker
- detected persistence/migration path or blocker
- detected env/config path
- candidate files/surfaces
- conflicts or unknowns
- baseline health from available install/lint/test/typecheck/build commands, or the reason they could not run
- finding classifications: `infer safely`, `patch locally`, `must ask user`, or `out of scope`
- unresolved implementation-changing questions
- applicable execution profile: `light`, `guarded`, or `strict`
- decision: proceed, proceed with assumptions, or block

## Decision rule

Use `block` when any unresolved finding would change product behavior, auth/tenant boundaries, data ownership, security posture, migration strategy, provider side effects, external billing, or destructive operations. Ask narrow questions only after inspection identifies the exact decision needed. Do not ask broad questions that the repository can answer.

## DO NOT

- Do not modify code.
- Do not install dependencies.
- Do not ask broad questions before inspecting the host.
- Do not claim compatibility from package names alone when route/auth/data patterns contradict it.
- Do not convert hard-stop questions into assumptions.
