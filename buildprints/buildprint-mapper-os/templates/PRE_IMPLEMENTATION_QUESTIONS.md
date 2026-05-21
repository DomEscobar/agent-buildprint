# PRE_IMPLEMENTATION_QUESTIONS

Ask before coding unless the answers are already explicit in this package or in the user request.

Purpose: prevent silent scope collapse, unsafe guessing, and implementation-harness mismatch. These are not broad product-strategy questions; ask only when the answer changes security, scope, provider behavior, persistence, deployment, or qualification status.

## Quality Mandate

Mapper OS always targets the strongest Buildprint possible for the requested scope. Do not offer quality tiers. Quality must not silently downgrade. Scope must not silently shrink. If proof is missing, preserve the capability in the readiness map and mark the blocker honestly.

## Rules

- Ask at most five questions total.
- Ask only unresolved blocking questions.
- Do not ask questions answerable from source evidence.
- Do not ask broad product strategy questions.
- If the user is unavailable, choose concrete safest max-quality selected-scope defaults and record them in `CURRENT_STATE.md` under `Assumptions / Safe Defaults`.
- Never silently downgrade quality or omit capabilities because an answer is missing.
- Do not ask "which team should do this" or offer lazy/simple/quick quality choices. Infer required team packs from product shape and record them in `TEAM_STACK.md`.
- For auth, billing, uploads, user data, external providers, webhooks, destructive actions, deployment posture, or qualification claims: ask, block, or apply the safe default below. Do not guess casually.

## Minimal Blocking Questions

1. **Scope / capability boundary?**
   - If the requested scope is ambiguous, which candidate, explicit scope, or full-suite target should be built first?
   - Safe default if unavailable: preserve the discovered/requested scope in the readiness map and choose only the first implementation slice; do not erase later capabilities.

2. **Deployment posture?**
   - Options: trusted-local only, private authenticated app, public webapp.
   - Safe default if unavailable: trusted-local only, with an explicit public-deployment blocker and visible operator warning.

3. **Sensitive capability policy?**
   - Should risky capabilities such as auth, payments, providers, uploads, destructive actions, external writes, or user-data operations be included now, blocked, or implemented behind safe seams?
   - Safe default if unavailable: preserve the capability as included-but-blocked/needs-proof where appropriate; block destructive/external side-effect expansion; implement safe seams and tests for required provider/upload boundaries.

4. **Runtime/provider proof availability?**
   - Are sandbox credentials, provider test access, runtime services, or browser/runtime environments available?
   - Safe default if unavailable: implement production adapter contracts plus isolated fake/test providers only for tests; mark live/runtime qualification blocked.

5. **Persistence / infrastructure default?**
   - Options: source-observed stack, existing project stack, SQLite, Postgres, durable queue/object store, local files only when explicitly justified, or other.
   - Safe default if unavailable: choose the strongest lightweight durable store appropriate for the selected capability and preserve missing infra proof as a blocker.

## Concrete Safe Defaults

When a selected output has no user answers yet, include an explicit defaults section instead of vague "safest defaults" wording. Adapt labels to the product shape, but make the decision executable.

- Provider mode: sandbox/test-double adapters only unless live credentials are supplied; live-provider qualification remains blocked.
- Persistence: local durable filesystem or SQLite for the first slice unless the target stack clearly provides a stronger existing database; restart/readback proof is required.
- Destructive actions: local-only confirmation unless auth/admin ownership is already in scope and proven.
- First vertical slice: the smallest real end-to-end path that moves user/source input through persistence, domain logic, and visible output.
- Deployment target: local dev only unless the user supplied Docker/hosted deployment requirements.
- Qualification: keep `SELECTED_UNQUALIFIED` until live providers, runtime, browser, persistence, security, and no-fake gates are proven.

## Required Confirmation Summary

Before implementation, write or update `CURRENT_STATE.md` with:

```text
## Pre-Implementation Alignment

- Quality mandate: max-quality for requested scope; no quality-tier choice offered
- Requested scope:
- Selected target / first slice:
- Capability readiness summary:
- Deployment posture:
- Sensitive capabilities policy:
- Provider/runtime proof:
- Persistence/infra default:
- Safe defaults applied:
- Remaining blockers:
- Implementation-team signals:
- Required team packs:
```
