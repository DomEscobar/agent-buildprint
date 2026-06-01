# BUILDPRINT: Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent Buildprint. It is not a scanner command, a source-code clone plan, or an evidence-writing machine.

The typed direction is now explicit: Mapper OS should improve downstream artifact quality by shaping product/developer/operator judgment before coding. It should preserve source behavior, artifact type, and scope honestly, then produce a packet that makes a coding agent build a usable artifact-type slice instead of a proof-looking artifact.

## Authority

- `mapper-os-requirement.md` is the root product requirement when present.
- This package is the operating Buildprint for agents performing mapping.
- `vision.md` is the maintained product-quality generator guide. It shapes selected packet `BUILDPRINT.md`, `02-project-setup.md`, and phase language, but it is not emitted into selected packets.
- Source files are evidence for discovery. The emitted Buildprint is an implementation input, not proof that a future implementation already works.
- Static scanning may guide discovery but must never become product authority.
- The downstream executor role is **Senior Product/Developer/Operator Engineer**: preserve artifact intent, identify the central artifact/interface/boundary, choose the right type spine, build a usable loop, challenge shallow implementation, keep boundaries honest, and repair visible slop before handover.

## Read order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `questions.md`
6. `policies/*.md`
7. `prompts/*.md` and `templates/`

For generated selected packages, first classify the artifact type and consumer, then do not make the implementing agent read every Markdown file or every phase before it knows the next action. `BUILDPRINT.md` is the execution start, `blueprint.yaml` is the machine contract, `01-questions.md` and `02-project-setup.md` gate alignment/setup, `03-phases/phase-index.yaml` names the active phase, `03-phases/phase-flow.md` owns phase work, `04-review.md` owns skeptical product review, and `05-handover.md` owns concise handoff.

## Required flow

1. **Source acquisition** — use a local folder or clone/check out a Git URL into a temporary read-only source checkout.
2. **Safe census** — collect file tree, manifests, dependency hints, framework hints, env var names, scripts, deploy hints, and test hints as hints only.
3. **Behavior discovery** — read source surfaces to discover observable product behavior. Separate observed behavior, inferred behavior, questions, blockers, and out-of-scope details.
4. **Scope selection** — keep default output discovery-only. Create `selected-buildprint/` only after candidate, scope, or full-suite selection. Never shrink selected scope without an explicit user decision.
5. **Source distillation** — convert source facts into source-independent mode-appropriate obligations, central artifacts/interfaces/boundaries, first loops, boundaries, and phase slices.
6. **Execution shaping** — give the downstream coding agent product mission, alignment questions, implementation setup, usable phase slices, forbidden shortcuts, review behavior, and handover shape.
7. **Qualification** — keep claims honest. A packet can be a strong local implementation input without claiming validated production completeness.

## Output modes

### Lean discovery

Default mode. It may produce discovery, notes, and candidate summaries only. It must not emit implementation scaffold or selected package files.

### Selected extraction

Creates `selected-buildprint/` with a small or medium package for the chosen behavior set. It must preserve the selected scope and name any blockers or assumptions.

### Full-suite extraction

Creates a hierarchical `selected-buildprint/` for the complete feature suite only when explicitly requested. Full-suite is user intent, not proof of completeness.

### Qualified Buildprint

Promoted only when the selected package is source-independent, behavior-complete for the selected scope, structurally valid, free of critical product-review findings, and safe to hand to another coding agent without source access.

## Selected package shape

Selected outputs must use executable Buildprint shape:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase-id>.md
  ...
  99-final-review-handover.md
04-review.md
05-handover.md
generated/
  agent-prompt.md
```

`generated/agent-prompt.md` is alignment speech, not source authority.

Selected packets must expose a status label in `blueprint.yaml`, normally `qualification_label: local_build_requires_review` or `claim_status: product_build_required`. Public wording must derive from that label. Do not claim validated, production-ready, complete, fully working, or end-to-end status unless a real downstream implementation has been built and reviewed.

The packet shape above is mandatory. Output without `blueprint.yaml`, `01-questions.md`, `02-project-setup.md`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, at least one phase Markdown file, `04-review.md`, or `05-handover.md` is invalid.

Obsolete packet files are forbidden in selected output: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and fragmented mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`.

`02-project-setup.md` is mandatory. It should align the coding agent around role, artifact type, real consumer, first success loop, central artifact/interface/boundary, persistence/traces/readback, provider/deployment boundaries, fake-feel risks, local commands, quality rules, and forbidden shortcuts. It should not become a long architecture/proof encyclopedia.

## Mode discipline

Selected outputs must classify the dominant blueprint mode before writing setup or phases. Use one of eight values when relevant:

| Mode | `blueprint_mode.primary` | Typical phase emphasis |
|---|---|---|
| Product | `product` | Buildprint v4 Consumer-First: product-system alignment, shell/navigation, core loop, feature slices, state/data, domain/intelligence, design/copy, architecture garden, verification |
| Framework | `framework` | Developer-First: adoption, primitives, composition, extension points, misuse |
| Library | `library` | Developer-First: callable API, examples, compatibility, error behavior |
| Integration | `integration` | Developer-First: boundary transaction, sandbox/live split, retries/errors |
| Automation | `automation` | task loop, approval point, stop conditions, trace |
| Data-pipeline | `data-pipeline` | schemas, transform stages, lineage, quality |
| Infrastructure | `infrastructure` | deploy/apply, health, rollback, drift |
| Mixed | `mixed` | per-phase concrete mode |

Do not force every mode into product-app UI language. The invariant is product-quality implementation for the consumer/operator, not always a web app.

## Non-negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless an actual implementation has been built, reviewed, and the remaining blockers are named.

## Downstream contract

Every selected package must tell the next coding agent:

- what product promise and central artifact matter;
- what first usable loop to build;
- what state must persist or be read back;
- what provider/deployment/destructive/security boundaries are blocked or local-only;
- what implementation choices are free;
- which questions change implementation and which can be defaulted;
- what phase to implement next;
- what local checks and manual/browser review to run;
- what visible slop and fake-done shortcuts are forbidden;
- when to stop, repair, or escalate;
- how to write a concise handover.
