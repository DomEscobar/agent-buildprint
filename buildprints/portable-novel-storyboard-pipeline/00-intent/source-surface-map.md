# Source Surface Map

| Source surface | Evidence | Disposition | Product obligation |
|---|---|---|---|
| SRC-AUTH | `src/routes/login/login.ts`, socket auth guards, `o_user`, `o_setting.tokenKey` | OWNED_BY_CAPABILITY | OBL-PROJECT |
| SRC-PROJECT | `src/routes/project/*`, model selection routes, project tables | OWNED_BY_CAPABILITY | OBL-PROJECT |
| SRC-DB | `src/lib/initDB.ts`, SQLite tables for projects, novels, scripts, assets, storyboards, tasks | MERGED_INTO_CAPABILITY | OBL-PROJECT, OBL-NOVEL, OBL-SCRIPT, OBL-STORYBOARD, OBL-MEDIA |
| SRC-NOVEL | `src/routes/novel/addNovel.ts`, `getNovel.ts` | OWNED_BY_CAPABILITY | OBL-NOVEL |
| SRC-EVENTS | `src/routes/novel/event/generateEvents.ts`, `src/utils/cleanNovel.ts` | OWNED_BY_CAPABILITY | OBL-NOVEL |
| SRC-TEXT-PROVIDER | universal AI text calls used by event/script/production flows | MERGED_INTO_CAPABILITY | OBL-NOVEL, OBL-SCRIPT, OBL-STORYBOARD |
| SRC-SCRIPT-AGENT | `src/agents/scriptAgent/*`, script socket namespace | OWNED_BY_CAPABILITY | OBL-SCRIPT |
| SRC-SCRIPT-ASSETS | `src/routes/script/extractAssets.ts`, asset joins | OWNED_BY_CAPABILITY | OBL-SCRIPT |
| SRC-SKILLS | Markdown skill inventory under `data/skills` | MERGED_INTO_CAPABILITY | OBL-SCRIPT, OBL-STORYBOARD |
| SRC-PRODUCTION-AGENT | `src/agents/productionAgent/*`, production socket namespace | OWNED_BY_CAPABILITY | OBL-STORYBOARD |
| SRC-FLOW | `src/routes/production/getFlowData.ts`, `saveFlowData.ts` | OWNED_BY_CAPABILITY | OBL-STORYBOARD |
| SRC-STORYBOARD | storyboard add/batch/update routes and tables | OWNED_BY_CAPABILITY | OBL-STORYBOARD |
| SRC-IMAGE | image generation routes, `src/utils/ai.ts`, local file persistence | OWNED_BY_CAPABILITY | OBL-MEDIA |
| SRC-VIDEO | video track/generation routes and task polling | OWNED_BY_CAPABILITY | OBL-MEDIA |
| SRC-EXPORT | script zip export and workbench video-list/preview surfaces | MERGED_INTO_CAPABILITY | OBL-MEDIA |
| SRC-PROVIDERS | vendor config routes, editable provider code, VM wrapper | BLOCKED_NEEDS_REVIEW | OBL-SAFETY |
| SRC-UPLOADS | asset upload and local file read/write helpers | BLOCKED_NEEDS_REVIEW | OBL-SAFETY |
| SRC-ADMIN | database export/import/clear/delete-all routes | BLOCKED_NEEDS_REVIEW | OBL-SAFETY |
| SRC-RUNTIME | Electron/Docker packaging and local server boot | LOW_SIGNAL_IGNORED_WITH_REASON: outside portable webapp binding slice except runtime notes | OBL-SAFETY |

The rebuild must preserve product obligations, not route/function parity.

