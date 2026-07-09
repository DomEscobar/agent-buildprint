# Phase 08 — Items, Bag, Shops, HMs

## How to implement this phase

Item effect registry, bag pockets, mart purchase, field HM usage gates.

## Building objective

Items work in battle and field; money and shops function; HMs require badges.

### Bag pockets (FRLG)

- Items, Key Items, Poké Balls, TMs/HMs
- Sorting optional; stack limits per item definition

### Item effect handlers

Registry pattern: `itemId → handler(context)`

Minimum items:

- Potion, Super Potion, Antidote, Parlyz Heal, Awakening
- Poké Ball, Great Ball
- HM01–HM05 as listed above
- Key: Town Map, Pokédex, Bike, Oak's Parcel, Tea, Silph Scope, Poké Flute, SS Anne Ticket, Gold Teeth, Ruby, Sapphire (postgame)

### Shops

- Mart UI: buy/sell lists per shop id
- Pewter/Viridian/Cerulean marts with tiered stock
- Sell price = half buy price

### HM field moves (all required for kanto_complete — see story-graph.yaml)

- **HM01 Cut** — cut trees (Route 9/10, Route 2 tree, etc.) after Boulder badge
- **HM02 Fly** — fly menu to visited Pokémon Centers (implement menu stub here; full UI in phase 13)
- **HM03 Surf** — water tiles after Soul badge + from Safari Zone quest (no gift shortcut)
- **HM04 Strength** — boulders in dungeons after Warden's Gold Teeth returned
- **HM05 Flash** — illuminate Rock Tunnel and dark caves
- **HM06 Rock Smash** — optional breakable rocks (FRLG optional areas)
- **HM07 Waterfall** — Sevii postgame (phase 12)

### Save system (required this phase — not deferred to phase 13)

Whole-story playtesting requires save from mid-game onward:

- 3 save slots in IndexedDB (minimal UI: Save from Start menu stub OK)
- Serialize full `GameState` including flags, badges, party, bag, map position
- Schema version + checksum
- **Proof:** save after Brock badge, reload browser, CONTINUE restores badge + position

Phase 13 expands save UI (export/import, slot selection polish) — core persistence **must work here**.

### Badge gates

`badges` bitmask in GameState; HM handler checks bit

## DO NOT

- Do not grant Cut without Brock badge
- Do not infinite money without debug flag
- Do not skip bag full error handling

## Minimum proof before moving on

- CP-C: use Potion in battle; buy Poké Ball at Viridian Mart
- Save/load: new game → earn 1 badge → save → reload → badge persists
- Cut tree on Route 2 after Brock (when map exists)
- `.buildprint/evidence-phase-08.md`

## Handoff note

Item registry file, shop data location, HM/badge check module.
