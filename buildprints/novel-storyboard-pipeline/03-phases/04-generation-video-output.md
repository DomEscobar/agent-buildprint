# Phase 04 - Generation And Video Output

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md`, and these role contracts only: `06-contracts/product-architect.md`, `06-contracts/integration-runtime.md`, `06-contracts/security-boundary.md`, `06-contracts/data-persistence.md`, `06-contracts/test-and-verification.md`.

Execute through `phase-flow.md`. Do not append runtime evidence until phase-flow plan, team-gates, handoff, return, review, and proof artifacts exist.

requires_roles: product-architect, integration-runtime, security-boundary, data-persistence, test-and-verification

## Product outcome

Implement image generation, storyboard image generation, video generation, video tracks, selected clip state, generation polling/status, failure repair, and export-ready output boundary. Users can generate assets and storyboard media, create video tracks from storyboard/assets/audio references, choose generated candidates, and see final-output readiness.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- lens: product outcome flow with provider-backed runtime proof
- mode obligation: users can move from Canvas production materials to generated media and selected video-track output without fake provider success.
- shared proof spine: preconditions, entrypoint, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals must be covered.

## Interfaces touched

- Web components: generation controls, batch generation, status badges, retry/cancel controls, video track lane, candidate clip picker, final-output readiness panel.
- API routes: generate image assets, batch image generation, generate video, get video candidates, select video, add/delete/update track, export boundary.
- Internal services: provider adapter registry, generation queue/worker, task record service, media storage, video track service, export service boundary.

## State/runtime touched

- Image records with state, file path, model, resolution, error reason.
- Video records with state, file path, model, duration, selected track, error reason.
- Video tracks with duration, prompt, selected video id, associated storyboard/assets/audio references.
- Task records with provider, request metadata without secrets, status, retry/error mapping, and timestamps.
- Media artifacts in durable object/file storage.

## UX/UI or consumer-experience requirements

- Generation must be transparent: pending, progress/polling, completed, failed, retryable, and blocked states are visible on Canvas nodes and track lanes.
- Track assembly must read as a production flow: storyboard/media inputs -> generation candidates -> selected clip -> final output readiness.
- Provider-blocked state must still allow manual upload or placeholder planning without claiming generated proof.
- Visual proof must show generated-media states on the Canvas and in the video track lane.

## Safety/security constraints

- Provider secrets are server-only.
- Use idempotency for generation requests to avoid duplicate paid/destructive calls on retry.
- Sandbox/live split is mandatory.
- Retry/error mapping must distinguish validation, credential, provider, timeout, and media-storage failures.
- Generated media must be access-controlled and scanned/validated for supported type and size.
- Do not run arbitrary provider code in public posture unless sandboxing and audit proof exists.

## Proof gate

- Unit tests cover provider adapter validation and retry/error mapping.
- Worker/integration tests cover queued generation lifecycle: pending -> success and pending -> failed.
- Persistence tests prove media/task/video-track restart roundtrip.
- Provider contract tests run against sandbox/fake-provider only as contract proof; live proof remains blocked unless credentials are supplied.
- Browser e2e proves generate image/video task state, failed retry path, candidate selection, and output readiness.
- Runtime evidence must clearly label sandbox, fake-provider contract, or live provider proof.

## Implementation loop

1. Implement provider adapter and queue/task abstractions.
2. Implement image and video generation flows with durable states.
3. Implement video track assembly and candidate selection.
4. Implement export-ready boundary without overclaiming final renderer parity.
5. Run provider, worker, persistence, browser, and visual proof gates.

## Repair routing

- Fake live generation claim: integration-runtime and test-and-verification.
- Secret or arbitrary-code risk: security-boundary.
- Lost task/media state: data-persistence.
- Poor generation UX: product-architect and ux-ui-craft via active phase review.

## Non-goals

- Desktop Electron distribution.
- Live provider qualification without credentials.
- Claiming full final render/export parity unless implemented and proven.
