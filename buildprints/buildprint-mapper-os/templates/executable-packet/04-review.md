# Final Reviewer

Review the artifact before you explain it. Use the artifact type and deployment posture from `blueprint.yaml`.

Do not self-score claims. Use observable walkthrough steps and record what you actually observed.

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
