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


## 0A. Attention anchors for coding agents

Keep these tokens active while planning and coding:

```txt
TARGET_SHAPE = OpenClaw container + persona extension + skills + life modules + Wavespeed image skill + browser/noVNC publishing handoff
RUNTIME = OpenClaw
IMAGE_PROVIDER = Wavespeed only for production
REFERENCE_ARCHITECTURE = OpenClaw Influencer OS default preset
DEFAULT_OUTPUT = Dockerized bot, not SaaS app
TEST_MODE = no external API calls, tests set mock mode themselves; .env.example must not enable test mode
PUBLISHING_DEFAULT = mock/manual approval, never auto-publish by default
ALIGNMENT = ask closed config questions only, then build
```

When instructions conflict, preserve `TARGET_SHAPE`.

If you notice yourself building a generic Node/Express/Next/SaaS/chatbot template, stop and return to `TARGET_SHAPE`.

---

## 0B. Definition of working

The build is working only when all are true:

| Gate | Must be true |
|---|---|
| OpenClaw shape | config, extension, skills, Docker entrypoint exist and call the OpenClaw CLI/runtime |
| Persona runtime | SOUL/USER/canon feed runtime context |
| Analyzer | production intent analysis goes through a mockable LLM JSON adapter, not keyword-only regex |
| Memory split | user relationship memory separate from persona self-state |
| Images | Wavespeed real adapter path exists; tests use mock mode |
| Media safety | public/private media have different gates |
| Social | drafts require `groundedIn`; publisher is mock/manual by default |
| Browser handoff | runnable Chromium/noVNC service or compose profile exists and handoff is documented |
| Manager | audit reports stale, unsafe, ungrounded, blocked items |
| Tests | `npm test` passes without external APIs and `npm run test:static` includes syntax + alignment checks |
| Env contract | `.env.example` contains exact required names and does not enable test/mock mode by default |
| Package identity | generated app package is `openclaw-ai-influencer-os`, not the Buildprint CLI package `agb` |
| Validation | `VALIDATION.md` records choices, keys, deviations, blockers |

---

## 0C. Common drift map

| If you drift toward... | Correct back to... |
|---|---|
| generic chatbot | OpenClaw persona extension + runtime context + memory/life state |
| keyword-only bot | mockable LLM JSON analyzer adapter with tests proving production is not regex-only |
| SaaS dashboard | Dockerized OpenClaw bot first; dashboard is minor status UI only |
| image abstraction | Wavespeed production adapter path with mock fallback |
| pure mock demo | real file/module shape + behavior tests; mock only external APIs |
| social scheduler | default persona preset life/social planner with manager QA and grounded drafts |
| auto-poster | mock/manual-gated publisher + browser/noVNC handoff |
| broad product discovery | closed configuration interview only |

---


## 0D. Buildprint package map

Use the files as separate alignment rails:

```txt
BUILDPRINT.md          architecture truth
SPEC.md                behavior truth
PLAN.md                execution index
plans/*.md             feature-by-feature task rails
CONTRACTS.md           interface/data truth
DEFAULT_PRESET.md      configurable default values, no fixed persona name
TEST_MATRIX.md         risk → test truth
VALIDATION_TEMPLATE.md completion report shape
```

Do not collapse these into one vague implementation plan.

---

## 0. Contract for the coding agent

Build an **OpenClaw AI Influencer OS with a configurable persona and a default preset**.

This Buildprint is not a brainstorming prompt. Treat it as an execution contract.

You may configure names, voice, channels, content lanes, and approval settings from the user answers. You may **not** change the architecture unless the user explicitly asks to abandon this Buildprint.

Hard no:

```txt
NO generic chatbot
NO generic social scheduler
NO LangGraph replacement
NO SaaS dashboard-first rewrite
NO non-OpenClaw runtime
NO image provider swap away from Wavespeed
NO real external API calls in tests
NO keyword-only production analyzer
NO auto-publishing by default
```

---

## 1. First action: configuration interview

Before implementation:

```txt
if user said "Use default persona preset":
  use section 2 and start building
else:
  ask exactly questions.md
  summarize answers using the required summary template
  wait for confirmation
```

The questions configure the fixed system. They do not invite product redesign.

If the user refuses Wavespeed, stop and explain:

```txt
This Buildprint requires Wavespeed for production image generation. I can continue with mock mode, but a non-Wavespeed production provider is outside this Buildprint.
```

Record final choices in `VALIDATION.md`.

---

## 2. Default persona preset

Use these values unless changed by confirmed user answers.

Important: the default preset does **not** include a fixed persona name. If the user does not provide a name, generate a fresh fictional persona name and short identity. Do not reuse or reference any existing persona name.

