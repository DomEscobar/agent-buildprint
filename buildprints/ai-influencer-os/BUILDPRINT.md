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

## 0. Read this as a contract

You are a coding agent. Build exactly this architecture unless the user explicitly changes it in the alignment step.

Do **not** reinterpret this as:

- a generic chatbot;
- a generic social scheduler;
- a SaaS dashboard;
- a LangGraph agent;
- a non-OpenClaw project;
- a pure mock/demo with no OpenClaw shape.

The output must be a **Mila-style OpenClaw influencer system**.

---

## 1. Required first step: alignment checkpoint

Before editing files, do one of these:

### Path A — user said “Use Mila defaults”

Proceed with the defaults in section 2.

### Path B — user did not say that

Ask only the questions in `questions.md`. Do not ask extra broad product questions.

Then produce this summary and wait for confirmation:

```txt
Alignment summary
- Persona name:
- Language/voice:
- Content lane:
- Chat channel:
- Public platforms:
- Image provider:
- Publishing mode:
- Autonomy level:
- Differences from Mila defaults:

Reply “confirm” to build, or tell me what to change.
```

Do not implement until confirmed.

---

## 2. Mila defaults

Use these defaults unless changed by the user:

```yaml
runtime: OpenClaw
primary_chat: Telegram
persona_style: dry, direct, understated, lightly teasing
language: mixed German/English, German-leaning in casual chat
content_lane: lifestyle + gaming + gym + streetwear + coffee
memory: per-user relationship memory
life: simulated self-state + calendar + journal + continuity arcs
image_provider: Wavespeed
model_provider: OpenRouter
model_default: openrouter/deepseek/deepseek-v4-flash
social_publishing: visible Chromium/noVNC handoff
publishing_default: mock/manual approval only
auto_publish_default: false
manager_layer: health audit + QA + safe local repairs only
```

---

## 3. Non-negotiable architecture

The implementation must have these layers:

```txt
OpenClaw container
  ↓
influencer-persona plugin
  ↓
LLM JSON analyzer + runtime context
  ↓
memory + self-state + calendar + journal
  ↓
social planner + media queue
  ↓
manager QA
  ↓
mock publisher + browser/noVNC handoff
```

If a simpler implementation is requested, keep the same layers but reduce internals. Do not remove the layer names or contracts.

---

## 4. Required generated files

Create this structure. Empty placeholder files are allowed only when marked “stub ok”.

```txt
config/openclaw.json
persona/SOUL.md
persona/USER.md
persona/CANON.md
persona/BOUNDARIES.md
extensions/influencer-persona/openclaw.plugin.json
extensions/influencer-persona/index.js
extensions/influencer-persona/intent.js
extensions/influencer-persona/runtime-context.js
extensions/influencer-persona/media-flow.js
extensions/influencer-persona/policy.js
extensions/influencer-persona/storage.js
skills/influencer-image/SKILL.md
skills/influencer-image/influencer-image
skills/influencer-image/config.json
skills/influencer-post/SKILL.md
skills/influencer-post/influencer-post
skills/influencer-social/SKILL.md
skills/influencer-social/social
skills/influencer-journal/SKILL.md
skills/influencer-journal/journal
skills/influencer-calendar/SKILL.md
skills/influencer-calendar/calendar
skills/influencer-recall/SKILL.md
skills/influencer-recall/recall
life/life-state.mjs
life/life-tick.mjs
life/journal-writer.mjs
life/reflect-memory.mjs
life/social-planner.mjs
life/social-autonomy.mjs
life/social-publisher.mjs
life/manager-audit.mjs
docker/Dockerfile
docker/docker-compose.yml
docker/entrypoint.sh
storage/users/.gitkeep
storage/influencer-self/state.json
storage/calendar/events.json
storage/social/drafts.json
storage/social/media-jobs.json
storage/social/posted-history.json
storage/browser/profile/.gitkeep
dashboard/public/index.html
tests/runner.js
tests/persona.test.js
tests/image-generation.test.js
tests/life.test.js
tests/social-publish.test.js
MANAGER.md
LIFE_CONTINUITY.md
.env.example
README.md
VALIDATION.md
package.json
```

