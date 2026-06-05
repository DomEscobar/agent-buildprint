# Phase 07 — Backend provider probe and secret boundary

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. Preserve the novice UX contract while adding backend/service behavior. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Create the server-side boundary required before any live AI service claim. Provider keys must be loaded only by a local backend/service or equivalent non-browser process. The frontend may display provider state and submit provider metadata, but it must not receive, log, bundle, or persist secrets. Add a provider health/probe endpoint or command with states for missing, probing, healthy, failed, and rate-limited. The UI must explain these states in plain language while advanced details expose exact provider diagnostics without secrets.

This phase should also harden the request lifecycle around provider work: timeout handling, retry guidance, redacted error payloads, rate-limit messaging, model/base-url validation, and a single reusable provider status source for simulation and report phases. The user-facing result must be simple: AI service not connected, checking AI service, AI service ready, or AI service failed with a next action.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not read provider keys from frontend `VITE_*` variables. Do not echo secrets in logs, browser state, screenshots, reports, or handover. Do not mark provider healthy without a real probe or an explicitly labeled offline/local mode.

## Minimum proof before moving on

Run build/test/smoke checks. Prove no provider key appears in built frontend assets. Prove missing-key and failed-probe states are visible and actionable. If a live provider is unavailable, record that honestly and verify the blocked state. If a live provider is available through local environment, run the probe and record redacted results.

## Handoff note

Record the backend boundary, secret-loading behavior, provider state model, proof that secrets are absent from frontend output, provider probe results, blockers, and the next active phase.
