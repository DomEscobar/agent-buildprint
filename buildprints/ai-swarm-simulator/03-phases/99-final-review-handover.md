# Phase 99 — Final Review And Handover

## Product intention

Before handoff, become a skeptical reviewer of the actual artifact. The goal is to catch central fake-done behavior and leave the next engineer with a concise truthful status.

## Build

- Run the review in `04-review.md`.
- Repair local, safe, central defects found during review.
- Update handover using the structure in `05-handover.md`.
- Include provider credential/runtime blockers without exposing secret values.

## Quality bar

- The first usable loop has been exercised from a fresh start as far as credentials allow.
- State is reloaded/read back after at least one meaningful transition.
- Inputs are changed and output/state changes are verified where possible.
- Blocked provider and destructive paths are honest and visible.

## Do not ship

- A handover that claims production readiness or full validation.
- Passing tests as a substitute for reviewing graph, simulation, report, and interaction surfaces.
- Unfixed dead controls or placeholder output in the central loop.
