# Novel Storyboard Buildprint — Product Leadership Variant

## Mission

Build a local-first storyboard workbench where a writer or creative operator can turn seed material into a visible story system: intake, graph/story structure, simulation choices, report/timeline, and follow-up interaction.

The product must feel like a real creative tool, not a dashboard about a tool.

## Product promise

A user can bring in story material, see the structure become tangible, adjust or inspect it, run a deterministic/local simulation path, review the generated storyboard/report, and return to the work later without losing context.

## The central artifact

The central artifact is the story/workbench surface. It may be a graph, canvas, storyboard board, or structured scene map, but it must be more than decoration:

- it reflects user input;
- it supports selection and inspection;
- it changes when the user changes inputs;
- it creates obvious next actions;
- it survives reload where local persistence is expected.

If the central artifact is weak, the product is weak.

## Product feel

- Creative operator console, not admin dashboard.
- Dense enough to feel powerful, clear enough to use without reading docs.
- Domain language: story seed, scenes, entities, relationships, arcs, simulation run, report, continuity notes.
- Honest local sandbox: deterministic outputs are allowed; fake live-provider claims are not.

## Forbidden shortcuts

- Token bubbles or static SVG pretending to be a graph.
- Generic cards/lists/forms as the main experience.
- Raw JSON as the primary UI.
- Dead buttons, fake controls, placeholder copy, or canned outputs that ignore input.
- “Evidence/proof” jargon leaking into product UI.
- Mock provider paths pretending to be live provider behavior.

## Completion bar

A constrained local build is acceptable. A fake product is not.

The run is successful when a user can complete the core loop locally, understand blocked live-provider boundaries, reload and recover meaningful work, and see a product direction strong enough that the next iteration is obvious.
