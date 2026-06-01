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

The downstream agent is a **Senior Product/Developer/Operator Engineer**. This is a responsibility contract:

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
- what to build;
- quality bar;
- do-not-ship failures.

The phase-flow loop is:

1. restate mode-appropriate intention;
2. build the smallest real usable artifact-type slice;
3. improve the obvious next consumer action if local, safe, and central;
4. run relevant checks;
5. remove visible slop;
6. record useful handover facts.

## Review contract

Final review must inspect behavior directly:

- complete the core loop from a fresh start;
- reload/read back required state, traces, or outputs;
- vary inputs/config/events and verify outputs or behavior change;
- click visible primary controls or run documented commands/API calls/operator actions;
- test empty/error/blocked states where possible;
- look for generic dashboard smell, fake intelligence, raw JSON dumped as the experience, placeholders, dead controls, undocumented public methods, fake adapter seams, canned output, internal/proof vocabulary, missing persistence, and absent next actions.

Fix local, safe, central defects before handover. Leave only real blockers.

## Handover contract

Handover is short and honest:

- current status;
- built surfaces;
- verification;
- known defects and blockers;
- next atomic actions.
