# Programmable Vendor Provider System

Status: `INCLUDED_RISKY_REQUIRES_HARDENING`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Operators can add/update TypeScript vendor adapters, validate exported vendor/text/image/video functions, persist provider config, test models, and execute adapters inside a constrained VM.
Status: INCLUDED_RISKY_REQUIRES_HARDENING; CONTRACT_SEAM_ONLY.
Dependencies: Settings UI code editor, vendor API, schema validator, VM sandbox, provider file storage, model test routes, security review.
Stable behavior: Vendor schema, model list merge, text/image/video/tts function contracts.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Schema validation tests plus sandbox adapter execution tests
Required evidence: artifacts/vendor-system.log; BLOCKED_WITH_REASON: provider tests not run; security review required.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs VM security review, provider sandbox proof, secret redaction proof, and browser settings proof.

## Behavior Contract

- User/system action: Operators can add/update TypeScript vendor adapters, validate exported vendor/text/image/video functions, persist provider config, test models, and execute adapters inside a constrained VM.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_vendorConfig rows and data/vendor/<id>.ts files.
- Failure/empty/loading/blocked states: Invalid schema, duplicate id, missing functions, provider credential missing, VM execution error.
- Provider/persistence/runtime/operational boundary: External AI providers: OpenAI-compatible, Toonflow, Volcengine, Kling, Vidu, Minimax, AtlasCloud, DeepSeek, GRSai, template adapter.

## Stable vs Free

| Stable | Free |
|---|---|
| Operators can add/update TypeScript vendor adapters, validate exported vendor/text/image/video functions, persist provider config, test models, and execute adapters inside a constrained VM. | Implementation framework/component/database abstraction. |
| Invalid schema, duplicate id, missing functions, provider credential missing, VM execution error. | Exact internal error class names. |
| Schema validation tests plus sandbox adapter execution tests | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/routes/setting/vendorConfig/addVendor.ts:9-112; source-real/src/routes/setting/vendorConfig/updateCode.ts:10-98; source-real/src/routes/setting/vendorConfig/modelTest.ts:9-105; source-real/src/utils/vendor.ts:6-41; source-real/src/utils/vm.ts:16-55; source-real/data/vendor/null.ts:315-322

