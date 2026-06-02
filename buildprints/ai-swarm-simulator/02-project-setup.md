# Project Setup

## Before Coding

You are building a mixed artifact: consumer-facing web product, provider integration boundary, long-running automation task loop, and data/report pipeline. The real consumer is a person who wants to test a "what if" scenario from seed material and inspect the resulting simulated social world.

The first loop to make usable is:

1. Upload one small PDF/MD/TXT seed document and enter a prediction requirement.
2. Create a project workspace and generate an ontology.
3. Build or honestly block the knowledge graph provider transaction.
4. Prepare a simulation with generated agents and config.
5. Run or honestly block a short dual-platform simulation.
6. Generate/read a prediction report and ask one follow-up question.

## Central Artifact

Build around a simulation workspace, not around isolated pages. Every screen, API, and task should read from or write to that workspace:

- project id, name, seed file metadata, extracted text, requirement;
- ontology, analysis summary, graph id, graph data;
- simulation id, status, profiles, config, run state, actions, posts/comments, logs;
- report id, outline, sections, markdown, agent logs, chat/interview history.

## State And Readback

Persist enough state that a reload can recover the current workspace. Local files, SQLite, or Postgres are acceptable implementation choices. The source used local JSON/files for projects, simulations, and reports; task progress was in memory. If you keep task progress volatile, make restart behavior explicit and recover from persisted final artifacts.

## Provider Boundaries

- LLM: OpenAI-compatible chat and JSON responses for ontology, profiles/config, report, chat, and interview behavior.
- Open-source graph memory: graph creation, ontology set, text ingestion, node/edge retrieval, graph search.
- OASIS/CAMEL: dual social-platform simulation runtime.

Missing credentials must create a useful blocked state with setup guidance. Do not generate canned "successful" graph, report, or simulation outputs and present them as provider results.

## Local Commands

Use equivalent commands for the chosen stack, but preserve this local developer shape:

- Install frontend/backend dependencies.
- Start frontend on a local port and backend API on a local port.
- Run backend health check.
- Run focused backend contract tests for project, graph, simulation, and report state.
- Run frontend build and at least one browser smoke through the first loop.

## Product Quality Rules

- Make the graph, timeline, report, and interaction surfaces readable and inspectable, not raw JSON dumps.
- Show progress for long tasks and retain enough logs/traces to diagnose failure.
- Empty, blocked, running, completed, failed, and already-prepared states must each be distinct.
- Controls must either do real work or be absent.
- User-visible errors should name the failed boundary and the next action.
- Uploaded document privacy and provider submission boundaries must be visible where they matter.

## Forbidden Shortcuts

- Fake provider success.
- Canned report or chat output unrelated to the input prompt/workspace.
- Dead graph refresh, stop, download, delete, or chat controls.
- Swallowed backend exceptions that only log server-side.
- A generic analytics dashboard instead of the five-step simulation workspace.
- Debug/proof vocabulary in user-facing or operator-facing surfaces.


## Dom-specific remap constraints

- Preserve the great Canva-like motion/sleek UI/UX feeling from MiroFish: the app should feel interactive, visual, animated, and clickable, not like a static form/report stack.
- The graph/canvas is a central artifact. It needs selectable nodes/edges, pan/zoom or layout affordances, inspectors, progress states, and visible causal connection to simulation/report output.
- Replace Zep Cloud with an open-source graph-memory implementation. Default to a Graphiti-compatible temporal graph adapter with local/open graph database backing where practical; keep the adapter swappable.
- LLM provider setup must be dynamic: OpenAI-compatible base URL/model/key, clear provider status, and feature-level blocked states.
