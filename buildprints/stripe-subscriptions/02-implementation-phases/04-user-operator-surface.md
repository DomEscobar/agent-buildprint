# 04 User Operator Surface

## Objective

Expose honest user and operator states so the integration is visible, debuggable, and not a hidden backend-only claim.

## Required inputs

- host UI or API response pattern
- selected billing/account surface from the plan
- setup/blocker states from config
- entitlement helper

## Instructions

Add or adapt the smallest useful surface:

- billing/account action to start checkout
- subscription status display or API response
- blocked setup state when required env vars are missing
- canceled/past-due/active states where the host has a surface for them
- operator/debug note only if the host already has admin/operator patterns

## Proof before moving on

- a user or API consumer can see whether billing is configured, active, blocked, or unavailable
- paid access checks are based on entitlement state, not UI assumptions
- missing config is actionable

## DO NOT

- Do not build a whole billing dashboard unless requested.
- Do not hide setup failures behind generic 500 errors.
- Do not add marketing UI unrelated to the capability.

