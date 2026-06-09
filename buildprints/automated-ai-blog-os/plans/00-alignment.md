# Phase 00 — Alignment

## Goal

Lock the content strategy, source boundary, publish mode, and validation record before files are generated.

## Required actions

1. If the user says "Use default blog preset", apply `DEFAULT_PRESET.md`; otherwise ask exactly `questions.md` and wait for confirmation.
2. Record selected niche, audience, source types, publisher mode, approval policy, and excluded capabilities in `VALIDATION.md`.
3. Preserve `TARGET_SHAPE`: scanner, scorer, memory, drafter, visuals, validators, approval queue, publisher/scheduler, and manager audit.
4. Confirm tests use fixtures/mocks only; no source scan, LLM, deploy, or publishing credential is required for tests.
5. Mark any unavailable source access or publisher integration as blocked/excluded, not silently represented.

## Done when

- `VALIDATION.md` exists with configuration, publish mode, fixture policy, and known blockers.
- Default state is draft/manual approval unless the user explicitly chose schedule/auto.
- No implementation file suggests publishing can bypass approval, claim validation, SEO validation, or build checks.
