# Phase 08 — Verification and handover

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `HANDOVER.md`, and the central output contract in `blueprint.yaml`. Verify the product artifact against output quality, not only syntax and build commands.

## Building objective

Run final verification across the full presentation loop: configure readiness, prompt/upload, outline, layout/template assignment, deck editing, assets/theme, chat iteration, export/API/webhook/MCP/desktop states, persistence, responsive UI, accessibility basics, and blocker honesty. Produce a handover that states built, verified, blocked, not proven, and next action with exact commands and observed outcomes.

Also find blandness before handoff. A product can pass structural checks while its central output is still generic, interchangeable, or not useful. Compare the observed deck against the `central_output_contract` in `blueprint.yaml` and `docs/output-quality.md` or equivalent. If the artifact's main output only proves that input flowed through the system, record the quality gap instead of calling it complete.

Also inspect the visual proof, not just its existence. The desktop Deck screenshot must show a real wide workbench and a readable slide canvas. If the main slide preview has overlapping title/body/provenance text, clipped labels, unreadable compressed content, or collapsed mobile-style stacking at desktop width, mark desktop workbench quality as blocked and regenerate after fixing the buildprint or implementation.

Also inspect responsive proof, not just mobile screenshot existence. The mobile Deck screenshot must keep the top navigation, slide thumbnail rail, deck toolbar, slide canvas, inspector fields, chat/export controls, and action buttons readable and reachable without accidental horizontal clipping. If labels or controls are cut off at the viewport edge, mark responsive deck quality as blocked.

Also inspect content specificity. Compare the outline and deck body fields across at least four non-title slides. If the app repeats the same generic plan or bullet structure under different slide titles, mark deck output quality as blocked. A deterministic local fallback can be acceptable only when it produces differentiated slide-specific content and clearly labels itself as sample/local.

Also inspect long-text stress behavior. Use a generated or seeded deck with long title, long bullets, long provenance/source labels, and long notes. Capture or manually inspect desktop and mobile states. If long content breaks the canvas, thumbnails, toolbar, inspector, or action buttons, mark editor layout quality as blocked. Confirm the full long values remain editable in inspector fields when the slide canvas clamps or summarizes them.

## DO NOT

Do not claim live provider generation, document extraction, editable deck quality, desktop workbench quality, responsive deck quality, content-specific generation quality, long-text robustness, export success, API/webhook/MCP/desktop readiness, production auth/privacy, or public deployment without direct proof. Do not hide missing tests, screenshots, visual defects, generic repeated content, or blocked states. Do not use placeholders, functionless buttons, or mocked/sample data as real verification proof.

## Minimum proof before moving on

Run the strongest available command suite: install, build/typecheck, lint, tests, smoke, screenshots, packet checks, and API/export checks where available. Verify at least one deck path in the browser if the app has a frontend. Inspect screenshots for overlap, dead controls, unclear blockers, mobile clipping, repeated generic content, long-text breakage, and static-demo behavior. Include a wide desktop Deck proof at 1440px or wider; screenshot-only proof fails if the Deck view is narrow, stacked, or visually overlapping. Include a mobile Deck proof; screenshot-only proof fails if navigation, thumbnails, toolbar, inspector, or actions are clipped. Include content-specificity and long-text stress results in the handover. When the generated app has a test runner, add or run repeatable assertions for desktop geometry, mobile overflow, content specificity, and long-text stress instead of relying only on manual screenshot review.

## Handoff note

Update `HANDOVER.md` with exact facts. The handover must separate built behavior, verified behavior, blockers, not-proven claims, and next action.
