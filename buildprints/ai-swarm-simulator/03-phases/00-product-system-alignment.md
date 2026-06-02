# Phase 00 — Product system alignment

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Turn the setup decisions into the AI Swarm product-system map that all later phases implement: product promise, users, primary loops, feature map, state model, architecture boundaries, and quality bar. Do not reselect the stack and do not reduce this phase to folder creation.

## Product promise

AI Swarm is a trusted_local, MiroFish-style graph-backed simulation workbench: users upload seed material, generate a domain graph through an open-source graph-memory adapter, inspect it on a sleek Canva-like interactive canvas, run or honestly block a swarm simulation, generate a report, and keep interacting with the simulated world.

## Users / consumers

- **Exploration operator**: brings seed material and wants a readable graph, simulation controls, and a report without needing to understand backend internals.
- **Simulation researcher**: needs graph entities, traces, report sections, and interaction history to be inspectable and reproducible.
- **Local builder/operator**: configures dynamic OpenAI-compatible LLM providers and local/open-source graph memory, and needs clear blockers when credentials, Graphiti/graph backend, or OASIS runtime are missing.

## Primary loops

1. Upload seed material -> extract text -> persist project state -> show readback.
2. Generate ontology -> build graph memory through Graphiti/open-source adapter -> read back nodes/edges.
3. Inspect graph on the canvas -> click/drag/zoom/filter/select nodes and edges -> see details and state changes.
4. Prepare/run or block simulation -> persist profiles/config/status/traces.
5. Generate report -> stream/progress sections -> persist final markdown/logs -> continue interaction.

## Feature map

- First value: project upload, extraction, graph-build blocker/readiness, and real graph canvas shell.
- Core value: graph memory build/readback, canvas inspectability, dynamic provider configuration, OASIS simulation seam, report generation/readback.
- Hardening: persistence/readback, provider diagnostics, graph-memory diagnostics, simulation/runtime diagnostics, screenshot/visual quality proof, posture-gated auth/observability/deploy/security phases.

## State model

- Empty: no project yet; primary action is upload seed material.
- Loading: extraction, ontology generation, graph build, graph fetch, simulation, and report generation have visible progress.
- Ready/success: persisted project, graph, simulation traces, report, and interaction history are readable after reload.
- Blocked/error: missing LLM credentials, missing open-source graph backend, missing OASIS runtime, parse failure, graph build failure, provider error, or posture-gated production control shows exact recovery path.
- Interaction state: selected node/edge/detail panel, canvas viewport, filters, simulation run selection, report section selection, and chat/interact context are explicit.

## Architecture boundaries

Carry forward `02-project-setup.md`: Vue/Vite or equivalent product-grade frontend, Python backend or equivalent service, `GraphMemoryAdapter`, `LLMProvider`, upload parser, simulation runtime seam, report generator, persistence/readback layer, and canvas readback contract. Zep Cloud is forbidden as a required dependency; Qwen/OpenAI-specific calls must sit behind a dynamic OpenAI-compatible provider adapter.

## Mapped obligations

- Consume `01-questions.md`, `generated/agent-prompt.md`, `generated/codex-handoff.md`, and `.buildprint/setup-receipt.md` setup artifacts.
- Preserve the MiroFish source signals from upstream commit `96096ea0ff42b1a30cbc41a1560b8c91090f9968`: GraphRAG build, dynamic graph memory update, OASIS-style simulation scripts, report/interaction flow, Vue/Vite frontend, Python backend, and OpenAI-compatible LLM env seams.
- Replace Zep Cloud with a free open-source graph-memory layer, defaulting to Graphiti unless implementation evidence proves a better open-source option.
- Keep provider choice dynamic through configurable base URL, model, API key, and provider label.
- Preserve Canva-like polish: smooth motion, dense-but-clear workbench layout, draggable/zoomable graph canvas, visible progress, and every clickable control either working or showing an honest blocked state.

## Stable vs free

Stable: product promise, target consumers, primary loops, feature map, state model, setup-selected stack, architecture boundaries, product-craft floor, open-source graph memory requirement, dynamic LLM provider boundary, and blocker semantics from `02-project-setup.md`.

Free: wording and internal naming details if they do not weaken the product promise, hide a state, remove a click path, or make later phases easier to fake.

## Implementation scope

Create or update implementation-project alignment artifacts that phase 01 and phase 02 will use: product promise, consumer/persona summary, primary-loop map, feature map, state model, architecture-boundary summary tied to the setup receipt, visual quality bar, and forbidden shortcuts.

