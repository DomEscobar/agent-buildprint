# Pinned framework and skill routing

Repository: https://github.com/DomEscobar/isometric-framework

Commit: `53cf6b17eabbb2ed146e31111864d6812e3d755b` — “docs: make text-to-image a first-class art route” (2026-09-14).

Verified on 2026-09-14 by clean local checkout HEAD, origin/main and `git ls-remote` returning this exact SHA. The package build, packed starter checks, fresh consumer install/check/build, desktop keyboard journey and real touch journey passed. This proves source identity and bounded starter behavior; it is not a signature, generated-art, finished-game or visual-quality claim.

The framework checkout was read only. Pin updates require inspecting guides/APIs/skills and reconciling this packet, never floating to main. See `framework-lock.json` for machine-readable provenance (enforced for committed templates by the fixed `agb bootstrap` adapter; plain `agb start` only snapshots it; archive provenance remains separately required).

## Source guides
- [New-game guide](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/CREATE_GAME.md)
- [Skill catalog](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/README.md)
- [Runtime API](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/RUNTIME_API.md)
- [Art pipeline](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/ART_PIPELINE.md)
- [Interactions](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/INTERACTIONS.md)
- [Inventory and saves](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/INVENTORY_AND_SAVES.md)
- [Debugging](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/DEBUGGING.md)
- [Autotiling](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/docs/AUTOTILING.md)

## Skill catalog selection
Read the installed catalog first, then only applicable skills/recipes. All seven upstream entry points were inspected for packet authoring; executing them is future game work. In a scaffolded host, paths are under `node_modules/isometric-framework/skills/`; the installed tarball must be proven to come from this commit. For manual work without CLI state, the same pinned source checkout can supply these readings. Automated loops require the catalog and required skills at the project-local `skillRoot` declared in `runtime.json`; reading an external checkout cannot clear that availability gate. Complete the host dependency installation before beginning those loops. No global installation or copied SKILL.md is needed.

- [isometric-visual-loop](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/SKILL.md): Complete world; owns contract translation, preflight/layout/assembly/static/motion/final, packed inspection, comparison and receipts.
- [isometric-art-integration](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-art-integration/SKILL.md): New art: shared projection, rigid contacts, actor/prop scale and object-ground assemblies. Do not use shadows to hide unsupported land.
- [game-asset-generation](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/game-asset-generation/SKILL.md): Only new raster generation/removal: approved technique, provider capability, alpha, exact requests and local provenance. The chosen project technique determines whether any provider example applies.
- [directional-sprite-authoring](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/directional-sprite-authoring/SKILL.md): Required facings/actions: visible direction and identity, stable roots, measured crops and actual packed playback. Filenames and mirrored asymmetry do not prove facing.
- [animated-environments](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/animated-environments/SKILL.md): Scenery motion: fixed bases/moving overlays, joined water, wrap and pause in simulation. No invented tile-animation or phase-seek API.
- [multi-tile-asset-assembly](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/multi-tile-asset-assembly/SKILL.md): Buildings/bridges/passages: solid vs supported floor vs opening, measured contacts, depth and real approach/landing views. Sprite bounds are not colliders.
- [consistent-tileset-authoring](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/consistent-tileset-authoring/SKILL.md): Connected materials: landscape composition and ground-only review first; modular masks or composed ground per chosen technique, never compulsory 47-mask terrain.

Read these visual-loop references together when translating the full game contract:
- [production-brief.md](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/production-brief.md)
- [acceptance.md](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/acceptance.md)
- [production-flow.md](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/production-flow.md)
- [visual-comparison.md](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/visual-comparison.md)
- [acceptance-plan.example.json](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/acceptance-plan.example.json)
- [spatial-layout.example.json](https://github.com/DomEscobar/isometric-framework/blob/53cf6b17eabbb2ed146e31111864d6812e3d755b/skills/isometric-visual-loop/references/spatial-layout.example.json)

Choose technique before provider: supplied/authored pack, text-to-image foundation, image-to-image adaptation, modular terrain, composed ground with separate actors/props, layered scene artwork, or a hybrid by asset family. Text-to-image can produce directly usable, sliced or layered art without an image-to-image pass. Once a generated candidate is approved, it becomes the shared visual authority for later families. Composed ground does not require a generic tileset; supplied art does not require paid generation. Skill examples supply measurements/methods, not game art or visual identity. Historical trials are framework evaluation, not mandatory game production.

## Public API boundary
Use only `isometric-framework`, `isometric-framework/core`, `isometric-framework/art` package exports for game implementation. Keep maps, rules, UI, inventory/rewards and custom effects in the standalone host. Do not patch framework src/templates/scaffold or copy demo/examples. Verify installed declarations before using any additional field.

At this pin: `createRuntime`, public Scene/AssetManifest, `project`, movement/camera/picking, `createDpad`/`createJoystick`, `createInteractions`, `createInventory` and `createSaveSlot` are available. Map indexing is `map[r][c]`; cell identity includes level. Public projection increases columns upper-right and rows lower-right. Scene v2 supports sparse stacked floors and explicit links, not full 3D physics. Automatic actor states are idle/walk/jump; host action timing owns custom overrides via `setAnimation`.

Current constraints: entity colliders are grid rectangles/solid heights, not arbitrary polygon/hollow-collider fields; animated water uses nonblocking named sprite clips, not a fictional animated terrain field; there is no public animation phase-seek. External atlas rotation/automatic trim recovery, a full editor, multiplayer/auth and application-specific UI are not supplied. Preserve requested features and report a genuine integration gap instead of pretending support or silently excluding them. Reuse an existing maintained solution where needed; custom framework changes require a separately justified scope decision.

Authoring tools use Node >=22.18.0; the visual acceptance tool requires Python >=3.10 and Pillow for decoded media. Runtime dependencies are exactly those in the pinned framework/host manifests; authoring capture dependencies are not automatically host runtime dependencies. A missing capture environment is unverified acceptance, not a reason to invent a browser command.
