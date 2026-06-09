# CONTRACTS: Buildprint Mapper OS

## Root contract

Mapper OS maps source projects into source-independent Buildprints. It must preserve product scope, observable behavior, artifact type, runtime boundaries, state/readback expectations, provider constraints, design responsibilities, and proof obligations without requiring the downstream builder to open the original source.

## Selected packet contract

A selected packet must contain:

```text
BUILDPRINT.md
00-questions.md
01-project-setup.md
02-ui-identity.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  <phase>.md
README.md
HANDOVER.md
```

## Builder briefing contract

`BUILDPRINT.md` is only the AI-builder briefing and read-order entrypoint. It must:

- introduce the builder’s role and responsibility;
- demand perfection alignment, honest proof, and fake-success rejection;
- list the required read order;
- avoid product-specific details, mapped source names, old repo names, old product names, dependency names, golden path prose, and implementation contract specifics.

If product identity appears in `BUILDPRINT.md`, the packet has mixed responsibilities.

## Product contract location

Product identity, artifact shape, central interface, golden path, runtime posture, provider/runtime constraints, state/readback expectations, and source-distilled product specifics belong in `blueprint.yaml`, `01-project-setup.md`, `02-ui-identity.md`, and the phase objectives — not in `BUILDPRINT.md`.

`blueprint.yaml` is the machine-readable mirror. It routes and declares concise product contract facts. It must not become a full implementation manual.

## Local skill harness contract

