# Verify: design-quality-lift

How to verify the design quality lift is installed. The verify protocol is the source of truth for "installed" claims. Run all gates before declaring the lift done. Pass condition: `capability-receipt.md` exists with all required outputs and no blockers remain.

## Required structural checks

### Direction lock

- `direction_profile_locked` — `design-direction.yaml` exists with all required fields.
- `three_dials_recorded` — DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY all set 1-10.
- `visual_risk_budget_audit` — receipt's risk budget matches the direction's allowed rule breaks.

### Banned defaults audit

Run a regex audit on the codebase for:

- `llm-default-serif-display` — Fraunces / Instrument_Serif / Playfair Display / Cormorant Garamond
- `llm-default-inter-slate` — Inter + slate-900 as universal
- `ai-purple-gradient` — purple/violet/fuchsia/indigo linear-gradient
- `centered-hero-dark-mesh` — radial-gradient mesh pattern
- `three-equal-feature-cards` — three equal cards
- `hand-rolled-svg-icons` — inline `<svg><path d="...">` without a library import
- `generic-friendly-microcopy` — "Oops", "Whoopsie", "Whoops"
- `infinite-loop-animations` — `animation: ... infinite` or `animate-spin` on common UI
- `random-cubic-bezier` — `cubic-bezier(...)` with non-standard values

If any banned default is present, the lift is not proven.

### Required patterns

Per direction, the following must be present:

**clean-minimal:**
- 8pt baseline grid
- Mono accent on ≤2 surfaces
- Max 2 type weights in use at once
- Motion ≤120ms for state changes
- Sans display font (not serif as default)

**warm-human:**
- Rounded geometry (radius ≥8px)
- Warm accent (terracotta, ochre, sage, dusty rose, butter yellow)
- Soft shadows (max 2 levels)
- Conversational microcopy with first-person voice
- Max 3 type families
- Hand-drawn or custom-illustrated empty state

**brutalist:**
- Raw structural elements visible
- Mono font presence
- Sharp 90° angles (border-radius ≤4px)
- Pure black/white + max 1 accent
- No drop shadows (or max 1 level, hard offset)

**premium-luxury:**
- Custom or premium-curated illustrations
- Fine typography hierarchy
- Soft shadows (1-2 levels)
- Generous spacing
- Signature detail (textured background, custom cursor, signature transition)

**wild-creative:**
- Distinctive typography (custom or unexpected pairing)
- Hero motion >600ms with intent
- Signature color moment
- One 3D moment
- One unexpected interaction

## Runtime checks

### Cross-direction (universal)

- `prefers_reduced_motion_fallback` — media query implemented
- `prefers_reduced_transparency_fallback` — media query implemented
- `keyboard_navigation_for_interactive` — every interactive element is keyboard-navigable
- `focus_visible_everywhere` — focus state visible on every interactive element
- `lighthouse_accessibility_ge_95` — Lighthouse accessibility score ≥ 95
- `axe_audit_pass` — axe audit passes
- `icon_library_used_no_hand_rolled_svg` — at least one icon library imported; no hand-rolled SVG paths
- `direction_profile_locked_in_receipt` — receipt contains the locked direction
- `three_dials_recorded_in_receipt` — all three dials present in receipt

### Receipt checks

The receipt at `.buildprint/design-quality-lift-receipt.md` must contain:

- `direction_profile_locked` — which direction was chosen
- `three_dials_recorded` — the three dials as numbers
- `before_after_screenshots` — at least 5 before/after pairs covering key surfaces
- `lighthouse_audit` — accessibility score, date, run command
- `axe_audit` — issues count, date, run command
- `microcopy_inventory` — list of all microcopy with voice attribution
- `motion_inventory` — list of all animations with duration + easing + direction
- `icon_library_inventory` — list of all icons used with library attribution
- `typography_pairing_recorded` — the pairing chosen
- `signature_moment_proof` — screenshot or interaction evidence of the signature moment
- `visual_risk_budget_audit` — which risk budget items were used, which were not
- `banned_defaults_audit` — pass / fail per banned default

## Blocked checks

The following conditions block the lift:

- No direction profile locked blocks implementation
- Banned defaults present block claim
- Hand-rolled SVG icons in primary components block component phase
- Missing reduced-motion fallback blocks motion phase
- Missing reduced-transparency fallback blocks visual phase
- Lighthouse score < 95 blocks accessibility claim
- axe critical or serious issues block accessibility claim
- Missing before/after screenshots block receipt
- Missing signature moment proof blocks direction claim
- Missing motion inventory blocks motion claim
- Missing microcopy inventory blocks microcopy claim
- Not-proven or blocked evidence means the claim is not-proven

## Proof level gating

The proof level chosen at assessment (sandbox, host-applied, production) determines which evidence is required.

- `sandbox` — receipts can use a copy of the host.
- `host-applied` — receipts must use the real host on a branch.
- `production` — receipts must include production build number, deployment timestamp, and at least one production-screenshot.

## Commands

```bash
# Banned defaults audit
node bin/agb.js packet check buildprints/design-quality-lift

# Run on the host (or sandbox copy)
node bin/agb.js check:design-quality-lift
```

## DO NOT

- Do not claim the lift is installed before `capability-receipt.md` is written.
- Do not skip a gate because the evidence feels redundant.
- Do not allow a model-judge or visual-judge score to override a deterministic visual proof gate.
- Do not declare a banned default absent if a regex audit finds it.
- Do not claim "premium" without a custom illustration or signature transition.
- Do not claim "creative" without a signature moment and a visual risk budget.
- Do not produce a receipt with placeholder content.
