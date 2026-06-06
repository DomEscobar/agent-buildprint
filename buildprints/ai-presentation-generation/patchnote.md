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

## 2026-06-06 mobile and content-quality acceptance patch

The second generated rerun proved the desktop visual patch worked, but also showed how Mapper OS can still accept a narrow fix as overall product progress. The app passed the exact new desktop workbench target, but the proof artifacts exposed two remaining quality gaps:

1. Mobile Deck proof stacked the workbench, but the top navigation and thumbnail rail were horizontally clipped. The screenshot existed, yet the mobile experience was not polished or reliably reachable.
2. The generated outline/deck content was structurally correct but semantically thin. Multiple slides shared substantially the same generic body plan, which proved data flow but not useful presentation generation.

This matters for Mapper OS because the mapper should not only preserve source-feature breadth. It must convert observed product failures into testable acceptance criteria for the next build, including visual, responsive, and content-quality requirements. Otherwise a buildprint patch can overfit one screenshot and leave adjacent failure modes untouched.

Patched now:

- `blueprint.yaml` adds `mobile_visual_acceptance`, `content_specificity_acceptance`, and `long_text_stress_acceptance` production gates.
- The central output contract now rejects mobile screenshots with clipped tabs, thumbnail rails, toolbar actions, inspector controls, or primary actions.
- The central output contract now rejects repeated generic slide plan/body copy across non-title slides.
- The central output contract now requires long-text stress proof before claiming robust editor layout.
- `02-uiux-decision.md` now defines phone-width Deck proof as readable/reachable workflow, not merely a stacked page that scrolls.
- `02-uiux-decision.md` now defines deterministic fallback content as acceptable only when slide-specific and clearly labeled as local/sample.
- Phase 03 now requires distinct outline/content plans across at least four non-title slides.
- Phase 04 now requires mobile visual acceptance and long-text stress proof in addition to wide desktop proof.
- Phase 08 now requires handoff inspection for mobile clipping, content repetition, and long-text layout failures.
- `HANDOVER.md` now requires explicit mobile visual acceptance, content-specificity proof, and long-text stress proof.

Detailed Mapper OS lesson:

- Visual acceptance must be multi-viewport. A desktop-only patch can make the target screenshot look correct while mobile remains visibly broken. Mapper OS should preserve platform-specific proof obligations when the source product implies a real responsive/editor workflow.
- Product quality gates must include semantic output checks. For generative products, "structured data reached the UI" is not enough. The mapper should ask whether generated content is useful, differentiated, and shaped by input controls.
- Screenshot existence is weaker than screenshot inspection. The buildprint now says mobile proof fails when important controls are clipped, even if Playwright captured an image and the app technically rendered.
- Stress fixtures should become first-class proof. Short happy-path strings hide layout defects. Mapper OS should add long-title, long-body, long-provenance, and long-notes fixtures to editor-style products by default.
- Handover templates should force negative evidence. Builders must state what passed, what was blocked, and what was not proven for mobile readability, content specificity, and long-text robustness.

Builder implication: the next regenerate should not be called a clean improvement unless it shows a mobile Deck screenshot with readable tabs/thumbnails/toolbar/inspector/actions, a content-specific outline/deck where non-title slides are meaningfully distinct, and a long-text stress proof that does not break desktop or mobile layout.
