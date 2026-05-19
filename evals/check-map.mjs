import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const fixtures = path.join(root, 'evals', 'golden-projects');
const names = fs.readdirSync(fixtures).filter((name) => fs.existsSync(path.join(fixtures, name, 'expected-signals.json'))).sort();
let failed = 0;

function read(file) { return fs.readFileSync(file, 'utf8'); }
function assert(ok, msg) {
  if (ok) console.log(`✓ ${msg}`);
  else { console.log(`✗ ${msg}`); failed++; }
}
function containsAll(actual, expected) {
  return expected.every((item) => actual.includes(item));
}

for (const name of names) {
  const project = path.join(fixtures, name);
  const out = fs.mkdtempSync(path.join(os.tmpdir(), `agb-eval-${name}-`));
  console.log(`\n## ${name}`);
  execFileSync('node', [path.join(root, 'bin', 'agb.js'), 'map', project, '--out', out], { stdio: 'pipe' });
  const expected = JSON.parse(read(path.join(project, 'expected-signals.json')));
  const facts = JSON.parse(read(path.join(out, 'facts.json')));
  const allText = fs.readdirSync(out, { recursive: true })
    .filter((rel) => fs.statSync(path.join(out, rel)).isFile())
    .map((rel) => read(path.join(out, rel)))
    .join('\n');

  assert(fs.existsSync(path.join(out, 'BUILDPRINT.md')), `${name}: BUILDPRINT.md exists`);
  assert(fs.existsSync(path.join(out, 'SPEC.md')), `${name}: SPEC.md exists`);
  assert(fs.existsSync(path.join(out, 'PLAN.md')), `${name}: PLAN.md exists`);
  assert(fs.existsSync(path.join(out, 'TEST_MATRIX.md')), `${name}: TEST_MATRIX.md exists`);
  assert(fs.existsSync(path.join(out, 'SYSTEM_MAP.md')), `${name}: SYSTEM_MAP.md exists`);
  assert(fs.existsSync(path.join(out, 'BUILDPRINT_CANDIDATES.md')), `${name}: BUILDPRINT_CANDIDATES.md exists`);
  assert(fs.existsSync(path.join(out, 'REVIEW_PROTOCOL.md')), `${name}: REVIEW_PROTOCOL.md exists`);
  assert(fs.existsSync(path.join(out, 'REVIEW_PACKET.json')), `${name}: REVIEW_PACKET.json exists`);
  assert(fs.existsSync(path.join(out, 'MAPPER_OS_ALIGNMENT.md')), `${name}: MAPPER_OS_ALIGNMENT.md exists`);
  assert(fs.existsSync(path.join(out, 'DECOMPOSITION_STRATEGY.md')), `${name}: DECOMPOSITION_STRATEGY.md exists`);
  const reviewPacket = JSON.parse(read(path.join(out, 'REVIEW_PACKET.json')));
  const manifest = JSON.parse(read(path.join(out, 'manifest.json')));
  assert(reviewPacket.schema === 'agent-buildprint/map-review-packet.v1', `${name}: review packet schema recorded`);
  assert(reviewPacket.mapperOsAlignment?.source === 'buildprints/buildprint-mapper-os', `${name}: review packet records Mapper OS source`);
  assert(manifest.mapperOs?.slug === 'buildprint-mapper-os', `${name}: manifest records Mapper OS alignment`);
  assert(manifest.sizeClassification?.sizeClass, `${name}: manifest records size classification`);
  assert(manifest.sizeClassification?.scopePressure, `${name}: manifest records scope pressure separately from size`);
  assert(!manifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: discovery manifest does not require implementation rails`);
  assert((expected.apiIncludes ?? []).every((needle) => facts.apis.includes(needle)), `${name}: expected API files detected`);
  const firstPathBackedIndex = facts.candidateBuildprints.findIndex((c) => c.includedPaths?.length > 0);
  const firstSignalOnlyIndex = facts.candidateBuildprints.findIndex((c) => !c.includedPaths?.length);
  assert(firstPathBackedIndex < 0 || firstSignalOnlyIndex < 0 || firstPathBackedIndex < firstSignalOnlyIndex, `${name}: path-backed candidates sort before signal-only candidates`);
  assert(read(path.join(out, 'DECOMPOSITION_STRATEGY.md')).includes('Latest safe starting phase'), `${name}: decomposition strategy records safe starting phase`);
  assert(reviewPacket.reviewPrompt.includes('max-quality readiness phase plan'), `${name}: review packet asks for max-quality phase plan`);
  assert(reviewPacket.reviewPrompt.includes('Loop Gates'), `${name}: review packet asks reviewers to assess Loop Gates`);
  assert(reviewPacket.schemas?.['loop-gate.schema.json']?.properties?.repeatUntil?.enum?.includes('pass_or_blocker'), `${name}: review packet loop gates are pass_or_blocker`);
  assert(Array.isArray(facts.candidateBuildprints) && facts.candidateBuildprints.length > 0, `${name}: candidate Buildprints generated`);
  assert(containsAll(facts.integrations, expected.integrations ?? []), `${name}: expected integrations detected`);
  assert(containsAll(facts.risky, expected.riskIncludes ?? []), `${name}: expected risk areas detected`);
  assert(containsAll(facts.envNames, expected.envNames ?? []), `${name}: env names detected without values`);
  assert((expected.mustContain ?? []).every((needle) => allText.includes(needle)), `${name}: required text appears in output`);
  assert((expected.mustNotContain ?? []).every((needle) => !allText.includes(needle)), `${name}: forbidden secret/malicious values absent`);

  if (name === 'large-monorepo') {
    const selectedOut = fs.mkdtempSync(path.join(os.tmpdir(), `agb-eval-${name}-selected-`));
    execFileSync('node', [path.join(root, 'bin', 'agb.js'), 'map', project, '--candidate', '1', '--out', selectedOut], { stdio: 'pipe' });
    const selectedFacts = JSON.parse(read(path.join(selectedOut, 'facts.json')));
    const selectedManifest = JSON.parse(read(path.join(selectedOut, 'manifest.json')));
    const selectedPacket = JSON.parse(read(path.join(selectedOut, 'REVIEW_PACKET.json')));
    assert(selectedFacts.selectedCandidate?.includedPaths?.length > 0, `${name}: --candidate selects an evidence-backed candidate`);
    assert(selectedManifest.mode === 'selected Buildprint extraction', `${name}: --candidate switches to selected extraction mode`);
    assert(selectedManifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: --candidate restores implementation rails`);
    assert(selectedPacket.package.selectedScope, `${name}: --candidate records selected scope in review packet`);
    assert(read(path.join(selectedOut, 'SELECTED_CANDIDATE.md')).includes(selectedFacts.selectedCandidate.includedPaths[0]), `${name}: --candidate writes selected evidence paths`);
  }
}

if (failed) {
  console.error(`\nMap golden eval failed: ${failed} assertion(s)`);
  process.exit(1);
}
console.log('\nMap golden eval passed');
