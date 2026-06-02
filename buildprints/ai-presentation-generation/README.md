# AI Presentation Generation — Presenton-Inspired Deck Workbench

A Buildprint for rebuilding the spirit of [Presenton](https://github.com/presenton/presenton): a self-hosted AI presentation generator with web, API, desktop, MCP, template, export, and bring-your-own-provider boundaries.

This is not a wrapper around Presenton and not a static deck demo. It is an executable product packet for building a real trusted-local presentation workbench: configure providers, ingest prompts or documents, generate an outline, build editable slides, manage templates/assets, iterate with chat, and export PPTX/PDF through honest runtime seams.

## Product standard

Build the product loop first:

1. Configure runtime, persistence, provider, image source, export engine, and local privacy mode.
2. Start a deck from prompt, document, or imported template.
3. Generate an outline with visible streaming/progress and editable structure.
4. Generate a persisted slide deck with layout, theme, speaker-note/content metadata, and assets.
5. Edit slides in a polished browser workbench instead of showing static HTML.
6. Iterate with chat over the selected deck/slide while preserving memory boundaries.
7. Export PPTX/PDF and expose API/webhook/MCP/desktop boundaries only when they are real or honestly blocked.

## UX craft floor

The implementation should feel like a serious presentation product, closer to a local Gamma/Canva-style deck editor than an admin dashboard.

- The deck canvas is the hero surface.
- Slides, outline, assets, chat, generation status, and export controls should be visible as a coherent workbench.
- Every clickable control must either work or reveal a precise blocked state.
- Provider errors, missing LibreOffice/Chromium/export dependencies, missing image keys, or local-model setup gaps must be honest user-visible blockers.
- Do not ship token bubbles, fake slide thumbnails, hard-coded decks, one-screen demos, static SVG decks, or dead export buttons.

## Presenton signals preserved

Mapped from Presenton at `493aff5c764c13f7249a9a908fe41aa85c19b7c3`:

- self-hosted Docker/web deployment and desktop app posture;
- Next.js frontend plus FastAPI backend shape;
- BYOK provider support including OpenAI, Gemini, Vertex AI, Azure OpenAI, Amazon Bedrock, Fireworks, Together AI, Anthropic, LM Studio, Ollama, and OpenAI-compatible endpoints;
- prompt/document-to-presentation generation;
- editable decks, custom HTML/Tailwind templates, themes, image/icon/chart assets;
- PPTX/PDF export and export-runtime dependencies;
- async API, webhook delivery, MCP server, and desktop packaging boundaries;
- local privacy / no SaaS lock-in promise.

## Non-goals

- Do not clone Presenton's source or branding.
- Do not require SaaS control-plane access.
- Do not pretend public multi-tenant readiness without auth, tenancy, upload hardening, abuse controls, observability, CI, backup, and deployment work.
- Do not mark provider/export/API/MCP features complete from mocked responses.

## Start

Use the Agent Buildprint at `https://agent-buildprint.com/buildprints/ai-presentation-generation/agent.md` or bootstrap exact files with:

```bash
agb start https://agent-buildprint.com/buildprints/ai-presentation-generation/package.json
```

Then read `.buildprint/next-agent.md`.
