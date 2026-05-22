#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
  ['v2 missing obligation routing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-missing-obligation-routing/selected-buildprint'],
  ['v2 missing proof contract', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-missing-proof-contract/selected-buildprint'],
  ['v2 stale generated prompt', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-stale-generated-prompt/selected-buildprint'],
  ['v2 missing pre questions', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-missing-pre-questions/selected-buildprint'],
  ['v2 UI missing team UX gates', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-ui-missing-team-ux/selected-buildprint'],
  ['v2 claimed proof without evidence', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-claimed-proof-without-evidence/selected-buildprint'],
];

const expectations = new Map([
  ['v2 missing obligation routing', /capability\.yaml must route to at least one product obligation|source-surface-map\.md must route surfaces to product obligations|product-obligations\.md must define obligation IDs/i],
  ['v2 missing proof contract', /missing proof-contract\.yaml/i],
  ['v2 stale generated prompt', /generated\/agent-prompt\.md must declare Generated from: blueprint\.yaml|generated\/agent-prompt\.md must say it is not source of truth/i],
  ['v2 missing pre questions', /missing executable packet file PRE_IMPLEMENTATION_QUESTIONS\.md|START_HERE\.md must route through PRE_IMPLEMENTATION_QUESTIONS\.md|context-map\.yaml must include PRE_IMPLEMENTATION_QUESTIONS\.md/i],
  ['v2 UI missing team UX gates', /missing executable packet file 02-context\/team-stack\.yaml|missing executable packet file 02-context\/ux-contract\.md|missing executable packet file 02-context\/design-quality-bar\.md|team-stack\.yaml/i],
  ['v2 claimed proof without evidence', /QUALIFIED_SOURCE_INDEPENDENT requires passing evidence-ledger row/i],
]);

let failures = 0;
for (const [label, fixture] of fixtures) {
  const result = spawnSync(process.execPath, ['scripts/check-mapper-selected-output.mjs', fixture], {
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
