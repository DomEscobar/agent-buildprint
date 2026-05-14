---
title: OpenClaw AI Influencer OS
slug: ai-influencer-os
category: Product OS
stack: [OpenClaw, Telegram, Wavespeed, OpenRouter, Docker, Browser publishing, Persona memory]
difficulty: Advanced
status: publishable-draft
creator: Agent Buildprint
---

# OpenClaw AI Influencer OS Buildprint

## 1. Product promise

Build a Mila-style AI influencer operating system on top of **OpenClaw**: a believable persona with chat, memory, life continuity, image generation via **Wavespeed**, social content planning, browser-based publishing, manager QA, and safety gates.

This Buildprint is intentionally based on the real Mila architecture. It should not become a generic chatbot scaffold. It should create an OpenClaw-powered influencer system that can be adapted through an alignment interview before implementation.

## 2. Blueprint principle

A good Buildprint is not just instructions. It is an alignment layer.

Before coding, the agent must ask the user the questions in `questions.md`, unless the user says:

```txt
Use Mila defaults.
```

The agent should then adapt the implementation to the user’s answers while preserving the core architecture and safety rules.

## 3. What this builds

A Dockerized OpenClaw influencer bot with:

1. **OpenClaw runtime** — containerized bot/app runtime.
2. **Persona files** — `SOUL.md`, `USER.md`, canon, boundaries.
3. **LLM-led semantic analyzer** — model returns structured JSON understanding of messages.
4. **Runtime context injection** — private compact block with mood, life state, memory, trust, media status.
5. **Relationship memory** — per-user trust, intimacy, stage, facts, preferences, open loops, recent messages.
6. **Self/life state** — mood, energy, social battery, active games, gym rhythm, taste phase, upcoming plans.
7. **Calendar/journal** — coherent simulated life, planned/done/skipped events, daily journal.
8. **Social drafts/outbox** — content backlog, drafts, media jobs, posted history.
9. **Wavespeed image generation** — required provider path for image generation.
10. **Media gates** — public/private separation, trust/consent gates, identity/canon QA.
11. **Browser publishing** — visible Chromium/noVNC publishing flow like Mila, with manual handoff.
12. **Manager layer** — system health, canon QA, social QA, trend/taste freshness, proactive safe repairs.
13. **Tests and audit** — syntax/tests/manager audit and publish dry-run checks.

## 4. Required OpenClaw/Mila-like architecture

Recommended generated project shape:

```txt
config/
  openclaw.json
persona/
  SOUL.md
  USER.md
  CANON.md
  BOUNDARIES.md
extensions/
  influencer-persona/
    openclaw.plugin.json
    index.js
    intent.js
    runtime-context.js
    media-flow.js
    policy.js
    storage.js
skills/
  influencer-image/
    SKILL.md
    influencer-image
    config.json
  influencer-post/
    SKILL.md
    influencer-post
  influencer-social/
    SKILL.md
    social
  influencer-journal/
    SKILL.md
    journal
  influencer-calendar/
    SKILL.md
    calendar
  influencer-recall/
    SKILL.md
    recall
life/
  life-state.mjs
  life-tick.mjs
  social-planner.mjs
  social-autonomy.mjs
  social-publisher.mjs
  journal-writer.mjs
  reflect-memory.mjs
  manager-audit.mjs
docker/
  Dockerfile
  docker-compose.yml
  entrypoint.sh
storage/
  users/.gitkeep
  influencer-self/state.json
  calendar/events.json
  social/drafts.json
  social/media-jobs.json
  social/posted-history.json
  browser/profile/.gitkeep
dashboard/
  public/index.html
tests/
  persona.test.js
  image-generation.test.js
  life.test.js
  social-publish.test.js
MANAGER.md
LIFE_CONTINUITY.md
README.md
VALIDATION.md
```

## 5. Required environment variables

The implementation must document these names and create `.env.example`. It must never commit real values.

