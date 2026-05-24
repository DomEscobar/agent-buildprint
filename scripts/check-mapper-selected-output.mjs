#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targets = args.length ? args : [
  'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint',
];
let failures = 0;

const requiredFiles = [
  'BUILDPRINT.md',
  'blueprint.yaml',
  '01-questions.md',
  '02-project-setup.md',
  '03-phases/phase-index.yaml',
  '04-evaluation.md',
  '05-evidence/evidence-ledger.jsonl',
  '05-evidence/evidence-ledger.schema.json',
  'generated/agent-prompt.md',
];
const forbiddenPaths = [
  'START_HERE.md',
  'PRE_IMPLEMENTATION_QUESTIONS.md',
  'AGENTS.md',
  '00-intent/',
  '01-operating-model/',
  '02-context/',
  '03-capabilities/',
  '04-interfaces/',
  '05-state-runtime/',
  '06-safety/',
  '07-execution/',
  '08-evaluation/',
  '09-evidence/',
  'docs/',
];
const setupSections = [
  /## Human preferences/i,
  /## Inferred project shape/i,
  /## Stack decisions/i,
  /## Source contract anchors/i,
  /## Source capability\/surface ledger/i,
  /## Architecture rules/i,
  /## Team operating model/i,
  /## Execution authority model/i,
  /## Delegation and handoff protocol/i,
  /## AGENTS\.md plan/i,
  /## Quality gates/i,
  /## Safety and permissions/i,
  /## Open questions and assumptions/i,
  /## Phase start gate/i,
];
const phaseSections = [
  /## Product outcome/i,
  /## Source evidence/i,
  /## Source surface dispositions/i,
  /## Implementation scope/i,
  /## Interfaces touched/i,
  /## State\/runtime touched/i,
  /## UX\/UI requirements/i,
  /## Safety\/security constraints/i,
  /## Quality gates/i,
  /## Proof gate/i,
  /## Repair routing/i,
];

function fail(target, message) {
  failures += 1;
  console.error(`x ${target}: ${message}`);
}

function safeRead(file) {
  try { return fs.readFileSync(file, 'utf8'); }
  catch { return ''; }
}

function relFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...relFiles(full, base));
    else if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out.sort();
}

function hasYamlKey(text, key) {
  return new RegExp(`(^|\\n)${key}:`, 'm').test(text);
}

function requireYamlKeys(target, file, text, keys) {
  for (const key of keys) if (!hasYamlKey(text, key)) fail(target, `${file} missing ${key}`);
}

function jsonlRows(target, file, label) {
  const rows = [];
  const lines = safeRead(file).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (let index = 0; index < lines.length; index += 1) {
    try { rows.push(JSON.parse(lines[index])); }
    catch (error) { fail(target, `${label} line ${index + 1} does not parse: ${error.message}`); }
  }
  return rows;
}

function isReferenceRoleLabeled(line) {
  return /\b(?:packet file|packet authority|source path|source anchor|source evidence|source repo|source repository|source file|runtime artifact|runtime output|product artifact|generated artifact|generated output|implementation artifact|implementation output|storage artifact|report output|downstream implementation|implementation project|root\/local)\b/i.test(line);
}

function isIgnoredReference(ref) {
  return ref.startsWith('/')
    || ref.startsWith('http')
    || ref.includes('*')
    || ref.startsWith('.buildprint/')
    || ref.includes('<')
    || ref.includes('>');
}

