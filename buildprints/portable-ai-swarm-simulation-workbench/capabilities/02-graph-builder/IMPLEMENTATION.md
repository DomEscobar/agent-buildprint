# Implementation: Graph Builder And Visualization

## Agent Brief

- Goal: implement graph build and graph UI.
- Dependencies: project and ontology from capability 01.
- Stable behavior: async task and graph retrieval.
- Implementation freedom: queue and graph renderer.
- Forbidden substitutions: static graph, fake progress.
- First verification gate: `npm test -- graph-builder`.
- Required evidence: task lifecycle, nonblank graph screenshot, provider adapter log.
- Required team packs: all selected teams.
- Stop or escalate when: provider cleanup requirements are unknown.

## First Real Vertical Slice

- User/API entry: `POST /api/graph/build` and graph screen refresh.
- Domain/service behavior: chunk text, set ontology, add episodes, poll/fetch graph.
- Persistence/state effect: task state and graph id stored on project.
- Provider/runtime effect: Zep adapter called or explicit blocked live provider.
- UI/browser proof when applicable: graph loading, empty, error, success screenshots with nonblank node/edge check.
- Negative/failure path: missing provider key and failed task stay visible.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | define graph task topology | task + graph evidence | missing |
| ux-ui-craft | graph UI proof states | screenshots | missing |
| test-and-verification | task and adapter tests | proof rows | missing |
| integration-runtime | Zep adapter boundary | adapter log | missing |
| security-boundary | destructive graph controls | negative proof | missing |
| data-persistence | task/graph readback | restart proof | missing |

## Milestones

1. Task manager and graph adapter port.
2. Graph build service with progress and error states.
3. Graph UI with nonblank proof and refresh.

## Stop Conditions

- Graph UI shows static sample data as completed product.
- Task disappears on refresh when persistence is claimed.

## Handoff Update

After this passes, advance to `capabilities/03-simulation-setup/`.
