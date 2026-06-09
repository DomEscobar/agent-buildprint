# Patchnote - Mapper OS Promotion Notes

## 2026-06-07 - Promote downstream packet lessons into Mapper OS

### Context

An archived downstream presentation-generation packet was patched through several proof loops after generated deck-builder builds exposed repeatable quality gaps:

- vague UI direction allowed generic visual output;
- desktop screenshots could pass while the primary composition was still too narrow or visually compressed;
- mobile screenshots could exist while important controls were clipped;
- generated slide content could be structurally correct but semantically repetitive;
- long text was not stressful enough to expose editor layout failures;
- agents could satisfy broad prose while quietly dropping hard proof obligations;
- a generated app could self-report a pass without a structured critical-review repair loop.

Those fixes should not stay as one-off Presenton packet patches. Mapper OS should learn them and emit stronger executable packets by default.

### Mapper OS patch target

Patch `buildprints/buildprint-mapper-os` so every generated executable packet can inherit stronger product-quality gates when the artifact type implies a visual app, editor, generator, workflow tool, or user-facing surface.

### Required mapper changes

1. **UI decision precision**
   - `02-ui-identity.md` templates must not allow empty or vague design direction.
   - The mapper must force concrete decisions for color, style, typography, layout, density, interaction states, responsive behavior, and accessibility.
   - If source material lacks those decisions, the packet must instruct the builder to reason from product purpose, audience, workflow, and domain, then write explicit choices.
   - Missing UI direction should be a packet-quality failure, not an invitation to use generic defaults.

2. **Multi-viewport visual acceptance**
   - Visual products must require desktop and mobile proof when the workflow is expected to work responsively.
   - Screenshot existence is not enough; the packet must require screenshot inspection.
   - Failure examples to encode:
     - desktop layout masquerading as usable while too narrow or stacked;
     - text, chips, controls, icons, or primary canvas content overlapping;
     - mobile tabs, rails, toolbars, inspectors, or primary actions clipped or unreachable;
     - page-level horizontal overflow.

3. **Semantic output quality for generative products**
   - For AI/generative/editor products, Mapper OS must require useful, differentiated sample output.
   - Repeated generic body copy across generated items should fail content-specificity acceptance.
   - Deterministic fallback content is acceptable only if clearly labeled and still shaped by input controls.

4. **Stress fixtures as first-class proof**
   - Editor-like or fixed-format products must include long-title, long-body, long-provenance, long-notes, and narrow-viewport stress cases where relevant.
   - The packet should require proof that stress content does not break layout, controls, or export/readback surfaces.

5. **Repeatable generated-app proof commands**
   - Handover must name the exact generated-app commands or scripts used for build/typecheck, static checks, tests, screenshot capture, geometry/overflow checks, semantic checks, and stress checks.
   - Missing repeatable proof commands should be recorded as blockers.

6. **Critical-review-pushback phase**
   - Mapper OS should emit a `critical-review-pushback` phase for serious executable packets.
   - The phase must include:
     - a scored rubric;
     - pass threshold;
     - no-pass repair loop;
     - maximum loop count;
     - required review artifact;
     - explicit residual-risk list.
   - Recommended pass bar from the Presenton patch:
     - 10 categories, 0-5 each, total `/50`;
     - pass requires at least `42/50`;
     - no category below `4`;
     - no unresolved high-severity finding;
     - up to 5 repair loops unless explicitly told to continue.

7. **Packet regression checks**
   - Mapper OS should include or generate packet checks that fail when required quality gates are removed.
   - Mutation tests should delete individual gates and confirm the packet check rejects the degraded packet.
   - This prevents future edits from preserving section names while removing the actual acceptance bar.

### Mapper template anchors

The mapper template carries these lessons in:

- `templates/executable-packet/02-ui-identity.md`
- `templates/executable-packet/03-phases/phase-flow.md`
- `templates/executable-packet/03-phases/phase-index.yaml`
- `templates/executable-packet/03-phases/critical-review-pushback.md`

The follow-up mapper OS patch should audit whether those template changes are enough, then move the lessons into mapper policy/spec/checking so future packets inherit them automatically.

### Acceptance for the mapper OS patch

The mapper OS patch is not complete until:

- generated executable packets refuse vague UI/style/type/layout direction;
- generated visual/editor packets require desktop/mobile/stress proof where relevant;
- generated AI/generative packets require semantic specificity checks;
- serious generated packets include `critical-review-pushback`;
- handover requires repeatable proof command names and residual risks;
- mapper checks fail when those gates are removed from the packet.

### Why this matters

Mapper OS should convert observed build failures into durable packet-generation rules. Otherwise every Buildprint can be fixed locally while the mapper keeps producing packets that allow the same vague UI, shallow proof, and self-reported quality gaps.
