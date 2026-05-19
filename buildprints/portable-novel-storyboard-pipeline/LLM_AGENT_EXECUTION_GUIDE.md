# LLM Agent Execution Guide

## Attention Anchor

- Keep the binding slice small, but make the visible workbench product-grade.
- Keep product-quality constraints in active context before UI work.
- Do not let QA evidence become the main user experience.
- If compacted, reread `BUILDPRINT.md`, `PRODUCT_QUALITY_BAR.md`, and this file.

## Consumption Pattern

1. Read `BUILDPRINT.md`.
2. Read machine mirrors only to confirm gates.
3. Read domain contracts and flow docs.
4. Before UI coding, reread only:
   - `BUILDPRINT.md`
   - `PRODUCT_QUALITY_BAR.md`
   - `WORKBENCH_UX_SPEC.md`
5. Before final report, reread only:
   - `PARITY_CLAIMS.md`
   - `HEAD_TO_FOOT_QA.md`
   - `PRODUCT_QUALITY_BAR.md`

## Current Phase Intent

Before implementing a phase, write a short local note or implementation-report section:

- current phase id;
- one sentence of intent;
- files/components affected;
- which quality gate could regress.

Do not expand scope because a detail file is interesting. Keep the binding slice first.

## Stage Cards

| Stage | Keep In Context | Do | Do Not |
|---|---|---|---|
| Domain | `CONTRACTS.md`, `PREVIEW_COMPOSITION_SPEC.md` | preserve ordering, states, IDs, manifest shape | add live-provider state as default |
| Agents/XML | `LLM_FLOW.md`, `XML_OUTPUT_CONTRACT.md` | validate before persistence | trust raw LLM text |
| Providers | `PROVIDER_ADAPTERS.md`, `VISUAL_FIXTURE_PACK.md` | mock/no-network, deterministic fixture refs | show raw mock refs as primary UI |
| UI | `PRODUCT_QUALITY_BAR.md`, `WORKBENCH_UX_SPEC.md`, `DESIGN_SYSTEM_SPEC.md` | creative workbench, inspector, timeline, debug drawer | generic dashboard, raw tables |
| Preview | `PREVIEW_COMPOSITION_SPEC.md` | selected-shot preview and local thumbnails | manifest textarea as hero surface |
| QA/Claims | `HEAD_TO_FOOT_QA.md`, `PARITY_CLAIMS.md` | completed-state screenshots and safe wording | parity or final video claims |

## Context-Rot Checks

If the implementation starts looking like panels plus raw tables, stop and reread `PRODUCT_QUALITY_BAR.md`.

If the preview page starts with JSON, task logs, or limitations, move them into a secondary drawer/details region.

If screenshots show empty states, rerun QA after completing the fixture workflow.

## Chat Handover Contract

At the end of a Buildprint run, write a concise chat handover. Do not only point to files.

Required format:

1. Outcome: one sentence naming what is now built or upgraded.
2. Evidence: commands run, pass/fail status, screenshots/manifest/report artifacts.
3. What changed: 3-6 bullets, user-facing first.
4. Known gaps: only real remaining gaps; say "none known" if none.
5. Recommended next direction:
   - "No next step needed" when the binding slice is complete and no meaningful upgrade is pending.
   - "Recommended next: ..." when one high-value next step exists.
   - "Options: ..." when there are several legitimate directions.

Rules:

- Keep it useful without opening `BUILD_REPORT.md`.
- Do not overclaim parity or final video export.
- Mention if any validation could not run and why.
- Prefer one clear next recommendation over a long menu.
