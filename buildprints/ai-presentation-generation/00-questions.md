# 00 Questions

Use this file to separate true blockers from reasonable defaults. Stop before `01-project-setup.md` only when an answer changes safety, data exposure, cost, product identity, or public release posture.

## Hard-stop questions

1. **Deployment posture** — Is this still a trusted-local/self-hosted presentation product, or must it be private authenticated or public webapp? Public deployment requires auth, tenancy, upload hardening, rate limits, abuse controls, observability, and backup before claiming readiness.
2. **Secrets and provider policy** — Which text and image providers may be used? API keys, OAuth tokens, local model endpoints, ChatGPT session state, and provider secrets must never enter commits, snapshots, logs, generated decks, or handover.
3. **Privacy/compliance exposure** — Will users upload private, client, regulated, or third-party documents? If yes, define retention, deletion, redaction, OCR/parser limits, and local-only guarantees before building upload/import behavior.
4. **Export runtime** — Must PPTX/PDF export be real in the first implementation, or can it be a precise blocked state? Real export requires a working bundled export runtime, converter binary, app-data path, and download boundary.
5. **Product/artifact identity** — Is the central artifact an editable deck workbench, API service, desktop app, template studio, or public web product? The default is trusted-local editable deck workbench; changing that changes architecture and proof.
6. **Template fidelity** — Should the product support custom HTML/Tailwind template creation and PPTX-derived template import in the first release? If yes, the builder must budget for schema extraction, font handling, layout preview, and template persistence.
7. **Automation surface** — Are async API, webhooks, MCP, and desktop packaging required user-facing features or future seams? Treat them as blocked seams unless implemented and proven with real requests/events.
8. **Destructive/data-loss behavior** — May decks, uploaded documents, generated images, templates, fonts, export files, and chat histories be deleted? If destructive behavior is allowed, require confirmation, clear ownership, and recoverable state where possible.

## Assumable defaults

- Deployment posture is `trusted_local`.
- The product is a Presenton-inspired, self-hosted deck workbench, not a clone of Presenton branding or source.
- The first artifact is an editable deck model generated from prompt, uploaded documents, or imported template.
- Provider setup uses bring-your-own-key or local model configuration with visible readiness checks.
- Uploaded documents can use local fixtures for smoke tests, but sample-only proof must be labeled honestly.
- Export may start as a precise blocked state if the bundled runtime/converter is unavailable.
- API, webhook, MCP, and desktop claims require proof; otherwise they remain visible seams with blockers.

## Deferrable questions

- Exact hosted-cloud pricing, billing, and organization/team model.
- Full public auth/tenancy model beyond trusted-local or private authenticated use.
- Long-term template marketplace, collaborative editing, version history, and multi-user review workflows.
