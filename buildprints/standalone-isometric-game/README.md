# Full Standalone Isometric Game

A complete local authoring packet for an original game built with DomEscobar/isometric-framework. Full means the approved game scope, not the framework demo and not a vertical-slice cap. Completely separate from `guided-2d-game`; no dependency on or modifications to that packet.

**Status:** locally authored, static source inspection only. No game implemented, provider calls made, scaffold/bootstrap executed, tests/benchmarks/browser QA/independent reviews run, or package published/deployed. Runtime and CLI behavior remain untested for this package.

## Start locally — preserve the approved contract
Read `BUILDPRINT.md` and `00-goal.md` first. Align and approve one `PROJECT_CONTRACT.md`; ask at most three unresolved questions per batch. Two implemented paths are available:

```sh
# Existing scaffolded host; no host files are merged or overwritten.
node ./bin/agb.js start ./buildprints/standalone-isometric-game/package.json /absolute/path/to/my-isometric-game
# Or a new/empty/contract-only host, with explicit template-copy consent and trusted archive:
node ./bin/agb.js bootstrap ./buildprints/standalone-isometric-game/package.json /absolute/path/to/my-isometric-game --allow-scaffold --framework /pinned/framework --archive /trusted/isometric-framework-0.1.0.tgz --archive-sha256 <trusted-digest>
```

Replace example paths/digest. `bootstrap` reads pinned Git template blobs and copies a digest-checked opaque archive; it does not run manifest commands, the framework scaffold script, package installs or checks. Source-to-archive provenance remains the operator's responsibility. See `01-setup.md` for the authorized upstream preparation alternative and `references/cli-integration.md` for precise publication/recovery semantics. Never overwrite existing packet state. V2 continuation uses the same `start` command with `--resume`; source changes require an explicit migration decision.

Read `.buildprint/next-agent.md`, then `agb state status /game` and `agb loop next /game`. The versioned engine records explicit approvals, prerequisites, defects, returns and separately byte-bound implemented/functional/visual **attestations**, not CLI-verified pixels or gameplay. Commands and JSON receipt contracts are in the distributed `docs/cli-runtime-v2.md`. Actual test/capture/review/spend authorization remains with the owner. Missing capability stays unverified.

Optional future checks, ONLY if requested (none run for this authoring task):

```sh
node ./bin/agb.js packet check ./buildprints/standalone-isometric-game
node ./bin/agb.js packet next ./buildprints/standalone-isometric-game
```

`packet next` on a packet prints the default loop; on a v2 project it reads current state. Only explicit `loop begin/accept/advance` mutations change progression. `agb check` is the legacy graph-blueprint checker, not the kernel packet command. No hosted package URL is asserted or required.

## Package map
- `BUILDPRINT.md`, `00-goal.md`, `01-setup.md`, `02-identity.md`: briefing, alignment, safe scaffold/bootstrap, mobile-first UX.
- `blueprint.yaml`, `loops/loop-index.yaml`, `loops/loop-flow.md`, `runtime.json`: supported kernel routes, versioned approval/evidence prerequisites and six full-game loops.
- `framework-lock.json`, `references/framework.md`: exact upstream pin, verified provenance and skill catalog links.
- `references/assets.md`, `references/visual-acceptance.md`: preferred asset policy and substantive reuse of upstream v3 visual acceptance.
- `references/cli-integration.md`: current supported manifest/CLI behavior and real gaps.
- `templates/`: contract, UX outline, setup receipt, acceptance-plan routing, asset provenance, generation ledger and capture receipt.
- `review.md`, `HANDOVER.md`: authorized future acceptance and honest delivery.
- `package.json`: explicit local snapshot file manifest consumed by current `agb start`.
- `publication.json`: existing publication metadata format with `publish: false`.
- `AUTHORING_REPORT.md`: local scope, static inspection evidence, gaps and untested status.

Skills are linked at the exact framework commit and later read from its installed package; none are copied or authored here. Framework production receipts remain the detailed live quality evidence; CLI state owns routing and byte-bound attestation references, not an alternate quality workflow. Package templates are not game requirements or evidence until populated for an actual approved project.
