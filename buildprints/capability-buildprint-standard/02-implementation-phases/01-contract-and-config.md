# 01 Contract And Config

## Objective

Add or adapt the capability's contract layer before core behavior is wired into the host app.

## Implement

- dependencies or SDK clients
- typed/local provider interfaces where useful
- env example entries without secret values
- config loaders and missing-config blocked states
- schema or migration draft for persisted capability state
- shared constants/types for the capability

## Proof before moving on

- dependency/config changes are explicit
- missing required env or services produce actionable blockers
- migration or schema changes are documented
- no secret values are written

## DO NOT

- Do not wire user-facing behavior before the contract/config surface exists.
- Do not hide missing configuration behind generic runtime errors.
- Do not count installed packages as a working capability.

