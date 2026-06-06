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
