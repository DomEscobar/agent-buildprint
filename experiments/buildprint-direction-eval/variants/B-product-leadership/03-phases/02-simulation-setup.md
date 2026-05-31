# Phase 02 — Simulation Setup

## Product intention

The user can configure how the story system should be explored: what perspective, constraints, style, timeline, or scenario the local run should use.

## Build

- Simulation/config panel tied to the current project.
- Presets or meaningful controls that affect the generated result.
- Clear distinction between deterministic local mode and missing live-provider mode.
- Persisted config and readable summary.

## Quality bar

Controls must change output or be honestly disabled. The user should understand what the run will do before pressing start.

## Do not ship

Fake sliders, provider buttons that silently no-op, vague “AI magic” copy, config that is never read.
