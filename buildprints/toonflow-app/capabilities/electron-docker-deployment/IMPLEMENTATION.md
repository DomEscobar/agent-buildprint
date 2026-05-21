# Implementation: Electron Desktop And Docker Runtime

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: The app can run as a backend service, Electron desktop app, packaged desktop build, or Docker backend-only runtime with static web assets and copied data resources.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Permission failure shows warning and exits; missing web assets logs warning.
2. Implement topology: Electron main process, backend server lifecycle, static web assets, build scripts, package config, Docker image, smoke tests.
3. Add runtime/browser/provider/persistence proof hooks: yarn lint, yarn build or docker build smoke, Electron launch smoke
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

- Needs dependency install, build, backend smoke, Electron launch, and Docker proof.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

