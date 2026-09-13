# Full Standalone Isometric Game

A complete local authoring packet for an original game built with DomEscobar/isometric-framework. Full means the approved game scope, not the framework demo and not a vertical-slice cap. Completely separate from `guided-2d-game`; no dependency on or modifications to that packet.

**Status: published packet and versioned source CLI; npm v2 unreleased.** The complete source is available at [commit 35f2623](https://github.com/DomEscobar/agent-buildprint/tree/35f2623b0d72a1b09d39c1a7f14a0eaf6bf4a409). Public `agent-buildprint@0.0.17` does not contain v2. Website deployment checks are not full runtime regressions, scaffold proof or game/visual acceptance.

## Start here

1. Read the [agent guide](https://agent-buildprint.com/buildprints/standalone-isometric-game/agent.md) and [manifest](https://agent-buildprint.com/buildprints/standalone-isometric-game/package.json), starting with `BUILDPRINT.md` and `00-goal.md`, then `instructions.readOrder`. Direct reading supports alignment/planning without executing a CLI or fabricating state.
2. Preserve one approved `PROJECT_CONTRACT.md`; ask at most three unresolved consequential questions per batch. No game execution, tests, paid generation or deployment is authorized merely by loading this packet.
3. For automated packet state, use the exact source checkout below—not installed public `agb` or `npx`. Node >=22.18.0 satisfies the framework requirement. Clone into a **new** directory; never switch/reset an existing dirty checkout.

```sh
git clone https://github.com/DomEscobar/agent-buildprint.git agb-runtime-v2
git -C agb-runtime-v2 checkout --detach 35f2623b0d72a1b09d39c1a7f14a0eaf6bf4a409
# Local packet from this exact source revision; no remote-manifest trust shortcut.
node agb-runtime-v2/bin/agb.js start agb-runtime-v2/buildprints/standalone-isometric-game/package.json ./my-isometric-game
node agb-runtime-v2/bin/agb.js state status ./my-isometric-game
node agb-runtime-v2/bin/agb.js loop next ./my-isometric-game
```

The CLI has no npm dependencies; these source invocations do not need a global install. `start` creates packet state, **not a game scaffold**. For a real game, scaffold first into a new/empty/contract-only destination following `01-setup.md`, then start the packet in that host. Preserve any approved contract and existing state. The pinned CLI checkout contains the authored local packet; the current hosted packet additionally carries updated publication/source-install guidance without weakening acceptance.

## Framework setup is a real local build

Framework pin: [7542ff68de04ca6ea6736974b54ec5b5dde1cc33](https://github.com/DomEscobar/isometric-framework/tree/7542ff68de04ca6ea6736974b54ec5b5dde1cc33). No npm framework package or prebuilt archive is supplied. In a separate clean pinned framework checkout, the upstream `docs/CREATE_GAME.md` path is `npm ci`, `npm run build:package`, then `node scripts/create-game.mjs <destination>`. Replace the destination with an actual unused/approved contract-only path. The local package build includes boundary/type checks and requires separate authorization. Follow the generated host README for installation/dev/build. No demo clone, fake tarball or invented archive digest is acceptable.

The source CLI also implements `bootstrap` with explicit `--allow-scaffold`, pinned `--framework`, a real `--archive` and separately verified `--archive-sha256`. It copies templates/archive but does not build, install, capture or verify game quality. See `01-setup.md` and `references/cli-integration.md` for preservation/recovery limitations. Never fabricate an archive or provenance to make this adapter run.

## Hosted bytes and continuation

The [remote manifest](https://agent-buildprint.com/buildprints/standalone-isometric-game/package.json) includes real same-origin payload SHA-256 values and the original v2 runtime descriptor/read order. The [manifest sidecar](https://agent-buildprint.com/buildprints/standalone-isometric-game/package.sha256) identifies the exact generated JSON bytes; `files/package.json` is the distinct local loader manifest payload. A digest from the same site is not an independent trusted channel, publisher signature or game-quality evidence.

Remote source-CLI `start` additionally requires `--manifest-sha256` from a separately trusted source. Do not invent a digest or treat the sidecar as independent provenance. The pinned local-manifest command above avoids that remote trust requirement. Resume requires the exact original manifest and payload identity, with `start --resume`; changed sources need an explicit migration decision.

Read `.buildprint/next-agent.md`, source `docs/cli-runtime-v2.md` and the active loop. Approvals, begin/accept/advance, returns/defects and candidate-bound evidence are explicit. `implemented_attested`, `functional_attested` and `visual_attested` are recorded claims—not authenticated execution, reviewer independence, pixels, motion or gameplay. Full runtime regressions and pinned-framework scaffold execution remain unverified unless separately reported from actual authorized runs. Missing evidence cannot be accepted.

## Package map
- `BUILDPRINT.md`, `00-goal.md`, `01-setup.md`, `02-identity.md`: briefing, alignment, safe scaffold/bootstrap, mobile-first UX.
- `blueprint.yaml`, `loops/loop-index.yaml`, `loops/loop-flow.md`, `runtime.json`: supported kernel routes, versioned approval/evidence prerequisites and six full-game loops.
- `framework-lock.json`, `references/framework.md`: exact upstream pin, verified provenance and skill catalog links.
- `references/assets.md`, `references/visual-acceptance.md`: preferred asset policy and substantive reuse of upstream v3 visual acceptance.
- `references/cli-integration.md`: current supported manifest/CLI behavior and real gaps.
- `templates/`: contract, UX outline, setup receipt, acceptance-plan routing, asset provenance, generation ledger and capture receipt.
- `review.md`, `HANDOVER.md`: authorized future acceptance and honest delivery.
- `package.json`: explicit local snapshot file manifest for source v2 `start`, not public npm `agb`.
- `publication.json`: existing publication metadata format with `publish: true` for website publication only.
- `AUTHORING_REPORT.md`: local scope, static inspection evidence, gaps and untested status.

Skills are linked at the exact framework commit and later read from its installed package; none are copied or authored here. Framework production receipts remain the detailed live quality evidence; CLI state owns routing and byte-bound attestation references, not an alternate quality workflow. Package templates are not game requirements or evidence until populated for an actual approved project.
