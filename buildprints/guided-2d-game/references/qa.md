# Operational QA: contracts, not “page loaded”

## Bind proof to production
Use `validation/README.md`. The loader validates the manifest it actually parsed and the image bytes it actually decoded; return immutable manifest/asset SHA-256 with loaded resources. Renderer, collision and animation registration must consume this same validated object/resources. An export of a parallel “equivalent” fixture is not evidence. Test runtime bindings by intentionally corrupting an actual referenced rect/layer in a temporary test copy and requiring the production loader to fail visibly. Keep original production files intact.

The bundled fixtures prove the checker, not a future game's manifests. Add engine-specific tests around the actual scene loader and state transitions. No proof-only renderer, fake provider, hardcoded winning reducer or intercepted game outcomes.

## Asset checks
For **every loaded asset**: decode successfully, match declared dimensions and SHA-256, validate all frame source rectangles/gutters/layout, provenance/license/source identity, shared scale, anchors, alpha threshold/body bounds and intended displacement. Check all visual frames, not just file existence. No arbitrary file-size cutoff. Missing assets and wrong MIME must surface clear loading errors rather than invisible empty sprites. Inspect against contrasting backgrounds for alpha contamination, then contact sheet and motion preview for identity, timing and drift. Render repeated tile patches and inspect palette/grain/seams in motion.

## Runtime matrix
Use an agreed tolerance and record measured values. Example target for a simple constant-speed controller: ten seconds of commanded travel at forced 30/60/120 FPS differs by at most 1% or one logical pixel (whichever is larger); diagonal travel matches normalized speed. This is a starter target, not a universal platform-physics guarantee. Test fixed-step catch-up cap/background-tab resume separately: no teleport, tunnel, held-input latch or unbounded physics catch-up. Test acceleration/jump arcs against time, not render frames.

| Area | Concrete action | Required observation |
| --- | --- | --- |
| Core loop | Start via real UI, perform core verb, reach objective/victory | Correct state, readable feedback, no debug shortcut |
| Failure/recovery | Lose/miss objective or execute invalid move; restart/undo | Correct failure/undo state; clean reset of timers, entities, score and input |
| Input | Hold diagonal, release, blur/refocus, simultaneous move+action | Stable speed, no stuck buttons or unwanted double actions |
| Animation | Walk/turn/act/hurt as applicable; record full cycles | Same identity, planted feet except intentional displacement, phase contact and loop seam |
| Placement | Walk around/behind tall props and along each affected route | Feet/footprints/collision align; correct canopy occlusion and no blocked exit |
| Camera | Traverse scene edges and several camera positions/zooms | No gaps, offscreen hazards, shimmer or sort popping |
| Desktop | Keyboard and agreed gamepad at target viewport | Focus, UI, controls and readable native-scale pixels |
| Mobile | Real touch where available; narrow portrait/landscape as agreed | Simultaneous touch, safe areas, release/cancel, readable HUD and unobscured action |
| Save if included | Save mid-loop, reload, migrate only when agreed | Same state; compatible backup/restore; no duplication |
| Online if included | Two clients, delayed/dropped traffic, reconnect | Authority and room isolation; no duplicated rewards or ghost input |

Capture overlays from the actual scene: feet/pivots, opaque bounds, physical footprints, collisions/hurtboxes/hitboxes, layer/sort key and navigation grid. Capture clean screenshots **and** animation/input recordings. Emulation is useful but is not a physical-device claim; state which device/browser/viewport and method was used. The packet itself contains no browser automation dependency or browser proof.

## Regression scope
- Changed image/layout: decode + frame/alpha/hash checks, animation contact sheet and affected runtime state.
- Changed placement: shared manifest validator, changed terrain/occupancy/spacing/route tests and local traversal/occlusion.
- Changed action/input: state and collision tests, active-frame binding, affected win/loss/restart and frame rates.
- Changed loader/coordinate transform: all affected assets/scenes and bindings, not just a fixture smoke test.
- Full slice: at graybox/art convergence, integrated slice and final frozen release (or a systemic change invalidating them). Do not replay a full campaign for every small edit. Keep prior evidence only when its code/assets/contract remain applicable; record why.

## Frozen release proof
Use `templates/milestone-evidence.md`: commit, build hash, actual loaded manifest and asset hashes, test commands/results, browser/device details, screenshots/recordings and reviewer. If code or content changes, regenerate affected evidence and bind a new version. Independent reviewer follows `review.md`; same-session review is REVIEW_INVALID.

For **public_web**, verify separately:
1. Public HTTPS/HTTP route status and MIME for HTML/JS/CSS (no HTML fallback served as JS).
2. Every referenced public asset: response, MIME, actual decode/dimensions and content hash against build; check cache mismatch and missing-asset error.
3. Real browser input-driven full slice, network/console errors, mobile/desktop paths. HTTP 200 proves none of this.
4. If online transport uses WebSockets, WSS handshake/auth/origin behavior and two-client messages/reconnect independently from HTTP delivery. A 101 handshake alone does not prove game synchronization. Mark WSS not applicable for a solo static game; never add a server just to tick a box.

Rehearse rollback with previous matching build/manifest/assets and compatible save backup. Handover includes commands, controls, version, license notices, approved exclusions, actual proof and untested areas. Honest local-only or reviewer-blocked delivery is better than fabricated public success.
