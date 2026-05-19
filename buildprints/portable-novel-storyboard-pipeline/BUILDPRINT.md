# Portable Novel-to-Storyboard Pipeline Buildprint

## Agent Operating Contract

- This file is the canonical start file and authority spine for this Buildprint.
- If another file conflicts with this file, this file wins unless a later reviewed Buildprint revision explicitly changes it.
- Build the binding implementation slice first. Treat deeper docs as detail rails, not permission to expand scope.
- Default implementation and CI must use deterministic mock/no-network providers.
- Live providers, final stitched-video export, Electron parity, and exact Toonflow UI/canvas parity are excluded unless a later approved phase adds evidence and gates.
- Every included route/control/service must work end-to-end. If a capability is not implemented, exclude it clearly rather than shipping a placeholder or fake success state.

## LLM Attention Contract

- Creative workbench first; debug evidence secondary.
- If the user says `Use default storyboard preset`, use `questions.md` defaults and continue. Otherwise ask exactly `questions.md` before implementation.
- Keep `PRODUCT_QUALITY_BAR.md`, `LLM_AGENT_EXECUTION_GUIDE.md`, and `WORKBENCH_UX_SPEC.md` in active context before UI work.
- Execute `plans/*.md` in numeric order. Each phase file is a context-window guardrail, not a competing authority.
- Do not let QA/reporting artifacts dominate the user-facing app.
- If context is compacted, reread `BUILDPRINT.md`, `PRODUCT_QUALITY_BAR.md`, and `LLM_AGENT_EXECUTION_GUIDE.md` before continuing.
- Before final reporting, reread `PARITY_CLAIMS.md`, `HEAD_TO_FOOT_QA.md`, and `PRODUCT_QUALITY_BAR.md`.
- Final response must include a chat handover: what was built, evidence, known gaps, and recommended next direction or "no next step needed".

## Target Shape Constants

```txt
TARGET_SHAPE = Creative storyboard workbench + deterministic mock pipeline + PortablePreviewManifest
DEFAULT_PROVIDER_MODE = mock/no-network
PRIMARY_UI = storyboard thumbnails + timeline lanes + selected-shot inspector
DEBUG_UI = secondary drawer for task log/raw refs/manifest
EXPORT_SCOPE = preview manifest only
FINAL_RESPONSE = chat handover with outcome/evidence/gaps/next direction
```

## Binding Implementation Slice

Build exactly this first:

1. Create/select one project and import 3 ordered chapter fixtures.
2. Persist chapters with stable ordering and event states: pending, success, failure, and error reason.
3. Run deterministic event extraction so all 3 chapters render successful event records.
4. Run ScriptAgent stages with deterministic provider output: story outline, adaptation strategy, and at least one episode script.
5. Extract reusable role/scene/prop assets from generated scripts.
6. Run ProductionAgent stages: director plan, storyboard table, and storyboard panel rows.
7. Validate storyboard/XML output and reject malformed output without corrupting prior state.
8. Create mock image and mock video media/task records through adapter interfaces; no live network calls by default.
9. Render a product-grade browser workbench/preview showing scripts, storyboard frames/thumbnails, selected-shot inspector, tracks/clips/media state, debug drawer, and visible limitations/non-claims.
10. Export a PortablePreviewManifest containing chapters, events, scripts, assets, storyboard rows, tracks, media records, task log, and limitations.
11. Pass unit/contract tests, production build, and real browser happy-path QA from `HEAD_TO_FOOT_QA.md`.

## Non-Goals / Unsafe Claims

Do not build or claim these in the binding slice:

- Full Toonflow clone or drop-in replacement.
- Exact original UI, infinite canvas, workbench, route, API, or Electron desktop parity.
- Live provider quality/parity or default live media generation.
- Final stitched-video export parity, audio binding/export parity, memory/RAG parity, or editable vendor VM parity.
- Placeholder routes, no-op controls, in-memory-only durability claims, or fake success states counted as implemented product behavior.

