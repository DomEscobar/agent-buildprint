# LLM Agent Execution Guide

## Context-Rot Guard

When starting, resuming after compaction, or inheriting a partial implementation:

1. Reread `BUILDPRINT.md`.
2. Reread `PRODUCT_QUALITY_BAR.md`.
3. Reread `WEBAPP_TARGET_SPEC.md` and `WORKBENCH_UX_SPEC.md` before UI work.
4. Reread `CONTRACTS.md`, `PROVIDER_ADAPTERS.md`, `ASYNC_JOB_MODEL.md`, and `MEDIA_PIPELINE_SPEC.md` before backend/media work.
5. Reread `HEAD_TO_FOOT_QA.md`, `BROWSER_QA_SCENARIOS.md`, `acceptance.yaml`, and `claims.yaml` before final validation.

## Priority Table

| If attention conflicts | Prefer |
|---|---|
| Compliance report vs usable studio | usable studio first, report secondary |
| Live providers vs deterministic proof | deterministic mock/no-network proof |
| Exact original stack vs local feasibility | stack-flexible equivalent behavior |
| Raw provider output vs validated state | validated domain state |
| Fast completion vs browser evidence | browser evidence |
| Impressive claims vs proven claims | proven claims |

## Build Order Reminder

1. Record alignment choices.
2. Implement contracts and deterministic mocks.
3. Implement job lifecycle and persistence.
4. Implement fixture media pipeline.
5. Implement browser studio workflow.
6. Implement gallery and publish consent gates.
7. Run tests/build/media probe/browser QA.
8. Fill validation report with evidence and gaps.

## Completion Handoff

Final handoff must include:

- what was built;
- exact commands and pass/fail status;
- browser evidence and screenshot paths;
- MP4 path and ffprobe result;
- provider mode and any live-provider evidence;
- known gaps;
- claim boundary reminder;
- recommended next direction.

Do not end with "all done" if any required gate is skipped. Name the skipped gate and blocker.
