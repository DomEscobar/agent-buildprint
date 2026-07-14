# Phase 02 — Engine Shell (Phaser Scenes + Game State)

## How to implement this phase

Read `01-project-setup.md`, `02-ui-identity.md`, architecture/system-architecture.md. Wire Phaser 3 with scene graph and empty game state store.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Foundation shell for the battle-first route: boot → title → typed test-fixture entry seam → registered production `BattleScene` → title. This phase proves architecture, input, scaling, and scene contracts only; it does not claim a playable battle or overworld.

The deterministic fixture entry is test/dev-only and absent from release navigation. It may pass typed initial state to the production BattleScene in Phase 03 but may never mutate outcomes or introduce a separate renderer or reducer.

### Scene graph

1. **BootScene** — load manifest, fonts, UI atlas
2. **TitleScene** — NEW GAME, CONTINUE (disabled if no save), OPTIONS stub
3. **BattleScene** — production scene boundary with typed initial-state/result contracts; implementation and certification belong to Phase 03
4. **OverworldScene** — registered scene boundary only; semantic map loader and Pallet implementation belong to Phase 04
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
- Do not show fake battle/map placeholders, colored rectangles, or decorative dead controls as product progress
- Do not expose the fixture entry seam in release navigation or player UI
- Do not disable `pixelArt: true` or use fractional scale

## Minimum proof before moving on

- `npm run dev` → boot → title renders at integer scale; no fake overworld or battle claim
- automated scene-contract test enters and exits the registered production BattleScene boundary through the typed fixture seam without rendering a separate proof scene
- `npm run typecheck` passes
- Screenshot: `.buildprint/screenshots/phase-02-title-2x.png` at 2× integer scale (480×320 viewport)
- Document in evidence: Phaser `pixelArt`, scale mode, and primary font choice
- `.buildprint/evidence-phase-02.md`

**Do not advance to phase 03** if pixel config is wrong, the BattleScene boundary/fixture contract is untyped, the test seam is player-visible, or the shell presents placeholder battle/world art as implemented gameplay.

## Handoff note

Scene list, typed BattleScene entry/result and fixture contracts, game state module paths, input bindings, scale settings, and proof that the fixture seam is absent from release UI.
