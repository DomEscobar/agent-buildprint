# BUILDPRINT: AI Swarm Simulator

This packet is a Mapper OS v2 executable Buildprint for remapping `666ghj/MiroFish` into a graph-backed AI swarm simulation workbench.

It is an implementation input for a coding agent. Its job is to shape product judgment before coding: preserve the MiroFish workflow, make the graph/simulation/report loop real, and prevent fake product polish.

## Typed product-quality contract

You are the posture-aware senior product engineer for a trusted-local product build. Build the artifact for its real consumer: a user who wants to upload/inspect seed material, see a graph-backed swarm simulation workbench, run or understand the simulation state, and read/continue from a report.

Non-negotiables:

- Keep the Canva-like sleek motion UI/UX: flowing canvas motion, clickable graph nodes/edges, drag/zoom/pan/select/inspect, progressive panels, smooth state transitions, and polished empty/loading/blocked states.
- Replace Zep as a required dependency with open-source graph memory. Default to Graphiti unless implementation evidence proves a better OSS adapter. Zep Cloud can never be required for the product loop.
- Keep LLM provider dynamic via OpenAI-compatible runtime configuration: provider label, base URL, model, API key, status/test button, and clear missing-provider blocker.
- Preserve MiroFish source signal: GraphRAG ingestion, dynamic graph memory update/readback, OASIS-style simulation scripts/runtime seam, report generation, and interaction flow.
- Every visible clickable control either works or shows an honest blocked state. No dead buttons, decorative-only graph, canned report, fake provider success, or silent graph/simulation failure.

## Read order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `generated/codex-handoff.md`
5. `02-project-setup.md`
6. `02-architecture.md`
7. `blueprint.yaml`
8. `03-ux-contract.md`
9. Active slice files under `slices/<id>/slice.yaml`
10. `gates/gate-index.yaml`

`04-handover.md` is the human-readable handover/status template. Do not use it to self-certify incomplete work.

## Product loop

Upload or choose sample seed material → extract text/entities → configure dynamic provider or see blocked state → build graph memory through OSS adapter → read back graph nodes/edges → inspect on a real graph canvas → run or honestly block swarm simulation → generate/read report → continue interaction.

## Per-slice loop

For each slice:

1. Read the slice yaml and matching UX path ids from `03-ux-contract.md`.
2. Build the smallest real product slice that advances the product loop.
3. Record blockers as partial, not complete.
4. Run acceptance in a fresh mindset: sample paths cannot prove real-input/operator paths.
5. Use `agb state derive` for state; do not write `.buildprint/state.json` by hand.

## Completion semantics

A slice is complete only when every `core_proof_required` path has observed, non-synthetic proof. A graph screenshot with fake nodes is not proof. A report that ignores uploaded input is not proof. A simulation button that always returns success is not proof.

Trusted-local posture lowers production operability obligations; it does not lower the product-craft floor for the visible workbench.
