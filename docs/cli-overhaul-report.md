# Local CLI overhaul source delivery — 2026-09-13

## 0.1.0 release note

This report preserves the historical implementation boundary below. Version `0.1.0` packages the runtime, docs and packets for npm distribution; this document does not itself publish npm bytes, website manifests or existing project snapshots. See [CHANGELOG.md](../CHANGELOG.md) for the current release-facing summary and [cli-runtime-v2.md](cli-runtime-v2.md) for installation and platform limits.

This is the historical 2026-09-13 authoring record. Its execution restrictions and unexecuted-test status describe that delivery only, not current operator instructions. For subsequent runtime changes and executed verification, see [the runtime guide](cli-runtime-v2.md).

## Delivered scope and claim ceiling

Implemented source in `/root/agent-buildprint`, preserving the incoming dirty root README/package changes and all 31 original standalone package files. The standalone package now has 32 files (31 explicit payload entries plus its loader manifest). No reset, clean, checkout, stash, commit, push, publish, deploy, dependency install or npm release was performed. No paid actions or new provider/skill integrations.

**This is a source deliverable, not a tested working-runtime claim. Tests, syntax-check commands, builds, benchmarks, CLI smoke runs, browser QA, and independent review were NOT RUN**, per the owner's explicit restriction. Authored regression sources are unexecuted. Static source/diff inspection and read-only JSON/file inventory are the available evidence. No gameplay/visual acceptance is claimed.

## File boundary

Tracked modifications relative to incoming repository HEAD:

- `bin/agb.js`: real command dispatch/help; bounded shared manifest transport; staged legacy writer; runtime-aware packet-next; opt-in definition structural checking; removed superseded unbounded fetch helpers. Old packet/legacy validators remain separate from v2 acceptance state.
- Root `README.md`: retained existing standalone catalog entry, adapted setup guidance, linked the new runtime guide/report.
- Root `package.json`: retained incoming standalone scripts; added `check:runtime:regressions`. No dependency, package version or lockfile changes. Existing npm `files` already includes all new source/docs/scripts/packets.

New local runtime files:

- `src/runtime/io.js`: path/file safety, bounded local/HTTPS reads, manifest/payload integrity, exclusive writes, atomic pointer writes, locks and stopped-owner recovery.
- `src/runtime/bootstrap.js`: staged publication/resume and fixed pinned-template scaffold adapter, archive digest verification, original-contract preservation and recovery journal.
- `src/runtime/state.js`: versioned checksum-linked revisions, source/snapshot integrity, expected-revision mutation, approval prerequisites, real loop transitions, defects/returns, candidate/evidence binding and explicit attestations.
- `src/runtime/cli.js`: strict command/option parsing and public runtime operations.

Documentation/interchange/coverage additions:

- `docs/cli-runtime-v2.md`, this report.
- `docs/schemas/{runtime-manifest-v2,loops-v2,receipt-v2,state-head-v2}.schema.json`.
- `scripts/runtime-v2.test.mjs`, `scripts/runtime-v2-scaffold.test.mjs` (24 authored test declarations total; optional pinned scaffold case needs `AGB_TEST_FRAMEWORK`).

Standalone package adaptation:

- Added `buildprints/standalone-isometric-game/runtime.json`; opted in through its package manifest and explicit payload/read-order list.
- Adapted `00-goal.md`, `01-setup.md`, `BUILDPRINT.md`, `README.md`, `framework-lock.json`, `loops/loop-flow.md`, `references/{cli-integration,framework,visual-acceptance}.md`; preserved the original authoring report with an explicit subsequent-overhaul note.
- All original six loop files, loop index, contract/UX/evidence templates, asset preference reference, review/handover, blueprint and publication metadata remain present. No demo clone or scope reduction.

**Preservation:** `buildprints/guided-2d-game/`, other packets, `package-lock.json`, `.agents/`, repository `AGENTS.md`, reusable skills and framework checkout were not changed. Read-only framework inspection still reports clean status at `7542ff68de04ca6ea6736974b54ec5b5dde1cc33`. No global configuration was edited.

## Commands implemented

- `agb start MANIFEST [PROJECT] [--resume] [--manifest-sha256 SHA]`.
- `agb bootstrap MANIFEST PROJECT --allow-scaffold --framework CHECKOUT --archive TGZ --archive-sha256 SHA` (optional remote manifest digest).
- `agb state status PROJECT`, `agb state approve PROJECT --revision N --receipt JSON`.
- `agb loop next PROJECT`.
- `agb loop begin|accept|advance|defect|resolve-defect|return|resolve-return PROJECT --revision N --receipt JSON`.
- `agb evidence bind|record PROJECT --revision N --receipt JSON`.
- `agb state unlock PROJECT --token <stopped-owner-recovery-nonce> [--bootstrap-lock]`.
- Existing `packet next` follows v2 state for project targets; packet directories still use their immutable default. Existing `packet check`, legacy `check`, `evidence check`, harness and old proof operations retain their separate purposes.

See [the complete command and receipt guide](cli-runtime-v2.md). Commands above are implemented entrypoints, **not executed demonstrations**. The regression npm script is supplied for a future explicitly authorized run, not a recommendation to override the standing restriction.

## Compatibility and security decisions

