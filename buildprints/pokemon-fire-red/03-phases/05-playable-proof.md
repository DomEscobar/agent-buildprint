# Phase 05 — Playable Proof (Sprites + First Gameplay)

## How to implement this phase

Hard gate before any story scripting (phase 06). This phase does **not** add new scope. It proves the engine, sprites, and first gameplay loop are real — not placeholders, prose, or debug shells.

Read `references/asset-policy.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and all evidence from phases 01–05 before scoring.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Prove **CP-VS**: a fresh player can complete the golden path with correct sprites and playable mechanics:

**Title → NEW GAME → controllable overworld (Pallet or test room with real tileset) → Route 1 grass → wild battle → Fight menu → win or run → return overworld.**

No story VM required yet. Oak/starter can be stubbed only if party already contains a Lv 5 starter for CP-B — but battle and overworld visuals must be production-quality, not debug art.

## Sprite correctness (MUST blockers)

All items below must pass before `active_phase` advances to phase 06. Any failure keeps this phase active.

### Pokémon sprites (Rule 1 — non-negotiable)

- Bulbasaur, Charmander, Squirtle, Rattata, Pidgey (minimum) have cached PokeAPI FRLG `front.png` and `back.png`
- Wild battle shows foe **front** sprite top-right from cache — not colored rectangle, not SVG, not wrong generation
- Battle shows player Pokémon **back** sprite bottom-left from cache
- `npm run assets:validate` passes with zero Pokémon policy violations
- Screenshot: `.buildprint/screenshots/cp-vs-battle-rattata-2x.png` at 480×320 (2× of 240×160)

### World / overworld sprites (Rule 2 — non-negotiable for visual claims)

| Mode | Requirement |
|---|---|
| `external_sprite_sheets` | Player OW sheet loaded; 4-direction walk cycle visible; Route 1 (or test map) uses 16×16 Tiled tileset PNG — not flat color fill, not single-tile repeat |
| `custom_svg` | **Blocks `battle_core` visual claim** unless user explicitly opted in via `.buildprint/decisions.md`. If opted in, rasterized SVG must match DESIGN.md tokens and pass screenshot review — agent cannot self-pass ugly SVG |

Default expectation: `external_sprite_sheets` with documented pack in `docs/assets-provenance.md`.

- Screenshot: `.buildprint/screenshots/cp-vs-overworld-route1-2x.png` showing player sprite + tile variety
- Screenshot: `.buildprint/screenshots/cp-vs-walk-cycle.png` or animation note proving 4-frame walk per direction

### Pixel rendering (non-negotiable)

- Phaser config: `pixelArt: true`, antialias false, integer scale (2× minimum on desktop)
- Game font is bitmap/pixel — not Inter, Roboto, or system sans as primary UI font
- Screenshot at 2× must show crisp pixels (no blurry scaling)

## Gameplay proof (MUST blockers)

- CP-A pass: walk without clipping (Pallet → Route 1 → Viridian or equivalent test path)
- CP-B pass: win wild battle on Route 1 at Lv 5 starter OR document honest partial with Run-only proof + blocker for damage
- `npm run test` — battle damage unit tests pass (from phase 05)
- `npm run typecheck` passes
- Playwright or manual playtest recorded in `.buildprint/playthrough-receipt.md` under checkpoint **CP-VS**

## Evidence artifacts (required files — phase cannot advance without them)

Write or update:

1. `.buildprint/evidence-phase-05-playable-proof.md` — command outputs, checkpoint results, known gaps
2. `.buildprint/ui-evidence.md` — minimum entries for this gate:
   - title (1280 + 375)
   - overworld with player sprite + tileset
   - battle with PokeAPI foe + back sprites
   - pixel scale proof (2× screenshot with dimension note)
3. `.buildprint/screenshots/` — paths listed above plus any repair iterations
4. `.buildprint/sprite-audit.json` — machine-readable sprite gate (schema below)

### sprite-audit.json schema

```json
{
  "checked_at": "ISO8601",
  "world_art_mode": "external_sprite_sheets | custom_svg",
  "pokemon_sprites": {
    "status": "pass | fail | blocked",
    "species_verified": [1, 4, 7, 16, 19],
    "cache_dir": "public/data/generated/sprites/pokemon",
    "screenshot_battle": ".buildprint/screenshots/cp-vs-battle-rattata-2x.png"
  },
  "world_sprites": {
    "status": "pass | fail | blocked",
    "player_walk_cycle": true,
    "tileset_source": "path or pack name",
    "screenshot_overworld": ".buildprint/screenshots/cp-vs-overworld-route1-2x.png"
  },
  "pixel_rendering": {
    "status": "pass | fail",
    "pixelArt": true,
    "integer_scale": 2
  },
  "gameplay": {
    "cp_a": "pass | fail",
    "cp_b": "pass | fail | partial",
    "cp_vs": "pass | fail"
  },
  "blockers": []
}
```

## Auto-fail triggers (do not advance)

- Colored rectangle or CSS shape substitutes for Pokémon or player sprite
- Missing PokeAPI cache files for any species shown on screen
- Flat single-color map with no tileset PNG
- Blurry non-integer scaling in 2× screenshot
- Prose-only evidence with no screenshot paths
- `custom_svg` world art without explicit user opt-in in decisions ledger
- CP-A or CP-B failed without recorded blocker and lowered claim
- Missing `.buildprint/ui-evidence.md` or `.buildprint/sprite-audit.json`

## Phase advancement rule

Update `03-phases/phase-index.yaml` `active_phase` to `03-phases/06-script-vm-dialogue.md` **only when**:

- `sprite-audit.json` has no `fail` status in pokemon_sprites, world_sprites, or pixel_rendering
- `gameplay.cp_vs` is `pass`
- All required screenshot files exist on disk
- `.buildprint/ui-evidence.md` exists with file:line links

If any sprite or gameplay blocker remains, stay on this phase and repair — do not start Oak/starter story work.

## DO NOT

- Do not advance to phase 06 with placeholder art "to be fixed later"
- Do not substitute SVG for Pokémon sprites
- Do not self-pass sprite audit without screenshots
- Do not skip CP-VS because "battle engine tests pass"
- Do not claim `battle_core` or higher if world sprites are debug placeholders

## Minimum proof before moving on

- CP-VS playtest recorded
- `sprite-audit.json` committed with all gates pass
- `.buildprint/ui-evidence.md` updated
- Three required CP-VS screenshots on disk
- `.buildprint/evidence-phase-05-playable-proof.md`
- Claim ceiling explicitly stated (max `battle_core` until phase 06+ story work)

## Handoff note

Sprite audit status, screenshot paths, world art pack used, pixel config values, CP-VS result, blockers for phase 06.
