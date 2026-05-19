# Agent Handoff

Use this file only after `BUILDPRINT.md`. `BUILDPRINT.md` is the canonical authority spine and owns the required read order; this handoff is a lower-authority build-order aid for the portable creative pipeline.

## Mission

Build a clean-room, deterministic service proof that turns fixture novel chapters into a portable short-drama production package:

`Project + Chapters -> Event Summaries -> Script Plan + Scripts -> Assets -> Storyboard Table + Storyboard Rows -> Mock Media Tasks -> Portable Preview Manifest`

Do **not** rebuild Toonflow's Electron app, full canvas UI, live provider integrations, or final video stitching.

Also do **not** settle for a raw compliance dashboard. The browser proof must read as a creative storyboard workbench: local thumbnails, timeline lanes, selected-shot inspector, compact media tiles, and a secondary debug drawer.

## Position in Read Order

`BUILDPRINT.md` owns the required read order. After following that canonical order, use this handoff as a compact build-order reminder:

- `CONTRACTS.md` — schemas, states, adapters.
- `PRODUCT_QUALITY_BAR.md` + `LLM_AGENT_EXECUTION_GUIDE.md` - product quality and context-rot guardrails.
- `WORKBENCH_UX_SPEC.md` + `DESIGN_SYSTEM_SPEC.md` + `VISUAL_FIXTURE_PACK.md` - browser workbench requirements.
- `LLM_FLOW.md` — ScriptAgent/ProductionAgent flow and prompt invariants.
- `SYSTEM_MAP.md` — module boundaries and relationships.
- `TEST_MATRIX.md` + `HEAD_TO_FOOT_QA.md` — validation gates.
- `TRACEABILITY_MATRIX.md` — source evidence if needed.

If this file conflicts with `BUILDPRINT.md`, `BUILDPRINT.md` wins.

## Build Order

1. Create deterministic domain models and repositories.
2. Add fixture loader with 3 ordered chapters.
3. Implement event extraction with mock text provider.
4. Implement ScriptAgent service as staged deterministic/mock outputs: skeleton -> adaptation -> scripts.
5. Implement asset extraction and de-dup/linking.
6. Implement ProductionAgent service: director plan -> storyboard table -> storyboard rows.
7. Implement media task adapters with mock image/video providers only.
8. Implement local visual fixture refs for assets/storyboard rows/media previews.
9. Implement workbench UI with selected-shot inspector, timeline lanes, compact media tiles, and secondary debug drawer.
10. Implement portable preview manifest export.
11. Add tests before final UI QA.

## Hard Rules

- Default tests must make zero network calls.
- Use deterministic IDs and clock for snapshots.
- Preserve workflow states and transitions.
- Keep live providers behind interfaces only.
- Do not store secrets or provider values.
- Do not claim final stitched-video parity.
- Do not make raw task logs, raw media refs, or raw manifest JSON the primary product surface.
- Do not finish with only file reports; provide a chat handover with outcome, evidence, gaps, and next direction.
- If a source behavior is unclear, mark it `INFERRED` and choose the safe portable default.

## Minimal Acceptance

A clean-room proof passes when:

- A 3-chapter fixture imports with stable chapter order.
- Event extraction records success and failure states.
- Script stages produce stored skeleton, adaptation, and scripts.
- Asset extraction de-dupes names and preserves script links.
- Storyboard rows preserve row count, duration, track grouping, and asset links.
- Mock media tasks record generated/failed states.
- Preview manifest snapshot includes chapters, events, scripts, assets, storyboard rows, tracks, media records, and task log.
