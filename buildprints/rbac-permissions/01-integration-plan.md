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
