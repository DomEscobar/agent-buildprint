# TEAM_STACK

Team packs are Mapper OS execution rules, not autonomous agents and not user-selected quality tiers. They are original Mapper OS rules informed by public skill patterns but do not vendor or require third-party skill files.

## Selected Teams

| Team | Trigger signal | Owned gates | Required evidence | Status |
|---|---|---|---|---|
| product-architect | full-suite workflow with backend APIs, providers, async runtime, and persistent state | topology, boundaries, ADR-lite decisions, first real vertical slice | `IMPLEMENTATION_PLAN.md`, capability `IMPLEMENTATION.md`, proof artifacts | selected |
| ux-ui-craft | user-facing upload, graph, simulation, report, and interaction workbench | screens, workflow states, visual hierarchy, responsive behavior, browser proof | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, screenshots | selected |
| test-and-verification | always | proof commands, negative cases, no-fake evidence | root and capability `VERIFICATION.md` rows | selected |
| integration-runtime | LLM/Zep/OASIS/provider APIs, uploads, background jobs, streams | provider boundaries, side effects, async ownership, fallbacks | adapter tests, runtime logs, blocker records | selected |
| security-boundary | secrets, uploads, public API, delete/reset/stop controls | secrets, permissions, destructive safety, abuse/error paths | negative tests and redaction proof | selected |
| data-persistence | project files, graph ids, simulations, reports, logs, history | schema/state lifecycle, restart/readback, delete/export semantics | restart/readback tests and lifecycle artifacts | selected |

## Review Order

1. `product-architect` validates topology and the first real vertical slice.
2. `ux-ui-craft` validates workflow and visual quality contracts.
3. `integration-runtime`, `security-boundary`, and `data-persistence` validate their owned boundaries.
4. `test-and-verification` closes proof ledgers and rejects fake completion.

## Blocking Gates

- Do not offer quality tiers such as lazy, quick, simple, or MVP-quality as a substitute for reducing scope explicitly.
- Do not begin coding until every selected team has an owned gate and evidence path.
- Do not count static UI, route labels, no-op controls, deterministic adapters, or in-memory-only state as product-grade implementation.
- `ux-ui-craft` blocks UI completion unless `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, and screenshot/browser proof plans exist.
- `product-architect` blocks completion unless topology, architecture decision notes, and a first real vertical slice exist.
