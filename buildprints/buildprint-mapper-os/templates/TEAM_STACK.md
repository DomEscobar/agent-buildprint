# TEAM_STACK

This file records the internal Mapper OS team packs selected for this Buildprint. Team packs are execution rules, not separate autonomous agents and not quality tiers. Team packs are original Mapper OS rules; they may be informed by public skill patterns, but generated Buildprints must not vendor or require third-party skill files.

## Selected Teams

| Team | Trigger signal | Owned gates | Required evidence | Status |
|---|---|---|---|---|
| product-architect | medium/large/full-suite, UI-bearing, broad capability surface, or architecture risk | topology, boundaries, architecture decision notes, first vertical slice, module/service/data ownership | architecture topology table, ADR-lite decision notes, and real data-path slice | missing |
| ux-ui-craft | user-facing UI, browser workflow, dashboard, visual editor, graph, report, or operator console | screen inventory, workflow states, taste variables, responsive behavior, visual hierarchy, browser proof | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, screenshots or browser automation | missing |
| test-and-verification | always | proof commands, negative cases, evidence artifacts, no-fake claims | root and capability `VERIFICATION.md` proof ledger rows | missing |
| integration-runtime | provider/API/upload/job/runtime/webhook/external side effect | adapter boundaries, side effects, fallback/error behavior, async ownership | provider/runtime proof or blocker | missing |
| security-boundary | auth/admin/user data/payment/destructive action/secrets/deployment exposure | permissions, secrets, abuse controls, destructive safety, error paths | security review proof or blocker | missing |
| data-persistence | durable state, import/export, reporting, project data, graph/model persistence | schema/state lifecycle, restart/readback, migrations, delete/export semantics | persistence proof or blocker | missing |

## Routing Rules

- UI-bearing output must include `ux-ui-craft`, `product-architect`, and `test-and-verification`.
- Medium, large, and full-suite output must include `product-architect` and `test-and-verification`.
- Provider, API, upload, job, webhook, runtime, or external side-effect output must include `integration-runtime`.
- Auth, admin, user-data, payment, destructive, secret-handling, or public deployment output must include `security-boundary`.
- Persistent, import, export, reporting, project data, graph/model, or restart/readback output must include `data-persistence`.

## Review Order

1. `product-architect` validates topology and the first real vertical slice.
2. `ux-ui-craft` validates UI workflow quality when selected.
3. `integration-runtime`, `security-boundary`, and `data-persistence` validate their owned boundaries when selected.
4. `test-and-verification` closes proof ledgers and rejects fake completion.

## Blocking Gates

- Do not offer quality tiers such as lazy, quick, simple, or MVP-quality as a substitute for reducing scope explicitly.
- Do not begin coding until every selected team has an owned gate and evidence path.
- Do not promote a capability to `REAL_IMPLEMENTED` until all selected team gates for that capability are proven or explicitly blocked.
- Do not count static UI, route labels, no-op controls, deterministic adapters, or in-memory-only state as product-grade implementation.
- `ux-ui-craft` blocks UI completion unless `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, and screenshot/browser proof plans exist.
- `product-architect` blocks medium/large/full-suite completion unless topology, architecture decision notes, and a first real vertical slice exist.
