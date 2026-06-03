# Phase 08 - Verification

requires_roles: [ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Prove the trusted_local product loop by direct behavior, not by self-scored notes.

## Mapped obligations

- Run setup/build/test/smoke commands.
- Start the local app and inspect it in a browser.
- Complete upload -> graph -> canvas detail inspection.
- Verify provider blocked states if credentials/config are missing.
- Verify persistence/readback after reload or restart.
- Verify simulation/report/interaction or exact blockers.
- Run the **novice journey**: fresh app, no LLM provider configured, no seed material; follow `00b-ux-contract/first-run-path.md`, exercise "try with sample", inspect the precomputed graph, read the sample report; record screenshots + log paths per state.
- Maintain `.buildprint/ux-traceability.yaml` mapping every `ux_ac_id` from `00b-ux-contract/ux-acceptance.yaml` to at least one `journey_id`, citing phase, and ledger row. Missing rows block release.
- Jargon scan against the product surface using `00b-ux-contract/copy-quality-bar.md#jargon-ban`: any un-aliased appearance is recorded as a finding with file/line and screenshot.

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

- Browser-review the graph, split, workbench, report, and interaction views.
- Execute the novice journey end-to-end with no LLM provider configured and no seed material; capture per-state screenshots + log paths and write the corresponding ledger rows.
- For each novice `ux_ac_id` (`NOVICE-FIRST-RESULT-60S`, `NOVICE-NO-JARGON-FIRST-SCREEN`, `NOVICE-CANVAS-DISCOVERABLE`, `NOVICE-BLOCKED-PROVIDER-LEGIBLE`) record pass/fail with the measurable outcome and a `.buildprint/ux-traceability.yaml` row.
- Jargon-scan the product surface against `00b-ux-contract/copy-quality-bar.md#jargon-ban` and record un-aliased appearances.

## Blocks (ux-ui-craft)

- Hand over with obvious overlap, clipped labels, or dead graph controls.
- No novice journey, or a novice journey that secretly calls a real LLM provider.
- A `ux_ac_id` left uncovered in `.buildprint/ux-traceability.yaml`.

## Required output (integration-runtime)

Smoke provider/adapter behavior and blocked states.

## Blocks (integration-runtime)

No fake green checks for unavailable providers.

## Required output (data-persistence)

Verify durable readback for completed artifacts.

## Blocks (data-persistence)

No claimed history/reload if data disappears after restart.

## Required output (security-boundary)

Confirm trusted_local warnings and not-production-grade status are present.

## Blocks (security-boundary)

No public-safe language without public hardening.

## Quality bar

The app is usable from a fresh local start, or blockers are exact and non-fake.

## Do not ship

Untested graph canvas, unrun build, hidden provider failures, stale local-only warnings, missing novice journey, un-aliased jargon on the product surface, or any `ux_ac_id` left uncovered in `.buildprint/ux-traceability.yaml`.

## Repair routing

Fix local, safe, central defects before final handover.

## Unlock condition

Verification commands and browser/API walkthrough results are recorded in `05-handover.md`.

