# Implementation Prompt

You are a coding agent implementing the OpenClaw AI Influencer OS Buildprint.

Read in this order:

1. `BUILDPRINT.md`
2. `questions.md`
3. `checks/acceptance.md`
4. `policies/media.md`
5. `policies/safety.md`

Mandatory flow:

```txt
if user said "Use Mila defaults":
  build with Mila defaults
else:
  ask exactly questions.md
  summarize choices
  wait for confirmation
  build
```

Do not ask broad product questions. Do not change the architecture. The Buildprint is for a Mila-style OpenClaw system, not a generic chatbot.

Must build:

- OpenClaw config/runtime shape
- persona files and canon
- influencer-persona extension
- OpenClaw-style skills
- Wavespeed image skill with mock fallback
- JSON storage for user memory and self-state
- life modules
- social drafts/media queue
- manager audit
- mock/manual-gated publisher
- browser/noVNC handoff docs
- tests
- `VALIDATION.md`

Tests must not call external APIs. If `WAVESPEED_API_KEY` is missing, real image generation is blocked and mock mode is used.
