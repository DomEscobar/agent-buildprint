# Phase 02: Workflow Shell And Projects

## Intention

Build the user-facing shell around the five-step workflow: graph building, environment setup, simulation, report generation, and deep interaction. The user should always know the current project, step, status, and next action.

## Build Scope

- Implement project creation with file upload, prediction requirement, extracted text, and project metadata.
- Persist project files and metadata durably.
- Build workflow routes/views for home/project, process graph build, environment setup, simulation run, report, and interaction.
- Add task status APIs and progress displays for long-running graph/report/simulation work.
- Add language-ready UI copy without leaking internal Buildprint/proof vocabulary.

## Quality Bar

- A user can reload and return to a project without losing uploaded files or current status.
- Empty/error states tell the user what happened and what to do next.
- The shell does not depend on graph data existing before upload/ontology is complete.

## Do Not Ship

- In-memory-only projects or tasks.
- Buttons that look enabled but do nothing.
- A homepage that replaces the actual workbench as the first useful screen.
