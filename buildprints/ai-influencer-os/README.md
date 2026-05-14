# OpenClaw AI Influencer OS Buildprint

This Buildprint mirrors the real Mila-style setup: an OpenClaw-powered AI influencer/persona system with memory, life continuity, Wavespeed image generation, browser-based social publishing, and a manager QA layer.

The important part is **alignment before implementation**. A coding agent must ask `questions.md` first unless the user says “use Mila defaults”. The Buildprint then adapts to what the user wants different while preserving the core architecture.

## Required provider assumptions

- Runtime: OpenClaw
- Image generation: Wavespeed (`WAVESPEED_API_KEY` required for real generation)
- Default models: OpenRouter + DeepSeek style model IDs
- Deployment: Docker
- Publishing: visible Chromium/noVNC first, mock/manual-gated by default

## Use

```txt
Read BUILDPRINT.md and questions.md.
Ask the alignment questions.
Then implement the project.
```
