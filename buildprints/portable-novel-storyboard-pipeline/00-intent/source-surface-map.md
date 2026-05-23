# Source Surface Map

| Surface ID | Disposition | Product obligation | Capability packet | Evidence |
|---|---|---|---|---|
| SRC-AUTH | OWNED_BY_CAPABILITY | OBL-PROJECT | project-workspace-auth | See `02-context/source-evidence-index.yaml` |
| SRC-PROJECT | OWNED_BY_CAPABILITY | OBL-PROJECT | project-workspace-auth | See `02-context/source-evidence-index.yaml` |
| SRC-DB | OWNED_BY_CAPABILITY | OBL-PROJECT | project-workspace-auth | See `02-context/source-evidence-index.yaml` |
| SRC-NOVEL | OWNED_BY_CAPABILITY | OBL-NOVEL | novel-event-ingestion | See `02-context/source-evidence-index.yaml` |
| SRC-EVENTS | OWNED_BY_CAPABILITY | OBL-NOVEL | novel-event-ingestion | See `02-context/source-evidence-index.yaml` |
| SRC-TEXT-PROVIDER | OWNED_BY_CAPABILITY | OBL-NOVEL | novel-event-ingestion | See `02-context/source-evidence-index.yaml` |
| SRC-SCRIPT-AGENT | OWNED_BY_CAPABILITY | OBL-SCRIPT | script-agent-assets | See `02-context/source-evidence-index.yaml` |
| SRC-SCRIPT-ASSETS | OWNED_BY_CAPABILITY | OBL-SCRIPT | script-agent-assets | See `02-context/source-evidence-index.yaml` |
| SRC-SKILLS | OWNED_BY_CAPABILITY | OBL-SCRIPT | script-agent-assets | See `02-context/source-evidence-index.yaml` |
| SRC-PRODUCTION-AGENT | OWNED_BY_CAPABILITY | OBL-STORYBOARD | production-storyboard-flow | See `02-context/source-evidence-index.yaml` |
| SRC-FLOW | OWNED_BY_CAPABILITY | OBL-STORYBOARD | production-storyboard-flow | See `02-context/source-evidence-index.yaml` |
| SRC-STORYBOARD | OWNED_BY_CAPABILITY | OBL-STORYBOARD | production-storyboard-flow | See `02-context/source-evidence-index.yaml` |
| SRC-IMAGE | OWNED_BY_CAPABILITY | OBL-MEDIA | media-preview-export | See `02-context/source-evidence-index.yaml` |
| SRC-VIDEO | OWNED_BY_CAPABILITY | OBL-MEDIA | media-preview-export | See `02-context/source-evidence-index.yaml` |
| SRC-EXPORT | OWNED_BY_CAPABILITY | OBL-MEDIA | media-preview-export | See `02-context/source-evidence-index.yaml` |
| SRC-PROVIDERS | OWNED_BY_CAPABILITY | OBL-SAFETY | safety-runtime-boundary | See `02-context/source-evidence-index.yaml` |
| SRC-UPLOADS | OWNED_BY_CAPABILITY | OBL-SAFETY | safety-runtime-boundary | See `02-context/source-evidence-index.yaml` |
| SRC-ADMIN | OWNED_BY_CAPABILITY | OBL-SAFETY | safety-runtime-boundary | See `02-context/source-evidence-index.yaml` |
| SRC-RUNTIME | OWNED_BY_CAPABILITY | OBL-SAFETY | safety-runtime-boundary | See `02-context/source-evidence-index.yaml` |

Every high-signal source surface is routed to a product obligation, merged into an capability packet, blocked, or explicitly out of scope. Source evidence is traceability only; downstream implementers must not depend on the original checkout.
