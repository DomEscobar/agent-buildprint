# 04 Validation And Publication

## Objective

Check that the authored Capability Buildprint can be published and consumed by agents.

## Validate structure

Required files must exist:

```text
BUILDPRINT.md
capability.yaml
compatibility.md
00-host-assessment.md
01-integration-plan.md
apply.md
02-implementation-phases/01-contract-and-config.md
02-implementation-phases/02-core-integration.md
02-implementation-phases/03-host-wiring.md
02-implementation-phases/04-user-operator-surface.md
02-implementation-phases/05-verification-and-receipt.md
verify.md
README.md
```

## Validate behavior

The packet must make these claims checkable:

- evidence basis and source freshness
- host compatibility
- required env/secrets/services
- integration surfaces
- execution profile
- failure modes
- verification proof level
- claim proof ceiling via `claim_status`
- receipt output
- benchmark/proven/recommended claims, or explicit `No benchmark evidence found`
- contradiction checks between machine contract sections, especially `requires`, `composition`, `apply`, and `verify`
- high-risk negative proof for deny/failure paths, not only happy-path success
- credential/token/secret/API-key proof for storage posture, one-time disclosure, keyed or host-approved versioned hash material, prefix collision handling, and valid-prefix/wrong-secret denial when applicable

## Publication metadata

If publishing to Agent Buildprint, add `publication.json` with:

- title
- category: `Feature / Extension`
- summary
- promise
- includes
- risks
- checks
- public status

## Evidence gate

Do not publish until one of these is true:

- the authored packet includes current official docs/source/benchmark references for its key claims
- the packet explicitly says which evidence was unavailable and downgrades claims accordingly
- the packet is marked draft/internal and `publish: false`

## DO NOT

- Do not publish a packet that only passes file-count checks.
- Do not call examples "verified" unless they were applied to a host repo.
- Do not hide unknown proof as future work.
- Do not publish "best practice" or "recommended" claims that are only based on LLM knowledge.
- Do not publish a 10/10 or perfect-quality claim without the brutal quality gate, real-host proof, and adversarial review notes.
- Do not let publication copy outrun evidence; every public claim must be backed by docs/source/runtime proof or downgraded to `not-proven`, `blocked`, or the matching `claim_status`.