1. Versioned opt-in: manifests without `runtime` keep legacy state shape. `runtime.schema: agb/runtime/v2` enables JSON routing definitions and HEAD-selected immutable state. Unknown versions fail closed; no automatic migration or reinterpretation of legacy state. Existing `.buildprint` is never overwritten.
2. No manifest shell execution: bootstrap invokes only fixed read-only Git argument arrays and file copies. No framework scaffold script, package install/build, lifecycle script, test, provider or deployment is executed. Explicit `--allow-scaffold` is copy consent, not execution/spend permission. Git replacement objects, hooks, fsmonitor and transport protocols are disabled for the adapter; required objects must be local.
3. Pinned templates: fixed commit and tree identify committed ordinary template blobs; dirty worktree files are not copied or changed. Supplied archive SHA-256 checks opaque bytes only. It does not prove a valid installable package, build-from-source, safety, publisher authentication or signatures.
4. Bounded transport: credential-free HTTPS, no redirects, same-origin remote payloads, file-count/byte/time limits, explicit v2 remote manifest/payload digests; remote-to-local reads forbidden. Legacy explicitly named file URLs remain supported for existing local bootstrap manifests. Unsafe paths/symlinks/special files, normalized collisions and unsupported transport are refused. Local file reads are bounded even against growth, with change detection; no hostile-filesystem sandbox is claimed.
5. Publication: new-target or `.buildprint` insertion uses one same-filesystem rename. Existing empty/contract-only scaffold targets use **two renames plus a durable recovery journal and retained original**, not atomic directory replacement. Failed stages are retained for inspection. Cooperating locks plus revision expectations prevent silent concurrent overwrites.
6. State: immutable checksum-named revisions, hash-linked history, source/snapshot integrity and fsynced atomic HEAD replacement. Orphans are not committed state. Resume preserves progress/approvals and requires identical manifest/payload identity. These are local POSIX durability mechanisms, not tested crash guarantees or cryptographic authentication; a malicious writer can forge/recompute or roll back history.

## Loop and evidence behavior

The six standalone loops preserve the original plan → calibration → full world → mechanics/motion → whole-game acceptance → handover flow. Contract/setup/mobile-UX/asset-policy/acceptance-execution approvals record actual authority against the sole contract hash. CLI fields do not authenticate the operator or grant permission. Alignment stays in batches of at most three questions; preserve approvals and complete agreed scope after calibration.

Progression is explicit: begin only after applicable prerequisites; record actual evidence; explicitly accept each dimension; explicitly advance. Defects/returns preserve history and invalidate affected/dependent completions. Failed evidence opens concrete findings and forces a fresh candidate; closure needs actual fix claims plus fresh matching evidence. Unavailable capability may be recorded as unverified with no placeholder artifacts and no execution timestamp, but cannot be accepted.

Candidates bind full dirty/untracked project source, outputs/assets, contract/package/lock/setup/architecture, upstream v3 acceptance plan and original references, and the installed framework tree. Artifacts bind exact bytes to explicit candidate/generation. Full-coverage final loops require all plan requirements and protected views, including per-view functional/visual artifact kinds. New builds conservatively stale prior loop attestations; prerequisites must be explicitly refreshed rather than silently reused.

The CLI emits **implemented_attested / functional_attested / visual_attested**, never a structural check dressed up as authenticated game acceptance. Running-build correspondence, loaded content, complete contract coverage, pixels, real motion playback, observed interactions and reviewer independence remain actual capture/reviewer responsibilities. Media headers/hashes and self-declared reviewer fields are not proof of those facts. Detailed production state stays in the reused framework plan/receipts; CLI state carries routing/attestation links, not a replacement visual workflow.

Asset policy remains **WaveSpeed + (RetroDiffusion OR Media4Agents)**, with exact `bytedance/seedream-v5.0-pro/edit` and `bria/remove-background` access/budget preflights. Missing upstream Bria/Media4Agents integrations are disclosed; no paid probes or invented adapters. Free fallback remains a disclosed quality limitation under unchanged acceptance criteria.

## Static observations and remaining limitations

Observed through source/diff inventory:

- 32 standalone files; all 31 manifest payload entries exist, with no unlisted payload files.
- Runtime and YAML index list the same six loop IDs in the same dependency order.
- Four runtime modules, four JSON interchange schemas and two regression source files are included by existing npm distribution roots.
- `git diff --check` produced no whitespace diagnostics for tracked changes. Protected-path diffs were empty; framework status remained clean at the pin.

Unproven or deliberately unsupported:

- **All runtime behavior, test results, crash/security guarantees and distribution execution remain untested.** The 24 authored cases cover transitions, conflicts, stale approvals/candidates/artifacts, missing visual/reviewer capability, automatic failure defects, returns, corruption/orphans, path/collision/link boundaries, source transport, legacy CLI state and an optional pinned scaffold preservation path. They have not run.
- No granular input-footprint reuse; freshness is conservative and may require repeated predecessor attestations after build changes.
- No automatic legacy migration, remote framework checkout/archive downloader, source-to-archive attestation, publisher signatures, authenticated approvals/reviewers, live capture/critic/provider adapters or semantic quality judgment.
- No network-filesystem/multi-host lock semantics, race-proof hostile filesystem isolation, trusted monotonic history or portable atomic populated-directory replacement. Recovery limitations and actual byte/record limits are documented.
- Additional installed dependencies outside the configured framework root require explicit runtime-file binding; the CLI does not discover the running browser's actual module/asset graph.
- Trusted archive availability, future execution authorization, provider capability/budget and genuine capture/reviewer access remain future setup requirements—not completed work or silently waived criteria.

Source delivery is complete under the requested no-execution boundary. No game implementation or game acceptance is part of this delivered result.
