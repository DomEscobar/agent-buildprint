# Handover

Use this when stopping or claiming progress. Do not claim completion beyond the evidence.

## Built

- List concrete product behavior implemented.
- Tie each behavior back to Configure, Create, Outline, Deck, Templates, or Exports.

## Verified

- List commands, browser checks, API checks, screenshots, export attempts, provider probes, and observed results.
- Include any clean install or generated-deck proof.
- Include the wide desktop Deck screenshot path and desktop visual acceptance result: thumbnail rail, central 16:9 canvas, inspector/edit controls, and no slide-canvas overlap/clipping.
- Include the mobile Deck screenshot path and mobile visual acceptance result: readable/reachable tabs, thumbnail rail, toolbar actions, slide canvas, inspector fields, chat/export controls, and no accidental horizontal clipping.
- Include content-specificity proof: cite at least four non-title slides and whether their outline plans, body fields, notes, and layout reasons differ by slide purpose rather than repeating generic filler.
- Include long-text stress proof: cite the seeded/generated long title, long bullet/body, long provenance/source label, and long notes case, with desktop and mobile screenshot or manual inspection result.
- Include generated-app proof commands or scripts for desktop/mobile screenshots, content-specificity assertions, and long-text stress. If these are missing, list that as a blocker rather than relying on prose review.

## Blocked

- List blockers with owner and next repair route: provider keys, document parser, image provider, export runtime, API/webhook, MCP, desktop, auth/privacy, or deployment.
- Treat desktop visual defects as blockers when the Deck canvas overlaps, clips, or collapses into a narrow stacked layout in desktop proof.
- Treat mobile visual defects as blockers when tabs, thumbnails, toolbar actions, inspector controls, or primary actions are horizontally clipped or unreachable in mobile proof.
- Treat repeated generic slide content as a blocker when the generated outline/deck proves only plumbing instead of useful presentation generation.
- Treat long-text layout failures as blockers when realistic titles, bullets, provenance labels, or speaker notes overlap, clip accidentally, or make controls unusable.

## Not proven

- List claims that remain unverified, especially live provider generation, document decomposition, template import, deck persistence, export runtime, async API, webhook delivery, MCP tool use, desktop packaging, auth, privacy, and public-web readiness.
- List UX claims that remain unverified, especially beginner comprehension, mobile readability, long-text robustness, keyboard access, screen-reader labels, and large deck performance.

## Next

1. Continue one phase — implement the next phase only, then stop and show this menu again.
2. Continue to the next checkpoint — implement through verification, pausing only on a real blocker.
3. Do all remaining phases — implement every dependency-ready phase through final handover, stopping only on real blockers.
4. Stop here.
