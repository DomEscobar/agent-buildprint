# Phase Flow

You are the orchestrator for this phase only.

Your job is to run a compact, proof-gated phase loop: plan the slice, activate the needed team gates, implement the smallest real vertical path, review it, verify it, and record honest evidence. Do not spend the session manufacturing delegation paperwork before code can move.

## Phase-entry protocol

Before writing code for any phase:

1. Declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`.
2. Write `.buildprint/phase-runs/<phase-id>/team-gates.md` with the active roles, blocking gates, and proof expectations from the phase signals.
3. Create per-role handoff and return files only when real subagents or separate specialist sessions are actually used.
4. Implement the first real vertical path for the phase.
5. Verify with the phase quality gates.
6. Write review and proof artifacts before appending runtime evidence.

You may not append runtime evidence or mark this phase passed until the required phase-run artifacts exist.

## Phase state model

Every phase must distinguish three states:

- `checkpoint_recorded`: the runtime evidence ledger has at least one valid proof or blocker row for this phase.
- `phase_core_passed`: the phase's first real local vertical path is implemented, verified, reviewed, and recorded without core blockers.
- `claim_qualified`: live-provider, browser/e2e, screenshot, deployment, security, worker, or data-lifecycle proof has enough matching evidence to upgrade the corresponding claim.

An early checkpoint is not phase completion. A phase may continue after `checkpoint_recorded`, but it is not `phase_core_passed` until the owned implementation path works end to end. Browser, screenshot, live-provider, deployment, and external-service blockers can prevent `claim_qualified` without preventing `phase_core_passed` when the local core path is honestly proven.

For UI-bearing phases, `phase_core_passed` requires at least one user action path through a UI/controller boundary into runtime behavior and back into a visible state or readback result. Static state cards, dead buttons, generic dashboard panels, or review prose do not satisfy the UI action path. A full-suite browser product also cannot pass the UX gate with a single embedded HTML/CSS/JS file, default browser controls, stacked forms, raw text lists in place of domain visualization, or a screenshot that reads as a quick local MVP.

## Required phase artifacts

Before code:

- `.buildprint/phase-runs/<phase-id>/plan.md`
- `.buildprint/phase-runs/<phase-id>/team-gates.md`

Optional when real delegation happens:

- `.buildprint/phase-runs/<phase-id>/handoffs/<role>.md`
- `.buildprint/phase-runs/<phase-id>/returns/<role>.md`

Before evidence:

- `.buildprint/phase-runs/<phase-id>/reviews/architecture.md`
- `.buildprint/phase-runs/<phase-id>/reviews/ux.md` if UI-bearing
- `.buildprint/phase-runs/<phase-id>/reviews/qa.md`
- `.buildprint/phase-runs/<phase-id>/proof.md`

Only then:

- append `.buildprint/evidence/evidence-ledger.jsonl`
- update `.buildprint/progress.md`, `.buildprint/state.json`, and `.buildprint/next-agent.md`

## Team gates

Team gates are phase-derived. Use `requires_roles` from the phase file when present. If absent, infer the smallest useful team from the phase content:

- `product-architect`: mapped surface dispositions, capability preservation, dependency direction, project structure.
- `ux-ui-craft`: UI-bearing work, visual-quality bar, domain-specific composition, empty/loading/error/blocked/success states, accessibility, responsive behavior.
- `integration-runtime`: APIs, providers, workers, jobs, external side effects, error semantics.
- `data-persistence`: durable state, migrations, import/export, retention, restart proof.
- `security-boundary`: auth, tenant/privacy, secrets, destructive actions, uploads, external writes.
- `test-and-verification`: test/build/browser/runtime proof, no-fake scan, evidence quality.

## Compiled team skill gates

The detailed Mapper OS team skill capsules are compiled into this phase-flow file because downstream selected packets must not depend on mapper-local `templates/teams/*` files. Use the active `requires_roles` list to activate only the relevant gates:

- `product-architect`: classify product shape, architecture style, context boundaries, component boundaries, data flow, and ADR-lite tradeoffs before coding. Block single-file full-suite architecture, UI-only shells, route-shaped handlers without service/domain/storage/provider boundaries, diagram-only topology, and in-memory-only state when durability is claimed.
- `ux-ui-craft`: set phase-local taste variables, domain-fit rubric, composition rules, visual hierarchy, typography/color/spacing, interaction polish, accessibility, responsive behavior, and screenshot requirements. Block static markup, generic dashboards/cards, stacked forms, dead controls, missing state matrix, default browser controls, text overlap, weak contrast, and screenshots that read as local MVPs.
- `integration-runtime`: define provider/API/runtime boundaries with config, side effects, retries, error behavior, status/progress/logs/cancel/failure semantics, and secret-name-only handling. Block fake provider success, unowned external writes, jobs without recovery semantics, and runtime claims without proof or non-upgrading blockers.
- `data-persistence`: define state/schema ownership plus create/read/update/delete/import/export/reporting lifecycle, migrations, cleanup, retention, backup/export, restart/readback, and recovery expectations. Block in-memory product state, durability claims without restart/readback proof, and graph/model/project data without ownership or recovery.
- `security-boundary`: define auth/session/tenant, permissions, secrets, destructive confirmations, abuse controls, data exposure boundaries, denied-path tests, invalid-input tests, unsafe-side-effect handling, and secret redaction. Block plaintext secrets, admin/destructive actions without permission/confirmation, and public deployment posture without threat model.
- `test-and-verification`: enforce the evidence ceiling rule. Static text proves copy only; build/import proves syntax only; mocks prove contract shape only; screenshots prove rendering only. Require proof commands, artifacts, negative cases, no-fake scans, browser/runtime proof, and narrow evidence rows before promotion.

Do not create busywork roles. Every active role in runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` must have:

- role/lens
- blocking gate
- implementation obligation
- verification/proof expectation
- blocker routing rule

## Optional bounded handoff shape

Use handoff files only for actual delegation to subagents or separate specialist sessions. Each handoff must include:

- phase id and phase file
- role/lens
- files to read
- allowed edit scope, if any
- non-goals
- success criteria
- verification command or proof artifact expected
- evidence row requirements
- risks/blockers to report

If the main session handles the role itself, record the role's gate result in runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` and the relevant review file instead of writing fake handoff/return paperwork.

## Review and integration

The orchestrator cannot silently discard dissent. If a team gate reports a blocker or quality gap, either fix it, route it to setup/questions/prior phase/external blocker, or record why it is out of scope.

## Review contracts

Reviews are not status summaries. A review may pass only if it answers the required rejection questions with evidence, scoped deferral, or a blocker. Do not write a generic "looks good" review. If a required question is not applicable, say why and name the phase that owns it.

### Architecture review contract

Write `.buildprint/phase-runs/<phase-id>/reviews/architecture.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Dependency direction`: what depends on what; name any illegal dependency introduced.
- `## Product obligation preservation`: preserved/replaced/merged/deferred/dropped surfaces reviewed.
- `## State and runtime ownership`: who owns persistence, tasks, providers, env, artifacts.
- `## Provider/live claim honesty`: whether deterministic proof, live proof, or blocker applies.
- `## Scoped shortcuts`: shortcuts accepted for this phase, why they do not upgrade claims.
- `## Next-phase boundary`: what later phases must not inherit or incorrectly own.
- `## Required repair before evidence`: none, or exact repair/blocker.

### UX review contract

If the phase is UI-bearing, write `.buildprint/phase-runs/<phase-id>/reviews/ux.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Primary user job`: the main task this screen or flow serves.
- `## Screen composition`: layout, hierarchy, primary and secondary actions.
- `## Visual quality bar`: typography, spacing, color, density, surface hierarchy, focus/disabled states, and why this is not a generic card/form shell.
- `## Domain interaction model`: domain affordances that match the product instead of raw text lists or disconnected forms.
- `## State matrix`: empty, loading, error, blocked, and success/ready states.
- `## Responsive/accessibility proof`: mobile/desktop, keyboard path, contrast, and no-overlap evidence.
- `## Destructive/sensitive actions`: confirmation, reversibility, and copy clarity.
- `## Screenshot or DOM evidence`: path/command, or blocker.
- `## Screenshot critique`: concrete visual defects observed in the screenshot, or why none block product-grade use.
- `## Required repair before evidence`: none, or exact repair/blocker.

If the phase is not UI-bearing, `.buildprint/phase-runs/<phase-id>/reviews/ux.md` must still exist and use these headings:

- `## Verdict`: not-ui-bearing
- `## Reason`
- `## Downstream UI obligations`

### QA review contract

Write `.buildprint/phase-runs/<phase-id>/reviews/qa.md` with these headings:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Commands run`: exact commands plus relevant output artifact or subtest section; a bare aggregate such as `npm test` is not enough in full-suite runs.
- `## What passed`
- `## What this does not prove`
- `## Blockers and claim limits`
- `## Evidence row check`: whether `upgrades_claim` matches the actual proof level.

If any review verdict is `blocker`, do not append passing evidence. Append a blocker row only after the required review and proof artifacts exist.

## Evidence gate

Runtime proof/blocker rows go only to `.buildprint/evidence/evidence-ledger.jsonl`. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence and remains immutable after bootstrap.

Before writing runtime evidence, read `05-evidence/evidence-ledger.schema.json` and conform to it. Every runtime row must include `artifact_id`, `type`, `phase_id`, valid `status` (`passed`, `proven`, `blocked`, `failed`, `skipped`, or `missing`), `source`, array `proves`, `proof_type`, `provider_mode`, and `upgrades_claim`.

Evidence honesty rules:

- Do not use informal statuses such as `passed_with_blocker`; use `passed` only for proof that actually passed, and add separate `blocked` rows for blocked proof types.
- Do not set `upgrades_claim: true` on any row with a blocker, missing dependency, synthetic check, unavailable credentials, sandbox/network limitation, or partial proof.
- Do not claim `no_fake_scan_pass` unless a real no-fake scan command/artifact exists and was run. If no scan exists, write a `blocked` row or omit the proof claim.
- A frontend copy/string-check script is not a production build. If dependencies/browser/network are unavailable, record the real build/browser proof as `blocked` with `upgrades_claim: false`.
- Do not copy every required proof label into every evidence row. `proves` must list only the claims directly proven by the row's `source`, `commands`, and artifacts.
- HTTP/API runtime traces prove API/runtime behavior, not browser behavior. Claims such as `browser_runtime_trace`, `repeatable_browser_e2e`, `screenshot_state_set`, and `ux_design_gate` require a real browser/e2e run, screenshot/DOM-state artifact, or an explicit blocker row with `upgrades_claim: false`.
- Static markup checks, string checks, and non-browser DOM-state scripts do not upgrade `ux_design_gate`. If Playwright, Chrome, or equivalent browser tooling is unavailable, write a non-upgrading browser/UX blocker row instead of upgrading UI quality.
- Browser automation that only proves elements exist does not upgrade `visual_quality_gate`. To upgrade it, the UX review must inspect screenshot evidence and reject default-control shells, generic dashboards, stacked form pages, raw text-list substitutes for domain workbenches, unreadable density, weak hierarchy, missing focus/disabled states, or mobile/desktop overlap.
- Claims such as `worker_retry_cancel_recovery`, `migration_retention_backup_upload_limits`, and `security_boundary_review` require matching implementation and proof artifacts. If the phase did not exercise those paths, omit the claim or write a non-upgrading blocker row.
- Do not upgrade `worker_retry_cancel_recovery`, `migration_retention_backup_upload_limits`, or `security_boundary_review` from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or broad end-to-end script row. These labels need separate evidence rows whose `proof_type`, `source`, and command/artifact names explicitly identify the worker retry/cancel/recovery path, the migration/retention/backup/upload-limit lifecycle path, or the security/destructive-action/secret-boundary path.
- If one command exercises multiple broad production paths, split its output into narrow rows and give each row the exact artifact section or command assertion that proves only that claim. Do not put worker, data-lifecycle, and security labels into one upgrading row.
- Provider adapter/config tests can prove adapter seams and fail-closed configuration. They cannot prove live provider behavior; live credentials and external service authorization may block only the live-provider proof row.
- If a combined production proof track contains work you did not implement end to end, do not partially upgrade the combined label. Split the evidence into narrower passing labels and a blocker row for the missing production track.
- The QA review must explicitly audit every `upgrades_claim: true` row and reject rows whose `proves` array is broader than the command/artifact named in `source`.
- Review prose cannot upgrade implementation proof by itself. `review_artifact` rows default to `upgrades_claim: false`.
- Do not put `ux_design_gate`, `visual_quality_gate`, `security_boundary_review`, `migration_retention_backup_upload_limits`, `worker_retry_cancel_recovery`, browser/e2e labels, or live-provider labels in an upgrading `review_artifact` row. To upgrade one of those labels, write a separate executable proof row whose command/artifact actually exercised that path.
- Upgrading rows for `security_boundary_review`, `worker_retry_cancel_recovery`, `migration_retention_backup_upload_limits`, browser/e2e labels, `ux_design_gate`, or `visual_quality_gate` must not use `type`, `proof_type`, or `source` wording that relies on review prose alone. If review notes are useful context, write a separate non-upgrading `review_artifact` row and keep the executable proof row focused on the command/assertion and screenshot artifact that exercised or displayed the path.

## Continuation gate

Full-suite execution must distinguish claim blockers from implementation blockers.

Continue to the next dependency-ready phase when this phase has:

- core implementation/API/domain/persistence tests passing for the phase's first real vertical path
- for UI-bearing phases, a local user action path and state transition proof through the UI/controller/runtime boundary
- for UI-bearing phases, a product-grade screenshot review that does not identify blocking visual/interaction defects
- phase-run plan, team gates, reviews, proof, and evidence rows written
- non-upgrading blocker rows for live-provider, browser/e2e/screenshot, deployment, or external-service proof that could not run in the current environment

Do not continue when the blocker means the current phase did not implement its core product path, did not persist state it owns, failed required tests, has unresolved destructive/security ambiguity, or cannot provide an honest local runtime/API proof.

Every blocker row should set `blocks_continuation: false` only when the blocker limits claim qualification but does not prevent later phase implementation. Omit it or set `blocks_continuation: true` for blockers that make downstream phases unsafe or invalid.
