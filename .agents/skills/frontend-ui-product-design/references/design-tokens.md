# Design Tokens

Use this when creating or changing visual styling.

## Required Token Roles

- Color: background, surface, surface-raised, border, text, text-muted, primary, primary-text, focus, success, warning, danger, info.
- Typography: display, heading, body, mono, label, button.
- Spacing: page, section, panel, stack, inline, control.
- Shape: radius-control, radius-panel, radius-card.
- Elevation: none, low, medium, overlay.
- State: hover, active, disabled, selected, loading, error.

## Rules

- Define tokens before using them in components.
- Use tokens for all repeated colors, font families, spacing, shadows, borders, and focus rings.
- Do not improvise inline hex, rgb, OKLCH, HSL, font-family, box-shadow, or arbitrary spacing after tokens are chosen.
- If a new value is needed, add a named token first.
- Keep focus and state colors distinct enough to work without relying only on color.

## Copy Integrity

- Do not invent metrics, testimonials, logos, customer counts, conversion numbers, benchmarks, or awards.
- Use real data, a labelled placeholder, or a layout that does not require proof copy.
- Keep UI copy in the user's product language, not Buildprint, evaluator, proof, phase, or harness language unless the product is explicitly a developer tool.

## Visual Bans

- Fake browser chrome, fake phone frames, fake IDE windows, fake code-window title bars.
- Italic display headings.
- Purple-blue gradient defaults unless explicitly justified by the brand or product.
