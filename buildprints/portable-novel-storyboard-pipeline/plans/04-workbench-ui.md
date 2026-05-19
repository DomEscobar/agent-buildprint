# Phase 04 - Workbench UI

## Goal

Build a product-grade creative storyboard workbench that satisfies the binding slice without becoming a compliance dashboard.

## Keep In Context

- `PRODUCT_QUALITY_BAR.md`
- `WORKBENCH_UX_SPEC.md`
- `DESIGN_SYSTEM_SPEC.md`
- `WEBAPP_TARGET_SPEC.md`
- `UI_CANVAS_MAP.md`

## Steps

1. Build left navigation/pipeline progress and chapter/script list.
2. Build center workspaces for project dashboard, ScriptAgent, ProductionAgent, storyboard board, and preview timeline.
3. Build selected-shot inspector with frame, video description, prompt, assets, duration, track, validation, and media state.
4. Build compact asset/media tiles using local thumbnails or designed placeholders.
5. Build secondary debug drawer for task log, raw refs, validation history, and manifest JSON.
6. Keep limitations visible near export/settings but not dominant.
7. Capture completed-state desktop and mobile screenshots after the full fixture workflow.

## Do Not

- lead the preview with a manifest textarea;
- make raw media URI tables the primary media UI;
- accept empty mobile dashboard screenshots as UX proof;
- count generic dashboard/card-soup layout as creative workbench quality;
- ship enabled no-op controls.

## Exit Criteria

- browser happy path clicks rendered controls and parses manifest from rendered UI;
- completed screenshots show storyboard thumbnails, timeline lanes, selected-shot inspector, compact media/task state, and export affordance;
- debug evidence is secondary.

## Validation Evidence

- Playwright/browser QA report;
- desktop and mobile screenshots;
- exported manifest sample.

