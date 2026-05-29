# Phase 4 - Async Media Generation And Provider Boundaries

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase delivers media generation as an honest product flow: request asset/storyboard/video generation, observe pending/success/failure state, and keep provider live split explicit.

## Build target

Implement:

- provider configuration boundary for text, image and video models;
- fake-provider test adapter and live-provider adapter interface;
- derived asset generation requests;
- storyboard image generation requests;
- video prompt/video generation requests where selected workbench state requires them;
- polling for pending jobs;
- selection/deletion/update operations with confirmations where destructive;
- user-visible blocked state when credentials are absent.

## Interfaces touched

- Provider adapter interfaces.
- Asset/storyboard/workbench generation APIs.
- Polling APIs and client polling store.
- Media storage path and URL resolver.

## State/runtime touched

Generation records need durable state: pending, success, failure, error reason, media URL/path and associated project/episode/storyboard/asset IDs. Provider job IDs and errors must be auditable.

## UX/UI requirements

- Pending items show progress or at least polling state.
- Failed generation shows reason and allows retry where safe.
- Selected/generated media previews must not block the entire board.
- Provider missing/invalid credentials must show blocked state, not success.

## Safety/security constraints

Provider secrets remain server-side. Uploads and generated media must be path-safe. Destructive deletes require confirmation and authorization. Fake-provider results must be visibly test/demo only.

## Implementation loop

1. Define provider interface and fake-provider adapter.
2. Implement job records and media storage.
3. Implement asset/storyboard/video generation APIs.
4. Wire client polling and UI states.
5. Run fake-provider tests and record live-provider blocker if credentials absent.

## Proof gate

- Fake-provider tests for pending, success, failure, timeout/retry and cancellation where supported.
- API tests for unauthorized access, missing credentials and invalid IDs.
- Browser test: trigger generation, see pending, poll to success/failure, retry or blocked state.
- Evidence row: `phase_id=04-media-generation`, `proof_type=provider_integration_proof`.

## Repair routing

If fake-provider output is counted as live provider proof, repair qualification language. If secrets appear in logs/UI/evidence, stop and repair security boundary.

## Stop condition

Stop on need for real credentials for live proof. Record blocker and continue only with fake-provider contract proof.

## Unlocks

Unlocks Phase 5 once provider boundaries, async state and media storage behavior are proven with fake-provider contracts.
