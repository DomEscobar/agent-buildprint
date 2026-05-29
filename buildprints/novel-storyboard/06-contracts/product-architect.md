# Product Architect Contract

## Role

Keep the implementation centered on the selected product outcome: a browser novel-to-storyboard production workbench for short-drama or cinematic episode creation.

## Must Preserve

- The Canvas board is the primary surface.
- Storyboard frames, shot ordering and selected-frame review are first-class product surfaces.
- Node topology maps prose/script, plan, assets, storyboard table, storyboard frames and workbench.
- Board behavior is user-visible and interactive.
- Generated media state and continuity metadata remain attached to visible shots.
- Non-core suite surfaces stay out of scope unless they are required for auth, provider setup, persistence or proof.

## Must Reject

- Static dashboard/card replacement for the canvas.
- A technically correct graph that does not provide a desirable storyboard review workflow.
- Desktop-only implementation.
- Route inventory treated as product implementation.
- Broad full-suite expansion without explicit scope decision.

## Review Gate

Before each phase is considered complete, confirm the implemented behavior maps to the `02-project-setup.md` obligation/surface matrix, supports the storyboard-first workflow in `BUILDPRINT.md`, and does not add invented surfaces.