Use the safe wording and forbidden wording in `PARITY_CLAIMS.md` / `claims.yaml` whenever describing the result.

## Required Read Order

1. `BUILDPRINT.md` — authority spine, binding slice, phase gates, acceptance gates.
2. `buildprint.json`, `phases.yaml`, `acceptance.yaml`, `claims.yaml` — machine-readable mirrors for agents/tools.
3. `questions.md`, `PLAN.md`, `plans/*.md` in numeric order — closed alignment and phase-local execution rails.
4. `PRODUCT_QUALITY_BAR.md`, `LLM_AGENT_EXECUTION_GUIDE.md` — product quality and context-rot guardrails.
5. `SPEC.md` — user-visible behavior, must/must-not rules, edge cases.
6. `CONTRACTS.md`, `WEBAPP_TARGET_SPEC.md`, `WORKBENCH_UX_SPEC.md`, `DESIGN_SYSTEM_SPEC.md`, `VISUAL_FIXTURE_PACK.md`, `SYSTEM_MAP.md` — schemas, routes/pages, UX, modules, and data flow.
7. `LLM_FLOW.md`, `AGENT_PROMPT_PACK.md`, `XML_OUTPUT_CONTRACT.md` — agent stages and output parsing contract.
8. `ASYNC_JOB_MODEL.md`, `PROVIDER_ADAPTERS.md`, `PREVIEW_COMPOSITION_SPEC.md` — jobs, adapters, and export package.
9. `TEST_MATRIX.md`, `HEAD_TO_FOOT_QA.md`, `BROWSER_QA_SCENARIOS.md`, `VALIDATION_TEMPLATE.md`, `checks/acceptance.md` — required validation gates.
10. `PARITY_CLAIMS.md`, `TRACEABILITY_MATRIX.md`, `THREAT_MODEL.md`, `OBSERVABILITY.md`, `PORTABILITY.md` — claim boundary, evidence, safety, operations, portability.
11. `IMPLEMENTATION_ROADMAP.md` and `AGENT_HANDOFF.md` — supporting build order and handoff notes; lower authority than this file.

## Phase Gates

### Phase 0 — Alignment

Exit only when:

- The implementation target, stack, persistence choice, and mock-provider default are written down.
- The default storyboard preset is accepted or `questions.md` is answered and confirmed.
- Safe/unsafe claims are copied into project docs or visible limitations UI.
- Product-quality target is written down: creative workbench, debug evidence secondary, local fixture visuals for primary preview.
- The agent confirms the binding slice and non-goals above.

### Phase 1 — Domain and Persistence

Exit only when:

- Project, chapter, event, script plan, script, asset, storyboard row, media task, video track, and export manifest models exist.
- Chapter ordering, event states, deterministic IDs/clock, asset de-dupe, and manifest assembly have tests.
- Persistence is durable for the chosen local app/runtime; if temporary storage is used, it must be honestly labeled and not claimed as production durability.

### Phase 2 — Agent and XML Pipeline

Exit only when:

- ScriptAgent and ProductionAgent stages run through deterministic providers.
- XML/structured output parser accepts valid output and rejects malformed/partial output.
- Invalid output does not partially persist corrupt storyboard/script state.

### Phase 3 — Async Jobs and Providers

Exit only when:

- Job lifecycle supports pending, running, success, failure, cancel, retry, and idempotency.
- Mock image/video adapters create deterministic media refs.
- No-network default is enforced in tests.
- Optional live adapters are env-gated and excluded from default CI.

### Phase 4 — Webapp Workbench

Exit only when:

- Project dashboard, ScriptAgent workspace, ProductionAgent workspace, asset/storyboard/task panels, preview timeline, and manifest export are usable in a real browser.
- Browser UI satisfies `PRODUCT_QUALITY_BAR.md`: storyboard frames/thumbnails, timeline lanes, selected-shot inspector, compact media state, and debug drawer.
- No included button/control is a no-op unless visibly disabled with an honest explanation.
- The browser happy path in `HEAD_TO_FOOT_QA.md` passes with completed-state desktop/mobile screenshots and exported manifest evidence.

