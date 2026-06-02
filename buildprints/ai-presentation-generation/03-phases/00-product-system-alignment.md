# Phase 00 - Product system alignment

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Define the trusted-local product spine before coding: a Presenton-inspired deck generation workbench with provider-neutral generation, document/template ingestion, editable deck state, export runtime seams, and integration boundaries.

## Mapped obligations

- Preserve Presenton's self-hosted, BYOK, editable deck, export, API/webhook/MCP/desktop promise where relevant to this phase.
- Keep the deck model and workbench as the central product artifact.
- Show missing provider, parser, image, export, or desktop dependencies as honest blockers.
- Avoid source copying; map behavior and product guarantees into a clean implementation.

## Stable vs free

Stable: provider choice, prompt/document/template input, editable deck state, templates/assets, export and integration boundaries, local privacy posture.

Free: exact framework, database, component library, worker queue, and route names if the product loop stays intact.

## Implementation scope

Create project structure, configuration contracts, adapter interfaces, local env examples, and the initial deck-workbench routing plan.

## Build

Build the smallest coherent product slice for this phase and wire it into real app state, not an isolated demo.

## Interfaces touched

Frontend workbench, backend API, provider/image adapters, deck storage, document ingestion, export runtime, API/webhook/MCP/desktop seams as applicable.

## State / runtime touched

Deck model, outline, slides, assets, templates, generation traces, provider readiness, export tasks, uploaded documents, and blocked dependency state as applicable.

## UX / DX / operator requirements

The user must understand the next action, what is live, what is blocked, and how to recover. Developer seams should be typed or documented enough for the next phase.

## Required output (product-architect)

Define the product slice boundary, preserve central deck workflow, and prevent unrelated feature spread.

## Blocks (product-architect)

Do not turn this into disconnected settings pages, a static deck demo, or an API-only backend with no user workbench.

## Required output (ux-ui-craft)

Ensure the workbench surface is polished, responsive, clear, and free of dead controls or fake slide states.

## Blocks (ux-ui-craft)

Do not ship generic dashboard cards, token bubbles, raw JSON as the primary UI, or placeholder thumbnails pretending to be generated slides.

## Required output (integration-runtime)

Define or implement provider, parser, image, export, API, webhook, MCP, and desktop seams with live/blocker/error behavior.

## Blocks (integration-runtime)

Do not hard-code one provider, hide export dependency failures, or mark API/MCP/desktop complete without runnable proof.

## Required output (data-persistence)

Persist and read back all visible deck, generation, task, and asset state touched by the phase.

## Blocks (data-persistence)

Do not claim reload safety for in-memory decks, task status, chat history, or generated files.

## Required output (security-boundary)

Name privacy, upload, credential, file, export, and exposure boundaries for this phase.

## Blocks (security-boundary)

Do not expose uploaded documents, provider keys, generated files, or desktop/runtime controls as public-ready without hardening.

## Quality bar

The setup prevents a generic dashboard or fake slide demo.

## Do not ship

Dead buttons, fake generation, fake exports, hidden provider failures, placeholder slide content presented as generated output, generic dashboard slop, or unproven production claims.

## Handover

Record what was built, commands run, browser/API/export proof, blocker states, and remaining defects.

## Repair routing

If the product loop or architecture is unclear, repair `02-project-setup.md`. If this slice fails, repair this phase before moving on. If final-review defects appear, route to `04-review.md`.

## Unlock condition

The phase has a real user-visible deck-workbench improvement, proof or honest blocker evidence, and no silent downgrade of Presenton-inspired scope.
