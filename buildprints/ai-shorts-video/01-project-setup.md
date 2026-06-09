# 01 Project Setup

This setup creates the implementation foundation for an OpenShorts-grade product: multi-service runtime, provider seams, job state, media storage, render workers, and operator-facing proof. Keep the selected packet stack-neutral at the contract level, but implementation choices must respect the mapped source unless there is a documented reason to replace them.

## How to implement setup

Before identity or phase work, read `BUILDPRINT.md`, `00-questions.md`, `blueprint.yaml`, this file, and any implementation `AGENTS.md`.

Initialize the project-local skill harness from `blueprint.yaml`:

```bash
agb harness init . --provider agents --profile webapp --profile backend --profile agentic
agb harness check . --provider agents --profile webapp --profile backend --profile agentic
agb harness checkup . --provider agents --profile webapp --profile backend --profile agentic
```

If `agb` is unavailable, create `.agents/skills/` locally with `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review`, `backend-runtime-boundaries`, `media-pipeline-proof`, and `agentic-provider-seams`. Every skill must declare `triggers`, `skips`, and `completion_signal`. Do not install global skills or provider-specific folders without explicit selection.

## Architecture baseline

Use a three-service local runtime unless a phase deliberately narrows proof:

- API service: Python/FastAPI for uploads, job queues, clip pipeline orchestration, gallery/social endpoints, and provider header validation.
- Dashboard: React/Vite/Tailwind operational console at the dashboard port, with settings, clip generator, AI Shorts, YouTube tools, UGC gallery, job details, and blocked states.
- Render worker: Node/Express plus Remotion for 1080x1920 render jobs, status polling, and output-file readback.

## Required setup artifacts

- `AGENTS.md` with local implementation constitution, no-fake rules, mapped service ownership, harness section, and verification expectations.
- `.agents/skills/**/SKILL.md` for the local harness.
- `docs/architecture.md` covering runtime topology, adapters, persistence, env, side effects, proof commands, typed quality gates, hard-domain library choices, and claim ceilings.
- `.env.example` with blank secrets only: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_S3_PUBLIC_BUCKET`, `GEMINI_API_KEY`, `FAL_KEY`, `ELEVENLABS_API_KEY`, `UPLOAD_POST_API_KEY`, `MAX_CONCURRENT_JOBS`, `DISABLE_YOUTUBE_URL`.
- `.buildprint/setup-receipt.md` with assumptions, blockers, commands, discovered ports, and identity readiness.

## Proven implementation requirements

- Fixed-format vertical video rendering: use FFmpeg and/or Remotion, not placeholder MP4s.
- Speech transcription and subtitles: use faster-whisper or an equivalent proven transcription path, with word-level timing when claiming animated subtitles.
- Face/person reframing: use MediaPipe/YOLO/OpenCV or equivalent proven CV tooling.
- AI provider calls: isolate Gemini, fal.ai, ElevenLabs, and Upload-Post behind explicit provider adapters with typed errors and retry/blocker semantics.
- Background jobs: use durable job state or explicitly record that in-memory job maps are local-only and not crash-safe.
- Persistence and migrations: file output is acceptable for local proof, but production durability needs a database/object-store schema and migration path.
- Social publishing: use Upload-Post or official platform APIs; live side effects require dry-run/proof controls and audit records.

## Setup proof

Setup is complete only when harness checks pass or blockers are recorded, Docker/local commands are named, the architecture document is specific to OpenShorts, env names are blank-secret safe, and the first phase can start without guessing service boundaries or provider policy.

SETUP_RUNBOOK_DONE
