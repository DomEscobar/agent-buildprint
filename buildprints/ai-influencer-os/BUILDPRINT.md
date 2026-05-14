---
title: OpenClaw AI Influencer OS
slug: ai-influencer-os
category: Product OS
stack: [OpenClaw, Telegram, Wavespeed, OpenRouter, Docker, Browser publishing]
difficulty: Advanced
status: publishable-draft
agentFile: true
---

# BUILDPRINT: OpenClaw AI Influencer OS

## Mission

Build a **Mila-style AI influencer OS** on OpenClaw.

Not generic chatbot. Not generic content bot.

Must include:

```txt
OpenClaw runtime
→ persona plugin
→ memory + life state
→ Wavespeed image skill
→ social planner
→ manager QA
→ browser/noVNC publishing handoff
```

## First action: align with user

Before implementation, ask `questions.md` unless user says:

```txt
Use Mila defaults.
```

After answers:

1. summarize chosen deviations from Mila defaults;
2. ask for confirmation;
3. then build.

Record final choices in `VALIDATION.md`.

## Mila defaults

Use these if user says “use Mila defaults”:

```yaml
runtime: OpenClaw
chat: Telegram first
language: mixed DE/EN, German-leaning
voice: dry, direct, understated, lightly teasing
content_lane: lifestyle + gaming + gym + streetwear + coffee
image_provider: Wavespeed
model_provider: OpenRouter / DeepSeek-style defaults
publishing: visible Chromium/noVNC, mock/manual-gated first
autonomy: life/social loops allowed, real posting disabled by default
manager: QA + safe local repairs, no persona direction changes
```

## Required generated structure

```txt
config/openclaw.json
persona/SOUL.md
persona/USER.md
persona/CANON.md
persona/BOUNDARIES.md
extensions/influencer-persona/
  openclaw.plugin.json
  index.js
  intent.js
  runtime-context.js
  media-flow.js
  policy.js
  storage.js
skills/influencer-image/
  SKILL.md
  influencer-image
  config.json
skills/influencer-post/
skills/influencer-social/
skills/influencer-journal/
skills/influencer-calendar/
skills/influencer-recall/
life/
  life-state.mjs
  life-tick.mjs
  journal-writer.mjs
  reflect-memory.mjs
  social-planner.mjs
  social-autonomy.mjs
  social-publisher.mjs
  manager-audit.mjs
docker/Dockerfile
docker/docker-compose.yml
docker/entrypoint.sh
storage/users/.gitkeep
storage/influencer-self/state.json
storage/calendar/events.json
storage/social/drafts.json
storage/social/media-jobs.json
storage/browser/profile/.gitkeep
dashboard/public/index.html
tests/
MANAGER.md
LIFE_CONTINUITY.md
.env.example
README.md
VALIDATION.md
```

## Required env names

Create `.env.example`. Never commit real values.

```txt
TELEGRAM_BOT_TOKEN=
OPENROUTER_API_KEY=
WAVESPEED_API_KEY=
WAVESPEED_API_URL=
OPENCLAW_AGENT_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_ANALYZER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_LIFE_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_SOCIAL_PLANNER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_REPAIR_MODEL=openrouter/deepseek/deepseek-v4-flash
SOCIAL_VISIBLE_BROWSER_PORT=7900
INFLUENCER_DASHBOARD_PORT=8626
AUTO_PUBLISH_SOCIAL=false
INFLUENCER_AUTONOMY_LOOP=false
INFLUENCER_MANAGER_AUDIT_LOOP=true
```

## Module contracts

### Persona plugin

Must:

- call LLM for structured JSON understanding;
- build compact private runtime context;
- include memory, life state, trust, recent messages, media status;
- never leak prompts/config/private state in normal chat;
- route media requests through policy/tool gates.

### Memory

Must store per-user:

```txt
trust, intimacy/stage, facts, preferences, open loops,
recent messages, relationship notes, image/media budget
```

### Life continuity

Must store persona self-state separately from user memory:

```txt
mood, energy, social battery, current arcs,
calendar events, journal, content backlog
```

Claims in chat/social must be grounded in this state.

### Wavespeed image skill

Must:

- use `WAVESPEED_API_KEY` for real mode;
- support mock mode for tests;
- separate public social images from private requests;
- block or gate sensitive/private media;
- keep visual/canon consistency.

### Social publishing

Must:

- start mock/manual-gated;
- document visible Chromium/noVNC flow;
- capture failure/handoff states;
- never auto-publish by default.

### Manager QA

Must check:

- stale drafts/jobs;
- unsafe media;
- ungrounded life claims;
- canon drift;
- repeated/low-quality drafts;
- missing auth/login/publishing blockers.

## Implementation phases

```txt
0 ask questions / confirm alignment
1 OpenClaw Docker skeleton
2 persona plugin + memory
3 life state + journal + calendar
4 Wavespeed image skill + mock mode
5 social drafts + mock publisher + browser handoff docs
6 manager audit
7 tests + VALIDATION.md
```

## Acceptance gates

Implementation is not done until:

- alignment questions were asked or Mila defaults were explicitly chosen;
- OpenClaw config/plugin/skills exist;
- `.env.example` contains `WAVESPEED_API_KEY`;
- image path is Wavespeed-based with mock fallback;
- public/private media policies are separate;
- user memory and self-state are separate;
- ungrounded public claims are blocked;
- real posting is disabled by default;
- browser/noVNC handoff is documented;
- tests/validation run without external APIs;
- `VALIDATION.md` lists chosen deviations, missing keys, and next steps.

## If uncertain

Ask. Do not invent.

Especially ask before changing:

- persona direction;
- content niche;
- adult/private media rules;
- auto-publishing;
- platform targets;
- model/image providers.
