# Phase 02 - Multimodal Routing And Agent Tools

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, create handoff/return artifacts, collect reviews, verify, and record evidence only after proof.

You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary
  - ux-ui-craft

## Product outcome

Extend chat with source-mapped multimodal and agent controls: code prompt routing, image attach/paste/drop with vision routing, per-conversation system prompt, and capability-gated web_search/fetch_url tool steps with visible traces and safe failure behavior.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of configuring conversation behavior and seeing routing/tool decisions reflected in the chat surface.
- Shared proof spine: preconditions are Phase 01 chat runtime and durable messages; entrypoint is chat composer/system prompt/tool-capability path; execution validates images, saves system prompt, resolves model routing, performs or blocks safe tool calls, and persists metadata; state/artifact effects include image metadata, system prompt, tool trace, and routed model reason; observable proof is routing tests, injection-order tests, image validation/browser proof, tool allow/deny trace, and SSRF review; failure/recovery covers invalid image, unsupported vision model, tool timeout, denied URL/private address, and missing live model.

## Mapped product obligations

- Source path `src/lib/router.ts` implies code-like prompt detection and code-model routing.
- Source path `src/lib/chat/resolve-model.ts` implies vision-capable model selection and fallback behavior.
- Source path `src/components/chat.tsx` implies attach, drag/drop, paste, system prompt editing, and visible routing/tool states.
- Source paths `src/lib/tools/definitions.ts` and `src/lib/tools/executor.ts` imply web_search and fetch_url tool schemas, timeout/error capture, and traceability.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve the behavior contract through equivalent target behavior, not source route parity. Compatibility impact: code routing, vision routing, image metadata persistence, system prompt injection before memory/RAG/history, and tool-step trace visibility are required. Tools must be safer than source when needed: allowlist, timeout, SSRF/private-address denial, and live-web blocker rows are mandatory before claim upgrade.

## Implementation scope

Implement routing services, image validation/storage metadata, system prompt persistence/readback, context injection order tests, and structured tool loop support for deterministic safe fixtures. Real web search, external URL fetch, or live vision models may remain blocked if unavailable after local seams are proven.

## Interfaces touched

- UI/controller: image attach/paste/drop, system prompt editor, routed model label, tool trace panel, error/blocked states.
- API/application service: image metadata, system prompt update/readback, route resolution, tool-call execution path.
- Provider/tool contracts: model capability metadata, tool schemas, timeout/error mapping, URL safety.

## State/runtime touched

- Persistence: message image metadata, conversation system prompt, routed model reason, tool request/result/error events.
- Runtime: context builder order, model resolver, tool executor, URL/network safety boundary.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`. Screenshot critique is required before visual claims upgrade. Required states: image attached, invalid image rejected, vision unavailable, system prompt saved/readback, routed code model reason, tool pending/result/error/denied, keyboard/focus behavior, and mobile layout without clipped composer or trace text.

## Safety/security constraints

Do not fetch arbitrary URLs without SSRF/private-address checks and timeout. Tool calls must be structured and capability-gated; raw model text cannot execute. Uploaded images may contain private content and evidence must use synthetic fixtures or redacted metadata.

## Quality gates

- Routing unit tests for code prompts, image prompts, fallback model, and visible reason.
- Image validation tests for type/size/count and persistence metadata readback.
- System prompt save/readback and injection-order test.
- Tool allow/deny/timeout tests, including private-address or disallowed URL negative case.
- Browser/e2e or blocker proof for attach/paste/drop and visible tool trace.

## Proof gate

Proof id: proof-02-multimodal-routing-agent-tools
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

Required runtime evidence row must use `phase_id: 02-multimodal-routing-agent-tools`.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, repair in this phase unless the issue is missing Phase 01 runtime, setup contradiction, or human decision about enabling real web access.
