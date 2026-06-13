# 05 Verification And Receipt

## Objective

Prove the capability at the highest honest proof level and write a receipt that the next agent or human can audit.

## Required input

- `verify.md`
- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`

## Output

Write:

```text
.buildprint/capability-receipt.md
```

It must include:

- capability name and execution profile
- changed files
- configured env names, without values
- proof level: `static`, `fixture`, `sandbox`, or `production`
- commands/checks run
- user/operator paths inspected
- passed checks
- blocked checks
- not-proven claims
- rollback or recovery notes
- recommended next step

## DO NOT

- Do not claim installed when verification is static-only and the capability needs runtime proof.
- Do not omit blocked external services.
- Do not hide failed checks in the receipt.

