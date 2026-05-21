# Contracts: Skill And Prompt Management

## Boundary Contracts

| Boundary | Stable behavior | Inputs | Outputs | Failure modes | Verification |
|---|---|---|---|---|---|
| UI/UX | Skill tree/editor, invalid path, save success/error, parse error states require browser proof. | User actions and visible state | Empty/loading/success/error/blocked states | Path traversal, missing file, invalid frontmatter, empty skill body. | Browser/Electron artifact required. |
| API/socket | POST /api/setting/skillManagement/getSkillList and /saveSkillContent plus prompt management routes. | Validated request/event payloads | JSON response, socket stream, file, or state id | Malformed input, auth failure, provider/runtime failure | API/socket contract tests. |
| Domain logic | Frontmatter name/description contract, activation idempotency, resource list exposure. | Capability-specific validated data | Durable state transition or generated artifact | Invalid state, missing dependency | Unit/integration tests. |
| Persistence/state | data/skills markdown files and o_prompt table. | Database/file writes and reads | Restart-readable state | Lost state, stale relations, path errors | Restart/readback/delete/export proof where applicable. |
| Provider/runtime | Used by script and production agents. | Configured provider/runtime inputs | Provider output or explicit failure | Missing credentials, timeout, malformed result | Sandbox/live proof or explicit blocker. |

