# System Map

Self-contained compact map for the selected Toonflow portable creative pipeline Buildprint.

## Scope

Selected scope: novel/story import -> chapter event extraction -> ScriptAgent outline/adaptation/scripts -> asset extraction -> ProductionAgent director plan/storyboard table/storyboard rows -> mockable image/video tasks -> portable preview manifest.

Non-goals: Electron shell, full infinite canvas, live provider parity, final stitched video parity, payment/business/admin flows.

## Components

1. **Project/Chapter Store**
   - Stores projects and ordered novel chapters.
   - Observed import route inserts `o_novel` rows with monotonic `chapterIndex` and `eventState: 0`.

2. **Event Extractor**
   - Runs per imported chapter through a text provider.
   - Writes event summary or failure reason back to the chapter.
   - Portable proof should expose pending/running/success/failure state mapping.

3. **ScriptAgent Service**
   - Staged LLM workflow: project initialization -> story outline -> adaptation strategy -> script writing.
   - Decision layer dispatches execution/supervision subagents; workspace reads happen through tools.
   - Stores `storySkeleton`, `adaptationStrategy`, and script records.

4. **Asset Service**
   - Extracts reusable role/scene/tool assets from scripts.
   - De-dupes by asset name inside a project.
   - Maintains script-to-asset links.

5. **ProductionAgent Service**
   - Uses FlowData: `script`, `scriptPlan`, `assets`, `storyboardTable`, `storyboard`.
   - Produces director plan, storyboard table, storyboard rows, and generation tasks.

6. **Storyboard/Track Store**
   - Persists storyboard rows with prompt, video description, duration, track, generation flag, and asset links.
   - Groups rows into video tracks by mode-specific track rules.

7. **Media Adapter Layer**
   - Text/image/video provider interfaces.
   - Default proof uses mocks only.
   - Live providers are optional implementations behind the same interface.

8. **Preview Manifest Exporter**
   - Produces portable preview manifest containing project, chapters, events, scripts, assets, storyboard rows, tracks, media records, and task log.
   - This replaces any claim of full stitched-video export parity.

## Data Relationships

- Project 1:N Chapter.
- Project 1:N Script.
- Script N:M Asset through script-asset links.
- Script 1:N StoryboardRow.
- StoryboardRow N:M Asset through storyboard-asset links.
- StoryboardRow N:1 VideoTrack by `trackId`.
- VideoTrack 1:N Video records.
- MediaTask references generated image/video records.

## Dependency Direction

`Project/Chapter Store -> Event Extractor -> ScriptAgent -> Script/Asset Store -> ProductionAgent -> Storyboard/Media Tasks -> Preview Manifest`

Adapters depend inward on provider interfaces. Workflow services should not depend on concrete provider SDKs.

## Evidence Pointer

This selected package is self-contained for coding-agent handoff. Use this file plus `TRACEABILITY_MATRIX.md` for source evidence; do not depend on parent-directory generated artifacts.


## Data Lifecycle

1. Project created with model/style settings.
2. Chapters imported into chapter store.
3. Event extraction writes event summary or error per chapter.
4. ScriptAgent writes plan workspace and scripts.
5. Asset extraction creates assets and script links.
6. Production workspace creates director plan, storyboard table, storyboard rows, asset links, tracks.
7. Media generation creates task records and media refs.
8. Preview selects track videos and resolves file URLs.
9. Export package snapshots all selected records and refs.

Retention/deletion: partially outside selected scope. Toonflow has deletion routes, but this Buildprint requires explicit retention policy before production use.


## Modules

| Module | Responsibilities | Evidence | Confidence |
|---|---|---|---|
| Import/Event | Chapter import, event extraction, event state polling | `src/routes/novel/addNovel.ts:11-52`, `src/utils/cleanNovel.ts:27-89` | high |
| ScriptAgent | Decision layer, subagents, tools, plan/script workspace | `src/agents/scriptAgent/index.ts:41-225`, `src/agents/scriptAgent/tools.ts:34-117` | high |
| Skill Library | Markdown behavior rules for agents and production style | `data/skills/script_agent_decision.md:69-89`, `data/skills/production_execution_storyboard_panel.md:41-73` | high |
| ProductionAgent | Director plan, storyboard table, panel, generation tools | `src/agents/productionAgent/index.ts:196-374` | high |
| Asset Store | Script assets, derived assets, image refs | `src/routes/script/extractAssets.ts:56-149`, `src/routes/production/assets/batchGenerateAssetsImage.ts:54-132` | high |
| Provider Adapter | Dynamic text/image/video providers and task recording | `src/utils/ai.ts:113-321`, `src/utils/vendor.ts:22-41` | high |
| Preview/Export | Video list, track selection, file URL resolution, script zip | `src/routes/production/workbench/getVideoList.ts:15-30`, `src/routes/script/exportScript.ts:15-25` | medium |
