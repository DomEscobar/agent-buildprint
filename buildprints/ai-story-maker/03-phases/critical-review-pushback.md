# Critical Review Pushback

## Building objective

Run a hostile, evidence-led review of AI Story Maker before any final completion claim. This phase exists because story tools are easy to fake: generic outlines look plausible, static scene cards look useful until edited, provider blockers get hidden behind canned copy, exports are announced before they can be opened, and a pretty board can mask dead controls. The reviewer stance here is deliberately skeptical. Find the flaws that would embarrass the product in front of a demanding writer and force repairs while the context is fresh.

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, project `AGENTS.md`, `01-ui-identity.md`, and `HANDOVER.md` before this phase. Then inspect the actual running product, generated story package, command output, screenshots, logs, exports, persistence/readback evidence, and handoff notes. Score the result with the rubric below. A score below the pass threshold triggers an immediate repair loop. Fix the flaws in the implementation or route back to the responsible phase, rerun the proof, and rescore.

The phase passes only when the artifact earns a credible pass score and no high-severity blocker remains hidden behind optimistic language.

## How to implement this phase

1. Start a review note at `.buildprint/critical-review-pushback.md`.
2. List the surfaces or commands reviewed, including intake, story world, cast/relationship view, outline/storyboard, scene editor, provider status, continuity review, export, character/story-coach interaction, persistence/readback, screenshots, API/CLI checks, and handoff files.
3. Score the artifact on the rubric below from 0 to 5 per category, with one evidence sentence per score.
4. Compute the total score out of 50.
5. Pass threshold: at least 42/50 overall, no category below 4, and no unresolved high-severity finding.
6. If the score fails, run a repair loop:
   - name the flaw and severity;
   - identify the responsible file, phase, surface, command, or blocker;
   - patch the smallest real fix;
   - rerun the relevant proof or inspect the product again;
   - rescore the affected categories;
   - repeat until pass or until a real external blocker is recorded.
7. Cap self-contained repair loops at five iterations unless the user explicitly asks for more.
8. Update `.buildprint/progress.md`, `.buildprint/blockers.md`, and handoff notes with the final score, repaired flaws, proof commands, and remaining risks.

## Rubric

Score each category 0 to 5.

- Product intent fit: the artifact clearly helps a writer make and revise a story package, not just generate text in a generic form.
- UX clarity: a first-time user can understand what to do first, where story state lives, and what is blocked.
- Visual/design execution: style direction, color, typography, layout, spacing, and component language match `01-ui-identity.md`.
- Interaction completeness: visible controls work, validate, navigate, regenerate, export, ask, save, reload, or explain blockers.
- State honesty: empty, loading, error, blocked, success, provider, export, persistence, and privacy states are honest and actionable.
- Core output quality: the story package is specific, causally structured, inspectable, editable, and not canned text, repeated copy, static cards, or raw JSON.
- Runtime/proof integrity: claims are backed by commands, browser/API checks, screenshots, exports, persistence/readback, or explicit blockers.
- Responsive/accessibility quality: mobile and desktop layouts preserve the workflow without overflow, clipping, overlap, unreadable text, or focus traps.
- Handoff quality: what is built, verified, blocked, not proven, and next is recorded without overclaiming.
- Ad hoc flaw repair: review findings are actually fixed or routed, not waved away with prose.

Scoring anchors:

- 5: strong evidence; a demanding reviewer would likely accept it.
- 4: acceptable with minor issues that do not block the user path.
- 3: mixed; visible flaw or proof gap must be repaired before pass.
- 2: weak; substantial ad hoc implementation or confusing product behavior.
- 1: mostly placeholder, fake, generic, or unverified.
- 0: missing or actively misleading.

## DO NOT

- Do not let the author mindset dominate the review.
- Do not pass with placeholders, functionless buttons, mocked/sample data presented as real, fake provider/export success, decorative charts, or screenshots that were never inspected.
- Do not treat a high total score as pass if one essential category is below 4.
- Do not hide serious flaws in "future work" when they belong to the current promise.
- Do not claim story quality if the output does not use premise, cast, relationships, continuity, and revision handles in a specific way.

## Minimum proof before moving on

- `.buildprint/critical-review-pushback.md` exists and includes reviewed surfaces, rubric scores, total score, pass/fail status, findings, repairs, and final residual risks.
- If the first score failed, at least one repair loop entry records flaw -> fix -> proof -> rescore, or a genuine blocker explains why repair cannot continue.
- The final score is at least 42/50, every category is 4 or 5, and no high-severity finding remains unresolved unless it is recorded as a real blocker.
- Handoff notes include the final score and do not claim completion beyond the evidence.

## Handoff note

Record the final critical-review score, the worst category, the most important flaw fixed, the proof command or screenshot that changed after repair, and any remaining blocker that future phases must not overclaim.