```txt
TELEGRAM_BOT_TOKEN=
OPENROUTER_API_KEY=
OPENCLAW_AGENT_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_ANALYZER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_LIFE_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_SOCIAL_PLANNER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_REPAIR_MODEL=openrouter/deepseek/deepseek-v4-flash
WAVESPEED_API_KEY=
WAVESPEED_API_URL=
MILA_IMAGE_GENERATION_TIMEOUT_MS=180000
SOCIAL_VISIBLE_BROWSER_PORT=7900
MILA_DASHBOARD_PORT=8626
AUTO_PUBLISH_SOCIAL=false
MILA_AUTONOMY_LOOP=false
MILA_MANAGER_AUDIT_LOOP=true
```

Wavespeed image generation is not optional for the full blueprint. If the user does not have a Wavespeed key yet, implement mock mode plus setup docs and clearly mark real image generation as blocked.

## 6. Implementation phases

### Phase 0 — Alignment interview

Ask `questions.md`. Summarize chosen deviations from Mila defaults. Get confirmation.

### Phase 1 — OpenClaw skeleton

Create Dockerized OpenClaw project with persona files, config, plugin, and skills.

### Phase 2 — Persona + memory

Implement LLM-led JSON analyzer, runtime context injection, relationship memory, and no prompt/runtime leakage.

### Phase 3 — Life continuity

Implement self-state, calendar, journal, life tick, and reflection. Claims in chat/social must be grounded.

### Phase 4 — Wavespeed media

Implement `influencer-image` skill using Wavespeed env vars. Add mock mode for tests. Enforce public/private media policy.

### Phase 5 — Social planning and publishing

Implement drafts, media jobs, mock publishing, browser/noVNC publishing flow, handoff states, and failure capture.

### Phase 6 — Manager layer

Implement manager audit and safe repair loop: drafts, media jobs, trend freshness, SMM/social traces, stale failures, and canon consistency.

### Phase 7 — Validation

Run syntax checks, tests, manager audit, image mock test, social publish dry-run, and write `VALIDATION.md`.

## 7. Core Mila defaults

If the user says “use Mila defaults”, use:

- mixed DE/EN, German-leaning casual chat;
- dry, direct, understated, lightly teasing voice;
- lifestyle/gaming/gym/streetwear/coffee content lane;
- public content safe for Instagram/TikTok;
- private media gated by trust/consent;
- OpenRouter + DeepSeek model defaults;
- Wavespeed for image generation;
- visible Chromium/noVNC browser publishing;
- manual approval or mock mode before auto-publish;
- manager layer can patch safe local issues but not change persona direction.

## 8. Acceptance checks

The generated project passes if:

- It is visibly OpenClaw-based and Dockerized.
- `.env.example` includes `WAVESPEED_API_KEY` and OpenRouter/OpenClaw model vars.
- The implementation asks alignment questions before coding unless “use Mila defaults” was supplied.
- Persona files and canon exist.
- User memory and self-state are separate.
- Runtime context builder includes memory/life/media status but does not leak internals.
- Image generation path uses Wavespeed or mock mode when key is absent.
- Public media and private media have separate policies.
- Social publishing starts mock/manual-gated.
- Browser/noVNC publishing flow is documented.
- Manager audit exists.
- Tests or validation scripts run without external APIs.
- `VALIDATION.md` documents chosen deviations, missing keys, and next steps.

## 9. Copyable agent prompt

```txt
Build an OpenClaw AI Influencer OS from this Buildprint.

First read questions.md and ask the user the alignment questions unless they explicitly say “use Mila defaults”. After answers, summarize the chosen deviations and ask for confirmation.

Then implement a Mila-style OpenClaw project with Docker, persona files, influencer-persona plugin, memory/self-state storage, life tick, journal, social planner, Wavespeed image skill, media policy, mock publishing, browser/noVNC publishing docs, manager audit, tests, .env.example, and VALIDATION.md.

Do not use real secrets.
Do not call external APIs in tests.
If WAVESPEED_API_KEY is missing, implement mock mode and mark real image generation as blocked.
Preserve safety gates and public/private media separation.
```
