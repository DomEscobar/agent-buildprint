# 01 Project Setup

This is the foundation pour. Build enough architecture, standards, local skill harness, commands, and proof surfaces that future agents cannot turn the artifact into a generic dashboard or a fake demo.

## How to implement setup

Before writing product code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `blueprint.yaml`
- current workspace or target project `AGENTS.md` if present

Create the implementation project foundation first. Do not start `02-ui-identity.md` or `03-phases/*` until the project has a real runtime shape, local skills, persistence choices, provider seams, and command/proof paths.

If `agb` is available, run `agb harness init . --provider agents --profile webapp --profile backend --profile agentic`, then run `agb harness checkup . --provider agents --profile webapp --profile backend --profile agentic`. If not, create the equivalent project-local Buildprint skill harness manually. The default harness must be local to the implementation project: root `AGENTS.md` and portable `.agents/skills/**/SKILL.md` files only, including `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`. Every local `SKILL.md` must include explicit `triggers`, `skips`, and `completion_signal` fields so later phase handoffs can prove which skill governed the work. Provider-specific folders such as `.claude/skills/`, `.cline/skills/`, or `.cursor/rules/` require an explicit, evidence-backed `--provider` selection. Do not install global skills or copy third-party skill packs.

## Building objective

Create a real authenticated local web product foundation for an AI short-drama production canvas. The foundation must support a project list, selected project context, episode selection, a canvas route, durable flow data readback, realtime agent messages, provider settings, media storage, and proof commands. The first real user path must be able to reach the production canvas from login, choose or seed a project and episode, render the connected creative pipeline, and persist graph data after edits.

Use source-observed behavior as the contract, not as a stack prison. The source evidence shows an Express/SQLite/Socket.IO runtime, Vue/VueFlow frontend, local/Docker/Electron deployment posture, default admin login, provider configuration, and a production graph with `script`, `scriptPlan`, `assets`, `storyboardTable`, `storyboard`, and `workbench` nodes. A downstream builder may choose a different modern stack, but it must preserve those product behaviors and proof obligations.

Create these setup artifacts in the implementation project:

- `AGENTS.md`: local constitution, required read order, UI priority, source-independent product scope, no-fake-success rules, provider and media safety, verification expectations, and Buildprint Skill Harness section.
- `.agents/skills/frontend-ui-product-design/SKILL.md`: local skill that forces canvas-product UI preflight, screen-state design, stress fixtures, visual QA, and anti-generic review.
- `.agents/skills/subagent-driven-implementation/SKILL.md`: local skill that tells workers they are not alone in the codebase, defines ownership before edits, and requires proof before phase handoff.
- no provider-specific folders unless the user explicitly selected that provider.
- `docs/architecture.md`: stack, runtime topology, routes/events, persistence schema, media storage, auth/session model, provider seams, generated-output contract, command/proof paths, applicable typed gates, blockers, and claim ceilings.
- `.env.example`: blank env names only. Include auth/session secret, database URL/path, media storage root or object storage endpoint, text/image/video provider keys, provider base URLs, public asset URL, and port. No real secrets.
- `.buildprint/setup-receipt.md`: decisions made, defaults used, blockers, commands discovered, seeded data, and readiness for UI identity.

The architecture should define these module boundaries:

- `auth`: login, session/JWT, default development seed, required password-change/public-deploy blocker.
- `projects`: project list, project create/edit/delete, source text or novel metadata, art style and director manual fields.
- `episodes`: script/episode records, selected episode context, route guards when no episode exists.
- `production-canvas`: graph node rendering, layout, node drag persistence, zoom/pan controls, episode selector, refresh and auto-layout actions.
- `flow-data`: durable `script`, `scriptPlan`, `assets`, `storyboardTable`, `storyboard`, and `workbench` state with save/readback APIs.
- `production-agent`: realtime chat, context update on episode switch, message history, stop/reconnect, memory clear, tool-mediated graph mutations.
- `providers`: programmable or configurable text/image/video model adapters with test actions and honest blocked states.
- `media`: upload, thumbnail/preview URL creation, image generation results, storyboard frame state, video generation state, and downloadable outputs.
- `proof`: seeded fixtures, API tests, browser tests, screenshot capture, persistence round trips, and provider-blocker tests.

## DO NOT

- Do not build a landing page first. The first meaningful surface is the operational production canvas.
- Do not use in-memory-only state while claiming durable persistence.
- Do not expose raw JSON as the main experience.
- Do not fake provider success. Missing credentials must show blocked provider state and remain a blocker in handoff.
- Do not make default admin credentials acceptable outside trusted local development.
- Do not skip the local skill harness.
- Do not build a generic dashboard, Kanban board, or card grid and call it a canvas product.
- Do not let setup choose a stack that cannot support canvas interaction, realtime chat, durable readback, and media preview.

## Minimum proof before moving on

- The local skill harness files exist and `AGENTS.md` has a Buildprint Skill Harness section.
- `docs/architecture.md` names the selected stack, module boundaries, persistence schema, event/API contracts, provider seams, media storage, auth posture, proof commands, and claim ceilings.
- `.env.example` contains only blank secret placeholders.
- A command exists to start the app locally and a command exists to run tests or smoke checks.
- The implementation project can render at least a blank authenticated shell or the setup receipt records the exact blocker.
- `.buildprint/setup-receipt.md` states whether provider credentials, media storage, and browser proof are available.
