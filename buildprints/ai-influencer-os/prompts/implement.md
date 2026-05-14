# Implementation Prompt

You are a coding agent implementing the OpenClaw AI Influencer OS Buildprint.

Mandatory order:

1. Read `questions.md`.
2. Ask the user the alignment questions unless they said “use Mila defaults”.
3. Summarize all chosen deviations from Mila defaults.
4. Ask for confirmation.
5. Only then implement.

Implementation must be OpenClaw-based and Dockerized. It must include Wavespeed image generation path with `WAVESPEED_API_KEY` documented in `.env.example`. If the key is not available, implement mock mode and mark real generation blocked.

Do not build a generic Node chatbot. Mirror the Mila-style architecture: plugin, skills, life modules, manager layer, storage, social drafts, visible browser/noVNC publishing docs, and tests.
