# 04 User Operator Surface

## Objective

Expose the smallest useful key management surface so the capability is visible, usable, and not a hidden backend-only claim.

## Required inputs

- host UI or API response pattern
- selected owner/account/team surface from the plan
- setup/blocker states from config and persistence
- key lifecycle helpers

## Instructions

Add or adapt the smallest useful surface:

- list existing keys by prefix, name, status, scopes, created, and last used
- create key flow with one-time full secret display
- revoke key action
- rotate or replacement path when approved by the plan
- scope selection or safe default scope
- setup/blocked state when required host primitives are missing
- operator/audit note only if the host already has admin/operator patterns

## Proof before moving on

- user/operator can create a key and see the full secret exactly once
- later views show prefix/metadata only, not the secret
- revoked keys are clearly marked or removed according to host pattern
- missing config/persistence is actionable

## DO NOT

- Do not build a whole developer portal unless requested.
- Do not hide setup failures behind generic 500 errors.
- Do not add marketing UI unrelated to the capability.
- Do not expose full key secret in list/detail views.
