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
  assert(Array.isArray(facts.candidateBuildprints) && facts.candidateBuildprints.length > 0, `${name}: candidate Buildprints generated`);
  assert(containsAll(facts.integrations, expected.integrations ?? []), `${name}: expected integrations detected`);
  assert(containsAll(facts.risky, expected.riskIncludes ?? []), `${name}: expected risk areas detected`);
  assert(containsAll(facts.envNames, expected.envNames ?? []), `${name}: env names detected without values`);
  assert((expected.apiIncludes ?? []).every((needle) => facts.apis.includes(needle)), `${name}: expected API files/routes detected`);
  assert((expected.candidateTitles ?? []).every((needle) => facts.candidateBuildprints.some((c) => c.title.includes(needle))), `${name}: expected candidate titles generated`);
  assert((expected.mustContain ?? []).every((needle) => allText.includes(needle)), `${name}: required text appears in output`);
  assert((expected.mustNotContain ?? []).every((needle) => !allText.includes(needle)), `${name}: forbidden secret/malicious values absent`);
}

if (failed) {
  console.error(`\nBuildprint Mapper golden eval failed: ${failed} assertion(s)`);
  process.exit(1);
}
console.log('\nBuildprint Mapper golden eval passed');
