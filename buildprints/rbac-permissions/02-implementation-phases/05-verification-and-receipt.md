# 05 Verification And Receipt

## Objective

Run verification and write the capability receipt.

## Required inputs

- implemented phases 01 through 04
- `verify.md`
- host commands
- fixture users or test doubles for privileged and non-privileged roles

## Required output

Create:

```text
.buildprint/capability-receipt.md
```

Use this shape:

```md
# RBAC Permissions Capability Receipt

## Changed Files

## Implemented Policy

## Protected Surfaces

## Verification Commands

## Runtime Or Fixture Checks

## Blocked Checks

## Proof Level

## Known Risks

## Rollback Notes

## Not Proven
```

## Proof levels

- `structure`: files and contracts exist, but no allow/deny behavior was executed
- `fixture`: allow/deny/missing-role behavior tested with local fixtures, mocks, or unit tests
- `runtime`: allow/deny/missing-role behavior tested through the actual host route/action locally
- `production`: production authorization behavior verified with explicit approval

## DO NOT

- Do not mark `runtime` proof when only helper unit tests ran.
- Do not omit denied-path proof.
- Do not claim RBAC is complete if only UI hiding was tested.

