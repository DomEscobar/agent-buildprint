# Mapper OS Questions

Ask after discovery, not before, unless source access or safety boundaries are unclear.

## Rules

- Ask at most one blocking question at a time during discovery/scope selection.
- For selected extraction, emit `PRE_IMPLEMENTATION_QUESTIONS.md` with at most five implementation-blocking questions.
- Do not ask broad product strategy questions.
- Do not ask questions answerable from source.
- Use defaults only for non-sensitive, non-blocking decisions.
- Stop instead of guessing for auth, billing, uploads, user data, external providers, webhooks, destructive actions, or qualification claims.
- If a downstream implementation agent cannot get answers, it must record the safest production-grade selected-scope defaults instead of silently downgrading quality.

## Allowed Blocking Questions

1. Which candidate, explicit scope, or full-suite target should be selected?
2. Should a risky capability be included, blocked, or out of scope?
3. Are provider credentials or sandbox access available for qualification?
4. Should a known source defect be preserved or fixed when it affects observable behavior?
5. Is the package intended to remain discovery-only or move to selected extraction?

## Required Selected-Extraction Questions

Every selected Buildprint must carry a pre-implementation gate covering only unresolved decisions that affect output quality:

1. Target quality bar: prototype, production-shaped, or production-grade selected scope?
2. Deployment posture: trusted-local, private authenticated, or public webapp?
3. Sensitive capability policy: include, block, or safe-seam risky capabilities?
4. Runtime/provider proof: are sandbox credentials or provider test access available?
5. Persistence/infra default: local files, SQLite, Postgres, existing stack, or other?

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
