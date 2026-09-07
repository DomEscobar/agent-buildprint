# Guided 2D Game / vertical slice

A guided **product Buildprint**, not a game, engine, skill or asset-generation plugin. It turns a broad idea into an agreed small original pixel game and provides operational art, animation, world and release contracts. Brawler guidance is detailed; platformer, farming and puzzle branches adapt the same spine.

Start at `BUILDPRINT.md`. Intake asks sequential questions, then the builder proves a graybox and in-game art direction **before scaling content**. Default spend is zero. Multiplayer and public hosting are explicit scope decisions, not implied features.

## Packet map
- `00-goal.md`: guided intake, large-vision warning, exclusions and decisions.
- `01-setup.md`, `02-identity.md`: existing-tool/license preflight and readable pixel identity.
- `loops/`: five kernel loops from graybox to frozen release review.
- `references/`: genre, animation, world/tiles, provider recovery and operational QA.
- `templates/`: compact agreements, asset requests, money recovery and milestone handover evidence.
- `validation/`: original dependency-free Node/browser contract module, PNG decoder, loader adapter, fixture manifest and negative tests. This is a bounded starter validator, not a universal collision engine.

## Check this repository packet
From the repository root, Node.js 20+:

```sh
node bin/agb.js packet check buildprints/guided-2d-game
npm run check:guided-2d-game
```

The second command also decodes the fixture PNG, validates the **loaded** manifest and runs negative tests. See `validation/README.md` for runtime integration and coverage limits. Do not treat synthetic fixture art as approved game art or fixture tests as a playthrough.

## Start from the published packet

Use the latest repository CLI until a release includes byte-exact binary snapshot downloading; older installed AGB versions can corrupt the bundled PNG fixture. No global install is needed:

```sh
git clone https://github.com/DomEscobar/agent-buildprint
node agent-buildprint/bin/agb.js start https://agent-buildprint.com/buildprints/guided-2d-game/package.json my-game
```

Then give `my-game/.buildprint/next-agent.md` to the builder. The repository's `check:guided-2d-game` also bootstraps this actual packet, compares all 33 snapshot files byte-for-byte, and validates the downloaded PNG.

## Claim ceiling
No game was built, no paid generation performed, no provider plugin installed and no browser/game deployment certified by this packet. Public provider docs were inspected on 2026-09-07; volatile catalogs and protected setup must be rechecked before use. media4agents' public API details could not be verified; that route is conditional. Independent runtime review is required before qualifying an applied game. No third-party scripts or proprietary game assets are bundled.
