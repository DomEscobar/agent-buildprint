# 01 Contract And Config

## Objective

Define the RBAC contract before wiring authorization behavior.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- selected role model
- host persistence or role derivation path

## Instructions

Add or adapt:

- role names
- permission names
- role-to-permission matrix
- default role definition
- admin bootstrap rule
- role storage or derivation schema
- types/constants if the host uses TypeScript

The contract should be centralized in one obvious module or policy file when the host architecture allows it.

## Minimum policy behavior

- default role is least privilege
- admin/owner role is explicit
- unknown role is denied
- unknown permission is denied

## Proof before moving on

- permission policy is visible and centralized
- role storage or derivation path is documented in code or migration
- no protected route/action has been wired before the policy exists

## DO NOT

- Do not use string literals scattered across routes.
- Do not make the default user role privileged.
- Do not create a role schema that the host cannot read.

