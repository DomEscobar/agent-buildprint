# CAPABILITY_INDEX Compatibility

Use `../../03-capabilities/capability-index.yaml` as the authoritative continuation index.

| Capability | Required teams | Status | Promotion blocker |
|---|---|---|---|
| project-workspace-auth | product-architect, ux-ui-craft, test-and-verification, security-boundary, data-persistence | INCLUDED_NEEDS_PROOF | browser/auth/persistence proof missing |
| novel-event-ingestion | product-architect, ux-ui-craft, test-and-verification, integration-runtime, data-persistence | INCLUDED_NEEDS_PROOF | provider/persistence/browser proof missing |
| script-agent-assets | product-architect, ux-ui-craft, test-and-verification, integration-runtime, data-persistence | INCLUDED_NEEDS_PROOF | parser/provider/browser proof missing |
| production-storyboard-flow | product-architect, ux-ui-craft, test-and-verification, integration-runtime, data-persistence | INCLUDED_NEEDS_PROOF | storyboard/browser/restart proof missing |
| media-preview-export | product-architect, ux-ui-craft, test-and-verification, integration-runtime, data-persistence | INCLUDED_NEEDS_PROOF | manifest/browser/no-network proof missing |
| safety-runtime-boundary | product-architect, test-and-verification, integration-runtime, security-boundary, data-persistence | INCLUDED_RISKY_REQUIRES_HARDENING | security review missing |

