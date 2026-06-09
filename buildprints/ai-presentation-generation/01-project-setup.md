# 01-project-setup

## How to implement this phase

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- current workspace or target project `AGENTS.md` if present

This is the foundation pour. Create the implementation foundation before product phase work. This product is a local/private AI presentation workbench with a web UI, backend API, provider settings, durable presentation state, upload/asset storage, and an export worker. Do not start `02-ui-identity.md` or `03-phases/*` until setup has enough concrete decisions to guide coding and the project-local skill harness exists.

## Setup objective

Create the real base project structure for the artifact described by `blueprint.yaml`, `00-questions.md`, and the phase objectives. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define module boundaries, persistence model, provider/runtime seams, commands, safety rules, verification strategy, setup artifacts, and claim ceilings.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, record applicable/not applicable gates, command/proof path, and blockers inside `docs/architecture.md`.

Use `proven_implementation_requirements` in `blueprint.yaml` to choose libraries and runtimes for hard domains. The packet is stack-neutral, but the implementation is not allowed to casually hand-roll PPTX/PDF export, document extraction, rich editing, drag/reorder interactions, charts/diagrams, provider SDK clients, task orchestration, or migrations. If a from-scratch alternative is chosen, `docs/architecture.md` must justify it and name the proof that will show it satisfies the same product bar.

## Architecture Foundation

Use a full-stack architecture with these responsibilities:

- Frontend app: upload and configuration flow, outline review, template selection, editable slide workbench, chat refinement, presentation mode, dashboard/settings, and export controls.
- Backend API: auth/session, user/provider config, uploads, outline generation, slide generation, image/assets, templates/themes, chat refinement, webhooks, task status, and durable persistence.
- Worker/runtime layer: PPTX/PDF export, document extraction, optional local model startup/pull jobs, and long-running generation/export task tracking.
- Storage: SQL for presentations, slides, templates, chat history, task status, image asset metadata, and webhooks; file/object storage for uploads, generated assets, exported files, and local config.
- Provider layer: text model providers, image providers, local OpenAI-compatible providers, and disabled-image fallback must be explicit configuration states, not hidden mocks.
- Library/runtime choices: choose proven packages or platform services for fixed-format export, rich editing, document parsing, drag/drop, charts/diagrams, provider SDKs, queue/task state, and migrations; record exact package/service choices and why they satisfy `proven_implementation_requirements`.

Source evidence: the mapped source aggregates presentation routes for files, fonts, outlines, presentations, slides, chat, images, Ollama, providers, themes, templates, and PDF/PPTX support in `servers/fastapi/api/v1/ppt/router.py`. It stores presentation and slide records in SQL models with JSON structure/layout/content fields. It exposes provider configuration through frontend validation and Docker/env variables.

## Local Skill Harness

Initialize a project-local harness before phase work:

```bash
agb harness init . --provider agents --profile webapp
agb harness check . --provider agents --profile webapp
agb harness checkup . --provider agents --profile webapp
```

If `agb` is unavailable, create a root `AGENTS.md` and local `.agents/skills/` entries with these responsibilities:

- `setup-runbook`: project boot, env, persistence, test, and proof commands.
- `frontend-ui-product-design`: product-specific UI identity, layout, states, and visual QA.
- `subagent-driven-implementation`: split backend, frontend, worker, and QA work without conflicting edits.
- `verify-and-review`: run tests, browser checks, export checks, and critical product review before handover.
- `webapp`: browser/runtime proof, responsive inspection, form/state verification, upload/download checks, and accessibility sanity.

The harness must be project-local. Do not install global skills or copy third-party skill packs.

Every local skill frontmatter must declare `triggers`, `skips`, and `completion_signal`. The `AGENTS.md` Buildprint Skill Harness section must name the installed `.agents/skills` entries and explain when to load them.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, verification expectations, and Buildprint Skill Harness section.
- `.agents/skills/setup-runbook/SKILL.md`, `.agents/skills/frontend-ui-product-design/SKILL.md`, `.agents/skills/subagent-driven-implementation/SKILL.md`, and `.agents/skills/verify-and-review/SKILL.md`, plus selected profile skills under `.agents/skills/` only for the default provider.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, golden path, central output contract, proof strategy, selected typed quality gates, command/proof paths, blockers, and claim ceilings.
- `.env.example` - exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` - decisions made, assumptions, blockers, commands discovered, and identity-step readiness.

## Environment Contract

Define explicit environment variables or configuration for:

- App data directory for uploads, generated assets, exports, local config, and temp files.
- Database URL with SQLite acceptable for local proof and Postgres/MySQL acceptable for server deployment.
- Auth controls: enabled/disabled auth, username/password setup, reset/override behavior, session secret/cookie policy.
- Text providers: OpenAI, Google/Gemini, Vertex, Azure OpenAI, Bedrock, OpenRouter, Cerebras, Fireworks, Together, Anthropic, Ollama, LM Studio, LiteLLM, custom OpenAI-compatible, and ChatGPT/OAuth seam.
- Image providers: disabled, stock providers, OpenAI image models, Gemini image, ComfyUI, Open WebUI, and custom OpenAI-compatible image endpoint.
- Export runtime: browser executable, export package root, converter binary path, app public URL, FastAPI public URL, temp directory, and output directory.
- Optional document extraction and memory/vector settings.

Secrets must never be committed, shown in logs, or exposed to the frontend unless they are intentionally user-entered local settings.

## Setup Receipt

Before moving to phase work, produce a setup receipt in `HANDOVER.md` or the phase handoff with:

- Stack selected and why it satisfies the contract.
- Proven library/runtime choices for export, document extraction, editing, drag/reorder, charts/diagrams, providers, task state, and persistence/migrations.
- Local harness status.
- Database/storage location and migration/init command.
- Provider mode: deterministic, configured live, or blocked.
- Export runtime mode: configured, stubbed with blocker, or blocked.
- Test commands and browser commands.

## Proof Routes

Minimum setup proof:

- App boots locally.
- Backend health route responds.
- Frontend route renders without fatal console errors.
- Database creates and reads at least one presentation-like record.
- File storage can write and read an uploaded asset and an exported-artifact placeholder in deterministic mode.
- Provider validation rejects missing keys with user-facing errors.
- Export runtime is either reachable or explicitly blocked before export claims.

## Claim Ceilings

Do not claim production-ready, self-hosted parity, live provider support, editable PPTX correctness, PDF visual fidelity, or desktop packaging until each is checked in its real runtime. The first working loop can be proof-complete without being production-complete.

## DO NOT

- Do not start identity or feature phase code before foundation exists.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hide hard-stop questions as assumptions.
- Do not skip `agb harness init . --provider agents`, `agb harness check . --provider agents`, or `agb harness checkup . --provider agents` when `agb` is available.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
