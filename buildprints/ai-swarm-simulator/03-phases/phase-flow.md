# Phase Flow

## Phase Entry

At phase entry, read the active phase file from `03-phases/phase-index.yaml`, restate the product intention, name the concrete UI/runtime slice, and identify any blocker before writing code.

For each phase:

1. Restate the product intention in one paragraph.
2. Apply every `requires_roles` block in the phase.
3. Build the smallest real usable slice for that phase, with product behavior visible in the workbench.
4. Improve the obvious next user action if it is local, safe, and central.
5. Run relevant checks.
6. Inspect the browser or API/runtime behavior directly.
7. Remove visible slop, dead controls, fake data, and misleading provider states.
8. Record concise handover facts only.

Provider failures are not implementation permission to fake the graph, report, or simulation. If credentials or runtime dependencies are missing, build the honest local seam and show the blocked state.

