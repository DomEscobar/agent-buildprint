# Apply: design-quality-lift

How to apply this buildprint to a host. The applying agent must follow the protocol below in order.

## Apply checklist

The applying agent must complete these steps in order. Skipping a step is a hard gate violation.

### Step 1: Confirm host assessment

Read `.buildprint/host-assessment.md` (produced in `00-host-assessment.md` protocol). If it does not exist, run the host assessment protocol first.

Hard gate: if the host assessment is missing or incomplete, stop and ask the user.

### Step 2: Confirm direction lock

Read `.buildprint/design-direction.yaml` (produced in `00-assessment-questions.md` protocol). The file must contain:

- `direction`: one of the 5 v1 direction profiles or a custom direction
- `three_dials`: DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY
- `visual_risk_budget`: list of allowed rule breaks
- `typography_pairing`: from the approved list in `capability.yaml`
- `icon_library`: from the approved list per direction
- `three_d_role`: forbidden / optional / recommended / required

Hard gate: if any field is missing, stop and ask the user.

### Step 3: Confirm integration plan

Read `.buildprint/capability-plan.md` (produced in `01-integration-plan.md` protocol). The plan must map all 5 phases to concrete tasks with owners and proof artifacts.

Hard gate: if any phase is missing or has no proof artifact, stop.

### Step 4: Confirm 3rd-party path decision

Read `proposed_integration_paths.decision` in `capability.yaml`. Default is `deferred` (self-contained). If a path is adopted, the adapter boundary must be documented in `.buildprint/capability-plan.md`.

Hard gate: if a path is adopted but the adapter boundary is not documented, stop.

### Step 5: Run each phase in order

For each of the 5 phases, follow the phase file in `02-implementation-phases/` in order:

1. `00-host-assessment.md`
2. `00-assessment-questions.md`
3. `01-integration-plan.md`
4. `02-implementation-phases/01-contract-and-config.md`
5. `02-implementation-phases/02-core-integration.md`
6. `02-implementation-phases/03-host-wiring.md`
7. `02-implementation-phases/04-user-operator-surface.md`
8. `02-implementation-phases/05-verification-and-receipt.md`
9. `verify.md`
10. `capability-receipt.md`

Each phase has its own objective, instructions, and proof gate. The applying agent may not skip or merge phases. Do not redesign the whole product without direction lock. Changes are bounded to visual quality lift only.

### Step 6: Verify

Run `verify.md` to check all gates pass. The verify file lists the gates and the proof required for each.

### Step 7: Write the receipt

Write `.buildprint/design-quality-lift-receipt.md` with all required outputs from `capability.yaml → receipt.required_outputs`.

Hard gate: if any required output is missing, the lift is not installed.

## Safety rule

The apply protocol is a phased capability grafting protocol. It is not a whole-product phase plan. Do not use it to build a new product. Use it to upgrade an existing app.

If at any step the applying agent encounters a destructive operation, a high-risk change, or a user decision that was not captured in the host assessment, stop and ask.

## Host assessment is a hard gate

Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes production-critical flows, destructive UI replacements, color or motion token migrations, accessibility target, or proof level, stop and ask before source edits.

## Direction lock is a hard gate

If the user wants to change direction mid-apply, stop and re-run the assessment questions. Do not silently change direction — the receipt, visual risk budget, and signature moment all depend on the locked direction.

## Integration path discovery

The list of proposed 3rd-party integration paths is in `capability.yaml` under `proposed_integration_paths`. Discovery questions for each path are in `00-assessment-questions.md` under "3rd-Party Integration Discovery". After host assessment and before integration plan, the applying agent must:

- read the proposed paths and decision questions
- ask the discovery questions relevant to this host
- record the decision in `.buildprint/capability-plan.md` under "Integration Path Decision"
- keep the default `deferred` if no path answers are confirmed
- if a path is adopted, document the adapter boundary and update the receipt schema to record adapter presence/absence/version

Any adopted path must run behind the existing deterministic gates. Model-judge or visual-judge scores may never override visual proof gates.

## DO NOT

- Do not produce code without a locked direction.
- Do not skip phases.
- Do not assume a default direction.
- Do not claim a phase is complete before its proof artifact exists.
- Do not change direction silently.
- Do not bypass the receipt.
- Do not produce banned defaults (LLM-default typography, AI-purple gradients, hand-rolled SVGs, generic friendly microcopy, infinite-loop animations on common UI).
