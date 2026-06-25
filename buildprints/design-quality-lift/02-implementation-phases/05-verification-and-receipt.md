# Phase 05 - Signature Moment and Receipts

## Objective

Implement the direction's required signature moment — the single creative gesture that makes this app distinctly this direction. Produce the receipt with before/after screenshots, lighthouse, axe, microcopy and motion inventories. This phase is where the lift becomes provable.

## Why this phase exists

A design quality lift without a signature moment is a theme change. A design quality lift without a receipt is a claim. This phase forces both: a moment that escapes the generic, and evidence that the lift is real.

## Inputs

- All previous phases complete
- `.buildprint/design-direction.yaml`
- `.buildprint/voice-guide.md`
- `.buildprint/microcopy-inventory.md`
- `.buildprint/ia-decisions.md`
- All token files
- Updated components, states, and motion
- `.buildprint/screenshots/before/` (from phase 1)

## Steps

### 1. Implement the signature moment

Per direction, the signature moment is required. The signature moment is the single creative gesture that escapes the generic:

**clean-minimal:**

- Typografischer Hero-Moment: Display Size + Custom Pairing + unerwarteter Hierarchie-Bruch.
- Example: oversized single word in a custom sans-display, paired with quiet body text.
- Proof: screenshot of the hero, plus the typography pairing evidence.

**warm-human:**

- Menschen-gemachter Moment: hand-drawn illustration, personal microcopy, or analog texture.
- Example: a single hand-drawn empty-state illustration + first-person onboarding copy.
- Proof: screenshot of the empty state with the illustration, plus the illustration source file.

**brutalist:**

- Raw strukturelle Aussage: exposed grid, brutalist grid moment, or system reveal.
- Example: showing the grid lines as part of the design, not hiding them.
- Proof: screenshot of the grid moment, plus the CSS that exposes the grid.

**premium-luxury:**

- Feine Detail Aussage: custom illustration, signature sound (when applicable), or material moment.
- Example: custom-drawn hero illustration with subtle paper texture, paired with slow signature transition.
- Proof: screenshot of the hero, plus the signature transition in a video or animated GIF.

**wild-creative:**

- Unerwartete Interaktion: custom cursor, scroll-choreografie, signature transition, or 3D reveal.
- Example: scroll-driven 3D scene with custom cursor that morphs based on context.
- Proof: video of the interaction, plus the 3D scene source.

**Custom directions:**

- The user must define the signature moment.
- The signature moment must be direction-specific, not generic.
- The signature moment must be provable (screenshot, video, or interaction evidence).

### 2. Visual risk budget audit

The direction has a 1-3 visual risk budget (allowed rule breaks). The applying agent must:

- Document which risk budget items were used.
- Document which were not used.
- For each used item, provide a screenshot or evidence.

If a risk budget item was not used, the receipt still records the choice. The risk budget is not a quota; it is a permission.

### 3. Before/after screenshots

For at least 5 key surfaces, produce before/after screenshots:

- Login or signup
- Dashboard or main view
- Detail or list view
- Settings or profile
- Empty state of a key surface

The screenshots must be:

- Same viewport, same content, same state.
- Stored in `.buildprint/screenshots/before/` and `.buildprint/screenshots/after/`.
- Cited in the receipt with file paths.

### 4. Receipt

Write `.buildprint/design-quality-lift-receipt.md` with all required outputs from `capability.yaml → receipt.required_outputs`:

- `direction_profile_locked` — which direction was chosen.
- `three_dials_recorded` — the three dials as numbers.
- `before_after_screenshots` — at least 5 before/after pairs.
- `lighthouse_audit` — accessibility score, date, run command.
- `axe_audit` — issues count, date, run command.
- `microcopy_inventory` — list of all microcopy with voice attribution.
- `motion_inventory` — list of all animations with duration + easing + direction.
- `icon_library_inventory` — list of all icons used with library attribution.
- `typography_pairing_recorded` — the pairing chosen.
- `signature_moment_proof` — screenshot or interaction evidence of the signature moment.
- `visual_risk_budget_audit` — which risk budget items were used, which were not.
- `banned_defaults_audit` — pass / fail per banned default.

### 5. Banned defaults audit

Run a regex audit on the host's source code and the receipt. The audit must show:

- `llm-default-serif-display` — not present.
- `llm-default-inter-slate` — not present.
- `ai-purple-gradient` — not present.
- `centered-hero-dark-mesh` — not present.
- `three-equal-feature-cards` — not present.
- `hand-rolled-svg-icons` — not present.
- `generic-friendly-microcopy` — not present.
- `infinite-loop-animations` — not present (except progress indicators).
- `random-cubic-bezier` — not present.

If any banned default is present, the lift is not installed. The applying agent must fix it before claiming the lift is done.

## Proof gate

This phase is complete when:

- The direction's signature moment is implemented and provable.
- The visual risk budget is audited.
- Before/after screenshots are produced for at least 5 key surfaces.
- The receipt is written with all required outputs.
- The banned defaults audit passes.
- The user has approved the lift.

## Output

- Signature moment implementation.
- `.buildprint/screenshots/after/` with after-screenshots.
- `.buildprint/design-quality-lift-receipt.md` with all required outputs.
- `.buildprint/banned-defaults-audit.md` (final).
- The user-approved lift is the final state.

## What this phase prevents

- Claimed-but-not-proven lifts.
- Generic themed changes.
- Missing evidence.
- Hidden banned defaults.
- Bypassed risk budget.
- Bypassed signature moment.

## DO NOT

- Do not claim the lift is installed before the receipt is written.
- Do not skip the banned defaults audit.
- Do not claim a signature moment that is not provable.
- Do not declare a banned default absent if a regex audit finds it.
- Do not use the visual risk budget as a quota.
- Do not produce a receipt with placeholder content.
- Do not claim "premium" without a custom illustration or signature transition.
- Do not claim "creative" without a signature moment and a visual risk budget.
- Do not skip the user approval.
