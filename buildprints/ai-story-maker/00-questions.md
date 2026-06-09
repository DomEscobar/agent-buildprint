# 00 Questions

The selected scope is the production canvas for an AI short-drama creation product: a browser/desktop work surface where a user selects an episode, sees the creative pipeline as connected canvas nodes, collaborates with an agent through a right-side chat panel, edits generated script/planning/storyboard artifacts, and moves toward image/video production with durable readback.

These questions are not permission to lower quality. If unanswered, use the AI-best-judgment default unless the item is marked hard-stop.

## Hard-stop questions

Stop before `01-project-setup.md` if any hard-stop answer would change product identity, sensitive capability policy, or deployment safety.

1. Secrets and provider policy: are real text, image, and video model credentials available for live generation proof?
   - Default if unanswered: build provider seams, settings, model selection, blocked-state UI, and deterministic non-provider tests; mark live generation proof blocked.

2. Deployment posture: should the product run as `trusted_local`, `private_authenticated`, or `public_webapp`?
   - Default if unanswered: `trusted_local` with authenticated local web UI, because the source product uses local/desktop and Docker deployment with a default admin account that must be changed before public exposure.

3. Destructive/data-loss behavior: should delete, overwrite, memory clear, batch generation, and failed-media cleanup actions be enabled immediately or guarded by confirmations and recovery paths?
   - Default if unanswered: include guarded confirmations and recovery/handoff notes; never run destructive actions silently.

4. Privacy/compliance exposure: may imported novels, generated prompts, media outputs, and assistant history leave the trusted local environment?
   - Default if unanswered: treat all content as private local project data and block public/cloud claims until storage, provider, and privacy rules are explicit.

5. Product/artifact identity: should the selected artifact remain the production canvas webapp rather than the full application suite?
   - Default if unanswered: keep the selected scope centered on the production canvas webapp, with supporting project/episode/provider/settings paths only where required for that canvas.

6. Upload and generated-media storage: should imported novels, images, generated frames, and videos be stored only on local disk, in object storage, or in a durable managed store?
   - Default if unanswered: local durable files plus SQLite/Postgres metadata for trusted local use; do not claim production cloud durability.

## Assumable defaults

1. Scope boundary: preserve the production canvas, project/episode selection path, agent chat, graph nodes, persistence, generated media readback, settings/provider seams, and visual workbench UX. Do not attempt to rebuild every ancillary page beyond what the golden path needs.

2. Stack: choose a modern browser app with a real canvas/graph library, authenticated API, Socket.IO or equivalent realtime channel, durable relational persistence, and media storage. The exact stack is flexible if it can prove the product contract.

3. Language: default to English-first product labels and copy, with a multilingual-ready structure. If full translation files are not implemented in the first slice, keep user-facing copy centralized and do not hard-code internal proof terms into the UI.

4. Default account: local development may seed `admin` / `admin123`, but setup must force password change or clearly block public/private deployment until credentials are rotated.

## Deferrable questions

1. Electron packaging can wait until the browser product path is verified.

2. Full vendor marketplace breadth can wait; one text provider seam, one image provider seam, and one video provider seam are enough for proof if they expose the same configuration and blocked-state behavior.

3. Poster/cover generation can remain future scope unless it is required by the chosen release path.
