# BUILDPRINT: AI Presentation Generation

Build a Presenton-inspired AI presentation workbench as a usable product, not as a dashboard-shaped demo. The center is the trusted-local deck generation loop: configure providers, create a deck from prompt/document/template, generate an outline, build editable slides, manage templates and assets, iterate with chat, export files, and expose API/webhook/MCP/desktop boundaries honestly.

## Read Order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md`
4. `02-project-setup.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. Active phase file from `03-phases/phase-index.yaml`
9. `04-review.md`
10. `05-handover.md`

Do not inventory or batch-read the packet before this order. `generated/agent-prompt.md` is alignment speech, not authority.

## Product Brief

- Product: Presenton-inspired AI presentation generation workbench.
- Primary outcome: a self-hosted product loop for generating, editing, exporting, and integrating AI-generated presentations.
- Primary users: individuals, teams, or operators who want local/private control over model providers, templates, assets, generated decks, and exports.
- Main surfaces: provider/runtime setup, deck workbench, outline editor, slide canvas, asset/template manager, chat iteration, export center, API/webhook/MCP/desktop seams.
- What this packet must not become: a static slide preview, hard-coded deck demo, SaaS clone, generic admin dashboard, or fake export/API shell.

## Product Intention

The implementation should preserve Presenton's open-source promise: no SaaS lock-in, full provider choice, local/private posture, editable decks, custom templates, and real export/integration boundaries. It may choose a clean stack, but the user workflow must remain recognizable: input content, generate a deck, edit it, export it, and automate it.

## Golden Path

1. Start the app locally and see provider/export/runtime readiness.
2. Configure text model, image provider, storage, export runtime, and optional local privacy mode.
3. Create a deck from prompt, document upload, or imported template.
4. Generate and edit an outline.
5. Generate persisted slides with layouts, themes, assets, and notes/content metadata.
6. Edit the deck on a real canvas with slide thumbnails and properties.
7. Use chat to refine the deck or selected slide.
8. Export PPTX/PDF or receive an honest dependency blocker.
9. Use API/webhook/MCP/desktop seams only when implemented and verified.

## Implementation loop

For every phase: observe current files and behavior, plan the smallest real product slice, execute scoped changes, verify with build/test/browser/API checks, reflect against the phase quality bar, and record concise evidence or blockers. A phase is not complete from code edits alone.

## Phase rules

Use `03-phases/phase-flow.md` for every phase. Every role named in `requires_roles` must contribute through the embedded role outputs in the phase file. If a provider key, local model, browser, LibreOffice, document parser, or export runtime is missing, build the honest seam and blocked state rather than fake success.

## Final critical reviewer

Before handover, run `04-review.md` as a skeptical product reviewer. Reject dead buttons, generic dashboard layouts, placeholder slide canvases, fake generation, fake exports, raw JSON as UX, secret leakage, and unproven production claims. Then write `05-handover.md` facts for the next agent.
