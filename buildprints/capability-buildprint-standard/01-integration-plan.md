# 01 Integration Plan

No source edits are allowed in this phase.

## Objective

Translate the generic Capability Buildprint into a host-specific implementation plan.

## Required inputs

- `capability.yaml`
- `compatibility.md`
- `.buildprint/host-assessment.md`

## Output

Write:

```text
.buildprint/capability-plan.md
```

It must include:

- selected implementation path
- files likely to be touched
- dependencies/config/env changes
- data model or migration plan
- user/operator visible states needed
- verification checks to run
- blocked claims and external requirements
- rollback or recovery notes for guarded/strict profiles
- hard-stop questions only when an implementation-changing decision cannot be inferred
- reconciliation with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking

## Proceed rule

Implementation can start only after the plan clearly maps:

```text
capability contract -> host architecture -> phase sequence -> verification route
```

## DO NOT

- Do not write a generic plan that could fit any repo.
- Do not skip conflicts discovered in host assessment.
- Do not proceed on secrets, billing, auth, migrations, or destructive side effects without explicit blocked states or safe sandbox assumptions.
- Do not proceed when the assessment decision is `block`.
