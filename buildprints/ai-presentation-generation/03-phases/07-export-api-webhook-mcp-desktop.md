# Phase 07 — Export, API, webhook, MCP, and desktop

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, and the automation/export sections in `blueprint.yaml`. Treat every automation surface as either working proof or a precise blocked seam.

## Building objective

Implement the Exports view and integration boundaries. PPTX/PDF export must call a real runtime/converter or show the exact missing dependency. Export tasks should display format, status, path/download, error detail, and deck id. Async API should expose request/task/status shape if implemented. Webhook delivery must show subscription/config/delivery attempts or remain blocked. MCP and desktop bridges must show whether they are available, which runtime owns them, and what remains unproven.

This phase is where fake success is most tempting. The user should know whether an export created a real file, where it is available for download, which deck id produced it, and which runtime dependency failed if it did not. Automation surfaces should be product-visible but conservative: an API endpoint, webhook delivery attempt, MCP tool, or desktop export bridge is only ready when it has been invoked and observed.

## DO NOT

Do not create fake download files. Do not claim API/webhook/MCP/desktop support from labels alone. Do not ignore export failures or hide converter/runtime errors. Do not expose local files outside the configured app-data/export boundary. Do not use placeholders, functionless buttons, or mocked/sample data as real export/API proof.

## Minimum proof before moving on

Run build/typecheck and smoke export-ready or export-blocked behavior. If runtime exists, create a real PPTX/PDF or verify task failure with precise error detail. If API/webhook/MCP/desktop seams are not implemented, verify their blocked states are visible and not marketed as ready.

## Handoff note

Record export proof, task state, runtime path, output path, API/webhook/MCP/desktop status, and unproven production claims.
