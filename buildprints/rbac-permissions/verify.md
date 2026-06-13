# Verify

## Objective

Prove the RBAC Permissions capability works at the highest honest proof level available.

## Required command checks

Run available host checks:

- tests
- lint
- typecheck
- build

If a command does not exist, record that in `.buildprint/capability-receipt.md`.

## Required structural checks

Confirm:

- role names are explicit
- permission names are explicit
- permission matrix is centralized
- central helper denies unknown roles and permissions
- protected server-side route/action calls the central helper
- denied and missing-role states are intentional

## Required fixture/runtime checks

At `fixture` proof or higher:

- privileged user can access protected action
- non-privileged user is denied
- unknown or missing role is denied or blocked clearly
- permission helper tests cover allow and deny paths

At `runtime` proof or higher:

- actual host route/action is exercised locally with privileged identity
- actual host route/action is exercised locally with non-privileged identity
- direct API/action access cannot bypass RBAC

## Blocked checks

Record blockers for:

- missing auth/session model
- ambiguous default role
- ambiguous admin bootstrap path
- existing authorization system without migration decision
- host test harness unavailable

## Pass condition

The capability can be called installed only if:

- command checks pass or are honestly unavailable
- structural checks pass
- fixture/runtime checks pass at the claimed proof level
- denied path is proven
- `.buildprint/capability-receipt.md` exists

