---
title: OpenClaw AI Influencer OS
slug: ai-influencer-os
category: Product OS
stack: [OpenClaw, Telegram, Wavespeed, OpenRouter, Docker, Browser publishing]
difficulty: Advanced
status: publishable-draft
agentFile: true
---

# Buildprint: OpenClaw AI Influencer OS

## Agent Operating Contract

Build an OpenClaw-based AI Influencer OS with a configurable fictional persona, a default preset, persistent relationship memory, separate persona life state, Wavespeed image generation, grounded social drafting, manager audit, and secured local browser/noVNC publishing handoff.

`BUILDPRINT.md` is the canonical authority. `SPEC.md`, `CONTRACTS.md`, `DEFAULT_PRESET.md`, `PLAN.md`, `plans/*.md`, `TEST_MATRIX.md`, `VALIDATION_TEMPLATE.md`, policies, and acceptance checks support this contract but do not replace it.

The generated app package must be named `openclaw-ai-influencer-os`. The runtime shape is Dockerized OpenClaw, not a generic chatbot, generic social scheduler, LangGraph replacement, SaaS dashboard-first app, or non-OpenClaw runtime.

Required constants:

```txt
TARGET_SHAPE = OpenClaw container + persona extension + skills + life modules + Wavespeed image skill + secured local browser/noVNC publishing handoff
RUNTIME = OpenClaw
IMAGE_PROVIDER = Wavespeed only for production
DEFAULT_OUTPUT = Dockerized bot, not SaaS app
TEST_MODE = no external API calls; tests set mock mode themselves
PUBLISHING_DEFAULT = mock/manual approval; never auto-publish by default
ALIGNMENT = ask closed config questions only, then build
```

## Binding Implementation Slice

The included implementation slice is:

- OpenClaw config, extension, skills, Docker entrypoint, and runnable runtime command. A structured `openclaw_runtime_missing` result is an honest validation failure and cannot satisfy implementation evidence.
- SOUL/USER/canon persona context with configurable persona name and default preset values.
- LLM JSON analyzer adapter for production intent analysis through an OpenRouter-compatible endpoint; tests may inject a mock analyzer.
- Runtime context builder that separates private relationship memory from persona self-state.
- JSON-file storage for user memory, self-state, calendar, journal, social drafts, media jobs, and posted history.
- Life modules for life tick, journal writing, memory reflection, social planning, social autonomy, publisher, and manager audit.
- Wavespeed image skill with a concrete real provider client and mock test path.
- Public/private media policy gates with structured block reasons.
- Grounded social drafts with `groundedIn` references.
- Mock/manual-gated publisher plus authenticated local-only Chromium/noVNC handoff.
- Tests and static checks proving the above without external API calls.

## Non-Goals / Unsafe Claims

Do not claim or implement as included behavior:

- a generic chatbot or scheduler in place of the OpenClaw persona extension;
- a production image provider other than Wavespeed;
- real external API calls during tests;
- keyword/regex-only production intent analysis;
- merged user memory and persona self-state;
- public/private media handled by the same gate;
- auto-publishing by default;
- passwordless, unauthenticated, or publicly bound noVNC/VNC;
- empty command wrappers counted as working commands;
- package identity `agb`, `xy`, `agent-buildprint`, or any Buildprint CLI package name;
- secret values committed to files;
- tests marked passing when required files or phases are blocked.

If a required production key is missing, the relevant production path must return a structured blocked status or use an explicitly labeled mock test path. It must not report false production success.

## Required Read Order

1. `BUILDPRINT.md`
2. `DEFAULT_PRESET.md`
3. `questions.md`
4. `SPEC.md`
5. `CONTRACTS.md`
6. `PLAN.md`
7. `plans/*.md` in numeric order
8. `policies/media.md`
9. `policies/safety.md`
10. `TEST_MATRIX.md`
11. `checks/acceptance.md`
12. `VALIDATION_TEMPLATE.md`

## Phase Gates

