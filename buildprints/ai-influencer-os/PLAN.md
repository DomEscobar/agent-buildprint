# PLAN

Read `BUILDPRINT.md` first. Then execute the phase files in order.

```txt
plans/00-alignment.md
plans/01-openclaw-runtime-shape.md
plans/02-persona-runtime.md
plans/03-memory-life-state.md
plans/04-wavespeed-image.md
plans/05-social-planner.md
plans/06-publisher-handoff.md
plans/07-manager-audit.md
plans/08-tests-validation.md
```

## Rules

- Finish each phase before starting the next.
- Keep the OpenClaw target shape intact.
- If blocked, write the blocker in `VALIDATION.md` and continue only where safe.
- Do not call external APIs in tests.
- Do not auto-publish by default.

## Done means

- `target verification command` passes;
- `static verification command` or equivalent syntax check passes;
- `VALIDATION.md` records implementation evidence and blockers;
- every phase risk is covered or explicitly marked blocked.
