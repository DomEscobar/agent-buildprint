# Patchnote — Presenton Remap to Mapper OS v3

## Summary

Remapped `ai-presentation-generation` against Presenton current source and the new Mapper OS output-quality standard. The packet is now v3 shaped and requires a central deck output contract instead of accepting a polished but generic slide generator.

## What changed

- Replaced the old packet spine with v3 required files:
  - `00-questions.md`
  - `01-project-setup.md`
  - `02-uiux-decision.md`
  - `HANDOVER.md`
- Removed obsolete packet files:
  - `01-questions.md`
  - `02-project-setup.md`
  - `04-review.md`
  - `05-handover.md`
  - `generated/agent-prompt.md`
- Rewrote `blueprint.yaml` with:
  - `schema_version: mapper-os/executable-blueprint/v3`
  - Presenton audited commit `9acd4a6f22e7b621aacdad69bc93b3e548e0b651`
  - `central_output_contract`
  - source-fidelity contract
  - product/runtime/production quality gates
- Replaced old phase routing with v3 phase index and focused phases:
  - foundation and first loop
  - provider and upload readiness
  - outline and layout generation
  - editable deck workbench
  - templates, assets, and theme
  - chat iteration and memory
  - export, API, webhook, MCP, and desktop
  - verification and handover
- Updated `README.md` with the new source commit and source-fidelity expectations.
- Added `remap-comparison.md` documenting the old packet gap and new acceptance bar.

## Central output now required

The required output is an editable, export-ready presentation deck with:

- runtime readiness;
- prompt/document input provenance;
- structured outline;
- layout/template assignment;
- slide content fields;
- speaker notes;
- theme and assets;
- persisted deck id and readback state;
- chat context;
- PPTX/PDF export task state;
- API/webhook/MCP/desktop status or blockers.

## Claims intentionally blocked

The packet now refuses to claim these without proof:

- live provider generation;
- document extraction;
- image generation;
- template import;
- editable deck quality;
- PPTX/PDF export;
- async API;
- webhook delivery;
- MCP tool use;
- desktop packaging;
- private/public deployment readiness.

## 2026-06-06 desktop visual acceptance patch

The first generated Presenton-style rerun exposed a real quality gap: the buildprint required screenshots and a deck editor, but did not hard-fail a narrow desktop composition or visible text overlap inside the primary slide canvas. That allowed a generated app to pass structural verification while the Deck view still looked unready.

Patched now:

- `blueprint.yaml` adds `desktop_visual_acceptance` as a production quality gate.
- The central output contract now rejects narrow stacked layouts presented as desktop proof.
- The central output contract now rejects slide canvas text/chip/icon overlap or clipping.
- `02-uiux-decision.md` now defines a real desktop Deck composition: thumbnail rail, central stable 16:9 canvas, inspector/edit controls, and contextual chat/export surface.
- Phase 04 now requires at least one 1440px-or-wider desktop Deck screenshot and one mobile Deck screenshot.
- Phase 08 now requires screenshot inspection, not only screenshot capture.
- `HANDOVER.md` now requires an explicit desktop visual acceptance result.

Builder implication: if the generated app shows overlapping deck preview content, compressed unreadable slide text, or a mobile stack masquerading as desktop, the build is incomplete even if build, lint, and Playwright pass.
