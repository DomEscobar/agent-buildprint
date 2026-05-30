# Project Setup

This file turns the product north star into implementation alignment. Complete this setup gate before starting any phase. The downstream implementation may choose its exact stack, but it must preserve the product shape and proof boundaries here.

## Blueprint mode

- `blueprint_mode.primary`: `product`
- `phase_style`: `outcome_flow`
- Secondary surfaces: browser UI, API service, worker/runtime, provider adapters, durable state, report artifacts.
- Qualification label: `PROOF_REQUIRED`
- Setup tier: `full_setup`

This is a UI-bearing, provider-backed, stateful product packet. The graph canvas is the central artifact, not decoration. Simulation, report, and interaction surfaces are downstream consequences of the graph-backed scenario world.

## Source-evidenced product anchors

- The source describes MiroFish as a multi-agent AI prediction engine that builds a parallel digital world from seed materials and returns both a prediction report and an interactive simulated world (`source/MiroFish/README.md:27`, `source/MiroFish/README.md:31`, `source/MiroFish/README.md:86`).
- Required credentials are LLM and Zep API keys, and the source warns that simulations can consume significant model budget (`source/MiroFish/README.md:115`, `source/MiroFish/README.md:121`, `source/MiroFish/README.md:127`).
- The home/intake surface accepts `.pdf`, `.md`, and `.txt` files plus a simulation prompt and only enables start when both are present (`source/MiroFish/frontend/src/views/Home.vue:136`, `source/MiroFish/frontend/src/views/Home.vue:181`, `source/MiroFish/frontend/src/views/Home.vue:238`).
- Backend ontology generation accepts uploaded files, simulation requirement, project name, and context; it extracts text, generates entity and edge types, persists project metadata, and returns ontology plus files and text length (`source/MiroFish/backend/app/api/graph.py:122`, `source/MiroFish/backend/app/api/graph.py:175`, `source/MiroFish/backend/app/api/graph.py:210`, `source/MiroFish/backend/app/api/graph.py:215`, `source/MiroFish/backend/app/api/graph.py:238`).
- Ontology generation is specifically shaped for social-media public-opinion simulation: real speaking subjects, exactly ten entity types with Person and Organization fallbacks, six to ten relationship types, and reserved attribute names (`source/MiroFish/backend/app/services/ontology_generator.py:29`, `source/MiroFish/backend/app/services/ontology_generator.py:41`, `source/MiroFish/backend/app/services/ontology_generator.py:95`, `source/MiroFish/backend/app/services/ontology_generator.py:120`, `source/MiroFish/backend/app/services/ontology_generator.py:128`).
- Project state persists files, extracted text, ontology, graph id, task id, requirement, chunking settings, and error status under project directories (`source/MiroFish/backend/app/models/project.py:26`, `source/MiroFish/backend/app/models/project.py:101`, `source/MiroFish/backend/app/models/project.py:168`, `source/MiroFish/backend/app/models/project.py:274`).
- Graph build requires Zep, validates project state, starts a background task, chunks text, creates a graph, sets ontology, adds text batches, waits for processing, fetches graph data, and records task progress/result (`source/MiroFish/backend/app/api/graph.py:260`, `source/MiroFish/backend/app/api/graph.py:286`, `source/MiroFish/backend/app/api/graph.py:364`, `source/MiroFish/backend/app/api/graph.py:377`, `source/MiroFish/backend/app/api/graph.py:398`, `source/MiroFish/backend/app/api/graph.py:411`, `source/MiroFish/backend/app/api/graph.py:423`, `source/MiroFish/backend/app/api/graph.py:440`, `source/MiroFish/backend/app/api/graph.py:462`, `source/MiroFish/backend/app/api/graph.py:470`).
- The graph UI already demonstrates real workbench intent: layout modes, refresh, maximize, canvas rendering, node/edge inspectors, self-loop grouping, edge-label toggles, legends, force layout, zoom, drag, and selection highlighting (`source/MiroFish/frontend/src/views/MainView.vue:10`, `source/MiroFish/frontend/src/components/GraphPanel.vue:7`, `source/MiroFish/frontend/src/components/GraphPanel.vue:17`, `source/MiroFish/frontend/src/components/GraphPanel.vue:51`, `source/MiroFish/frontend/src/components/GraphPanel.vue:216`, `source/MiroFish/frontend/src/components/GraphPanel.vue:227`, `source/MiroFish/frontend/src/components/GraphPanel.vue:328`, `source/MiroFish/frontend/src/components/GraphPanel.vue:491`, `source/MiroFish/frontend/src/components/GraphPanel.vue:662`, `source/MiroFish/frontend/src/components/GraphPanel.vue:698`).
- Simulation preparation reads graph entities, generates OASIS profiles, generates simulation config, saves artifacts, and tracks status through background tasks (`source/MiroFish/backend/app/api/simulation.py:359`, `source/MiroFish/backend/app/api/simulation.py:471`, `source/MiroFish/backend/app/api/simulation.py:490`, `source/MiroFish/backend/app/services/simulation_manager.py:115`, `source/MiroFish/backend/app/services/simulation_manager.py:230`).
- Runtime state includes dual-platform action counts, rounds, elapsed simulation time, run status, process id, recent actions, and durable `run_state.json` storage (`source/MiroFish/backend/app/services/simulation_runner.py:48`, `source/MiroFish/backend/app/services/simulation_runner.py:101`, `source/MiroFish/backend/app/services/simulation_runner.py:196`, `source/MiroFish/backend/app/services/simulation_runner.py:299`).
- Report generation is asynchronous, reuses simulation and graph context, creates a report agent, persists report artifacts, and supports completed-report reuse (`source/MiroFish/backend/app/api/report.py:25`, `source/MiroFish/backend/app/api/report.py:72`, `source/MiroFish/backend/app/api/report.py:138`, `source/MiroFish/backend/app/api/report.py:153`, `source/MiroFish/backend/app/api/report.py:159`).
- The report and interaction UI is a sectioned workspace with tool traces, metrics, collapsible sections, report-agent chat, simulated-agent selection, and survey mode (`source/MiroFish/frontend/src/components/Step4Report.vue:1`, `source/MiroFish/frontend/src/components/Step4Report.vue:20`, `source/MiroFish/frontend/src/components/Step4Report.vue:88`, `source/MiroFish/frontend/src/components/Step4Report.vue:218`, `source/MiroFish/frontend/src/components/Step5Interaction.vue:79`, `source/MiroFish/frontend/src/components/Step5Interaction.vue:92`, `source/MiroFish/frontend/src/components/Step5Interaction.vue:118`, `source/MiroFish/frontend/src/components/Step5Interaction.vue:135`).

