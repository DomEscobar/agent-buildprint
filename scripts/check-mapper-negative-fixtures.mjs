#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
  ['product phase with title-only outcome and filler scope', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/product-phase-thin-outcome/selected-buildprint'],
  ['mixed mode collapsed to product', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/mixed-mode-collapsed-to-product/selected-buildprint'],
  ['framework phase using product language', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/framework-phase-using-product-language/selected-buildprint'],
  ['integration phase missing webhook idempotency', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/integration-phase-missing-webhook-idempotency/selected-buildprint'],
  ['automation phase missing stop conditions', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/automation-phase-missing-stop-conditions/selected-buildprint'],
  ['data-pipeline missing lineage', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/data-pipeline-missing-lineage/selected-buildprint'],
  ['infrastructure missing rollback', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/infrastructure-missing-rollback/selected-buildprint'],
  ['forbidden START_HERE.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/forbidden-start-here/selected-buildprint'],
  ['forbidden PRE_IMPLEMENTATION_QUESTIONS.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/forbidden-pre-implementation-questions/selected-buildprint'],
  ['forbidden 03-capabilities directory', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/forbidden-capabilities-dir/selected-buildprint'],
  ['missing 02-project-setup.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/missing-project-setup/selected-buildprint'],
  ['phase missing repair routing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-missing-repair-routing/selected-buildprint'],
  ['phase missing proof gate', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-missing-proof-gate/selected-buildprint'],
  ['phase missing interfaces/state sections', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-missing-interfaces-state/selected-buildprint'],
  ['BUILDPRINT read order skipping questions/setup', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/buildprint-skips-questions-setup/selected-buildprint'],
  ['forbidden packet AGENTS.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/forbidden-packet-agents/selected-buildprint'],
  ['unclassified file reference', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/unclassified-file-reference/selected-buildprint'],
  ['local MVP production missing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/local-mvp-production-missing/selected-buildprint'],
  ['provider blocker without adapter path', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/provider-blocker-without-adapter-path/selected-buildprint'],
  ['screenshots without repeatable e2e', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/screenshots-without-repeatable-e2e/selected-buildprint'],
  ['visual quality gate missing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/visual-quality-gate-missing/selected-buildprint'],
  ['missing role contracts', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/team-capsules-not-compiled/selected-buildprint'],
  ['unknown requires_roles value', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/unknown-requires-role/selected-buildprint'],
  ['phase-flow missing subagent fallback', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-flow-no-subagent-fallback/selected-buildprint'],
  ['phase id drift', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-id-drift/selected-buildprint'],
  ['all phases independent', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/all-phases-independent/selected-buildprint'],
  ['invalid blueprint mode', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/blueprint-mode-invalid/selected-buildprint'],
  ['blueprint mode/style mismatch', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/blueprint-mode-style-mismatch/selected-buildprint'],
  ['phase mode contract mismatch', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/phase-mode-contract-mismatch/selected-buildprint'],
  ['fixture placeholder leak', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/fixture-placeholder-leak/selected-buildprint', ['--forbid-fixture-placeholders']],
];

const expectations = new Map([
  ['product phase with title-only outcome and filler scope', /mapper boilerplate filler|## Product outcome is identical to the phase title/i],
  ['mixed mode collapsed to product', /is in a mixed packet but declares blueprint_mode mixed|mixed blueprint_mode packet must have at least 2 distinct per-phase/i],
  ['framework phase using product language', /uses ## Mapped product obligations for non-product blueprint_mode framework|uses wrong mapped-obligations heading for blueprint_mode framework/i],
  ['integration phase missing webhook idempotency', /phase mode integration requires at least/i],
  ['automation phase missing stop conditions', /phase mode automation requires at least/i],
  ['data-pipeline missing lineage', /phase mode data-pipeline requires at least/i],
  ['infrastructure missing rollback', /phase mode infrastructure requires at least/i],
  ['forbidden START_HERE.md', /forbidden file in current executable packet baseline: START_HERE\.md/i],
  ['forbidden PRE_IMPLEMENTATION_QUESTIONS.md', /forbidden file in current executable packet baseline: PRE_IMPLEMENTATION_QUESTIONS\.md/i],
  ['forbidden 03-capabilities directory', /forbidden file in current executable packet baseline: 03-capabilities\//i],
  ['missing 02-project-setup.md', /missing executable blueprint file 02-project-setup\.md/i],
  ['phase missing repair routing', /03-phases\/01-ingest-record\.md missing ## Repair routing/i],
  ['phase missing proof gate', /03-phases\/01-ingest-record\.md missing ## Proof gate/i],
  ['phase missing interfaces/state sections', /03-phases\/01-ingest-record\.md missing ## Interfaces touched|03-phases\/01-ingest-record\.md missing ## State\/runtime touched/i],
  ['BUILDPRINT read order skipping questions/setup', /BUILDPRINT\.md read order missing 01-questions\.md|BUILDPRINT\.md read order missing 02-project-setup\.md/i],
  ['forbidden packet AGENTS.md', /forbidden file in current executable packet baseline: AGENTS\.md/i],
  ['unclassified file reference', /unclassified file reference missing-contract\.md/i],
  ['local MVP production missing', /02-project-setup\.md missing ## Production readiness contract/i],
  ['provider blocker without adapter path', /production proof gate missing provider_adapter_config_test_required|must state missing live credentials block live proof only/i],
  ['screenshots without repeatable e2e', /UI proof gate missing repeatable_browser_e2e/i],
  ['visual quality gate missing', /04-evaluation\.md missing visual_quality_gate/i],
  ['missing role contracts', /missing executable blueprint file 06-contracts\/product-architect\.md|BUILDPRINT\.md read order missing 06-contracts\//i],
  ['unknown requires_roles value', /declares unknown requires_roles value design-wizard/i],
  ['phase-flow missing subagent fallback', /03-phases\/phase-flow\.md must include subagent permission plus self-simulation fallback/i],
  ['phase id drift', /phase_id ingest-record must match file basename 01-ingest-record/i],
  ['all phases independent', /multi-phase packets must model dependencies/i],
  ['invalid blueprint mode', /blueprint\.yaml blueprint_mode\.primary must be one of/i],
  ['blueprint mode/style mismatch', /phase_style boundary_transaction_contract does not match primary mode product/i],
  ['phase mode contract mismatch', /Phase mode contract phase_style task_loop_contract must match blueprint\.yaml phase_style outcome_flow/i],
  ['fixture placeholder leak', /selected-output fixture placeholder text/i],
]);

let failures = 0;
for (const [label, fixture, extraArgs = []] of fixtures) {
  const result = spawnSync(process.execPath, ['scripts/check-mapper-selected-output.mjs', ...extraArgs, fixture], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    failures++;
    console.error(`x ${label}: expected validation failure, but fixture passed`);
    continue;
  }
  const expectation = expectations.get(label);
  if (expectation && !expectation.test(output)) {
    failures++;
    console.error(`x ${label}: failed for the wrong reason`);
    console.error(output);
    continue;
  }
  console.log(`ok ${label}: negative fixture failed as expected`);
}

if (failures) {
  console.error(`\nMapper negative fixture check failed: ${failures} issue(s).`);
  process.exit(1);
}
