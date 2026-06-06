# AI Presentation Generation — Presenton-Inspired Deck Workbench

A Buildprint for rebuilding the spirit of [Presenton](https://github.com/presenton/presenton): a self-hosted AI presentation generator with web, API, desktop, MCP, template, export, and bring-your-own-provider boundaries.

This is not a wrapper around Presenton and not a static deck demo. It is an executable v3 product packet for building a real trusted-local presentation workbench: configure providers, ingest prompts or documents, generate/edit an outline, choose templates/layouts, build editable slides, manage themes/assets, iterate with chat, and export PPTX/PDF through honest runtime seams.

## Product standard

Build the product loop first:

1. Configure text provider, image provider, parser, storage, export runtime, privacy, and automation readiness.
2. Start a deck from prompt, uploaded documents, slides markdown, built-in template, or imported/custom template.
3. Generate and edit an outline with visible progress and controls for slide count, language, tone, verbosity, title slide, table of contents, web search, and instructions.
4. Assign layouts/templates because they fit slide content, tables, charts, images, or table-of-contents needs.
5. Generate a persisted slide deck with layout, theme, speaker-note/content metadata, assets, and autosave/readback state.
6. Edit slides in a polished browser workbench instead of showing static HTML or static thumbnails.
7. Iterate with chat over the selected deck/slide while preserving conversation and deck context.
8. Export PPTX/PDF and expose API/webhook/MCP/desktop boundaries only when they are real or honestly blocked.

## UX craft floor

The implementation should feel like a serious presentation product, closer to a local Gamma/Canva-style deck editor than an admin dashboard.

- The deck canvas is the hero surface.
- Configure, Create, Outline, Deck, Templates, and Exports must be focused workbench views.
- Slides, outline, assets, chat, generation status, and export controls should be visible as a coherent workbench.
- Every clickable control must either work or reveal a precise blocked state.
- Provider errors, missing LibreOffice/Chromium/export dependencies, missing image keys, or local-model setup gaps must be honest user-visible blockers.
- Do not ship token bubbles, fake slide thumbnails, hard-coded decks, one-screen demos, static SVG decks, or dead export buttons.

## Presenton signals preserved

Mapped from Presenton at `9acd4a6f22e7b621aacdad69bc93b3e548e0b651`:

- self-hosted Docker/web deployment and desktop app posture;
- Next.js frontend plus FastAPI backend shape;
- BYOK provider support including OpenAI, Gemini/Google, Vertex AI, Azure OpenAI, Amazon Bedrock, Fireworks, Together AI, Anthropic, LM Studio, Ollama, custom endpoints, OpenAI-compatible endpoints, and related model readiness checks;
- prompt/document/slides-markdown-to-presentation generation;
- structured outline generation, layout selection, slide content generation, and speaker notes;
- editable decks, custom HTML/Tailwind templates, themes, font handling, image/icon/chart assets, and generated/uploaded image stores;
- PPTX/PDF export and bundled export-runtime/converter dependencies;
- async API, webhook delivery, MCP server, Electron desktop export bridge, and desktop packaging boundaries;
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
