# Critical Review Pushback

## Building objective

Run a hostile, evidence-led review of the built artifact before any final completion claim. This phase exists because agents often pass their own work too easily: they accept ad hoc styling, vague copy, dead controls, fake success states, thin responsive behavior, missing state handling, weak proof, and "looks fine" screenshots. The reviewer stance here is deliberately skeptical. The goal is not to praise the implementation; the goal is to find the flaws that would embarrass the product in front of a demanding human and force repairs while the context is still fresh.

The builder must not score its own work. A separate fresh-context reviewer performs the rubric and writes `.buildprint/critical-review-pushback.md`. Self-graded reviews are invalid regardless of the numeric score.

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, project `AGENTS.md`, and `02-ui-identity.md` before this phase. The reviewer inspects the actual running product, generated artifact, command output, screenshots, logs, and blockers — not the builder's handoff narrative or self-justifications. Score the result with the rubric below. A score below the pass threshold is not a discussion topic; it triggers an immediate repair loop. Fix the flaws in the implementation or route back to the responsible phase, rerun the proof, and rescore. This loop may be ad hoc in the practical sense that it patches the concrete flaws found by review, but it must not be sloppy: every repair must name the flaw, the file or surface changed, and the proof that improved.

The phase passes only when the artifact earns a credible pass score from an independent reviewer and no high-severity blocker remains hidden behind optimistic language.

## External reviewer independence protocol

Critical review requires a fresh-context reviewer — a dispatched subagent or a new agent session that did not implement the artifact.

The reviewer receives only:

- The running artifact: screenshots, browser/API/CLI output, relevant source files, and command results.
- `docs/architecture.md` and the enforced lint/format/type-check gate output when present.
- `02-ui-identity.md`, the generated local identity artifact, and `docs/DESIGN.md` when present.
- Active phase acceptance criteria from the Buildprint.
- `.buildprint/blockers.md` for claim-ceiling facts only.

The reviewer must not receive:

- The builder's handoff narrative, progress notes, repair-loop prose, or self-justifications.
- Prior rubric scores or instructions to be lenient because "the implementation is mostly done."

The review note must include a `## Reviewer independence` section that records: who reviewed (separate subagent or fresh session), what artifact inputs were provided, and confirmation that builder rationale was excluded. If the same agent/session that implemented the artifact performed the review, record `REVIEW_INVALID` and fail the phase regardless of score.

## How to implement this phase

