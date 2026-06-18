# 02 Contract Authoring

## Objective

Write `capability.yaml` and `compatibility.md` as the contract the applying agent must obey.

## capability.yaml must include

- `schema: agent-buildprint/capability.v0`
- `name`
- `type: capability`
- `capability`
- `description`
- `execution_profile`
- `claim_status` with one of `unproven`, `fixture_proven`, `host_proven`, or `blocked`
- `host_frameworks`
- `host_detection`
- `requires`
- `touches`
- `apply`
- `verify`
- `risk`
- `failure_modes`
- `composition`
- `evidence`

## compatibility.md must define

- host detection signals
- required vs optional host features
- composition rules
- conflicts
- version/framework support
- docs/source versions or stale-risk notes
- when to block instead of adapt

## evidence must define

Record the basis for the packet:

- official docs inspected
- source repositories, examples, or templates inspected
- benchmark/comparison evidence inspected, or `No benchmark evidence found`
- date or version for volatile providers/frameworks
- claims that must be re-checked by future agents

## contract consistency must define

Before moving on, compare:

- `requires.existing_capabilities` against `composition.expects`
- `apply.steps` against `verify.runtime_checks`
- `failure_modes` against required negative tests
- `publication.json` claims against actual examples, receipts, and proof level
- `claim_status` against the available proof ceiling, so fixture-only proof cannot read as host-proven

Any adaptation such as user-owned to service-account-owned behavior must be reflected in every relevant contract section, or recorded as blocked/not-proven.

For credential, token, secret, or API-key packets, the contract must include:

- plaintext/recoverable storage prohibition
- one-time secret disclosure
- keyed or host-approved versioned hash material
- high-entropy lookup prefixes and collision handling when prefixes exist
- full-secret verification after prefix lookup, proven by a valid-prefix/wrong-secret negative test

## DO NOT

- Do not make YAML a decorative summary. It is the machine contract.
- Do not omit risk, failure modes, or compatibility because the provider docs seem obvious.
- Do not derive machine contracts from memory when docs/source evidence is available.
- Do not use benchmark language without a cited benchmark or explicit no-benchmark-found note.
- Do not put secret values into the packet.
- Do not leave security-sensitive negative tests implicit.
- Do not leave template placeholders, angle-bracket fields, or generic framework/proof entries in the authored packet.
