# Phase 03 - Canvas Production Workbench

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md`, and these role contracts only: `06-contracts/product-architect.md`, `06-contracts/ux-ui-craft.md`, `06-contracts/data-persistence.md`, `06-contracts/test-and-verification.md`.

Execute through `phase-flow.md`. Do not append runtime evidence until phase-flow plan, team-gates, handoff, return, review, and proof artifacts exist.

requires_roles: product-architect, ux-ui-craft, data-persistence, test-and-verification

## Product outcome

Implement the core infinite Canvas production workbench. Users can organize scripts, character/scene/tool assets, derived assets, storyboard panels, media thumbnails, and video nodes spatially; zoom/pan; drag nodes; inspect/edit items; associate assets with storyboards; persist layout; and resume work without losing the flow.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- lens: product outcome flow
- mode obligation: preserve Toonflow's Canvas-centered production experience rather than reducing it to CRUD screens.
- shared proof spine: preconditions, entrypoint, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals must be covered.

## Interfaces touched

- Web components: Canvas surface, node renderer, minimap/zoom controls, node palette, asset/storyboard/video node types, inspector panel, generation status badges, link/association controls.
- API routes: get/update flow data, save Canvas layout, asset CRUD, derived asset CRUD, storyboard CRUD, asset-storyboard association.
- Internal services: flow composition service, Canvas layout service, asset service, storyboard service, media URL service.

## State/runtime touched

- Canvas graph: node ids, node types, positions, dimensions, links/associations, selection, viewport.
- Asset records: role, scene, tool, clip; prompt, description, generated media, derived children.
- Storyboard records: index, duration, prompt, video description, associated asset ids, image state, error reason.
- Workbench data and project-scoped media references.

## UX/UI or consumer-experience requirements

- Product-grade visual quality gate is strict for this phase.
- Canvas must support zoom, pan, drag, selection, keyboard focus, node inspector, and responsive layout.
- Nodes must show meaningful media thumbnails, names, prompts/descriptions, status, and relationship cues.
- Storyboard sequence must be readable on the Canvas and in an ordered lane/list without replacing Canvas behavior.
- Empty Canvas must provide structured starter zones for script, assets, storyboard, and video flow.
- Forbidden: generic forms as primary UI, default browser controls as finished controls, raw JSON/text list substitutes, local-MVP screenshots, overlapping text, and unpolished one-hue palettes.

## Safety/security constraints

- Media URLs must enforce project/user access.
- Deleting assets/storyboards must have reversible confirmation or soft-delete behavior unless explicitly scoped otherwise.
- Prompt text and generated media metadata must not leak across projects.

## Proof gate

- Component/unit tests cover Canvas state reducers and node operations.
- Integration tests prove save/reload layout and asset/storyboard association roundtrip.
- Browser e2e proves drag node -> edit inspector -> associate asset -> save -> reload -> layout and associations persist.
- Visual regression/screenshots cover desktop, tablet/mobile, empty state, populated state, error state, and dark/light or chosen theme if supported.
- Accessibility smoke covers keyboard selection, focus visibility, and labelled controls.

## Implementation loop

1. Implement Canvas domain model and persistence.
2. Implement visual Canvas system and node types.
3. Implement inspector and association workflows.
4. Implement save/reload and media URL handling.
5. Run browser and visual proof gates before advancing.

## Repair routing

- Canvas reduced to CRUD: product-architect and ux-ui-craft.
- Visual quality failure: ux-ui-craft.
- Lost layout or associations: data-persistence.
- Missing browser proof: test-and-verification.

## Non-goals

- Live provider image/video generation proof.
- Final video export.
