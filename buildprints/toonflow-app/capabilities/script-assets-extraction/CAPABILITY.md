# Script Asset Extraction

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Users create scripts, export selected scripts as text files in a zip, and run AI extraction of roles/scenes/props with deduped script-asset links and extraction state tracking.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Script CRUD/export API, AI extraction service, asset persistence, script-asset join table, task/status UI.
Stable behavior: Batch grouping, result tool schema, asset deduplication, script-asset relation replacement.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Contract test for extraction result persistence with sandbox model
Required evidence: artifacts/script-asset-extraction.log; BLOCKED_WITH_REASON: provider proof not available.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs provider fixture/sandbox, zip export verification, and status polling proof.

## Behavior Contract

- User/system action: Users create scripts, export selected scripts as text files in a zip, and run AI extraction of roles/scenes/props with deduped script-asset links and extraction state tracking.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_script, o_assets, o_scriptAssets.
- Failure/empty/loading/blocked states: No selected scripts, missing scripts, AI returns no assets, provider error.
- Provider/persistence/runtime/operational boundary: universalAi text model with resultTool.

## Stable vs Free

| Stable | Free |
|---|---|
| Users create scripts, export selected scripts as text files in a zip, and run AI extraction of roles/scenes/props with deduped script-asset links and extraction state tracking. | Implementation framework/component/database abstraction. |
| No selected scripts, missing scripts, AI returns no assets, provider error. | Exact internal error class names. |
| Contract test for extraction result persistence with sandbox model | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/routes/script/addScript.ts:8-40; source-real/src/routes/script/exportScript.ts:9-26; source-real/src/routes/script/extractAssets.ts:56-259

