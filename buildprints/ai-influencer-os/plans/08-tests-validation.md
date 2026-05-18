# Phase 08 — Tests and Validation

## Goal

Prove the build followed the Buildprint.

## Files

- `tests/runner.js`
- `tests/persona.test.js`
- `tests/image-generation.test.js`
- `tests/life.test.js`
- `tests/social-publish.test.js`
- `VALIDATION.md`

## Steps

1. Implement tests from `TEST_MATRIX.md`.
2. Run `npm test`.
3. Run syntax/static check.
4. Add static/alignment tests for non-keyword analyzer, concrete Wavespeed adapter, OpenClaw runtime command/blocker, secured noVNC compose service, exact env names, no default test/mock mode, required syntax-check chain, default media-flow Wavespeed adapter wiring, and package identity (`openclaw-ai-influencer-os`, not `agb`).
5. Fill `VALIDATION.md` from `VALIDATION_TEMPLATE.md`.

## Do not

- call external APIs;
- mark blocked work as pass;
- omit deviations;
- accept generated `package.json.name` as `agb`, `xy`, or `agent-buildprint`.

## Exit criteria

- tests pass or failures are honestly documented;
- validation lists commands, keys, deviations, blockers;
- static checks fail if package identity, env contract, syntax checks, analyzer, Wavespeed, OpenClaw runtime, noVNC auth/local-only binding, or media-flow wiring regresses.
