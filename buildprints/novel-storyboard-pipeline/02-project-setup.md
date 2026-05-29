# Project Setup

This file is the project constitution for implementation. It defines product shape, architecture obligations, and the Foundation scaffold gate. Phase execution belongs in `03-phases/phase-flow.md`.

## Blueprint Mode And Phase Style

- blueprint_mode.primary: product
- phase_style: outcome_flow
- Classification invariant: this packet was classified before writing setup, blueprint, or phase files.
- Product shape: browser-first creative production webapp with durable backend, provider integrations, agent orchestration, media storage, and an infinite Canvas workbench.

## Production Readiness

- Qualification starts as PROOF_REQUIRED.
- Public webapp posture requires secure auth bootstrap, no default admin password, no credential leakage, CSRF/session protections or equivalent token handling, rate limits on generation endpoints, upload/media controls, and provider secret isolation.
- Local-only deployment may use SQLite and filesystem media if restart roundtrip and backup/export behavior are proven.
- Provider-backed generation remains proof-required until sandbox or live credentials produce real text/image/video artifacts with failure/retry evidence.

## Architecture Decisions

- Keep UI, API, domain services, persistence repositories, provider adapters, queue/workers, media storage, and test fixtures as separate boundaries.
- The Canvas model is first-class domain state: nodes, edges/links, layout positions, selected items, associated assets, storyboard ordering, video tracks, and generated media states must not be hidden in opaque UI-only blobs.
- Use typed request/response schemas at API boundaries.
- Use a durable task table or queue for generation jobs, with idempotency keys and retry/error mapping.
- Provider adapters must have sandbox/live split and never expose secret values to frontend state, logs, screenshots, or evidence artifacts.
- The UI must preserve the source-observed flow while improving webapp posture; do not copy minified bundled frontend internals.

## Mapped Contract Anchors

| Mapped obligation | Source evidence | Implementation contract |
|---|---|---|
| Planning to final-output creative flow | `docs/README.en.md:110`, `docs/README.en.md:141-146` | Implement project setup, ScriptAgent planning, ProductionAgent Canvas, generation, video assembly, and export boundary as connected outcome flows. |
| Infinite Canvas production workbench | `docs/README.en.md:112-113` | Canvas UI is the primary workspace with zoom/pan, spatial nodes, media previews, generation states, inspector panels, and durable layout. |
| Static web frontend plus API runtime | `src/app.ts:91-121`, `src/app.ts:136-143` | Build a webapp served by a backend API; do not require Electron for core use. |
| Token-gated API | `src/app.ts:100-117` | Require authenticated access, secure bootstrap, and no source default admin password in production. |
| SQLite-style durable local state | `src/utils/db.ts:15-45` | Provide migrations and durable persistence; SQLite allowed for local, Postgres-compatible for public/team. |
| ScriptAgent planning state | `src/routes/scriptAgent/getPlanData.ts:8-40`, `src/routes/scriptAgent/setPlanData.ts:8-40` | Persist story skeleton, adaptation strategy, and episode scripts with edit and regeneration flows. |
| Production flow composition | `src/routes/production/getFlowData.ts:45-156` | Compose scripts, assets, derived assets, storyboard, and workbench/video lists into Canvas data. |
| Agent tool flow | `src/agents/productionAgent/tools.ts:45-210` | Implement decision/execution/supervision loops with tool-call effects and visible trace. |
| Video workbench tracks | `src/routes/production/workbench/getGenerateData.ts:8-220` | Represent tracks with media references, generation candidates, selected video, state, duration, and errors. |
| Provider-backed generation | `src/utils/ai.ts:113-160`, `src/utils/ai.ts:246-358` | Provider adapters must execute real generation only with credentials; otherwise expose blocked/sandbox state, not fake success. |

## Foundation Scaffold Gate

Before Phase 01 implementation work, create the selected stack's real base project structure under `implementation-project/`.

Minimum required scaffold:

- `implementation-project/AGENTS.md`
- `implementation-project/architecture.md`
- `implementation-project/engineering-standards.md`
- `implementation-project/test-strategy.md`
- `implementation-project/ui-identity.md`
- actual app source directories for web UI, API/server, domain, persistence, providers, workers, media storage, and tests.

Root `implementation-project/AGENTS.md` must explicitly state that coding agents must read these files before code edits:

- `architecture.md`
- `engineering-standards.md`
- `test-strategy.md`
- `ui-identity.md`

`architecture.md` must require:

- Architecture principles
- Base project structure
- Boundary map
- Dependency rules
- Architecture decisions
- Downstream phase extension map

`engineering-standards.md` must require:

- Clean code rules
- Validation and schemas
- Persistence standards
- Provider standards
- Worker/runtime standards
- UI standards
- Test standards with deterministic blocker/e2e/runtime exit behavior

`test-strategy.md` must define unit, integration, persistence roundtrip, provider contract, worker, browser e2e, accessibility, and visual regression expectations.

`ui-identity.md` must define the Canvas visual system, interaction model, typography, color roles, spacing, node/card anatomy, status badges, inspector/timeline layout, responsive behavior, and forbidden generic UI substitutions.

## Assumptions

- Missing provider credentials are not blockers for building contracts and sandbox UI, but they block qualification of live generation.
- The implementation may improve security defaults even if source behavior used default admin credentials.
- The webapp must be source-independent; after this packet is handed off, downstream agents should not need original source access.

## Phase Start Gate

Before any phase code edits:

1. Read `BUILDPRINT.md`, this file, `blueprint.yaml`, the active phase, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md`, and only required `06-contracts/<role>.md` files.
2. Complete or update Foundation scaffold artifacts when Phase 01 is active.
3. Write the phase-run plan and role handoffs required by `03-phases/phase-flow.md`.
4. Implement only the active phase's bounded outcome.
5. Run the phase proof gate.
6. Append runtime evidence only to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist.
