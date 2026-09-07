# Minimal foundation

Before loop work, read host `AGENTS.md`, inspect checkout/remote/status and preserve unrelated edits. Read `.buildprint/decisions.md`; unresolved hard-stop decisions return to `00-goal.md`.

## Existing-solution preflight
Inspect the target engine and installed libraries first. Compare a small number of maintained, license-compatible options against the agreed devices and mechanics. Use `references/providers-and-sources.md` as dated starting evidence, then verify current official versions/docs. Browser-first 2D fits Phaser; native/editor-first may fit Godot; an established target project normally wins over migration. Consider Tiled for map authoring and a licensed asset pack before custom map editors or paid images. Inspect the **specific pack license**, attribution and redistribution rights; “free download” is not a license. Record choice, rejected alternatives, license, version and reason in `docs/architecture.md`. No benchmark evidence is supplied by this packet.

Route `proven_implementation_requirements` into architecture: renderer, input, physics, map loading, audio and test runner. Do not hand-roll these merely to avoid reading engine docs. Custom logic is appropriate for the small game-specific rules and contracts, with tests.

## Asset-Maker preflight
Apply `references/providers-and-sources.md#asset-maker-quality-contract`: verify actual access/availability for WaveSpeed image editing `bytedance/seedream-v5.0-pro/edit` (Seedream) **and** background removal `bria/remove-background`, plus the chosen RetroDiffusion or Media4Agents companion, before promising the preferred workflow. Record dated capability/access evidence and gaps in `.buildprint/setup-receipt.md`; obtain approval before any paid usage. Missing access requires explicit quality-limit disclosure and only free solutions or suitably licensed free assets; custom SVG is last resort, never equivalent quality. Carry the fallback decision into the agreement and preserve the same visual QA gates.

## Project-local harness
Use existing `.agents/skills` and `agb harness check .`. Where the user permits initializing a missing Buildprint-native local harness, use `agb harness init .`; otherwise record a missing-harness blocker. No global configuration changes, third-party plugin installation, or skill publication. Follow `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation` only for independent fan-out, and `verify-and-review` for proof and review; respect completion signals. This repository packet authors no skills.

## Required output
- `docs/architecture.md`: chosen versions, entrypoint, manifest loader, shared validator, input/simulation/render seams, world/tile transform, build/test commands, save/network policy and rejected options.
- `.env.example`: variable **names only** if needed, otherwise state no runtime credentials. Use host-managed masked secret entry and supported secret references; if unavailable, operator configures securely outside the transcript. Never put real secrets in URLs, browser bundles, source, command arguments or logs.
- `.buildprint/setup-receipt.md`: commands actually run, versions, decision references, writable output locations, remaining blockers and harness completion signal.
- One real development boot and production build; lint/typecheck/test commands chosen from the actual stack, not placeholder commands.

Do not start `loops/` until this foundation is real. Configure engine simulation separately from rendering; a fixed step or delta-time contract must survive low/high FPS and background-tab return. Keep source assets private when needed, ship only rights-cleared static derivatives. Use `validation/README.md` to wire the shared validator into the real loader; fixtures are testing material, not game content. No backend is needed for local solo gameplay.
