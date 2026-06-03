# Final Reviewer

Review the artifact before you explain it. Use the artifact type and deployment posture from `blueprint.yaml`.

Do not self-score claims. Use observable walkthrough steps and record what you actually observed.

## Reviewer role contract

The reviewer is a separate agent session. Read only this packet, the implementation diff, and `.buildprint/evidence/evidence-ledger.jsonl` rows. Do not read the Builder's chat. Do not edit files. Each finding must record file/line, observed step, severity, and exit code or screenshot path. A finding without observed evidence is not a finding.

## Core loop walkthrough

1. Start from a fresh state and complete the core loop for the real consumer.
   - Do: follow the first usable loop from input to result.
   - Observe: first action is clear, output is usable, and next action is obvious.
   - Record: where the loop breaks or becomes ambiguous.
2. Reload/restart/rerun and verify continuity.
   - Do: reload the UI and restart the service/process as applicable.
   - Observe: required state, traces, or outputs return without reseeding.
   - Record: what returned, what was lost, and recovery behavior.
3. Change inputs/config/events and verify behavior changes.
   - Do: vary prompt/data/config and rerun.
   - Observe: output or behavior changes for a domain reason, not random drift.
   - Record: concrete before/after differences.
4. Exercise primary controls/commands/actions.
   - Do: click visible primary controls or run documented commands/API calls.
   - Observe: each action has a real side effect or an honest blocked state.
   - Record: any dead control, no-op action, or swallowed error.
5. Trigger empty/error/blocked states.
   - Do: run missing-input, invalid-input, provider-blocked, and reset/delete paths where safe.
   - Observe: user/operator gets clear state language and recovery options.
   - Record: unclear copy, hidden failures, or irreversible unsafe defaults.

## Novice walkthrough (UI-bearing spines)

Pretend you have never seen this product. You have not read the source repo, the buildprint, or the docs. You have no provider credentials. You have no sample input.

1. First useful result without configuration
   - Do: open a fresh app instance; touch only what is visible on the landing screen.
   - Observe: is there a way to reach a useful first result without configuring a provider or supplying input? Does the `00b-ux-contract/first-run-path.md` description match what you see?
   - Record: time to first useful result, or the exact missing affordance.
2. Domain vocabulary check
   - Do: scan every visible label, button, tooltip, empty-state copy, and blocked-state copy on the first three screens.
   - Observe: does every term in `00b-ux-contract/copy-quality-bar.md#jargon-ban` appear with its alt-copy (or not appear at all)? Are there technical terms not in the ban list that you cannot understand?
   - Record: each un-aliased jargon appearance with file/line and screenshot.
3. State legibility
   - Do: trigger empty, loading, error, and blocked states (remove credentials, send invalid input).
   - Observe: do the user-facing copy and primary action match `00b-ux-contract/empty-blocked-loading-states.yaml`? Could a novice recover without docs?
   - Record: each state where copy or recovery path differs from the contract.
4. Disclosure check
   - Do: count visible primary controls on the first screen, then look for the expert/power surface.
   - Observe: does the default surface match `00b-ux-contract/disclosure-plan.md`? Are experts able to reach power without forcing novices into it?
   - Record: any default surface that exposes expert-only controls or any progressive surface that hides default behavior.
5. Novice acceptance
   - Do: for every novice-targeted `ux_ac_id` in `00b-ux-contract/ux-acceptance.yaml`, try to satisfy the measurable outcome as a novice.
   - Observe: did the outcome occur within the stated budget? Was a ledger row written and cited in `.buildprint/ux-traceability.yaml`?
   - Record: pass/fail per `ux_ac_id` with screenshot/log path.

A finding in this section is recorded the same way as any other reviewer finding: file/line or screen, observed step, severity, exit code or screenshot path. A finding without observed evidence is not a finding.

## Operability walkthrough

For `trusted_local`: execute what is feasible and list unexercised or unbuilt items in `05-handover.md` under `Not production-grade`.

For `private_authenticated` and `public_webapp`: each applicable item must be exercised or recorded as an external blocker.

1. Durable persistence
   - Do: stop backend/process, restart, reload.
   - Observe: key entities and latest workflow state reappear without reseeding.
   - Record: what persisted and what did not.
2. Background task ownership
   - Do: start a long-running task, interrupt process, restart.
   - Observe: task resumes, fails visibly with recovery, or is marked crashed.
   - Record: post-restart task status behavior.
3. Provider blocked-state honesty
   - Do: remove provider credential/config and rerun provider path.
   - Observe: explicit blocked state in product language; no fake success.
   - Record: copy shown and downstream effects.
4. Dead-control scan
   - Do: inspect network/log/state while using primary controls.
   - Observe: each primary control causes an observable effect.
   - Record: controls with no effect.
5. Auth/session boundary (`private_authenticated`, `public_webapp`)
   - Do: use incognito/new session and try protected resources.
   - Observe: denied access or auth flow, not silent success.
   - Record: route/API outcomes.
6. Tenant isolation (`public_webapp`)
   - Do: attempt cross-account access by URL/API.
   - Observe: no metadata leakage; denied access (for example 403/404).
   - Record: observed response and any leaked data.
7. Visual quality gate (UI-bearing artifacts)
   - Do: inspect empty, normal, and dense-data screens.
   - Observe: readable hierarchy, no control overlap, real pan/zoom/fit where relevant.
   - Record: concrete UI defects.
8. CI or clean-checkout smoke (`private_authenticated`, `public_webapp`)
   - Do: run documented checks from a clean setup.
   - Observe: commands are repeatable outside the author's environment.
   - Record: pass/fail with blocker reasons.

## Craft failure scan

Look for generic dashboard smell, fake intelligence, raw JSON dumped as the experience, placeholder copy, dead controls, undocumented public methods, fake adapter seams, canned output, internal/proof vocabulary, missing persistence, and absent next actions.

Fix local, safe, central defects before handover.

Leave only real blockers: credentials, destructive actions, deployment authorization, paid services, environment failure, or large deferred scope.
