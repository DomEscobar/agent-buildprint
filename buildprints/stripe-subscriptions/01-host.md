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
- server route pattern
- auth/session model
- user identifier shape
- persistence layer and migration path
- env/config pattern
- test/lint/typecheck commands
- existing billing, entitlement, or access-control code
- surfaces likely to receive billing UI or blocked states
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
# Stripe Subscriptions Host Assessment

## Host Summary

## Detected Framework And Router

## Auth/User Identity

## Persistence And Migrations

## Env/Config Pattern

## Existing Billing Or Entitlements

## Candidate Integration Surfaces

## Commands Available

## Baseline Health

## Finding Classifications

## Blockers

## Assumptions

## Decision
```

## Proof before moving on

The assessment must identify a user identity path, a persistence path, and a trustworthy baseline proof path. If any are missing, block before planning.

Use `block` when any unresolved finding would change user identity, entitlement model, billing provider migration, subscription state ownership, persistence/migration strategy, Stripe product/price mapping, webhook delivery, or access-control behavior.

## DO NOT

- Do not edit source files in this phase.
- Do not infer a database migration path without evidence.
- Do not assume checkout redirect equals paid entitlement.
- Do not convert hard-stop questions into assumptions.


## Integration plan

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
- reconciliation with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking

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

## Assessment Reconciliation

## Rollback Notes

## Hard-Stop Questions
```

## Proof before moving on

The plan must map every required capability surface to concrete host files or explicitly block.

## DO NOT

- Do not start implementation until the plan exists.
- Do not start implementation if `.buildprint/host-assessment.md` decision is `block`.
- Do not add Stripe keys or secret values.
- Do not choose an entitlement model silently when the host has multiple plausible models.


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

Install the Stripe Subscriptions capability through a guarded, phased grafting workflow.

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

Keep the capability bounded. Do not redesign auth, rebuild the dashboard, replace the database layer, or migrate an existing billing provider unless the user explicitly approved that extra scope.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes user identity, entitlement model, billing provider migration, subscription state ownership, persistence/migration strategy, Stripe product/price mapping, webhook delivery, or access-control behavior, stop and ask before source edits.

## Blocked-state rule

If Stripe secrets, product IDs, webhook secrets, or sandbox access are unavailable, still implement safe configuration checks and record blocked runtime proof. Do not fake live billing verification.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not implement webhook handling without signature verification.
- Do not persist paid access from checkout redirect alone.
- Do not claim sandbox or live proof without running the relevant checks.


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
