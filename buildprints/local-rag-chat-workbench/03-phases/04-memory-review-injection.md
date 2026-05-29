# Phase 04 - Memory Review And Injection

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md` with required role handoffs/returns, reviews, proof, and scoped evidence rows.

You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary
  - ux-ui-craft
  - test-and-verification

## Product outcome

Deliver persistent memory behavior: conservative automatic capture after completed turns, dedupe/supersede, global/conversation memory selection, token-budgeted injection before RAG, use-count updates, and a memory center for search/add/archive/promote/delete/clear with confirmation.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of reviewing and controlling what the chat remembers while the runtime uses relevant memory transparently.
- Shared proof spine: preconditions are chat runtime and context builder; entrypoint is completed chat turn and memory center UI/API; execution classifies candidate memories, persists/dedupes/supersedes, ranks by relevance/recency/scope, injects before RAG within budget, updates use counts, and exposes CRUD/review controls; state/artifact effects include memory records, source tags, archived/global/conversation scope, and use counters; observable proof is capture/dedupe/injection-order tests, persistence readback, browser memory actions, and privacy review; failure/recovery covers classifier failure, invalid manual memory, clear-all confirmation, and non-fatal capture errors.

## Mapped product obligations

- Source path `src/lib/memory/index.ts` implies capture, classify, dedupe, select, mark-used, and context injection.
- Source path `src/app/api/chat/route.ts` implies post-turn capture and memory usage during chat.
- Source path `src/components/memory-center.tsx` implies search, add, archive/delete, promote to global, clear all, and visible states.
- Source schema model MemoryItem implies durable scope/status/source/use-count storage.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve memory through equivalent target behavior as user-controllable local state, not hidden prompt stuffing. Compatibility impact: automatic capture must be conservative and non-fatal, and injection order must be system prompt, memory, RAG, history unless the implementation documents an equivalent safer order.

## Implementation scope

Implement memory repository/schema, capture classifier or deterministic local rule with provider seam, dedupe/supersede, selection/ranking, token budgeting, context builder integration, memory center UI/API, and tests.

## Interfaces touched

- UI/controller: memory center search/filter/add/archive/promote/delete/clear, used-memory indicators in chat.
- API/application service: memory CRUD, capture, selection, mark-used, clear-all.
- Runtime contracts: context builder ordering, token budget, non-fatal capture hook.

## State/runtime touched

- Persistence: MemoryItem records, scope, status, tags/source, use counts, timestamps, archived/deleted states.
- Runtime: post-turn capture, context assembly, budget enforcement, privacy-safe logging.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`. Screenshot critique is required before visual claims upgrade. Required states: empty memory, search results, manual add validation, archived/deleted state, promote to global, clear-all confirmation, used-memory trace in chat, privacy warning/blocked state, mobile layout without clipped controls.

## Safety/security constraints

Memory can contain sensitive user data. Keep local by default, avoid evidence content leakage, require confirmation for clear/delete, and expose privacy boundaries before any external provider capture/classification.

## Quality gates

- Capture classifier tests for preference/fact/decision and rejection cases.
- Dedupe/supersede tests.
- Injection-order and token-budget tests.
- Use-count/readback persistence tests.
- Browser/e2e or blocker proof for memory center actions and destructive confirmation.

## Proof gate

Proof id: proof-04-memory-review-injection
Required proof types:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: 04-memory-review-injection`.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, repair in this phase unless the issue belongs to Phase 01 chat persistence, Phase 03 RAG injection conflict, or setup/security contradiction.
