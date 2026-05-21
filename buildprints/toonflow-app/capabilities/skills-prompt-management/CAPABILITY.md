# Skill And Prompt Management

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Operators can list and edit markdown skills/prompts safely inside the data skills directory; agents can parse frontmatter, activate skills, and read declared resources.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Settings UI, skill API, path containment, frontmatter parser, agent skill tools, filesystem persistence, negative path tests.
Stable behavior: Frontmatter name/description contract, activation idempotency, resource list exposure.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Skill list/edit/path-traversal contract tests
Required evidence: artifacts/skill-management.log; BLOCKED_WITH_REASON: filesystem edit proof not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs edit/readback proof, invalid frontmatter tests, and UI editor proof.

## Behavior Contract

- User/system action: Operators can list and edit markdown skills/prompts safely inside the data skills directory; agents can parse frontmatter, activate skills, and read declared resources.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: data/skills markdown files and o_prompt table.
- Failure/empty/loading/blocked states: Path traversal, missing file, invalid frontmatter, empty skill body.
- Provider/persistence/runtime/operational boundary: Used by script and production agents.

## Stable vs Free

| Stable | Free |
|---|---|
| Operators can list and edit markdown skills/prompts safely inside the data skills directory; agents can parse frontmatter, activate skills, and read declared resources. | Implementation framework/component/database abstraction. |
| Path traversal, missing file, invalid frontmatter, empty skill body. | Exact internal error class names. |
| Skill list/edit/path-traversal contract tests | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/setting/skillManagement/getSkillList.ts:9-17; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/setting/skillManagement/saveSkillContent.ts:12-33; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/agent/skillsTools.ts:44-119,180-240; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:data/skills inventory: 183 markdown files across art/story/production/script skills

