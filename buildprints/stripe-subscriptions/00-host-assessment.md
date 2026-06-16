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
