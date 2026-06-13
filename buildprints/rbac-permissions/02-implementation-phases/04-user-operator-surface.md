# 04 User Operator Surface

## Objective

Expose clear denied, missing-role, and admin/bootstrap states without building unrelated product UI.

## Required inputs

- protected surface from phase 03
- host UI/API response pattern
- RBAC helper result shape
- admin bootstrap decision

## Instructions

Add or adapt the smallest useful surface:

- denied access response/page/state
- missing-role setup/blocker state
- admin bootstrap instruction or seed path
- optional admin role display where the host already has a settings/admin area

## Proof before moving on

- non-privileged access produces an intentional denied state
- missing role is actionable
- privileged access is not hidden behind client-only assumptions

## DO NOT

- Do not build a full admin dashboard unless requested.
- Do not leak protected data in denied responses.
- Do not silently redirect denied users without explaining the access boundary.

