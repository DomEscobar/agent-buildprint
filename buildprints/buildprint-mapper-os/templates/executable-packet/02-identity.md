# 02 Identity

Runs after `01-setup.md` and before `loops/*`. For UI-bearing artifacts, UX is a must: confusing, generic, or ugly UI is not a finished product.

If this artifact is not UI-bearing, replace the body with an explicit `not-ui-bearing` marker and define the developer/operator experience (commands, logs, errors, recovery) with equivalent specificity.

## Load the frontend skill

Read `.agents/skills/frontend-ui-product-design/SKILL.md` and `references/screen-states.md` when present. If the skill is missing, return to `01-setup.md` and repair the harness.

## Generate local identity

Generate local `docs/ui-identity.md` (or `UI-IDENTITY.md`) and `docs/DESIGN.md` before implementing UI loops. `docs/DESIGN.md` is a screen construction contract (tokens, type scale, layout, components, states) — not a moodboard.

## Required identity content

Define:

- Product metaphor and emotional/operator affordance
- Dominant object the user manipulates
- Primary gesture / moment-to-moment manipulation
- Design thesis and chosen style direction (with rejected adjacent styles)
- Color and typography tokens
- Layout model and component language
- Empty / loading / error / blocked states
- Anti-generic rules: reject functionless buttons, dead controls, raw JSON as UX, and proof-console silhouettes

Think through the artifact's golden path and central output before implementation. Vague adjectives are not a valid contract.

## Standing obligation

Every later loop keeps this file open as comprehension, user-language, and visual identity responsibility — including backend, runtime, and verification work that still changes what users see.
