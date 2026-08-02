# Quality Policy

Buildprint Mapper quality is judged by whether a downstream AI builder can hit the goal with a real loop, honest fan-out, and contract review — without guessing, shrinking scope, losing design responsibility, or shipping fake success.

## Invariants

- Preserve artifact identity and golden path before file structure.
- Preserve observable behavior, not source internals for their own sake.
- Preserve the central output quality bar, not only that an output exists.
- Keep selected `BUILDPRINT.md` generic: AI-builder role, responsibility, perfection alignment, read order; no product-specific mapped-source details.
- Put product contract facts in `blueprint.yaml`, `00-goal.md`, `01-setup.md`, `02-identity.md` (when UI-bearing), and loop objectives.
- YAML routes; Markdown teaches/builds.
- Loop files are comprehensive product objectives, not mini schemas or phase paperwork.
- Default execution is the kernel: goal → bare agentic loop → optional independent fan-out → contract review.
- Setup creates enough architecture to run plus the local skill harness before identity or loop work. Default harness: `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review`. Optional profiles only when needed: `webapp`, `backend`, `agentic`, `full`.
- `02-identity.md` is mandatory for UI-bearing artifacts; for non-UI artifacts say `not-ui-bearing` and define operator/developer experience.
- Claims stay conservative until the built product path is verified against the goal.
- Separate `loop_core_passed` from `claim_qualified`: a loop can prove its local path while the final product claim remains blocked by missing proof or failed independent review.
- Production maturity upgrades (harness receipts, budgets, swarm ledgers, trust zones) are optional and claim-gated — never required for first successful loop.

## Anti-slop requirements

Selected packets must explicitly reject:

- placeholders and lorem ipsum;
- functionless buttons, inert tabs, dead navigation, or swallowed errors;
- mocked/sample data counted as live/operator proof;
- fake provider success when credentials/runtime/network did not run;
- raw JSON as the main user experience when a product surface is required;
- generic dashboards that name capabilities but implement no loop;
- technically input-derived output that remains domain-generic, interchangeable, or useless;
- polished shells whose central artifact could fit unrelated inputs with superficial text swaps;
- confusing/generic/ugly UI treated as finished product;
- weak UI moodboards with only phrases like “clean, modern, intuitive”;
- completion from prose, screenshots alone, or unchecked happy paths;
- self-certifying done without independent contract review;
- evidence-ledger bureaucracy or claim-gates JSON products as the verification surface;
- phase-driven comprehensive / `03-phases/` spines as the selected packet shape.

## Identity quality bar

For UI-bearing artifacts, `02-identity.md` must open with UX importance, then define product metaphor, dominant object, primary gesture, design thesis, style direction, color tokens, typography, layout, component language, states, and anti-generic rules. If the identity could fit ten unrelated products unchanged, it is too generic.

Generated `docs/DESIGN.md` should be a construction contract (tokens, type scale, layout, components, states) when UI ships — not a moodboard. Screenshot or runtime proof must support major claims; prose alone does not qualify the product.

If the source lacks style direction, force a decision protocol: choose and reject directions from product purpose, then build. Do not compensate with silhouette essays or evidence binders as the main work.

## Loop quality bar

Every loop must name a concrete building objective, context to read, identity responsibility when UI-bearing, forbidden shortcuts, proof before moving on, and handoff facts. A loop can stop on a real blocker, but it cannot pass from edits alone.

## Output quality bar

Every selected packet must define the central output contract: central output, primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim gates. Missing these lets agents build something structurally correct but semantically weak.

## Proven implementation requirements

Name source-derived hard domains that should not be casually hand-rolled. Keep packets stack-neutral while requiring proven libraries/SDKs/runtimes or equal proof. Missing package/runtime proof becomes a blocker or claim ceiling — not permission for a shallow substitute.

## Architecture quality bar

Setup must produce enough architecture to run and extend: main modules, seams, env/commands, and coding standards enforcement (lint/typecheck). Do not require Mermaid gardens, anti-lazy score theater, or full scalability treatises before the first loop. Name seams that matter; deepen architecture when loops demand it.

For UI-bearing artifacts, record framework and styling decisions in `docs/architecture.md` with rejected alternatives when choices are made.

## Typed proof bar

Select proof by artifact type; do not spray every gate everywhere.

- UI: screenshot/browser inspection of the real path when surfaces exist
- Responsive: desktop and mobile when users operate there
- Generative: output-specificity against the central output contract
- Integration/CLI/service: install/configure/first-action and failure honesty

Mark irrelevant proof as not applicable. Handover names what ran, what failed, and what remains unproven.

## Review stance

Independent fresh-context review against `00-goal.md` and the active loop contract is mandatory. Inputs: goal, loop contract, diff/proof. Not the builder’s chat. Self-graded reviews are invalid. Structure checkers are smoke alarms; product quality is enforced by hostile contract review plus direct runtime/browser/API checks.

Do not invent a second evidence product (ledgers, dozens of typed records, claim-gates JSON schemas) as the review surface. Pass or fail the contract; record blockers honestly.

## Decisions hard-stop

Before loop work begins, hard-stop answers from `00-goal.md` must be confirmed or blocked in `.buildprint/decisions.md`. Building with an empty stub is a setup failure.

## Pass requirement

Final PASS requires:

- **Track A** — runtime/proof: real path or honest blocker; independent reviewer
- **Track B** — product/UI when applicable: no raw JSON-as-UX, no dead controls, identity respected
- **Track C** — decisions/honesty: hard stops filled; no scope-presentation mismatch

A review may not pass by clearing only one track while others remain open.
