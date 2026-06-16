# 01 Project Setup

This is the foundation pour. Before any identity or phase code, create enough architecture, standards, local skill harness, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `02-ui-identity.md` or `03-phases/*` until setup has enough concrete decisions to guide coding and the project-local skill harness exists.

## Setup objective

Create the real base project structure for Agentic Chat, centered on a streaming personal agent chat turn that persists messages, trace events, memory, provider usage, tool decisions, and blocked states in a way a user can inspect and continue. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define the module boundaries, persistence model, provider/runtime seams, commands, safety rules, and verification strategy. The goal is not to over-plan; the goal is to prevent the next agent from building generic slop.

The setup output should make the identity step and first implementation phase obvious: where code goes, what commands run, how state persists, what is mocked in tests, what is blocked in live mode, and what good enough to continue means.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, record applicable/not applicable gates, command/proof path, and blocker if missing inside `docs/architecture.md`. Do not add irrelevant gates just to look thorough. Matching gates need a real proof path or an honest blocker.

Use `proven_implementation_requirements` in `blueprint.yaml` to choose libraries, SDKs, runtimes, and platform services for hard domains. The selected packet should stay stack-neutral, but setup is not allowed to casually hand-roll fixed-format export, rich editing, document extraction, drag/reorder interactions, charts/diagrams, provider clients, task orchestration, or migrations. If a from-scratch alternative is chosen, `docs/architecture.md` must justify it and name the proof that will show it satisfies the same product bar as a proven tool path.

Architecture is a best-effort engineering decision, not a thin stack list. `docs/architecture.md` must reason about scalability, maintainability, and the coding standards the build will enforce. Name the scalability seams - data growth, concurrency, load, and feature growth - and where the design absorbs that growth without a rewrite. Name the module boundaries, separation of concerns, and testability that keep the code maintainable as phases stack on it. Name the enforced coding standards and best practices the build must follow - SOLID, KISS, DRY, typed boundaries, and explicit error handling - and the lint, format, and type-check gates that enforce them. A thin or default architecture that ignores scalability, maintainability, or coding standards is a setup failure, not a minimal-scope win.

Initialize the local Buildprint skill harness before identity or phase work. `blueprint.yaml` declares `harness.provider` and `harness.profiles`; use those values as the source of truth. If `agb` is available, run `agb harness init . --provider agents` with the declared `--profile` flags from `blueprint.yaml` or `.buildprint/next-agent.md`. Otherwise create the same project-local harness manually. The default provider is `agents`, which must patch or create `AGENTS.md`, add local core skill files for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`, and place them only in the portable `.agents/skills/` folder. Provider-specific folders such as `.claude/skills/`, `.cline/skills/`, or `.cursor/rules/` require an explicit, evidence-backed provider selection; never create multiple provider folders by detection alone. Selected profiles add focused skills only when declared: `webapp`, `backend`, `agentic`, or `full`. Every skill must declare `triggers`, `skips`, and `completion_signal`; phase handoffs must include the relevant completion signal. Do not install global skills, clone third-party skill packs, or copy upstream skill files without an explicit user request.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, verification expectations, and Buildprint Skill Harness section.
- `.agents/skills/setup-runbook/SKILL.md`, `.agents/skills/frontend-ui-product-design/SKILL.md`, `.agents/skills/subagent-driven-implementation/SKILL.md`, and `.agents/skills/verify-and-review/SKILL.md`, plus selected profile skills under `.agents/skills/` only for the default provider.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, golden path, central output contract, proof strategy, selected typed quality gates, command/proof paths, blockers, and claim ceilings.
- `docs/architecture.md` must also name selected package/runtime/service choices for every applicable `proven_implementation_requirements` domain, or record why no hard-domain library requirement applies.
- `docs/architecture.md` must include an engineering quality bar: named scalability seams, maintainability boundaries with separation of concerns and testability, and enforced coding standards (SOLID, KISS, DRY, typed boundaries, explicit error handling) with the lint, format, and type-check gates that enforce them.
- `.env.example` - exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` - decisions made, assumptions, blockers, commands discovered, and identity-step readiness.

## DO NOT

- Do not start identity or feature phase code before foundation exists.
- Do not start phase work while `.buildprint/decisions.md` still contains the empty stub; all five hard-stop questions from `00-questions.md` must be resolved first.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hand-roll hard domains when proven libraries/runtimes exist unless the alternative is justified and proof-bound.
- Do not ship a thin or default architecture that omits scalability seams, maintainability boundaries, or enforced coding standards just to keep scope minimal.
- Do not hide hard-stop questions as assumptions.
- Do not skip `agb harness init . --provider agents` or the equivalent manual local harness creation before identity or phase work.
- Do not skip `agb harness check . --provider agents` after harness initialization or `agb harness checkup . --provider agents` before phase implementation; record checkup warnings as setup blockers or accepted claim ceilings.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
- Do not create `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`; keep setup decisions inside `docs/architecture.md`, `blueprint.yaml`, and handoff notes.
- Do not make a landing page when the product needs an operational product surface, API, CLI, worker, or runtime first.

## Minimum proof before moving on

- `.buildprint/decisions.md` records confirmed answers (or honest blockers) for all five hard-stop questions from `00-questions.md`; the file must not contain the empty "No implementation decisions recorded yet" stub;
- setup artifacts exist and are specific to this product;
- `AGENTS.md` has a Buildprint Skill Harness section;
- local core skill files exist for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`;
- local skill frontmatter includes `triggers`, `skips`, and `completion_signal`;
- `agb harness check . --provider agents` passes, and `agb harness checkup . --provider agents` has no unresolved fail result before phase work;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/architecture.md` exists and names stack, runtime topology, persistence, providers, commands, central output contract, selected typed quality gates, proof surfaces, blockers, and claim ceilings;
- `docs/architecture.md` records proven library/runtime decisions for applicable hard domains or honest blockers;
- `docs/architecture.md` names scalability seams, maintainability boundaries, and enforced coding standards (SOLID, KISS, DRY, typed boundaries, error handling) with lint/format/type-check gates;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- `02-ui-identity.md` can start without guessing the architecture or whether the local skill harness exists.

