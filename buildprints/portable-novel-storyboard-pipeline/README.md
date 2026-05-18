# Toonflow Portable Creative Pipeline Buildprint

This v2 Buildprint describes a clean-room, portable webapp rebuild target for Toonflow's creative AI pipeline:

novel import -> chapter event extraction -> ScriptAgent skeleton/adaptation/script -> ProductionAgent storyboard table/panel -> asset/image/video adapters -> portable preview manifest.

It intentionally does not claim full Toonflow parity, desktop/Electron parity, provider parity, live video generation parity, or final stitched-video parity.

## Read Order

`BUILDPRINT.md` is the canonical start file and owns the required read order, phase gates, and acceptance gates.

After reading `BUILDPRINT.md`, follow its `Required Read Order`. This README is only a package overview and must not be treated as a competing read-order source.

Start implementation only after the contracts and LLM flow are clear. This package is spec-first; any runtime proof must be recorded in tracked implementation reports, not as untracked absolute paths.
