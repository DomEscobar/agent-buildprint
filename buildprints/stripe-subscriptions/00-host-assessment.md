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

## Blockers

## Assumptions
```

## Proof before moving on

The assessment must identify a user identity path and a persistence path. If either is missing, block before planning.

## DO NOT

- Do not edit source files in this phase.
- Do not infer a database migration path without evidence.
- Do not assume checkout redirect equals paid entitlement.

