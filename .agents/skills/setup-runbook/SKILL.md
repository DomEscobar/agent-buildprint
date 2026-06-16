---
name: setup-runbook
description: Use during 01-project-setup to map the repo, commands, env, architecture, proof paths, and setup receipt before identity or phase work.
phase: 01-project-setup
triggers:
  - project setup
  - initialize project
  - runbook
  - architecture map
skips:
  - visual polish
  - simple one-file edit
  - already-initialized project with current setup receipt
completion_signal: SETUP_RUNBOOK_DONE
---

# Setup Runbook

Use during Buildprint project setup. The goal is to stop blind discovery and leave durable setup facts future agents can trust.

## Workflow

1. Read the Buildprint setup file, `00-questions.md`, `blueprint.yaml`, and existing project instructions.
2. Inspect the repo shape, package manager, framework, runtime, ports, env files, data stores, generated folders, and existing tests.
3. Create or update `AGENTS.md` with mandatory reads, ownership boundaries, verification expectations, and the Buildprint Skill Harness section.
4. Create or update `docs/architecture.md` with stack, topology, persistence, provider seams, deployment posture, central output contract, typed quality gates, proof commands, blockers, and claim ceilings, plus an engineering quality bar: scalability seams (data growth, concurrency, load, feature growth), maintainability boundaries with separation of concerns and testability, and enforced coding standards (SOLID, KISS, DRY, typed boundaries, explicit error handling) with the lint, format, and type-check gates that enforce them.
5. Create or update `.env.example` with blank secrets only.
6. Create or update `.buildprint/setup-receipt.md` with decisions, assumptions, blockers, commands discovered, and readiness for UI identity or phase work.
7. End the setup note with `SETUP_RUNBOOK_DONE` only after the artifacts exist or blockers are recorded.

## Hard Rules

- Do not start identity or phase work before setup facts exist.
- Do not record a thin or default architecture; name the scalability seams, maintainability boundaries, and enforced coding standards (SOLID, KISS, DRY) with lint/format/type-check gates, or record an honest blocker.
- Do not invent commands; mark unknown commands as blockers.
- Do not hide hard-stop questions as assumptions.
- Do not put real secrets into docs, examples, tests, logs, screenshots, or handover.
