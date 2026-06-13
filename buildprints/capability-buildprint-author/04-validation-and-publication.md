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

- host compatibility
- required env/secrets/services
- integration surfaces
- execution profile
- failure modes
- verification proof level
- receipt output

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

## DO NOT

- Do not publish a packet that only passes file-count checks.
- Do not call examples "verified" unless they were applied to a host repo.
- Do not hide unknown proof as future work.

