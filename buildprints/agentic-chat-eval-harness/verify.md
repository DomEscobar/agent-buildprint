# Verify

Verification must prove scenario execution, trace capture, deterministic scoring, optional profile behavior, regression command wiring, and honest claim status.

## Required proof

Record proof in `.buildprint/agentic-chat-eval-receipt.md`.

Also mirror or link the final proof at `.buildprint/capability-receipt.md` so generic Capability Buildprint tooling can find the receipt.

## Required command checks

Run available host checks:

- tests
- lint
- typecheck
- build
- eval harness regression command
- UI/e2e command when `ui-proof` is enabled
- RAG eval command when `rag` is enabled

If a command does not exist, record that in `.buildprint/agentic-chat-eval-receipt.md`.

If a baseline command failed before implementation, the receipt must say whether the failure was fixed, unrelated but still a claim ceiling, or blocking. Do not treat later scenario success as proof if the selected runtime, tool, trace, or scorer layer remains invalid.

## Required structural checks

Confirm:

- scenario schema exists and is versioned
- trace/span schema exists or maps to host tracing
- scenario runner exists
- host chat runtime adapter exists
- simulated user or recorded-turn adapter exists
- tool/action adapter exists when tools are in scope
- scorer registry separates deterministic scorers from model-judge scorers
- receipt writer exists
- regression command exists
- optional RAG profile is either implemented with fixtures or marked not-proven/blocked
- optional UI profile is either implemented with proof artifacts or marked not-proven/blocked

## Required runtime checks

At `fixture` proof or higher:

- one core-chat scenario runs end-to-end
- trace spans are written for user turn, model call, final response, and scoring
- failing expected outcome produces a failing score
- receipt records scenario version, command, artifacts, and claim status

At `runtime` proof or higher:

- one tool-action scenario proves expected tool selection and arguments
- one tool-action scenario proves expected side effect or safe mocked side effect
- one blocked/error scenario proves recovery or honest stop
- memory/state scenario records state diff when memory/state is in scope
- provider-routing scenario records selected model/provider, fallback or retry behavior, latency, and cost/tokens when available
- deterministic gate failure cannot be overridden by model-judge score
- regression command can be rerun from a clean checkout

### Optional RAG profile

When enabled:

- allowed retrieval returns cited evidence
- denied retrieval returns no forbidden evidence
- weak evidence produces uncertainty
- stale/deleted content is excluded or blocks claim
- context precision, context recall, groundedness/faithfulness, answer relevance, and unsupported-claim rate are recorded or explicitly unavailable

### Optional UI profile

When enabled:

- streaming start and completion are proven
- tool/action state is visible without fake success
- loading, error, and blocked states are actionable
- screenshot, DOM, or interaction artifact exists
- raw debug traces, raw JSON, or private context are not leaked to normal users

## Blocked checks

Record blockers for:

- missing callable chat runtime
- missing safe tool sandbox/mock mode
- missing trace hook or span export
- missing scenario owner or production-critical flow list
- external judge provider approval missing
- private transcript/RAG privacy approval missing
- host test harness unavailable
- UI/RAG profile requested but proof surface missing

## Pass condition

The capability can be called installed only if:

- command checks pass or are honestly unavailable
- structural checks pass
- fixture/runtime checks pass at the claimed proof level
- deterministic failure paths are proven
- model-judge usage is bounded and never the only proof for high-risk gates
- optional profile claims are proven or marked not-proven/blocked
- `.buildprint/agentic-chat-eval-receipt.md` reconciles every host-assessment blocker, assumption, baseline failure, and hard-stop question with the final proof level
- `.buildprint/agentic-chat-eval-receipt.md` exists
- `.buildprint/capability-receipt.md` exists as the generic receipt alias

## Failure handling

If any required proof fails:

- do not claim installed
- mark status as partial or blocked
- list exact failing check
- name the next action needed
