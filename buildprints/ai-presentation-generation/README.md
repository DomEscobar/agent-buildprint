# AI Presentation Generation

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Build](https://img.shields.io/badge/build-local%20checks%20required-yellow)
![Runtime](https://img.shields.io/badge/runtime-private%20webapp-lightgrey)
![Status](https://img.shields.io/badge/status-local%20build%20requires%20review-yellow)

AI Presentation Generation is a private deck-building workbench for turning prompts or uploaded documents into editable presentations, then refining slides and exporting real PPTX/PDF artifacts.

## Features

- Create a presentation from a prompt, uploaded document, or both.
- Configure text and image providers before generation starts, with clear blocked states when credentials are missing.
- Review and edit an outline before slides are generated.
- Choose built-in or custom templates that shape slide layouts, theme, typography, and structure.
- Edit slides in a canvas-first workbench with thumbnails, inline content controls, add/reorder actions, and saved readback.
- Refine deck content through a chat sidecar that targets real slide mutations rather than giving detached advice.
- Export persisted decks to PPTX and PDF through a real export runtime.
- Reopen saved decks, assets, chat history, and export artifacts through durable storage.

## Requirements

- Database URL and session secret when saved decks, uploads, or user sessions are enabled.
- App data and export output directories for uploaded documents, generated assets, temp files, and exports.
- PPTX/PDF export runtime path or service credentials when export is enabled.
- Text provider API key when live deck generation is enabled.
- Image provider API key when generated or provider-backed images are enabled.
- Local provider URL when using Ollama, LM Studio, or another OpenAI-compatible local runtime.
- OAuth callback credentials only when ChatGPT/OAuth-style sign-in is enabled.

## Environment And Provider Keys

Use `.env.example` in the implementation as the source of truth for exact variable names. Keep real secrets out of README files, tests, logs, screenshots, and handover notes.

```bash
DATABASE_URL=
SESSION_SECRET=
APP_DATA_DIR=
EXPORT_OUTPUT_DIR=
EXPORT_BROWSER_PATH=
TEXT_PROVIDER_API_KEY=
IMAGE_PROVIDER_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=
AZURE_OPENAI_API_KEY=
ANTHROPIC_API_KEY=
OLLAMA_BASE_URL=
```

- Required only when the matching feature is enabled; deterministic local mode should not need live model keys.
- Provider keys unlock live text generation, image generation, OAuth sign-in, local model runtime, or provider-specific proof.
- Blocked unless configured: live provider quality claims, OAuth-style sign-in, webhook delivery, desktop packaging, production deployment, and editable PPTX/PDF fidelity claims.

## Quick Start

```bash
install-command
configure-env-command
run-dev-command
test-or-check-command
```

Open the app, configure provider settings or deterministic local mode, create a deck from a prompt or document, review the outline, generate slides, edit at least one slide, reload to prove readback, then export PPTX/PDF if the export runtime is available.

## Verification

Before claiming completion, verify:

- setup, build, lint/typecheck, and tests pass or have exact blockers recorded;
- a prompt-only deck and document-backed deck produce scenario-specific slides;
- outline review, template selection, slide generation, inline editing, reorder, chat mutation, and presentation mode work through the UI;
- presentation, slide order, theme/template data, assets, and chat changes survive reload/refetch;
- provider failures name the missing key, model, endpoint, or runtime;
- exported PPTX/PDF files are generated from persisted deck state and inspected before fidelity claims;
- desktop and narrow layouts avoid overlap, clipped controls, unreadable text, and unreachable actions.

## Limitations

- This package defines the product contract; it does not prove a downstream implementation by itself.
- Live provider calls require real credentials and safe provider boundaries.
- Export fidelity is unproven until generated PPTX/PDF artifacts are opened or otherwise inspected.
- Production readiness requires separate proof for auth, secrets, uploads, storage durability, deployment, observability, recovery, and privacy boundaries.
