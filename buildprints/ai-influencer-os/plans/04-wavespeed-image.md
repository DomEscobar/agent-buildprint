# Phase 04 — Wavespeed Image Skill

## Goal

Implement the image skill with Wavespeed real mode and mock test mode.

## Files

- `skills/influencer-image/SKILL.md`
- `skills/influencer-image/influencer-image`
- `skills/influencer-image/config.json`
- `skills/influencer-image/wavespeed-client.js`
- `extensions/influencer-persona/media-flow.js`
- `policies/media.md` reference behavior

## Steps

1. Implement real-mode gate using `WAVESPEED_API_KEY`.
2. Implement `wavespeed-client.js` with concrete `createWavespeedImage` and `pollWavespeedJob` functions that build Wavespeed HTTP requests and normalize responses.
3. Implement mock mode for tests by injecting/mocking fetch/client; tests must not call the network.
4. Route public/private media through policy.
5. Return structured block reasons.

## Do not

- use another production image provider;
- call Wavespeed in tests;
- stop at checking whether `WAVESPEED_API_KEY` exists without implementing a client adapter shape;
- treat public and private media the same.

## Exit criteria

- missing key uses mock/blocked real mode;
- low-trust sensitive request is blocked;
- public request requires platform-safe/canon/grounding checks;
- tests verify the client uses Wavespeed URL, bearer auth, and normalized status without making external calls.
