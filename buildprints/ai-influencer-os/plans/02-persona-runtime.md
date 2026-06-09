# Phase 02 — Persona Runtime

## Goal

Implement persona files, canon, plugin entrypoint, analyzer adapter, runtime context, and policy hooks.

## Files

- `persona/CANON.md`
- `persona/BOUNDARIES.md`
- `extensions/influencer-persona/index.js`
- `extensions/influencer-persona/intent.js`
- `extensions/influencer-persona/analyzer-adapter.js`
- `extensions/influencer-persona/runtime-context.js`
- `extensions/influencer-persona/policy.js`
- `extensions/influencer-persona/storage.js`

## Steps

1. Generate persona name only if user did not provide one.
2. Write canon/boundaries from confirmed choices and `DEFAULT_PRESET.md`.
3. Implement mockable LLM JSON analyzer contract.
4. Implement `analyzer-adapter.js` so production classification calls the configured LLM/OpenRouter-compatible adapter when no `mockAnalyzer` is supplied.
5. Implement runtime context builder.
6. Ensure private context cannot be returned as normal chat.

## Do not

- hardcode semantic behavior with only regex;
- leak prompts/private state;
- ship keyword/regex-only intent classification as the production path;
- generate media directly from chat without policy.

## Exit criteria

- context builder returns structured private context;
- analyzer can be mocked in tests;
- static/unit test proves non-mock classification uses the LLM adapter path;
- policy hook exists before media flow.
