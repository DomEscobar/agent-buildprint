# Compatibility

This buildprint is a Capability Buildprint. It grafts a design quality lift onto an existing host app. It is not a whole-product phase plan and not a stand-alone UI library.

If the host app does not meet the signals below, the applying agent must record a blocker and must not proceed without user confirmation.

## Host signals

A host is compatible with this buildprint when ALL of the following are true.

- The host has a real UI surface (web app, mobile app, or marketing site) with at least 5 interactive components.
- The host has either an existing component library (shadcn/ui, Radix, Mantine, Material, Carbon, custom) or willingness to install one.
- The host has a frontend stack that supports CSS modules, Tailwind, or a token system (CSS variables, design tokens, theme provider).
- The host has a test runner or can be made to have one (Vitest, Jest, Playwright, Storybook).
- The host has a way to take screenshots or record browser interactions for receipts (Playwright, Storybook, Chromatic, manual).
- The host has a working dev/preview environment where the lift can be applied without breaking production.
- The host either has a brand/voice guide, or is willing to define one as part of the lift.

## Required existing capabilities

The host should already have or be willing to add:

- A persistence or static file system for design tokens (CSS variables file, theme provider, or `tokens.css`).
- A build system that processes CSS (Vite, Next, webpack).
- Either a paid-model or local model setup (this buildprint evaluates visual quality; the host's runtime is not in scope).
- A git-based workflow for branches and pull requests (this buildprint produces diffs).
- Either Storybook or a similar component explorer, or a development environment that can host interactive demos.

## Expected existing capabilities (recommended)

- Lighthouse or axe-core for accessibility auditing.
- A test runner for unit and visual tests.
- A bundle analyzer for icon library bloat detection.
- A screenshot or browser-test framework for receipts.
- An existing design system or component library.

## Composition rules

This buildprint composes with:

- `ui.proof-harness` — for visual proof gates.
- `agentic-chat-eval-harness` — when the host's UI includes chat.
- `ai-presentation-generation` — for content and microcopy patterns.
- `design-system-installer` — for installing a real design system.
- `capability-buildprint-standard` — for buildprint authoring rules.

This buildprint extends the `capability-buildprint-standard` contract.

## Forbidden hosts

- Hosts with no UI surface (CLI tools, headless services, pure data pipelines).
- Hosts without a frontend build system.
- Hosts that forbid CSS / styling changes.
- Hosts in regulated industries where creative latitude is forbidden (medical-device embedded UI, certified aviation, FDA-class II/III).
- Hosts that have explicitly chosen an LLM-default aesthetic and refuse to change.

## Forbidden stacks

- Frameworks without CSS support (some legacy jQuery-only stacks).
- Inline-style-only apps with no design tokens.
- Apps with hardcoded colors and spacing throughout the codebase (lift is technically possible but the gain is marginal).

## When the host is partially compatible

When the host is partially compatible, the applying agent must:

- Document the incompatibility in `.buildprint/host-assessment.md` under "Compatibility gaps".
- Patch the incompatibility locally if the gap is small (e.g., add a token file).
- Ask the user when the gap is large (e.g., complete design system replacement).
- Stop and ask when the gap involves destructive operations (deleting the existing component library, replacing the design system wholesale).

## Direction-specific compatibility

| Direction | Required host capability | Notes |
|---|---|---|
| clean-minimal | Any frontend stack | Lowest host dependency. |
| warm-human | Custom illustration OR ability to commission | Hand-drawn illustrations are external. |
| brutalist | Mono font availability | Mono is core to the direction. |
| premium-luxury | Custom illustration OR premium stock license | Custom illustrations are external. |
| wild-creative | WebGL budget + 3D capability (Spline, R3F) | 3D is required, not optional. |
