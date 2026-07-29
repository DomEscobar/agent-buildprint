# Alignment slice UI identity

## Product read

This is a playable pixel-world alignment surface for developers and visual
reviewers. The first screen should feel like a small game world worth exploring,
not an atlas debugger or a dashboard.

## Screen states

- `Route Grove` is the default, composed starter-world slice.
- `Atlas Park` is a sibling playable map reached through the footer. It places
  every currently authorable semantic terrain, stamp, single world prop, and
  sequence family.
- The numbered atlas inspector remains a development-only query route and is
  never shown beside either playable map.

Each playable state has one dominant surface (the world), one context surface
(masthead and location plaque), and one action surface (movement controls plus
the sibling-map link).

## Interaction

The primary gesture is four-direction movement with keyboard or touch. The first
action is walking toward a visible landmark. Map switching is explicit and
preserves a single-world screen rather than stacking comparison panels.

## Forbidden silhouettes

- debug dashboard or proof-console chrome
- raw atlas contact sheet as the playable world
- arbitrary rectangle crops or raw frame labels
- simultaneous world, inspector, and catalog panels
- local Pokémon species art; species sprites remain a PokeAPI concern
