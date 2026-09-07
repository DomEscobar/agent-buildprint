# Seed → full strip → shared normalization → runtime approval

## 1. Approve the seed where it will ship
Place one original/licensed candidate in the actual scene at target scale with terrain, prop and HUD. Approve silhouette, face, costume, proportions, palette, facing, outline and feet position. Store source/seed SHA-256, rights, allowed edits and approval reference in the asset request. A prompt or random numeric seed alone is not source identity. Preserve immutable originals and normalized derivatives separately.

## 2. Specify the complete strip
Use `templates/asset-request.md`. Build a transparent reference canvas around the approved frame and request the **whole strip from that same reference in one edit**, not independently generated frames. Specify exact row/column count, cell dimensions, transparent background, facing, read order, timings, and anticipation/active/recovery phases. No labels, scenery or poster layout. Keep the same face, costume, silhouette and palette. For Retro Diffusion, put rendering style in the supported style selection rather than fighting its provider prompt guidance; rediscover live style limits first.

Use media4agents or direct Retro Diffusion only through verified capabilities; WaveSpeed may perform pose/reference edits when the chosen current model explicitly supports the needed image inputs. Never assume all providers accept identical reference fields, masks or strip sizes. No separate per-frame generation unless the user knowingly accepts drift and extra review/spend. Full-strip generation reduces drift but does not guarantee consistency.

## 3. Normalize without destroying motion
Decode the file; inspect every cell, gutters, bleed and source rectangle. Use one nearest-neighbor scale for the **whole action** matched to the approved seed. Keep fixed cell size and shared feet/bottom-center origin. Do not individually fit each frame to its visible bounds: it causes breathing scale, skating and flattened jumps. Encode intentional per-frame displacement explicitly with a reason (e.g. hop apex); distinguish image displacement from world physics `z` so it is applied exactly once. Retain weapon arcs and anticipation squash accepted by art direction. A shared anchor is not a command to glue every lowest pixel to the floor.

Optionally restore frame 0 to the exact shipped seed only when the action is intended to start there; hash-check that lock and verify transition into frame 1. Keep source identity hashes constant across the action; changed identity requires new seed approval rather than editing provenance to pretend continuity. Mirroring is allowed only when handedness, text, lighting and asymmetrical costume remain acceptable; otherwise author the other facing from the same identity reference.

Remove background contamination using alpha/matte analysis, a reviewed mask or a documented background-removal tool. Decontaminate colored fringes around semitransparent edges and normalize fully transparent RGB where needed. **Never delete black pixels by color**: eyes, outline, boots and shadows may legitimately be black. Inspect against light, dark and saturated checkerboards; preserve intended semitransparent VFX and separate shadow layers.

## 4. Approve three views, then load
1. Contact sheet with frame indices, source rects, duration, shared anchor, opaque bounds and any displacement overlay.
2. Animated preview/recording at native game speed and slowed review speed: spacing, weight, phase readability, flicker, identity and loop seam.
3. Actual runtime using the candidate manifest: walk, turn, act, take damage or corresponding genre states, camera edges and supported devices. Compare active gameplay frames to the hit/event clock.

Per asset, validate actual decode/dimensions, source rectangles, hashes and rights metadata, then visually inspect content. Do not impose arbitrary minimum file size: a tiny legitimate image can compress well; a huge image can still be wrong. The starter validator checks geometry/alpha/hash contracts, not whether the character looks right. Failed art stays a candidate and never replaces an approved shipped reference automatically.
