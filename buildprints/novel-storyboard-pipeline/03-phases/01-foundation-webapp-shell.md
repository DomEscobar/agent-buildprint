# Phase 01 - Foundation Webapp Shell

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md`, and these role contracts only: `06-contracts/product-architect.md`, `06-contracts/ux-ui-craft.md`, `06-contracts/security-boundary.md`, `06-contracts/data-persistence.md`, `06-contracts/test-and-verification.md`.

Execute through `phase-flow.md`. Do not append runtime evidence until phase-flow plan, team-gates, handoff, return, review, and proof artifacts exist.

requires_roles: product-architect, ux-ui-craft, security-boundary, data-persistence, test-and-verification

## Product outcome

Create the real webapp foundation for Toonflow's creative production workspace: authenticated shell, app navigation, base backend, durable persistence setup, media storage boundary, provider config boundary, and a Canvas-ready workspace route. The first screen after login must already signal the product as a creative Canvas workstation, not a settings form or dashboard clone.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- lens: product outcome flow
- mode obligation: establish the user journey from secure entry to project workspace and Canvas launch.
- shared proof spine: preconditions, entrypoint, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals must be covered.

## Interfaces touched

- Web routes: login, first-run admin setup, project list, create/open project, Canvas workspace placeholder.
- API routes: session/auth, current user, project CRUD minimum, health/readiness, provider-config metadata, media URL signing or serving policy.
- Internal interfaces: auth service, project service, persistence repositories, media storage service, provider registry interface.

## State/runtime touched

- Users/sessions.
- Projects with name, type, intro, art style, video ratio, text/image/video model selections.
- Provider config records storing metadata and encrypted/isolated secret references.
- Media storage root/bucket metadata.
- Migration state.

## UX/UI or consumer-experience requirements

- Product-grade visual quality gate applies.
- UI-bearing proof must include desktop and mobile screenshots.
- The shell must support a Canvas-first information architecture: left project/navigation rail, central Canvas/workspace region, right inspector/settings region when relevant.
- Generic forms, default controls, raw text lists, or admin-dashboard cards cannot claim the Toonflow UX.
- Empty states must invite creating/opening a project and configuring providers without blocking the user from seeing the Canvas workbench shape.

## Safety/security constraints

- Do not preserve default `admin/admin123` as production credentials.
- No secret values in frontend state, logs, screenshots, or evidence.
- Auth must block API access without a valid session/token.
- Public posture requires first-run admin creation or equivalent secure bootstrap.

## Proof gate

- Typecheck/build passes.
- Unit tests cover auth bootstrap, project creation, provider config validation, and unauthorized API rejection.
- Persistence migration test creates and reloads user/project/provider records.
- Browser e2e proves login/bootstrap -> project create -> open Canvas route.
- Screenshot review proves non-generic Canvas-ready visual system on desktop and mobile.

## Implementation loop

1. Complete Foundation scaffold gate from `02-project-setup.md`.
2. Implement auth and persistence base.
3. Implement project shell and Canvas-ready route.
4. Implement provider config boundary without live secrets exposure.
5. Run tests, browser proof, screenshot review.
6. Record phase artifacts and runtime evidence.

## Repair routing

- Auth failure: security-boundary.
- Persistence failure: data-persistence.
- Generic UI or weak Canvas signal: ux-ui-craft.
- Boundary collapse or flat architecture: product-architect.
- Missing tests or unverifiable claims: test-and-verification.

## Non-goals

- Full ScriptAgent generation.
- Full Canvas node editing.
- Live provider calls.
- Video generation/export.
