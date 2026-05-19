# FEATURE_SCOPE_CONTRACT

Mapper OS is capability-first. The first job of `agb map` is not to find a convenient folder; it is to discover the product feature scope that a future implementation must preserve.

## Core principle

- Features are the rebuild contract.
- Files are evidence.
- Folders are implementation clues, not product boundaries.
- Reimplementation may use different tech, architecture, storage, or UI internals when product behavior, data semantics, integration contracts, safety/privacy rules, and acceptance checks still pass.

## Required discovery outputs

A full-repo mapping must produce:

1. `FEATURE_INVENTORY.md`
   - user-visible features
   - system/background capabilities
   - integrations and external-write flows
   - data/state concepts
   - permissions, privacy, safety, and destructive/reversal semantics
   - acceptance signals per feature
   - observed evidence paths per feature

2. `PRODUCT_CAPABILITY_MAP.md`
   - capability groups/domains
   - dependencies between domains
   - user-facing vs system capabilities
   - reimplementation freedom vs compatibility requirements

3. `IMPLEMENTATION_DECOMPOSITION.md`
   - clean phase plan from feature scope to rebuild
   - foundation vs product flows vs integrations vs operational parity
   - MVP / functional / operational parity boundaries

4. `PHASE_PLAN.md`
   - executable implementation phases
   - phase goals, touched features, validation evidence, exit criteria

5. `LOOP_GATES.md`
   - objective repeat-until-safe loops
   - every loop stops only at `pass_or_blocker`
   - no vague loops such as “until production-grade”

6. `PARITY_ACCEPTANCE.md`
   - feature-level acceptance checklist
   - universal no-fake, durability, security, external-write, and handover gates

## Decomposition rule

After the feature inventory exists, decompose by product capability first. Only then map capabilities back to folders/files as evidence.

Never choose `app/`, `src/`, `packages/`, or similar folder boundaries as the product scope unless the feature inventory proves that boundary is product-complete.

## Selected extraction rule

A selected Buildprint must carry forward the relevant feature contract, not merely the selected file paths.

A scoped extraction is valid only if it can say:

- which features are included
- which feature dependencies are referenced but out of scope
- which acceptance checks prove the selected feature behavior
- which parity claims remain forbidden
