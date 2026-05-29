# Phase 02 - Project And Script Planning

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md`, and these role contracts only: `06-contracts/product-architect.md`, `06-contracts/integration-runtime.md`, `06-contracts/data-persistence.md`, `06-contracts/test-and-verification.md`.

Execute through `phase-flow.md`. Do not append runtime evidence until phase-flow plan, team-gates, handoff, return, review, and proof artifacts exist.

requires_roles: product-architect, integration-runtime, data-persistence, test-and-verification

## Product outcome

Implement the planning outcome flow from project context to editable ScriptAgent workspace: novel/project input, story skeleton, adaptation strategy, episode/script rows, agent trace, save/edit/regenerate controls, and a handoff into ProductionAgent Canvas.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- lens: product outcome flow
- mode obligation: users can move from project material to script planning artifacts that feed the Canvas.
- shared proof spine: preconditions, entrypoint, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals must be covered.

## Interfaces touched

- Web routes/components: project detail, novel/material input, ScriptAgent workspace, script episode editor, agent trace panel.
- API routes: get/save plan data, update story skeleton/adaptation strategy/scripts, trigger planning generation, fetch generation trace.
- Internal services: script planning service, agent orchestration service, provider text adapter, trace/task service.

## State/runtime touched

- Project material and novel/chapter/event metadata.
- ScriptAgent work data: story skeleton, adaptation strategy, script items.
- Agent memory/trace entries.
- Text generation tasks with pending/success/failure state.

## UX/UI or consumer-experience requirements

- Planning UI must feel connected to the creative flow: material on one side, structured outputs in editable panels, agent trace visible without drowning the user in raw logs.
- Provide loading, empty, partial, failed, and retry states for generation.
- The handoff to ProductionAgent Canvas must be visible and disabled only when required planning artifacts are missing.

## Safety/security constraints

- Text provider keys stay server-side.
- User content and generated scripts are user/project-scoped.
- Failed provider calls must show safe error summaries, not raw secret-bearing stack traces.
- If provider credentials are absent, expose a blocked/sandbox state and allow manual script entry.

## Proof gate

- Unit tests cover plan validation and script row persistence.
- Integration tests prove save/load/update roundtrip.
- Provider contract tests cover sandbox success, missing credentials, and provider failure mapping.
- Browser e2e proves create project -> enter planning -> save skeleton/strategy/script -> reopen -> data persists -> handoff enabled.

## Implementation loop

1. Implement planning domain schemas and persistence.
2. Implement editable planning UI.
3. Implement text-generation task boundary and trace surface.
4. Implement manual fallback when provider proof is blocked.
5. Run proof gate and record evidence.

## Repair routing

- Provider behavior fake or unclear: integration-runtime.
- Planning artifacts not durable: data-persistence.
- Flow breaks before Canvas handoff: product-architect.
- Missing edge tests: test-and-verification.

## Non-goals

- Production Canvas node editing.
- Image/video generation.
- Final export.
