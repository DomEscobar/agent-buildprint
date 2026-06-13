# 01 Integration Plan

## Objective

Map the generic Stripe subscription capability to this host repository and write `.buildprint/capability-plan.md` before implementation.

## Required plan

The plan must include:

- selected implementation path
- exact files likely to be touched or created
- dependency changes
- env/config changes
- persistence changes and migration strategy
- checkout route design
- webhook route design
- entitlement helper design
- UI/operator states
- verification commands and runtime checks
- blockers and hard-stop questions
- rollback notes

## Required output

Create:

```text
.buildprint/capability-plan.md
```

Use this shape:

```md
# Stripe Subscriptions Capability Plan

## Selected Host Path

## Files To Touch

## Dependency And Config Changes

## Persistence Changes

## Checkout Flow

## Webhook Flow

## Entitlement Flow

## User/Operator Surface

## Verification Plan

## Rollback Notes

## Hard-Stop Questions
```

## Proof before moving on

The plan must map every required capability surface to concrete host files or explicitly block.

## DO NOT

- Do not start implementation until the plan exists.
- Do not add Stripe keys or secret values.
- Do not choose an entitlement model silently when the host has multiple plausible models.

