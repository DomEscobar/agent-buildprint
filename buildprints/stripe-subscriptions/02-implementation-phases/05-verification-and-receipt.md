# 05 Verification And Receipt

## Objective

Run verification and write the capability receipt.

## Required inputs

- implemented phases 01 through 04
- `verify.md`
- host commands
- available Stripe sandbox/webhook proof level

## Required output

Create:

```text
.buildprint/capability-receipt.md
```

Use this shape:

```md
# Stripe Subscriptions Capability Receipt

## Changed Files

## Implemented Surfaces

## Verification Commands

## Runtime Checks

## Blocked Checks

## Proof Level

## Known Risks

## Rollback Notes

## Not Proven
```

## Proof levels

- `structure`: files and contracts exist, but no provider runtime proof
- `fixture`: local webhook/checkout behavior tested with fixtures or mocks
- `sandbox`: Stripe sandbox checkout and signed webhook tested
- `live`: production keys and live provider callbacks tested with explicit approval

## DO NOT

- Do not mark `sandbox` or `live` proof without real provider checks.
- Do not omit blocked checks.
- Do not claim billing is complete when entitlement readback is untested.

