# 01 Contract And Config

## Objective

Add the billing contract, dependency, environment contract, and persistence plan without wiring user-facing behavior yet.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- host package manager
- host env/config pattern
- host persistence/migration pattern

## Instructions

Add or adapt:

- Stripe SDK dependency or existing approved wrapper
- env example entries for required Stripe variables
- typed/configured access to Stripe settings
- missing-config blocked state or actionable error
- customer/subscription/entitlement persistence fields or migration
- TypeScript/types/contracts if the host uses them

Minimum persisted state should cover:

- user id
- Stripe customer id
- Stripe subscription id
- subscription status
- current period or entitlement expiry when available
- updated timestamp or event timestamp

## Proof before moving on

- dependency/config changes are visible
- env example documents required keys without secret values
- persistence changes are represented in the host's real migration/schema path or blocked explicitly

## DO NOT

- Do not add real secret values.
- Do not create an orphan schema that the host will not run.
- Do not wire checkout or webhook routes before config and persistence are defined.

