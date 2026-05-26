# BUILDPRINT: Portable AI Shorts Production Studio

This is the canonical starting point and execution contract for the blueprint. Do not start from generated prompts or secondary files. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

Build a stack-flexible, product-grade browser studio that turns a product URL or manual business description into UGC-style vertical shorts drafts. The default proof is deterministic mock/no-network mode with a real browser workflow, pollable generation jobs, a playable local 1080x1920 MP4 fixture, consent-gated gallery and publish handoff, validation reports, screenshots, and explicit claim boundaries.

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the active phase file from `03-phases/phase-index.yaml`.
8. Read `04-evaluation.md`.
9. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl`.
10. Read `05-evidence/evidence-ledger.schema.json` before writing any runtime evidence.

## Product contract

The first useful screen must be the production workflow, not a report, raw manifest, route list, or debug dashboard. Required user surfaces are source input, product analysis and scripts, configuration, generation progress, review/player, gallery, publish handoff, and a secondary debug/details drawer.

The studio must preserve these source-derived capabilities:

- Product URL or manual description input; manual-description mode must work without URL input.
- URL-mode scraping/research/analyze/script flow through isolated adapters.
- Product analysis plus at least two selectable scripts, each with exactly five timed segments and b-roll requirements.
- Voice, actor source or upload, narration, video mode, and consent configuration.
- Gemini/research, ElevenLabs/voice, fal.ai/Flux/Hailuo/Kling/VEED media, Upload-Post, S3/gallery storage, scraper, and yt-dlp-style downloader boundaries as adapters.
- Pollable job lifecycle with pending, running, success, failure, blocked, canceled, retry, ordered logs, provider request records, output manifest, and error reasons.
- Deterministic fixture media pipeline that creates a playable local vertical MP4 with 1080x1920 dimensions, nonblank visual content, captions/subtitles, and b-roll timing markers.
- Private-by-default gallery and video detail pages that render only consented metadata.
- Consent-gated mock/manual social publish handoff; direct TikTok, Instagram, or YouTube API publishing is not a default claim.
- Browser QA happy path, negative paths, desktop/mobile screenshots, build/test report, MP4 probe evidence, provider mode, limitations, and remaining gaps.

## Non-claims

Do not claim OpenShorts clone, drop-in replacement, commercial equivalence, exact UI/API/provider parity, live provider success, hosted SaaS security, public gallery safety, platform publishing success, moderation compliance, output quality parity, or restart-safe production durability unless a later implementation records direct proof.

Mock provider success is not live provider success. In-memory state is not durable production storage. Generated videos are draft artifacts until durability, key handling, consent, privacy, egress, provider validation, and platform handoff gates are proven.

## Project setup gate

Do not start `03-phases/*` until `02-project-setup.md` has enough explicit architecture, team rules, quality gates, safety rules, and `AGENTS.md` plan to prevent agents from inventing project structure.

Blank answers in `01-questions.md` are not blockers. They authorize AI best-fit decisions unless the choice is irreversible, expensive, credentialed, destructive, or product-defining.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect existing project files, nearest `AGENTS.md`, current behavior, and constraints.
2. Plan: state the smallest coherent change, likely files, and verification gate.
3. Execute: make scoped changes without silently expanding architecture.
4. Verify: run the planned test/build/browser/runtime gate and inspect output.
5. Reflect: compare results against the phase proof gate.
6. Record: append evidence or blocker rows before claiming progress.

A phase cannot be marked done from code edits alone.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md` and `.buildprint/phase-runs/<phase-id>/team.md`, dispatch or explicitly simulate bounded role work, collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated product slice, not a waterfall task bucket. Each phase must define product outcome, source evidence, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.

## Copyable agent prompt

Use the Portable AI Shorts Production Studio Buildprint. Read `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the active phase file, `04-evaluation.md`, and `05-evidence/evidence-ledger.jsonl`. Build a full browser AI shorts production studio proof with deterministic mock/no-network providers, pollable jobs, a fixture 1080x1920 MP4, consent-gated gallery and publish handoff, tests, browser QA, and honest evidence. Runtime proof goes only to `.buildprint/evidence/evidence-ledger.jsonl`.
