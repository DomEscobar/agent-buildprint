# AI Influencer OS

A local-first fictional influencer runtime for persona continuity, grounded social drafts, Wavespeed media jobs, manual publishing handoff, and manager audit.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Features

- OpenClaw-shaped persona extension and skill/runtime boundaries.
- Separate user relationship memory and persona self-state.
- Wavespeed image generation seam with deterministic test mode.
- Grounded social drafts, media jobs, QA notes, and manager audit.
- Manual/mock publishing by default with secured local browser handoff.

## Requirements

- Local runtime capable of running the selected app stack and Docker when OpenClaw/browser proof is in scope.
- Blank `.env.example` entries for provider keys and browser password.
- No live API, image, browser, or social publishing proof without explicit credentials and approval.

## Provider Keys

- `OPENROUTER_API_KEY` for live analyzer/provider calls.
- `WAVESPEED_API_KEY` for live image generation.
- `TELEGRAM_BOT_TOKEN` if Telegram runtime is enabled.
- `SOCIAL_VISIBLE_BROWSER_PASSWORD` for local browser/noVNC handoff.

## Proof Boundary

Fixture tests can prove persona routing, memory split, media policy, grounded drafts, and manual publishing gates. They do not prove live provider success, live social posting, or public deployment.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer only hard-stop questions in `00-questions.md`, run setup through `01-project-setup.md`, generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`.

