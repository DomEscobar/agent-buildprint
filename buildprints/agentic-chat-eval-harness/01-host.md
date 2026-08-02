# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

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


## Integration plan

# 01 - Integration Plan

Write `.buildprint/capability-plan.md`, `.buildprint/agentic-chat-eval-plan.md`, and `.buildprint/agentic-chat-eval-safety-plan.md` before source edits.

## Capability plan

The plan must name:

- host chat runtime entrypoint
- test runner and regression command
- scenario directory and schema format
- trace/span export format
- receipt output path
- enabled profiles
- disabled/not-proven profiles
- provider/model usage
- observability backend or local-only trace policy
- CI integration path

## Eval harness plan

The harness plan must define:

- `Scenario` fields
- `TraceSpan` fields
- `EvalRun` fields
- `ScoreResult` fields
- `EvalArchiveEvent` fields
- `FailureRecord` fields
- `ConsoleConfig` fields
- `Receipt` fields
- core runner command
- simulated user or recorded-turn strategy
- deterministic scorer registry
- model-judge scorer policy
- fixture versioning strategy
- artifact retention strategy
- eval archive directory and last-green baseline policy
- console host path and evidence directory

## Safety plan

The safety plan must define:

- safe tool/action mode
- blocked/destructive tool list
- mock/sandbox strategy
- external provider privacy policy
- private transcript handling
- private RAG evidence handling
- cost/latency ceilings
- flake handling and retry policy
- claim ceiling when proof is unavailable

## Profile plan

For each enabled profile, define at least one scenario:

- `core-chat`: multi-turn task or blocked-state flow
- `tool-actions`: tool selection plus side-effect proof
- `memory-state`: memory/state write or no-write proof
- `provider-routing`: fallback/retry/degraded-mode proof
- `ui-proof`: streaming/action/error/blocked proof
- `rag`: allow/deny/citation/weak-evidence proof
- `harness-runtime`: cancellation, steering, dangling-tool repair, session replay proof
- `security-governance`: injection regression, HITL, capability grant, budget/loop-breaker proof

Profiles can be marked `not-proven` when the host lacks the surface. Do not silently skip requested profiles. Cross-reference `references/runtime-techniques-basis.md` when selecting scenario families for each enabled profile.

## Assessment Reconciliation

The plan must reconcile with `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking.

## Scope control

Keep the first implementation small but real:

- one runner command
- one trace schema
- one receipt schema
- one eval archive (JSONL or SQLite)
- one core-chat scenario
- one tool-action scenario when tools exist
- one blocked/error scenario
- CLI + local Eval Operator Console after core runner proven
- optional RAG/UI profiles only when proof surfaces exist

Do not build a hosted benchmark service or new agent runtime until the core proof passes. The local Eval Operator Console is required for `runtime` proof — not optional.


## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply Protocol

## Objective

Install the Agentic Chat Eval Harness through a strict, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Reconcile profiles against `references/runtime-techniques-basis.md`.
8. Write `.buildprint/agentic-chat-eval-receipt.md`.
9. Mirror or link the final receipt at `.buildprint/capability-receipt.md` for generic Capability Buildprint tooling.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/agentic-chat-eval-plan.md
.buildprint/agentic-chat-eval-safety-plan.md
.buildprint/agentic-chat-eval-receipt.md
.buildprint/capability-receipt.md
.buildprint/eval-archive/
.buildprint/eval-console-evidence/
```

## Implementation rule

Keep the harness bounded. Do not rewrite the chat runtime, replace the provider router, create a new product UI, or rebuild the RAG stack unless the plan says that scope is required and approved.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes production-critical flows, tool side-effect policy, sandbox mode, model-judge privacy, RAG privacy, destructive operation policy, or CI cost ceiling, stop and ask before source edits.

## Integration path discovery

The harness ships self-contained by default. The list of proposed 3rd-party integration paths is in `capability.yaml` under `proposed_integration_paths`. Discovery questions for each path are in `00-assessment-questions.md` under "3rd Party Integration Discovery". After host assessment and before integration plan, the applying agent must:

- read the proposed paths and decision questions
- ask the discovery questions relevant to this host
- record the decision in `.buildprint/capability-plan.md` under "Integration Path Decision"
- keep the default `deferred` if no path answers are confirmed
- if a path is adopted, document the adapter boundary and update the receipt schema to record adapter presence/absence/version

Any adopted path must run behind the deterministic gates in `verify.runtime_checks`. Model-judge scores may never override security, side-effect, or proof gates.

## Safety rule

The harness is safe-by-default:

- destructive tools: blocked, mocked, or sandboxed
- external judges: disabled until approved
- private transcripts: local-only unless approved
- RAG private documents: local-only unless approved
- model-only scores: claim ceiling unless supported by deterministic artifacts
- missing trace: blocked or downgraded

## Phase order

1. Contract and config
2. Runner and trace core
3. Host wiring and adapters
4. Scorers, profiles, and operator surface (CLI + JSON)
5. Interactive Eval Operator Console
6. Verification, regression, and receipt

Each phase must leave the repo in a buildable or honestly blocked state. If a phase cannot be completed, write the blocker to `.buildprint/agentic-chat-eval-receipt.md` and `.buildprint/capability-receipt.md`, then stop.

## Implementation rules

- Prefer host conventions over new frameworks.
- Use the existing test runner unless it cannot support scenario execution.
- Make scenarios versioned and deterministic where possible.
- Collect trace spans before scoring.
- Separate deterministic scorers from model-judge scorers.
- Treat model-judge scores as advisory unless calibrated with examples and bounded by deterministic gates.
- Do not execute production side effects.
- Do not claim RAG or UI coverage unless the relevant profile artifacts exist.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement while a hard-stop decision is unresolved.
- Do not score only final assistant text.
- Do not let a model judge overrule a failed deterministic gate.
- Do not hide missing trace, flaky scenarios, or unsafe tools behind a success claim.
- Do not over-broaden the task into an agent runtime rebuild.


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
