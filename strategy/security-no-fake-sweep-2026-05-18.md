# Security / No-Fake Buildprint Sweep — 2026-05-18

Scope: `/root/blueprint/buildprints`.

Search terms used included: `0.0.0.0`, `password`, `VNC`, `noVNC`, `disable auth`, `no auth`, `placeholder`, `TODO`, `coming soon`, `mock provider`, `in-memory`, `fake success`, `skeleton adapter`, `hard-coded`, `api key`, and `secret`.

## Findings

Most hits were intentional safety/quality guardrails, not footguns:

- `ai-influencer-os` explicitly forbids public/passwordless noVNC and requires local-only binding + secret-backed auth.
- `buildprint-mapper-os` intentionally contains no-fake/no-placeholder/no-secret policy language.
- `portable-novel-storyboard-pipeline` contains explicit forbidden-default and no-fake rules.
- security/secret hits in evaluation and mapper Buildprints were policy/test language, not leaked secrets.

## Patches made

- `portable-personal-agent-chat-os/PLAN.md`
  - Replaced "implement in-memory stores first" with durable-local-first wording.
  - Labeled fixture filesystem/search/todo/MCP tools as deterministic test fixtures, not production integrations.

- `perfect-rag-retrieval-os`
  - Replaced ambiguous "latency/cost placeholders" / "provider cost placeholders" with labeled latency/cost fields or measured/estimated/unavailable values.

- `stripe-billing-extension`
  - Replaced "placeholder customer model" with a clearly labeled demo customer fixture for local proof only.
  - Replaced "billing UI stub" wording with "minimal billing UI proof component".

## Remaining notable hits judged safe

- `ai-influencer-os` mentions `0.0.0.0` only to forbid default public binding and mentions default password only to forbid it.
- `portable-novel-storyboard-pipeline/buildprint.json` includes `placeholder routes counted as implemented` only as a forbidden default.

## Gates run

- `/root/blueprint`: `npm test` — pass.
- `/root/AGB-website`: `npm run build` — pass.
- `/root/AGB-website`: `npm run check:buildprints` — pass.
- `/root/AGB-website`: `npm run check:codex-drift` — pass.
- Final real Codex drift check: `node scripts/codex-read-order-drift.mjs --run-codex --out=/tmp/agb-final-drift-check` — pass.

## Verdict

No unresolved security/no-fake footgun was found in the sweep terms. Remaining matches are safety policy, explicit forbidden-default language, or scoped proof-boundary language.