## Obligation / surface matrix

| Surface id | Surface name | Owning phase | User-visible obligation | Readiness |
|---|---|---:|---|---|
| surface-scenario-intake-console | Scenario intake console | 1 | Accept files plus scenario requirement, validate inputs, create/load a project, persist original files and extracted text, and show honest errors. | INCLUDED_NEEDS_PROOF |
| surface-ontology-review-lane | Ontology review lane | 1 | Generate and inspect domain-shaped entity/relationship types, attributes, examples, analysis summary, and reserved-name validation. | INCLUDED_NEEDS_PROOF |
| surface-graph-canvas-workbench | Graph canvas workbench | 2 | Build/reload a graph-backed world and make nodes, edges, self-relations, legends, labels, selection, drag, pan/zoom, refresh, and simulation-memory cues real. | INCLUDED_NEEDS_PROOF |
| surface-simulation-preparation-board | Simulation preparation board | 3 | Convert graph entities into personas and platform config with visible counts, readiness, files, and blocked-provider state. | INCLUDED_NEEDS_PROOF |
| surface-dual-platform-event-monitor | Dual-platform event monitor | 3 | Run or deterministically replay a bounded dual-platform rehearsal and show rounds, elapsed time, action stream, platform status, stop/recovery, and runtime errors. | INCLUDED_NEEDS_PROOF |
| surface-prediction-report-workspace | Prediction report workspace | 4 | Generate a sectioned report from simulation artifacts, show planning/tool traces, persist/reload report content, and avoid canned generic analysis. | INCLUDED_NEEDS_PROOF |
| surface-interaction-console | Interaction console | 4 | Let the user chat with the report agent or selected simulated agents and send survey-style prompts against stored simulation context. | INCLUDED_NEEDS_PROOF |

