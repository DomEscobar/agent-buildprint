# AI Shorts Video

A self-hosted short-video production platform that turns clips, URLs, or product descriptions into reviewable vertical shorts with captions, metadata, render/export, gallery, and publishing seams.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Features

- Clip Generator for long-form video to vertical shorts.
- AI Shorts for UGC-style product videos with AI actors, voice, b-roll, captions, and compositing.
- YouTube Studio tools for titles, thumbnails, descriptions, and publishing.
- Gallery and social publishing seams through local/S3 storage and Upload-Post-style providers.
- Honest provider, render, storage, and publishing blockers.

## Requirements

- FFmpeg or equivalent render runtime for real video proof.
- Transcription/CV/render libraries selected during setup for caption and reframing claims.
- Provider keys only for live AI generation, object storage, or social upload proof.

## Provider Keys

- Optional Gemini/fal.ai/ElevenLabs or equivalent AI provider keys.
- Optional S3/object storage credentials for gallery hosting.
- Optional Upload-Post/social provider key for publishing proof.

## Proof Boundary

Local fixtures can prove upload, clip extraction, caption timing, render/export, metadata, gallery state, and blocked publishing. They do not prove live AI generation, object storage durability, social upload, or public SaaS operation.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer only hard-stop questions in `00-questions.md`, run setup through `01-project-setup.md`, generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`.

