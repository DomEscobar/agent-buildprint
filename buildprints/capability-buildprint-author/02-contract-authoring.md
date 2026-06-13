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
- `host_frameworks`
- `host_detection`
- `requires`
- `touches`
- `apply`
- `verify`
- `risk`
- `failure_modes`
- `composition`

## compatibility.md must define

- host detection signals
- required vs optional host features
- composition rules
- conflicts
- version/framework support
- when to block instead of adapt

## DO NOT

- Do not make YAML a decorative summary. It is the machine contract.
- Do not omit risk, failure modes, or compatibility because the provider docs seem obvious.
- Do not put secret values into the packet.

