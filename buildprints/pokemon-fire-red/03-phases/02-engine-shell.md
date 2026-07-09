# Phase 02 — Engine Shell (Phaser Scenes + Game State)

## How to implement this phase

Read `01-project-setup.md`, `02-ui-identity.md`, architecture/system-architecture.md. Wire Phaser 3 with scene graph and empty game state store.

## Building objective

Playable shell: title → new game → blank overworld placeholder → return to title.

### Scene graph

1. **BootScene** — load manifest, fonts, UI atlas
2. **TitleScene** — NEW GAME, CONTINUE (disabled if no save), OPTIONS stub
3. **OverworldScene** — placeholder map or single test room
4. **BattleScene** — stub transition target
5. **MenuScene** — overlay or pause menu stub

### Game state store (TypeScript)

```typescript
interface GameState {
  schemaVersion: number;
  player: { name: string; money: number; badges: number; position: MapPosition; };
  party: PokemonInstance[];  // max 6
  bag: BagPockets;
  flags: Record<string, boolean | number>;
  pokedex: { seen: Set<number>; caught: Set<number>; };
  playTimeSeconds: number;
}
```

Central `GameStateStore` with subscribe/emit; no scattered global variables.

### Display config

- Base 240×160, scale mode FIT integer
- Pixel art rendering: `pixelArt: true`, antialias false

### Input

- Keyboard: arrows/WASD, Z/Enter = A, X/Esc = B, Enter/Shift = Start
- Gamepad API optional seam

## DO NOT

- Do not embed story logic in TitleScene
- Do not use 1920×1080 native coords without scale awareness
- Do not skip CONTINUE disabled state when no save

## Minimum proof before moving on

- `npm run dev` → title → new game → overworld placeholder → menu opens → title
- `npm run typecheck` passes
- Screenshot: title screen at 2× scale
- `.buildprint/evidence-phase-02.md`

## Handoff note

Scene list, game state module paths, input bindings, scale settings.