function validateClassifiedFileReferences(target, dir, files) {
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.yaml') && !file.endsWith('.json') && !file.endsWith('.jsonl')) continue;
    const text = safeRead(path.join(dir, file));
    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      for (const match of line.matchAll(/`([^`]+\.(?:md|yaml|json|jsonl))`/g)) {
        const ref = match[1];
        if (isIgnoredReference(ref)) continue;
        if (ref === 'AGENTS.md') continue;
        if (files.includes(ref)) continue;
        if (isReferenceRoleLabeled(line)) continue;
        fail(target, `${file}:${index + 1} has unclassified file reference ${ref}; label it as packet file, source path, runtime artifact, or implementation project file`);
      }
    }
  }
}

function validate(target, dir) {
  const files = relFiles(dir);
  validateClassifiedFileReferences(target, dir, files);
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(dir, file))) fail(target, `missing executable blueprint file ${file}`);
  }
  for (const file of files) {
    for (const forbidden of forbiddenPaths) {
      if (forbidden.endsWith('/') ? file.startsWith(forbidden) : file === forbidden) {
        fail(target, `forbidden file in current executable packet baseline: ${file}`);
      }
    }
  }

  const blueprint = safeRead(path.join(dir, 'blueprint.yaml'));
  requireYamlKeys(target, 'blueprint.yaml', blueprint, [
    'schema_version', 'execution_start', 'machine_contract', 'claim_status', 'setup_gate',
    'implementation_loop', 'repair_loop', 'phases', 'context', 'generated_artifacts',
  ]);
  if (!/schema_version:\s*mapper-os\/executable-blueprint\.v5/i.test(blueprint)) fail(target, 'blueprint.yaml schema_version must be mapper-os/executable-blueprint.v5');
  if (!/execution_start:\s*BUILDPRINT\.md/i.test(blueprint)) fail(target, 'blueprint.yaml execution_start must be BUILDPRINT.md');
  if (!/questions:\s*01-questions\.md/i.test(blueprint) || !/project_setup:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml setup_gate must route 01-questions.md and 02-project-setup.md');
  if (!/observe[\s\S]*plan[\s\S]*execute[\s\S]*verify[\s\S]*reflect[\s\S]*record/i.test(blueprint)) fail(target, 'blueprint.yaml implementation_loop must include observe/plan/execute/verify/reflect/record');
  if (!/proof_gate_failed:\s*current_phase/i.test(blueprint) || !/architecture_contradiction:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml repair_loop must route failures to current phase/setup/questions/evidence');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities|08-evaluation|09-evidence|04-interfaces|05-state-runtime/i.test(blueprint)) fail(target, 'blueprint.yaml contains obsolete pre-baseline paths');
  if (new RegExp('\\nsource:\\s*\\ninput:', 'i').test(`\n${blueprint}`)) fail(target, 'blueprint.yaml source.input must be indented under source');

  const buildprint = safeRead(path.join(dir, 'BUILDPRINT.md'));
  if (!/^# BUILDPRINT:/m.test(buildprint)) fail(target, 'BUILDPRINT.md must be the canonical start file');
  for (const token of ['01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl']) {
    if (!buildprint.includes(token)) fail(target, `BUILDPRINT.md read order missing ${token}`);
  }
  if (!/Implementation loop/i.test(buildprint) || !/Repair routing/i.test(buildprint)) fail(target, 'BUILDPRINT.md must include implementation loop and repair routing');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities/i.test(buildprint)) fail(target, 'BUILDPRINT.md contains obsolete pre-baseline entrypoint/capability wording');

  const questions = safeRead(path.join(dir, '01-questions.md'));
  for (const n of [1, 2, 3, 4, 5, 6]) if (!new RegExp(`## ${n}\\.`, 'i').test(questions)) fail(target, `01-questions.md missing numbered question ${n}`);
  if (!/AI best judgment/i.test(questions) || !/highest-quality appropriate/i.test(questions)) fail(target, '01-questions.md must define AI best-judgment defaults');
  if (!/Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks/i.test(questions)) fail(target, '01-questions.md must avoid blocking on ordinary engineering choices');

  const setup = safeRead(path.join(dir, '02-project-setup.md'));
  for (const pattern of setupSections) if (!pattern.test(setup)) fail(target, `02-project-setup.md missing ${pattern.source.replace(/\\/g, '')}`);
  if (!/root\/local `AGENTS\.md`|local `AGENTS\.md`|Root `AGENTS\.md`/i.test(setup)) fail(target, '02-project-setup.md must define root/local AGENTS.md plan');
  if (!/scope governor/i.test(setup) || !/next-agent\.md/i.test(setup) || !/handoff/i.test(setup)) fail(target, '02-project-setup.md must define execution authority: AGENTS.md as scope governor, .buildprint/next-agent.md continuity, and bounded handoffs');
  if (!/bounded assignment|bounded handoff/i.test(setup) || !/proof command|verification command/i.test(setup) || !/evidence row/i.test(setup) || !/integrat/i.test(setup)) fail(target, '02-project-setup.md delegation protocol must include bounded assignments, verification/proof, evidence rows, and integration review');
  if (!/Do not start `03-phases\/\*`/i.test(setup)) fail(target, '02-project-setup.md must block phases until setup is explicit');
  for (const token of ['Target disposition', 'preserve | replace | merge | defer | drop', 'Compatibility impact', 'not route/function parity']) {
    if (!setup.includes(token)) fail(target, `02-project-setup.md source capability/surface ledger missing ${token}`);
  }

  const phaseIndex = safeRead(path.join(dir, '03-phases/phase-index.yaml'));
  requireYamlKeys(target, '03-phases/phase-index.yaml', phaseIndex, ['schema_version', 'active_phase', 'phases']);
  if (!/active_phase:\s*03-phases\//i.test(phaseIndex)) fail(target, '03-phases/phase-index.yaml active_phase must point to 03-phases/<phase>.md');
  if (!/phase_id:/i.test(phaseIndex) || !/proof_gate:/i.test(phaseIndex)) fail(target, '03-phases/phase-index.yaml must list phase_id and proof_gate');
  const phaseIds = [...phaseIndex.matchAll(/^\s*-?\s*phase_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim());
  const uniquePhaseIds = new Set(phaseIds);
  if (phaseIds.length !== uniquePhaseIds.size) fail(target, '03-phases/phase-index.yaml contains duplicate phase_id values');

  const phasesDir = path.join(dir, '03-phases');
  const phaseFiles = fs.existsSync(phasesDir)
    ? fs.readdirSync(phasesDir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith('.md')).map((entry) => entry.name).sort()
    : [];
  if (!phaseFiles.length) fail(target, '03-phases/ must contain at least one phase markdown file');
  for (const phaseFile of phaseFiles) {
    const rel = `03-phases/${phaseFile}`;
    const text = safeRead(path.join(phasesDir, phaseFile));
    for (const pattern of phaseSections) if (!pattern.test(text)) fail(target, `${rel} missing ${pattern.source.replace(/\\/g, '')}`);
    for (const token of ['05-evidence/evidence-ledger.jsonl', 'phase_id:', 'current phase', '02-project-setup.md', '01-questions.md']) {
      if (!text.includes(token)) fail(target, `${rel} missing ${token}`);
    }
    if (/03-capabilities|09-evidence|08-evaluation|06-safety\/security-test-fixtures/i.test(text)) fail(target, `${rel} contains obsolete pre-baseline paths`);
    if (/capability_id\s*:/i.test(text)) fail(target, `${rel} must use phase_id, not capability_id, for proof rows`);
    if (/02-context\/ux-contract\.md|design-quality-bar\.md/i.test(text)) fail(target, `${rel} references missing shared UX/design context instead of inline UX contract`);
    if (/Runtime evidence ledger:\s*`05-evidence\/evidence-ledger\.jsonl`/i.test(text)) fail(target, `${rel} must write runtime evidence to .buildprint/evidence/evidence-ledger.jsonl, not the packet seed ledger`);
    if (!/preserve|replace|merge|defer|drop/i.test(text)) fail(target, `${rel} source surface dispositions must include disposition language`);
    if (!/equivalent target behavior|compatibility impact/i.test(text)) fail(target, `${rel} source surface dispositions must preserve capability without forcing route/function parity`);
  }

  const evaluation = safeRead(path.join(dir, '04-evaluation.md'));
  for (const token of ['provider_live', 'durable_persistence', 'security_boundary', 'no_fake', 'Loop completion rule', 'Blocker honesty']) {
    if (!evaluation.includes(token)) fail(target, `04-evaluation.md missing ${token}`);
  }

  const schema = safeRead(path.join(dir, '05-evidence/evidence-ledger.schema.json'));
  for (const field of ['phase_id', 'proof_type', 'provider_mode', 'upgrades_claim']) if (!schema.includes(field)) fail(target, `05-evidence/evidence-ledger.schema.json missing ${field}`);
  const rows = jsonlRows(target, path.join(dir, '05-evidence/evidence-ledger.jsonl'), '05-evidence/evidence-ledger.jsonl');
  for (const row of rows) {
    for (const field of ['artifact_id', 'type', 'phase_id', 'status', 'source', 'proves', 'proof_type', 'provider_mode', 'upgrades_claim']) {
      if (!(field in row)) fail(target, `05-evidence/evidence-ledger.jsonl row missing ${field}`);
    }
    if (row.phase_id && phaseIds.length && !uniquePhaseIds.has(row.phase_id)) fail(target, `05-evidence/evidence-ledger.jsonl row phase_id ${row.phase_id} is not in phase-index.yaml`);
  }

  const prompt = safeRead(path.join(dir, 'generated/agent-prompt.md'));
  if (!/Generated from:\s*blueprint\.yaml/i.test(prompt)) fail(target, 'generated/agent-prompt.md must declare Generated from: blueprint.yaml');
  if (!/not source of truth|not authoritative/i.test(prompt)) fail(target, 'generated/agent-prompt.md must say it is not source of truth');
  for (const token of ['BUILDPRINT.md', '01-questions.md', '02-project-setup.md', '03-phases/phase-index.yaml', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl']) {
    if (!prompt.includes(token)) fail(target, `generated/agent-prompt.md missing ${token}`);
  }
}

for (const target of targets) {
  const dir = path.resolve(target);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fail(target, 'selected Buildprint directory does not exist');
    continue;
  }
  validate(target, dir);
}

if (failures) {
  console.error(`\nMapper selected-output check failed: ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Mapper selected-output check passed: ${targets.length} package(s).`);
