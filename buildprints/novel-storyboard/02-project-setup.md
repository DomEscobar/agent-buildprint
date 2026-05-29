# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment, mapped observations, and the product vision embedded in `BUILDPRINT.md` into concrete project architecture, experience direction, quality gates, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- If the human requests live provider validation, paid rendering, public deployment, or public media exposure, treat that as a separate credentialed approval gate.
- blueprint_mode.primary: product.
- phase_style: outcome_flow.
- Per-phase mode: every phase in this packet is a product phase and must include `## Phase mode contract` with `blueprint_mode: product` and `phase_style: outcome_flow`.

## Blueprint mode

- Primary: product
- Phase style: outcome_flow
- Why this mode fits: the selected packet maps an end-user storyboard production application with browser workflows, API/socket behavior, provider-backed media generation, durable episode state, deployment concerns, and proof-gated product phases. It is not primarily a library, framework, integration-only connector, automation loop, data pipeline, or infrastructure packet.

## Product / capability shape

- Product: Novel-to-storyboard production workbench.
- Product vision source: `BUILDPRINT.md` `## Product brief` and `## Final product at a glance`. Translate the embedded vision into implementation-project `ui-identity.md`; do not create any extra packet-level vision file.
- Frontend/UI surfaces: storyboard workbench, cinematic canvas, ordered shot strip/grid, selected-frame inspector, episode selector, agent chat, media generation paneling, blocked-provider states, and runtime login/setup surfaces.
- Backend/API surfaces: flow load/save, authenticated project/episode authorization, production-agent socket, media generation jobs, provider adapters, media URL resolver, health/readiness, and evidence-safe logs.
- State/runtime surfaces: prose/script, script plan, assets, storyboard table, storyboard frames, shot order, frame prompts, notes, review status, continuity tags, media generation records, provider job IDs, workbench/video metadata, session state, and runtime evidence.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates: topology, browser/e2e, screenshot critique, persistence, socket/agent, provider adapter, media job, security, no-fake, build/start, and evidence checks.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it; browser UI, server API, socket channel, media/provider adapters, durable store, and deployable runtime are the capability contract.
  - Evidence: mapped source had production canvas, flow API, agent socket, provider tools, persistence, and runtime concerns, but concrete source frameworks are replaceable implementation details.
- Package manager:
  - Decision: choose ecosystem-standard default for the selected stack.
  - Evidence: proof gates require repeatable install, tests, production build, browser automation, and runtime smoke.
- Data/storage:
  - Decision: use durable local database/object path sufficient for restart/readback; label temporary proof storage honestly and record blockers before claiming durability.
  - Evidence: flow save/load, storyboard order, media state, provider jobs, and workbench state are product obligations.
- Auth/providers/deployment:
  - Decision: fake/no-network providers by default. Live keys, public storage, paid media generation, and hosted deployment require explicit human approval and evidence.

## Production readiness contract

Production-grade architecture is the default for the selected storyboard workbench. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, media pipeline seams, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define session ownership, project/episode authorization, socket scope, media access control, default-credential mitigation, destructive-action confirmation, and denied-path behavior.
- Provider integration contract: implement text/image/video provider adapters with deterministic fake/no-network mode, live config validation, fail-closed missing-credential behavior, sanitized provider records, polling/callback behavior, retry/error mapping, and tests that do not upgrade mocks to live providers.
- Durable persistence contract: define project state, episodes, prose/script, script plan, assets, storyboard order, frame metadata, media records, workbench/video metadata, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define agent run ownership, media job ownership, pending/running/success/failure/blocked/canceled/retry states, ordered logs, progress persistence, retry/cancel/failure recovery, and restart behavior.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, media/output limits, upload limits, CI/browser/media gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for episode selection, canvas interactions, shot review, agent updates, media generation, blocked provider states, desktop/narrow screenshots, accessibility, and no-overlap responsive behavior.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, storyboard specificity, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Experience quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for every user-facing phase. The implementation-project `ui-identity.md` must derive from `BUILDPRINT.md` product vision and reject generic dashboard, local MVP, bare graph, raw text-list, static card, and default-form fallbacks for this storyboard product.
- Product composition: start from the storyboard workbench surface, not a generic dashboard, default form, marketing shell, bare graph demo, or static card board.
- Domain-specific affordances: represent shots as storyboard frames with aspect-ratio-safe previews, shot numbers, scene/beat labels, prompts, notes, review status, linked assets/characters, continuity tags, and media state.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, queued, generating, approved, selected, and success states.
- Screenshot critique: desktop and narrow screenshots must show ordered shot frames, selected-frame inspector, visible media/review states, unobstructed canvas controls, and no generic local-MVP fallback.