```yaml
runtime: OpenClaw
primary_chat: Telegram
persona_name: generated fresh fictional name unless user provides one
persona_style: dry, direct, understated, lightly teasing
language: mixed German/English, German-leaning casual chat
content_lane: lifestyle + gaming + gym + streetwear + coffee
memory: per-user relationship memory
life: simulated self-state + calendar + journal + continuity arcs
image_provider: Wavespeed
model_provider: OpenRouter
model_default: openrouter/deepseek/deepseek-v4-flash
publishing_handoff: visible Chromium/noVNC
publishing_default: mock/manual approval only
auto_publish_default: false
autonomy_default: disabled until tests pass
manager_layer: health audit + QA + safe local repairs only
storage: JSON files first
```

---

## 3. Fixed architecture

Implement this exact architecture:

```txt
Dockerized OpenClaw runtime
  |-- workspace persona files
  |   |-- SOUL.md
  |   `-- USER.md
  |-- influencer-persona extension/plugin
  |   |-- LLM JSON analyzer adapter (production path must call configured LLM/OpenRouter-compatible endpoint)
  |   |-- runtime context builder
  |   |-- policy gate
  |   |-- media flow
  |   `-- storage adapter
  |-- skills
  |   |-- influencer-image  -> Wavespeed real mode / mock test mode
  |   |-- influencer-post   -> browser/noVNC publish handoff
  |   |-- influencer-social -> drafts/outbox/history
  |   |-- influencer-journal
  |   |-- influencer-calendar
  |   `-- influencer-recall
  |-- life modules
  |   |-- life tick
  |   |-- journal writer
  |   |-- memory reflection
  |   |-- social planner
  |   |-- social autonomy
  |   `-- manager audit
  `-- storage
      |-- users/<id>.json
      |-- influencer-self/state.json
      |-- calendar/events.json
      |-- social/drafts.json
      |-- social/media-jobs.json
      `-- social/posted-history.json
```

If the user asks for an MVP, keep all boxes but simplify internals. Do not remove boxes.

---

## 4. Required file tree

Create these files. Do not replace this tree with a different framework layout.

```txt
AGENTS.md
SOUL.md
USER.md
config/openclaw.json
persona/CANON.md
persona/BOUNDARIES.md
extensions/influencer-persona/openclaw.plugin.json
extensions/influencer-persona/index.js
extensions/influencer-persona/intent.js
extensions/influencer-persona/analyzer-adapter.js
extensions/influencer-persona/runtime-context.js
extensions/influencer-persona/media-flow.js
extensions/influencer-persona/policy.js
extensions/influencer-persona/storage.js
skills/influencer-image/SKILL.md
skills/influencer-image/influencer-image
skills/influencer-image/config.json
skills/influencer-image/wavespeed-client.js
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
docker/novnc.Dockerfile
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

Minimum behavior is required. Empty stubs do not pass unless `VALIDATION.md` marks the phase blocked.

---

## 5. Environment contract

Create `.env.example` exactly with these names. Never commit real secrets.

```txt
TELEGRAM_BOT_TOKEN=
OPENROUTER_API_KEY=
WAVESPEED_API_KEY=
WAVESPEED_API_URL=
INFLUENCER_IMAGE_GENERATION_TIMEOUT_MS=180000
OPENCLAW_AGENT_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_ANALYZER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_LIFE_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_SOCIAL_PLANNER_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_REPAIR_MODEL=openrouter/deepseek/deepseek-v4-flash
OPENCLAW_RUNTIME_CMD=openclaw run --config config/openclaw.json
SOCIAL_VISIBLE_BROWSER_PORT=7900
INFLUENCER_DASHBOARD_PORT=8626
AUTO_PUBLISH_SOCIAL=false
INFLUENCER_AUTONOMY_LOOP=false
INFLUENCER_MANAGER_AUDIT_LOOP=true
```

Rules:

- Use exactly these env var names. Do not rename `WAVESPEED_API_URL` to `WAVESPEED_BASE_URL`; do not collapse model envs into one generic model var.
- `.env.example` must not set `TEST_MODE=true`, `INFLUENCER_TEST_MODE=mock`, or any other test/mock flag by default.
- Tests must set their own mock/test env inside `tests/runner.js` or the individual test process.
- `WAVESPEED_API_KEY` gates real image generation.
- No production key is required for tests.
- Tests must use mock mode.
- Missing keys must appear in `VALIDATION.md`.

---

## 6. Runtime behavior contracts

### 6.1 OpenClaw runtime

Must include:

- OpenClaw config that loads the extension and skills;
- Docker compose service for the bot/runtime;
- entrypoint that prepares workspace/persona files;
- documented startup command;
- concrete `OPENCLAW_RUNTIME_CMD`/CLI invocation path or an explicit adapter module that can be swapped for the real OpenClaw runtime;
- a static/test check proving the Docker entrypoint starts OpenClaw or deliberately fails with a structured `openclaw_runtime_missing` blocker instead of silently running a generic Node app.

### 6.2 Persona extension

Must include:

- message entrypoint;
- mockable LLM JSON analyzer adapter in `extensions/influencer-persona/analyzer-adapter.js`;
- runtime context builder;
- user/self storage reads/writes;
- media request routing through policy;
- no direct image generation without policy gate.

The analyzer may be mocked in tests, but production path must be LLM-led, not only keyword regex.

Required analyzer contract:

```txt
classifyIntent(message, context, options)
  if options.mockAnalyzer exists: use it for tests
  else call analyzeIntentWithLLM(message, context)

