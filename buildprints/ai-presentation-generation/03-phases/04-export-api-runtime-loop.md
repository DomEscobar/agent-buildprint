# 04-export-api-runtime-loop

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md` if it exists, current project `AGENTS.md` if it exists, `BUILDPRINT.md`, `01-project-setup.md`, and `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact. Implement the export worker, download flow, API generation path, webhook/task status seams, and runtime deployment posture.

## Building objective

Users must be able to export the persisted deck to PPTX and PDF through a real runtime that renders the visible deck, writes output files under configured app data/export storage, and returns secure download links. Export must fail closed when the browser/converter/export package is missing. API clients must be able to create a presentation, track generation/export status, and retrieve output without relying on the browser UI. Webhook support, if included, must record subscriptions and dispatch completion/failure events; if not dependency-ready, it must be blocked clearly.

Runtime setup must support local Docker/self-hosted deployment with app data volume, database URL, provider env, auth env, and export browser/converter settings. Desktop packaging can remain a seam unless it is actually built and launched.

## DO NOT

- Do not create placeholder `.pptx` or `.pdf` files.
- Do not return download URLs outside the configured export directory.
- Do not expose arbitrary files through export download routes.
- Do not mark export proven if the converter/browser runtime is missing.
- Do not claim webhook/API support from route definitions alone.
- Do not leave long-running tasks invisible to the user/operator.
- Do not ship placeholders, lorem ipsum, empty wrappers, functionless buttons, inert navigation, swallowed errors, fake progress, or mocked/sample data counted as real proof.

## Minimum proof before moving on

- Export proof produces a non-empty PPTX and PDF from a generated deck, or records the exact missing runtime blocker.
- Download proof verifies the file path is constrained to the export directory.
- API smoke proof covers create, status/readback, generation or deterministic equivalent, and export request.
- Runtime proof covers Docker/app-data/database/env configuration or records why local Docker/runtime was unavailable.
- UI proof shows export progress, success, and failure states.

## Handoff note

Record export files, sizes, open/inspection results if available, API commands, runtime env used, and any blocked desktop/webhook/provider deployment claims.
