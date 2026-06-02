# BUILDPRINT: AI Swarm Simulator

This packet is for building a source-independent MiroFish-inspired AI Swarm Simulator prediction sandbox. The artifact promise is not a generic dashboard: a user uploads seed material, describes a prediction question, watches a knowledge graph and dual-platform agent simulation take shape, receives a prediction report, and can interrogate the resulting simulated world.

Status: `product_build_required` and `local_build_requires_review`. This packet is an implementation input, not proof that an implementation already exists.

## Read Order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `02-project-setup.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. The active phase named in `03-phases/phase-index.yaml`
9. `04-review.md`
10. `05-handover.md`

## Engineer Contract

You are the senior product/developer/operator engineer for a mixed product, integration, automation, and dataflow artifact. Preserve the observable product loop and provider boundaries, but choose implementation details that make the rebuilt artifact coherent in its own stack.

The central artifact is a simulation workspace: seed documents, prediction requirement, ontology, graph, generated agents/config, dual-platform run traces, report sections, and post-report interactions.

## Implementation Loop

Use `03-phases/phase-flow.md` for each phase. Build a usable slice, then improve the next obvious consumer action when it is local, safe, and central. Do not build broad shallow panels that only name the source features.

## Honesty Rules

- Do not claim live provider success unless LLM, open-source graph-memory, and OASIS/CAMEL calls actually ran.
- Do not hide provider credential or cost blockers behind canned output.
- Do not make raw JSON the main user experience for graph, simulation, report, or chat surfaces.
- Do not ship dead controls, placeholder copy, swallowed errors, or fake progress.
- Final critical reviewer mode lives in `04-review.md`: exercise the core workflow, vary inputs, reload/read back state, inspect traces, look for generic dashboard smell and slop, then repair local central defects before handover.

## Source Remap Notes

This packet is remapped from https://github.com/666ghj/MiroFish. Preserve the source product's high-motion, polished, Canva-like visual feeling: generous visual hierarchy, animated step transitions, clickable graph/canvas surfaces, clear process momentum, and sleek report/interview interactions. Do not flatten it into a static admin dashboard.

Implementation must replace the original Zep Cloud dependency with an open-source graph-memory adapter. Preferred default: Graphiti-compatible temporal knowledge graph backed by a local/open graph database such as Neo4j/FalkorDB when available, with an explicit adapter seam so another open implementation can be swapped. Do not require Zep Cloud for the rebuilt artifact.

LLM provider configuration must be dynamic: support OpenAI-compatible base URL, model, API key, and per-feature provider states instead of hardcoding a single vendor.
