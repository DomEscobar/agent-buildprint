# Evaluation

## Claim upgrade rules

Claims upgrade only after the relevant phase proof gate passes and evidence is recorded.

Required proof concepts:

- provider_live: real provider/API behavior is proven, or a blocker records why only deterministic/sandbox proof exists.
- durable_persistence: state survives readback/reload where durability is claimed.
- security_boundary: auth, privacy, secrets, consent, uploads, URL egress, public gallery, publishing, and unsafe media/text paths are reviewed.
- no_fake: no static shell, fake green test, placeholder provider, no-op control, blank MP4, route-shaped mock, in-memory-only demo, or debug-first UI is claimed as production behavior.
- clean_room_implementation_trace: implementation does not depend on opening the original source repo as implementation input.

## Product acceptance checks

- Full browser studio proof with source input, analysis/scripts, configuration, generation, review/player, gallery, and publish handoff.
- Manual description path works without URL.
- URL fixture path exercises scraper/research/analyze/script adapters in mock/no-network mode.
- At least two selectable scripts exist, each with exactly five timed segments and b-roll requirements.
- Provider seams exist for Gemini/research, ElevenLabs, fal.ai/media providers, Upload-Post, S3/gallery, scraper, downloader, and composer.
- Job lifecycle includes polling, logs, provider records, output manifest, result/error, cancel, retry, blocked, and failure states.
- Media output is playable, probes as 1080x1920, is nonblank, includes captions, and records b-roll timing evidence.
- Gallery is private by default and shows only consented metadata.
- Publish handoff is blocked without consent and mock/manual by default.
- Browser QA captures completed desktop/mobile screenshots and critical negative states.
- Validation report records commands, screenshots, MP4 probe, provider mode, gaps, and status.

## Loop completion rule

A phase is complete only when:

- observe/plan/execute/verify/reflect/record loop completed at least once
- verification evidence exists
- phase proof gate passes, or an honest blocker is recorded
- blocker/unknowns are not hidden
- failed gates are repaired or routed correctly

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, or call deterministic adapters live providers.
