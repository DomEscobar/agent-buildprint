# Agent Handoff

Use this file only after `BUILDPRINT.md`, `questions.md`, `PLAN.md`, and the numbered phase files. `BUILDPRINT.md` remains the canonical authority.

## Mission Reminder

Build a clean-room, deterministic novel-to-storyboard proof:

`Project + Chapters -> Events -> Script Plan + Scripts -> Assets -> Storyboard Rows -> Mock Media Tasks -> Creative Workbench Preview -> PortablePreviewManifest`

Do not rebuild Toonflow's Electron app, full canvas UI, live provider integrations, or final video stitching.

Do not settle for a raw compliance dashboard. The browser proof must read as a creative storyboard workbench: local thumbnails, timeline lanes, selected-shot inspector, compact media tiles, and a secondary debug drawer.

## Latest Safe Next Step

- If the default preset or `questions.md` alignment is unresolved: finish `plans/00-alignment.md`.
- If domain models, deterministic IDs, persistence, or manifest assembly are missing: continue `plans/01-domain-persistence.md`.
- If ScriptAgent/ProductionAgent XML parsing or no-partial-persistence behavior is missing: continue `plans/02-agent-xml-pipeline.md`.
- If job lifecycle, mock providers, retry/cancel, or no-network gates are missing: continue `plans/03-async-providers.md`.
- If the UI is ugly, debug-first, raw-table-first, or lacks thumbnails/timeline/inspector: redo `plans/04-workbench-ui.md`.
- If tests, browser QA, screenshots, manifest sample, validation report, or chat handover are missing: continue `plans/05-qa-handover.md`.
- If all gates pass: no next step is needed unless the user explicitly requests a persistence, live-provider, or parity upgrade.

## Final Checks

- Default tests make zero network calls.
- Provider mode remains mock/no-network by default.
- Debug evidence is secondary to the creative workbench.
- Raw task logs, raw media refs, and raw manifest JSON are not the primary product surface.
- No provider, Electron, exact UI/canvas, or final stitched-video parity is claimed.
- `VALIDATION.md` records choices, commands, evidence, gaps, screenshots, manifest sample, and next direction.
- Final chat handover states outcome, evidence, changes, known gaps, and recommended next direction.