1. Dispatch a fresh-context reviewer per the independence protocol above. The builder may supply artifact paths and acceptance criteria, not scores or rationale.
2. Start a review note at `.buildprint/critical-review-pushback.md` with the `## Reviewer independence` section.
3. **Run `agb verify ui .` first and paste `.buildprint/artifact-check.md` into the review.** Any FAIL result in the artifact check is a hard phase fail regardless of rubric scores or runtime evidence. Do not proceed to scoring until the artifact check either passes or each failing check is justified as a genuine external blocker with evidence.
4. Before scoring, inspect `.buildprint/ui-evidence.md`. It must convert every major UI identity, `docs/DESIGN.md`, and action-surface claim into evidence: claim, required evidence, screenshot path and region or source `file:line`, nearest bad silhouette, visual craft check, pass/fail judgment, and why the shipped UI is structurally different. If this binder is missing, prose-only, or cannot prove a first-viewport action loop stronger than "type and send" plus the visual craft promised in `docs/DESIGN.md`, fail Track B before assigning rubric scores.
5. Before scoring, list the **five worst flaws** a demanding human would call out. Each flaw must cite concrete evidence: a screenshot region, `file:line`, or command output. Do not score until this section exists.
6. List the artifact surfaces or commands reviewed, including screenshots, browser paths, API/CLI checks, exports, persistence/readback checks, and blockers. Capture UI screenshots using the screenshot-capture protocol: the named tool chain (Playwright MCP, then the IDE/Cursor browser screenshot tool, then a project script, then ask the user), at viewports 375, 768, 1280, and 1440, across the default plus the real empty/loading/error/blocked/success states, saved to `.buildprint/screenshots/` with viewport-and-state names. Do not run the screenshot reviews below on a desktop-only or single capture. The reviewer must explicitly compare the first-screen screenshots against `docs/ui-identity.md`, `docs/DESIGN.md`, the forbidden silhouette, and the named adjacent at-risk silhouette; if the screenshot is indistinguishable after ignoring copy/color/icon changes, or if it violates the promised visual taste system, fail Track B.
7. Run screenshot delta review when this is a rerun or redesign: compare old and new screenshots and state whether the dominant surface, interaction model, creative/operator object, user flow, and information hierarchy changed. Palette, copy, labels, spacing, iconography, and section-title changes alone fail this review.
8. Run a progressive-disclosure screenshot review for every UI-bearing result, even when there is no prior screenshot. Count the permanent first-screen surfaces and name which capabilities are visible now versus reachable later. The review fails if the screenshot permanently displays more than one dominant creative/operator surface, one supporting context surface, and one action/status surface, or if major product capabilities compete on one page.
9. Run **objective auto-fail checks** (see below). Record each check as pass or triggered. Any triggered check caps affected categories and forces a repair loop.
10. Score the artifact on the rubric below from 0 to 5 per category. Each score must cite a concrete artifact — screenshot region, `file:line`, or command output. A prose-only justification without a cited artifact is invalid for that category and counts as score 0 for that category.
11. Compute the total score out of 60.
12. Pass threshold: at least 50/60 overall, no category below 4, no unresolved high-severity finding, no failed experience-originality, screenshot delta, or progressive-disclosure review, no triggered objective auto-fail, and a valid independent reviewer. **Track B (product/UI) and Track C (decisions/honesty) must both be fully clear before any PASS or PENDING_RECHECK verdict. A build may not reach PASS or PENDING_RECHECK by resolving only Track A (runtime/proof) while Track B or Track C failures remain open.**
13. If the score fails, run a repair loop:
    - name the flaw and severity;
    - identify the responsible file, phase, surface, command, or blocker;
    - patch the smallest real fix;
    - rerun the relevant proof or inspect the product again;
    - rescore the affected categories with a fresh-context reviewer when practical;
    - repeat until pass or until a real external blocker is recorded.
14. Cap self-contained repair loops at five iterations unless the user explicitly asks for more. Stop early only for a genuine blocker, not because the review is uncomfortable.
15. Update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes with the final score, repaired flaws, proof commands, and remaining risks.

## Objective auto-fail triggers

These checks are taste-independent. If any trigger fires, cap the named categories at 2 maximum and treat the review as failed until repaired or recorded as a genuine external blocker.

### Track A — Runtime and proof

- **Echo or canned core output**: the central product output is an echo of user input, a fixed constant string, repeated template copy, or sample data presented as real output → cap **Core output quality** at 2.
- **Self-review without independence**: the review was performed by the same agent or session that implemented the artifact, or the `## Reviewer independence` section is missing or records `REVIEW_INVALID` → **fail the phase** regardless of score.

### Track B — Product and UI

These require the artifact-check report (`agb verify ui .` / `.buildprint/artifact-check.md`) to be clean. Any Track B trigger blocks PASS or PENDING_RECHECK independently of Track A:

- **Forbidden silhouette match**: the shipped UI layout matches a silhouette explicitly forbidden in `02-ui-identity.md` or the generated local identity (for example generic dashboard, main column plus right inspector card shell, proof console) → cap **Experience originality** and **Visual/design execution** at 2.
- **Missing local UI identity**: `docs/ui-identity.md` or `UI-IDENTITY.md` is absent for a UI-bearing artifact, or the project tries to proceed without an explicit `not-ui-bearing` marker. The `agb verify ui` `ui-identity-present` check must be clean → **fail the phase** until generated or honestly marked non-UI.
- **Missing local design system**: `docs/DESIGN.md` is absent for a UI-bearing artifact, or it is generic enough to apply unchanged to unrelated products. The `agb verify ui` `design-system-present` check must be clean → **fail the phase** until generated or honestly marked non-UI.
- **Proof/debug console leakage**: the main UI exposes build/evaluator language such as proof, fixture, deterministic, blocked provider, run ledger, saved point, response engine setup, mock provider, or Buildprint labels. The `agb verify ui` `proof-console-leakage` check must be clean → cap **UX clarity**, **Experience originality**, and **Visual/design execution** at 2.
- **Missing UI evidence binder**: `.buildprint/ui-evidence.md` is absent, or it does not include claim, required evidence, screenshot path and region or source `file:line`, nearest bad silhouette, visual craft check, pass/fail judgment, and structural-difference proof for each major UI identity and design-system claim → **fail the phase** until grounded evidence exists.
- **Weak action surface**: the first viewport does not prove a user action loop stronger than "type and send", or the binder cannot name the next powerful user action, what the agent will do after it, the visible state/result change, the moment-of-need recovery/approval/memory action, and why status panels are subordinate → cap **Product intent fit**, **UX clarity**, **Interaction completeness**, and **Experience originality** at 2.
- **Prose-only identity compliance**: the review accepts labels such as "braid", "loom", "consumer-grade", "action UI", or "distinctive" without screenshot/source comparison against the nearest bad silhouette → cap **Experience originality** and **Visual/design execution** at 2.
- **Raw JSON in DOM**: the UI renders event, message, telemetry, or memory payloads via `JSON.stringify` directly to `.textContent`, `innerHTML`, or `<pre>` output. The `agb verify ui` `raw-json-in-dom` check must be clean → cap **Core output quality** and **UX clarity** at 2.
- **Context leakage in output**: rendered assistant messages or streamed output contains internal runtime tokens (`--TURN`, `context_source`, `recent_messages`, `session_checkpoint`). The `agb verify ui` `context-leakage` check must be clean → cap **Core output quality** at 2.
- **Dead or decorative controls**: a visible button, tab, filter, or nav item has no wired behavior and does not explain a blocker when activated → cap **Interaction completeness** at 2.
- **Thin or default architecture**: `docs/architecture.md` is a thin stack list that omits named scalability seams, maintainability boundaries, or enforced coding standards (SOLID, KISS, DRY) with runnable lint/format/type-check gates, or the shipped code contradicts the stated standards → cap **Runtime/proof integrity** at 2.

### Track C — Decisions and honesty

These require `.buildprint/decisions.md` to be filled. Any Track C trigger blocks PASS or PENDING_RECHECK independently of Tracks A and B:

- **Unfilled hard-stop decisions stub**: `.buildprint/decisions.md` still contains the "No implementation decisions recorded yet" placeholder while phases are complete. The `agb verify ui` `decisions-stub` check must be clean → **fail the phase** until filled.
- **Scope-presentation mismatch**: the shipped UI presents as a broad product (multi-panel workbench, full product UI, many competing capabilities on one screen) while the runtime posture is a local proof or mock-only with no live provider path, and this mismatch was not recorded as a confirmed decision in `decisions.md` → cap **Product intent fit** and **State honesty** at 2.

Any category capped at 2 triggers the mandatory repair loop in step 12.

## Rubric

Score each category 0 to 5.

