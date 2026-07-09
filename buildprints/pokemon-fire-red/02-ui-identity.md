# 02 UI Identity

UX is mandatory for a game product. The player experiences Pokémon through overworld readability, battle clarity, menu navigation, and Game Boy Advance-era affordances — not through debug overlays or raw JSON.

This file runs after `01-project-setup.md` and before `03-phases/*`.

## Product identity seed

- **Product:** Pokémon FireRed browser recreation
- **Product genre:** top-down tile JRPG with turn-based battle scenes and modal menus
- **Dominant first viewport:** overworld with player sprite, tile map, and minimal HUD (no debug panels)
- **Forbidden silhouettes:** generic admin dashboard, debug console as main UI, mobile chat layout, card-grid inventory web app

## GBA-authentic identity requirements

The generated identity must evoke **Game Boy Advance FireRed (2004)** without copying copyrighted UI assets verbatim.

**Asset split (see `references/asset-policy.md`):**

- Pokémon visuals: PokeAPI PNG only
- World/trainers/NPCs: follow `world_overworld_art_mode` from decisions — PNG sheets or custom SVG rasterized in Phaser

1. **Viewport:** 240×160 logical resolution scaled with integer pixel scaling (2×, 3×, 4×)
2. **Overworld HUD:** none or minimal; menus are full-screen overlays
3. **Battle layout:** player sprite back-left, foe front-right, HP bars, level, status icons, move menu 2×2 grid
4. **Typography:** bitmap or pixel font; no Inter/Roboto as primary game font
5. **Palette:** saturated GBA-era colors; grass routes green `#58A858`-family; UI borders `#F8F8F8` on `#404040` panels
6. **Transitions:** map warp fade, battle swipe, evolution white flash — not SPA route transitions
7. **Input hints:** "Press START for menu" not "Click here"

## Required sections in generated `docs/ui-identity.md`

1. Product identity thesis (JRPG overworld + battle, not web app)
2. Creative product concept (explore Kanto, catch/train Pokémon, beat gyms)
3. Silhouette rejection (no dashboard, no devtools-first layout)
4. First-run comprehension (title → new game → professor → starter → overworld in <60s)
5. User-language map (`Party` not `Roster`, `Bag` not `Inventory API`)
6. Chosen style direction: **GBA faithful pixel** with named rejected alternatives (flat Material, 3D HD remake)
7. Layout model: overworld full screen; battle scene swap; menus opaque fullscreen
8. Screen-state contract: overworld | battle | menu | dialogue | evolution | shop — mutual exclusion rules
9. Interaction model: D-pad move, A confirm, B cancel, Start menu, Select registered item
10. Component language: dialogue box bottom-third, yes/no prompt, party slot 6-grid, move PP display
11. Color and typography tokens with semantic names (`--ui-border`, `--hp-green`, `--hp-yellow`, `--hp-red`)
12. Content stress fixtures: long trainer names, 12-letter move names, full party faint, bag full
13. Proof obligations: screenshots for title, overworld, battle, party, bag, dialogue, shop, faint, victory
14. Anti-generic rules: no toast notifications, no modal web forms, no loading spinners without in-world excuse
15. Evidence binder in `.buildprint/ui-evidence.md` with screenshot paths

## Required sections in generated `docs/DESIGN.md`

1. Visual Thesis
2. Semantic Color Tokens (exact hex)
3. Typography Scale (pixel sizes)
4. Layout Dimensions (240×160 base, safe margins)
5. Component Specs (DialogueBox, BattleHUD, PartyMenu, BagMenu, PokedexScreen)
6. State Matrix (overworld/battle/menu × input focus)
7. Animation Timing (walk cycle 4 frames, battle intro ms)
8. Screenshot Acceptance Checklist
9. Exact Visual Bans (rounded Material buttons, drop shadows on tiles, gradient backgrounds)

## Skill loading

If `.agents/skills/frontend-ui-product-design/SKILL.md` exists from setup, load it. Otherwise apply this file directly.

## Non-UI equivalent

If building headless battle sim tests only, write `not-ui-bearing` — but this product **is UI-bearing**; do not skip.
