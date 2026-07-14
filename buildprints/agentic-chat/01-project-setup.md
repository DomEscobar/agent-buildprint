# 01 Project Setup

This is the foundation pour. Before any identity or phase code, create enough architecture, project structure, standards, local skill harness, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `references/runtime-techniques-basis.md`
- `00-questions.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `02-ui-identity.md` or `03-phases/*` until setup has enough concrete decisions to guide coding, the project-local skill harness exists, and the architecture/file-structure readiness gate passes.

## Setup objective

Create the real base project structure for Agentic Chat, centered on a real-model streaming chat turn that persists messages, trace events, provider route, usage telemetry, and blocked states in a way a user can inspect and continue. Read `references/runtime-techniques-basis.md` and design the **full runtime composition** during setup — not only streaming tables. The architecture must name the stateful harness boundary, append-only session event log, budget governor, loop breaker, context packing pipeline, trust zones, action screening, capability grants, verifier path, and run receipt export, even when phase 04 implements them. Choose a provider that exposes native tool/function calling (or a structured-output equivalent), since the agentic and swarm claims depend on model-driven action selection, not keyword matching. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define the architecture diagrams, module boundaries, project file structure, persistence model, provider/runtime seams, concurrency model for subagents, commands, safety rules, and verification strategy. The goal is not to over-plan; the goal is to prevent the next agent from building generic slop.

Name at least one concrete, real tool/skill (or MCP server) that phase 04 will implement or wire itself as the live tool-calling proof target — for example a working calculator, a local file/note lookup, or a real weather/search call. Do not defer all tool capability to "the user will add tools later" or assume an external/pre-existing tool is enough; phase 04 must author or configure at least one working capability itself. Record the chosen first tool/skill and its architecture mapping in `docs/architecture.md`. Confirm the selected provider from `00-questions.md` will actually run live (a reachable local model runtime or a configured paid key) — the deterministic provider never substitutes for this proof.

The setup output should make the identity step and first implementation phase obvious: where code goes, what commands run, how state persists, what is mocked in tests, what is blocked in live mode, and what good enough to continue means.

## Architecture and structure readiness gate

Project setup must create a product-specific architecture packet before identity or implementation starts. The packet is a build input, not documentation after the fact. Create these files unless the implementation project already has stronger equivalents:

- `architecture/system-architecture.md`
- `architecture/agent-runtime-loop.md`
- `architecture/chat-turn-sequence.md`
- `architecture/state-and-memory-model.md`
- `architecture/failure-recovery-flow.md`
- `PROJECT_STRUCTURE.md`
- `ARCHITECTURE_STRUCTURE_TRACE.md`

Each `architecture/*.md` file must include a Mermaid diagram, component legend, state or data ownership notes where relevant, failure/blocked states where relevant, and an `Implementation Mapping` section that maps every named component to planned files/modules. A diagram is invalid if it is only a generic layer sketch such as `Frontend -> Backend -> Database`, or if it uses generic unlabeled boxes like `API`, `Auth`, `Agent`, `Service`, `Utils`, or `DB` without product/runtime responsibility.

Required diagram rules:

- Every edge must be labeled with the data, event, command, policy decision, approval, observation, or error flowing across it.
- Component names must describe Agentic Chat responsibilities, such as `Chat Composer`, `Streaming Response Renderer`, `Chat API Route`, `Agent Runtime Harness`, `Agent Loop Orchestrator`, `Context Packing Layer`, `Budget Policy Governor`, `Loop Breaker`, `Action Screening Gate`, `Capability Grant Registry`, `Tool Invocation Registry`, `Session Event Log`, `Run Receipt Exporter`, `Conversation State Store`, `Memory Retrieval Layer`, `Approval Gate`, `Verifier Gate`, `Failure Recovery Controller`, or sharper stack-specific equivalents.
- The system architecture must show UI, API/runtime, provider adapter, persistence, telemetry/trace, blocked-state, and deployment/secret boundaries.
- The agent runtime loop must show harness boundary, observe, interpret/plan, context pack, act, screen action, grant capability, inspect observation, critique/retry, verify/done-check, budget/loop-break decisions, update state, continue/stop, and explicit approval or blocked paths.
- The chat-turn sequence must show a real user turn from composer through streaming transport, provider, persistence, UI event rendering, cancellation/error paths, and readback.
- The state and memory model must separate durable records, append-only session events, ephemeral runtime state, context packing/trust zones, capability grants, provider route/usage telemetry, memory read/write/skip/block decisions, budget consumption, and claim ceilings.
- The failure recovery flow must show provider failure, timeout, cancellation with dangling tool-call repair, budget exhaustion, loop-break stop, unavailable credentials, tool/memory/delegation blocked states, retry budget, idempotency on write/external effects, and user-visible recovery.

`PROJECT_STRUCTURE.md` must describe the intended file tree by product/runtime responsibility, not by vague technical buckets. A structure based mainly on `components/`, `utils/`, `services/`, `api/`, or `pages/` is invalid unless each folder is narrowed by product responsibility and mapped to architecture. Every top-level source area must state:

- Purpose and ownership.
- What belongs there.
- What explicitly does not belong there.
- Which architecture component(s) it implements.
- Which tests/evals prove it.

`ARCHITECTURE_STRUCTURE_TRACE.md` must prove traceability before code begins:

- Every architecture component maps to one or more planned files/modules or an explicit blocker.
- Every important planned file/module maps back to an architecture component.
- Every runtime responsibility has a test, eval, command, or explicit proof blocker.
- No miscellaneous dumping ground (`misc`, `helpers`, `utils`, `services`, `lib`) is allowed without a narrow named responsibility.
- Any missing component, missing file owner, generic folder, unlabeled edge, stale diagram, or unproven runtime responsibility is a setup blocker.

Use this anti-lazy quality rubric and record the score in `.buildprint/setup-receipt.md`:

- `0` - generic boxes or generic file tree; useless.
- `1` - technical layers only; no Agentic Chat responsibilities.
- `2` - some product-specific names but weak flow/ownership.
- `3` - concrete components, labeled flows, and plausible structure.
- `4` - component-to-code mapping, state ownership, and proof mapping.
- `5` - score 4 plus failure paths, claim ceilings, and eval/test mapping.

The build may continue only with architecture score `4` or `5`, or with an exact external blocker that keeps the claim ceiling below implementation.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, record applicable/not applicable gates, command/proof path, and blocker if missing inside `docs/architecture.md`. Do not add irrelevant gates just to look thorough. Matching gates need a real proof path or an honest blocker.

Use `proven_implementation_requirements` in `blueprint.yaml` to choose libraries, SDKs, runtimes, and platform services for hard domains. The selected packet should stay stack-neutral, but setup is not allowed to casually hand-roll fixed-format export, rich editing, document extraction, drag/reorder interactions, charts/diagrams, provider clients, task orchestration, or migrations. If a from-scratch alternative is chosen, `docs/architecture.md` must justify it and name the proof that will show it satisfies the same product bar as a proven tool path.

For UI-bearing artifacts, setup must also choose a proven frontend runtime and styling/design-system path. `docs/architecture.md` must include a `## Framework And Styling Decisions` section that names the selected UI runtime/framework, selected styling/design-system path, rejected alternatives, proof commands, and how the chosen tools cover stateful screen composition, component states, design tokens, and responsive viewport proof. Default to `React + Vite + TypeScript` for UI runtime and `Tailwind CSS v4 + tokenized CSS variables` for styling unless the source/host project already proves a different framework. Vanilla/static DOM/CSS is allowed only with an explicit `ui_stack_exception` entry that names why a framework is inappropriate and what proof will cover equivalent UI-state complexity.

## Stack selection (from 00-questions)

The stack is **stack-neutral and chosen by the user** via the stack and provider questions in `00-questions.md`. Do not hard-commit a toolset in this packet. Record the user's selected provider/model, frontend/backend framework, and persistence choice in `docs/architecture.md`. What this packet enforces is **stack-independent behavior and contracts**, not a fixed toolset:

- Real-model outcome floor: a real, user-selected provider must stream tokens incrementally. The deterministic provider is a **test double** for automated tests only, never the delivered product turn.
- Provider layer: a local `ChatProvider` interface with the signature `stream(req, signal): AsyncIterable<ProviderStreamEvent>` plus `countTokens(messages)`, so no provider-specific code leaks into the runtime. The concrete client/SDK is the user's choice.
- Streaming: an incrementally readable transport (SSE or equivalent) with token-by-token rendering and end-to-end cancellation; buffered-after-completion responses do not qualify.
- Persistence: a durable store with a typed schema and a migration path for `session`, `message`, `turn`, `stream_event`, `provider_route`, and `telemetry`.
- Behavioral depth (required regardless of stack): a normalized provider error taxonomy and a bounded retry/backoff policy.
- Agentic depth (built in phases 04-05, seamed now): model-driven action selection via provider tool/function calling; a typed tool/skill/MCP/memory policy → approval → execution → observation path with audit records; scoped memory read/write decisions; and a supervisor/worker swarm with a real bounded-concurrency primitive, isolated per-subagent context, scoped tool access, fan-in synthesis, cancellation, and resumable persistence. These require typed runtime paths, policy states, audit records, and proof before their claims. Design these seams during setup; do not stub or fake them, and do not select a keyword/regex intent classifier as the action selector.
- Persistence must be designed to extend to `session_event`, `agent_harness`, `budget_policy`, `run_receipt`, `agent_run`/`agent_step`/`action_request`/`approval_record`/`action_result`/`memory_entry` (phase 04) and `swarm_run`/`delegation_ledger`/`subtask_spec`/`subagent_run`/`aggregation_record` (phase 05) via the migration path, not only the foundation tables.

Suggested (non-binding) starting points if the user expresses no preference: local Ollama for the free real-model path, the Vercel AI SDK for provider clients, SSE transport, and SQLite for persistence. The UI runtime/styling default below still applies unless the user selects otherwise.

Architecture is a best-effort engineering decision, not a thin stack list. `docs/architecture.md` must reason about scalability, maintainability, and the coding standards the build will enforce. Name the scalability seams - data growth, concurrency, load, and feature growth - and where the design absorbs that growth without a rewrite. Name the module boundaries, separation of concerns, and testability that keep the code maintainable as phases stack on it. Name the enforced coding standards and best practices the build must follow - SOLID, KISS, DRY, typed boundaries, and explicit error handling - and the lint, format, and type-check gates that enforce them. A thin or default architecture that ignores scalability, maintainability, or coding standards is a setup failure, not a minimal-scope win.

Initialize the local Buildprint skill harness before identity or phase work. `blueprint.yaml` declares `harness.provider` and `harness.profiles`; use those values as the source of truth. If `agb` is available, run `agb harness init . --provider agents` with the declared `--profile` flags from `blueprint.yaml` or `.buildprint/next-agent.md`. Otherwise create the same project-local harness manually. The default provider is `agents`, which must patch or create `AGENTS.md`, add local core skill files for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`, and place them only in the portable `.agents/skills/` folder. Provider-specific folders such as `.claude/skills/`, `.cline/skills/`, or `.cursor/rules/` require an explicit, evidence-backed provider selection; never create multiple provider folders by detection alone. Selected profiles add focused skills only when declared: `webapp`, `backend`, `agentic`, or `full`. Every skill must declare `triggers`, `skips`, and `completion_signal`; phase handoffs must include the relevant completion signal. Do not install global skills, clone third-party skill packs, or copy upstream skill files without an explicit user request.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, verification expectations, and Buildprint Skill Harness section.
- `.agents/skills/setup-runbook/SKILL.md`, `.agents/skills/frontend-ui-product-design/SKILL.md`, `.agents/skills/subagent-driven-implementation/SKILL.md`, and `.agents/skills/verify-and-review/SKILL.md`, plus selected profile skills under `.agents/skills/` only for the default provider.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, golden path, central output contract, proof strategy, selected typed quality gates, command/proof paths, blockers, and claim ceilings.
- `architecture/system-architecture.md`, `architecture/agent-runtime-loop.md`, `architecture/chat-turn-sequence.md`, `architecture/state-and-memory-model.md`, and `architecture/failure-recovery-flow.md` - Mermaid architecture packet with labeled edges, component legends, implementation mappings, state/failure notes, and claim ceilings.
- `PROJECT_STRUCTURE.md` - product/runtime-responsibility file tree with ownership, exclusions, architecture mapping, and proof mapping.
- `ARCHITECTURE_STRUCTURE_TRACE.md` - component-to-file-to-proof traceability matrix and anti-lazy architecture score.
- `docs/architecture.md` must also name selected package/runtime/service choices for every applicable `proven_implementation_requirements` domain, including frontend UI runtime, component/state styling, responsive viewport proof, and design token enforcement for UI-bearing artifacts, or record why no hard-domain library requirement applies.
- `docs/architecture.md` must include `## Framework And Styling Decisions` for UI-bearing artifacts, with the chosen runtime/framework, styling/design-system path, rejected alternatives, proof commands, UI-state complexity mapping, and any `ui_stack_exception`.
- `docs/architecture.md` must include an engineering quality bar: named scalability seams, maintainability boundaries with separation of concerns and testability, and enforced coding standards (SOLID, KISS, DRY, typed boundaries, explicit error handling) with the lint, format, and type-check gates that enforce them.
- `.env.example` - exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` - decisions made, assumptions, blockers, commands discovered, and identity-step readiness.

## DO NOT

- Do not start identity or feature phase code before foundation exists.
- Do not start phase work while `.buildprint/decisions.md` still contains the empty stub; all hard-stop questions from `00-questions.md` (provider/model, stack/framework, design direction, and the safety/scope gates) must be resolved first with `answer`, `confirmed_by`, `reversible`, and `blocks_setup` fields.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hand-roll hard domains when proven libraries/runtimes exist unless the alternative is justified and proof-bound.
- Do not use static DOM scripting, plain CSS, or custom DOM updates as the UI architecture for a UI-bearing artifact unless `ui_stack_exception` is explicit and proof-bound in `docs/architecture.md`.
- Do not ship a thin or default architecture that omits scalability seams, maintainability boundaries, or enforced coding standards just to keep scope minimal.
- Do not ship generic architecture diagrams with unlabeled arrows, vague boxes, or no component-to-code mapping.
- Do not ship a generic project structure organized mainly as `components`, `utils`, `services`, `api`, `pages`, or `lib` without product/runtime responsibility, ownership, exclusions, and architecture traceability.
- Do not start implementation until `architecture/*.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md` exist and pass the readiness gate.
- Do not hide hard-stop questions as assumptions.
- Do not skip `agb harness init . --provider agents` or the equivalent manual local harness creation before identity or phase work.
- Do not skip `agb harness check . --provider agents` after harness initialization or `agb harness checkup . --provider agents` before phase implementation; record checkup warnings as setup blockers or accepted claim ceilings.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
- Do not create `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`; keep setup decisions inside `docs/architecture.md`, `blueprint.yaml`, and handoff notes.
- Do not make a landing page when the product needs an operational product surface, API, CLI, worker, or runtime first.

## Minimum proof before moving on

- `.buildprint/decisions.md` records confirmed answers (or honest blockers) for all hard-stop questions from `00-questions.md` (including provider/model, stack/framework, and design direction alongside the safety/scope gates); each row includes `answer`, `confirmed_by`, `reversible`, and `blocks_setup`; `confirmed_by` is `user`, `explicit_user_delegation`, or `blocker`, never `agent_assumption`; the file must not contain the empty "No implementation decisions recorded yet" stub;
- setup artifacts exist and are specific to this product;
- `AGENTS.md` has a Buildprint Skill Harness section;
- local core skill files exist for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`;
- local skill frontmatter includes `triggers`, `skips`, and `completion_signal`;
- `agb harness check . --provider agents` passes, and `agb harness checkup . --provider agents` has no unresolved fail result before phase work;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/architecture.md` exists and names stack, runtime topology, persistence, providers, commands, central output contract, selected typed quality gates, proof surfaces, blockers, and claim ceilings;
- `architecture/system-architecture.md`, `architecture/agent-runtime-loop.md`, `architecture/chat-turn-sequence.md`, `architecture/state-and-memory-model.md`, and `architecture/failure-recovery-flow.md` exist, contain valid Mermaid diagrams, use product-specific component names, label every edge, and include implementation mappings;
- `PROJECT_STRUCTURE.md` exists and maps the planned file tree to product/runtime responsibilities, explicit exclusions, architecture components, and tests/evals;
- `ARCHITECTURE_STRUCTURE_TRACE.md` exists and proves every architecture component maps to planned files/modules and proof, records no generic dumping-ground folders, and records architecture score `4` or `5` or an exact blocker;
- `docs/architecture.md` records proven library/runtime decisions for applicable hard domains or honest blockers;
- `docs/architecture.md` records Framework And Styling Decisions for UI-bearing artifacts: frontend framework/runtime, styling/design-system path, rejected alternatives, proof commands, UI-state complexity mapping, and any `ui_stack_exception`;
- `docs/architecture.md` names scalability seams, maintainability boundaries, and enforced coding standards (SOLID, KISS, DRY, typed boundaries, error handling) with lint/format/type-check gates;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- `02-ui-identity.md` can start without guessing the architecture or whether the local skill harness exists.
