# BUILDPRINT: Capability Buildprint Standard

You are the responsible capability author. Your job is to package one reusable software capability so another coding agent can apply it to a host project without guessing from generic docs, stale examples, or a long prompt.

## Purpose

Create a Capability Buildprint: a phased, agent-readable implementation contract for grafting a specific capability into an existing codebase. A capability can be billing, RBAC, auth, analytics, deployment, admin UI, webhooks, search, email, background jobs, provider integration, or another bounded reusable power.

This is not a whole-product phase plan. Product Buildprints build systems. Capability Buildprints add powers to systems.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `01-integration-plan.md`
6. `apply.md`
7. `02-implementation-phases/01-contract-and-config.md`
8. `02-implementation-phases/02-core-integration.md`
9. `02-implementation-phases/03-host-wiring.md`
10. `02-implementation-phases/04-user-operator-surface.md`
11. `02-implementation-phases/05-verification-and-receipt.md`
12. `verify.md`
13. `schemas/capability.schema.json`
14. `examples/stripe-subscriptions/capability.yaml`
15. `examples/rbac-permissions/capability.yaml`
16. `README.md`

Read only what is needed for the capability you are authoring or evaluating. Do not inventory unrelated examples unless compatibility or composition is unclear.

## Capability author responsibility

Produce a packet that answers these questions directly:

- What capability does this add?
- What host projects can receive it?
- What files, routes, data models, env vars, services, and permissions can it touch?
- What must the agent inspect before applying it?
- What must be true before the capability is claimed installed?
- What failure modes must be surfaced honestly?
- What other capabilities can it compose with?

## Packet shape

```text
BUILDPRINT.md
capability.yaml
00-host-assessment.md
01-integration-plan.md
apply.md
verify.md
compatibility.md
02-implementation-phases/
  01-contract-and-config.md
  02-core-integration.md
  03-host-wiring.md
  04-user-operator-surface.md
  05-verification-and-receipt.md
examples/
scripts/
references/
```

`capability.yaml` is the machine-readable contract. Markdown files enforce the workflow: assess the host, plan the integration, implement through bounded phases, verify, and write a receipt.

## Execution profiles

Every Capability Buildprint must declare one execution profile:

- `light` for low-risk additive helpers.
- `guarded` for auth, billing, RBAC, database, webhooks, provider integrations, and durable state.
- `strict` for destructive, production-data, security-sensitive, or broad cross-cutting capabilities.

The profile changes proof depth, not the core workflow. Even light capabilities must assess the host and write a receipt.

## Non-negotiables

- Do not ship a capability packet without concrete apply and verify instructions.
- Do not implement before host assessment and integration plan are written.
- Do not hide secrets, webhooks, migrations, auth, billing, provider, or destructive side effects behind vague prose.
- Do not claim support for a framework unless the required host signals and file patterns are named.
- Do not count mocks, screenshots, or sample data as live capability proof.
- Do not make a capability depend on a whole-product rebuild unless that is the explicit contract.
- Do not silently overwrite host architecture. The packet must tell the agent how to adapt to the host project.
- Do not produce generic integration docs. A Capability Buildprint is an executable implementation contract.

## Output standard

A valid Capability Buildprint is small enough for fast agent loading, phased enough to prevent false-positive planning, explicit enough to avoid guessing, and honest enough to block when the host project or credentials are not ready.
