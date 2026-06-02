# BUILDPRINT: MiroFish Graph-Backed Swarm Simulation Workbench

Build the MiroFish-style prediction workbench as a usable product, not as a dashboard-shaped demo. The center is the graph-backed simulation workbench: upload seed material, generate a domain graph, inspect it on a real canvas, run a swarm simulation, produce a report, and continue interacting with the simulated world.

## Read Order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `02-project-setup.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. Current phase file
9. `04-review.md`
10. `05-handover.md`

## Engineer Contract

You are acting as a Senior Product Engineer for a trusted-local workbench. Preserve the product promise and graph work surface. Keep provider, memory, upload, and simulation boundaries honest. If a live provider or runtime is unavailable, show a useful blocked state and record it; do not fake success.

## Non-Negotiables

- The graph canvas is a primary product surface. It must support node/edge inspection, readable labels, refresh, zoom/drag or equivalent navigation, split/workbench layout modes, and responsive review.
- Replace Zep Cloud with a free open-source graph-memory layer. Default to a Graphiti-backed adapter unless implementation evidence shows a better free open-source option.
- Keep AI provider choice user-configurable through an OpenAI-compatible adapter. Do not hard-code Qwen, OpenAI, or any one vendor.
- Persist project, graph, simulation, report, and interaction state where the UI claims it can be reloaded.
- Do not ship canned reports, no-op graph controls, fake simulations, raw JSON as the main experience, or hidden provider failures.

## Implementation Loop

Use `03-phases/phase-flow.md` for every phase. Enter the active phase from `03-phases/phase-index.yaml`, build the smallest real usable product slice, inspect it directly, repair visible slop, and only then advance. The loop is product-first: prove the graph-backed workbench is becoming usable, not that documents were filled out.

## Completion Semantics

This packet is an implementation input. It is not proof that the product is already built or production-ready. Completion means the selected local workbench has been built, exercised from a fresh start, reviewed in a browser, and handed over with any real blockers named.


## Final Critical Reviewer Mode

Before handover, run the `04-review.md` reviewer step as a skeptical product reviewer. Look for dead buttons, dead controls, placeholder states, canned reports, fake graph data, hidden provider failures, slop, and generic dashboard drift. Repair central local defects before claiming completion.
