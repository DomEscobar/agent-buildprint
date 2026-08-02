# CONTRACTS: Buildprint Mapper

## Root contract

Buildprint Mapper maps source projects into source-independent Buildprints. It must preserve product scope, observable behavior, artifact type, runtime boundaries, state/readback expectations, provider constraints, design responsibilities, and proof obligations without requiring the downstream builder to open the original source.

## Selected packet contract

A selected packet must contain:

```text
BUILDPRINT.md
00-goal.md
01-setup.md
02-identity.md
blueprint.yaml
loops/
  loop-index.yaml
  loop-flow.md
  <loop>.md
review.md
README.md
HANDOVER.md
```

Schema: `buildprint/kernel/v1`. Style: `kernel_loop`.

## Builder briefing contract

`BUILDPRINT.md` is only the AI-builder briefing and read-order entrypoint. It must:

- introduce the builder’s role and responsibility;
- demand perfection alignment, honest proof, and fake-success rejection;
- state the kernel: goal → bare agentic loop → optional independent fan-out → contract review;
- list the required read order;
- avoid product-specific details, mapped source names, old repo names, dependency names, golden path prose, and implementation contract specifics.

## Product contract location

Product identity, artifact shape, central interface, golden path, runtime posture, provider constraints, state/readback expectations, and source-distilled specifics belong in `blueprint.yaml`, `00-goal.md`, `01-setup.md`, `02-identity.md`, and loop objectives — not in `BUILDPRINT.md`.

## Local skill harness contract

Setup must initialize a project-local Buildprint skill harness before loop work. `blueprint.yaml` declares `harness.provider` and `harness.profiles`. Default provider `agents`: root `AGENTS.md`, core skills `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review` under `.agents/skills/`. Optional profiles: `webapp`, `backend`, `agentic`, `full`. Skills declare triggers, skips, and completion signals. No silent global installs or third-party skill pack copies.

`subagent-driven-implementation` means independent fan-out with clean ownership. `verify-and-review` means proof plus preparation for independent contract review — not phase-paperwork completion.

## Central output contract

Every selected packet must identify central output, primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim gates in `blueprint.yaml` plus Markdown guidance. Output existence is not enough.

## Proven implementation requirements contract

When source evidence shows hard domains (fixed-format export, rich editing, document extraction, drag/canvas, charts, frontend UI runtime, providers, jobs, migrations, storage, etc.), `blueprint.yaml` must include `proven_implementation_requirements` with proven tool categories or equal proof. Route package choices into `01-setup.md` and `docs/architecture.md` when selected.

## Identity contract

`02-identity.md` is mandatory. For UI-bearing artifacts it must open with UX-must-matter language and define metaphor, dominant object, primary gesture, thesis, tokens, typography, layout, components, states, and anti-generic rules. For non-UI artifacts it must say `not-ui-bearing` and define operator/developer experience with equivalent specificity.

## Loop contract

Each loop file must include:

- `How to implement this loop`
- `Building objective`
- `DO NOT`
- `Minimum proof before moving on`
- `Handoff note`

The Building objective must be comprehensive and product-specific. UI-bearing loops keep `02-identity.md` as standing design responsibility.

## Review contract

`review.md` requires a fresh-context reviewer (separate subagent or session) that did not implement the artifact. Inputs: `00-goal.md`, active loop contract(s), diff/proof. Builder rationale and chat are excluded. Self-review is `REVIEW_INVALID`. Pass means the goal and acceptance criteria are met or blockers are honest. Do not require evidence ledgers or claim-gates JSON products.

## Machine contract

`blueprint.yaml` routes files and declares policy. It must not become the implementation manual.

## Validation contract

`agb packet check` must reject:

- obsolete v2 structures;
- obsolete v3 phase spines (`03-phases/`, `phase_driven_comprehensive*`) as selected live packets;
- evidence-ledger / claim-gates-JSON verification products as required shape;
- missing kernel files;
- generated prompt/handoff files as packet authority;
- product-specific leakage in `BUILDPRINT.md`;
- missing UX-must-matter preface when UI-bearing;
- loop files missing required headings or identity responsibility when UI-bearing;
- loop index references to missing files;
- missing central output quality contracts;
- missing independent `review.md`;
- missing proven implementation requirements for hard technical domains when applicable;
- placeholder/fake-success leakage outside Mapper templates.

## Completion contract

Packet structure never proves product completion. Final review keeps `loop_core_passed` separate from `claim_qualified`. A loop-local proof can pass while the product claim remains unqualified because proof, hard-stop decisions, provider evidence, or independent review is incomplete.
