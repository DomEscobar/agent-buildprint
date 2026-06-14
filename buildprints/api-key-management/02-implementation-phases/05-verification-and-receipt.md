# 05 Verification And Receipt

## Objective

Run verification and write the capability receipt.

## Required inputs

- implemented phases 01 through 04
- `verify.md`
- host commands
- available fixture or runtime proof path

## Required output

Create:

```text
.buildprint/capability-receipt.md
```

Use this shape:

```md
# API Key Management Capability Receipt

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

- `structure`: files and contracts exist, but no request/auth runtime proof
- `fixture`: key lifecycle and route auth tested with fixtures or mocks
- `runtime`: key lifecycle and selected API surface tested in the running host app

## DO NOT

- Do not mark `fixture` or `runtime` proof without real checks.
- Do not omit blocked checks.
- Do not claim API key management is complete when revoked or wrong-scope behavior is untested.
