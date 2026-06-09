# SPEC: OpenClaw AI Influencer OS

This file is the behavior truth. `BUILDPRINT.md` is the architecture truth.

## Requirements

### R1 — Configurable persona

Given the user provides a persona name/identity
When the system is generated
Then generated persona files use that identity.

Given the user does not provide a persona name
When the default preset is used
Then the coding agent generates a fresh fictional name and short identity.

### R2 — OpenClaw runtime

Given the project starts
When the OpenClaw container/runtime loads
Then it loads persona files, the influencer persona extension, and the required skills.

Given the real OpenClaw CLI/runtime is unavailable
When startup validation runs
Then the system records a structured `openclaw_runtime_missing` blocker instead of pretending a generic Node process is the runtime.

### R3 — Private runtime context

Given a message arrives
When runtime context is built
Then it may include relationship memory, self-state, calendar/journal/social state, and media status.

The private context must not be sent back to the user as visible chat text.

### R4 — Memory separation

Given user memory and persona self-state exist
When either is updated
Then user relationship memory and persona self-state remain separate JSON documents.

### R5 — Image generation

Given `WAVESPEED_API_KEY` is present
When real image generation is requested
Then the production path uses a concrete Wavespeed client adapter with request/response normalization.

Given media flow enters real mode
When no test mock is injected
Then `media-flow.js` uses the default Wavespeed client adapter and does not require the caller to pass the real image function manually.

Given `WAVESPEED_API_KEY` is missing
When tests or local validation run
Then image generation uses mock mode or blocks real mode with a structured reason.

### R6 — Public/private media gates

Given a public media request
When policy evaluates it
Then it must be platform-safe, canon-consistent, and grounded in a draft/life/calendar source.

Given a private or sensitive media request
When policy evaluates it
Then trust/consent gates apply or the request is blocked.

### R6A — LLM analyzer

Given tests run
When intent classification is needed
Then a mock analyzer may be injected and no external LLM call occurs.

Given production intent classification runs
When no mock analyzer is injected
Then classification goes through a mockable LLM JSON analyzer adapter and validates the returned `AnalyzerResult` shape.

Given the production analyzer is implemented only with keyword or regex matching
When validation tests inspect the implementation
Then validation fails with an analyzer contract violation.

### R7 — Social drafts

Given the social planner creates a draft
When the draft is saved
Then it includes `groundedIn` references and starts as draft/needs_qa, not published.

Given a draft claims a real event
When the event is not grounded
Then manager QA blocks it with `ungrounded_claim`.

### R8 — Publishing

Given a draft is unapproved
When mock publisher is called
Then publishing is refused.

Given real publishing is requested
When default env flags are unchanged
Then the system uses secured browser/noVNC handoff docs and does not auto-publish.

Given the container stack is generated
When compose files are inspected
Then a Chromium/noVNC service or Dockerfile exists, binds to `SOCIAL_VISIBLE_BROWSER_HOST=127.0.0.1` by default, exposes `SOCIAL_VISIBLE_BROWSER_PORT` only on the local/operator interface, requires non-empty `SOCIAL_VISIBLE_BROWSER_PASSWORD` or equivalent secret-backed auth before starting, refuses empty/default/hard-coded VNC passwords, and mounts `storage/browser/profile` for persistent operator login.

### R10 — Env and static validation contract

Given `.env.example` is generated
When static validation runs
Then exact required env names from `BUILDPRINT.md` are present, no test/mock mode is enabled by default, and browser handoff auth is required without a default password.

Given `package.json` is generated
When static validation runs
Then `static verification command` includes the required `node --check` syntax checks and alignment checks.

Given `package.json` is generated
When package identity is inspected
Then `name` is `openclaw-ai-influencer-os`, not `agb`, `xy`, or `agent-buildprint`.

### R9 — Manager audit

Given drafts/media/jobs/storage exist
When manager audit runs
Then it reports stale drafts, stuck media jobs, unsafe media, canon violations, ungrounded claims, and publishing blockers.

## Out of scope for first implementation

- real auto-publishing by default;
- real API calls in tests;
- keyword-only production analyzer;
- provider swap away from Wavespeed;
- SaaS dashboard as primary product;
- merging memory and self-state;
- hidden use of secret values.
