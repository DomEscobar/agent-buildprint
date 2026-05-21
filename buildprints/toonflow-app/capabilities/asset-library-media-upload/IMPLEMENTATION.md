# Implementation: Asset Library And Media Upload

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users manage role/scene/prop/clip/audio assets, upload base64 media, store files under the local data directory, and retrieve safe local URLs or thumbnails.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Reject path traversal and malformed base64; delete removes file and rows.
2. Implement topology: Asset UI, upload API, file service with path containment, media type validation, SQLite asset/image state, negative upload tests.
3. Add runtime/browser/provider/persistence proof hooks: Upload/read/delete API test with filesystem containment checks
4. Update root and capability verification ledgers with artifact paths.

## Repair Loop

- Failed check: capture command, API/browser path, and observed failure.
- Structured feedback: map failure to UI/API/domain/persistence/provider layer.
- Focused fix: repair only the failing layer and adjacent contract.
- Rerun: repeat the exact proof command plus relevant negative test.
- Pass or blocker: either attach artifact or downgrade with blocker.

## Fresh Review

Required when touching auth, uploads, provider code, destructive operations, persistence migration, socket streaming, Electron/Docker runtime, or user data.

## Stop Conditions

- Needs upload security review, MIME validation hardening, and browser/media proof.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

