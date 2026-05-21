# Implementation: Programmable Vendor Provider System

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Operators can add/update TypeScript vendor adapters, validate exported vendor/text/image/video functions, persist provider config, test models, and execute adapters inside a constrained VM.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Reject invalid adapter, disallow id separator, ensure secret values are not logged.
2. Implement topology: Settings UI code editor, vendor API, schema validator, VM sandbox, provider file storage, model test routes, security review.
3. Add runtime/browser/provider/persistence proof hooks: Schema validation tests plus sandbox adapter execution tests
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

- Needs VM security review, provider sandbox proof, secret redaction proof, and browser settings proof.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