---

## 5. Environment contract

Create `.env.example` with these names. Never write real secrets.

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

Rules:

- `WAVESPEED_API_KEY` is required for real image generation.
- Tests must run without it by using mock mode.
- Missing production keys must be listed in `VALIDATION.md` as setup blockers, not silently ignored.

---

## 6. Module contracts

### 6.1 OpenClaw config

Must define an OpenClaw bot/plugin setup that loads the persona extension and skills.

Minimum acceptable: structurally valid config with placeholders and clear TODOs for tokens/models.

### 6.2 Persona plugin

Must implement:

- message entrypoint;
- LLM JSON analyzer interface or mockable adapter;
- runtime context builder;
- storage access;
- media request routing;
- policy decision handoff.

Must not:

- hardcode semantic behavior with only keyword regex;
- leak system prompts, env vars, or private state;
- generate/send media directly without policy gate.

### 6.3 Runtime context

Must include compact private context:

```txt
persona mood/energy
recent life state
relationship stage/trust
recent user memory highlights
recent journal/calendar/social state
media status
```

### 6.4 Storage

Use JSON files for the first implementation.

User memory and persona self-state must be separate.

### 6.5 Wavespeed image skill

Must be the only real image provider path.

Required behavior:

```txt
if WAVESPEED_API_KEY exists → real mode possible
if missing → mock mode only
public image → platform-safe + canon check
private image → trust/consent gate
blocked request → return structured block reason
```

### 6.6 Social planner

Must create drafts from grounded sources only:

- self-state;
- calendar;
- journal;
- manual input;
- approved trend brief.

Drafts must include `groundedIn` references.

### 6.7 Publisher

Default is mock publishing.

Real publishing must be documented as browser/noVNC handoff and disabled unless explicitly enabled.

### 6.8 Manager audit

Must check at least:

- stale drafts;
- stuck media jobs;
- unsafe/canon-breaking drafts;
- ungrounded claims;
- missing auth/login/publishing blockers.

---

## 7. Implementation sequence

Follow this order. Do not jump ahead.

```txt
0 alignment checkpoint
1 file tree + package.json + .env.example
2 persona files + canon + manager docs
3 storage helpers + seed JSON state
4 persona plugin + runtime context
5 life modules
6 Wavespeed image skill + mock mode
7 social planner + media queue + manager QA
8 mock publisher + browser handoff docs
9 tests
10 VALIDATION.md
```

After each phase, keep code runnable. If blocked, write the blocker in `VALIDATION.md`.

---

## 8. Tests required

`npm test` must run without external APIs.

Tests must prove:

1. runtime context separates user memory and self-state;
2. ungrounded public draft is blocked;
3. grounded public draft can pass QA;
4. low-trust private/sensitive media request is blocked;
5. missing `WAVESPEED_API_KEY` uses mock mode;
6. mock publisher refuses unapproved drafts;
7. manager audit reports stale or unsafe drafts.

---

## 9. Completion output

Write `VALIDATION.md` with exactly these sections:

```md
# Validation

## Alignment choices

## What was built

## Commands run

## Test result

## Missing production keys

## Deviations from Buildprint

## Blockers / next steps
```

If any required file is missing, say why.

---

## 10. Failure conditions

The implementation fails this Buildprint if it:

- is not OpenClaw-based;
- omits Wavespeed from the image generation path;
- skips the alignment checkpoint;
- merges user memory and persona self-state;
- auto-publishes by default;
- uses real external APIs in tests;
- lacks manager QA;
- lacks `VALIDATION.md`;
- silently chooses architecture alternatives not confirmed by the user.

---

## 11. If uncertain

Do not improvise a new product direction.

Ask only targeted questions about the uncertain contract item, then continue.