analyzeIntentWithLLM(message, context)
  reads OPENROUTER_API_KEY and OPENCLAW_ANALYZER_MODEL
  sends compact private RuntimeContext + user message to an OpenRouter-compatible chat/completions endpoint
  requests strict JSON matching AnalyzerResult
  validates JSON shape before returning
  if key is missing in production: return/block with structured analyzer_unconfigured reason
```

Keyword heuristics may only be a test fixture, local fallback explicitly named `mock`/`heuristic`, or a repair fallback after the LLM adapter fails. They must not be the normal production path.

### 6.3 Runtime context

Must build a compact private block with:

```txt
persona mood/energy
life state summary
relationship stage/trust
recent memory highlights
journal/calendar/social status
media status
```

Never expose this private block in normal chat responses.

### 6.4 Storage

Use JSON first.

Separate:

```txt
user relationship memory  ≠  persona self-state
```

User memory includes trust, stage, facts, preferences, open loops, recent messages, relationship notes, media budget.

Self-state includes mood, energy, social battery, current arcs, calendar, journal, content backlog.

### 6.5 Wavespeed image skill

Only real provider path: Wavespeed.

Implement a concrete client module, not only an env-key check:

```txt
createWavespeedImage({ prompt, aspectRatio, seed, safety, webhookUrl? })
  requires WAVESPEED_API_KEY
  POST ${WAVESPEED_API_URL || "https://api.wavespeed.ai/api/v3"}/<model-or-endpoint>
  Authorization: Bearer <WAVESPEED_API_KEY>
  returns { id, status, assetUrl?, raw }

pollWavespeedJob(id)
  GET the provider job/result endpoint
  normalizes queued/processing/succeeded/failed into local MediaJob status
