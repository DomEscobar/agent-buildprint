# AGB local runtime v2

Implementation status: source-authored; regression tests, CLI execution, builds, browser QA and independent review **NOT RUN** for this overhaul. The commands below exist in `bin/agb.js` and `src/runtime/`; examples are future operator actions, not executed proof.

## Compatibility and existing-solution boundary

Existing `packet check`, `packet next`, `check`, `evidence check`, harness and legacy proof commands retain their purposes. Existing manifests without a runtime descriptor (including the website v1 descriptive `runtime: string[]` labels, retained as `runtimeLabels`) still produce the old `source.json`, `state.json`, notes and exact snapshots through the legacy writer, now in private staging. No migration or automatic reinterpretation of old state. Existing `.buildprint` is never overwritten. `guided-2d-game` is unchanged.

The only opt-in is a manifest member:

```json
{"runtime":{"schema":"agb/runtime/v2","definition":"runtime.json"}}
```

Include `runtime.json` in `files`. It uses JSON rather than a new YAML parser/dependency. The existing kernel/v1 spine and loop-index/v1 remain valid. The v2 definition is the authoritative dependency/acceptance routing mirror; markdown and the single `PROJECT_CONTRACT.md` remain the workflow and requirement authorities. Unknown runtime versions fail closed. No speculative scheduler, provider adapters, skill writer, deployment or remote agent orchestration is included.

`packet check` remains structural and is not functional/visual acceptance. Existing old proof commands and their historical output vocabulary cannot upgrade v2 runtime state. `packet next <project>` (also `<project>/.buildprint`) reads the v2 active loop when HEAD exists; a packet directory still prints its immutable default. `agb loop next` adds blockers without advancing.

## Bootstrap commands

```sh
agb start /trusted/packet/package.json /existing/project
agb start /trusted/packet/package.json /existing/project --resume
agb start https://publisher.example/packet/package.json /new/project --manifest-sha256 <trusted-sha256>
agb bootstrap /trusted/packet/package.json /new/game --allow-scaffold --framework /pinned/checkout --archive /trusted/isometric-framework-0.1.0.tgz --archive-sha256 <trusted-sha256>
```

Replace angle-bracket values; do not paste them literally. Remote publication is not supplied by this repository. `--resume` only supports v2, verifies HEAD/history/source-record/snapshot bytes, and requires the same manifest digest AND payload inventory. It does not reset state, redownload over snapshots, change approvals or rerun scaffold. For offline continuation, use `state status` / `loop next`; these need no manifest download. Changed manifest/source bytes require a separately planned migration, never an implicit refresh.

`bootstrap` is a deliberately pinned isometric adapter, not manifest shell execution. It reads committed ordinary template blobs from framework commit `7542ff68de04ca6ea6736974b54ec5b5dde1cc33`, checks tree `5363d058a3e15e6025a5a66bda09da343ca5215e`, renames template `gitignore`, and installs the archive as an opaque vendor file with a local package dependency. It never executes the framework scaffold script, package manager, install hooks, tests or build. `--allow-scaffold` consents only to these copies. A dirty checkout is not changed; template reads come from pinned Git objects, not the worktree. The adapter refuses other pins until source-reviewed adaptation. Git is invoked with fixed argument arrays, replacement objects disabled, transport protocols/hooks/fsmonitor disabled, no shell and no checkout. Required Git objects must already be present; the adapter does not fetch them. It does not install framework skill files separately.

The archive must already exist, and match the operator-provided SHA-256. This is **not proof that the archive was built from that commit**, safe to execute, signed or publisher-authenticated. Obtain/reproduce it through a trusted, separately authorized path. The upstream `build:package` includes checks; do not run it when checks are prohibited. Dependency installation may execute untrusted lifecycle code and needs actual user consent outside this CLI. No automatic execution-consent flag exists because there is no execution path to authorize.

### Publication, collision and recovery semantics

- Target parent must exist; target and every existing ancestor must be non-symlink. Inputs, payloads and evidence must be ordinary bounded files; nested symlinks and special files are refused. Preserve user files; never merge scaffold into an existing game.
- A per-target sibling `.NAME.agb-bootstrap.lock` serializes cooperating starts. Downloads/validation complete in memory before destination writes. Publication uses a private sibling `.NAME.agb-stage-*`; partial downloads do not populate `.buildprint`.
- New target: publish the staged directory by one same-filesystem rename. Existing project with no `.buildprint`: publish only the staged `.buildprint` by one rename, preserving all project files.
- Scaffold permits absent, empty, or sole ordinary `PROJECT_CONTRACT.md` destinations. A contract is copied byte-for-byte. Existing empty/contract-only destinations need **two renames**, not an atomic whole-directory swap: original moves to `.agb-stage-*.original`, then stage becomes target. `.agb-bootstrap-recovery.json` records both paths and is fsynced before the first rename. Original remains recoverable; there can be a crash window with target absent. This is intentionally not advertised as an atomic transaction.
- On failure, private staging is retained, and reported. Do not merge partially staged files. After stopping all owners, inspect the journal/lock/original and either move the complete stage to the still-absent target or restore the original. An already-present target must not be overwritten during recovery. New-target starts may be retried after inspecting the reported private orphan; existing v2 targets use resume. No automatic cleanup/deletion of user files or backup directories.
- Each state mutation writes an immutable checksum-named revision, fsyncs it, then atomically replaces `HEAD.json` by same-directory rename. HEAD is the only authoritative commit pointer; `state.json` is **legacy only**. A crash before HEAD publication can leave an unreferenced revision/temp file. Resume ignores those; never guess the newest filename. Hash-linked previous revisions preserve approvals, failures and decisions.
- Mutations require `--revision N` optimistic concurrency plus a write lock. Conflicts leave HEAD unchanged. `agb state status PROJECT` gives the current revision. No automatic stale-lock deletion.
- After establishing the owner has stopped, read `.buildprint/write.lock` (or sibling bootstrap lock) and use `agb state unlock PROJECT --token TOKEN` (plus `--bootstrap-lock` for that lock). Tokens are recovery nonces, not credentials. Unlock refuses a live/indeterminate PID and mismatched token. Cross-host/shared filesystems and PID reuse may need operator-led recovery; never bypass an active owner.

Atomic rename and fsync behavior targets local POSIX filesystems. No cross-filesystem transaction, network filesystem, power-loss/platform certification or hostile concurrent filesystem writer protection is claimed. Component checks/O_NOFOLLOW reduce link risk, but are not a race-proof sandbox against an attacker replacing ancestors. Use a private owned target parent. Hashes detect accidental corruption and byte changes; an attacker able to rewrite state and recompute hashes can forge or roll back the entire history. No publisher authentication, signature or trusted monotonic counter is supplied.

### Transport and limits

Credential-free HTTPS only for remote sources; redirects refused, 30-second timeout per fetch, 1 MiB manifest, 16 MiB per payload, 64 MiB total, 1–512 manifest entries. Remote payloads must stay on the manifest origin and cannot load local files. Relative remote entries resolve beside the manifest. V2 remote use requires a separately trusted manifest digest and SHA-256 on every file entry (`path`, optional `url`/`rawUrl`/`siteUrl`, `sha256`). Stored hashes alone are not that trust source. HTTPS does not authenticate a publisher's authoring intent. Only fetch trusted endpoints: this CLI is not a general SSRF/network sandbox or private-address blocker.

Local relative paths and v2 explicit file URLs stay below the manifest directory. Legacy explicit `file://` entries may name other ordinary local files, preserving existing guided bootstrap behavior: inspect/trust such local manifests before loading them. Local explicit HTTPS entries remain supported; use supplied payload digests where available. Paths reject traversal, drive/absolute paths, backslashes, control/reserved characters, duplicate case-folded paths and file/directory collisions. Legacy wildcard entries retain historical skip behavior, never expansion; v2 wildcards are rejected. HTTP, redirects, unsafe/malformed manifests and overwrites are intentional safety restrictions even where old behavior was permissive. No secrets are accepted in URL userinfo or logged by the new transport.

## State and real loop transitions

```sh
agb state status /game
agb loop next /game
agb state approve /game --revision 0 --receipt /game/.game-quality/approval.json
agb loop begin /game --revision 1 --receipt /game/.game-quality/begin.json
agb evidence bind /game --revision 2 --receipt /game/.game-quality/build-binding.json
agb evidence record /game --revision 3 --receipt /game/.game-quality/evidence.json
agb loop accept /game --revision 4 --receipt /game/.game-quality/accept.json
agb loop advance /game --revision 5 --receipt /game/.game-quality/advance.json
```

Re-read the actual revision after every write; the numbers above illustrate shape only. There may be many required approvals/records. All mutation receipts have `"schema":"agb/receipt/v2"`. Keep receipt files under `.game-quality/` or outside the project so writing them does not itself change the candidate source inventory. CLI stores immutable routing/attestation references; it does not replace the framework's detailed production plan/receipts with a second quality workflow.

Receipt fields by operation (see `docs/schemas/` for interchange schemas; runtime additionally checks files and state):

| Operation | Additional required fields |
| --- | --- |
| `state approve` | `id` from definition.approvals, `decision: approved|denied`, `actor`, `basis` quoting actual authority, current `contractSha256` |
| `loop begin`, `loop advance` | `loop` |
| `evidence bind` | actual `buildCommand`, `servedUrl`, `sourceToBuild` observation, nonempty `buildFiles` and `runtimeFiles` relative file lists |
| `evidence record` | unique `id`, `loop`, explicit current `candidate` and `generation`, `dimension`, `verdict`, `actor`, `method`, `executedAt`, `coverage`, `artifacts`; visual fields below |
| `loop accept` | `loop`, explicitly selected `evidence` id |
| `loop defect` | unique `id`, affected `loop`, `dimension`, concrete `description` |
| `loop resolve-defect` | open defect `id`, actual `fix`, nonempty `evidence` id list from a newer candidate/generation and matching loop/dimension |
| `loop return` | unique `id`, affected `loop`, `target: alignment|setup|identity`, concrete `reason` |
| `loop resolve-return` | open return `id`, `resolution`, `actor`; applicable approvals must be current |

Approvals are contract-hash-bound **recorded claims**, not authenticated authorization. Actual operator policy still governs every action. Contract changes stale approvals; previous revisions preserve original answers. `begin` requires all designated approvals, complete **currently evidenced** ancestor prerequisites, and no open returns/defects. `accept` requires an active loop or an already completed prerequisite being explicitly re-attested; latest selected passing evidence must be current. `advance` requires every defined dimension explicitly accepted and every prerequisite still current, marks the active loop complete, and selects the first eligible-by-dependency unfinished loop. It does not execute that loop or promote it to active. Completion status is an attested milestone, not verified quality.

Failures/unverified evidence never silently pass. A newer record revokes acceptance for its dimension. Failed evidence requires nonempty `findings: [{id, description}]`; each becomes an open defect and reopens the affected loop/dependents with a fresh generation. Unverified evidence on a completed loop also reopens affected work. A defect or return preserves history, reopens the affected loop/dependents, clears the candidate and increments generation. Defect closure requires fresh passing evidence for the affected dimension; this checks linkage, not whether the pixels actually fixed the problem. Capture and critic capability gaps remain unverified. Resolving a return does not auto-approve anything or re-complete a loop.

### Evidence, binding and staleness

A candidate fingerprints all ordinary project files recursively, including untracked/dirty source, built outputs and assets. Root `.git`, `.buildprint`, `.game-quality`, and `node_modules` are excluded; definition `bindingFiles`, plan references and `runtimeRoots` explicitly bind required data in excluded trees. Standalone binds the full installed framework tree, contract, package/lock, architecture, setup receipt, upstream v3 plan and original comparison references. Additional dependencies outside that runtime root need explicit `runtimeFiles`; this is not an automatic browser module-graph or actual-loaded-asset detector. Root completeness and correspondence to the running process remain reviewer obligations.

Limits: 20,000 files and 1 GiB per fingerprint root, 256 MiB per candidate/evidence file, 500 explicit bound files, 100 artifacts per record; state JSON is bounded at 16 MiB and history at 10,000 revisions. Exceeding limits is a blocker, not truncation. No garbage collection/migration command is supplied. A source/build/asset/contract/reference/runtime or artifact change invalidates applicable acceptance. New bind increments generation even with identical bytes, so repairs need explicitly fresh records. The conservative whole-project binding intentionally rechecks earlier prerequisite attestations after a new build: they remain historical until re-recorded/re-accepted in dependency order. It does **not** reuse unchanged receipts at a finer dependency-input granularity. `state status` exposes candidate and per-dimension freshness rather than silently presenting stale completion as current.

Coverage entries are `{requirement, verdict, observation}`. Every loop's routing requirement IDs must be covered. Full-coverage loops additionally require EVERY upstream v3 plan requirement and its protected views using `views: [{id, verdict, observation}]`. The plan must resolve to this project and reference the sole contract. Original comparison files are automatically bound. The CLI cannot establish that the plan really contains every human requirement; critic/owner checks retain that responsibility. Do not omit scope, weaken criteria, alter reference roles, substitute placeholders or retrospectively choose an easier target to make a check succeed.

Artifacts use `{path, sha256, kind, observation}`. On full-coverage functional/visual loops, add `view` for every protected plan view: functional needs runtime+interaction artifacts per view; visual needs running-capture+motion+interaction artifacts per view. One unlabeled capture cannot cover all devices. Required kinds:

- implemented: `source` (implementation inspection, not runtime proof);
- functional: `runtime`, `interaction` (real execution/normal input observations, not a build exit code);
- visual: `running-capture`, `motion`, `interaction`, `review`, plus `production-receipt` when an upstream acceptance plan is configured.

Visual receipts additionally require `runningBuildObservation`, `viewportAndState`, and `review: {actor, mode: independent|self|unavailable, observation}`. If definition or upstream plan requires independence, passing evidence must claim independent mode; unavailable review cannot pass. This is a policy on **claims**, not authentication of reviewer identity/independence. Distinct names, multiple prompts or a receipt field cannot establish independence. Where genuine independent review is unavailable, use honestly declared self-review only if the contract allows it; otherwise unverified. Captures must be running-build PNG/JPEG/WebP, motion MP4/WebM/GIF (magic signatures checked, not decoded or played). A still sequence is not motion proof. Signatures/hashes do not tell whether pixels are real, current, beautiful, animated, or related to the game.

When evidence cannot be produced, record a non-pass verdict with an explicit `capabilityGap`, `executedAt: null` if nothing ran, and `artifacts: []` when none exist. Keep per-requirement observations honest. Missing media/review is permitted only in these non-pass records and cannot be accepted; do not manufacture placeholder files to satisfy a gate.

CLI output explicitly says `implemented_attested`, `functional_attested`, `visual_attested`. A selected `pass` is a human/tool receipt verdict; it never becomes a CLI-authenticated functional/visual PASS. Bind the actual running candidate, inspect normal journeys and media, use a genuine critic where available, preserve failures, fix source/assets, then bind and capture again. Do not generate evidence records for work that has not run. No automatic pixels, reviewer, provider, budget or authentication adapter is implied.

## Authored regression coverage (unexecuted)
`npm run check:runtime:regressions` runs the dependency-free Node test sources only when explicitly authorized. The pinned scaffold integration is skipped unless `AGB_TEST_FRAMEWORK` points at a trusted checkout containing the documented commit. Tests use synthetic claim fixtures, never game evidence; their format assertions cannot establish real playback or reviewer independence. No test command, syntax check, package build or CLI smoke test was executed during authoring.
