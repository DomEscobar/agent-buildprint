# 02 Core Integration

## Objective

Implement the central authorization helper that host code will use.

## Required inputs

- RBAC policy from phase 01
- user identity contract
- role source
- selected protected surface

## Instructions

Implement or adapt:

- `getUserRole` or equivalent role lookup
- `hasPermission` or `can` helper
- route/action guard helper when useful
- typed permission inputs where the host supports them
- actionable denied or missing-role result

Prefer one central helper over multiple route-specific checks.

## Proof before moving on

- helper denies unknown/missing roles
- helper denies unknown permissions
- helper grants expected permission to privileged role
- helper denies expected permission to non-privileged role

## DO NOT

- Do not duplicate policy logic in route files.
- Do not return `true` for missing role.
- Do not hide denied state behind generic errors.

