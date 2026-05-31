# Phase 99 — Final review and handover

## Product intention

The implementation does not end when the last feature compiles. It ends after a skeptical product review repairs local high-signal defects and writes a concise handover.

## Review

Before handover, act like the product is trying to fool you:

- complete the core loop from a fresh start;
- reload and check state/readback;
- change inputs and verify outputs change;
- click visible primary controls;
- trigger empty/error/blocked states where possible;
- look for generic dashboard smell, fake intelligence, raw JSON, placeholders, dead controls, canned output, debug/internal vocabulary, and missing next actions.

Fix local, safe, central defects. Leave blockers only when they are real.

## Handover

Write the handover described in `05-handover.md`. A chat summary is not enough.