- Product intent fit: the artifact clearly solves the promised user job and does not drift into a generic demo.
- UX clarity: a first-time user can understand what to do first, what state the system is in, and what is blocked.
- Visual/design execution: style direction, color, typography, layout, spacing, component language, density, motion, and responsive collapse match `docs/DESIGN.md` as well as the product fit promised by `02-ui-identity.md`.
- Experience originality: the product has a distinct metaphor, dominant object, primary gesture/manipulation, and layout silhouette. Score below 4 if the app silhouette matches a prior/default build, the UI is mostly cards/panels/status, sample data is the main thing being inspected, creative/operator action is weaker than proof/status/export action, or the screenshot could be mistaken for a generic evaluator dashboard.
- Progressive disclosure and screen-state hierarchy: the current task dominates; secondary capabilities are reachable through task steps, tabs, routes, detail views, drawers, or scoped modals. Score below 4 if multiple product modules are permanently visible because the agent appended requirements instead of choosing view hierarchy. Score 0 and fail the review if all major capabilities compete on one page.
- Interaction completeness: visible controls work, validate, navigate, or explain blockers; no inert tabs, dead buttons, fake filters, or decorative actions.
- State honesty: empty, loading, error, blocked, success, provider, runtime, export, persistence, and privacy states are honest and actionable.
- Core output quality: the central artifact/result is specific, useful, inspectable, and not just canned text, repeated copy, static cards, or raw JSON.
- Runtime/proof integrity: claims are backed by commands, browser/API checks, screenshots, exports, persistence/readback, or explicit blockers.
- Responsive/accessibility quality: mobile and desktop layouts preserve the workflow without accidental overflow, clipping, overlap, unreadable text, or keyboard/focus traps.
- Handoff quality: what is built, verified, blocked, not proven, and next is recorded clearly without overclaiming.
- Ad hoc flaw repair: review findings are actually fixed or routed, not waved away with prose.

Scoring anchors:

- 5: strong evidence; a demanding reviewer would likely accept it.
- 4: acceptable with minor issues that do not block the user path.
- 3: mixed; visible flaw or proof gap must be repaired before pass.
- 2: weak; substantial ad hoc implementation or confusing product behavior.
- 1: mostly placeholder, fake, generic, or unverified.
- 0: missing or actively misleading.

## DO NOT

- Do not let the author mindset dominate the review; the builder must not score its own work.
- Do not pass with placeholders, functionless buttons, mocked/sample data presented as real, fake provider/export success, decorative charts, or screenshots that were never inspected.
- Do not treat a high total score as pass if one essential category is below 4 or an objective auto-fail trigger fired.
- Do not assign rubric scores with prose-only justification; every score needs a cited artifact.
- Do not hide serious flaws in "future work" when they belong to the current promise.
- Do not rewrite the whole product unless the rubric proves the architecture or UX direction is fundamentally wrong.
- Do not pass a redesign whose screenshot differs mostly by palette, copy, labels, spacing, iconography, or section titles.

## Minimum proof before moving on

- `.buildprint/artifact-check.md` exists and reports PASS, or each FAIL check is justified as a genuine external blocker with cited evidence;
- `docs/DESIGN.md` exists for UI-bearing artifacts or an explicit `not-ui-bearing` marker explains why no visual system is needed.
- `.buildprint/ui-evidence.md` exists and includes Evidence Binder and Action Surface Gate results: identity/design/action claims, required evidence, screenshot path and region or source `file:line`, nearest bad silhouette, visual craft check, pass/fail judgment, structural-difference proof, next powerful user action, agent next move, visible state/result change, moment-of-need recovery/approval/memory action, and status-panel subordination proof.
- `.buildprint/critical-review-pushback.md` exists and includes `## Reviewer independence`, the five worst flaws with cited evidence, objective auto-fail check results for all three tracks (A/B/C), reviewed surfaces, rubric scores with cited evidence per category, total score, pass/fail status, findings, repairs, progressive-disclosure screenshot review, Evidence Binder and Action Surface Gate verdicts, and final residual risks.
- If this was a rerun/redesign, screenshot delta review records old vs new dominant surface, interaction model, creative/operator object, user flow, and information hierarchy.
- If the first score failed, at least one repair loop entry records flaw -> fix -> proof -> rescore, or a genuine blocker explains why repair cannot continue.
- The final score is at least 50/60, every category is 4 or 5, experience originality and progressive disclosure are not below 4, screenshot delta and progressive-disclosure reviews are not failed, no objective auto-fail trigger remains unresolved, the reviewer was independent, and no high-severity finding remains unresolved unless it is recorded as a real blocker.
- Handoff notes include the final score and do not claim completion beyond the evidence.

## Handoff note

Record the final critical-review score, the worst category, the most important flaw fixed, the proof command or screenshot that changed after repair, reviewer independence confirmation, the `phase_core_passed` versus `claim_qualified` judgment, and any remaining blocker that future phases must not overclaim.
