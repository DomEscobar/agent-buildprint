# Agentic Chat Eval Receipt

## Summary

- run_id: `<run-id>`
- host_commit: `<commit>`
- scenario_version: `agentic-chat-eval/scenario.v0`
- claim_status: `installed | partial | blocked`
- proof_level: `structure | fixture | runtime | profile-proven | production-regression`

## Commands

- `<baseline test command>`: `pass | fail | unavailable`
- `<eval harness command>`: `pass | fail | unavailable`

## Profiles

- core-chat: `proven | partial | blocked | not-proven`
- tool-actions: `proven | partial | blocked | not-proven`
- memory-state: `proven | partial | blocked | not-proven`
- provider-routing: `proven | partial | blocked | not-proven`
- ui-proof: `proven | partial | blocked | not-proven`
- rag: `proven | partial | blocked | not-proven`
- harness-runtime: `proven | partial | blocked | not-proven`
- security-governance: `proven | partial | blocked | not-proven`

## Scenario Results

### `<scenario-id>`

- result: `pass | fail | blocked`
- artifacts:
  - trace: `<path>`
  - transcript: `<path>`
  - score_summary: `<path>`
  - screenshot_or_dom: `<path-or-not-applicable>`
- deterministic gates:
  - trace-required: `pass | fail`
  - tool-side-effect: `pass | fail | not-applicable`
  - no-fake-success: `pass | fail`
  - forbidden-tools: `pass | fail`
- model-judge gates:
  - rubric: `<path-or-not-enabled>`
  - result: `pass | fail | not-enabled`
  - claim_ceiling: `<ceiling>`

## Negative Proof

- wrong expected tool call fails: `pass | fail | blocked`
- missing side-effect receipt fails: `pass | fail | blocked`
- missing trace span fails: `pass | fail | blocked`
- forbidden tool call fails: `pass | fail | blocked`
- missing citation fails when RAG profile is enabled: `pass | fail | blocked | not-applicable`
- fake UI success fails when UI profile is enabled: `pass | fail | blocked | not-applicable`
- injection bypass fails when security-governance profile is enabled: `pass | fail | blocked | not-applicable`
- missing dangling-tool repair fails when harness-runtime profile is enabled: `pass | fail | blocked | not-applicable`
- side effect without HITL pause fails when security-governance profile is enabled: `pass | fail | blocked | not-applicable`

## Runtime Techniques

- runtime_techniques_basis: `references/runtime-techniques-basis.md`
- adversarial_case_library_version: `<version-or-not-applicable>`
- trajectory_level_scorer: `enabled | disabled | not-applicable`

## Reconciliation

- host-assessment blockers: `<resolved | accepted claim ceiling | still blocking>`
- hard-stop answers: `<confirmed | delegated | blocked>`
- baseline failures: `<fixed | unrelated ceiling | blocking>`
- not-proven claims: `<list>`

## Final Claim

`<short honest claim and next action>`
