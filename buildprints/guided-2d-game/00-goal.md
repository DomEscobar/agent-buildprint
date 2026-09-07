# Guided 2D Game / vertical slice

## Goal
Guide a person from an idea to a bounded, original 2D pixel-game vertical slice: a playable core loop, coherent art and motion, a traversable scene, and honest release evidence. This packet is the reusable build instruction, not an already built game. Do not default to a full commercial-scale game or copy a reference game's characters, maps, audio, or IP.

## Guided intake
Ask **one decision at a time**, acknowledge the answer, suggest a concrete default with a short tradeoff, and ask the next unresolved question. Reuse answers already supplied; skip irrelevant branches. Never dump this sequence as a survey. `templates/slice-agreement.md` captures the result, not another questionnaire.

1. “What should playing feel like, and which genre or one or two references show it?” Separate useful mechanics, mood, camera, and visual grammar from protected expression. For a genre blend, identify the primary loop first.
2. “What does the player do repeatedly, and what counts as success or failure?” Offer a 2–5 minute slice as a negotiable demonstration length, not a delivery promise. For relaxing play, a completed objective plus undo/restart can replace death.
3. “Which devices and controls must this first slice support?” Clarify desktop keyboard/gamepad, touch/mobile orientations, native or browser. Explicitly mark excluded devices unproven.
4. “Is this solo, local co-op, or online multiplayer?” Explain that online play adds authority, latency, reconnect, synchronization, abuse and hosting tests; never silently downgrade it or bolt it on at the end.
5. “Which art/audio assets do you own or have licensed, and which may be created?” Check files and licenses before proposing generation. Ask permission before uploading private reference images. Explain the preferred **WaveSpeed + (RetroDiffusion OR Media4Agents)** Asset-Maker stack and its access-dependent quality contract in `references/providers-and-sources.md`; do not promise it before verification or silently substitute lower-quality graphics.
6. “What spending ceiling and production time constraints should govern this slice?” Start with **no paid generation** unless approved. Include provider attempts, edits, failed outputs, storage/hosting and review time in planning; never invent a fixed cost, guaranteed output quality, or free credit entitlement.
7. Summarize one bounded proposal: included scene(s), actors, actions, states, devices, assets, test targets, exclusions, and backlog. Ask for agreement before setup. If uncertainty remains, negotiate the smallest experiment that answers it.

### Large-vision intervention
For “Stardew-sized” farming/life sims or similar visions, explain: farming, seasons, NPC schedules, dialogue, economy, inventory, crafting, saving and multiplayer interact. Content and state combinations multiply testing and balancing; generated assets still need selection, cleanup, animation and runtime review. A cheap image is not a cheap finished game. Offer, for example, **one garden, one crop, one day, one sell action**; defer seasons, relationships, crafting and online play. This is a proposed reduction, not permission to shrink the user's goal silently. Keep accepted exclusions and future backlog visible. Re-estimate from measured prototype work and live provider quotes, with uncertainty, before expanding.

## Hard-stop questions
Stop before `01-setup.md` when any applicable decision below lacks confirmation. Record `confirmed_by: user` or `confirmed_by: explicit_user_delegation` with the delegated boundary in `.buildprint/decisions.md`; `agent_assumption` is invalid for hard-stop decisions.

- **Product/artifact identity:** agreed genre, core loop, bounded slice, exclusions and solo/multiplayer scope.
- **Deployment posture:** trusted_local first unless the user approves private_demo or public_web; specify intended devices.
- **Secrets and provider policy:** no-spend/local-assets-only or approved provider, budget cap, upload rights, protected setup and retry policy. No key values in chat or repository.
- **Destructive/data-loss behavior:** whether save replacement/migration is allowed; default to no destruction, but ask before any destructive change.
- **Privacy/compliance exposure:** public hosting, telemetry, player identity, child-oriented features, private references, account services or multiplayer data require a stated policy; explicitly record not applicable when absent.

## Assumable defaults
Offer reversible defaults: one scene, one controllable character, one mechanic, local static assets, nearest-neighbor rendering, no telemetry, no accounts, no monetization. Decide palette/base resolution during identity convergence. Use maintained engine/library paths rather than inventing an engine. Defaults never answer hard stops without delegated authority.

## Deferrable questions
World lore, a full cast, progression trees, extra biomes, store launch, online ranking, achievements and future content packs belong to backlog unless necessary for the agreed core.

## Acceptance criteria
- Agreement states numerical content bounds and exact win/failure/restart or objective/undo behavior; player input completes the actual loop.
- Graybox feel and an in-game art/animation seed are approved **before** content scaling; a readable identity persists across assets, tiles, HUD and motion.
- Loaded production manifests pass asset and scene contracts, including negative cases; manual and generated placement use the same validator.
- Runtime proves movement across frame rates, collisions, multiple directions/camera positions, target desktop/mobile input and animation recordings. Screenshots or a loaded page alone cannot pass.
- Asset-Maker access evidence or explicit quality limitation and free-only fallback decision are recorded; custom SVG is last resort, not equivalent quality, and fallback art passes the same visual QA.
- Rights/provenance and spend recovery are recorded without secrets; milestone evidence binds immutable code, manifest and asset hashes.
- Independent reviewer qualifies only the proven slice. Public HTTP/MIME/assets, browser interaction and WSS multiplayer proof are separate when applicable. Handover names rollback and limits.
