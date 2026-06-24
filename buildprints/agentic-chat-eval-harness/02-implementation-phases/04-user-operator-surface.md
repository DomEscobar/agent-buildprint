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

## Operator surface

Provide at least one local surface:

- markdown receipt
- JSON summary
- CLI summary
- test output summary

Do not build a dashboard unless explicitly scoped.

## Proof before moving on

- each enabled profile has at least one scenario and scorer
- deterministic gates fail when expected artifacts are missing
- model-judge scorers include rubric and examples if enabled
- receipt summarizes pass/fail, artifacts, blockers, and claim ceiling
