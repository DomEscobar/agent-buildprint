# Apply Protocol

## Objective

Install the RBAC Permissions capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `01-integration-plan.md`.
4. Implement each file in `02-implementation-phases/` in order.
5. Run `verify.md`.
6. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep RBAC bounded. Do not redesign auth, add a full team/workspace model, or build an admin console unless the plan says that scope is required and approved.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes user identity, role source, default role, admin bootstrap, tenant/team boundaries, protected surface selection, migration strategy, or existing authorization migration, stop and ask before source edits.

## Security rule

RBAC is deny-by-default:

- unknown user: deny
- unknown role: deny
- unknown permission: deny
- missing role source: block or deny with an actionable state

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not scatter permissions across unrelated files.
- Do not protect only client-side UI.
- Do not claim success without allow and deny proof.
