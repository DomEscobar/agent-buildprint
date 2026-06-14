# Capability Buildprint Author

This Buildprint helps an agent create new Capability Buildprints using the Capability Buildprint Standard.

Use it when you have a capability idea, existing integration, vendor docs, or source code and want a reusable agent-installable packet.

It must not author from model memory alone. When context is incomplete, the authoring agent first runs evidence discovery against official docs, source examples, relevant skills/alignment workflows, and benchmark/comparison evidence when a claim depends on it. Only then should it ask narrow hard-stop questions.

## Output

A completed Capability Buildprint folder with:

- canonical start
- evidence notes and source freshness constraints
- machine-readable contract
- host assessment protocol
- integration plan protocol
- phased implementation workflow
- verification and receipt rules
- README and publication metadata

## Best first targets

- Stripe subscriptions
- RBAC permissions
- Supabase auth
- admin dashboard
- analytics events
- webhook receiver
- deployment pipeline
