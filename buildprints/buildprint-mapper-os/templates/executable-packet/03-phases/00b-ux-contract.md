# Phase 00b — UX contract

requires_roles: [content-design, ux-ui-craft, product-architect]

## Product intention

Lock the consumer-comprehension contract before any shell or feature work begins. This phase produces typed, citable artifacts that later phases must consume through a `ux_obligations` field. It is not about visual identity, component patterns, or copy polish; those belong in `UI-IDENTITY.md`, `01-shell-and-navigation.md`, and `06-design-system-and-copy.md` respectively.

Comprehension applies to every posture, including `trusted_local`. Even the builder is a novice the first time they open the product. The rule is "the first useful result must not assume domain knowledge of *this specific product*", not "design for a public consumer."

## Mapped obligations

Produce these typed artifacts in the implementation project under `00b-ux-contract/` (or the spine-appropriate location for non-product spines):

1. `consumer-model.yaml` — at minimum one **novice persona** and one **expert persona**. Each persona must have a `knows_on_entry` list (terms/concepts the persona understands without docs) and a `does_not_know` list (domain terms that must be aliased or explained on first use).
2. `first-run-path.md` — what the user sees in the first 30 seconds with **no provider configured** and **no input supplied**. Must name landing copy, the single primary action, and a "try with sample" or equivalent zero-config affordance. If the product genuinely cannot show a useful result without configuration or input, the file must record why and what the no-config landing screen does instead.
3. `copy-quality-bar.md` — reading-level target, **jargon ban list** (every internal/domain term that cannot appear unaliased on the product surface), and an **alt-copy table** mapping each banned term to consumer language.
4. `empty-blocked-loading-states.yaml` — for every state in the state model from `00-product-system-alignment.md`, the user-facing copy and the single primary action. One row per state.
5. `disclosure-plan.md` — what is shown by default, what is progressive, what is expert-only or behind settings. Defines how experts get back to power without forcing novices into it.
6. `ux-acceptance.yaml` — typed acceptance rows, each with a unique `ux_ac_id`, a target persona, and a measurable outcome. At least one row must bind to a time/effort budget for the novice persona (for example "novice reaches first useful result in ≤ N seconds without provider config or user-supplied input").

## Stable vs free

- Stable: the six artifact files exist as typed (yaml/markdown with named sections), contain real product-specific content, and are citable by file path + section/id from later phases through `ux_obligations`.
- Free: exact persona names, exact copy wording, exact disclosure mechanism, artifact directory name.

## Implementation scope

- Write the six artifacts above as small, structured files. Total length should be small enough to read in one sitting; the value is in being citable, not exhaustive.
- Do not implement any UI, do not write components, do not change blueprint or setup files.
- Treat `UI-IDENTITY.md` as the visual sibling: it covers visual identity, motion, density, layout. This phase covers comprehension, copy, persona, first-run, and progressive disclosure.

## Interfaces touched

UX contract artifact files only.

## State / runtime touched

None directly. Later phases consume the contract through their `ux_obligations` field.

## UX / DX / operator requirements

The artifacts must let a later phase author mechanically determine which obligations apply to that phase. If a phase cannot point to a specific `ux_ac_id` or to a section of `empty-blocked-loading-states.yaml`, the contract is too vague to use; repair the contract before proceeding.

## Required output (content-design)

- A novice persona exists with non-empty `knows_on_entry` and `does_not_know` lists.
- The jargon ban list names every domain term that appears in the product promise; every banned term has an alt-copy entry.
- `first-run-path.md` describes a useful result reachable without provider config or user-supplied input, or records why this is impossible and what the no-config landing does instead.
- `ux-acceptance.yaml` contains at least one novice-bound acceptance row with a measurable outcome and a unique `ux_ac_id`.

## Blocks (content-design)

- Long prose principles in place of typed artifacts.
- Personas restricted to expert/operator/researcher roles.
- A jargon ban list with no alt-copy mapping.
- A first-run path that requires provider config or user-supplied input without a recorded reason.
- Acceptance rows without a `ux_ac_id` or without a target persona.

## Required output (ux-ui-craft)

- `empty-blocked-loading-states.yaml` has one row per state in the state model from `00-product-system-alignment.md`.
- `disclosure-plan.md` names what is default, what is progressive, and what is expert-only with a recovery path for power users.

## Blocks (ux-ui-craft)

- States in the state model with no row in `empty-blocked-loading-states.yaml`.
- A disclosure plan that says only "progressive disclosure" without naming what is hidden vs default.
- Visual identity content (belongs in `UI-IDENTITY.md`) or component patterns (belong in `06-design-system-and-copy.md`).

## Required output (product-architect)

- The UX contract is consistent with the product promise, primary loops, and state model from `00-product-system-alignment.md`.
- The next phase (`01-shell-and-navigation.md`) has a non-empty list of `ux_obligations` it will need to honor.

## Blocks (product-architect)

- UX contract that contradicts the product promise or invents a new product.
- A spine in which no downstream phase has any consumer-facing surface, yet this phase was completed without recording that fact.

## Quality bar

Every later phase can declare a `ux_obligations` field whose entries point to specific files/sections/ids in this phase's artifacts. A phase that cannot find any obligation to cite means either the contract is incomplete or the phase has no consumer-facing surface; both cases must be recorded explicitly, not skipped silently.

## Do not ship

- Prose-only output without the six named artifact files.
- Personas that are only experts/operators.
- A first-run path that requires configuration or external dependencies without a recorded reason.
- A jargon ban list with no alt-copy mappings.
- Visual identity content, component patterns, or implementation code.
- Acceptance rows without `ux_ac_id` or without a target persona.

## Repair routing

- contract gap discovered in a later phase -> this phase
- visual identity gap -> `02-project-setup.md` `UI-IDENTITY.md`
- copy polish gap -> `06-design-system-and-copy.md`
- novice walkthrough finding in review -> this phase + `01-shell-and-navigation.md`

## Unlock condition

The six artifacts exist as typed files with real product-specific content, the novice persona is defined with `knows_on_entry` and `does_not_know` lists, the first-run path is reachable without configuration or input (or its impossibility is recorded), the jargon ban list has alt-copy mappings, and `ux-acceptance.yaml` has at least one novice-bound row with a `ux_ac_id`. Only then continue to shell/navigation.
