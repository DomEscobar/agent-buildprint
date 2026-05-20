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
  assert(fs.existsSync(path.join(out, 'FEATURE_INVENTORY.md')), `${name}: FEATURE_INVENTORY.md exists`);
  assert(fs.existsSync(path.join(out, 'FEATURE_HYPOTHESES.md')), `${name}: FEATURE_HYPOTHESES.md exists`);
  assert(fs.existsSync(path.join(out, 'EVIDENCE_COVERAGE.md')), `${name}: EVIDENCE_COVERAGE.md exists`);
  assert(fs.existsSync(path.join(out, 'SOURCE_VALIDATION_QUEUE.md')), `${name}: SOURCE_VALIDATION_QUEUE.md exists`);
  assert(fs.existsSync(path.join(out, 'PRODUCT_CAPABILITY_MAP.md')), `${name}: PRODUCT_CAPABILITY_MAP.md exists`);
  assert(fs.existsSync(path.join(out, 'IMPLEMENTATION_DECOMPOSITION.md')), `${name}: IMPLEMENTATION_DECOMPOSITION.md exists`);
  assert(fs.existsSync(path.join(out, 'PHASE_PLAN.md')), `${name}: PHASE_PLAN.md exists`);
  assert(fs.existsSync(path.join(out, 'LOOP_GATES.md')), `${name}: LOOP_GATES.md exists`);
  assert(fs.existsSync(path.join(out, 'PARITY_ACCEPTANCE.md')), `${name}: PARITY_ACCEPTANCE.md exists`);
  assert(fs.existsSync(path.join(out, 'product', 'FEATURE_CATALOG.md')), `${name}: modular product feature catalog exists`);
  assert(fs.existsSync(path.join(out, 'architecture', 'MODULES.md')), `${name}: modular architecture modules exists`);
  assert(fs.existsSync(path.join(out, 'architecture', 'MODULE_CONTRACTS.md')), `${name}: modular module contracts exists`);
  assert(fs.existsSync(path.join(out, 'implementation', 'PHASE_PLAN.md')), `${name}: modular implementation phase index exists`);
  assert(fs.existsSync(path.join(out, 'implementation', 'phases', '00-product-contract.md')), `${name}: implementation phase files exist`);
  assert(fs.existsSync(path.join(out, 'implementation', 'loops', 'feature-contract-loop.md')), `${name}: implementation loop files exist`);
  assert(fs.existsSync(path.join(out, 'quality', 'ACCEPTANCE_MATRIX.md')), `${name}: quality acceptance matrix exists`);
  assert(fs.existsSync(path.join(out, 'evidence', 'EVIDENCE_COVERAGE.md')), `${name}: modular evidence coverage exists`);
  assert(fs.existsSync(path.join(out, 'agent', 'AGENT_EXECUTION_BRIEF.md')), `${name}: modular agent brief exists`);
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
  assert(manifest.qualificationStatus === 'QUALIFICATION_REVIEW_REQUIRED', `${name}: discovery manifest requires qualification review`);
  assert(manifest.qualification?.command === 'agb map', `${name}: map owns qualification status in manifest`);
  assert(fs.existsSync(path.join(out, 'evidence', 'SOURCE_VALIDATION.md')), `${name}: map writes source validation evidence`);
  assert(fs.existsSync(path.join(out, 'evidence', 'qualification-records.json')), `${name}: map writes feature qualification records`);
  assert(fs.existsSync(path.join(out, 'quality', 'PROMOTION_GATE.md')), `${name}: map writes promotion gate`);
  assert(!manifest.requiredFiles.includes('AGENT_EXECUTION_BRIEF.md'), `${name}: discovery manifest does not require implementation rails`);
  assert((expected.apiIncludes ?? []).every((needle) => facts.apis.includes(needle)), `${name}: expected API files detected`);
  const firstPathBackedIndex = facts.candidateBuildprints.findIndex((c) => c.includedPaths?.length > 0);
  const firstSignalOnlyIndex = facts.candidateBuildprints.findIndex((c) => !c.includedPaths?.length);
  assert(firstPathBackedIndex < 0 || firstSignalOnlyIndex < 0 || firstPathBackedIndex < firstSignalOnlyIndex, `${name}: path-backed candidates sort before signal-only candidates`);
  assert(read(path.join(out, 'DECOMPOSITION_STRATEGY.md')).includes('Latest safe starting phase'), `${name}: decomposition strategy records safe starting phase`);
  assert(reviewPacket.reviewPrompt.includes('max-quality readiness phase plan'), `${name}: review packet asks for max-quality phase plan`);
  assert(reviewPacket.reviewPrompt.includes('Loop Gates'), `${name}: review packet asks reviewers to assess Loop Gates`);
  assert(reviewPacket.schemas?.['loop-gate.schema.json']?.properties?.repeatUntil?.enum?.includes('pass_or_blocker'), `${name}: review packet loop gates are pass_or_blocker`);
  assert(Array.isArray(reviewPacket.evidence?.featureInventory), `${name}: review packet carries feature inventory`);
  assert(Array.isArray(reviewPacket.evidence?.evidenceCoverage), `${name}: review packet carries evidence coverage`);
  assert(read(path.join(out, 'FEATURE_INVENTORY.md')).includes('Files are evidence; features are the rebuild contract'), `${name}: feature inventory is capability-first`);
  assert(read(path.join(out, 'EVIDENCE_COVERAGE.md')).includes('Static mapping alone does not qualify behavior'), `${name}: evidence coverage blocks premature qualification`);
  assert(read(path.join(out, 'IMPLEMENTATION_DECOMPOSITION.md')).toLowerCase().includes('repeat until pass or explicit blocker'), `${name}: implementation decomposition includes loop contract`);
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

    const qualificationRecords = JSON.parse(read(path.join(selectedOut, 'evidence', 'qualification-records.json')));
    assert(selectedManifest.qualificationStatus === 'QUALIFICATION_REVIEW_REQUIRED', `${name}: selected map writes qualification status`);
    assert(selectedManifest.qualification?.command === 'agb map', `${name}: selected map owns qualification status in manifest`);
    assert(Array.isArray(qualificationRecords.records), `${name}: selected map writes feature qualification records`);
    assert(fs.existsSync(path.join(selectedOut, 'evidence', 'SOURCE_VALIDATION.md')), `${name}: selected map writes source validation evidence`);
    assert(fs.existsSync(path.join(selectedOut, 'quality', 'PROMOTION_GATE.md')), `${name}: selected map writes promotion gate`);

    const scopedOut = fs.mkdtempSync(path.join(os.tmpdir(), `agb-eval-${name}-scoped-`));
    execFileSync('node', [path.join(root, 'bin', 'agb.js'), 'map', project, '--scope', 'apps/web', '--out', scopedOut], { stdio: 'pipe' });
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
  console.error(`\nMap golden eval failed: ${failed} assertion(s)`);
  process.exit(1);
}
console.log('\nMap golden eval passed');
