# Phase 02 - Token System and Visual Foundation

## Objective

Establish the token system that underlies every component, state, and motion in the lift. Tokens are not optional. They are the mechanism by which the direction's choices propagate to every part of the host. Without tokens, the lift will regress to per-component hardcoded values and fail the receipt's banned-defaults audit.

## Why this phase exists

LLM-default UI generation hardcodes values. This is the root cause of the "every component looks slightly different" anti-pattern. Tokens are the antidote. The token system is also the foundation for direction-specific changes: changing the direction in phase 1 should propagate to every component by changing the tokens, not by editing every component.

## Inputs

- `.buildprint/design-direction.yaml` (from phase 1)
- `.buildprint/host-assessment.md` (current color, type, space, radius, elevation, motion)
- `.buildprint/banned-defaults-audit.md` (what's currently in the host)

## Steps

### 1. Color tokens

Define semantic color tokens, not raw values:

- `color/background/primary` — main canvas
- `color/background/secondary` — surfaces
- `color/text/primary` — body text
- `color/text/secondary` — muted text
- `color/text/inverse` — on-accent text
- `color/border/default` — borders
- `color/accent/default` — accent (single, direction-defined)
- `color/accent/hover` — accent hover
- `color/feedback/error`, `color/feedback/warning`, `color/feedback/success`, `color/feedback/info`

Per direction:

- `clean-minimal` — cool grays, single accent (blue, green, or violet — never AI-purple)
- `warm-human` — warm grays (yellow/orange undertone), warm accent (terracotta, ochre, sage, dusty rose, butter yellow)
- `brutalist` — pure black/white + max 1 accent (often red, yellow, or industrial blue)
- `premium-luxury` — deep neutrals (off-black, cream, deep gray) + sophisticated accent (deep gold, oxblood, navy, deep green)
- `wild-creative` — bold, distinctive palette; no monotone grays; no AI-purple gradient

### 2. Typography tokens

Define a type scale and a font system:

- `font/display` — display face
- `font/body` — body face
- `font/mono` — mono face
- `font/size/display` — display size
- `font/size/h1`, `h2`, `h3`, `h4`, `body`, `caption`
- `font/weight/regular`, `medium`, `semibold`, `bold`
- `font/leading/tight`, `normal`, `relaxed`
- `font/tracking/tight`, `normal`, `wide`

Per direction, the type scale varies. `clean-minimal` is tight tracking and tight leading. `premium-luxury` is generous leading and refined tracking. `wild-creative` is oversized and intentional.

Banned:
- `Inter + slate-900` as universal
- `Fraunces` or `Instrument_Serif` as display default
- `system-ui` as sole sans

### 3. Space tokens

Establish a baseline grid. The default is 4pt or 8pt. Define:

- `space/0` = 0
- `space/1` = 4px
- `space/2` = 8px
- `space/3` = 12px
- `space/4` = 16px
- `space/5` = 24px
- `space/6` = 32px
- `space/8` = 48px
- `space/10` = 64px
- `space/12` = 96px

Per direction, the density multiplier varies. `clean-minimal` and `brutalist` use the full scale. `warm-human` and `premium-luxury` lean toward the upper end. `wild-creative` uses asymmetric spacing intentionally.

### 4. Radius tokens

- `radius/none` = 0
- `radius/sm` = 2px
- `radius/md` = 4px
- `radius/lg` = 8px
- `radius/xl` = 12px
- `radius/2xl` = 16px
- `radius/full` = 9999px

Per direction:

- `clean-minimal` — `lg` (8px) baseline, no `full` for buttons
- `warm-human` — `lg` or `xl` baseline, friendly feel
- `brutalist` — `none` or `sm` only
- `premium-luxury` — `md` to `xl` baseline
- `wild-creative` — varies, can be `full` or asymmetric

### 5. Elevation tokens

- `elevation/0` = none
- `elevation/1` = soft shadow
- `elevation/2` = soft + medium shadow
- `elevation/3` = layered shadow (premium only)

Per direction, the elevation is constrained:

- `clean-minimal` — 1-2 levels max
- `warm-human` — 1-2 soft levels
- `brutalist` — none or 1 hard-offset
- `premium-luxury` — 1-2 soft levels
- `wild-creative` — varies

### 6. Motion tokens

- `motion/duration/enter` — entry duration
- `motion/duration/exit` — exit duration
- `motion/duration/hover` — hover duration
- `motion/easing/enter` — easing for entry
- `motion/easing/exit` — easing for exit
- `motion/easing/hover` — easing for hover
- `motion/distance/sm`, `md`, `lg` — animation distance

Per direction, duration and easing are constrained (see `capability.yaml → motion_tokens.duration_by_direction`).

Required:
- `prefers-reduced-motion: reduce` media query that disables non-essential motion.
- `prefers-reduced-transparency: reduce` media query that disables glassmorphism or any transparency-dependent effect.

### 7. Replace hardcoded values with tokens

Audit the host's current components for hardcoded values. Replace with tokens. This is the most labor-intensive step in this phase.

## Proof gate

This phase is complete when:

- Token files exist (CSS variables, theme provider, or `tokens.css`).
- At least 5 primary components use tokens (not hardcoded values).
- prefers-reduced-motion + prefers-reduced-transparency media queries are implemented.
- Banned defaults audit no longer flags the host for any color, type, space, radius, elevation, or motion violations introduced by this phase.

## Output

- `tokens.css` or equivalent token file in the host's source tree.
- Updated components using tokens.
- `.buildprint/phase-02-receipt.md` listing tokens defined, components updated, and any new banned defaults introduced.

## What this phase prevents

- LLM-default typography creeping back in.
- AI-purple gradients.
- Hand-rolled spacing values.
- Random cubic-bezier easings.
- Glassmorphism without reduced-transparency fallback.
- Inconsistent elevation.

## DO NOT

- Do not hardcode values in primary components.
- Do not introduce new banned defaults.
- Do not skip the prefers-reduced-motion / prefers-reduced-transparency fallbacks.
- Do not use a single font size or weight — the type scale must be direction-specific.
- Do not produce the token system without audit-ing the host's existing components for replacements.
