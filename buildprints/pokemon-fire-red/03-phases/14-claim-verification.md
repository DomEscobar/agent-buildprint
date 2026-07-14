# Phase 14 — Claim Verification

## How to implement this phase

Compute highest honest product claim from evidence artifacts. No self-certification without proof.



Standard phase context: before editing, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, `AGENTS.md`, `02-ui-identity.md`, `docs/DESIGN.md`, and the current proof artifacts. If any file is missing, record the blocker and continue only when the phase can still make a real verified improvement.

Use the active phase loop: choose the smallest real vertical user/operator path, predict 3-7 likely failure modes, write a proof plan, implement, inspect runtime behavior, repair one concrete weakness, then state the claim ceiling.

Placeholders, functionless buttons, mocked/sample data, raw JSON as the user surface, decorative menus, and fake live success are forbidden. If the phase cannot produce real game behavior or real validator proof, lower the claim and leave the active phase unchanged.

## Building objective

Produce `.buildprint/claim-gates.json` and finalize `.buildprint/playthrough-receipt.md`.

### claim-gates.json schema

```json
{
  "computed_at": "ISO8601",
  "highest_honest_claim": "postgame_sevii | kanto_complete | ...",
  "gates": {
    "data_pipeline": { "status": "pass|fail|blocked", "evidence": "path" },
    "overworld_core": { "status": "...", "evidence": "..." },
    "battle_core": { "status": "...", "evidence": "..." },
    "vertical_slice": { "status": "pass|fail|blocked", "evidence": ".buildprint/sprite-audit.json" },
    "world_complete": { "status": "pass|fail|blocked", "evidence": ".buildprint/world-proof.json" },
    "progression_core": { "status": "...", "evidence": "..." },
    "kanto_complete": { "status": "...", "evidence": ".buildprint/evidence-playthrough-kanto.md" },
    "postgame_sevii": { "status": "...", "evidence": "..." },
    "release_polish": { "status": "...", "evidence": "..." }
  },
  "blockers": [],
  "not_proven": []
}
```

### claim-gates.json schema

```json
{
  "computed_at": "ISO8601",
  "highest_honest_claim": "postgame_sevii | kanto_complete | ...",
  "story_validation": {
    "maps_kanto": "88/88",
    "maps_sevii": "18/18",
    "quests_kanto": "25/25",
    "quests_sevii": "9/9",
    "rival_battles": "8/8"
  },
  "gates": { "...": "..." }
}
```

### Verification commands (required)

```bash
npm run typecheck
npm run test
npm run data:validate
npm run maps:validate
npm run maps:render-proof
npm run world:traverse-proof
npm run world:proof:verify
npm run assets:validate
npm run story:validate
npm run story:lint
npm run build
```

### Playthrough proof (kanto_complete)

Fresh new game playthrough log (human or scripted):

1. Starter choice
2. Badge 1 Brock
3. Badge 2 Misty (checkpoint)
4. ... or honest partial with lowered claim
5. Champion Hall of Fame

Each step: timestamp, map id, screenshot path, persisted save hash, and browser-trace reference. Screenshots are mandatory at every named checkpoint and must be bound to the current build by `references/world-verification.md`.

### Playthrough proof (postgame_sevii)

Champion + boat + One Island + National Dex event.

### Downgrade rules

Lower claim if:

- Any gym unwinnable without debug
- Save corruption on reload
- Missing maps cause story softlock
- Battle formula tests fail
- Ripped ROM assets found in repo
- **sprite-audit.json fails or CP-VS not pass** — max claim is `overworld_core` or `data_pipeline` depending on what is proven
- **Placeholder art on screen** for Pokémon or world despite battle logic passing
- missing, stale, or failing `.buildprint/world-proof.json`; without full current renders, trace-backed traversal, and independent visual review, `kanto_complete` and `postgame_sevii` are forbidden
- repeated/empty map renders, unresolved similarity findings, or debug-teleport-only checkpoint evidence

## DO NOT

- Do not set `highest_honest_claim: postgame_sevii` without CP-F evidence
- Do not omit failing tests from receipt
- Do not claim "perfect" — use honest claim labels only
- Do not accept hand-authored proof JSON, screenshots without TMX/save/trace binding, or a reviewer-selected showcase subset as full-world proof

## Minimum proof before moving on

- claim-gates.json committed to `.buildprint/`
- HANDOVER.md claim matches claim-gates.json
- All test commands recorded

## Handoff note

Final claim, blockers, recommended next agent actions.
