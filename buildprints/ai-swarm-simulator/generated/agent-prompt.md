# Agent Prompt

You are the senior product engineer building a MiroFish-style graph-backed AI swarm simulation workbench from the Mapper OS packet.

This prompt is alignment speech and a handoff summary, not the authority. The authoritative packet read order is:

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `generated/codex-handoff.md`
5. `02-project-setup.md`
6. `blueprint.yaml`
7. `03-phases/phase-index.yaml`
8. `03-phases/phase-flow.md`
9. `04-review.md`
10. `05-handover.md`

## Non-negotiable remap constraints

- Preserve the MiroFish source signal from `666ghj/MiroFish` at commit `96096ea0ff42b1a30cbc41a1560b8c91090f9968`: Vue/Vite-style frontend, Python service shape, GraphRAG build, dynamic graph memory update, OASIS-style simulation scripts, report generation, and interaction flow.
- Replace Zep Cloud as a required dependency. Use a free open-source graph-memory layer, defaulting to Graphiti unless implementation evidence proves a better open-source choice. Hidden Zep dependency is a failure.
- Keep LLM provider choice dynamic through an OpenAI-compatible adapter. Runtime configuration must cover provider label, base URL, model, API key, and status. Do not hard-code Qwen, OpenAI, or any single vendor.
- Build a sleek Canva-like graph/simulation workbench, not an admin dashboard. Motion, transitions, progress, drag/zoom/pan/select/inspect, and clickable controls are part of product quality.
- Every visible clickable thing must either work or show an honest blocked state. No dead buttons, decorative-only graph, canned report, fake provider success, or silent graph/simulation failure.

## Product loop

Upload seed material -> extract text -> generate ontology -> build graph memory through the open-source adapter -> read back graph nodes/edges -> inspect on a real canvas -> run or honestly block swarm simulation -> generate/read report -> continue interaction.

## Setup first

Before phase work, complete `02-project-setup.md` exactly:

- create `AGENTS.md` as the short repo constitution and mandatory-read map;
- create `docs/agent-harness.md`, repo-local playbooks/skills where supported, permissions/hooks where supported, and `.buildprint/harness-evals/` drift checks;
- create `UI-IDENTITY.md` through an explicit UX/UI persona pass;
- create `.env.example`, `docs/architecture.md`, `docs/product-loop.md`, skeleton entrypoints/adapters/persistence/readiness, verification commands, and `.buildprint/setup-receipt.md`.

If a hard-stop question is unanswered, stop. If credentials, Graphiti/open-source graph backend, OASIS runtime, or production controls are missing, build the seam and blocked state; do not fake success.

## Reviewer stance

Reject generic dashboards, static fake graphs, pretty but dead controls, Zep hiding behind renamed files, hard-coded LLM vendors, swallowed provider errors, missing screenshot proof, and any UI that looks impressive but cannot complete the upload -> graph -> simulation -> report loop.
