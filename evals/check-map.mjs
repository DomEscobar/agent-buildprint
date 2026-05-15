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
  assert(Array.isArray(facts.candidateBuildprints) && facts.candidateBuildprints.length > 0, `${name}: candidate Buildprints generated`);
  assert(containsAll(facts.integrations, expected.integrations ?? []), `${name}: expected integrations detected`);
  assert(containsAll(facts.risky, expected.riskIncludes ?? []), `${name}: expected risk areas detected`);
  assert(containsAll(facts.envNames, expected.envNames ?? []), `${name}: env names detected without values`);
  assert((expected.apiIncludes ?? []).every((needle) => facts.apis.includes(needle)), `${name}: expected API files detected`);
  assert((expected.mustContain ?? []).every((needle) => allText.includes(needle)), `${name}: required text appears in output`);
  assert((expected.mustNotContain ?? []).every((needle) => !allText.includes(needle)), `${name}: forbidden secret/malicious values absent`);
}

if (failed) {
  console.error(`\nMap golden eval failed: ${failed} assertion(s)`);
  process.exit(1);
}
console.log('\nMap golden eval passed');
