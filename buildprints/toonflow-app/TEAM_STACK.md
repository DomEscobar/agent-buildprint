# TEAM_STACK

This file records the internal Mapper OS team packs selected for the Toonflow full-suite Buildprint. Team packs are execution rules and quality lenses, not separate autonomous agents and not user-selected quality tiers. Do not offer lazy, simple, quick, cheap, or reduced-quality team choices.

## Selected Teams

| Team | Trigger signal | Owned gates | Required evidence | Status |
|---|---|---|---|---|
| product-architect | full-suite, broad API/socket/provider/data surface, Electron/Docker runtime | topology, boundaries, architecture decision notes, first real vertical slice | architecture topology table, ADR-lite notes, first-slice proof | required |
| ux-ui-craft | user-facing login/project/novel/script/production/media/settings/admin UI; Electron/browser workflow | screen inventory, workflow states, taste variables, responsive behavior, browser/Electron proof | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, screenshots or browser automation | required |
| test-and-verification | always selected | proof-ledger rows, negative tests, no-fake scan, clean-room reversal gate | root/capability `VERIFICATION.md`, artifacts, reversal report | required |
| integration-runtime | text/image/video/TTS providers, sockets, jobs, Electron/Docker runtime, upload/file runtime | provider/runtime contracts, sandbox/live blockers, async job proof | `PROVIDERS.md`, capability verification artifacts | required |
| security-boundary | auth, uploads, programmable vendor VM, destructive DB admin, user data, local files, secrets | threat/permission/abuse hardening, secret-name-only handling, destructive confirmation gates | `SECURITY.md`, negative tests, security review | required |
| data-persistence | SQLite project/storyboard/media/memory state, import/export/reset, local file storage | lifecycle, restart/readback/delete/export proof | `DATA_LIFECYCLE.md`, persistence artifacts | required |

## Blocking Gates

- Every selected team must have an owned artifact and explicit evidence path before implementation claims.
- `product-architect` blocks broad/full-suite promotion without topology and first real vertical slice proof.
- `ux-ui-craft` blocks UI-bearing promotion without `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, browser/screenshot evidence, and state inventory proof.
- `integration-runtime` blocks provider/runtime promotion without sandbox/live proof or explicit blocker.
- `security-boundary` blocks sensitive/admin/upload/provider promotion without negative tests and hardening notes.
- `data-persistence` blocks stateful promotion without restart/readback/delete/export proof.
- `test-and-verification` blocks all promotion until proof ledger rows and no-fake/reversal checks close.

## Team-Pack Review Order

1. `product-architect` validates topology and the first real vertical slice.
2. `ux-ui-craft` validates UX contract, states, visual quality bar, and screenshot/browser proof plan.
3. `integration-runtime`, `security-boundary`, and `data-persistence` define owned boundary contracts and blockers before implementation claims.
4. `test-and-verification` closes proof-ledger rows and rejects fake completion.
5. Skeptical reviewer downgrades any unproven capability to `CONTRACT_SEAM_ONLY` or `BLOCKED_WITH_REASON`.

## Blocking Rule

Do not begin coding or claim implementation completion unless every selected team has an owned gate and evidence path. Do not promote a capability to `REAL_IMPLEMENTED` until every selected team gate for that capability is proven or explicitly blocked.
