# Questions

Ask or answer only questions that change implementation.

These questions are not a survey. They are inputs to `02-project-setup.md`. Every answered question must become an architectural decision. Every unanswered question must become either a safe reversible assumption or an explicit blocker.

Do not continue selected extraction until deployment posture is set. If no answer is provided after one prompt, default to `trusted_local` and record that posture plus resulting operability blockers in `02-project-setup.md` and `05-handover.md`.

## Implementation-changing questions

1. Which deployment posture should this packet target?
   - `trusted_local`: local workstation first. Operability items may remain explicit blockers.
   - `private_authenticated`: production-shaped private deployment with auth/session, durable state, worker ownership, observability, and restart-safe behavior.
   - `public_webapp`: production-grade public deployment with tenant isolation, abuse controls, security review, and release gates.
   - Default if unanswered: `trusted_local`.
2. Who is the primary user, developer, operator, or system consumer for this build?
3. What is the product's central artifact, public interface, boundary transaction, service state, task, dataflow, or operation?
4. What is the first usable end-to-end loop?
5. Which input/output/state must persist and read back after restart?
6. Which provider, credential, deployment, destructive, paid-service, or privacy boundaries must stay blocked/honest?
7. Which source behavior must be preserved, and which source implementation details are free to replace?
8. What would make this embarrassing in a 60-second demo, terminal recording, API trace, or operator walkthrough?
9. How should the agent advance through phases?
   - `one_phase`: implement the next phase only, then stop and present the continue menu. Best when you want to review between phases.
   - `to_checkpoint`: implement through the next major checkpoint, pausing only on real blockers.
   - `all_remaining`: implement every dependency-ready phase to completion, stopping only on real blockers.
   - Default if unanswered: `one_phase`.

## Consumption rule

`02-project-setup.md` must create a question-to-decision ledger from this file:

| Question | Answer / assumption | Architectural impact | Reversible? | Blocker? |
|---|---|---|---|---|

If a question affects cost, secrets, public exposure, data loss, destructive actions, compliance, or product identity, do not silently assume. Mark it as a blocker or ask the human.

Posture changes operability only (auth, deployment, observability, backup, CI). It never lowers the product-craft floor: every UI-bearing product, including `trusted_local`, uses a real component/UI framework with a build step and a design/styling system. No single-file hand-rolled shell at any posture. See `02-project-setup.md`.