```

If the exact Wavespeed endpoint/model is uncertain, isolate it behind `skills/influencer-image/wavespeed-client.js`, document the assumed endpoint in `VALIDATION.md`, and keep tests on a mocked fetch/client. Do not replace Wavespeed with another provider.

`extensions/influencer-persona/media-flow.js` must import/use the Wavespeed client by default for real mode. It may accept an injected mock/client for tests, but production behavior must not depend on a caller remembering to pass `createImage`.

Required behavior:

```txt
missing WAVESPEED_API_KEY → mock mode / blocked real mode
public media → platform-safe + canon check + draft/life grounding
private media → trust/consent gate
blocked media → structured reason
```

### 6.6 Social planner

Drafts must include:

```txt
id, platform, caption, visualPrompt, groundedIn, status, qaNotes
```

`groundedIn` must reference self-state, calendar, journal, manual input, or approved trend brief.

### 6.7 Publisher

Default publisher is mock/manual-gated.

Real publishing is browser/noVNC handoff only until explicitly enabled.

The repo must include a runnable browser handoff surface:

```txt
docker/novnc.Dockerfile or compose service using a Chromium/noVNC image
compose service exposes SOCIAL_VISIBLE_BROWSER_PORT (default 7900)
storage/browser/profile is mounted for persistent operator login
publisher returns browser_handoff_required until manual approval/session checks pass
```

Must document commands equivalent to:

```bash
influencer-post browser --login-url
influencer-post auth --check instagram
influencer-post queue
influencer-post publish --draft-id <id> --dry-run
influencer-post handoff --draft-id <id>
```

### 6.8 Manager audit

Must report:

- stale drafts;
- stuck media jobs;
- unsafe media;
- ungrounded claims;
- canon drift;
- missing auth/login blockers;
- publishing failures.

---

## 7. Implementation sequence

Follow this order only:

```txt
0 configuration interview / default persona preset
1 package.json + file tree + .env.example
2 OpenClaw config + Docker skeleton
3 persona files + canon + manager docs
4 storage helpers + seed JSON
5 persona extension + runtime context
6 life modules
7 Wavespeed image skill + mock mode
8 social planner + media queue + QA
9 mock publisher + browser/noVNC handoff docs
10 tests
11 VALIDATION.md
```

Keep `npm test` runnable by phase 10. If a phase is blocked, write the reason in `VALIDATION.md` and continue only where safe.

---

## 8. Commands required

`package.json` must identify the generated app, not the Buildprint CLI. Use `"name": "openclaw-ai-influencer-os"`; do not use `"agb"`, `"agent-buildprint"`, `"xy"`, or any CLI/package-registry name for this scaffold.

It must include these scripts and preserve the syntax-check chain. You may append `&& node tests/static-check.js` to `test:static`, but do not replace syntax checks with only a custom static checker.

```json
{
  "name": "openclaw-ai-influencer-os",
  "scripts": {
    "test": "node tests/runner.js",
    "test:unit": "node --test tests/*.test.js",
    "test:static": "node --check extensions/influencer-persona/index.js && node --check extensions/influencer-persona/analyzer-adapter.js && node --check extensions/influencer-persona/runtime-context.js && node --check extensions/influencer-persona/media-flow.js && node --check extensions/influencer-persona/runtime-check.js && node --check skills/influencer-image/wavespeed-client.js && node --check life/life-tick.mjs && node --check life/social-planner.mjs && node --check life/social-publisher.mjs && node --check life/manager-audit.mjs && node tests/static-check.js"
  }
}
```

---

## 9. Tests required

`npm test` must run without external APIs.

Tests must prove:

1. runtime context separates user memory and self-state;
2. private runtime context is not leaked;
3. missing `WAVESPEED_API_KEY` uses mock mode / blocks real mode;
4. low-trust private/sensitive media request is blocked;
5. ungrounded public draft is blocked;
6. grounded public draft can pass QA;
7. mock publisher refuses unapproved drafts;
8. manager audit reports stale or unsafe drafts;
9. production analyzer path is not keyword-only and references/calls the LLM adapter;
10. Wavespeed client module builds a real provider request shape and tests mock the client/fetch;
11. Docker/compose includes OpenClaw runtime command or structured missing-runtime blocker;
12. browser/noVNC compose service or Dockerfile exists and profile storage is mounted;
13. `.env.example` has exact required env var names and no default test/mock mode;
14. `npm run test:static` preserves required `node --check` syntax checks plus alignment checks;
15. `media-flow.js` imports/uses the Wavespeed client by default for real mode;
16. `package.json.name` is `openclaw-ai-influencer-os` and not `agb`/`xy`/`agent-buildprint`.

---

## 10. `VALIDATION.md` format

Write exactly:

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

List any missing required file as a deviation.

---

## 11. Failure conditions

Fail the implementation if it:

- skips the configuration interview or default-preset confirmation;
- is not OpenClaw-shaped;
- omits Wavespeed from production image generation;
- uses real APIs in tests;
- merges user memory and self-state;
- lacks public/private media policy separation;
- auto-publishes by default;
- lacks manager audit;
- lacks browser/noVNC handoff docs or runnable noVNC/Chromium service shape;
- implements production analyzer as keyword/regex only;
- only checks `WAVESPEED_API_KEY` without a real Wavespeed client adapter shape;
- leaves `.env.example` in test/mock mode by default;
- renames required env vars without documenting/confirming the change;
- replaces syntax checks with only a custom static checker;
- requires callers to inject the real Wavespeed image function for production media flow;
- names the generated app package `agb`, `xy`, or `agent-buildprint`;
- lacks runnable tests;
- silently changes architecture.

---

## 12. If uncertain

Ask one targeted question about the uncertain contract item. Then continue.

Do not ask broad strategy questions. Do not invent a different product.


---

## Consolidated notes from `architecture.md`

# OpenClaw/default-preset Architecture Diagram

```txt
Telegram / chat channel
  ↓
OpenClaw Gateway + Agent Runtime
  ↓
influencer-persona plugin
  ├─ LLM JSON analyzer
  ├─ runtime context builder
  ├─ policy/media gates
  └─ Telegram/media delivery
  ↓
storage
  ├─ users/<id>.json
  ├─ influencer-self/state.json
  ├─ calendar/events.json
  ├─ social/drafts.json
  └─ social/media-jobs.json
  ↓
life modules
  ├─ life-tick
  ├─ journal-writer
  ├─ reflect-memory
  ├─ social-planner
  ├─ social-autonomy
  ├─ social-publisher
  └─ manager-audit
  ↓
skills
  ├─ influencer-image → Wavespeed / mock
  ├─ influencer-post → visible browser/noVNC / mock
  ├─ influencer-social
  ├─ influencer-calendar
  ├─ influencer-journal
  └─ influencer-recall
```
