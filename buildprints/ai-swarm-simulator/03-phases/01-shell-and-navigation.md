# Phase 01 - Shell And Navigation

requires_roles: [ux-ui-craft, product-architect]

## Product intention

Build a workbench shell that takes the user through seed input, graph build, canvas inspection, simulation, report, and interaction without hiding the graph.

## Mapped obligations

- Provide routes or views for home/start, process/graph build, simulation setup, simulation run, report, and interaction.
- Keep graph/split/workbench layout available when simulation setup is active.
- Show status and next action at each step.

## Stable vs free

Stable: workflow order and graph-first visibility.

Free: route names, component names, layout framework.

## Implementation scope

Build navigation, status model, empty/loading/error shell states, and route guards for missing project/simulation ids.

## Interfaces touched

Frontend router, layout shell, workflow state, API client wrapper.

## State / runtime touched

Project id, graph id, simulation id, report id, current workflow step.

## UX / DX / operator requirements

The shell should feel like an operational tool, not a marketing page. Controls must be visible, predictable, and reachable by keyboard where practical.

## Required output (ux-ui-craft)

- Workbench shell with graph-first navigation.
- Visible next action per step.
- Responsive layout for desktop and mobile.

## Blocks (ux-ui-craft)

- Blank shell with disconnected cards.
- Hidden graph after build.
- Navigation that loses project context.

## Quality bar

The user can move from project creation to graph canvas to simulation setup without manual URL editing.

## Do not ship

Do not leave dead tabs or placeholder routes.

## Repair routing

Navigation contradictions go to current phase; setup contradictions go to `02-project-setup.md`.

## Unlock condition

Shell and navigation support the complete selected loop with honest blocked states.