## Build

Create concrete product-system decisions in the implementation project. If setup artifacts, `AGENTS.md`, `UI-IDENTITY.md`, `docs/agent-harness.md`, or the selected skeleton are missing, route that blocker to `02-project-setup.md` or repair the minimal missing artifact before continuing. A generic alignment essay, page list, or folder tree without loops/states is not valid completion.

## Interfaces touched

Product-loop documentation, feature map, domain boundary notes, route/view map, provider/integration boundary notes, persistence/readback expectations, canvas interaction model, and setup receipt references.

## State / runtime touched

State model, persisted-state expectations, provider/graph/simulation blocked-state semantics, recovery paths, and verification paths for important states.

## UX / DX / operator requirements

No UI without state, and no state without UI. Every important state needs copy, one primary action, a recovery path, and test coverage. Canva-like polish means motion and clickability are functional product feedback, not decorative animation.

## Required output (product-architect)

- Product promise, users, primary loops, feature map, state model, architecture boundaries, and quality bar are explicit and mutually consistent.
- Architecture boundaries follow `02-project-setup.md` and `.buildprint/setup-receipt.md`.
- The first vertical slice path is obvious from the loop and feature map.

## Blocks (product-architect)

- Reopening setup debates without updating `02-project-setup.md` and `.buildprint/setup-receipt.md`.
- Page lists, source-folder mirrors, or feature inventories with no loop/state model.

## Required output (ux-ui-craft)

- UI-bearing products define first-run UX, primary action per state, empty/loading/error/blocked/success copy, and screenshot rejection rules.
- `UI-IDENTITY.md` captures the sleek Canva-like visual identity, motion rules, clickable-control rules, graph canvas affordances, and forbidden generic dashboard patterns.
- Product-facing copy has no Buildprint/proof/phase/internal harness vocabulary.

## Blocks (ux-ui-craft)

- Generic dashboard-first product shape.
- UI states without owned data/state transitions.
- Motion that hides latency instead of explaining progress.
- Clickable-looking controls that do nothing or silently fail.
- Raw ids/debug strings or internal vocabulary on the product surface.

## Required output (integration-runtime)

- Provider, graph memory, OASIS/simulation, report, upload, and canvas-readback boundaries are mapped to product loops and blocked/error states.
- Live, local, test, and blocked modes are named where relevant.

## Blocks (integration-runtime)

- Hidden Zep Cloud dependency.
- Hard-coded Qwen/OpenAI/vendor calls outside `LLMProvider`.
- Fake success when credentials or runtime dependencies are missing.

## Required output (data-persistence)

- State model names what must persist, what can be transient, and how readback proves continuity.
- Project, graph, simulation, report, and interaction history state are represented.

## Blocks (data-persistence)

- In-memory state presented as durable.
- Missing saved/readback/recovery state for a promised return loop.

## Required output (security-boundary)

- Upload/file, secret, destructive-action, public/private exposure, tenant, and compliance boundaries are attached to loops and states where relevant.

## Blocks (security-boundary)

- Sensitive loop or state has no approval, denial, or recovery behavior.
- Public/private exposure claims without posture-required controls.
- Real secrets in examples, docs, logs, generated files, or fixtures.

## Quality bar

Phase 01 and phase 02 can be implemented without guessing who the product serves, what the first loop is, which states exist, what features come first, or where the architecture boundaries sit. The mapped product feels like a polished graph/simulation workspace, not an admin dashboard.

## Do not ship

- Generic alignment prose with no product promise, users, loops, feature map, state model, or quality bar.
- A page list or source-folder mirror pretending to be product alignment.
- Skeleton-only completion.
- UI states without data/state ownership.
- Hidden provider/runtime/export/security blockers.
- New stack decisions that contradict setup.
- Zep Cloud as a required dependency.
- Hard-coded LLM vendor configuration.
- Static decorative graph instead of a clickable/readback graph canvas.

## Repair routing

- setup contradiction -> `02-project-setup.md`
- unanswered product-defining question -> `01-questions.md`
- loop/state/feature-map gap -> this phase
- final-review defect -> `04-review.md`

## Unlock condition

The implementation has a concrete product promise, consumer map, primary loops, feature map, state model, architecture boundaries, quality bar, UI identity, agent-harness artifacts, and honest blockers. Only then continue to shell/navigation or core-loop feature work.
