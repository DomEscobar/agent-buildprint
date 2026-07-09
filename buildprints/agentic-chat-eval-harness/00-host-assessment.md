# 00 - Host Assessment

Write `.buildprint/host-assessment.md` before editing source files.

## Baseline commands

Identify and run the host's normal validation commands before implementation:

- install/status command if dependencies are missing
- typecheck
- lint
- unit tests
- integration tests
- build
- existing eval/e2e commands

Record failures as baseline failures. Do not hide them as capability failures unless your edits caused them.

## Chat runtime assessment

Find and document:

- chat runtime entrypoint
- conversation loop shape
- streaming path
- provider/model adapter
- retry/fallback behavior
- transcript/message storage
- run/session identifiers
- error and blocked-state behavior

Stop if the runtime cannot be called from a test, script, or local harness.

## Tool/action assessment

Find and document:

- tool registry or MCP surface
- action executor
- side-effect services
- safe mock/sandbox mode
- idempotency behavior
- audit/receipt behavior
- forbidden/destructive tools

Stop if destructive tools cannot be blocked, mocked, or sandboxed.

## Trace and observability assessment

Find and document:

- existing trace/span system
- model call logging
- tool call logging
- state/memory diff visibility
- retrieval event visibility
- UI/e2e artifacts
- observability backends and privacy constraints

If trace hooks are missing, classify whether they can be patched locally or must block runtime proof.

## Harness-runtime assessment

When the host uses a stateful harness (Tau-style or equivalent), find and document:

- provider-neutral event stream or mappable host events
- steering and follow-up queue semantics
- single-runner invariant enforcement
- cancellation token and repair path for dangling tool calls
- append-only session event log and replay path

If harness events are missing, mark `harness-runtime` profile blocked or not-proven.

## Security-governance assessment

Find and document:

- action screening or guardrail pipeline
- trust-zone or context-source labeling
- HITL approval gate for side effects
- capability grant / least-privilege runtime
- budget policy engine and loop breaker
- existing adversarial or injection test cases

If governance hooks are missing, mark `security-governance` profile blocked or not-proven.

## Scenario and ownership assessment

Find and document:

- production-critical chat flows
- known failure modes
- existing test fixtures
- expected tool/action outcomes
- expected state/memory outcomes
- acceptable latency/cost ceiling
- scenario owner or reviewer

Stop if no meaningful flow can be selected for a first scenario.

## Optional RAG assessment

Find and document:

- retrieval service
- citation/evidence model
- document/chunk store
- permission boundary
- stale/delete behavior
- existing RAG evals

If RAG exists but cannot expose retrieved context, citations, and deny-path behavior, mark the RAG profile blocked or not-proven.
