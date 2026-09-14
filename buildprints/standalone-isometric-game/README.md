# Full Standalone Isometric Game

A complete local authoring packet for an original game built with DomEscobar/isometric-framework. Full means the approved game scope, not the framework demo and not a vertical-slice cap. Completely separate from `guided-2d-game`; no dependency on or modifications to that packet.

**Current distribution:** npm `agent-buildprint@0.1.0` is not published; the registry currently exposes only `0.0.17`, which lacks v2. The `v0.1.0` source tag contains the initial v2 runtime and this packet, while current source also contains the later production-gate and measured-geometry policy. Use one fresh current-source checkout with its matching CLI and packet. Commit `a7b712b` is historical and is not the recommended checkout. Website deployment checks are not full runtime regressions, scaffold proof or game/visual acceptance.

## Install and start

The supported v2 route currently uses source. `start` creates `.buildprint` state only; it does not scaffold the framework host or change existing snapshots. Existing snapshots do not acquire newer source policy automatically.

## Start here

1. Read the local packet's `BUILDPRINT.md` and `00-goal.md`, then only the applicable `instructions.phaseReadOrder` entry. Direct reading supports alignment/planning without executing a CLI or fabricating state.
2. Preserve one approved `PROJECT_CONTRACT.md`; ask at most three independently answerable unresolved decisions per batch, with reversible defaults. Loading a packet never authorizes paid generation, uploads, publishing or deployment.
3. From a parent workspace, create one fresh source checkout beside the already scaffolded game host. Use that checkout for both CLI and packet, record its exact revision, and keep it unchanged for the run. Node >=22.18.0 satisfies the framework requirement.

```sh
git clone https://github.com/DomEscobar/agent-buildprint.git agb-runtime-v2
git -C agb-runtime-v2 rev-parse HEAD
# Keep agb-runtime-v2 at that recorded HEAD while using its CLI and packet below.
node agb-runtime-v2/bin/agb.js start agb-runtime-v2/buildprints/standalone-isometric-game/package.json ./my-isometric-game
node agb-runtime-v2/bin/agb.js state status ./my-isometric-game
node agb-runtime-v2/bin/agb.js loop next ./my-isometric-game
```

These commands create packet state, **not a game scaffold**. For a real game, scaffold first into a new/empty/contract-only destination following `01-setup.md`, then start the packet in that host. Preserve any approved contract and existing state. Do not install public `0.0.17` as a substitute.

## Framework setup is a real local build

Framework pin: [53cf6b17eabbb2ed146e31111864d6812e3d755b](https://github.com/DomEscobar/isometric-framework/tree/53cf6b17eabbb2ed146e31111864d6812e3d755b). This revision makes text-to-image a first-class independent production technique and keeps image-to-image optional. No npm framework package or prebuilt archive is supplied. In a separate clean pinned framework checkout, the upstream `docs/CREATE_GAME.md` path is `npm ci`, `npm run build:package`, then `node scripts/create-game.mjs <destination>`. Replace the destination with an actual unused/approved contract-only path. The local package build includes boundary/type checks; run these routine prerequisites when implementation is authorized unless an explicit restriction prohibits them. Follow the generated host README for installation/dev/build. No demo clone, fake tarball or invented archive digest is acceptable.

The source CLI also implements `bootstrap` with explicit `--allow-scaffold`, pinned `--framework`, a real `--archive` and separately verified `--archive-sha256`. It copies templates/archive but does not build, install, capture or verify game quality. See `01-setup.md` and `references/cli-integration.md` for preservation/recovery limitations. Never fabricate an archive or provenance to make this adapter run.

## Hosted bytes and continuation

The [hosted outer descriptor](https://agent-buildprint.com/buildprints/standalone-isometric-game/package.json) and its [canonical phase-read-order manifest](https://agent-buildprint.com/buildprints/standalone-isometric-game/files/package.json) are separate website artifacts. The [manifest sidecar](https://agent-buildprint.com/buildprints/standalone-isometric-game/package.sha256) identifies generated JSON bytes; a digest from the same site is not an independent trusted channel, publisher signature or game-quality evidence.

Remote v2 `start` additionally requires `--manifest-sha256` from a separately trusted source. Do not invent a digest or treat the sidecar as independent provenance. The bundled local-manifest command above does not make a network fetch. Resume requires the exact original manifest and payload identity, with `start --resume`; changed sources need an explicit migration decision.

When using CLI state, read `.buildprint/next-agent.md`, the matching CLI's `docs/cli-runtime-v2.md`, and the active loop. Approvals, begin/accept/advance, returns/defects and candidate-bound evidence are explicit. `implemented_attested`, `functional_attested` and `visual_attested` are recorded claims—not authenticated execution, reviewer independence, pixels, motion or gameplay. Candidate verification is documented in the runtime guide; it does not establish game acceptance. Missing game evidence cannot be accepted.

## Package map
- `BUILDPRINT.md`, `00-goal.md`, `01-setup.md`, `02-identity.md`: briefing, alignment, safe scaffold/bootstrap, mobile-first UX.
- `blueprint.yaml`, `loops/loop-index.yaml`, `loops/loop-flow.md`, `runtime.json`: supported kernel routes, versioned approval/evidence prerequisites and six full-game loops.
- `framework-lock.json`, `references/framework.md`: exact upstream pin, verified provenance and skill catalog links.
- `references/assets.md`, `references/visual-acceptance.md`: preferred asset policy and substantive reuse of upstream v3 visual acceptance.
- `references/cli-integration.md`: current supported manifest/CLI behavior and real gaps.
- `templates/`: contract, UX outline, setup receipt, acceptance-plan routing, asset provenance, generation ledger, measured-geometry review and capture receipt.
- `review.md`, `HANDOVER.md`: authorized future acceptance and honest delivery.
- `package.json`: explicit local snapshot file manifest for source-based v2 `start`; it may be bundled by a future npm publication only after that publication is verified.
- `publication.json`: existing publication metadata format with `publish: true` for website publication only.
- `AUTHORING_REPORT.md`: local scope, static inspection evidence, gaps and untested status.

Skills are linked at the exact framework commit and later read from its installed package; none are copied or authored here. Framework production receipts remain the detailed live quality evidence; CLI state owns routing and byte-bound attestation references, not an alternate quality workflow. Package templates are not game requirements or evidence until populated for an actual approved project.
