# Alignment slice visual system

## Direction

Warm-approachable pixel-world field guide. Preserve the existing Georgia display
face, Trebuchet body face, deep evergreen surfaces, parchment text, amber accent,
hairline borders, and restrained shadows. Reject a technical-terminal direction:
the inspector may be technical, but the playable maps should feel like places.

## Taste dials

- genre fidelity: 9/10 — the canvas reads first as a small game world
- system visibility: 4/10 — semantic contracts stay behind the scene
- visual density: 7/10 in Atlas Park, 5/10 in Route Grove
- motion restraint: 9/10 — only character movement and camera follow
- action directness: 9/10 — movement and one sibling-map link
- mobile comfort: 8/10 — crisp cropped viewport and reachable D-pad

## Tokens and components

Use the existing CSS custom properties for background, surfaces, border, text,
accent, focus, and shadow. Repeated spacing and radii remain tokenized through
the existing shell, frame, plaque, D-pad, and footer rules.

The sibling-map link uses the existing footer-link language and must have a
visible focus ring. No new card, badge, panel, or floating debug component is
introduced.

## Responsive behavior

Desktop shows the full 480x320 canvas. At 520px and below, the canvas remains
480x320 at 1:1 pixel scale and is clipped inside the responsive frame. The map
switch remains below the dominant play surface; secondary inspector access is
not added to mobile.

## Visual rejection criteria

- severed tree trunks, partial buildings, broken pond shores, or sequence gaps
- raw atlas cells used as decoration without semantic promotion
- page-level horizontal overflow at 320, 375, 414, or 768px
- gallery density that blocks the spawn or removes walkable corridors
- world-prop rows hidden beneath the location plaque
- a first viewport containing only empty terrain or only a cropped landmark
