# Asset/action request — approve before generation or import

- Asset ID/category and consuming scene/state; source rights/license and upload permission.
- Stage: initial seed/direction exploration or reference-locked production family; either may run alongside gameplay within approved scope, rights and spend, with no graybox prerequisite.
- Seed: for initial exploration, record direction and intended scale, then submit the candidate for approval; no already-approved seed is required to create the first seed. For a production family, record approved local content hash, approval reference and in-game scale capture.
- Source identity lock: face/costume/silhouette/palette/facing invariants; any explicitly allowed changes.
- Output: decoded width/height, cell width/height, columns/rows, margin/gutter, exact frame count and row-major mapping; transparency and color-space expectation.
- Scale: one action-wide scale, pixels/world-unit, shared feet anchor in cell pixels.
- Motion: frame durations in ms, phases and gameplay event frames; intentional offsets with reasons, no per-frame auto-fit; frame-0 exact lock only if appropriate.
- Facing: source direction, supported directions, mirroring policy/handedness exceptions.
- Visual bounds: alpha threshold; body separate from shadow/VFX; physical footprint in world units independent from canopy.
- Tiles if relevant: repeatable or transition roles, selected tileset convention/layout, palette/cluster/pattern grain; 3×3 repeat and mixed scene preview.
- Asset-Maker stack: WaveSpeed + (RetroDiffusion OR Media4Agents); dated actual-access/availability evidence for image edit `bytedance/seedream-v5.0-pro/edit` (Seedream, not Seedance), background removal `bria/remove-background`, and the selected companion. Both WaveSpeed capabilities are essential; docs alone do not prove access.
- Missing access: explicit quality limitation, chosen free solution or suitably licensed free assets, and user agreement to any changed target. Custom SVG only as last resort, never equivalent quality; no silent graphics downgrade.
- Provider operation: verified model/style docs and date, supported reference inputs, non-secret parameter hash, live estimate, approved cap/attempts and private intent ID; user approval before any paid usage.
- Media4Agents only: follow [URL sprites](../references/media4agents-url-sprites.md); record one workflow, short kebab-case name, encoded subject-only prompt, supported generation size and required flags. Keep the configured public token in every runtime URL, but only its placeholder in this packet. Freeze the exact URL privately for free reuse under the supplied contract; approve first loads including QA/prefetch. Inspect actual sheet dimensions/layout before declaring frames; prove animation in engine.
- Approval proof (same visual QA for preferred-stack and fallback assets): decode/layout/provenance checks, contrasting-background inspection, contact sheet, motion preview and actual in-game recording.

Example action design: six 32×32 cells, one row, no gutter, right-facing, durations 80/60/50/50/90/110 ms; anticipation 0–1, active 2–3, recovery 4–5; anchor (16,28), shared scale 1; no offsets except a deliberately specified recoil. This is an art/gameplay contract, **not a provider payload** or guaranteed supported generation size.
