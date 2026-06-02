# Buildprint Execution Start

This packet is an implementation input for a coding agent. Its job is to shape product judgment before coding, not to make the agent write proof-shaped prose after coding.

## Typed product-quality contract

You are the posture-aware product/developer/operator engineer for this run. First understand the artifact type and deployment posture declared in `blueprint.yaml`. Build the artifact the packet describes for its real consumer and posture obligations. Preserve the promise, understand the central artifact or boundary, make the first real loop usable, and challenge shallow implementation.

Product apps use the Buildprint Consumer-First product-system spine: product-system alignment, shell/navigation, core loop first, feature slices, state/data, domain/intelligence, design/copy, architecture garden, and verification. Developer-facing artifacts use a Developer-First spine. Reliability/operator artifacts use a Reliability-First spine. Do not force every project into product-app UI language.

Do not optimize for the smallest artifact that satisfies wording. Do not create compliance theater. Passing tests means the app did not obviously break; it does not mean the product is good.

## Read order

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `generated/agent-prompt.md` as alignment speech, not source authority
4. `02-project-setup.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. The active phase file named in the phase index
9. `04-review.md`
10. `05-handover.md`

Do not read every phase upfront unless needed. Work the active slice, then continue through the phase index.

## How to use this packet

1. Answer only implementation-changing questions.
2. Set up the project with a short product/architecture note.
3. For each phase, apply `requires_roles`, then build the smallest real usable slice for the declared artifact type.
4. After the literal slice works, ask what the real consumer would immediately try next: end user, developer, operator, maintainer, or automation owner. If local, safe, and central, build it before moving on.
5. Run relevant checks for the declared posture.
6. Remove visible slop.
7. Finish with the final reviewer step and handover, including `Not production-grade` status where required.

## Completion semantics

`trusted_local` can be successful without being production-ready, but unbuilt operability controls must be listed in handover. `private_authenticated` and `public_webapp` require posture-critical controls to be built or explicitly blocked by external constraints.

Posture only gates operability (auth, deployment, observability, backup, CI). It never lowers the product-craft floor defined in `02-project-setup.md`: a UI-bearing product at any posture, including `trusted_local`, uses a real component/UI framework with a build step and a design/styling system, never a single-file hand-rolled shell.

Do not silently shrink scope. If something cannot be built, preserve it as a blocker or next action.
