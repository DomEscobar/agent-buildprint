# Phase Flow

## Phase Entry

At phase entry, read the active phase file from `03-phases/phase-index.yaml`, restate the product intention, name the concrete UI/runtime slice, and identify any blocker before writing code.

## What `ux_obligations` means

Every phase after `00b-ux-contract.md` must declare a `ux_obligations: [...]` field listing the specific files/sections/`ux_ac_id`s from `00b-ux-contract/` that this phase implements. Examples: `00b-ux-contract/first-run-path.md#landing`, `00b-ux-contract/empty-blocked-loading-states.yaml#blocked.missing-llm`, `00b-ux-contract/ux-acceptance.yaml#NOVICE-FIRST-RESULT-60S`.

Rules:

- Every entry must resolve to a real file/section/id in `00b-ux-contract/`. A dangling reference is a packet defect; repair the contract or fix the citation.
- If a phase has no consumer-facing surface, declare `ux_obligations: []` and record why.
- The reviewer (`04-review.md`) and `08-verification.md` check that every `ux_acceptance.yaml` row is cited by at least one phase and observed in at least one playtester journey. A `ux_ac_id` with no citing phase and no observed evidence blocks release.

For each phase:

1. Restate the product intention in one paragraph.
2. Apply every `requires_roles` block in the phase.
3. Resolve every entry in `ux_obligations` against `00b-ux-contract/` artifacts before writing code; treat unresolvable citations as a packet defect routed to `00b-ux-contract.md`.
4. Build the smallest real usable slice for that phase, with product behavior visible in the workbench.
5. Improve the obvious next user action if it is local, safe, and central.
6. Run relevant checks.
7. Inspect the browser or API/runtime behavior directly.
8. Remove visible slop, dead controls, fake data, and misleading provider states.
9. Record concise handover facts only, including which `ux_obligations` entries were observed in the slice.

Provider failures are not implementation permission to fake the graph, report, or simulation. If credentials or runtime dependencies are missing, build the honest local seam and show the blocked state described in `00b-ux-contract/empty-blocked-loading-states.yaml`.

