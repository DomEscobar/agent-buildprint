#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
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
];

const expectations = new Map([
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
