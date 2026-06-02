# Review

Run this as an operational walkthrough, not a self-score.

## Core walkthrough

1. Start from a fresh local app.
2. Configure or intentionally block text provider, image provider, persistence, and export runtime.
3. Create a deck from a prompt.
4. Create a deck from a document or honestly block parser support.
5. Import or select a template/theme if implemented, or show the planned blocker.
6. Generate an outline and edit it.
7. Generate slides from the outline.
8. Reload the app and confirm deck, outline, slides, assets, and status read back.
9. Edit a slide on the canvas and verify persisted state.
10. Use chat to revise deck or selected slide, or show provider blocker.
11. Export PPTX/PDF, or show a precise LibreOffice/Chromium/export-runtime blocker.
12. Exercise API task creation/status and webhook delivery if implemented.
13. Exercise MCP/desktop seams if implemented, or record the boundary blocker.

## Observe and record

- Does generated content depend on the user's input?
- Are provider/export/parser/image failures clear and recoverable?
- Are slide thumbnails and canvas state real, editable, and persisted?
- Are API/webhook/MCP/desktop claims backed by runnable proof?
- Are uploaded documents and provider keys handled safely?
- Are public/private production claims absent under trusted-local posture?

## Defects to fix before handover

- generic dashboard smell;
- fake deck generation;
- static slide canvas;
- dead controls;
- placeholder thumbnails;
- raw JSON as the main editor;
- fake PPTX/PDF export;
- hidden provider or parser failures;
- hard-coded provider/model;
- unpersisted deck/task/chat/export state;
- leaked provider keys or uploaded document contents;
- public-ready claims without auth, tenancy, upload hardening, observability, backup, CI, and abuse controls.

## Honest blocker semantics

A missing credential, local model, document parser, image key, LibreOffice/Chromium dependency, webhook receiver, MCP transport, or desktop packaging runtime is a blocker to be displayed and recorded, not a reason to ship fake success.
