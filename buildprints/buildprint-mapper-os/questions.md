# Mapper OS Questions

Ask after discovery, not before, unless source access or safety boundaries are unclear.

## Rules

- Ask at most one blocking question at a time.
- Do not ask broad product strategy questions.
- Do not ask questions answerable from source.
- Use defaults only for non-sensitive, non-blocking decisions.
- Stop instead of guessing for auth, billing, uploads, user data, external providers, webhooks, destructive actions, or qualification claims.

## Allowed Blocking Questions

1. Which candidate, explicit scope, or full-suite target should be selected?
2. Should a risky capability be included, blocked, or out of scope?
3. Are provider credentials or sandbox access available for qualification?
4. Should a known source defect be preserved or fixed when it affects observable behavior?
5. Is the package intended to remain discovery-only or move to selected extraction?

## Confirmation Summary

After answers, summarize:

```text
Mapping alignment summary
- Source input:
- Output mode:
- Selected scope:
- Included capabilities:
- Out-of-scope capabilities:
- Blocked capabilities:
- Sensitive surfaces:
- Required hardening artifacts:
- Qualification label:
- Next capability:
```
