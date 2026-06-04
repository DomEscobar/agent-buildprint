# BUILDPRINT: <Mapped Product Name>

This Buildprint is an execution manual for an AI builder. It is not a schema, scanner result, checklist trophy, runner contract, or proof that the product already exists.

## Product identity

Build one concrete artifact for one real user/operator/developer. Preserve the selected source project's observable product behavior and promise while becoming source-independent: a fresh coding agent should be able to build it without opening the original repo.

- **Product:** <name>
- **Primary user:** <who actually uses it>
- **Golden path:** <first meaningful journey from empty state to useful result>
- **Main surfaces:** <UI/API/CLI/worker/mobile/etc.>
- **Central artifact/interface/boundary:** <the thing the product is really about>
- **Runtime posture:** <trusted_local/private_authenticated/public_webapp>

## Final product at a glance

Write the product promise here. Name the complete user/operator journey, the state that must persist/read back, the provider/runtime boundaries, and the visible quality bar.

The target must not degrade into a generic dashboard, static demo, placeholder shell, raw JSON explorer, fake provider success path, or broad feature bucket without a built loop.

## Required constants

```txt
ARTIFACT_SHAPE=<concrete app/service/tool/workbench/runtime>
PRIMARY_RUNTIME=<framework/language/runtime or agent chooses from setup constraints>
PRIMARY_UI=<browser workbench / CLI / API / none>
PERSISTENCE=<required local/db/file/state behavior>
PROVIDER_POLICY=<dynamic/static/provider-specific/missing-provider blocker>
TEST_MODE=<how tests avoid external side effects>
DEPLOYMENT_POSTURE=trusted_local
```

## Binding implementation contract

The implementation must include these concrete product capabilities. This section should be dense and specific; do not outsource it to phase labels.

- <required module/capability 1>
- <required module/capability 2>
- <required module/capability 3>
- <state/persistence/readback requirement>
- <provider/runtime/adapter seam requirement>
- <UI/UX interaction requirement, if UI-bearing>
- <verification/audit/handoff requirement>

## Non-goals and forbidden fake-success paths

Do not claim or implement as completed behavior:

- placeholders or decorative-only UI as product proof;
- functionless buttons, dead controls, swallowed errors, or fake progress;
- mocked/sample data counted as real uploaded/live/operator input proof;
- provider success when credentials/runtime/network did not actually run;
- raw JSON dumps as the main experience when users need a product surface;
- source-code clone parity where source-independent behavior is enough;
- secret values, private data, or credentials committed to files or evidence;
- completion from prose, screenshots alone, or unchecked happy paths.

## Required read order

1. `BUILDPRINT.md`
2. `00-questions.md`
3. `01-project-setup.md`
4. `02-uiux-decision.md` when the artifact has UI or human-facing interaction
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. The active phase file named by `phase-index.yaml`
9. `HANDOVER.md`

Read sequentially. Do not inventory every phase before the active phase is known.

## Implementation discipline

Every phase is a comprehensive build objective, not a decomposed schema. The phase file should be read like a senior product-engineering assignment: understand the target experience, build the smallest real vertical path that satisfies it, verify it, repair slop, and record what the next agent can trust.

A phase cannot be marked done from edits alone. It needs meaningful proof: command/test output, browser/API/runtime inspection, persistence/readback evidence where relevant, and an honest blocker if the real path cannot run.

## Done means

The selected artifact is done only when the golden path works from a fresh start, visible controls work or block honestly, required state persists/readbacks, fake-success paths are absent, and `HANDOVER.md` names commands run, proof, blockers, unproven claims, and next steps.
