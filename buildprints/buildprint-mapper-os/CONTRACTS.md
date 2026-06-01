# CONTRACTS: Buildprint Mapper OS

## Source contract

- Source repositories are read-only during mapping.
- Scanner output is a hint, not authority.
- Secrets, tokens, private keys, cookies, and production data must not be copied.
- Observable product behavior matters more than internal file names.
- Selected scope must not silently shrink.

## Typed selected packet contract

The selected packet is an implementation input for a future coding agent. It must help that agent build a better artifact for its real consumer, not merely produce better-looking compliance notes.

Required selected packet spine:

- `BUILDPRINT.md`
- `01-questions.md`
- `02-project-setup.md`
- `blueprint.yaml`
- `03-phases/phase-index.yaml`
- `03-phases/phase-flow.md`
- phase files
- `03-phases/99-final-review-handover.md`
- `04-review.md`
- `05-handover.md`
- `generated/agent-prompt.md`

## Downstream role contract

The downstream role is deployment-posture aware:

- `trusted_local` -> **Senior Product Engineer**
- `private_authenticated` -> **Senior Staff Engineer**
- `public_webapp` -> **Staff/Principal Engineer**

This is a responsibility contract:

- preserve artifact intent and type;
- identify the central artifact/interface/boundary;
- build the first usable loop for the real consumer;
- keep provider/deployment/destructive/security boundaries honest;
- reject generic dashboard shells and fake controls;
- run relevant local checks;
- perform skeptical product review;
- write concise handover.

Role language is not proof. The built artifact behavior is what matters.

## Phase contract

Each phase must be an implementable usable slice. It should state:

- mode-appropriate intention;
- mapped obligations;
- stable vs free boundaries;
- implementation scope;
- interfaces touched and state/runtime touched;
- `requires_roles` and routed role constraints;
- quality bar;
- do-not-ship failures;
- repair routing and unlock condition.

The phase-flow loop is:

1. restate mode-appropriate intention;
2. apply `requires_roles` and role-specific blocks;
3. build the smallest real usable artifact-type slice;
4. improve the obvious next consumer action if local, safe, and central;
5. run relevant checks;
6. remove visible slop;
7. record useful handover facts.

## Review contract

Final review must inspect behavior directly:

- complete the core loop from a fresh start;
- reload/read back required state, traces, or outputs;
- vary inputs/config/events and verify outputs or behavior change;
- click visible primary controls or run documented commands/API calls/operator actions;
- test empty/error/blocked states where possible;
- execute posture-gated operability walkthrough steps with Do/Observe/Record semantics;
- look for generic dashboard smell, fake intelligence, raw JSON dumped as the experience, placeholders, dead controls, undocumented public methods, fake adapter seams, canned output, internal/proof vocabulary, missing persistence, and absent next actions.

Fix local, safe, central defects before handover. Leave only real blockers.

## Handover contract

Handover is short and honest, and always ends with a `Continue from here` options menu (continue one phase, continue to checkpoint, do all remaining phases, or stop) honoring `execution_cadence`:

- current status;
- built surfaces;
- verification;
- known defects and blockers;
- not production-grade status by operability item (mandatory for trusted local posture);
- next atomic actions;
- continue-from-here options menu.
