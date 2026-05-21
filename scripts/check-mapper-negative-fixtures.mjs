#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const fixtures = [
  ['missing TEAM_STACK.md', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/missing-team-stack/selected-buildprint'],
  ['UI missing UX artifacts', 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/ui-missing-ux/selected-buildprint'],
];

let failures = 0;
for (const [label, fixture] of fixtures) {
  const result = spawnSync(process.execPath, ['scripts/check-mapper-selected-output.mjs', fixture], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    failures++;
    console.error(`✗ ${label}: expected validation failure, but fixture passed`);
    continue;
  }
  if (label === 'missing TEAM_STACK.md' && !/missing required root TEAM_STACK\.md|TEAM_STACK\.md missing/i.test(output)) {
    failures++;
    console.error(`✗ ${label}: failed for the wrong reason`);
    console.error(output);
    continue;
  }
  if (label === 'UI missing UX artifacts' && !/UI-bearing selected output missing UX_CONTRACT\.md|UI-bearing selected output missing DESIGN_QUALITY_BAR\.md/i.test(output)) {
    failures++;
    console.error(`✗ ${label}: failed for the wrong reason`);
    console.error(output);
    continue;
  }
  console.log(`✓ ${label}: negative fixture failed as expected`);
}

if (failures) {
  console.error(`\nMapper negative fixture check failed: ${failures} issue(s).`);
  process.exit(1);
}
