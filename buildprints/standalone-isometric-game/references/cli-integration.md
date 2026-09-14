# Installed CLI integration — versioned opt-in

This package now opts into the implemented `agb/runtime/v2` engine through `package.json` → `runtime.json`. The kernel/v1 spine and loop-index/v1 remain backward-compatible packet structures. `runtime.json` supplies explicit dependency/approval/acceptance routing for the same six loops. The mutable active loop lives in `.buildprint/HEAD.json`'s selected revision, never by editing snapshots.

The historical `AUTHORING_REPORT.md` records its authoring-session checks only. The `v0.1.0` source tag contains initial v2 routing, but npm `agent-buildprint@0.1.0` is not published and public `0.0.17` lacks v2. Commit `a7b712b56c218631821ed1626285035b2c7010cd` introduced the later source production-gate reader, but use a fresh current source checkout with its matching local packet and CLI instead of that historical commit. Record `git rev-parse HEAD` and keep that checkout unchanged for the run. Existing snapshots are not retrofitted.

## Commands that now exist

From a parent workspace containing the already scaffolded game host, create one fresh source checkout for the CLI and local manifest, record its HEAD, and do not drift it during the run. npm `0.1.0` is unavailable and public `0.0.17` has no v2 runtime. Code availability is not full regression, scaffold or game acceptance. If the matching source CLI is unavailable, continue authorized framework implementation and report only the automation blocker without simulating state.
```sh
git clone https://github.com/DomEscobar/agent-buildprint.git agb-runtime-v2
git -C agb-runtime-v2 rev-parse HEAD
node agb-runtime-v2/bin/agb.js start agb-runtime-v2/buildprints/standalone-isometric-game/package.json ./my-isometric-game
node agb-runtime-v2/bin/agb.js start agb-runtime-v2/buildprints/standalone-isometric-game/package.json ./my-isometric-game --resume
node agb-runtime-v2/bin/agb.js bootstrap agb-runtime-v2/buildprints/standalone-isometric-game/package.json /new/game --allow-scaffold --framework /pinned/framework --archive /trusted/isometric-framework-0.1.0.tgz --archive-sha256 <trusted-digest>
node agb-runtime-v2/bin/agb.js state status ./my-isometric-game
node agb-runtime-v2/bin/agb.js loop next ./my-isometric-game
node agb-runtime-v2/bin/agb.js packet next ./my-isometric-game
node agb-runtime-v2/bin/agb.js state approve ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/approval.json
node agb-runtime-v2/bin/agb.js loop begin ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/begin.json
node agb-runtime-v2/bin/agb.js evidence bind ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/build-binding.json
node agb-runtime-v2/bin/agb.js evidence record ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/evidence.json
node agb-runtime-v2/bin/agb.js loop accept ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/accept.json
node agb-runtime-v2/bin/agb.js loop advance ./my-isometric-game --revision <current> --receipt ./my-isometric-game/.game-quality/advance.json
```

`loop defect`, `resolve-defect`, `return`, `resolve-return` use the same revision/receipt arguments. All receipts have `schema: agb/receipt/v2`. The source checkout includes CLI documentation and schemas with exact fields, recovery commands, limits and security boundaries.

## Bootstrap and authority

`start` alone stages and publishes packet state into an existing host (or creates a new project directory); it does not scaffold. `bootstrap` copies the exact committed framework template blobs plus a separately supplied SHA-256-checked opaque archive, then publishes host plus state. It requires explicit copy consent, does not execute manifest/framework shell commands, and does not install/build dependencies or run the upstream script. Existing user files are never merged. Empty/contract-only scaffold targets use a documented two-rename recovery journal and retain the original; this is NOT an atomic directory swap. A new destination or a `.buildprint` insertion uses a single publication rename. State revisions use atomic HEAD replacement with locks and expected revision checks; local POSIX assumptions and race limitations are explicit in the CLI guide.

The framework pin/tree is enforced only by the fixed `bootstrap` adapter. Plain `start` just snapshots the lock. Archive hash matching establishes byte identity, not publisher authentication or provenance from that source. Missing trusted archive blocks that adapter; do not fabricate one. Run upstream `build:package` as part of authorized implementation unless an explicit restriction prohibits its included checks.

