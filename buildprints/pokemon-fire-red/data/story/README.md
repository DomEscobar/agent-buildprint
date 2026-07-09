# Story Contract — Applying Agent Guide

These files are **authoritative** for story completeness. Engine phases build systems; **story phases must satisfy this contract**.

## Files

| File | Purpose |
|---|---|
| `story-graph.yaml` | Quest order, flags, scripts, trainers, items — main story |
| `map-manifest.yaml` | Every required map id per claim (82 Kanto + 18 Sevii) |
| `rival-progression.yaml` | All 8 Rival battles with party scaling rules |
| `sevii-quest-chain.yaml` | Full postgame arc (islands 1-7, Network Machine) |

## Validation commands (implement in setup)

```bash
npm run maps:validate    # all manifest maps exist + load
npm run story:validate   # story-progress.json matches graph
npm run story:lint       # no orphan flags, no circular deps
```

## Progress tracking

Applying agent maintains `.buildprint/story-progress.json`:

```json
{
  "quests": {
    "quest_oaks_parcel": { "status": "complete", "evidence": "playthrough-log.md#parcel" },
    "quest_safari_zone": { "status": "blocked", "reason": "Safari minigame not implemented" }
  },
  "maps_loaded": 82,
  "maps_required": 82,
  "claim_ceiling": "progression_core"
}
```

## Claim rules

| Claim | Requirement |
|---|---|
| `kanto_complete` | 100% kanto quests complete + 100% kanto maps + CP-E |
| `postgame_sevii` | 100% sevii quests + all postgame maps + CP-SeviiComplete |

**No percentage shortcuts.** Phase 10 previously allowed 50% maps — **revoked**.

## Read order addition

After `blueprint.yaml`, read all four YAML files in this folder before phase 06.
