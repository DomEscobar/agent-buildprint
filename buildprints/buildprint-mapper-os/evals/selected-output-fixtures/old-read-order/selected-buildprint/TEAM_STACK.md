# TEAM_STACK

Team packs are internal quality lenses. They are not autonomous agents and not quality tiers.

## Selected Teams

| Team | Trigger signal | Owned gates | Required evidence | Status |
|---|---|---|---|---|
| product-architect | full-suite UI product with graph persistence | topology and first real vertical slice | `IMPLEMENTATION_PLAN.md` and `CAPABILITY_INDEX.md` | selected |
| ux-ui-craft | user-facing upload, graph, and browser workflow | screen states, responsive behavior, visual hierarchy, browser proof | `UX_CONTRACT.md` | selected |
| test-and-verification | always | proof commands, negative cases, no-fake claims | root and capability `VERIFICATION.md` | selected |
| integration-runtime | LLM/runtime extraction path | provider/runtime side effects and blockers | capability proof ledger | selected |
| data-persistence | project and graph persistence | restart/readback state proof or blocker | capability proof ledger | selected |

## Review Order

1. `product-architect` validates topology and first real vertical slice.
2. `ux-ui-craft` validates workflow states and browser proof plan.
3. `integration-runtime` and `data-persistence` validate provider/runtime and persistence blockers.
4. `test-and-verification` closes proof ledgers and rejects fake completion.

## Blocking Gates

- Do not offer quality tiers such as lazy, quick, simple, or MVP-quality as a substitute for reducing scope explicitly.
- Do not begin coding until every selected team has an owned gate and evidence path.
- Do not promote static UI, route labels, no-op controls, deterministic adapters, or in-memory-only state as product-grade implementation.
