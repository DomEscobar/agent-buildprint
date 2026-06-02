# Phase 08 - Verification

requires_roles: [ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Prove the trusted-local product loop by direct behavior, not by self-scored notes.

## Mapped obligations

- Run setup/build/test/smoke commands.
- Start the local app and inspect it in a browser.
- Complete upload -> graph -> canvas detail inspection.
- Verify provider blocked states if credentials/config are missing.
- Verify persistence/readback after reload or restart.
- Verify simulation/report/interaction or exact blockers.

## Stable vs free

Stable: direct walkthrough proof.

Free: exact test framework and smoke script.

## Implementation scope

Automated tests, build checks, backend smoke tests, browser walkthrough, and final defect fixes.

## Interfaces touched

All product surfaces touched by prior phases.

## State / runtime touched

Local app runtime, provider config, graph store, persisted project/simulation/report state.

## UX / DX / operator requirements

Repair visible defects found during browser review before handover if local and central.

## Required output (ux-ui-craft)

Browser-review the graph, split, workbench, report, and interaction views.

## Blocks (ux-ui-craft)

Do not hand over with obvious overlap, clipped labels, or dead graph controls.

## Required output (integration-runtime)

Smoke provider/adapter behavior and blocked states.

## Blocks (integration-runtime)

No fake green checks for unavailable providers.

## Required output (data-persistence)

Verify durable readback for completed artifacts.

## Blocks (data-persistence)

No claimed history/reload if data disappears after restart.

## Required output (security-boundary)

Confirm trusted-local warnings and not-production-grade status are present.

## Blocks (security-boundary)

No public-safe language without public hardening.

## Quality bar

The app is usable from a fresh local start, or blockers are exact and non-fake.

## Do not ship

Untested graph canvas, unrun build, hidden provider failures, or stale local-only warnings.

## Repair routing

Fix local, safe, central defects before final handover.

## Unlock condition

Verification commands and browser/API walkthrough results are recorded in `05-handover.md`.

