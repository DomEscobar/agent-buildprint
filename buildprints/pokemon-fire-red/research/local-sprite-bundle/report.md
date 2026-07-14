# DeepResearch Report: Pokemon FireRed local world sprite bundle provenance

## Executive summary

The repository can commit world and character sheets without bundling Pokemon graphics. The selected combination is Kenney RPG Urban Pack for the 16x16 landscape/world atlas and Corey Archer's OpenGameArt sheet for player/NPC walk cycles. Both source pages state CC0.

## Evidence-backed findings

- Kenney's official page describes RPG Urban Pack as a 16x16 CC0 pack with more than 480 files: https://kenney.nl/assets/rpg-urban-pack
- OpenGameArt lists Top Down Pokemon-esque Sprites as CC0 and provides a multi-direction top-down character sheet: https://opengameart.org/content/top-down-pokemon-esque-sprites
- PokeAPI provides the separate versioned Pokemon sprite source; those graphics remain in the PokeAPI ingestion path: https://github.com/PokeAPI/sprites

## Recommendation

Commit the original CC0 downloads, their licenses, normalized runtime sheets, and a hash manifest under `assets/world/`. Copy them into the applying game's `public/assets/` during setup without a network fetch. Keep every Pokemon graphic in the existing PokeAPI pipeline.

## Caveats / blockers

The CC0 world sheets are not exact Nintendo FireRed artwork. They are a legally clearer production base and must not be described as ROM-faithful assets.

## Sources

- https://kenney.nl/assets/rpg-urban-pack
- https://opengameart.org/content/top-down-pokemon-esque-sprites
- https://github.com/PokeAPI/sprites
- https://raw.githubusercontent.com/PokeAPI/sprites/master/LICENCE.txt