0. Alignment: use the default persona preset if the user says `Use default persona preset`; otherwise ask exactly `questions.md`, summarize choices, and wait for confirmation.
1. Package and file tree: create the required app files, `.env.example`, and package scripts with package name `openclaw-ai-influencer-os`.
2. OpenClaw runtime: add config, Docker structure, entrypoint, skills, and a runnable runtime command. If the local OpenClaw runtime is unavailable, record `openclaw_runtime_missing` as blocked and do not mark acceptance passed.
3. Persona foundation: create persona files, canon, boundaries, manager docs, and validation record from confirmed choices.
4. Storage: seed JSON stores and helpers with user memory separate from persona self-state.
5. Persona extension: implement entrypoint, analyzer adapter, runtime context, storage, policy, and media flow.
6. Life modules: implement life tick, journal writer, memory reflection, social planner, social autonomy, publisher, and manager audit.
7. Wavespeed image skill: implement concrete Wavespeed request/poll adapter and mock test mode.
8. Social planner and media queue: enforce `groundedIn`, QA notes, draft status, and media job linkage.
9. Publisher handoff: implement mock publisher, approval gate, secured browser/noVNC service shape, and operator commands.
10. Tests: implement unit and static checks; `npm test` must run without external APIs.
11. Validation: fill `VALIDATION.md` with choices, commands, test results, missing keys, deviations, and blockers.

## Acceptance Gates

The build is accepted only when all are true:

| Gate | Required evidence |
|---|---|
| OpenClaw shape | config, extension, skills, Docker entrypoint, and runnable OpenClaw CLI/runtime path exist; missing runtime is recorded as a validation failure |
| Persona runtime | SOUL/USER/canon feed runtime context |
| Analyzer | production intent analysis calls a mockable LLM JSON adapter when no mock analyzer is injected |
| Memory split | user relationship memory and persona self-state are stored separately |
| Images | Wavespeed real adapter path exists; tests use mock mode |
| Media safety | public and private media have separate policy gates |
| Social | drafts include `groundedIn`; publisher is mock/manual by default |
| Browser handoff | Chromium/noVNC service or compose profile is runnable, local-only by default, auth-required, and documented |
| Manager | audit reports stale, unsafe, ungrounded, blocked, and publishing-risk items |
| Tests | `npm test` passes without external APIs and `npm run test:static` includes syntax and alignment checks |
| Env contract | `.env.example` has exact required names and does not enable test/mock mode by default |
| Package identity | generated app package is `openclaw-ai-influencer-os` |
| Validation | `VALIDATION.md` records choices, keys, deviations, blockers, commands, and test result |

## Purpose

This Buildprint defines a product-grade architecture contract for a fictional AI influencer operating system. It is designed to produce a controlled OpenClaw agent with persistent persona continuity, media generation controls, social drafting, publishing handoff, and auditability.

## Architecture

```txt
Telegram / chat channel
  -> OpenClaw Gateway + Agent Runtime
    -> influencer-persona extension
      -> LLM JSON analyzer adapter
      -> runtime context builder
      -> policy and media gates
      -> storage adapter
    -> skills
      -> influencer-image: Wavespeed real mode / mock test mode
      -> influencer-post: secured local browser/noVNC handoff / mock publisher
      -> influencer-social: drafts, outbox, history
      -> influencer-journal
      -> influencer-calendar
      -> influencer-recall
    -> life modules
      -> life tick
      -> journal writer
      -> memory reflection
      -> social planner
      -> social autonomy
      -> manager audit
    -> JSON storage
```

Required storage layout:

```txt
storage/users/<id>.json
storage/influencer-self/state.json
storage/calendar/events.json
storage/social/drafts.json
storage/social/media-jobs.json
storage/social/posted-history.json
storage/browser/profile/.gitkeep
```

Required generated file tree:

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

