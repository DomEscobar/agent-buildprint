# Identity: readable play at pixel scale

**UX is a must.** A functioning engine is not a finished product. Run after `01-setup.md` and before `loops/`; read `.agents/skills/frontend-ui-product-design/SKILL.md` when present, recording missing harness honestly.

## Direction agreement
The product metaphor is a small playable place, not an admin dashboard. The dominant object is the action space; the primary gesture is the genre's core verb (strike, jump, tend or solve). Propose two distinct directions using the user's references and choose one with the user: e.g. chunky high-contrast street action versus restrained storybook garden. Record what is deliberately rejected. Never use “pixel art” as the whole design brief.

Create `docs/DESIGN.md` with camera/projection, logical viewport, pixels per tile, pixels per world unit, character height in world units, outline/light direction, named palette tokens, contrast, cluster size and pattern grain. Document organic vs angular silhouettes according to the selected art—not compulsory circles or rounded islands. Name HUD safe areas, font/license and readable size, spacing, touch hit targets, focus indicators and reduced-motion/screen-shake settings. Integer scaling/letterboxing is preferred; document any fractional fallback and inspect shimmer during camera motion.

Apply the Asset-Maker quality contract in `references/providers-and-sources.md` to this direction. Missing preferred-stack access must be disclosed; a free fallback, including last-resort custom SVG, is not an equivalent-quality substitute. Any changed target needs user agreement, and fallback art must pass the same construction proof below.

## Construction proof
Approve a tiny in-engine composition: one player, one prop, one terrain patch, one enemy or interactable and the real HUD. Judge readability at native scale and target display sizes, then test the same space as graybox. Iterate art and movement together before adding content. A moodboard is not approval of shipped assets.

States include start/instructions, playing, paused, objective/victory, failure or undo, restart, loading and missing-asset error. Buttons have real actions; no functionless buttons or raw JSON surface. Touch controls must not obscure threats, crops or puzzle targets; test simultaneous direction/action, safe areas and released input on blur. Sound communicates feedback without being the only cue.

Record the approved in-game seed and palette by content hash. Use `references/animation.md` for source identity lock and `references/world-and-tiles.md` for density/placement. Approval is contextual: changing scale, projection, palette or silhouette reopens the affected identity proof, not every unrelated loop.
