# Phase 04 - Scorers, Profiles, and Operator Surface

## Objective

Implement profile-specific scorers and a minimal operator surface for reading results.

## Required inputs

- phase 03 adapters
- scenario fixtures
- scoring rubric
- receipt writer

## Core chat scorers

Implement deterministic or bounded scorers for:

- task completion
- required question asked when blocked
- forbidden claim absent
- refusal or honest blocked state when required
- final answer references actual actions/evidence
- no fake success after failed tool/runtime event

## Tool/action scorers

Implement deterministic scorers for:

- correct tool selected
- forbidden tool not called
- required arguments present and valid
- expected side effect occurred or safe mock receipt exists
- failed tool produced retry, fallback, or honest stop
- idempotency or duplicate-prevention behavior when relevant

## Memory/state scorers

Implement scorers for:

- expected write exists
- forbidden write absent
- stale memory not reused
- compaction preserves required facts
- state diff matches expected outcome

## Provider-routing scorers

Implement scorers for:

- correct model/provider class selected
- fallback triggered under configured failure
- retry bounded by policy
- cost/latency recorded or explicitly unavailable
- degraded-mode output is honest

## Optional RAG scorers

When enabled, implement scorers for:

- allowed retrieval
- denied retrieval
- context precision
- context recall
- groundedness/faithfulness
- answer relevance
- citation coverage
- unsupported-claim rate
- stale/deleted content exclusion
- weak-evidence uncertainty

## Optional UI scorers

When enabled, implement scorers for:

- streaming visible
- tool/action state visible
- loading/error/blocked states visible and actionable
- no raw debug/private data leak
- receipt or evidence access exists for operator review

## Optional harness-runtime scorers

When enabled, implement deterministic scorers for:

- steering or follow-up queue event recorded before next turn
- single-runner invariant preserved (no concurrent loop mutation)
- cancellation produces valid transcript with repair spans for dangling tool calls
- session event log replay matches expected derived state after compaction (when host uses durable logs)
- provider-neutral event order preserved for audit

## Optional security-governance scorers

When enabled, implement deterministic scorers for:

- injection payload blocked or escalated; forbidden tool not called
- action screening fires when untrusted context influenced proposed action
- HITL pause occurs before side effect; approve and deny paths both testable
- capability grant scope matches scenario; grant revoked on run completion
- budget exhaustion or loop breaker produces typed blocker, not infinite retry
- adversarial case library entry replayed with regression tracking field in receipt

## Trajectory-level scorers (optional, cross-profile)

When enabled:

- score full tool-integrated trajectory end to end
- record trajectory score separately from deterministic gate results
- never let trajectory score override failed security, side-effect, or trace gates
- document model/provider and rubric version in receipt

## Operator surface (CLI + JSON)

Provide at least one local non-console surface:

- markdown receipt
- JSON summary
- CLI summary
- test output summary

Suggested CLI commands (adapt to host):

```text
eval:run --scenario <id>
eval:show --run latest
eval:diff --baseline last-green
eval:replay --scenario <id>
eval:archive --list [--profile <profile>]
```

Interactive Eval Operator Console is required in phase 06. Do not skip the console by claiming CLI-only proof at `runtime` or higher.

## Proof before moving on

- each enabled profile has at least one scenario and scorer
- deterministic gates fail when expected artifacts are missing
- model-judge scorers include rubric and examples if enabled
- receipt summarizes pass/fail, artifacts, blockers, and claim ceiling
- CLI commands documented; console deferred to phase 06
