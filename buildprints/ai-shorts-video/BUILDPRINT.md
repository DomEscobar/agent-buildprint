# BUILDPRINT: OpenShorts Phase-Driven Builder Briefing

You are building a self-hosted short-video production platform, not a generic media dashboard. OpenShorts turns source media or product context into publishable 9:16 videos with AI-assisted selection, scripting, actor/voice generation, editing, gallery output, and social publishing.

Build from the product contract in `blueprint.yaml` and the phase objectives in `03-phases/`. The first useful loop must let an operator configure provider keys, submit real source material or product input, watch job state, inspect generated short-video output, edit or retry honestly, and either export/publish through a proven path or show an exact blocker.

Do not claim live AI generation, S3 gallery publishing, social posting, durable job history, or production readiness unless those claims have matching runtime proof. Functionless controls, placeholder queues, sample-only videos counted as output, raw JSON as the main experience, and swallowed provider failures are failures.

## Required Read Order

1. `BUILDPRINT.md`
2. `00-questions.md`
3. `01-project-setup.md`
4. `02-ui-identity.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. Active phase named by `03-phases/phase-index.yaml`
9. `README.md`
10. `HANDOVER.md`

## Source Evidence

- Target repo: `https://github.com/mutonby/openshorts`
- Mapped commit: `fe87af6dd599b854e6eab2de0ca247ebafe13885`
- Source shape: Python 3.11 FastAPI backend, React 18/Vite/Tailwind dashboard, Node/Express Remotion render service, Docker Compose, FFmpeg/faster-whisper/YOLO/MediaPipe pipeline, Gemini/fal.ai/ElevenLabs/Upload-Post/S3 provider seams.

## Completion Standard

Completion means a real operator path survives direct use. For each phase, prove the path with commands, API/runtime checks, browser screenshots when UI changes, readback for durable state, and blocker rows for missing credentials or external services.
