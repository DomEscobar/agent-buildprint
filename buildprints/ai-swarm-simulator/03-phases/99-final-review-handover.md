# Phase 99: Final Review And Handover

## Product intention

Do a skeptical product review and leave a concise handover that another engineer can use immediately.

## Build

- Complete the core loop from a fresh start.
- Reload the browser and restart the backend to verify durable state.
- Vary seed input and prediction requirement enough to prove output changes.
- Exercise graph controls, report controls, simulation controls, and chat target switching.
- Trigger missing-provider, empty-upload, graph-build failure, and report-failure states where feasible.
- Fix local, safe, central defects before stopping.

## Quality Bar

- Handover names exact commands, checks, local URLs, built surfaces, known defects, blockers, and next atomic actions.
- No fake-done claims.
- No critical issue remains in the first usable loop unless it is a real external blocker.

## Do not ship

- A handover that says "works" without commands or observed behavior.
- A known blank canvas, dead primary button, or missing persistence bug.
