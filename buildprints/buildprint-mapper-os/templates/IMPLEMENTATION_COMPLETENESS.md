# Implementation Completeness Contract

Purpose: prevent proof-only product claims. The selected scope may be small, but every included capability must be real, wired, and testable.

## Production-grade posture

- Selected scope:
- Production-grade by default: yes
- Smaller-than-source scope? yes/no
- If yes, excluded capabilities are removed from implementation rather than mocked/faked.

## Included capability inventory

For every route, screen, API, job, provider, export, import, setting, auth surface, billing flow, upload, or destructive action included in this Buildprint:

| Capability | Included? | Real implementation requirement | Persistence/durability | Error/empty/loading states | QA/runtime proof | Status |
|---|---:|---|---|---|---|---|
|  | yes/no |  |  |  |  | pending |

## No-fake implementation rules

- [ ] No mock provider is counted as product implementation. Mocks may exist only under test/demo fixture paths.
- [ ] No in-memory-only store is used for product data if persistence is claimed.
- [ ] No route-shaped links without real pages or handlers.
- [ ] No UI controls that do nothing, fake success, or silently skip side effects.
- [ ] No skeleton adapter is counted as implemented provider/API behavior.
- [ ] No fake auth, fake billing, fake export, fake queue, fake email, fake webhook, or fake upload path is counted as implemented.
- [ ] No `coming soon`, placeholder, TODO, or “not implemented” surface appears inside included product scope.
- [ ] Every included capability has validation, failure behavior, and visible/operator-observable error reporting.
- [ ] Every included async capability has durable state, retry semantics, cancellation semantics where claimed, and idempotency rules.
- [ ] Every included external side effect has credentials/env handling, timeout/rate-limit behavior, normalized errors, and a safe test strategy.

## Mock / fixture boundary

Mocks are allowed only if all are true:

1. They live in test/demo fixture code paths or are explicitly named `fixture`, `mock`, or `demo`.
2. Production configuration cannot accidentally select them as the real implementation.
3. Public/product claims do not count them as feature completion.
4. QA includes a check that production mode fails closed or uses a real adapter.

Mock/fixture inventory:

| Mock/fixture | Why it exists | How production path avoids it | Test proving boundary |
|---|---|---|---|
|  |  |  |  |

## Persistence and restart proof

Required whenever product state exists.

- [ ] Write data through the real app/API.
- [ ] Restart process or reload durable adapter.
- [ ] Read data back through the real app/API.
- [ ] Verify migration/schema behavior where applicable.
- [ ] Verify corrupted/invalid data behavior where applicable.

Evidence:

## Route and control proof

Required whenever UI/routes exist.

- [ ] Crawl/click all primary nav links.
- [ ] Verify every included route returns a real page/state, not placeholder content.
- [ ] Click every primary action and verify real state change or real error.
- [ ] Verify empty/loading/error states are visible where applicable.
- [ ] Desktop and mobile smoke screenshots captured.

Evidence:

## External/provider proof

Required whenever live providers are included in scope.

- [ ] Real adapter exists and is selected in production mode.
- [ ] Credentials come only from env/secret manager; no values persisted.
- [ ] Timeout, rate limit, auth failure, provider failure, and malformed response are normalized.
- [ ] At least one live smoke or contract-sandbox test is run, or provider is explicitly excluded from current scope.

Evidence:

## Excluded capabilities

If something cannot be implemented fully, exclude it honestly instead of faking it.

| Excluded capability | Why excluded | What would be required to include it later |
|---|---|---|
|  |  |  |

## Completeness verdict

Allowed statuses:

- `production-grade selected scope passed`
- `blocked: fake implementation detected`
- `blocked: included capability lacks durable implementation`
- `blocked: included provider/export/route not real`
- `not evaluated yet`

Verdict:

Evidence summary:
