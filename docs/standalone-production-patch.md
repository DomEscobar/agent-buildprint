# Standalone production patch — 2026-09-14

Base: `e9d4ddcaa2a5af4731cb1def761971787b75b046`. Scope: standalone packet, its shared runtime adapter/schema and regression wiring only. Framework pin remains `7542ff68de04ca6ea6736974b54ec5b5dde1cc33`. No gameplay/world, guided-2d-game, provider, reusable skill, dependency or deployment configuration edits.

## Delivered and bounded claims

1. Required `assembly-measured-geometry` coverage in calibration and a versioned supporting review outline using existing requirement/artifact seams. Independent semantic endpoints, observed/inferred/authored uncertainty, actual host binding, source/capture hashes and real residuals are specified. **No independent raster checker is implemented**; a contract requiring automated measurement stays blocked pending separately verified framework work. Existing metadata checks cannot substitute.
2. Static/motion/final gates on loops 03/04/05, complete current six-stage set on 06. Explicit reader `productionEvidence.validationVersion: 2` checks upstream stage/check semantics, protected requirement/view coverage, all-input final dependencies, motion evidence kind and linked production-receipt identity. Existing snapshots without this version preserve historical behavior; resume refuses changed payloads rather than migrating. The adapter reads attestations and never reruns geometry/layout checks.
3. Reference identity/roles and separate measurement, experience, aesthetic, human acceptance and release decisions; existing defects revoke older PASS after rejection even without byte changes. No aggregate aesthetic score can satisfy a failed requirement.
4. Host input-feel contract and event-to-render capture fields; no universal speed/chord window or automatic host latency verifier.
5. Same-candidate controlled parity versus legal full-viewport play, decoded frame/cadence and bounded occlusion claims; no new automatic legal-motion verifier.
6. One source-to-integrated facing/action and anatomical support-phase evidence, not distinct-frame count; executable semantic gait checking remains upstream work. Provider fixes remain in existing adapters.
7. Existing handover gains an artifact/phase/evidence/next-owner/run/blocker/completion pointer and stale-review reconciliation; no scheduler/framework rewrite.
8. Setup records active tests versus evidence/archive roots. Real Node discovery canary excludes a non-executable archived failing snapshot while retaining active-test failure. No invented Vitest configuration or host-specific test result.

## Verification

- `node bin/agb.js harness check .` — PASS.
- `npm run check:runtime:regressions` — 44 PASS, one optional pinned-template integration skipped without its environment variable.
- `AGB_TEST_FRAMEWORK=<verified-pinned-checkout> npm run check:runtime:regressions` — **45 PASS, zero skipped**. The existing scaffold test uses explicitly synthetic opaque archive bytes and tests copying/hash preservation only; it does not install/build a framework package.
- `npm run check:packets`, `check:capabilities`, `check:authors`, `check:capability:regressions`, `check:syntax`, `check:design-quality-lift` — PASS.
- `npm run check:guided-2d-game` — PASS, including 55 contract tests and 36 byte-exact bootstrap files; its source bytes remain unchanged.
- `npm pack --dry-run --ignore-scripts --json` — PASS; includes runtime and new report template. No npm publication.
- Actual packet bootstrap/resume checks every authored payload and SHA-256 against immutable generated snapshots, explicit stage mapping and measured requirement. No hand-edited digest values.
- Website generator protocol inspected read-only at website commit `1cb944b050262f7f50a95a8d2348a2570fa44eb4`. Its actual `src/lib/buildprints.ts` loader was executed locally via Node TypeScript stripping/VM with `import.meta.env` supplied, against this source tree. Generated hosted manifest (33 files) passed the actual remote manifest reader using local fetch transport and generated hashes. This is a generator/loader smoke test, **not a full Astro build or live deployment check**. Website files remain authored/generated in their owning repository, not duplicated here.
- `git diff --check` and scoped diff review — PASS. No fresh independent reviewer tool was available: review is explicitly builder self-review, not an independent contract-review pass. Review removed repeated production inventory reads per linked artifact before final retest.

Negative fixtures cover shallow 7–10 px rail rise versus independently declared 26.6 px, wrong long-SE/long-SW 2×3 binding, inverse-fit unverified, bounded repaired rise/3×2 axis, high aesthetic plus failed measurement, later user rejection, missing/latest-failed/unverified later stages, arbitrary JSON mislabeled as production evidence, protected coverage/input omissions and legacy snapshot preservation. These are authored license-safe facts and synthetic receipts, not private artwork or game observations. Input latency, anatomy and legal-motion semantics remain host/upstream review obligations, not claimed executable fixtures.

## Release boundary

Source CLI pin publication follows the implementation commit so the new checkout contains this policy; the framework pin is unchanged. Updating a hosted packet never upgrades existing snapshots silently. Only the primary repository commit/push is authorized. The existing main-push workflow may dispatch the normal website sync; no separate deployment, npm publish, upstream push or paid generation is performed. Preview permission remains distinct from production approval.

`VERIFY_REVIEW_DONE` — bounded offline implementation verification and disclosed self-review only; independent review and real game acceptance are not claimed.
