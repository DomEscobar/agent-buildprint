# Project Setup

## Setup defaults

- Blueprint mode: `product`
- Phase style: `outcome_flow`
- Claim status: `PROOF_REQUIRED`
- Primary selected scope: browser webapp preserving the production Canvas board.
- Default implementation posture: production-grade selected scope with durable persistence, authenticated API/socket boundary, provider configuration contracts, fake-provider tests, browser proof and honest live-provider blockers.

## Product / capability shape

Build an AI short-drama production canvas workbench. The product must let a creator select an episode, view and manipulate a visual production board, use an agent chat to update board data, generate or track storyboard/assets/video work, and persist the board across reloads.

The selected scope is UI-bearing, stateful, provider-backed, agent-driven and runtime-heavy. A static UI shell, route-only API, deterministic provider adapter, in-memory board store or single-screen demo is a no-fake failure.

## Architecture decisions

- Use a browser-first webapp architecture with a real client, API service, socket channel, durable database, media/object storage path and provider adapter boundary.
- The Canvas board is a domain surface, not decoration. It needs explicit graph state, node components, edge topology and interaction controls.
- The agent loop is a bounded automation runtime. It needs a task loop, stop behavior, trace/evidence, XML/event parsing and state mutation rules.
- Provider adapters must split fake-provider tests from live provider proof. Missing credentials must produce blocked states.
- The implementation may choose stack/frameworks unless user answers otherwise. Do not blindly copy the source stack as a requirement.

## Production readiness contract

- Auth/session: login must protect API and socket; default credentials must be setup-only or forced to rotate.
- Persistence: project/episode flow data, storyboard order, media generation state and provider config survive restart.
- Runtime: API, socket and browser app start through one documented command or compose profile.
- Observability: agent events, provider calls, polling failures and persistence errors are inspectable in logs and test artifacts.
- Security: provider secrets are never logged, copied into Buildprint files or exposed to browser code.
- Deployment: browser app can be served as a webapp with durable data volume and health/readiness checks.

## Experience quality contract

- Canvas must support visible nodes and edges, zoom, pan, drag, auto layout, empty/loading/error states and responsive behavior.
- Right chat panel must be resizable, stoppable and disconnected/error aware.
- Storyboard/assets/workbench states must show pending, success and failure states without fake success.
- Browser proof must include desktop and mobile/narrow viewport screenshots or traces.
- Text must remain readable and not overlap controls in the dense production UI.

## Mapped contract anchors

- Source app overview: Toonflow-app `README.md:108-123`.
- Webapp/runtime split: Toonflow-app `README.md:465-481`, `README.md:605-608`.
- Canvas board: Toonflow-web `src/views/production/index.vue:1-85`.
- Canvas topology: Toonflow-web `src/views/production/utils/flowBuilder.ts:4-75`, `:92-260`.
- Flow load/save: Toonflow-app `src/routes/production/getFlowData.ts:9-156`, `src/routes/production/saveFlowData.ts:9-63`.
- Agent socket: Toonflow-app `src/socket/routes/productionAgent.ts:21-99`.
- Agent tool surface: Toonflow-app `src/agents/productionAgent/tools.ts:45-209`.
- Persistence: Toonflow-app `src/utils/db.ts:15-35`, `src/lib/initDB.ts:15-183`.

## Mapped obligation/surface matrix

| Surface name | Mapped obligation | Owning phase | Readiness | Source anchors | First proof |
|---|---|---|---|---|---|
| Production canvas board | Render and operate the graph board with nodes, edges, zoom, pan, drag and layout. | Phase 1 | INCLUDED_NEEDS_PROOF | Toonflow-web `index.vue:1-196`, `flowBuilder.ts:4-260` | Browser interaction trace and visual screenshots. |
| Episode flow state | Load, save and restore episode-scoped board data and storyboard order. | Phase 2 | INCLUDED_NEEDS_PROOF | Toonflow-app `getFlowData.ts:9-156`, `saveFlowData.ts:9-63` | API and restart persistence test. |
| Agent chat controller | Send/stop chat, parse XML/event updates, mutate board data and record traces. | Phase 3 | INCLUDED_NEEDS_PROOF | Toonflow-web `productionAgent.ts:42-113`, Toonflow-app `productionAgent.ts:21-99` | Socket/agent integration test with fake model stream. |
| Media generation paneling | Generate/poll/select/fail storyboard, asset and video work through provider boundary. | Phase 4 | INCLUDED_RISKY_REQUIRES_HARDENING | Toonflow-web `productionAgent.ts:214-400`, Toonflow-app `tools.ts:159-209` | Fake-provider pending/success/failure tests; live blocker row. |
| Webapp runtime shell | Run authenticated API/socket/static frontend with durable data and deploy proof. | Phase 5 | INCLUDED_RISKY_REQUIRES_HARDENING | Toonflow-app `app.ts:45-144`, README `283-301`, `465-481` | Build/start/login/browser/Docker smoke proof. |

## Implementation project setup

Create a downstream project with:

- `AGENTS.md` as scope governor referencing this packet and forbidding static Canvas mocks, in-memory persistence and fake provider success.
- `.buildprint/evidence/evidence-ledger.jsonl` as runtime proof target.
- Real client/app, API service, socket runtime, database migrations/schema, provider interfaces, fake-provider harness and e2e browser tests.
- Seed data or fixtures sufficient to show an episode board without relying on live providers.

## Foundation scaffold gate

Before starting Phase 1, the downstream project must have:

- A buildable app skeleton with client, API, socket and database boundaries.
- Test runner and browser e2e runner configured.
- Evidence ledger path created.
- Provider interface and fake-provider test harness defined.
- Auth/session approach decided or safely defaulted.

If any foundation item is missing, stop and repair setup before coding phase behavior.