Required `.env.example` names:

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
SOCIAL_VISIBLE_BROWSER_HOST=127.0.0.1
SOCIAL_VISIBLE_BROWSER_PORT=7900
# Required when browser/noVNC handoff is enabled. No default password; set a secret locally.
SOCIAL_VISIBLE_BROWSER_PASSWORD=
INFLUENCER_DASHBOARD_PORT=8626
AUTO_PUBLISH_SOCIAL=false
INFLUENCER_AUTONOMY_LOOP=false
INFLUENCER_MANAGER_AUDIT_LOOP=true
```

Rules:

- Use exactly these env var names.
- `.env.example` must not set `TEST_MODE=true`, `INFLUENCER_TEST_MODE=mock`, or any other test/mock flag by default.
- Tests must set their own mock/test env inside `tests/runner.js` or the individual test process.
- `WAVESPEED_API_KEY` gates real image generation.
- No production key is required for tests.
- Missing keys must appear in `VALIDATION.md`.

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

Keyword heuristics may be used only as a test fixture, explicitly named local heuristic fallback, or repair fallback after LLM adapter failure. They are not the normal production path.

Required runtime context fields:

```txt
persona mood/energy
life state summary
relationship stage/trust
recent memory highlights
journal/calendar/social status
media status
```

Never expose this private block in normal chat responses.

Required Wavespeed client shape:

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

If the exact Wavespeed endpoint/model is uncertain, isolate it behind `skills/influencer-image/wavespeed-client.js`, document the assumed endpoint in `VALIDATION.md`, and keep tests on a mocked fetch/client. `extensions/influencer-persona/media-flow.js` must import and use the Wavespeed client by default for real mode. Injected clients are for tests.

Required media behavior:

```txt
missing WAVESPEED_API_KEY -> mock mode or blocked real mode
public media -> platform-safe + canon check + draft/life grounding
private media -> trust/consent gate
blocked media -> structured reason
```

Required social draft shape:

```txt
id, platform, caption, visualPrompt, groundedIn, status, qaNotes
```

`groundedIn` must reference self-state, calendar, journal, manual input, or approved trend brief.

Required browser/noVNC handoff:

```txt
docker/novnc.Dockerfile or compose service using a Chromium/noVNC image
service binds to SOCIAL_VISIBLE_BROWSER_HOST=127.0.0.1 by default
service exposes SOCIAL_VISIBLE_BROWSER_PORT (default 7900) only on the local/operator interface
service requires SOCIAL_VISIBLE_BROWSER_PASSWORD or equivalent secret-backed auth before starting
compose/Docker must not contain a default, empty, or hard-coded VNC/noVNC password
storage/browser/profile is mounted for persistent operator login
publisher returns browser_handoff_required until manual approval/session/auth checks pass
```

Document commands equivalent to:

```bash
influencer-post browser --login-url
influencer-post auth --check instagram
influencer-post queue
influencer-post publish --draft-id <id> --dry-run
influencer-post handoff --draft-id <id>
```

Required `package.json` scripts:

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

## Evidence Boundary

This Buildprint specifies required structure and behavior for a generated implementation. Passing tests prove the local implementation honors the contract without external APIs. Production provider claims require configured keys, provider-side validation, and `VALIDATION.md` evidence.

## Required Validation

`npm test` must run without external APIs and prove:

1. runtime context separates user memory and self-state;
2. private runtime context is not leaked;
3. missing `WAVESPEED_API_KEY` uses mock mode or blocks real mode;
4. low-trust private/sensitive media request is blocked;
5. ungrounded public draft is blocked;
6. grounded public draft can pass QA;
7. mock publisher refuses unapproved drafts;
8. manager audit reports stale or unsafe drafts;
9. production analyzer path is not keyword-only and references/calls the LLM adapter;
10. Wavespeed client module builds a real provider request shape and tests mock the client/fetch;
11. Docker/compose includes OpenClaw runtime command or structured missing-runtime blocker;
12. browser/noVNC compose service or Dockerfile exists, binds local-only by default, requires a non-empty secret-backed password/auth value, and profile storage is mounted;
13. `.env.example` has exact required env var names and no default test/mock mode;
14. `npm run test:static` preserves required `node --check` syntax checks plus alignment checks;
15. `media-flow.js` imports/uses the Wavespeed client by default for real mode;
16. `package.json.name` is `openclaw-ai-influencer-os`.

`VALIDATION.md` must contain exactly:

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

## Copyable Agent Prompt

```txt
Build the OpenClaw AI Influencer OS exactly from `BUILDPRINT.md`. Treat `BUILDPRINT.md` as the canonical authority before every other file.

Start with alignment: if the user says "Use default persona preset", use DEFAULT_PRESET.md; otherwise ask exactly questions.md and wait for confirmation.

Create a Dockerized OpenClaw app named openclaw-ai-influencer-os with persona files, influencer-persona extension, JSON storage, Wavespeed image skill, grounded social planner, mock/manual-gated publisher, secured local browser/noVNC handoff, manager audit, tests, and VALIDATION.md.

Do not replace OpenClaw with a generic chatbot or dashboard. Do not use a production image provider other than Wavespeed. Do not call external APIs in tests. Do not auto-publish by default. Do not expose passwordless/public noVNC. Every included route, command, service, and capability must work end-to-end or return a structured blocked status recorded in validation.
```
