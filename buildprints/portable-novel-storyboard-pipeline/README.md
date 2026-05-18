# Toonflow Portable Creative Pipeline Buildprint

This v2 Buildprint describes a clean-room, portable webapp rebuild target for Toonflow's creative AI pipeline:

novel import -> chapter event extraction -> ScriptAgent skeleton/adaptation/script -> ProductionAgent storyboard table/panel -> asset/image/video adapters -> portable preview manifest.

It intentionally does not claim full Toonflow parity, desktop/Electron parity, provider parity, live video generation parity, or final stitched-video parity.

## V2 Read Order

1. `BUILDPRINT.md` - canonical start file, authority spine, binding slice, phase gates, acceptance gates.
2. `buildprint.json`, `phases.yaml`, `acceptance.yaml`, `claims.yaml` - machine-readable control-plane mirrors for agent/tool alignment.
3. `AGENT_HANDOFF.md` - task, build order, hard rules.
4. `WEBAPP_TARGET_SPEC.md` - concrete webapp architecture, pages, components, data flows.
5. `CONTRACTS.md`, `LLM_FLOW.md`, `SYSTEM_MAP.md` - schemas, workflow, and module boundaries.
6. `AGENT_PROMPT_PACK.md` and `XML_OUTPUT_CONTRACT.md` - compact agent stage cards and parser contract.
7. `ASYNC_JOB_MODEL.md` and `PROVIDER_ADAPTERS.md` - job lifecycle and provider interfaces.
8. `TEST_MATRIX.md` and `HEAD_TO_FOOT_QA.md` - validation matrix and end-to-end runtime QA gate.
9. `UI_CANVAS_MAP.md` and `PREVIEW_COMPOSITION_SPEC.md` - workbench mapping and preview/export substitute.
10. `BROWSER_QA_SCENARIOS.md`, `IMPLEMENTATION_ROADMAP.md`, `PARITY_CLAIMS.md`, `TRACEABILITY_MATRIX.md` - browser QA, build phases, safe claims, and source evidence.

Start implementation only after the contracts and LLM flow are clear. This package is spec-first; any runtime proof must be recorded in tracked implementation reports, not as untracked absolute paths.
