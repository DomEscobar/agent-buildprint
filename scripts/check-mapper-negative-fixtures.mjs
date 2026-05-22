#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
  ['missing TEAM_STACK.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/missing-team-stack/selected-buildprint'],
  ['UI missing UX artifacts', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/ui-missing-ux/selected-buildprint'],
  ['old read order', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/old-read-order/selected-buildprint'],
  ['overbroad context packet', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/context-all-packs/selected-buildprint'],
  ['v2 missing obligation routing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-missing-obligation-routing/selected-buildprint'],
  ['v2 missing proof contract', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-missing-proof-contract/selected-buildprint'],
  ['v2 stale generated prompt', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-stale-generated-prompt/selected-buildprint'],
  ['v2 claimed proof without evidence', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v2-claimed-proof-without-evidence/selected-buildprint'],
];

const expectations = new Map([
  ['missing TEAM_STACK.md', /missing required root TEAM_STACK\.md|TEAM_STACK\.md missing/i],
  ['UI missing UX artifacts', /UI-bearing selected output missing UX_CONTRACT\.md|UI-bearing selected output missing DESIGN_QUALITY_BAR\.md/i],
  ['old read order', /BUILDPRINT\.md read order must not put CAPABILITY_INDEX\.md before CURRENT_STATE\.md/i],
  ['overbroad context packet', /CONTEXT_PACKET\.json mustRead includes unrelated capability pack file/i],
  ['v2 missing obligation routing', /capability\.yaml must route to at least one product obligation|source-surface-map\.md must route surfaces to product obligations|product-obligations\.md must define obligation IDs/i],
  ['v2 missing proof contract', /missing proof-contract\.yaml/i],
  ['v2 stale generated prompt', /generated\/agent-prompt\.md must declare Generated from: blueprint\.yaml|generated\/agent-prompt\.md must say it is not source of truth/i],
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
