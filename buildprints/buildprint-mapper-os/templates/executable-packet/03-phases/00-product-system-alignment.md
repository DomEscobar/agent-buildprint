# Phase 00 — Product system alignment

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Turn the setup decisions into the Buildprint product-system map that all later phases implement: product promise, users, primary loops, feature map, state model, architecture boundaries, and quality bar. Do not reselect the stack and do not reduce this phase to folder creation.

## Mapped obligations

- Consume the `01-questions.md` decisions and `.buildprint/setup-receipt.md` setup artifacts.
- Keep artifact type, consumer, central loop, deployment posture, and forbidden shortcuts stable.
- Record the product promise in user/consumer language.
- Name user segments or consumer/operator personas at the level of one line each, enough to anchor the product promise; the full typed persona model (`knows_on_entry`, `does_not_know`, first-run path) lives in `00b-ux-contract.md` for UI-bearing spines and must not be duplicated here.
- Define primary loops, such as capture, generate, review, return, share/export, or artifact-type equivalents.
- Build the feature map around loops and first value, not source folders or pages.
- Define the state model for empty, loading, success, blocked/error, recovery, saved/readback, and exported/handed-off states where relevant. `00b-ux-contract.md` consumes this state model to write the per-state user-facing copy contract.
- Carry forward architecture boundaries from setup without reopening stack decisions.
- State the quality bar and do-not-ship failures that later phases must obey.
- Show missing providers, credentials, deployment controls, export/runtime dependencies, or destructive operations as honest blockers.

## Stable vs free

Stable: product promise, target consumers, primary loops, feature map, state model, setup-selected stack, architecture boundaries, product-craft floor, and blocker semantics from `02-project-setup.md`.

Free: wording and internal naming details if they do not weaken the product promise, hide a state, or make later phases harder.

## Implementation scope

Create or update the implementation-project alignment artifacts that phase 01 and phase 02 will use:

- product promise and consumer/persona summary;
- primary-loop map with trigger, goal, action, success, empty/loading/error states, data touched, views/commands involved, and verification path;
- feature map ordered by loop, dependency, and first value;
- state model with copy, primary action, recovery path, and test expectation for every important state;
- architecture-boundary summary tied to the setup receipt;
- phase quality bar and forbidden shortcuts.

## Build

Create concrete product-system decisions in the implementation project. If setup artifacts or the selected skeleton are missing, route that blocker to `02-project-setup.md` or repair the minimal missing artifact before continuing. A generic alignment essay, a page list, or a folder tree without loops/states is not valid completion.

## Interfaces touched

Product-loop documentation, feature map, domain boundary notes, route/view or command/API map, provider/integration boundary notes, persistence/readback expectations, and setup receipt references.

## State / runtime touched

State model, persisted-state expectations, provider/export/deployment blocked-state semantics, recovery paths, and verification paths for important states.

## UX / DX / operator requirements

For UI-bearing products: no UI without state, and no state without UI. Every important state needs copy, one primary action, a recovery path, and test coverage. For non-UI artifacts, every important command/API/operator state needs a documented action, recovery path, and check.

## Required output (product-architect)

- Product promise, users, primary loops, feature map, state model, architecture boundaries, and quality bar are explicit and mutually consistent.
- Architecture boundaries follow `02-project-setup.md` and `.buildprint/setup-receipt.md`.
- The first vertical slice path is obvious from the loop and feature map.

## Blocks (product-architect)

- Reopening setup debates without updating `02-project-setup.md` and `.buildprint/setup-receipt.md`.
- Page lists, source-folder mirrors, or feature inventories with no loop/state model.

## Required output (ux-ui-craft)

- UI-bearing products name a screenshot rejection rule at the product-system level (for example "no decorative hero before primary action", "no raw IDs on the product surface").
- Product-facing copy has no Buildprint/proof/phase/internal harness vocabulary.
- For UI-bearing spines, this phase explicitly hands off persona detail, first-run UX, per-state copy, jargon ban, and disclosure plan to `00b-ux-contract.md`; do not duplicate them here.

## Blocks (ux-ui-craft)

- Generic dashboard-first product shape.
- UI states without owned data/state transitions.
- Raw ids/debug strings or internal vocabulary on the product surface.
- Dead controls or placeholder workbench surfaces in the planned loop.
- Restating persona/first-run/copy detail that belongs in `00b-ux-contract.md`.

## Required output (integration-runtime)

- Provider, external service, runtime worker, export, API, webhook, MCP, CLI, or infrastructure boundaries are mapped to product loops and blocked/error states.
- Live, sandbox/test, and blocked modes are named where relevant.

## Blocks (integration-runtime)

- Provider or runtime dependency appears in a loop without blocker/error semantics.
- Fake success when credentials or runtime dependencies are missing.

## Required output (data-persistence)

- State model names what must persist, what can be transient, and how readback proves continuity.
- Import/export or handoff state is represented when promised.

## Blocks (data-persistence)

- In-memory state presented as durable.
- Missing saved/readback/recovery state for a promised return loop.

## Required output (security-boundary)

- Upload/file, secret, destructive-action, public/private exposure, tenant, and compliance boundaries are attached to loops and states where relevant.

## Blocks (security-boundary)

- Sensitive loop or state has no approval, denial, or recovery behavior.
- Public/private exposure claims without posture-required controls.

## Quality bar

Phase 01 and phase 02 can be implemented without guessing who the product serves, what the first loop is, which states exist, what features come first, or where the architecture boundaries sit.

## Do not ship

- Generic alignment prose with no product promise, users, loops, feature map, state model, or quality bar.
- A page list or source-folder mirror pretending to be product alignment.
- Skeleton-only completion.
- UI states without data/state ownership.
- Hidden provider/runtime/export/security blockers.
- New stack decisions that contradict setup.

## Repair routing

- setup contradiction -> `02-project-setup.md`
- unanswered product-defining question -> `01-questions.md`
- loop/state/feature-map gap -> this phase
- final-review defect -> `04-review.md`

## Unlock condition

The implementation has a concrete product promise, one-line consumer map, primary loops, feature map, state model, architecture boundaries, quality bar, and honest blockers. For UI-bearing spines, the next phase is `00b-ux-contract.md`; the persona, first-run, and copy artifacts live there, not here. Only then continue.
