# Critical Review Pushback

## Building objective

Run a hostile, evidence-led review of the built artifact before any final completion claim. This phase exists because agents often pass their own work too easily: they accept ad hoc styling, vague copy, dead controls, fake success states, thin responsive behavior, missing state handling, weak proof, and "looks fine" screenshots. The reviewer stance here is deliberately skeptical. The goal is not to praise the implementation; the goal is to find the flaws that would embarrass the product in front of a demanding human and force repairs while the context is still fresh.

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, project `AGENTS.md`, and `02-ui-identity.md` before this phase. Then inspect the actual running product, generated artifact, command output, screenshots, logs, and handoff notes. Score the result with the rubric below. A score below the pass threshold is not a discussion topic; it triggers an immediate repair loop. Fix the flaws in the implementation or route back to the responsible phase, rerun the proof, and rescore. This loop may be ad hoc in the practical sense that it patches the concrete flaws found by review, but it must not be sloppy: every repair must name the flaw, the file or surface changed, and the proof that improved.

The phase passes only when the artifact earns a credible pass score and no high-severity blocker remains hidden behind optimistic language.

## How to implement this phase

1. Start a review note at `.buildprint/critical-review-pushback.md`.
2. List the artifact surfaces or commands reviewed, including screenshots, browser paths, API/CLI checks, exports, persistence/readback checks, and handoff files.
3. Run screenshot delta review when this is a rerun or redesign: compare old and new screenshots and state whether the dominant surface, interaction model, creative/operator object, user flow, and information hierarchy changed. Palette, copy, labels, spacing, iconography, and section-title changes alone fail this review.
4. Run a progressive-disclosure screenshot review for every UI-bearing result, even when there is no prior screenshot. Count the permanent first-screen surfaces and name which capabilities are visible now versus reachable later. The review fails if the screenshot permanently displays more than one dominant creative/operator surface, one supporting context surface, and one action/status surface, or if major product capabilities compete on one page.
5. Score the artifact on the rubric below from 0 to 5 per category, with one evidence sentence per score.
6. Compute the total score out of 60.
7. Pass threshold: at least 50/60 overall, no category below 4, no unresolved high-severity finding, and no failed experience-originality, screenshot delta, or progressive-disclosure review.
8. If the score fails, run a repair loop:
   - name the flaw and severity;
   - identify the responsible file, phase, surface, command, or blocker;
   - patch the smallest real fix;
   - rerun the relevant proof or inspect the product again;
   - rescore the affected categories;
   - repeat until pass or until a real external blocker is recorded.
9. Cap self-contained repair loops at five iterations unless the user explicitly asks for more. Stop early only for a genuine blocker, not because the review is uncomfortable.
10. Update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes with the final score, repaired flaws, proof commands, and remaining risks.

## Rubric

Score each category 0 to 5.

- Product intent fit: the artifact clearly solves the promised user job and does not drift into a generic demo.
- UX clarity: a first-time user can understand what to do first, what state the system is in, and what is blocked.
- Visual/design execution: style direction, color, typography, layout, spacing, and component language match `02-ui-identity.md`.
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

- Do not let the author mindset dominate the review; review as if someone else built it.
- Do not pass with placeholders, functionless buttons, mocked/sample data presented as real, fake provider/export success, decorative charts, or screenshots that were never inspected.
- Do not treat a high total score as pass if one essential category is below 4.
- Do not hide serious flaws in "future work" when they belong to the current promise.
- Do not rewrite the whole product unless the rubric proves the architecture or UX direction is fundamentally wrong.
- Do not pass a redesign whose screenshot differs mostly by palette, copy, labels, spacing, iconography, or section titles.

## Minimum proof before moving on

- `.buildprint/critical-review-pushback.md` exists and includes reviewed surfaces, rubric scores, total score, pass/fail status, findings, repairs, progressive-disclosure screenshot review, and final residual risks.
- If this was a rerun/redesign, screenshot delta review records old vs new dominant surface, interaction model, creative/operator object, user flow, and information hierarchy.
- If the first score failed, at least one repair loop entry records flaw -> fix -> proof -> rescore, or a genuine blocker explains why repair cannot continue.
- The final score is at least 50/60, every category is 4 or 5, experience originality and progressive disclosure are not below 4, screenshot delta and progressive-disclosure reviews are not failed, and no high-severity finding remains unresolved unless it is recorded as a real blocker.
- Handoff notes include the final score and do not claim completion beyond the evidence.

## Handoff note

Record the final critical-review score, the worst category, the most important flaw fixed, the proof command or screenshot that changed after repair, and any remaining blocker that future phases must not overclaim.

