#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
  ['old START_HERE.md forbidden', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-old-start-here/selected-buildprint'],
  ['old PRE_IMPLEMENTATION_QUESTIONS.md forbidden', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-old-pre-implementation-questions/selected-buildprint'],
  ['still using 03-capabilities forbidden', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-still-using-03-capabilities/selected-buildprint'],
  ['missing 02-project-setup.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-missing-project-setup/selected-buildprint'],
  ['phase missing repair routing', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-phase-missing-repair-routing/selected-buildprint'],
  ['phase missing proof gate', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-phase-missing-proof-gate/selected-buildprint'],
  ['phase missing interfaces/state sections', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-phase-missing-interfaces-state/selected-buildprint'],
  ['BUILDPRINT read order skipping questions/setup', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-buildprint-skips-questions-setup/selected-buildprint'],
  ['packet AGENTS.md present', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/v5-packet-agents-present/selected-buildprint'],
];

const expectations = new Map([
  ['old START_HERE.md forbidden', /forbidden legacy\/project-runtime file in executable-blueprint v5: START_HERE\.md/i],
  ['old PRE_IMPLEMENTATION_QUESTIONS.md forbidden', /forbidden legacy\/project-runtime file in executable-blueprint v5: PRE_IMPLEMENTATION_QUESTIONS\.md/i],
  ['still using 03-capabilities forbidden', /forbidden legacy\/project-runtime file in executable-blueprint v5: 03-capabilities\//i],
  ['missing 02-project-setup.md', /missing executable blueprint file 02-project-setup\.md/i],
  ['phase missing repair routing', /03-phases\/01-ingest-record\.md missing ## Repair routing/i],
  ['phase missing proof gate', /03-phases\/01-ingest-record\.md missing ## Proof gate/i],
  ['phase missing interfaces/state sections', /03-phases\/01-ingest-record\.md missing ## Interfaces touched|03-phases\/01-ingest-record\.md missing ## State\/runtime touched/i],
  ['BUILDPRINT read order skipping questions/setup', /BUILDPRINT\.md read order missing 01-questions\.md|BUILDPRINT\.md read order missing 02-project-setup\.md/i],
  ['packet AGENTS.md present', /forbidden legacy\/project-runtime file in executable-blueprint v5: AGENTS\.md/i],
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
