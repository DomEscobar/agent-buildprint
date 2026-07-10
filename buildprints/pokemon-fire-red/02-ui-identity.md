# 02 UI Identity

UX is a must for a game product. The player must understand where they are, what they can do next, and whether they are in overworld, dialogue, menu, battle, shop, evolution, or save state. The player experiences Pokémon through overworld readability, battle clarity, menu navigation, and Game Boy Advance-era affordances — not through debug overlays or raw JSON. A pretty screenshot is not a finished product.

This file runs after `01-project-setup.md` and before `03-phases/*`.

Load `.agents/skills/frontend-ui-product-design/SKILL.md` and its `references/screen-states.md` if present. If the skill harness is missing, return to `01-project-setup.md` and record the blocker.

Think through the product before implementation. Reason from the artifact: central output is a playable top-down JRPG, the golden path is title -> new game -> professor -> starter -> route movement -> first battle, and every interface choice must serve moment-to-moment manipulation.

## Product identity seed

- **Product:** Pokémon FireRed browser recreation
- **Product genre:** top-down tile JRPG with turn-based battle scenes and modal menus
- **Creative product concept:** explore Kanto, catch and train Pokémon, beat gyms, disrupt Team Rocket, and reach Champion with a living party/save state.
- **Product metaphor:** a pocket adventure cartridge running in the browser, with the screen as the game world rather than a web control panel.
- **Dominant object:** the 240×160 game viewport containing map, battle, menu, or dialogue.
- **Primary gesture/manipulation:** D-pad movement and A/B/Start commands that directly change the player, party, battle, or story state.
- **Moment-to-moment manipulation:** walk tile by tile, face NPCs, confirm dialogue, select moves, switch Pokémon, use Bag items, reorder party, save, and resume.
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

The generated local identity artifact must exist at both `docs/ui-identity.md` and `UI-IDENTITY.md` or explain why one path mirrors the other. Generate a local generated UI identity; do not copy prose from this packet.

Required generated identity sections:

- Product identity thesis
- Creative product concept
- Chosen style direction
- Layout model
- Interaction model
- Component language
- Color and typography tokens
- First-run comprehension contract
- User-language map
- Silhouette rejection
- Content stress fixtures
- Proof obligations

First-run comprehension contract:

- Player starts at title, selects new game, sees professor intro, chooses starter, and reaches controllable overworld in under 60 seconds in the happy path.
- The first screen sketch must make the next powerful user action obvious without proof terms, internal route labels, evaluator language, or debug jargon.
- User-language map: `Party`, `Bag`, `Pokédex`, `Save`, `Pokémon Center`, `Move`, `PP`, `Badge`, and `HM`; never surface internal proof terms, provider names, JSON schema names, or evaluator language to the player.

Silhouette rejection:

- Forbidden default silhouette: generic dashboard, central card grid, renamed workbench, old workbench, proof workbench, proof console, admin sidebar, raw JSON explorer, modal web form, or devtools-first layout.
- Adjacent at-risk silhouette: browser-hosted retro game demo with decorative controls but no stateful party/story/battle loop.
- Distinguish the product through actual world/battle/menu manipulation, not only palette, logo, labels, borders, or nostalgia copy. These do not count as a distinguishing treatment by themselves.
- Anti-silhouette distinctiveness screenshot check: compare title, overworld, battle, and party screenshots against the forbidden silhouette and adjacent at-risk silhouette. If a fresh reviewer calls the surface indistinguishable, revise before phase work. Mechanical checks alone are insufficient.

Evidence binder requirements:

- Write `.buildprint/ui-evidence.md`.
- Include screenshot paths, viewport sizes, command used, relevant file:line links, and what each screenshot proves.
- Identity prose is not evidence. The binder must tie visuals and interactions to implemented code.

Action surface gate:

- Every major state must expose a next powerful user action stronger than "type and send": move, talk, select starter, choose move, open party, switch, use item, buy/sell, save, or resume.
- Status panels are subordinate to the playable surface. Debug/proof panels may exist only behind dev mode and must not dominate the product.

Proof obligations:

- Capture title, overworld, battle, party, bag, dialogue, shop, faint, victory, 1280px desktop, and 375px mobile/narrow screenshots.
- **Early proof (CP-VS):** before phase 06, minimum screenshots must prove PokeAPI battle sprites + world tileset + player walk cycle at 2× scale (see `05-playable-proof.md`).
- Include content stress fixtures: long trainer names, 12-letter move names, six-party display, fainted party, full bag, empty PC box, loading data, error/blocked data, and save migration warning.
- Empty, loading, error, and blocked states must look designed and must not expose raw JSON.
- Reject generic dead UI: functionless buttons, dead controls, raw JSON player surfaces, proof labels, proof terms, and evaluator language are all failures.

Exact generated visual tokens:

- Define exact semantic color tokens with hex values, typography sizes, focus rings, HP state colors, status colors, and disabled/fainted colors.
- Do not rely on vague "retro palette" prose.

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

Required sections in generated DESIGN.md:

- Visual Thesis
- Exact Tokens
- Type Scale
- Layout Contract
- Component Specs
- State Matrix
- Implementation Mapping
- Screenshot Acceptance
- Banned Patterns

The DESIGN.md is a screen construction contract, not taste prose or a moodboard. It must map tokens and components to implementation constants/files. Do not collapse `docs/ui-identity.md` and `docs/DESIGN.md`; identity explains what the product is, DESIGN.md defines exact construction rules.

## Skill loading

If `.agents/skills/frontend-ui-product-design/SKILL.md` exists from setup, load it. Otherwise apply this file directly.

## Non-UI equivalent

If building headless battle sim tests only, write `not-ui-bearing` — but this product **is UI-bearing**; do not skip.
