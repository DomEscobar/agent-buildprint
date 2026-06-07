# 01 Project Setup

This is the foundation pour. Before any phase code, create enough architecture, standards, UI identity, proof strategy, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `03-phases/*` until setup has enough concrete decisions to guide coding.

## Setup objective

Create the real base project structure for the artifact described by `blueprint.yaml`, `00-questions.md`, and the phase objectives. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define the module boundaries, persistence model, provider/runtime seams, UI identity, commands, safety rules, and verification strategy. The goal is not to over-plan; the goal is to prevent the next agent from building generic slop.

The setup output should make the first phase obvious: where code goes, what commands run, how state persists, what is mocked in tests, what is blocked in live mode, and what good enough to continue means.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, decide which gates apply to this artifact and write a short proof matrix: applicable, not applicable, command/proof path, and blocker if missing. Do not add irrelevant gates just to look thorough. If the artifact is UI-bearing, generative, editor-like, or integration/operator-facing, the corresponding gate needs a real proof path or an honest blocker.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` — local implementation constitution, mandatory read order, ownership map, no-fake rules, and verification expectations.
- `docs/architecture.md` — selected stack, runtime topology, adapters, persistence, deployment posture, and state ownership.
- `docs/product-loop.md` — golden path and primary user/operator journey.
- `docs/output-quality.md` — central output, output primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim gates.
- `docs/proof-strategy.md` — commands/tests/browser/API proof, screenshot criteria, provider blocker semantics, and what cannot upgrade claims.
- `docs/proof-matrix.md` — selected typed quality gates from `blueprint.yaml`, each marked applicable/not applicable, with command or inspection path and current blocker.
- `docs/ui-identity.md` or `UI-IDENTITY.md` — required for UI-bearing products; visual identity, interaction model, motion, accessibility, empty/loading/error/blocked states.
- `.env.example` — exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` — decisions made, assumptions, blockers, commands discovered, and first phase readiness.

## DO NOT

- Do not start feature phase code before foundation exists.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hide hard-stop questions as assumptions.
- Do not make a landing page when the product needs a workbench, API, CLI, worker, or runtime first.

## Minimum proof before moving on

- setup artifacts exist and are specific to this product;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/output-quality.md` or an equivalent artifact-specific output contract exists;
- `docs/proof-matrix.md` or equivalent names selected typed quality gates, proof commands/inspection paths, and non-applicable gates;
- UI-bearing artifacts have `UI-IDENTITY.md` or equivalent;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- next active phase can start without guessing the architecture.
