# 01 Project Setup

This is the foundation pour. Do not start `03-phases/*` until this setup creates a durable implementation base. The goal is not bureaucracy; the goal is to stop future agents from building disconnected UI, fake provider success, or unowned graph/simulation seams.

## Required setup artifacts

Create or update these in the implementation project, not inside `.buildprint/snapshots/**`:

- `AGENTS.md` with mandatory read rules, ownership boundaries, quality bar, and stop conditions.
- `docs/architecture.md` describing frontend, backend/service, graph memory adapter, provider config, simulation seam, persistence, and report generation.
- `docs/product-loop.md` describing the upload → graph → simulation → report → continue loop and visible states.
- `docs/plain-language-ux.md` mapping technical terms to user-facing labels, defining the beginner workflow, and listing empty/loading/error/blocked copy for non-technical users.
- `docs/proof-strategy.md` listing local commands, smoke paths, browser checks, provider-blocked checks, and what cannot be proven without live credentials/runtime.
- `.env.example` with provider base URL/model/key names, graph memory settings, storage path, and simulation runtime flags; never include real secrets.
- `.buildprint/setup-receipt.md` summarizing chosen stack, created files, verification commands, blockers, and any assumptions from `00-questions.md`.

## Foundation decisions

Pick a stack that can actually deliver a polished graph workbench quickly. Vue/Vite plus a lightweight local API is acceptable; another framework is acceptable only if it has equivalent build/test/browser proof. Define the graph-memory port before writing UI. Define provider status/test behavior before simulation buttons. Define persistence paths before report generation. Define the plain-language UX glossary before naming visible controls, panels, status chips, blockers, or reports.

## DO NOT

Do not use placeholder commands, real secrets, hidden global state, required Zep Cloud, a decorative graph with no readback, or a simulation action that returns canned success. Do not hide hard-stop questions by calling them assumptions. Do not start phase work until the setup receipt exists.