Project setup must initialize a project-local Buildprint skill harness before phase work. `blueprint.yaml` declares the selected `harness.provider` and `harness.profiles`, and `.buildprint/next-agent.md` carries those values into `agb harness init`. The default provider is `agents`: it patches or creates root `AGENTS.md`, writes Buildprint-native local core skills for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`, and places them only in `.agents/skills/`. Provider-specific folders such as `.claude/skills/`, `.cline/skills/`, or `.cursor/rules/` require explicit, evidence-backed provider selection. Optional profiles add focused skills only when the artifact needs them: `webapp`, `backend`, `agentic`, or `full`. Every skill must declare trigger/skip boundaries and a completion signal. The harness must not silently install global skills or copy third-party skill packs.

## Central output contract

Every selected packet must identify the artifact's central output and the minimum quality bar for that output. This belongs in `blueprint.yaml` as concise machine-readable routing and in Markdown as buildable guidance.

The mapper must extract, from source evidence and product behavior:

- the central output the user/operator actually values;
- the output primitives or units that compose it;
- the quality signals that make it useful, credible, publishable, actionable, correct, or otherwise domain-appropriate;
- the generic-output failure modes that would look plausible but fail the product;
- reviewer acceptance questions that a skeptical human can use after one real example path;
- claim gates that must remain blocked until the output quality is proven.

Output existence is not enough. Input-derived output is not enough. A selected packet must reject technically generated but domain-generic results.

## Proven implementation requirements contract

Some mapped products depend on hard technical domains that should not be casually hand-rolled. Mapper OS must preserve those as product requirements without making the selected packet stack-fixed.

When source evidence shows fixed-format export, rich editing, document extraction, drag/reorder/canvas interactions, charts/diagrams/visual primitives, provider SDKs/OAuth/webhooks/external APIs, long-running jobs, queues, migrations, durable storage, or similar specialized domains, the selected `blueprint.yaml` must include `proven_implementation_requirements`.

That section must name source-derived hard domains, require a proven library/SDK/runtime/platform service or equivalent tool category for each applicable domain, keep implementation choices stack-neutral unless source evidence makes a specific stack part of product behavior, allow from-scratch alternatives only with explicit justification and proof equal to the proven-tool path, and route selected package/runtime decisions into `01-project-setup.md` and `docs/architecture.md`.

## UI identity contract

`02-ui-identity.md` is mandatory for every UI-bearing artifact and must be detailed enough to guide later implementation without guessing. It must:

- open by saying UX is a must and that confusing/generic/ugly UI is not finished product;
- load the local `frontend-ui-product-design` skill and relevant references created by setup;
- define design thesis, style direction, color system, typography, layout rhythm, screen-state contract, component language, motion, states, anti-generic rules, and phase obligation;
- tell every later phase to preserve the style schema.

For non-UI artifacts, it must explicitly say `not-ui-bearing` and define the developer/operator experience with equivalent specificity.

When the source provides no precise visual direction, the mapper must not leave blanks for the implementation agent. The packet must require an autonomous design decision before UI work: choose style direction, color tokens, typography scale, layout model, component language, responsive behavior, and state treatment from the artifact type and user workflow. Vague adjectives are not a valid contract.

## Typed proof contract

The mapper must select proof obligations that fit the artifact instead of forcing one generic proof list:

- UI-bearing artifacts: screenshot/browser inspection of the real path, interaction-state proof, no-overlap/no-clipping/no-horizontal-overflow checks when practical, and accessibility/focus sanity.
- Responsive artifacts: desktop and mobile proof, or an explicit reason the artifact is single-viewport.
- Editable or fixed-format artifacts: fixed-surface framing, long-content stress fixtures, edit/readback proof, and detail/control reachability.
- AI/generative artifacts: central output specificity proof, repeated-generic-output rejection, provider/blocker honesty, and sample output review against the output contract.
- Integration/plugin/service/CLI artifacts: install/configure/first-action proof, idempotency/retry/failure proof, operator logs/errors, and audit/recovery proof.

Selected packets should put concise routing facts in `blueprint.yaml`, buildable proof setup in `01-project-setup.md`, UI/UX identity and screen-state decisions in `02-ui-identity.md`, phase-specific inspection in phase objectives, the product/operator-facing overview in `README.md`, and final evidence fields in `HANDOVER.md`.

## Product README contract

Every selected packet must include a root `README.md` that reads like the finished product's public/operator-facing README, not a Buildprint explanation. The final implementation phase must update it after verification so it reflects the artifact that actually exists.

The README must include:

- the product name and one concise product promise;
- version/status badges, including at minimum product version, build/check status, license, runtime, and qualification/status;
- a feature section explaining what the artifact does for its user or operator;
- a requirements section naming only real user/operator prerequisites: required runtimes/CLIs, provider/API keys, database/storage/export services, OAuth/webhook/deployment credentials, and external service accounts needed by enabled features;
- an environment/provider keys section with exact variable names from `.env.example`, blank secret examples only, and honest notes for optional, required, blocked, or live-proof-only providers;
- a quick start section with install, configure, run, test/check, and first-use commands;
- a verification or proof section listing the commands and manual surface checks that were actually run;
- a limitations/blockers section that matches `HANDOVER.md` and does not claim live provider, deployment, security, or production readiness without proof.

Do not describe Mapper OS, the source repository, or the Buildprint packet as the main subject of the selected product README.

## Phase contract

Each phase file must include:

- `How to implement this phase`
- `Building objective`
- `DO NOT`
- `Minimum proof before moving on`
- `Handoff note`

The `Building objective` must be comprehensive and product-specific. It should read like a senior product-engineering assignment, not a decomposed schema or checklist fragment. Every phase must read `02-ui-identity.md` as standing comprehension, user-language, and visual identity responsibility for UI-bearing artifacts, even when the phase is runtime, data, report, verification, or backend work.

## Machine contract

`blueprint.yaml` routes files and declares policy. It must not become implementation guidance. Implementation guidance belongs in Markdown.

## Validation contract

`agb packet check` must reject:

- obsolete v2 structures;
- obsolete selected packet filenames;
- missing selected product README.md;
- generated prompt/handoff files as packet authority;
- product-specific or mapped-source leakage in `BUILDPRINT.md`;
- missing UX-must-matter preface/checklist in `02-ui-identity.md`;
- weak/generic UI UI identitys;
- phase files that do not read `02-ui-identity.md`;
- tiny or missing phase objectives;
- missing required phase headings;
- phase index references to missing files;
- placeholder/fake-success leakage outside Mapper templates.
- missing central output quality contracts in selected packets.
- missing selected proof obligations for obvious visual, responsive, editor, generative, or integration artifact types.
- missing critical-review-pushback phase in serious executable packets.
- missing proven implementation requirements for hard technical domains, or setup guidance that fails to route selected library/runtime decisions into architecture.

## Completion contract

A downstream implementation can only claim done when the real product path is checked. Packet structure alone never proves product completion.
