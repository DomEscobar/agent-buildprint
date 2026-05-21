# Electron Desktop And Docker Runtime

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: The app can run as a backend service, Electron desktop app, packaged desktop build, or Docker backend-only runtime with static web assets and copied data resources.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Electron main process, backend server lifecycle, static web assets, build scripts, package config, Docker image, smoke tests.
Stable behavior: Data initialization/copy on version changes, serving bundled web assets and local media.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: yarn lint, yarn build or docker build smoke, Electron launch smoke
Required evidence: artifacts/runtime-smoke.log and artifacts/electron-window.png; BLOCKED_WITH_REASON: dependency install/build/Electron launch not proven.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs dependency install, build, backend smoke, Electron launch, and Docker proof.

## Behavior Contract

- User/system action: The app can run as a backend service, Electron desktop app, packaged desktop build, or Docker backend-only runtime with static web assets and copied data resources.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: Electron userData/data or cwd/data.
- Failure/empty/loading/blocked states: Data directory permission failure, missing web directory, native module packaging failure.
- Provider/persistence/runtime/operational boundary: OS/Electron/Docker runtime.

## Stable vs Free

| Stable | Free |
|---|---|
| The app can run as a backend service, Electron desktop app, packaged desktop build, or Docker backend-only runtime with static web assets and copied data resources. | Implementation framework/component/database abstraction. |
| Data directory permission failure, missing web directory, native module packaging failure. | Exact internal error class names. |
| yarn lint, yarn build or docker build smoke, Electron launch smoke | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/package.json:21-35; source-real/scripts/main.ts:43-74,171-240; source-real/electron-builder.yml:1-66; source-real/Dockerfile:1-22; source-real/src/app.ts:45-67,91-98,136-145

