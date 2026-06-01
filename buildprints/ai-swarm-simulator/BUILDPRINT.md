# BUILDPRINT: Open MiroFish Swarm Prediction Workbench

## Execution Role

You are a Senior Product/Developer/Operator Engineer building a source-independent MiroFish-style workbench. Your job is to build a usable prediction simulation artifact, not a compliance demo.

## Product Mission

Build a local-first swarm prediction workbench where a user uploads seed documents, states a prediction requirement, generates an ontology-backed knowledge graph, prepares a dual-platform agent simulation, runs the simulation, produces a traceable prediction report, and then explores the resulting world through a high-quality canvas graph and agent/report chat.

## Required Read Order

1. `BUILDPRINT.md`
2. `blueprint.yaml`
3. `01-questions.md`
4. `02-project-setup.md`
5. `03-phases/phase-index.yaml`
6. `03-phases/phase-flow.md`
7. Active phase file from `phase-index.yaml`
8. `04-review.md`
9. `05-handover.md`

## Central Artifact

The central artifact is the interactive prediction workbench:

- a durable project workspace for uploads, extracted text, ontology, graph id, simulation id, reports, and logs;
- a canvas graph that remains first-class throughout setup, simulation, report, and interaction;
- an open graph-memory service that replaces direct Zep Cloud dependence;
- an AI-provider-neutral LLM configuration using OpenAI-compatible defaults and explicit provider seams.

## First Usable Loop

The first loop must let a user:

1. create a project from one or more seed files and a natural-language prediction requirement;
2. generate and inspect ontology entity/relation types;
3. build a persisted graph memory from the extracted text;
4. view the graph on a canvas with useful node/edge interaction;
5. prepare at least one runnable simulation world from graph entities;
6. generate or inspect a prediction report with logs/traces tied back to the graph.

## Non-Negotiables

- Preserve the canvas graph as a real work surface, not a screenshot, JSON dump, or decorative panel.
- Do not keep `ZEP_API_KEY` or direct `zep_cloud` calls in the built product surface. Replace them with a graph-memory port and a free/open-source local backend.
- Recommended graph-memory backend: Graphiti with FalkorDB for local temporal knowledge graph storage. A different OSS graph backend is acceptable only if it preserves episode ingestion, ontology/entity typing, edge facts, temporal metadata, search, graph readback, and local operation.
- Keep LLM provider selection independent: use OpenAI-compatible `base_url`, model, and API key settings, plus clear support for local or hosted compatible providers.
- Do not fake graph building, simulation output, report generation, memory search, or chat. Missing credentials or local runtimes must produce honest blocked states.
- Persist project, graph, simulation, report, logs, and generated profile data across backend restarts.
- Keep uploads private-local by default and never copy secret values into logs, reports, or handover.

## Current Status

`qualification_label: local_build_requires_review`

This packet is a selected implementation input derived from source behavior. It is not a claim that a downstream implementation has already been built, deployed, or production-validated.

## Stop Conditions

Stop and record a blocker if:

- the chosen graph-memory backend cannot return node and edge data suitable for the canvas;
- simulation execution would require unsafe external writes or paid provider access without explicit user approval;
- provider credentials are missing for live LLM/OASIS verification;
- uploaded file handling, destructive project deletion, or chat/report logs expose secrets or private data.
