# Webapp Target Spec

## Target Stack

Recommended default:

- Frontend: Vite + React + TypeScript.
- State: local reducer/store first; optional server state through TanStack Query if backend is split.
- Backend: Node/Express or in-process service layer for proof.
- Persistence: SQLite or JSON repository abstraction; tests use temp storage.
- Testing: Vitest for domain, Playwright for browser flows.

INFERRED: React is a clean-room choice. Source frontend is bundled/minified Vue/TDesign in `data/web/index.html`, so do not clone it.

## App Shell

Routes:

- `/` redirects to `/projects/:projectId`.
- `/projects/:projectId` project dashboard and import/event status.
- `/projects/:projectId/script-agent` staged ScriptAgent workspace.
- `/projects/:projectId/scripts/:scriptId/production-agent` production workspace.
- `/projects/:projectId/preview` manifest preview/export.
- `/settings/providers` mock/live adapter configuration, disabled network in tests.

## Product Quality Anchor

Before implementing browser UI, reread:

- `PRODUCT_QUALITY_BAR.md`
- `WORKBENCH_UX_SPEC.md`
- `DESIGN_SYSTEM_SPEC.md`

The default UI must be a creative production workbench. Do not ship a generic panel dashboard, manifest-first preview, raw URI table, or empty-state screenshot as acceptance evidence.

## Pages And Components

Project Dashboard:

- ProjectConfigForm: name, type, intro, ratio, target platform, style, paywall.
- ChapterImporter: ordered chapter input/import fixture button.
- EventQueuePanel: pending/running/success/failure per chapter.
- TaskLogPanel: task class, owner, state, reason, timestamps.

ScriptAgent Workspace:

- ChatPanel: decision-layer conversation and stop button.
- InitChecklist: episode count, duration, source chapter range, actual chapter indexes, platform, style, paywall.
- StageTabs: Skeleton, Adaptation, Scripts.
- PlanEditor: displays parsed `storySkeleton` and `adaptationStrategy`.
- ScriptList: generated scripts and source chapter links.

ProductionAgent Workspace:

- ChatPanel: ProductionAgent conversation and stop button.
- FlowDataInspector: script, scriptPlan, assets, storyboardTable, storyboard.
- AssetBoard: role/tool/scene/clip assets, derived images, states.
- StoryboardTablePanel: markdown/XML table view with validation errors.
- StoryboardRowsPanel: rows with videoDesc, prompt, track, duration, asset links, image flag.
- TrackWorkbench: groups storyboard rows by track, displays cumulative duration and mock video records.

Preview:

- PreviewTimeline: tracks as lanes, storyboard rows as clips.
- PreviewCanvas: selected row local thumbnail/fixture or mock media placeholder, videoDesc, prompt, asset refs.
- SelectedShotInspector: frame, sequence, duration, track, assets, prompt, media/task state, validation.
- MediaTiles: compact image/video records with badges and local preview refs; raw refs hidden in details.
- DebugDrawer: task log, validation history, raw manifest JSON after explicit reveal/export.
- ManifestExport: JSON download/copy, deterministic snapshot hash; visually secondary to the timeline/preview.

## Data Flow

1. Import chapters -> repository inserts monotonic `chapterIndex`, `eventState=pending`.
2. Event extraction job -> text provider -> chapter `event` and state update.
3. ScriptAgent init -> validated config persisted.
4. Skeleton stage -> XML parse -> `planData.storySkeleton`.
5. Adaptation stage -> XML parse -> `planData.adaptationStrategy`.
6. Script stage -> XML parse -> script records.
7. Asset extraction -> upsert assets by project/name -> script-asset links.
8. Production plan/table/panel -> XML parse -> FlowData and storyboard rows.
9. Media jobs -> mock image/video records and task log.
10. Mock media refs -> deterministic local `previewUri`/`thumbnailUri` for primary UI.
11. Preview export -> manifest assembled from persisted state.

## Source Evidence

- Ordered novel import and async event start: `src/routes/novel/addNovel.ts:23-50`.
- Event provider call and success/failure emitter: `src/utils/cleanNovel.ts:27-59`.
- ScriptAgent socket stop/cancellation shape: `src/socket/routes/scriptAgent.ts:48-89`.
- ProductionAgent socket context/chat/stop shape: `src/socket/routes/productionAgent.ts:49-99`.
- FlowData schema keys: `src/agents/productionAgent/tools.ts:45-51`.
- Workbench video generation and track-bound video state: `src/routes/production/workbench/generateVideo.ts:78-122`.

## Non-Goals

- No desktop packaging.
- No exact bundled UI reconstruction.
- No user-auth hardening beyond local proof guardrails unless requested.
- No final stitched video renderer.


## Target Stack Contract

The implementation may choose its stack, but the default clean-room proof should use:

- TypeScript service modules.
- Durable local repositories for product state, or clearly labeled test-only repositories for isolated unit tests.
- Optional SQLite adapter once service contracts pass.
- Deterministic mock/no-network text, image, and video providers for default tests.
- Browser-facing webapp/API surfaces required by the Phase 4 workbench gate.

Required adapter interfaces:

- `TextProvider`
- `ImageProvider`
- `VideoProvider`
- `AssetStore`
- `ExportWriter`
- `Clock` / `IdGenerator` for deterministic tests

## Anti-Patterns

- Raw `mock://...` refs as primary media display.
- Task log or manifest textarea as the first preview viewport.
- Empty mobile dashboard screenshot as responsive evidence.
- Generic admin dashboard/card soup counted as workbench quality.
