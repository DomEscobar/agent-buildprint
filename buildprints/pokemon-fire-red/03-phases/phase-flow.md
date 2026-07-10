# Phase Flow

Work active phase only. Do not read every phase upfront. Read `03-phases/phase-index.yaml`, open only the active phase and its named prerequisite notes, then execute the loop below. This prevents context bloat and stale phase assumptions.

## Active phase loop

For every active phase:

1. Observe current repo, AGENTS.md, `.buildprint/next-agent.md`, setup receipt, UI identity, docs/DESIGN.md, game runtime, screenshots, tests, and story progress.
2. Thinking checkpoint: name the smallest real vertical user/operator path this phase can make playable or more truthful.
3. Predict 3-7 likely failure modes before editing.
4. Write a proof plan: commands, screenshots, playtest path, save/readback, data validator, or claim-gate artifact.
5. Implement the smallest real repair or phase slice.
6. Compare the result against the predicted failure modes.
7. Repair one concrete weakness before advancing unless the weakness is externally blocked.
8. Record what the proof does not prove and the current claim ceiling.

This review loop is not a deliverable file. Do not create phase-run paperwork by default. Compare the result against the predicted failure modes, perform one concrete weakness repair, and record what the proof does not prove. Use `.buildprint/next-agent.md`, `.buildprint/playthrough-receipt.md`, `.buildprint/ui-evidence.md`, and HANDOVER only when they materially preserve state.

## Dependency graph

```mermaid
flowchart TD
  P01[01 Data Pipeline] --> P02[02 Engine Shell]
  P02 --> P03[03 Overworld Core]
  P03 --> P04[04 Wild Encounters + Battle UI]
  P04 --> P05[05 Battle Engine Gen3]
  P05 --> P06[06 Script VM + Dialogue]
  P06 --> P07[07 Party PC Evolution]
  P07 --> P08[08 Items Bag Shops HMs + Save]
  P08 --> P09[09 Trainers Rival AI]
  P09 --> P10[10 Story Gyms Dungeons]
  P10 --> P11[11 Elite Four Champion]
  P11 --> P12[12 Sevii Postgame]
  P12 --> P13[13 Menus Audio Polish]
  P13 --> P14[14 Claim Verification]
  P14 --> P99[99 Critical Review]
```

## Story contract (read before phase 06)

| File | Role |
|---|---|
| `data/story/story-graph.yaml` | Quest order, flags, mandatory events |
| `data/story/map-manifest.yaml` | 82 Kanto + 18 Sevii required maps |
| `data/story/rival-progression.yaml` | 8 rival battles |
| `data/story/sevii-quest-chain.yaml` | Full islands 1-7 postgame |

## Maturity progression

| After phase | Max honest claim |
|---|---|
| 01 | data_pipeline |
| 03 | overworld_core |
| 05 | battle_core |
| 08 | progression_core |
| 11 | kanto_complete |
| 12 | postgame_sevii |
| 13-14 | release_polish (if proof passes) |

## Playtest checkpoints

Agents must playtest and record in `.buildprint/playthrough-receipt.md`:

| ID | After | Proof |
|---|---|---|
| **CP-A** | Phase 03 | Walk Pallet → Route 1 → Viridian without clipping |
| **CP-B** | Phase 05 | Win wild battle Route 1 at Lv 5 starter |
| **CP-C** | Phase 08 | Potion in battle; save/load preserves party; Cut after Brock |
| **CP-D** | Phase 10 | Defeat Brock levels 8-12 |
| **CP-M1** | Phase 10 | SS Anne complete, HM Cut, rival SS Anne battle |
| **CP-M2** | Phase 10 | Silph Co cleared, Tea/Saffron passed, Rocket Hideout done |
| **CP-M3** | Phase 10 | 8 badges, Safari Surf+Strength, both Snorlax cleared |
| **CP-E** | Phase 11 | Hall of Fame after Champion |
| **CP-F** | Phase 12 | One Island + Celio intro |
| **CP-SeviiComplete** | Phase 12 | Network Machine complete, National Dex, islands 1-7 accessible |

**Mid-story checkpoints CP-M1..M3 are hard gates for phase 10 completion** — not optional.

## Validation commands

```bash
npm run maps:validate
npm run story:validate
npm run story:lint
```

Phase 10 cannot complete unless `maps:validate` = 100% and `story:validate` = all kanto quests complete.

Phase 12 cannot complete unless all sevii quests in `sevii-quest-chain.yaml` are complete.

## Content authoring parallel track

After phase 06 script VM:

- `data/maps/` — one Tiled file per `map-manifest.yaml` id
- `data/manual/trainers/` — JSON per trainer id
- `data/scripts/maps/` — per-map scripts keyed by story-graph

Vertical slice first (Pallet → Viridian → Pewter), then expand per story-graph quest order.

## Phase discipline

- Complete minimum proof before advancing `active_phase` in phase-index.yaml
- Update `.buildprint/story-progress.json` every session
- Lower claim in HANDOVER if any hard gate fails
- Edits alone, placeholder screens, mocked data, functionless buttons, raw JSON viewers, and decorative menus do not prove product progress; do not fake live success.
- Before final completion, require `99-critical-review-pushback` in `03-phases/critical-review-pushback.md`. Final mandatory phase: if the rubric does not pass, fix real ad hoc flaws and rerun proof instead of claiming done.

## UI identity verification gate

Completion is blocked by:

- missing local UI identity
- missing local design system
- missing UI evidence binder
- missing `.buildprint/ui-evidence.md`
- missing `docs/DESIGN.md`
- no action stronger than "type and send"
- missing screenshot evidence

Run or document:

```bash
agb verify ui .
```

The UI evidence must prove title, overworld, battle, party, bag, dialogue, shop, faint, victory, desktop, and 375px mobile/narrow states.

## Repair routing

- If hard-stop decisions are missing, return to `00-questions.md`.
- If setup, architecture, stack, harness, or project structure is weak, return to `01-project-setup.md`.
- If UI identity, design tokens, screenshots, or action surface is weak, return to `02-ui-identity.md`.
- If a phase cannot honestly pass, keep the active phase unchanged and record blocker/next repair.