Every glance surface in `BUILDPRINT.md` appears exactly once above. Feature phases must own listed surfaces. The final review/handover phase owns no product surface by design; it reviews every listed surface and writes closeout artifacts. Do not drop a listed product surface without a blocker or explicit user exclusion.

## Architecture decisions

- Use a real browser application with componentized surfaces and a build step. Do not implement this as one HTML file, a raw CRUD admin, or a static SVG demo.
- Use an API service with schema-validated request/response contracts for projects, ontology, graph data, simulations, reports, and interactions.
- Use durable local persistence by default. Projects, uploads, extracted text, ontology JSON, graph ids, simulation state, generated personas/config, run state, actions, reports, and chat history must reload after restart.
- Use background-job ownership for graph build, simulation preparation, simulation run, and report generation. Jobs must have status, progress, messages, result, and error state.
- Keep provider adapters behind interfaces: LLM ontology/profile/report generation, Zep graph storage, and OASIS runtime. Local deterministic adapters are allowed only as sandbox mode and must be labeled as such in evidence.
- The graph canvas must be a first-class implementation boundary with layout state and interaction tests. Its state cannot be represented only as tags, chips, cards, or a list of labels.
- Generate domain-shaped deterministic fixtures from seed text and prediction goals. The sandbox path must change output when inputs change.
- `AGENTS.md` in the downstream repo is a scope governor, not a product brain. Create root `AGENTS.md` plus local setup docs that point back to this packet and embed the generated alignment speech.

## Required foundation scaffold

Before any phase code, create or update:

- `AGENTS.md` at implementation root, naming `BUILDPRINT.md`, `01-questions.md`, `generated/agent-prompt.md`, `02-project-setup.md`, `blueprint.yaml`, and active phase files as required reads.
- `.buildprint/setup.md` or `.buildprint/setup/` with chosen stack, dev commands, env variable names, provider modes, and evidence ledger path.
- `architecture.md` covering frontend/backend/domain/provider/persistence/worker/report boundaries.
- `engineering-standards.md` covering typed/schema-validated contracts, error handling, accessibility, test naming, and no-placeholder rules.
- `proof-strategy.md` covering unit/API/build/browser/runtime checks and what each proof can and cannot claim.
- `ui-identity.md` describing the simulation-lab workbench style, central graph behavior, responsive constraints, and forbidden UI shortcuts.

## Provider and runtime policy

- Env var names may be documented: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, `ZEP_API_KEY`, `OASIS_DEFAULT_MAX_ROUNDS`, `REPORT_AGENT_MAX_TOOL_CALLS`, `REPORT_AGENT_MAX_REFLECTION_ROUNDS`, `REPORT_AGENT_TEMPERATURE`.
- Do not include secret values. Missing credentials must produce a visible blocked-provider state and a blocker evidence row, not a fake pass.
- Deterministic sandbox mode must use the same project, graph, simulation, report, and interaction contracts as live mode.
- Live provider claims require matching live/sandbox-provider evidence. Deterministic adapter tests prove local product flow only.

## Runnable verification commands

Adapt exact commands to the chosen stack, but maintain the proof categories:

- Install/build: package install command, backend dependency install command, frontend build command, backend import/start smoke.
- Static quality: typecheck or schema check, lint, format check if available.
- Unit/API: project creation, file parsing, ontology validation, graph adapter, job state, persistence roundtrip, simulation config, report artifact, chat/session tests.
- Browser/e2e: intake validation, ontology inspector, graph canvas interactions, simulation monitor event flow, report generation, interaction console, reload persistence.
- Runtime proof: start services locally, execute a deterministic scenario, save stdout/stderr under `.buildprint/phase-runs/<phase-id>/`, and record artifact paths.
- Anti-slop: run `npx aislop scan --changes` when available or document a deterministic manual scan for TODO stubs, dead handlers, hallucinated imports, fake comments, swallowed errors, mock-only branches, and placeholder copy.

## Production readiness and claim ceiling

Initial claim ceiling is `target`. A phase can reach `phase_core_passed` only after local executable proof for its owned surface. `claim_qualified` is blocked until matching browser, persistence, provider, worker/runtime, security, and no-fake evidence exists.

The packet intentionally remains `PROOF_REQUIRED` because live LLM, Zep, and OASIS provider behavior was not executed during mapping. The implementation must preserve those capabilities as adapters and blockers, not remove them from scope.
