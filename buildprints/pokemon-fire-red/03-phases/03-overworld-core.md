# Phase 03 — Overworld Core (Maps, Movement, Warps)

## How to implement this phase

Read phase-flow CP-A. Load Tiled maps, implement grid movement with collision, ledges, and map transitions.

## Building objective

Vertical slice maps: **Pallet Town**, **Route 1**, **Viridian City** (minimum). Player walks smoothly tile-to-tile with collision.

### World art mode (from `00-questions.md`)

| Mode | Player/NPC implementation |
|---|---|
| `external_sprite_sheets` | Load PNG OW sheets; Phaser `anims` for 4-direction walk |
| `custom_svg` | Load SVG per trainer/NPC/player; rasterize at integer scale; swap frames or sheets for walk |

**Pokémon on overworld (follower, etc.):** if ever shown, still use PokeAPI cached PNG — never SVG.

Read `references/asset-policy.md` before implementing sprites.

### Map format

- Tiled orthogonal 16×16 tiles
- Layers: `Ground`, `Collision` (object layer or tile property), `Overhead`, `Events`
- Object types: `warp`, `npc_spawn`, `sign`, `grass`, `trigger`

### Map registry

`data/maps/index.json`:

```json
{
  "pallet_town": { "file": "pallet_town.tmx", "music": "pallet_town", "encounter_table": null },
  "route_1": { "file": "route_1.tmx", "music": "route_1", "encounter_table": "route_1" }
}
```

### Movement rules

- 4-direction grid; 4-frame walk cycle per direction
- Collision blocks movement; ledges allow jump one direction only
- Interaction facing: player must face NPC/sign tile

### Warps

- Touch warp tile → fade out → load target map + spawn coords → fade in
- Persist map id and tile position in GameState

### Camera

- Follow player; clamp to map bounds; no void outside map

### Grass

- Tall grass tiles set `encounter_enabled` flag when stepped (phase 04 consumes)

## DO NOT

- Do not allow walking through buildings/water without Surf HM later
- Do not teleport without fade transition
- Do not hardcode only one map without registry loader

## Minimum proof before moving on

- CP-A playtest: Pallet → Route 1 → Viridian without clipping
- Warp back to Pallet works both directions
- Ledge on Route 1 behaves correctly
- Screenshot per map
- `.buildprint/evidence-phase-03.md`

## Handoff note

Map ids implemented, collision approach, warp table, grass tile detection method.
