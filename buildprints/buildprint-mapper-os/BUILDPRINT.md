# BUILDPRINT: Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent executable Buildprint packet (v2 Slice/Gate shape). It is not a scanner command, a source-code clone plan, or an evidence-writing machine.

The typed direction is explicit: the packet must improve downstream artifact quality by shaping product/developer/operator judgment before coding. It must preserve source behavior, artifact type, and scope honestly, then produce a packet whose slices and gates push the coding agent to build a usable artifact instead of proof-shaped output.

## Authority

- This package is the operating Buildprint for agents performing mapping.
- `vision.md` is the maintained product-quality generator guide. It shapes selected packet `BUILDPRINT.md`, `02-project-setup.md`, `02-architecture.md`, and `03-ux-contract.md`, but it is not emitted into selected packets.
- Source files are evidence for discovery. The emitted Buildprint is an implementation input, not proof that a future implementation already works.
- Static scanning may guide discovery but must never become product authority.
- The downstream executor role is posture-aware: `trusted_local` → **Senior Product Engineer**, `private_authenticated` → **Senior Staff Engineer**, `public_webapp` → **Staff/Principal Engineer**. Preserve artifact intent, identify the central artifact/interface/boundary, build a usable loop, challenge shallow implementation, keep boundaries honest, and repair visible slop before handover.

## Read order

1. `BUILDPRINT.md` (this file)
2. `SPEC.md`
3. `CONTRACTS.md`
4. `questions.md`
5. `policies/*.md`
6. `templates/executable-packet/` (the v2 packet shape this mapper emits)
7. `templates/teams/` (capsules injected per slice)
8. `templates/runner/RUNNER-SPEC.md` (the `agb` runner contract)

## Required flow

1. **Source acquisition** — local folder or read-only Git checkout.
2. **Safe census** — file tree, manifests, dependency hints, framework hints, env-var names, scripts, deploy hints, test hints. Hints only.
3. **Behavior discovery** — read source surfaces. Separate observed behavior, inferred behavior, questions, blockers, out-of-scope.
4. **Scope selection** — discovery-only by default. Create `selected-buildprint/` only after explicit candidate, scope, or full-suite selection. Never silently shrink.
5. **Source distillation** — convert source facts into source-independent obligations: artifact type, central artifact/interface/boundary, first usable loop, deployment posture, persistence/state/readback, provider/deployment/destructive/security boundaries.
6. **Slice extraction** — break the selected scope into vertical slices. Each slice gets a `slice.yaml` with `paths:`, `core_proof_required:`, and a `persona:` reference.
7. **Gate selection** — activate horizontal gates per posture in `gates/gate-index.yaml`.
8. **Execution shaping** — emit `BUILDPRINT.md`, `02-architecture.md`, `03-ux-contract.md`, `blueprint.yaml`, `slices/`, `gates/`, and `04-handover.md` per the v2 contract.
9. **Qualification** — keep claims honest. A packet can be a strong implementation input without claiming validated production completeness.

## Output modes

### Broad discovery

Default. Discovery, notes, and candidate summaries only. Must not emit a selected packet.

### Selected extraction

Creates `selected-buildprint/` with the v2 packet shape (see `SPEC.md`). Preserve the selected scope and name any blockers or assumptions.

### Full-suite extraction

Hierarchical `selected-buildprint/` for the complete feature suite, only when explicitly requested. Full-suite is user intent, not proof of completeness.

### Qualified Buildprint

Promoted only when the selected package is source-independent, behavior-complete for the selected scope, structurally valid, free of critical product-review findings, and safe to hand to another coding agent without source access.

## Selected package shape (v2)

Every selected output uses the v2 Slice/Gate shape:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
02-architecture.md
03-ux-contract.md
blueprint.yaml
slices/
  <id>/
    slice.yaml
    build-brief.md
    acceptance-spec.md
gates/
  gate-index.yaml
  <gate>.md
04-handover.md
```

The packet ships alongside the team capsules under `templates/teams/` and is operated by `bin/agb.js`. Selected packets must declare `qualification_label: local_build_requires_review` (or stronger) in `blueprint.yaml`. Public wording must derive from that label. Do not claim validated, production-ready, complete, or end-to-end status unless an actual downstream implementation has been built and reviewed.

## Anti-fabrication mechanics

The packet enforces these mechanics so the downstream agent cannot self-certify:

1. **Derived state.** `state.json` is written only by `agb state derive`. Drift check rejects any other writer.
2. **Builder/reviewer split.** Acceptance loads `agb persona --role acceptance` (the `acceptance-hostile-reviewer` capsule) in a fresh session.
3. **Single truth for paths.** `03-ux-contract.md` Path Map is the only source for path ids; slices reference, never invent.
4. **Mechanical tripwires.** `agb drift check` flags state self-write, stale contract version, untraceable path ids, fake-provider patterns, plaintext secrets.
5. **Physical signoffs.** Gates with `requires_human_signoff: true` require a non-agent `signoff_by` value.
6. **Versioning.** Every `acceptance-result.json` carries a `contract_version` hash of `03-ux-contract.md`. Mismatch → slice marked `stale`.
7. **Persona injection.** Every slice session is opened with the output of `agb persona --slice <path> --role build|acceptance`, which is the contents of a capsule from `templates/teams/`.

## Mode discipline

Selected outputs must classify the dominant blueprint mode before writing setup or slices. Use one of: `product`, `framework`, `library`, `integration`, `automation`, `data-pipeline`, `infrastructure`, or `mixed`. Do not force every mode into product-app UI language. The invariant is product-quality implementation for the consumer/operator, not always a web app.

## Non-negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless an actual implementation has been built, reviewed, and remaining blockers are named.

## Downstream contract

Every selected package must tell the next coding agent:

- what product promise and central artifact matter;
- what first usable loop to build;
- what state must persist or be read back;
- which posture-specific operability controls are mandatory now vs explicitly blocked (gates);
- which provider/deployment/destructive/security boundaries are blocked or local-only;
- which implementation choices are free;
- which questions change implementation and which can be defaulted;
- which slice to implement next, and which `core_proof_required` paths it must observe end-to-end;
- which local checks and manual/browser review to run;
- which visible slop and fake-done shortcuts are forbidden;
- when to stop, repair, or escalate;
- how to write a concise handover.
