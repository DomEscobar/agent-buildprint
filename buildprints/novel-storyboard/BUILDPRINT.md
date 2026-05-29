# BUILDPRINT: AI short-drama production canvas webapp

Claim status: `PROOF_REQUIRED`

## Product brief

- Product: AI short-drama production canvas workbench
- Primary outcome: A creator can turn an episode into a saved production board with script, plan, assets, storyboard images and video workbench state that survives reloads.
- Primary users: creators, producers and operators configuring AI media providers.
- Main surfaces: browser workbench, agent chat, API service, provider adapter, persistence, media artifact storage, deployment/runtime shell.
- What this packet must not become: a desktop-only clone, static graph mock, route inventory, provider fake counted as live media generation, or a source-framework prescription.

## Final product at a glance

**Golden path** - The user logs in, opens a project episode, sees a real interactive production canvas, uses the agent chat to shape script and storyboard data, generates or reviews assets and storyboard media, moves through the workbench toward video output, saves the board, and later returns to the same state with honest blocked-provider messages when credentials are absent.

**Surfaces**

- Production canvas board - create and manipulate the visual production flow - Phase 1
- Episode flow state - load, save and restore board data by project and episode - Phase 2
- Agent chat controller - drive board updates through chat, stop and XML events - Phase 3
- Media generation paneling - request, poll, select and fail asset/storyboard/video work - Phase 4
- Webapp runtime shell - run the authenticated browser app with API, socket, static frontend and durable data - Phase 5

**Done looks like**

- The board is an interactive canvas with nodes, edges, zoom, pan, drag, layout and responsive behavior, not static cards.
- A saved episode reloads with the same script, plan, assets, storyboard order and workbench data after backend restart.
- Agent chat can update board data through streamed/parsed events and can stop or report errors without corrupting state.
- Provider credentials absence produces blocked states and fake-provider tests, not fake success.

## Required read order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. `03-phases/phase-flow.md`
7. required `06-contracts/<role>.md` files for the active phase only
8. active phase file only
9. `04-evaluation.md`
10. `05-evidence/evidence-ledger.jsonl`

Do not inventory all Markdown files before following this read order. `blueprint.yaml` is the machine-readable mirror; this file owns the human execution route.

## Project setup gate

Before coding, answer or default `01-questions.md`, then use `02-project-setup.md` to create the downstream project root/local `AGENTS.md`. The downstream `AGENTS.md` is a scope governor, not a product brain. Missing ordinary preferences should be defaulted with AI best judgment. Missing credentials block only live provider proof.

## Implementation loop

For each phase:

1. Read `03-phases/phase-flow.md`.
2. Read the active phase named in `03-phases/phase-index.yaml`.
3. Read only the role contracts listed for that active phase.
4. Implement the smallest complete vertical outcome for that phase.
5. Run the phase proof gate.
6. Record command output or artifact paths in `.buildprint/evidence/evidence-ledger.jsonl`.
7. If proof fails, repair the current phase before advancing.

## Completion semantics

Bounded proof is not product completion. A passing phase verdict proves only the named phase gate under the recorded environment, input data and artifacts. Returns, reviews, screenshots, summaries and handoffs are not evidence by themselves. Every pass verdict requires rerunnable command output or an existing artifact path. Do not claim `validated`, `complete`, `production-ready` or `end-to-end` unless `04-evaluation.md` promotion gates pass and evidence rows exist for the required proofs.

## Repair routing

- Test, build, runtime, UI or proof failure: return to the current phase.
- Architecture contradiction: return to `02-project-setup.md`.
- Missing human preference: return to `01-questions.md` only if the choice is irreversible, expensive, credentialed, destructive or product-defining.
- Missing dependency phase: run the required prior phase.
- External provider or credential blocker: record the blocker in `.buildprint/evidence/evidence-ledger.jsonl` and continue with fake-provider contract proof where safe.
