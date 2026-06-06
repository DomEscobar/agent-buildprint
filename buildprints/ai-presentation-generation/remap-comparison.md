# Presenton Remap Comparison

This file records why the current packet was remapped after the Mapper OS central-output-contract upgrade.

## Source audited

- Repository: `https://github.com/presenton/presenton`
- Audited commit: `9acd4a6f22e7b621aacdad69bc93b3e548e0b651`
- Source areas inspected:
  - `README.md`
  - `start.js`
  - `servers/fastapi/api/v1/ppt/endpoints/*`
  - `servers/fastapi/models/*`
  - `servers/fastapi/utils/llm_calls/*`
  - `servers/fastapi/services/export_task_service.py`
  - `servers/nextjs/app/(presentation-generator)/*`
  - `servers/nextjs/app/api/export-presentation/route.ts`
  - `servers/nextjs/lib/run-bundled-presentation-export.ts`

## Previous packet gap

The previous `ai-presentation-generation` packet already understood the broad Presenton product direction, but it used an older packet shape. It failed the new `agb packet check` with 83 failures because it was missing the v3 file spine, used obsolete review/handover/generated files, and had no explicit `central_output_contract`.

The most important gap was not naming features; it was insufficient output-quality extraction. A builder could satisfy the older packet with a nice prompt-to-static-deck demo while still missing the source's central artifact: an editable, export-ready deck model with provider readiness, document context, outline, layout assignment, slide fields, assets, notes, chat iteration, export task state, and automation seams.

## Source mechanics preserved in the remap

- BYOK/local provider readiness and image provider readiness.
- Prompt, uploaded document, and slides-markdown generation inputs.
- File upload and decomposition before document-grounded generation claims.
- Structured outline generation with slide count, language, tone, verbosity, title slide, table of contents, web search, and instructions.
- Layout selection from built-in or custom templates based on slide content.
- Structured slide content generated against layout data shape.
- Editable deck state with thumbnails, canvas, theme, assets, speaker notes, and autosave/readback.
- Chat iteration scoped to active presentation or selected slide.
- PPTX/PDF export through a bundled runtime/converter or exact blocked state.
- Async API, webhook, MCP server, and Electron desktop seams only when proven or explicitly blocked.

## New acceptance bar

After one generated deck, a reviewer must be able to identify:

- source prompt/documents and generation settings;
- outline decisions and edits;
- layout/template choice per slide;
- editable slide fields, notes, theme, and assets;
- persisted deck id and readback state;
- chat iteration scope;
- PPTX/PDF export state and runtime proof or blocker;
- which API/webhook/MCP/desktop claims are proven versus only seams.

If the artifact can be replaced by generic slide cards with marketing copy, the implementation has failed the remap.
