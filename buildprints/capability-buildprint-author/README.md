# Buildprint Creator

This Buildprint helps an agent classify what kind of Buildprint is needed, then create new Capability Buildprints using the Capability Buildprint Standard when the request is a reusable capability.

Use it when you have a product idea, capability idea, existing integration, vendor docs, or source code and need the agent to decide whether to route to a greenfield product Buildprint or create a reusable agent-installable capability packet.

It classifies first:

- greenfield product/app/SaaS/site/dashboard/internal tool -> Product Buildprint / Buildprint Mapper handoff
- one reusable graft into existing apps -> Capability Buildprint authoring
- ambiguous -> one narrow classifier question before deepsearch

It must not author from model memory alone. When context is incomplete, the authoring agent first runs internet deepsearch to choose the best current technique: official docs, source examples, maintained templates, relevant skills/alignment workflows, and benchmark/comparison evidence when available. It records selected and rejected techniques, confidence, and source basis before asking narrow hard-stop questions.

## Output

A completed Capability Buildprint folder with:

- canonical start
- product/capability classifier result
- evidence notes and source freshness constraints
- machine-readable contract
- host assessment protocol
- integration plan protocol
- phased implementation workflow
- verification and receipt rules
- discovery decision gate that classifies findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`
- brutal 10/10 quality gate with downgrade rules
- README and publication metadata

Generated capability packets must stop before source edits when unresolved findings change product behavior, auth/tenant boundaries, data ownership, security posture, migration strategy, provider side effects, external billing, or destructive operations. The receipt must reconcile those findings with the final proof level instead of claiming success by momentum.

## Best first targets

- Stripe subscriptions
- RBAC permissions
- Supabase auth
- admin dashboard
- analytics events
- webhook receiver
- deployment pipeline
