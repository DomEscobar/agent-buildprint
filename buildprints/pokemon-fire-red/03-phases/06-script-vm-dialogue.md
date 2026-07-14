# Phase 06 — Script VM + Dialogue

## How to implement this phase

Data-driven NPC and story scripting. No hardcoded Oak lecture in `OverworldScene.ts`.

**Prerequisite:** phase `05-first-loop-integration` must pass. Recompute `.buildprint/battle-slice-proof.json`, `.buildprint/pallet-world-proof.json`, and `.buildprint/first-loop-proof.json`; all three must bind the same source state before story work starts.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Script runner executes commands from `data/scripts/maps/{mapId}.yaml`.

### Script command set (minimum)

| Command | Args | Effect |
|---|---|---|
| `msg` | text key or string | Show dialogue box |
| `msgbox` | text | Blocking until A |
| `choice` | options[] | Branch by selection |
| `give_item` | itemId, qty | Add to bag |
| `give_pokemon` | speciesId, level | Add to party/PC |
| `set_flag` | flagId, value | Story progression |
| `check_flag` | flagId, op, value, jump | Conditional |
| `start_battle` | trainerId | Trainer battle |
| `warp` | mapId, x, y | Map change |
| `face_player` | npcId | NPC turns |
| `lock_movement` | bool | Player freeze during cutscene |
| `end` | — | Release lock |

### Dialogue text

- `data/scripts/text/en.yaml` keyed strings
- Support `{PLAYER}`, `{RIVAL}` placeholders

### Vertical slice scripts

1. **Pallet Town** — Oak stops player, escorts to lab (flag `oak_parcel_intro`)
2. **Oak's Lab** — starter choice (Bulbasaur/Charmander/Squirtle), rival picks counter, first rival battle
3. **Viridian** — old man coffee event (blocks route until parcel quest)

### Story graph binding

Before adding any story script, load `data/story/story-graph.yaml`. Each script file must reference a quest `id`. VM must support all commands needed by the graph:

Additional commands beyond minimum (add to interpreter):

| Command | Effect |
|---|---|
| `give_money` | Add money |
| `take_item` | Remove key item |
| `set_variable` | Numeric story vars (fossil choice) |
| `compare_badges` | Branch on badge count |
| `start_trainer_sight` | Line-of-sight battle |
| `set_dark_map` | Require Flash HM |
| `remove_object` | Cut tree, Snorlax, defeated trainer |
| `play_music` | BGM change |
| `give_badge` | Gym badge (only from gym leader scripts) |

### NPC entity

- Spawn from map object layer
- View direction, interaction script id
- Movement patrol optional defer

## DO NOT

- Do not hardcode starter choice in TypeScript scene
- Do not allow movement during blocking dialogue
- Do not skip rival battle after starter pick

## Minimum proof before moving on

- New game → Oak intro → lab → pick starter → rival battle → exit lab
- Flags persist in GameState (`oak_starter_chosen`, etc.)
- `.buildprint/evidence-phase-06.md` with script paths

## Handoff note

VM interpreter location, command extensibility, text file structure, flags introduced.