## Mapped contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Source app overview: Toonflow-app `README.md:108-123`.
- Webapp/runtime split: Toonflow-app `README.md:465-481`, `README.md:605-608`.
- Canvas board: Toonflow-web `src/views/production/index.vue:1-85`.
- Canvas topology: Toonflow-web `src/views/production/utils/flowBuilder.ts:4-75`, `:92-260`.
- Flow load/save: Toonflow-app `src/routes/production/getFlowData.ts:9-156`, `src/routes/production/saveFlowData.ts:9-63`.
- Agent socket: Toonflow-app `src/socket/routes/productionAgent.ts:21-99`.
- Agent tool surface: Toonflow-app `src/agents/productionAgent/tools.ts:45-209`.
- Persistence: Toonflow-app `src/utils/db.ts:15-35`, `src/lib/initDB.ts:15-183`.

## Mapped obligation/surface matrix

Before phase work, account for every high-signal source surface from the mapper census/evidence: user-facing screens, API handlers, sockets, provider adapters, auth boundaries, persistence models/stores, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this format for each entry:

- Surface id:
  - Source anchor: source path plus line/section or route/provider marker.
  - Source evidence: observed file/line or connector anchor.
  - Mapped obligation: decomposed target obligation owned by a phase.
  - Source capability: what user/product capability this surface provides.
  - Target disposition: preserve | replace | merge | defer | drop.
  - Target contract: equivalent target behavior or explicit out-of-scope reason.
  - Compatibility impact: API/UX/data/provider behavior that changes, if any; not route/function parity.
  - Phase(s): `03-phases/<phase>.md` or blocker/evaluation destination.
  - Required proof: surface-specific proof gate; broad "works" proof is invalid.

Coverage rule: every high-signal mapped surface must appear exactly once in the ownership ledger, even when its obligations are implemented across multiple proof gates. No mapped surface may disappear silently. This is the per-surface coverage ownership rule: each mapped obligation names a phase owner, source evidence, required proof, and blocker path. Generic proof labels such as "browser proof", "tests pass", "provider proof", or "runtime proof" are invalid unless decomposed into concrete workflow, state, provider, artifact, and safety surfaces.

Seed ledger:

- Surface id: storyboard-production-workbench
  - Source anchor: source path `Toonflow-web/src/views/production/index.vue` and `flowBuilder.ts`.
  - Source evidence: canvas view and flow-builder topology.
  - Mapped obligation: render storyboard-first workbench with graph flow, ordered shot frames, selected-frame inspector, zoom, pan, drag, layout, and responsive visual states.
  - Source capability: production board for script, plan, assets, storyboard, and workbench flow.
  - Target disposition: replace.
  - Target contract: equivalent target behavior as a visually stronger storyboard product; preserve flow behavior, improve presentation.
  - Compatibility impact: not route/function parity; source graph can become a richer storyboard workbench.
  - Phase(s): `03-phases/01-canvas-workbench.md`.
  - Required proof: browser interaction trace, desktop/narrow screenshots, visual_quality_gate, topology unit test.
