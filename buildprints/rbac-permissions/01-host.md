# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

# 00 Host Assessment

## Objective

Inspect the host repository and write `.buildprint/host-assessment.md` before any source edits.

## Required assessment

Record:

- framework and router
- package manager
- auth/session model
- stable user id shape
- existing role, permission, admin, team, or membership model
- persistence and migration path
- current protected route/action pattern
- candidate protected surface for proof
- available test/lint/typecheck/build commands
- baseline health from available install/lint/test/typecheck/build/schema commands, or why they could not run
- finding classifications: `infer safely`, `patch locally`, `must ask user`, or `out of scope`
- unresolved implementation-changing questions
- hard-stop blockers

## Required output

Create:

```text
.buildprint/host-assessment.md
```

Use this shape:

```md
# RBAC Host Assessment

## Host Summary

## Detected Framework And Router

## Auth/User Identity

## Existing Authorization Signals

## Role Storage Or Derivation Path

## Candidate Protected Surfaces

## Persistence And Migrations

## Commands Available

## Baseline Health

## Finding Classifications

## Blockers

## Assumptions

## Decision
```

## Proof before moving on

The assessment must identify a stable user identity path, at least one protected surface for allow/deny proof, and a trustworthy baseline proof path.

Use `block` when any unresolved finding would change user identity, role source, default role, admin bootstrap, tenant/team boundaries, protected surface selection, migration strategy, or existing authorization migration.

## DO NOT

- Do not edit source files in this phase.
- Do not assume every app needs a database role table.
- Do not treat UI hiding as authorization.
- Do not convert hard-stop questions into assumptions.


## Integration plan

# 01 Integration Plan

## Objective

Map the generic RBAC capability to this host repository and write `.buildprint/capability-plan.md` before implementation.

## Required plan

The plan must include:

- selected role model
- explicit permission matrix
- default role behavior
- admin bootstrap path
- exact files likely to be touched or created
- persistence or role derivation strategy
- central authorization helper design
- protected route/action wiring
- denied/missing-role states
- verification commands and fixtures
- rollback notes
- hard-stop questions
- reconciliation with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking

## Required output

Create:

```text
.buildprint/capability-plan.md
```

Use this shape:

```md
# RBAC Capability Plan

## Selected Host Path

## Role Model

## Permission Matrix

## Default Role And Bootstrap

## Files To Touch

## Persistence Or Role Source

## Authorization Helper

## Protected Surfaces

## Denied/Misconfigured States

## Verification Plan

## Assessment Reconciliation

## Rollback Notes

## Hard-Stop Questions
```

## Proof before moving on

The plan must map every protected permission to a role decision and concrete host file.

## DO NOT

- Do not start implementation until the plan exists.
- Do not start implementation if `.buildprint/host-assessment.md` decision is `block`.
- Do not silently pick `admin` as a default role.
- Do not protect only the UI while leaving server routes open.


## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply Protocol

## Objective

Install the RBAC Permissions capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Write `.buildprint/capability-receipt.md`.

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


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
