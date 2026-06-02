# Phase 03 — Simulation Workspace Preparation

## Product intention

Create a simulation workspace from the graph: selected entities become agents, profiles and dual-platform config are generated, and the user can inspect what will run before spending provider/runtime budget.

## Build

- Create simulation records tied to project and graph ids, with status, platform enablement, entity counts, profiles, config, timestamps, and errors.
- Implement prepare flow: read graph entities, filter by selected entity types, generate or derive agent profiles, generate dual-platform config, and persist all artifacts.
- Show progress stages for reading entities, generating profiles, generating config, and preparing runtime assets.
- Let users inspect generated profiles, topics, activity windows, stance/sentiment/influence settings, and platform config.
- Support already-prepared readback and force-regenerate only with clear consequences.

## Quality bar

- A graph-backed simulation can be created and reloaded.
- Missing graph/provider credentials block the prepare action with a clear next action.
- Generated profile/config displays are useful enough to catch obvious nonsense before running.
- Re-preparing does not silently overwrite without a deliberate action.

## Do not ship

- Anonymous placeholder agents when profile generation was blocked.
- A config panel that cannot be traced back to the workspace.
- Progress that jumps to ready when required files are missing.
- Hidden provider cost or runtime implications.
