# Phase 99 — Final review and handover

## Product intention

The implementation does not end when the last feature compiles. It ends after a skeptical artifact review repairs local high-signal defects and writes a concise handover.

## Review

Before handover, act like the artifact is trying to fool you:

- complete the core loop from a fresh start for the real consumer;
- reload/restart/rerun and check required state, traces, or outputs;
- change inputs/config/events and verify behavior changes;
- click visible primary controls or run documented commands/API calls/operator actions;
- trigger empty/error/blocked states where possible;
- look for generic dashboard smell, fake intelligence, raw JSON dumped as the whole experience, placeholders, dead controls, undocumented public methods, fake adapter seams, canned output, debug/internal vocabulary, and missing next actions.

Fix local, safe, central defects. Leave blockers only when they are real.

## Handover

Write the handover described in `05-handover.md`. A chat summary is not enough.
