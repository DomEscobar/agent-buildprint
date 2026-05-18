# Traceability Matrix

| Requirement | Source evidence | Confidence | Reversal check | Status |
|---|---|---:|---|---|
| Import ordered novel chapters | `src/routes/novel/addNovel.ts:11-40` | high | fixture import preserves order | spec-only |
| Async event extraction updates state | `src/routes/novel/addNovel.ts:42-50`, `src/utils/cleanNovel.ts:27-89` | high | mock extractor success/failure | spec-only |
| ScriptAgent stages skeleton/adaptation/script | `data/skills/script_agent_decision.md:69-89`, `src/agents/scriptAgent/index.ts:141-207` | high | mock subagent writes artifacts | spec-only |
| Tools read events/text/workspace | `src/agents/scriptAgent/tools.ts:34-117` | high | tool contract unit tests | spec-only |
| Assets extracted from scripts | `src/routes/script/extractAssets.ts:56-149` | high | duplicate asset fixture | spec-only |
| FlowData contains script, plan, assets, storyboard table/panel | `src/agents/productionAgent/tools.ts:45-51` | high | schema validation | spec-only |
| Storyboard panel XML maps to rows | `data/skills/production_execution_storyboard_panel.md:57-73`, `src/routes/production/storyboard/batchAddStoryboardInfo.ts:26-109` | high | parse and persist panel rows | spec-only |
| Image/video calls are adapter mediated | `src/utils/ai.ts:252-321` | high | mock adapter states | spec-only |
| Provider code is dynamic/plugin-like | `src/utils/vendor.ts:22-41`, `src/utils/vm.ts:16-55` | high | adapter interface only | spec-only |
| Preview/export package exists | `src/routes/production/workbench/getVideoList.ts:15-30`, `src/routes/script/exportScript.ts:15-25`, `docs/README.en.md:141-146` | medium | manifest/zip snapshot | spec-only |

Unverified: full video stitching/export parity.
