# Handover

Use this when stopping or claiming progress. Do not claim completion beyond the evidence.

## Built

- List concrete product behavior implemented.
- Tie each behavior back to Configure, Create, Outline, Deck, Templates, or Exports.

## Verified

- List commands, browser checks, API checks, screenshots, export attempts, provider probes, and observed results.
- Include any clean install or generated-deck proof.
- Include the wide desktop Deck screenshot path and state whether it passed desktop visual acceptance: thumbnail rail, central 16:9 canvas, inspector/edit controls, and no slide-canvas overlap/clipping.

## Blocked

- List blockers with owner and next repair route: provider keys, document parser, image provider, export runtime, API/webhook, MCP, desktop, auth/privacy, or deployment.
- Treat desktop visual defects as blockers when the Deck canvas overlaps, clips, or collapses into a narrow stacked layout in desktop proof.

## Not proven

- List claims that remain unverified, especially live provider generation, document decomposition, template import, deck persistence, export runtime, async API, webhook delivery, MCP tool use, desktop packaging, auth, privacy, and public-web readiness.
- List UX claims that remain unverified, especially beginner comprehension, mobile readability, keyboard access, screen-reader labels, and large deck performance.

## Next

1. Continue one phase — implement the next phase only, then stop and show this menu again.
2. Continue to the next checkpoint — implement through verification, pausing only on a real blocker.
3. Do all remaining phases — implement every dependency-ready phase through final handover, stopping only on real blockers.
4. Stop here.
