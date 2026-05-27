#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const packet = 'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-ai-ui-micro/selected-buildprint';
const fixtures = [
  ['static UI shell with dead controls', 'static-ui-shell', /interactive_ui_surface|interactive_ui_runtime_trace/i],
  ['checkpoint-only evidence without phase core proof', 'checkpoint-only', /interactive_ui_runtime_trace/i],
  ['static DOM overclaims UX design gate', 'ux-overclaim', /no_unsupported_broad_evidence_upgrades/i],
  ['browser blocker without local interaction proof', 'browser-blocker-only', /interactive_ui_runtime_trace/i],
];

let failures = 0;

for (const [label, kind, expected] of fixtures) {
  const result = spawnSync(process.execPath, [
    'scripts/eval-mapper-replay.mjs',
    '--packet',
    packet,
    '--require-interactive-ui',
    '--dry-run-bad',
    kind,
    '--report',
    `quality/mapper-replay-negative-${kind}.json`,
    '--transcript',
    `quality/mapper-replay-negative-${kind}.txt`,
  ], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    failures += 1;
    console.error(`x ${label}: expected replay fixture to fail, but it passed`);
    continue;
  }
  if (!expected.test(output)) {
    failures += 1;
    console.error(`x ${label}: failed for the wrong reason`);
    console.error(output);
    continue;
  }
  console.log(`ok ${label}: replay negative fixture failed as expected`);
}

if (failures) {
  console.error(`\nMapper replay negative fixture check failed: ${failures} issue(s).`);
  process.exit(1);
}
