import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const defaultAgb = path.resolve(packageRoot, '..', '..', 'bin', 'agb.js');
const cliArgIndex = process.argv.indexOf('--agb');
const agbCli = cliArgIndex >= 0 ? path.resolve(process.argv[cliArgIndex + 1]) : process.env.AGB_CLI ? path.resolve(process.env.AGB_CLI) : defaultAgb;
const fixtures = path.join(here, 'golden-projects');
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
function listFiles(dir) {
  return fs.readdirSync(dir, { recursive: true })
    .filter((rel) => fs.statSync(path.join(dir, rel)).isFile());
}

if (!fs.existsSync(agbCli)) {
  console.error(`agb CLI not found: ${agbCli}`);
  console.error('Pass --agb /absolute/path/to/bin/agb.js or set AGB_CLI.');
  process.exit(1);
}

for (const name of names) {
  const project = path.join(fixtures, name);
  const out = fs.mkdtempSync(path.join(os.tmpdir(), `buildprint-mapper-eval-${name}-`));
  console.log(`\n## ${name}`);
  execFileSync('node', [agbCli, 'map', project, '--out', out], { stdio: 'pipe' });
  const expected = JSON.parse(read(path.join(project, 'expected-signals.json')));
  const facts = JSON.parse(read(path.join(out, 'facts.json')));
  const allText = listFiles(out).map((rel) => read(path.join(out, rel))).join('\n');

  assert(fs.existsSync(path.join(out, 'BUILDPRINT.md')), `${name}: BUILDPRINT.md exists`);
  assert(fs.existsSync(path.join(out, 'SPEC.md')), `${name}: SPEC.md exists`);
  assert(fs.existsSync(path.join(out, 'PLAN.md')), `${name}: PLAN.md exists`);
  assert(fs.existsSync(path.join(out, 'TEST_MATRIX.md')), `${name}: TEST_MATRIX.md exists`);
  assert(fs.existsSync(path.join(out, 'VALIDATION_TEMPLATE.md')), `${name}: VALIDATION_TEMPLATE.md exists`);
  assert(fs.existsSync(path.join(out, 'SYSTEM_MAP.md')), `${name}: SYSTEM_MAP.md exists`);
  assert(fs.existsSync(path.join(out, 'BUILDPRINT_CANDIDATES.md')), `${name}: BUILDPRINT_CANDIDATES.md exists`);
  assert(fs.existsSync(path.join(out, 'MAPPER_OS_ALIGNMENT.md')), `${name}: MAPPER_OS_ALIGNMENT.md exists`);
  assert(fs.existsSync(path.join(out, 'DECOMPOSITION_STRATEGY.md')), `${name}: DECOMPOSITION_STRATEGY.md exists`);
  const reviewPacket = JSON.parse(read(path.join(out, 'REVIEW_PACKET.json')));
  const manifest = JSON.parse(read(path.join(out, 'manifest.json')));
  assert(reviewPacket.mapperOsAlignment?.source === 'buildprints/buildprint-mapper-os', `${name}: review packet records Mapper OS source`);
  assert(manifest.mapperOs?.slug === 'buildprint-mapper-os', `${name}: manifest records Mapper OS alignment`);
  assert(manifest.sizeClassification?.sizeClass, `${name}: manifest records size classification`);
  assert(manifest.sizeClassification?.scopePressure, `${name}: manifest records scope pressure separately from size`);
  assert(!manifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: discovery manifest does not require implementation rails`);
  assert(read(path.join(out, 'MAPPER_OS_ALIGNMENT.md')).includes('Buildprint Mapper OS'), `${name}: alignment file names Mapper OS`);
  assert(read(path.join(out, 'DECOMPOSITION_STRATEGY.md')).includes('Latest safe starting phase'), `${name}: decomposition records safe starting phase`);
  const firstPathBackedIndex = facts.candidateBuildprints.findIndex((c) => c.includedPaths?.length > 0);
  const firstSignalOnlyIndex = facts.candidateBuildprints.findIndex((c) => !c.includedPaths?.length);
  assert(firstPathBackedIndex < 0 || firstSignalOnlyIndex < 0 || firstPathBackedIndex < firstSignalOnlyIndex, `${name}: path-backed candidates sort before signal-only candidates`);
  assert(Array.isArray(facts.candidateBuildprints) && facts.candidateBuildprints.length > 0, `${name}: candidate Buildprints generated`);
  assert(containsAll(facts.integrations, expected.integrations ?? []), `${name}: expected integrations detected`);
  assert(containsAll(facts.risky, expected.riskIncludes ?? []), `${name}: expected risk areas detected`);
  assert(containsAll(facts.envNames, expected.envNames ?? []), `${name}: env names detected without values`);
  assert((expected.apiIncludes ?? []).every((needle) => facts.apis.includes(needle)), `${name}: expected API files/routes detected`);
  assert((expected.candidateTitles ?? []).every((needle) => facts.candidateBuildprints.some((c) => c.title.includes(needle))), `${name}: expected candidate titles generated`);
  assert((expected.mustContain ?? []).every((needle) => allText.includes(needle)), `${name}: required text appears in output`);
  assert((expected.mustNotContain ?? []).every((needle) => !allText.includes(needle)), `${name}: forbidden secret/malicious values absent`);

  if (name === 'large-monorepo') {
    const selectedOut = fs.mkdtempSync(path.join(os.tmpdir(), `mapper-os-eval-${name}-selected-`));
    execFileSync('node', [agbCli, 'map', project, '--candidate', '1', '--out', selectedOut], { stdio: 'pipe' });
    const selectedFacts = JSON.parse(read(path.join(selectedOut, 'facts.json')));
    const selectedManifest = JSON.parse(read(path.join(selectedOut, 'manifest.json')));
    const selectedPacket = JSON.parse(read(path.join(selectedOut, 'REVIEW_PACKET.json')));
    assert(selectedFacts.selectedCandidate?.includedPaths?.length > 0, `${name}: --candidate selects an evidence-backed candidate`);
    assert(selectedManifest.mode === 'selected Buildprint extraction', `${name}: --candidate switches to selected extraction mode`);
    assert(selectedManifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: --candidate restores implementation rails`);
    assert(selectedPacket.package.selectedScope, `${name}: --candidate records selected scope in review packet`);
    assert(read(path.join(selectedOut, 'SELECTED_CANDIDATE.md')).includes(selectedFacts.selectedCandidate.includedPaths[0]), `${name}: --candidate writes selected evidence paths`);

    const scopedOut = fs.mkdtempSync(path.join(os.tmpdir(), `mapper-os-eval-${name}-scoped-`));
    execFileSync('node', [agbCli, 'map', project, '--scope', 'apps/web', '--out', scopedOut], { stdio: 'pipe' });
    const scopedFacts = JSON.parse(read(path.join(scopedOut, 'facts.json')));
    const scopedManifest = JSON.parse(read(path.join(scopedOut, 'manifest.json')));
    const scopedPacket = JSON.parse(read(path.join(scopedOut, 'REVIEW_PACKET.json')));
    assert(scopedFacts.selectedCandidate?.kind === 'explicit-scope', `${name}: --scope creates explicit selected scope`);
    assert(scopedManifest.mode === 'selected Buildprint extraction', `${name}: --scope switches to selected extraction mode`);
    assert(scopedManifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: --scope restores implementation rails`);
    assert(scopedPacket.package.selectedScope?.includes('apps/web'), `${name}: --scope records selected scope in review packet`);
  }
}

if (failed) {
  console.error(`\nBuildprint Mapper golden eval failed: ${failed} assertion(s)`);
  process.exit(1);
}
console.log('\nBuildprint Mapper golden eval passed');
