# Product Taste

Use this before UI identity or UI implementation. It adapts taste-skill discipline to product apps, tools, dashboards, editors, and chat interfaces.

## Design Read

Before choosing layout or style, write a one-line design read:

- Reading this as: <product genre> for <audience>, where the first screen should feel <quality bar>, not <nearest lazy default>.

The design read must name the product genre. A chat app, editor, dashboard, creative canvas, review queue, setup flow, and landing page have different taste rules.

## Taste Dials

Set 4-7 dials from 1 to 10 before UI code. Use dials that fit the product genre, for example:

- Genre fidelity.
- System visibility.
- Visual density.
- Motion restraint.
- Action directness.
- Consumer polish.
- Information scent.
- Mobile comfort.

For chat products, include chat dominance, composer polish, inline action naturalness, system-label suppression, and empty-state restraint.

## Anti-Default List

Name the 3-6 defaults this artifact must not fall into. Examples:

- SaaS dashboard by habit.
- Chat plus right inspector.
- Mission sheet replacing chat.
- Feature-demo cards before user intent.
- Internal status labels as primary UI.
- Blank center with a giant bordered shell.

## Craft Gate

Before handoff, compare screenshots against the design read and dials. Fail if:

- The first viewport shows capabilities instead of the user's natural first action.
- The UI advertises internals before the user needs them.
- Empty state feels like a feature demo.
- Every surface has the same bordered-card treatment.
- Mobile is only desktop stacked tighter.
- The screenshot could belong to any generic AI product after title changes.

Taste claims need screenshot paths, regions, and concrete repair notes. "Looks clean" is not evidence.

## DESIGN.md Contract

For UI-bearing Buildprint work, write or update `docs/DESIGN.md` as the visual taste system after product identity is understood and before UI code hardens. Keep it distinct from `docs/ui-identity.md`:

- `docs/ui-identity.md` says what product this must be, what the user does first, what interaction model and screen states exist, and which product silhouettes are forbidden.
- `docs/DESIGN.md` says how the product visually feels: atmosphere, color, typography, spacing, radii, density, component styling, motion, responsive collapse, and visual anti-patterns.

The evidence binder must prove both. A beautiful surface that violates the product genre fails; a correct product silhouette with weak visual taste also fails.
