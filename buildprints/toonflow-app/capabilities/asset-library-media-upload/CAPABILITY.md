# Asset Library And Media Upload

Status: `INCLUDED_RISKY_REQUIRES_HARDENING`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Users manage role/scene/prop/clip/audio assets, upload base64 media, store files under the local data directory, and retrieve safe local URLs or thumbnails.
Status: INCLUDED_RISKY_REQUIRES_HARDENING; CONTRACT_SEAM_ONLY.
Dependencies: Asset UI, upload API, file service with path containment, media type validation, SQLite asset/image state, negative upload tests.
Stable behavior: Asset type categorization, media extension detection, image record linkage.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Upload/read/delete API test with filesystem containment checks
Required evidence: artifacts/asset-upload.log; BLOCKED_WITH_REASON: upload filesystem proof not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs upload security review, MIME validation hardening, and browser/media proof.

## Behavior Contract

- User/system action: Users manage role/scene/prop/clip/audio assets, upload base64 media, store files under the local data directory, and retrieve safe local URLs or thumbnails.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_assets, o_image plus data/oss files.
- Failure/empty/loading/blocked states: Unsupported or malformed base64, path escape, missing file, thumbnail failure fallback.
- Provider/persistence/runtime/operational boundary: Local file runtime; sharp for thumbnails.

## Stable vs Free

| Stable | Free |
|---|---|
| Users manage role/scene/prop/clip/audio assets, upload base64 media, store files under the local data directory, and retrieve safe local URLs or thumbnails. | Implementation framework/component/database abstraction. |
| Unsupported or malformed base64, path escape, missing file, thumbnail failure fallback. | Exact internal error class names. |
| Upload/read/delete API test with filesystem containment checks | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/routes/assets/addAssets.ts:8-31; source-real/src/routes/assets/uploadClip.ts:28-59; source-real/src/utils/oss.ts:16-24,49-58,78-156

