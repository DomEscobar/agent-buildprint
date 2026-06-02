# MiroFish Graph-Backed Swarm Simulation Workbench

A Buildprint for rebuilding the spirit of [MiroFish](https://github.com/666ghj/MiroFish) at commit `96096ea0ff42b1a30cbc41a1560b8c91090f9968` as a polished, graph-backed AI swarm simulation workbench.

This is not a generic admin dashboard and not a static demo. The target product should feel like a high-craft, Canva-like workspace for turning source material into a simulated world: upload seed content, generate a domain graph, inspect the graph on a real canvas, run a swarm simulation, generate a report, and keep asking questions about the result.

## Product feel

The UX bar is intentionally high:

- **Sleek workbench, not forms in a row.** The main screen should feel like a focused creative/simulation workspace with clear visual hierarchy and momentum.
- **Graph canvas as the hero surface.** Nodes and edges are not decoration. Users must be able to inspect entities, relationships, labels, traces, and graph stats.
- **Motion with purpose.** Use transitions to show progress from upload → ontology → graph → simulation → report; do not add decorative animation that hides missing behavior.
- **Clickable everything that looks clickable.** Refresh, inspect, expand, zoom/drag, toggle, report, and interaction controls must either work or show an honest blocked state.
- **Readable simulation narrative.** Reports and post-report interactions should feel like an analyst workbench, not raw JSON pasted into cards.

## Core loop

1. Create or open a local project.
2. Upload seed material and enter the prediction/simulation question.
3. Extract text and generate ontology/entities.
4. Build graph memory through an open-source adapter.
5. Inspect the graph canvas and entity details.
6. Prepare and run a small swarm simulation from graph entities.
7. Generate a report grounded in graph and simulation state.
8. Continue interacting with the simulated world and read back persisted state after reload.

## Technical stance

- **Replace Zep Cloud.** Use a free open-source graph-memory layer. The default direction is a Graphiti-compatible adapter backed by a local/open graph database when available.
- **Keep providers dynamic.** LLM calls must go through an OpenAI-compatible provider boundary with configurable base URL, model, and API key. Do not hard-code a single vendor.
- **Persist what the UI promises.** Projects, uploaded material, graph references, simulation traces, report sections, logs, and chat/interview history must survive reload when presented as durable.
- **Block honestly.** If credentials, graph runtime, or OASIS/CAMEL-style simulation runtime are unavailable, show the useful seam and exact blocker instead of faking success.

## What this Buildprint includes

- `BUILDPRINT.md` — execution contract and non-negotiables.
- `01-questions.md` — alignment defaults before implementation.
- `02-project-setup.md` — stack, adapter, persistence, and craft-floor guidance.
- `03-phases/` — Consumer-First product phases for building the workbench slice by slice.
- `04-review.md` — skeptical product review against fake graphs, dead controls, canned outputs, and dashboard drift.
- `05-handover.md` — concise final handover contract.

## Do not ship

- Token bubbles, static SVGs, or card lists pretending to be a graph workbench.
- Canned reports unrelated to uploaded content, graph state, or simulation traces.
- Zep Cloud hidden behind a renamed “open source” adapter.
- Hard-coded LLM vendor assumptions.
- Dead controls, placeholder copy, swallowed provider errors, or raw JSON as the primary user experience.

Build the product loop first. Then make it beautiful. Then make the beauty honest.
