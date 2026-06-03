# Phase 00b - UX contract

requires_roles: [content-design, ux-ui-craft, product-architect]

## Product intention

Lock the consumer-comprehension contract for the MiroFish-style graph-backed swarm workbench before any shell or feature code is written. This phase produces typed, citable artifacts that later phases consume through a `ux_obligations` field. It does not implement UI; it makes UI implementation answerable.

Comprehension applies even though the deployment posture is `trusted_local`. The first time the builder, an exploration operator, or a fresh reviewer opens the app, they have not yet read the source repo, do not yet know what "ontology generation" means in this product, do not have an LLM provider configured, and may have no seed material. The product must still be legible.

## Mapped obligations

Produce these typed artifacts in the implementation project under `00b-ux-contract/`:

1. `consumer-model.yaml` - at minimum:
   - a **novice persona** with `knows_on_entry: [graphs are nodes and edges, file upload, basic AI chat]` and `does_not_know: [ontology, graph memory, swarm simulation, OASIS, agent interview, graph adapter, base URL, API key, provider label]`;
   - an **exploration operator persona** (as already named in product-system alignment) with their stronger entry knowledge;
   - a **simulation researcher persona** with deep expert knowledge.
2. `first-run-path.md` - what the user sees in the first 30 seconds with no LLM provider configured and no seed material supplied. Must name:
   - landing copy that explains what this product does in plain language (no "ontology", no "graph memory", no "OASIS");
   - the single primary action visible without scrolling;
   - a "try with sample" affordance that walks the novice through a small built-in seed (a short paragraph of public-domain text) and a precomputed example graph so the user can see the canvas, inspect a node, and read a sample report before configuring anything;
   - the explicit handoff point at which the user is asked to bring their own seed material or configure their own provider.
3. `copy-quality-bar.md` - reading-level target plus a **jargon ban list** with the alt-copy mapping. At minimum the following domain terms must appear with their consumer alt-copy on the product surface:

   | Internal term | Consumer alt-copy |
   |---|---|
   | ontology / ontology generation | "find the topics and how they relate" |
   | graph memory / graph adapter | "knowledge map" |
   | swarm simulation / OASIS | "simulated audience" |
   | agent interview | "ask the simulated audience" |
   | base URL / API key / provider label | grouped as "AI provider setup" with field-level help |
   | graph entity | "topic" or "person" depending on context |
   | report sections | "report" with a contents/jump menu |
   | interaction history | "previous questions" |

   The table is the contract; phase 02 and phase 06 may not use the internal term on a label without its alt-copy on the same surface.
4. `empty-blocked-loading-states.yaml` - one row per state in the state model from `00-product-system-alignment.md`:
   - `empty.no-project` (landing, no project), `empty.no-seed` (project exists, no upload), `loading.extraction`, `loading.ontology`, `loading.graph-build`, `loading.simulation`, `loading.report`, `ready.graph-canvas`, `ready.simulation-traces`, `ready.report`, `blocked.missing-llm`, `blocked.missing-graph-backend`, `blocked.missing-oasis`, `error.parse-failure`, `error.graph-build-failure`, `error.provider-error`.
   - each row carries: user-visible copy (no jargon without alt-copy), single primary action, recovery path.
5. `disclosure-plan.md` - what is default, what is progressive, what is expert-only:
   - **default**: landing with "what this does", "try with sample", upload + question entry, canvas inspection, report read, ask-a-question;
   - **progressive**: AI provider setup (only required when the user moves beyond the sample), simulation tuning, advanced graph filters, report regeneration with new prompt;
   - **expert-only**: graph backend switching, raw graph data dump, provider base URL/model overrides, OASIS runtime configuration, evidence/diagnostic panels.
6. `ux-acceptance.yaml` - typed acceptance rows. Required novice rows:
   - `NOVICE-FIRST-RESULT-60S`: a novice with no LLM credentials and no seed material reaches an inspectable graph canvas and a sample report within 60 seconds of first launch using the "try with sample" affordance.
   - `NOVICE-NO-JARGON-FIRST-SCREEN`: every visible label on the landing and "try with sample" screens either avoids the jargon ban list or shows the alt-copy from `copy-quality-bar.md` inline.
   - `NOVICE-CANVAS-DISCOVERABLE`: a novice can click a node, see a plain-language detail panel, and understand what the node represents without consulting docs.
   - `NOVICE-BLOCKED-PROVIDER-LEGIBLE`: when LLM credentials are missing, the blocked state copy matches `empty-blocked-loading-states.yaml#blocked.missing-llm` and tells the user, in product language, what to do and that the sample path still works.

