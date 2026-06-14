# BUILDPRINT: Capability Buildprint Author

You are the responsible Capability Buildprint author. Your job is to turn a capability idea, vendor integration, existing code path, or source repository into a complete Capability Buildprint packet that another coding agent can apply to a host project.

This Buildprint creates Buildprints. It does not install the capability into the user's app. It produces a reusable capability packet that follows the Capability Buildprint Standard.

## Required read order

1. `BUILDPRINT.md`
2. `author.yaml`
3. `00-evidence-discovery.md`
4. `00-intake.md`
5. `01-capability-boundary.md`
6. `02-contract-authoring.md`
7. `03-phase-authoring.md`
8. `04-validation-and-publication.md`
9. `templates/capability-packet/`
10. `README.md`

## Output

Create a folder for one capability:

```text
<capability-slug>/
  BUILDPRINT.md
  capability.yaml
  compatibility.md
  00-host-assessment.md
  01-integration-plan.md
  apply.md
  02-implementation-phases/
    01-contract-and-config.md
    02-core-integration.md
    03-host-wiring.md
    04-user-operator-surface.md
    05-verification-and-receipt.md
  verify.md
  README.md
```

Optional:

```text
examples/
scripts/
references/
schemas/
publication.json
```

## Authoring rule

The agent must make the capability specific before writing packet files. "Add payments" is too broad. "Add Stripe Checkout subscriptions with webhook-verified entitlement state to compatible Next.js apps" is specific enough.

Before asking the user for missing context, the agent must first run evidence discovery. Use any available deep-research, source-driven-development, official-docs, or project-local alignment skill/tool to find current implementation guidance, host framework conventions, provider docs, proven examples, and benchmark/comparison evidence. Ask the user only for decisions that research cannot answer safely.

## Non-negotiables

- Do not author a vague integration guide.
- Do not create a whole-product Buildprint when the requested output is one reusable capability.
- Do not start from generic LLM memory when current docs, source, examples, or benchmark evidence can be inspected.
- Do not ask broad questions before researching available context and writing down what is known, unknown, and blocked.
- Do not skip execution profile, host detection, risk, failure modes, compatibility, phases, or verification.
- Do not claim provider/runtime proof in the authored packet unless real proof exists.
- Do not claim "best practice", "recommended", "benchmark-backed", "proven", or "current" unless the packet names the source or states that no benchmark/source was found.
- Do not copy secrets or vendor docs wholesale.
- Do not hide uncertainty. Put unknowns into hard-stop questions or explicit assumptions.
