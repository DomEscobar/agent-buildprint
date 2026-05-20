# PRE_IMPLEMENTATION_QUESTIONS

Ask before coding unless the answers are already explicit in this package or in the user request.

Purpose: prevent silent quality collapse. These are not broad product-strategy questions; ask only when the answer changes implementation quality, security, scope, provider behavior, persistence, or qualification status.

## Rules

- Ask at most five questions total.
- Ask only unresolved blocking questions.
- Do not ask questions answerable from source evidence.
- Do not ask broad product strategy questions.
- If the user is unavailable, choose the safest production-grade selected-scope default and record it in `CURRENT_STATE.md` under `Assumptions / Safe Defaults`.
- Never silently downgrade to prototype quality because an answer is missing.
- For auth, billing, uploads, user data, external providers, webhooks, destructive actions, or qualification claims: ask, block, or apply the safe default below. Do not guess casually.

## Minimal Blocking Questions

1. **Target quality bar?**
   - Options: prototype, production-shaped, production-grade selected scope.
   - Safe default if unavailable: production-grade selected scope.

2. **Deployment posture?**
   - Options: trusted-local only, private authenticated app, public webapp.
   - Safe default if unavailable: trusted-local only, with an explicit public-deployment blocker and visible operator warning.

3. **Sensitive capability policy?**
   - Should risky capabilities such as auth, payments, providers, uploads, destructive actions, or external writes be included, blocked, or implemented behind safe seams?
   - Safe default if unavailable: include only the selected capability; block destructive/external side-effect expansion; implement safe seams and tests for required provider/upload boundaries.

4. **Runtime/provider proof availability?**
   - Are sandbox credentials or provider test access available?
   - Safe default if unavailable: implement production adapter plus isolated fake/test provider; mark live-provider qualification blocked.

5. **Persistence / infrastructure default?**
   - Options: local files, SQLite, Postgres, existing project stack, or other.
   - Safe default if unavailable: choose the strongest lightweight durable store appropriate for the quality bar; for production-grade selected scope, prefer SQLite or a concurrency-safe store over raw JSON unless explicitly justified.

## Required Confirmation Summary

Before implementation, write or update `CURRENT_STATE.md` with:

```text
## Pre-Implementation Alignment

- Quality bar:
- Deployment posture:
- Selected scope confirmed:
- Sensitive capabilities policy:
- Provider/runtime proof:
- Persistence/infra default:
- Safe defaults applied:
- Remaining blockers:
```
