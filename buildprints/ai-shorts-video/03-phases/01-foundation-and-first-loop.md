# Phase 01 - Foundation And First Loop

## How to implement this phase

Read the setup, UI identity, blueprint, and phase flow. Build the foundation before feature breadth.

## Building objective

Create the local OpenShorts implementation foundation and first visible operator loop. The app must start as a multi-service product or a deliberately narrowed local slice, show provider readiness, accept one real source input path, create a job with honest state, and return either a real reviewable output or a precise blocked state.

The loop should prove the product shape: an operator can open the dashboard, see which keys/services are missing, submit a rights-attested video upload or safe fixture, observe queued/processing/error state, and inspect logs/status without raw JSON being the main product surface. If live Gemini/FFmpeg/transcription cannot run, the UI/API must name that blocker and preserve the source/job record for retry.

## DO NOT

- Do not create a landing page as the primary surface.
- Do not ship inert settings, fake progress, or sample clips as generated results.
- Do not hide missing provider keys behind success UI.
- Do not claim durable job history if state is only in memory.

## Minimum proof before moving on

- `docker compose config` or equivalent service config check.
- Backend health/API startup proof or exact dependency blocker.
- Dashboard browser proof for settings-ready or settings-blocked state.
- One job creation/status path through API or UI.
- File output/readback proof if media is produced.

## Handoff note

Record commands run, services started, ports, first loop status, blockers, screenshots/API checks, and what phase 02 or 03 may trust.