- Surface id: episode-flow-state
  - Source anchor: source paths `getFlowData.ts` and `saveFlowData.ts`.
  - Source evidence: flow load/save handlers.
  - Mapped obligation: load/save/restart project/episode flow data, storyboard order, frame metadata, and media state.
  - Source capability: durable episode board state.
  - Target disposition: preserve.
  - Target contract: authenticated API and durable database-backed persistence.
  - Compatibility impact: target may use cleaner schema but must preserve observable persistence semantics.
  - Phase(s): `03-phases/02-flow-persistence.md`.
  - Required proof: API contract tests, restart/readback persistence test, browser edit/reload proof.
- Surface id: production-agent-loop
  - Source anchor: source paths `productionAgent.ts` and `tools.ts`.
  - Source evidence: socket route and agent tool surface.
  - Mapped obligation: authenticated scoped agent channel, stream parser, stop behavior, trace recording, and visible storyboard frame mutations.
  - Source capability: chat-driven production board updates.
  - Target disposition: preserve.
  - Target contract: equivalent target behavior with defensive XML/event parsing and fake model stream tests.
  - Compatibility impact: target protocol may differ internally while preserving product flow.
  - Phase(s): `03-phases/03-production-agent-loop.md`.
  - Required proof: socket auth tests, parser negative tests, browser update/stop trace.
- Surface id: media-generation-provider-boundary
  - Source anchor: source path `tools.ts` media generation tools and provider configuration.
  - Source evidence: asset/storyboard/video generation tools and provider interactions.
  - Mapped obligation: async asset/storyboard/video jobs with fake-provider tests, live-provider blockers, media storage refs, and frame-level status.
  - Source capability: generate and track production media.
  - Target disposition: preserve.
  - Target contract: provider adapters, job records, polling, retry/failure/blocked states, and media previews.
  - Compatibility impact: fake-provider proof is not live proof.
  - Phase(s): `03-phases/04-media-generation.md`.
  - Required proof: adapter/config tests, pending/success/failure/retry proof, live-provider blocker row when credentials absent.
- Surface id: webapp-runtime-shell
  - Source anchor: source paths `app.ts` and README runtime sections.
  - Source evidence: API/socket/static runtime and deployment notes.
  - Mapped obligation: authenticated browser app with API/socket, static serving, durable data/media volume, health/readiness, and restart smoke.
  - Source capability: runnable production workbench shell.
  - Target disposition: preserve.
  - Target contract: browser-first deployable webapp, not desktop-only implementation.
  - Compatibility impact: target deploy command may differ.
  - Phase(s): `03-phases/05-webapp-runtime.md`.
  - Required proof: build/start/login/browser/restart/security smoke.

## Foundation scaffold gate

Before Phase 01, the implementation agent must create the selected stack real base project structure. This is a hard gate, not an optional documentation task. The selected stack may be chosen by AI best judgment, but it must be capable of proving a browser UI, API/service contracts, socket/runtime behavior, local media generation, job runtime, persistence/readback, provider adapters, and evidence generation.

The Foundation scaffold gate requires:

- base project structure with real package manifests, source directories, test directories, configuration, and CI/build commands appropriate to the selected stack.
- implementation-project root `AGENTS.md` that explicitly lists `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` as mandatory reads for coding agents before code edits.
- `architecture.md` with required sections: Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.
- `engineering-standards.md` with required sections: Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards with deterministic blocker/e2e/runtime exit behavior.
- `test-strategy.md` with phase proof commands, no-network provider gates, browser/e2e gates, screenshot critique gates, security/secret scans, and evidence row policy.
- `ui-identity.md` because this is UI-bearing; it must derive from `BUILDPRINT.md` product vision and define storyboard-production visual identity, interaction density, responsive rules, accessibility baseline, screenshot critique rubric, and forbidden generic/local-MVP patterns.

No phase implementation may start until these files exist and the base project can run an install/build or an honest setup blocker is written. If scaffold verification fails, exit deterministically before phase work and route the repair to this setup gate.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md`.

## Open assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices should become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-canvas-workbench.md`
- `03-phases/02-flow-persistence.md`
- `03-phases/03-production-agent-loop.md`
- `03-phases/04-media-generation.md`
- `03-phases/05-webapp-runtime.md`
