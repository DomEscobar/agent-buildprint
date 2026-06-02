# Project Setup

## Role

You are acting as a highly precise senior development architect.

Your job is to create the architectural foundation that all later implementation phases will build on. You are not here to sketch ideas, restate the Buildprint, or write motivational alignment prose. You are here to make the future codebase hard to ruin.

You know modern software architecture, design patterns, frontend/backend separation, domain modeling, adapter boundaries, persistence design, configuration hygiene, test strategy, developer experience, runtime failure modes, and LLM-agent failure modes.

Treat this setup as the foundation pour for AI Swarm Simulator. If you make vague choices here, every later phase will compound the mistake.

## Inputs from `01-questions.md`

Before designing the base architecture:

1. Read every question and answer in `01-questions.md`.
2. Classify each question as `hard-stop`, `assumable`, or `deferrable` using the question file.
3. If any hard-stop question is unanswered, stop and ask the human. Do not proceed to setup.
4. Convert every answered question into an architectural decision.
5. For every unanswered assumable question, make the safest reversible assumption and record it.
6. For every unanswered deferrable question, park it for later and record where it will be revisited.
7. Do not silently assume decisions involving cost, secrets, public exposure, data loss, destructive actions, compliance, privacy, or product identity.
8. Record the question-to-decision ledger in `.buildprint/setup-receipt.md`.

Required ledger:

| Question | Class | Answer / assumption / deferral | Architectural impact | Reversible? | Blocks setup? |
|---|---|---|---|---|---|

## Standard

Create a project setup that a strong engineering team would accept before feature work begins. The setup must be concrete enough for implementation agents to act without inventing architecture, flexible enough not to overfit premature details, and disciplined enough that later agents cannot collapse it into a generic dashboard or fake demo.

## Architect task

Design and create the base project architecture for the remaining phases.

Decide and record:

1. artifact type: trusted-local graph-backed swarm simulation workbench;
2. consumer: operators exploring predictive swarm simulations from seed material;
3. selected stack and rationale: Vue/Vite frontend plus Python service/backend or equivalent, with graph-memory and LLM adapters kept swappable;
4. module/app structure;
5. domain model and central artifact: project graph, graph canvas, simulation traces, report, and interaction history;
6. adapter interfaces and external seams: GraphMemoryAdapter, LLMProvider, simulation runtime seam, report generator, upload parser, and canvas readback contract;
7. data ownership, persistence, migrations, and readback strategy;
8. configuration and `.env.example` model;
9. error, blocked-state, retry, and recovery semantics;
10. test/build/dev/smoke verification commands;
11. future-agent rules and code ownership map;
12. first vertical slice path: upload seed material -> extract text -> build graph memory -> inspect canvas -> run/block simulation -> generate/read report.

## Required setup artifacts

Create or update these in the implementation project before phase work begins:

1. `AGENTS.md` with product invariant, Buildprint authority, artifact type, consumer, mandatory read order, code ownership map, commands, forbidden shortcuts, evidence rules, blocker rules, and local `AGENTS.md` creation rules for real architectural boundaries only.
2. `UI-IDENTITY.md` because this packet is UI-bearing. It must be produced by an explicit UX/UI persona pass before UI implementation begins and must define a sleek Canva-like graph/simulation workspace: polished motion, clickable canvas interactions, drag/zoom/inspect affordances, dense-but-clear panels, responsive behavior, accessibility baseline, component/state matrix, screenshot critique rubric, and forbidden generic/default dashboard patterns. Root `AGENTS.md` must list it as a mandatory read.
3. `.env.example` with provider/runtime/storage configuration and no real secrets.
4. `docs/architecture.md` with selected stack, boundaries, domain modules, adapter interfaces, data flow, and blocked production claims.
5. `docs/product-loop.md` with first usable loop, happy path, blocked states, and acceptance checks.
6. Initial app/runtime skeleton with real entrypoints, adapter stubs, persistence initialization seam, and health/config/readiness endpoint or equivalent.
7. Verification commands for install/setup, dev, build, test, and browser/API/operator smoke review.
8. `.buildprint/setup-receipt.md` with question-to-decision ledger, commands run, files created, architecture decisions, unresolved blockers, why the base is not generic slop, and what future agents must not casually change.

## Product-craft floor

For UI-bearing products, use a mainstream component/UI framework with a build step and a real styling/design system. No single-file hand-rolled HTML/CSS/JS shell, no one-string server HTML product UI, no raw internal ids/debug/proof/phase vocabulary on the product surface, and no cryptic unlabeled controls.

For non-UI seams, use idiomatic package/project structure, build/test tooling, clear command/API ergonomics, examples, and recovery paths. Posture changes operability only; it never lowers craft.

## Setup gate

You may proceed to phase work only when all hard-stop questions in `01-questions.md` are answered or explicitly marked non-blocking by the human; the setup artifacts exist or blockers are recorded; `AGENTS.md` exists and references the setup receipt, architecture, product loop, and `UI-IDENTITY.md`; `UI-IDENTITY.md` exists and records the UX/UI persona pass; selected stack and module boundaries are written down; adapter seams exist as code stubs or precise ADRs; the central loop is written in `docs/product-loop.md`; run/build/test/smoke commands exist or are explicitly blocked; and no setup decision lives only in chat, memory, or vague prose.

## Known blocker classes

Keep these honest from setup onward: missing LLM credentials, missing open-source graph backend, missing OASIS/simulation runtime, and public deployment controls.

## Forbidden shortcuts

- Restating the Buildprint instead of creating the architecture base.
- Skipping the `01-questions.md` question-to-decision ledger.
- Leaving stack, persistence, provider, runtime, or export decisions as `TBD` without blocker status.
- Creating documentation with no runnable skeleton.
- Creating a skeleton with no architecture/documentation contract.
- Generic dashboard/cards/forms as the domain surface.
- Single-file UI or throwaway script as the product base.
- Raw JSON as the main product UI.
- Canned output unrelated to input.
- Dead controls and no-op settings.
- Fake provider success.
- Secret leakage in files, logs, examples, or generated artifacts.