## Stable vs free

- Stable: the six artifact files exist as typed/structured files, the novice persona is non-empty, the jargon ban list contains the eight rows above, and a "try with sample" affordance is part of the first-run path. The four novice acceptance rows above are required.
- Free: exact landing copy, exact sample content (any short public-domain text is acceptable), exact disclosure mechanism, artifact filenames if they remain citable.

## Implementation scope

- Write the six artifact files with real product-specific content.
- Do not implement any UI, do not modify the skeleton, do not change setup files.
- `UI-IDENTITY.md` remains the visual sibling; do not duplicate its visual rules here.

## Interfaces touched

UX contract artifact files only.

## State / runtime touched

None directly. Later phases consume the contract through their `ux_obligations` field.

## UX / DX / operator requirements

A later-phase author must be able to point at a specific file/section/`ux_ac_id` in `00b-ux-contract/` and use it as a contract; if any phase cannot, the contract is too vague and must be repaired in this phase before continuing.

## Required output (content-design)

- Novice persona present with non-empty `knows_on_entry` and `does_not_know` lists.
- The eight jargon rows above are present with alt-copy.
- `first-run-path.md` names a "try with sample" path reachable without provider config or user-supplied seed.
- The four novice acceptance rows above exist in `ux-acceptance.yaml`.

## Blocks (content-design)

- Persona list that contains only operator/researcher/builder.
- Jargon ban list with no alt-copy column.
- First-run path that requires the user to configure an LLM provider or supply seed material before reaching any useful screen.
- Acceptance rows without a `ux_ac_id`.

## Required output (ux-ui-craft)

- `empty-blocked-loading-states.yaml` covers every state listed in `00-product-system-alignment.md` state model, including `blocked.missing-llm`, `blocked.missing-graph-backend`, `blocked.missing-oasis`.
- `disclosure-plan.md` keeps AI provider setup, simulation tuning, and graph backend choice off the default surface for novices and names the recovery path for experts.

## Blocks (ux-ui-craft)

- States in the state model with no row in `empty-blocked-loading-states.yaml`.
- Default surface that exposes provider/base URL/API key as a precondition.
- Visual identity content (belongs in `UI-IDENTITY.md`).

## Required output (product-architect)

- The UX contract is consistent with the product promise, primary loops, and state model from `00-product-system-alignment.md`.
- `01-shell-and-navigation.md`, `02-core-loop-first.md`, `03-feature-slices.md`, and `06-design-system-and-copy.md` have a non-empty list of `ux_obligations` they will need to honor.

## Blocks (product-architect)

- UX contract that contradicts the "every clickable thing must work or show an honest blocked state" rule from `BUILDPRINT.md`.
- A "try with sample" path that calls a real LLM provider behind the scenes; it must be a precomputed offline sample.

## Quality bar

A reviewer who has never seen this product can read `00b-ux-contract/` in five minutes and predict, without consulting any other phase file, what the first screen of the workbench should look like, what the landing copy says, what happens when they click "try with sample", and what they will see if they remove the LLM provider config.

## Do not ship

- Prose principles in place of typed artifacts.
- Personas that are only experts.
- A first-run path that requires LLM credentials or user-supplied seed material without a recorded reason.
- A jargon ban list with no alt-copy mappings.
- A "try with sample" path that secretly calls a real provider.
- Visual identity content or component patterns (belong in `UI-IDENTITY.md` and `06-design-system-and-copy.md`).

## Repair routing

- contract gap discovered in a later phase -> this phase
- visual identity gap -> `02-project-setup.md` `UI-IDENTITY.md`
- copy polish gap -> `06-design-system-and-copy.md`
- novice walkthrough finding in review -> this phase + `01-shell-and-navigation.md`

## Unlock condition

The six artifact files exist with the novice persona, eight jargon rows, four novice acceptance rows, every state-model row, and a reachable "try with sample" first-run path. Only then continue to `01-shell-and-navigation.md`.
