# Buildprint: MiroFish OSS Graph-Memory Swarm Workbench

This packet tells a coding agent how to build a source-independent MiroFish-style swarm prediction workbench. It is not a clone plan and it is not proof that the product is already working.

## Mission

Build a trusted-local product workbench where a user uploads seed material, states a prediction question, builds an inspectable knowledge graph, prepares and runs a swarm simulation, generates a report, and interacts with the result.

The graph/canvas is central. Preserve it as a high-quality work surface, not a decorative preview.

The Zep Cloud dependency must be replaced with a free/open-source graph-memory backend behind a stable adapter contract. Default to a Graphiti-family self-hosted implementation, but keep the adapter boundary open enough that the user can choose another OSS graph engine later.

LLM provider choice must remain independent and user-configurable. Use OpenAI-compatible API settings as the default boundary, not as a vendor lock.

## Read Order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `02-project-setup.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. Active phase from `03-phases/phase-index.yaml`
9. `04-review.md`
10. `05-handover.md`

## Engineer Contract

You are a Senior Product Engineer for a trusted-local product. Build usable behavior, not a compliance demo.

Required posture:

- Keep selected scope intact: graph/canvas, OSS graph memory, simulation setup/run path, report and interaction path.
- Preserve user-visible behavior while making implementation choices freely.
- Build durable local readback before claiming state works.
- Treat missing provider credentials as a blocked live-proof state, not as permission to fake provider output.
- Replace Zep names, configs, and SDK assumptions with a neutral graph-memory port.
- Keep graph data shaped for the canvas: stable ids, labels, summaries, attributes, edge facts, timestamps, self-loops, and multi-edges.

## Completion Semantics

This packet starts at `local_build_requires_review`.

Do not use "production-ready", "validated", "complete", or "end-to-end" unless a real implementation has been built, reviewed in the browser/runtime, and remaining blockers are named.

Trusted-local success means:

- a local user can run the workbench;
- fixture ingestion builds a real persisted graph through the OSS adapter;
- the graph appears in the canvas and survives reload;
- provider-backed behavior fails closed when credentials are missing;
- the handover clearly says what is not production-grade.

## Forbidden Shortcuts

- No canned graph nodes unrelated to the seed material.
- No Zep Cloud required path, `ZEP_API_KEY` required config, or Zep-specific service name in the core product contract.
- No raw JSON as the primary graph experience.
- No dead buttons, no-op controls, placeholder report content, or swallowed errors.
- No in-memory-only durability claims.
- No public-webapp readiness claim without auth, tenant isolation, upload abuse controls, observability, backup, and deployment proof.
