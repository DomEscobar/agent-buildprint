# Phase 03 - Host Wiring and Adapters

## Objective

Wire the harness into the host's real Agentic Chat runtime, tools/actions, state, provider routing, and optional retrieval/UI surfaces.

## Required inputs

- phase 02 runner
- host runtime entrypoint
- safe tool/action mode
- trace adapter
- host state/transcript access

## Runtime adapter

The chat runtime adapter must:

- start a conversation/run
- send a user turn
- receive streaming or final assistant output
- expose runtime errors
- expose run/session ids
- expose transcript or message refs
- expose provider/model decisions when available

## Tool/action adapter

When tools/actions exist, the adapter must:

- list allowed tools
- block forbidden/destructive tools
- capture tool name, arguments, result, status, latency, and side-effect receipt
- support mocked/sandboxed mode
- expose state changes or external action receipts

## State/memory adapter

When state or memory exists, the adapter must:

- snapshot before state
- snapshot after state
- compute diff
- distinguish intended write, accidental write, and missing write
- record compaction or summarization events when relevant

## Provider-routing adapter

Capture:

- selected provider/model
- fallback/retry reason
- latency
- cost/tokens when available
- degraded-mode behavior
- blocked provider state

## Optional RAG adapter

When enabled, capture:

- query/task
- authorized retrieval scope
- retrieved context ids
- citations
- deny-path result
- stale/deleted content result
- weak-evidence uncertainty

## Optional UI adapter

When enabled, capture:

- streaming start/end
- tool/action visible state
- loading/error/blocked state
- screenshot, DOM, or interaction artifact
- receipt/debug access path

## Proof before moving on

- real host runtime adapter runs a scenario
- tool/action adapter blocks forbidden tools
- trace spans include runtime, model, tool/action when in scope, state when in scope, and final response
- optional RAG/UI profiles are either wired or marked blocked/not-proven
