# 01 Foundation And First Loop

## How to implement this phase

Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-ui-identity.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` if they exist. Then create the implementation foundation and the smallest honest vertical path: authenticated entry, project/episode context, production canvas route, seeded flow data, and durable readback. Load the local frontend skill before UI decisions. If setup has not created the local skill harness, stop and complete setup first.

## Building objective

Build the first real product loop for an AI short-drama production canvas. The user should be able to start the app, authenticate, reach a project list, select or create a project, select or seed an episode, open the production canvas, and see a connected pipeline of episode artifacts. This first loop may use deterministic seeded data, but it must be real application data saved in the selected persistence layer, not a hard-coded UI-only fixture.

The visible surface must already follow `02-ui-identity.md`: narrow icon rail, clean white workspace, black primary actions, compact controls, no landing page, no dashboard-first detour, no raw JSON. The canvas can start simple, but it must establish the product silhouette and route ownership so later phases extend a real editor instead of replacing a generic shell.

Create or complete the local setup artifacts required by `01-project-setup.md`, including `AGENTS.md`, local skill harness files, `.env.example`, `docs/architecture.md`, and `.buildprint/setup-receipt.md`. Define database/storage schema names for projects, episodes, flow data, assets, storyboard frames, media outputs, provider settings, and agent history even if not all tables are fully used yet.

The first proof should cover auth to canvas to readback: create a project and episode, persist starter `flowData`, reload or refetch it, and render the same selected project/episode on the canvas route. Browser proof is preferred; if browser proof is blocked, record the exact blocker and provide API/command proof without claiming UI completion.

## DO NOT

- Do not build a marketing page or static demo board.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not skip the local skill harness.
- Do not claim durable state from in-memory objects.
- Do not use default admin credentials as acceptable for private or public deployment.
- Do not hide missing provider credentials by showing successful generation.
- Do not allow the initial route to be a generic dashboard that must later be replaced.

## Minimum proof before moving on

- `AGENTS.md`, local skill harness files, `.env.example`, `docs/architecture.md`, and `.buildprint/setup-receipt.md` exist.
- App can start with named command, or the blocker is recorded with exact failure.
- Authenticated user can reach a project/episode context.
- A production canvas route exists and renders a real selected project/episode.
- Starter flow data is persisted and read back after reload/refetch.
- Screenshot or browser inspection confirms the first surface follows the canvas-editor silhouette and has no page-level horizontal overflow.

## Handoff note

Record the selected stack, commands, persistence location, seeded account policy, seeded project/episode ids, proof run, UI proof status, and unresolved provider/storage/deployment blockers.