Remote manifests use bounded credential-free HTTPS, no redirects, same-origin payloads and versioned manifest/file digests. Local v2 strings resolve beside the manifest. The website's outer package descriptor is https://agent-buildprint.com/buildprints/standalone-isometric-game/package.json; its canonical phase-read-order manifest is https://agent-buildprint.com/buildprints/standalone-isometric-game/files/package.json. The sidecar establishes byte identity, not a separately trusted manifest channel. Npm publication packages a local manifest but does not itself refresh website bytes. Old manifests without runtime opt-in retain legacy state shapes and packet operations; existing state is never overwritten or silently migrated. `--resume` validates the existing v2 snapshot and same source inventory, not a refresh.

## Game loop binding

Recorded approvals bind the actual contract hash and mirror real authorized decisions; they do not grant them. Preserve prior answers; ask at most three independently answerable unresolved decisions per batch, with reversible defaults. Record no-spend/fallback decisions without pretending provider access exists. Implementation authorization covers routine build/test/acceptance work unless the user explicitly opts out. User/host policy remains authoritative.

In the current recorded source checkout, `runtime.json.productionEvidence` points to the existing upstream baseline and receipt directory. Loop 01 additionally requires all protected preflight/layout checks to have current completed passing receipts before advance; loop 02 requires representative assembly checks. The source packet opts into reader `productionEvidence.validationVersion: 2`: loops 03/04/05 require static/motion/final respectively; loop 06 rechecks all six stages. Version 2 validates complete stage and protected requirement/view coverage, final all-input dependencies, domain-correct motion evidence and actual production-receipt artifact linkage. It adds no upstream schema fields and never reruns automatic geometry/layout checks. A missing check, later fail/unverified receipt, wrong baseline, changed inputs or changed evidence blocks the transition. This reader checks existing upstream record linkage, not geometry re-execution, pixel quality, reviewer identity or arbitrary filesystem writes. Existing snapshots do not gain these later source gates retroactively.

Loop 01 requires implementation attestation; loops 02–06 require separately selected implementation, functional and visual attestations. Calibration does not reduce scope. Full-coverage loops 05 and 06 additionally require every requirement and protected view from the bound upstream v3 acceptance plan. Use the loop ID as the routing coverage entry, plus real plan requirement IDs. The plan is derived from the one contract, not an alternate human brief.

Bind full project code/build/assets, package and lock, architecture, setup receipt, installed framework tree, v3 plan and comparison references. Source-to-running-build correspondence still needs real capture/reviewer observation: the CLI cannot infer it from a command string. New candidates stale earlier receipts; this engine deliberately requires fresh predecessor re-attestations after changed builds rather than pretending granular receipt reuse is verified. Open defects/returns block progression. Defects require fixes and fresh same-dimension evidence; return routes preserve decisions and reopen alignment/setup/identity work. Never reduce scope or alter targets to get a pass.

CLI state references upstream detailed production receipts; it does not replace their production stages, plan, freeze, comparison or actual review. No automatic capture, provider or critic integration is invented. `implemented_attested`, `functional_attested` and `visual_attested` mean selected, byte-bound recorded claims. PNG/video signatures and artifact hashes cannot judge pixels, establish playback, authenticate execution or prove reviewer independence. Genuine unavailable capabilities mean unverified. Independent review is required when the contract-derived plan selects it; self-declared mode is still only a recorded claim.

## Remaining real gaps

- Source runtime regression results and the packaged skill-routing smoke check are bounded CLI verification; they do not establish game acceptance, host latency or an independent raster/gait verifier.
- No automated legacy migration, granular input-root reuse, remote scaffold checkout/archive downloader, source-to-archive attestation or publisher signature verification.
- No adversarial-filesystem race sandbox, cross-filesystem atomicity, shared-host lock recovery or tamper-proof history.
- No built-in live capture, motion playback/semantic judgment, reviewer identity authentication or completeness inference from prose.
- At the inspected framework pin, the WaveSpeed wrapper lacks `bria/remove-background` and no Media4Agents adapter was identified. If the approved technique selects one of these services, verify its actual integration, current model capability and authorized budget before use. Supplied or authored assets do not require a provider preflight.
- Reuse installed framework skills; generated harness recommendations do not override the approved contract or explicit execution restrictions.
