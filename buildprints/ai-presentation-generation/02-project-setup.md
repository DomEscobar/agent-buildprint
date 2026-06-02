# Project Setup

Before coding, establish the implementation alignment. This is a product artifact, not a documentation exercise.

## Artifact type

- Artifact type: trusted-local product app with optional API/desktop/integration surfaces.
- Central artifact: editable generated presentation deck.
- First loop: provider readiness -> prompt/document/template input -> outline -> generated slide deck -> browser edit -> export or blocked export.

## Architecture baseline

Choose the concrete stack and write it down before phase work. A good default is a browser frontend plus backend API and worker/export runtime, similar in spirit to Presenton's Next.js + FastAPI + desktop wrapper separation, but source copying is not required.

Required boundaries:

- `ProviderAdapter` for text providers, local models, and OpenAI-compatible endpoints.
- `ImageProviderAdapter` for generated, stock, local, and blocked image modes.
- `DocumentIngestion` for uploaded PDFs, DOCX, PPTX, text, and extraction blockers.
- `DeckModel` for persisted outline, slides, layouts, notes, assets, theme, template references, and generation status.
- `ExportRuntime` for PPTX/PDF generation and dependency blockers.
- `AutomationBoundary` for API tasks, webhooks, MCP, and desktop packaging seams.

## Product quality rules

- The deck editor must be the main surface, not settings or JSON.
- Generation output must depend on the user's prompt/document/template input.
- Slide thumbnails, canvas editing, outline edits, chat iteration, assets, and exports must mutate/read real persisted deck state.
- Missing providers or export dependencies must appear as precise blocked states.
- Public/private deployment claims require auth, tenancy, upload limits, secret handling, observability, backup, and abuse controls.

## Forbidden shortcuts

- Hard-coded sample decks presented as generated output.
- Static SVG or HTML deck previews with dead controls.
- Fake PPTX/PDF export buttons.
- Provider calls scattered through UI components.
- Raw JSON as the primary deck editor.
- Hidden SaaS lock-in or unannounced document upload to external providers.

## Setup deliverables

Before phases, create or confirm:

- app run commands and env examples;
- persistent storage choice and migration/initialization plan;
- provider/image/export adapter interfaces;
- local privacy and secret-handling rules;
- AGENTS.md or equivalent implementation notes;
- first-loop test/build/browser/API verification commands.
