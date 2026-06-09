# Phase 99 - Critical Review Pushback

## How to implement this phase

Review the built product harshly against the source-mapped OpenShorts contract. Score each category 0-5 and require at least 42/50, no category below 4, and no unresolved high-severity finding.

## Building objective

Find product failures before the user does. Check whether the implementation truly creates reviewable vertical shorts, handles provider failures honestly, protects side effects, preserves UI identity, and proves claims with runtime evidence. Run up to five flaw -> fix -> proof -> rescore iterations unless blocked externally.

## Review categories

1. Source fidelity to OpenShorts product scope.
2. Central output quality and specificity.
3. Provider seam honesty and error recovery.
4. Video/render/transcription proof.
5. UI identity and first-run comprehension.
6. Persistence, gallery, and side-effect auditability.
7. Security, secret handling, and privacy posture.
8. Test/build/runtime evidence.
9. Mobile/viewport/content stress behavior.
10. Handover clarity and claim ceilings.

## DO NOT

- Do not pass because prose sounds plausible.
- Do not ignore missing live-provider proof.
- Do not accept generic output or sample-only proof.
- Do not leave high-severity side-effect, secret, or data-loss risk unresolved.

## Minimum proof before moving on

- Filled score table with findings.
- Fix/proof notes for each high-severity issue fixed.
- Explicit blockers for anything not fixable in-session.
- Final pass/fail statement tied to evidence.

## Handoff note

Record final score, unresolved risks, and the exact next repair route.
