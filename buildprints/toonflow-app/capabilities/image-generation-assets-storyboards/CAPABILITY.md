# Image Generation For Assets And Storyboards

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- routes.assetsGenerate.*
- routes.production.assets.*
- routes.production.editImage.*
- routes.production.storyboard.imageGeneration.*
- providers.image.*
- tables.o_image
- tables.o_imageFlow
- tables.o_tasks

## Product obligations

- Preserve image-generation tasks for assets/storyboards/edit flows with provider boundaries, polling, file persistence, and failure states.

## Agent Brief

Goal: Users generate images for roles, scenes, props, and storyboard frames using configured image providers, with generation task records, file persistence, thumbnails, and failure states.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Generation forms, image API, AI image provider adapter, task record service, file service, polling/status UI.
Stable behavior: Prompt construction by asset type, reference image handling, imageId state transitions.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Sandbox image provider run or deterministic test-only provider plus live-proof blocker
Required evidence: artifacts/image-generation.log; BLOCKED_WITH_REASON: no image provider credentials.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs sandbox/live image provider proof and browser polling evidence.

## Behavior Contract

- User/system action: Users generate images for roles, scenes, props, and storyboard frames using configured image providers, with generation task records, file persistence, thumbnails, and failure states.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_image, o_assets, o_tasks, data/oss images.
- Failure/empty/loading/blocked states: Unsupported type, missing project, provider error, asset deleted mid-generation.
- Provider/persistence/runtime/operational boundary: Configured image provider.

## Stable vs Free

| Stable | Free |
|---|---|
| Users generate images for roles, scenes, props, and storyboard frames using configured image providers, with generation task records, file persistence, thumbnails, and failure states. | Implementation framework/component/database abstraction. |
| Unsupported type, missing project, provider error, asset deleted mid-generation. | Exact internal error class names. |
| Sandbox image provider run or deterministic test-only provider plus live-proof blocker | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/assetsGenerate/generateAssets.ts:61-143; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/ai.ts:246-271; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/oss.ts:174-209