### Phase 5 — Hardening and Claims

Exit only when:

- Negative browser paths from `BROWSER_QA_SCENARIOS.md` are implemented or explicitly recorded as gaps.
- Safe/non-claim wording is visible in docs or UI.
- Visual QA rejects raw URI tables, manifest-first preview, empty mobile screenshots, and generic dashboard/card-soup layouts.
- Build/test/runtime reports and remaining gaps are recorded in the implementation repository.

## Acceptance Gates

Minimum done evidence:

- `npm test` or equivalent unit/contract test command passes.
- `npm run build` or equivalent production build passes.
- Real browser happy path clicks rendered UI controls and parses the manifest from rendered UI, not only service functions.
- Runtime negative paths show visible failures/retries without corrupting durable state.
- Completed-state desktop and mobile screenshots show storyboard frames/thumbnails, timeline lanes, selected-shot inspector, compact media/task state, and export affordance.
- Exported manifest includes at least: version, 3 chapters, 3 events, >=1 script, >=4 assets, >=1 storyboard row, >=1 track, >=1 media record, task log entries, and limitations/non-parity text.
- Secret scan / no-network default gate passes.
- Implementation records `BUILD_REPORT.md`, `RUNTIME_LIVE_TEST_REPORT.md`, screenshot(s), test/build summary, exported manifest sample, and explicit remaining gaps.
- Final chat handover summarizes the run and gives a clear next-direction recommendation without requiring the user to open report files.

## Purpose

Build a portable creative AI pipeline that transforms imported novel chapters into structured event context, scripted episodes, storyboard tables/panels, generated-media tasks through mockable adapters, and an exportable preview package.

## Architecture

- Import module stores ordered chapter fixtures.
- Event extraction module converts each chapter to an event summary with pending/success/failure state.
- ScriptAgent module orchestrates story outline, adaptation strategy, and episode scripts using tool calls into event/text/workspace state.
- Asset module extracts reusable role/scene/prop assets from scripts.
- ProductionAgent module creates director plan, storyboard table, storyboard panel rows, and optional generated storyboard images.
- Adapter module defines text/image/video provider contracts with mock and live implementations.
- Preview/export module packages scripts, storyboard table, panel rows, media refs, tracks, selected video refs, and task log.

## Evidence Boundary

OBSERVED: Toonflow implements these modules through Express routes, Socket.IO agent namespaces, SQLite tables, Markdown Skills, and TypeScript vendor adapters. Key evidence is listed in `TRACEABILITY_MATRIX.md`.

INFERRED: The clean-room rebuild may use any stack as long as contracts and lifecycle states are preserved.

## Required Validation

Minimum validation evidence:

- unit/contract test command passes;
- production build command passes;
- real browser happy path clicks rendered UI controls and parses the exported manifest from rendered UI;
- runtime negative paths show visible failures/retries without corrupting durable state;
- exported PortablePreviewManifest sample includes chapters, events, scripts, assets, storyboard rows, tracks, media records, task log, and limitations/non-parity text;
- secret scan and no-network default gate pass;
- implementation records build report, runtime/browser report, screenshots, test/build summary, manifest sample, and explicit remaining gaps.

Live providers are optional adapter tests only and are excluded from default acceptance unless a later reviewed Buildprint revision adds evidence and gates.

## Copyable Agent Prompt

Use the Portable Novel-to-Storyboard Pipeline Buildprint. Read `BUILDPRINT.md` first, then follow its Required Read Order, Phase Gates, and Acceptance Gates. Build the binding clean-room portable webapp proof with deterministic mock/no-network providers by default. Produce a PortablePreviewManifest/preview package only. Do not claim Toonflow clone, provider parity, exact workbench parity, or final stitched-video export parity unless a later reviewed Buildprint revision adds evidence and gates.
