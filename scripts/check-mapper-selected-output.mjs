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
  '03-phases/phase-flow.md',
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
  /## Production readiness contract/i,
  /## Workbench UX quality contract/i,
  /## Mapped contract anchors/i,
  /## Product obligation\/surface ledger/i,
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
  /## How to implement this phase/i,
  /## Product outcome/i,
  /## Mapped product obligations/i,
  /## Behavior compatibility contract/i,
  /## Implementation scope/i,
  /## Interfaces touched/i,
  /## State\/runtime touched/i,
  /## UX\/UI requirements/i,
  /## Safety\/security constraints/i,
  /## Quality gates/i,
  /## Proof gate/i,
  /## Repair routing/i,
];
const productionSetupTokens = [
  'Auth/session/tenant boundary',
  'Provider integration contract',
  'Durable persistence contract',
  'Worker/runtime contract',
  'Deployment and operations contract',
  'Browser/e2e contract',
  'Screenshot critique',
];
const productionPhaseTokens = [
  'provider_adapter_config_test_required',
  'live_provider_proof_blocker_only',
  'worker_retry_cancel_recovery',
  'repeatable_browser_e2e',
  'visual_quality_gate',
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
  return /\b(?:packet file|packet authority|source path|source anchor|source repo|source repository|source file|mapping note|mapped product obligation|runtime artifact|runtime output|product artifact|generated artifact|generated output|implementation artifact|implementation output|storage artifact|report output|downstream implementation|implementation project|root\/local)\b/i.test(line);
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
  if (!/schema_version:\s*mapper-os\/executable-blueprint\s*$/im.test(blueprint)) fail(target, 'blueprint.yaml schema_version must be mapper-os/executable-blueprint');
  if (!/execution_start:\s*BUILDPRINT\.md/i.test(blueprint)) fail(target, 'blueprint.yaml execution_start must be BUILDPRINT.md');
  if (!/questions:\s*01-questions\.md/i.test(blueprint) || !/project_setup:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml setup_gate must route 01-questions.md and 02-project-setup.md');
  if (!/observe[\s\S]*plan[\s\S]*execute[\s\S]*verify[\s\S]*reflect[\s\S]*record/i.test(blueprint)) fail(target, 'blueprint.yaml implementation_loop must include observe/plan/execute/verify/reflect/record');
  if (!/proof_gate_failed:\s*current_phase/i.test(blueprint) || !/architecture_contradiction:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml repair_loop must route failures to current phase/setup/questions/evidence');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities|08-evaluation|09-evidence|04-interfaces|05-state-runtime/i.test(blueprint)) fail(target, 'blueprint.yaml contains obsolete pre-baseline paths');
  if (new RegExp('\\nsource:\\s*\\ninput:', 'i').test(`\n${blueprint}`)) fail(target, 'blueprint.yaml source.input must be indented under source');

  const buildprint = safeRead(path.join(dir, 'BUILDPRINT.md'));
  if (!/^# BUILDPRINT:/m.test(buildprint)) fail(target, 'BUILDPRINT.md must be the canonical start file');
  for (const token of ['01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl']) {
    if (!buildprint.includes(token)) fail(target, `BUILDPRINT.md read order missing ${token}`);
  }
  if (/Read only the active phase file:\s*`03-phases\//i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must not hardcode a specific active phase in the generic read order; route via phase-index active_phase or assignment/.buildprint override');
  }
  if (!/active_phase[\s\S]*03-phases\/phase-index\.yaml/i.test(buildprint) && !/03-phases\/phase-index\.yaml[\s\S]*active_phase/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must say fresh runs select the active phase from 03-phases/phase-index.yaml active_phase');
  }
  if (!/targeted or resumed run/i.test(buildprint) || !/assignment|\.buildprint/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must define targeted/resumed active-phase override behavior');
  }
  if (!/Implementation loop/i.test(buildprint) || !/Repair routing/i.test(buildprint)) fail(target, 'BUILDPRINT.md must include implementation loop and repair routing');
  if (!/phase-flow\.md/i.test(buildprint) || !/phase-runs/i.test(buildprint)) fail(target, 'BUILDPRINT.md must require phase-flow phase-run orchestration before evidence');
  if (/\.buildprint\/phase-runs\/<phase-id>\/team\.md/i.test(buildprint)) fail(target, 'BUILDPRINT.md must use team-gates.md, not obsolete team.md');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities/i.test(buildprint)) fail(target, 'BUILDPRINT.md contains obsolete pre-baseline entrypoint/capability wording');

  const questions = safeRead(path.join(dir, '01-questions.md'));
  for (const n of [1, 2, 3, 4, 5, 6]) if (!new RegExp(`## ${n}\\.`, 'i').test(questions)) fail(target, `01-questions.md missing numbered question ${n}`);
  if (!/AI best judgment/i.test(questions) || !/highest-quality appropriate/i.test(questions)) fail(target, '01-questions.md must define AI best-judgment defaults');
  if (!/production-grade architecture/i.test(questions) || !/Missing credentials block live proof only/i.test(questions)) fail(target, '01-questions.md must default full-suite packets to production-grade architecture and keep missing credentials scoped to live proof');
  if (!/Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks/i.test(questions)) fail(target, '01-questions.md must avoid blocking on ordinary engineering choices');

  const setup = safeRead(path.join(dir, '02-project-setup.md'));
  for (const pattern of setupSections) if (!pattern.test(setup)) fail(target, `02-project-setup.md missing ${pattern.source.replace(/\\/g, '')}`);
  if (/## Source contract anchors|## Source capability\/surface ledger|source evidence/i.test(setup)) fail(target, '02-project-setup.md must compile source facts into mapped product obligations, not expose source evidence sections');
  if (!/root\/local `AGENTS\.md`|local `AGENTS\.md`|Root `AGENTS\.md`/i.test(setup)) fail(target, '02-project-setup.md must define root/local AGENTS.md plan');
  if (!/Runtime setup artifact/i.test(setup) || !/\.buildprint\/setup\.md|\.buildprint\/setup\//i.test(setup) || !/Creating only `AGENTS\.md` is not enough/i.test(setup)) fail(target, '02-project-setup.md must require a runtime .buildprint/setup artifact; AGENTS.md alone is not enough');
  if (!/scope governor/i.test(setup) || !/next-agent\.md/i.test(setup) || !/handoff/i.test(setup)) fail(target, '02-project-setup.md must define execution authority: AGENTS.md as scope governor, .buildprint/next-agent.md continuity, and bounded handoffs');
  if (!/bounded assignment|bounded handoff/i.test(setup) || !/proof command|verification command/i.test(setup) || !/evidence row/i.test(setup) || !/integrat/i.test(setup)) fail(target, '02-project-setup.md delegation protocol must include bounded assignments, verification/proof, evidence rows, and integration review');
  if (!/03-phases\/phase-flow\.md/i.test(setup)) fail(target, '02-project-setup.md must route phase entry through 03-phases/phase-flow.md');
  if (!/Do not start `03-phases\/\*`/i.test(setup)) fail(target, '02-project-setup.md must block phases until setup is explicit');
  for (const token of productionSetupTokens) {
    if (!setup.includes(token)) fail(target, `02-project-setup.md production readiness contract missing ${token}`);
  }
  for (const token of ['UI architecture', 'Product composition', 'Domain-specific affordances', 'Visual system', 'Screenshot critique']) {
    if (!setup.includes(token)) fail(target, `02-project-setup.md workbench UX quality contract missing ${token}`);
  }
  if (/local MVP/i.test(setup) && !/Do not downgrade to a local MVP/i.test(setup)) fail(target, '02-project-setup.md must forbid local MVP downgrades unless explicitly scoped');
  if (!/Missing credentials.*block only live proof/i.test(setup)) fail(target, '02-project-setup.md must keep missing credentials scoped to live proof, not implementation scope');
  for (const token of ['Product obligation', 'Target disposition', 'preserve | replace | merge | defer | drop', 'Compatibility impact', 'not route/function parity']) {
    if (!setup.includes(token)) fail(target, `02-project-setup.md product obligation/surface ledger missing ${token}`);
  }

  const phaseFlow = safeRead(path.join(dir, '03-phases/phase-flow.md'));
  for (const token of ['Phase-entry protocol', 'Required phase artifacts', '.buildprint/phase-runs/<phase-id>/plan.md', '.buildprint/phase-runs/<phase-id>/team-gates.md', 'Optional when real delegation happens', 'handoffs/<role>.md', 'returns/<role>.md', 'reviews/architecture.md', 'reviews/ux.md', 'reviews/qa.md', '.buildprint/evidence/evidence-ledger.jsonl']) {
    if (!phaseFlow.includes(token)) fail(target, `03-phases/phase-flow.md missing ${token}`);
  }
  if (!/If the main session handles the role itself/i.test(phaseFlow) || !/instead of writing fake handoff\/return paperwork/i.test(phaseFlow)) fail(target, '03-phases/phase-flow.md must make compact team gates the default and avoid fake delegation paperwork');
  for (const token of [
    'Compiled team skill gates',
    'templates/teams/*',
    'product-architect',
    'classify product shape',
    'ADR-lite tradeoffs',
    'ux-ui-craft',
    'taste variables',
    'domain-fit rubric',
    'integration-runtime',
    'provider/API/runtime boundaries',
    'data-persistence',
    'state/schema ownership',
    'security-boundary',
    'denied-path tests',
    'test-and-verification',
    'evidence ceiling rule',
  ]) {
    if (!phaseFlow.includes(token)) fail(target, `03-phases/phase-flow.md missing compiled team skill gate token: ${token}`);
  }
  for (const token of [
    'Do not copy every required proof label into every evidence row',
    'HTTP/API runtime traces prove API/runtime behavior, not browser behavior',
    'Provider adapter/config tests can prove adapter seams',
    'do not partially upgrade the combined label',
    'QA review must explicitly audit every `upgrades_claim: true` row',
    'Review prose cannot upgrade implementation proof by itself',
    'Continuation gate',
    'blocks_continuation: false',
    'checkpoint_recorded',
    'phase_core_passed',
    'claim_qualified',
    'UI/controller boundary',
    'visual_quality_gate',
    'default-control shells',
    'raw text-list substitutes',
  ]) {
    if (!phaseFlow.includes(token)) fail(target, `03-phases/phase-flow.md missing evidence honesty rule: ${token}`);
  }
  for (const token of [
    'Review contracts',
    'Architecture review contract',
    'UX review contract',
    'QA review contract',
    '## Verdict',
    '## Dependency direction',
    '## Product obligation preservation',
    '## Provider/live claim honesty',
    '## Next-phase boundary',
    '## Primary user job',
    '## Screen composition',
    '## Visual quality bar',
    '## Domain interaction model',
    '## State matrix',
    '## Screenshot or DOM evidence',
    '## Screenshot critique',
    '## What this does not prove',
    '## Blockers and claim limits',
    '## Evidence row check',
  ]) {
    if (!phaseFlow.includes(token)) fail(target, `03-phases/phase-flow.md missing review contract token: ${token}`);
  }

  const phaseIndex = safeRead(path.join(dir, '03-phases/phase-index.yaml'));
  requireYamlKeys(target, '03-phases/phase-index.yaml', phaseIndex, ['schema_version', 'active_phase', 'phases']);
  if (!/active_phase:\s*03-phases\//i.test(phaseIndex)) fail(target, '03-phases/phase-index.yaml active_phase must point to 03-phases/<phase>.md');
  if (!/phase_id:/i.test(phaseIndex) || !/proof_gate:/i.test(phaseIndex)) fail(target, '03-phases/phase-index.yaml must list phase_id and proof_gate');
  const phaseIds = [...phaseIndex.matchAll(/^\s*-?\s*phase_id:\s*([^\s#]+)/gmi)].map((m) => m[1].trim());
  const uniquePhaseIds = new Set(phaseIds);
  if (phaseIds.length !== uniquePhaseIds.size) fail(target, '03-phases/phase-index.yaml contains duplicate phase_id values');
  const phaseEntries = [...phaseIndex.matchAll(/phase_id:\s*([^\s#]+)[\s\S]*?file:\s*(03-phases\/[^\s#]+\.md)/gmi)].map((m) => ({ phaseId: m[1].trim(), file: m[2].trim() }));
  for (const entry of phaseEntries) {
    const expectedId = path.basename(entry.file, '.md');
    if (entry.phaseId !== expectedId) fail(target, `03-phases/phase-index.yaml phase_id ${entry.phaseId} must match file basename ${expectedId}`);
  }
  if (phaseEntries.length > 1) {
    const emptyDeps = (phaseIndex.match(/depends_on:\s*\[\]/g) || []).length;
    if (emptyDeps === phaseEntries.length) fail(target, '03-phases/phase-index.yaml multi-phase packets must model dependencies; every phase cannot use depends_on: []');
  }

  const phasesDir = path.join(dir, '03-phases');
  const phaseFiles = fs.existsSync(phasesDir)
    ? fs.readdirSync(phasesDir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'phase-flow.md').map((entry) => entry.name).sort()
    : [];
  if (!phaseFiles.length) fail(target, '03-phases/ must contain at least one phase markdown file');
  for (const phaseFile of phaseFiles) {
    const rel = `03-phases/${phaseFile}`;
    const text = safeRead(path.join(phasesDir, phaseFile));
    for (const pattern of phaseSections) if (!pattern.test(text)) fail(target, `${rel} missing ${pattern.source.replace(/\\/g, '')}`);
    if (/## Source evidence|## Source surface dispositions|Source evidence|source evidence/i.test(text)) fail(target, `${rel} must compile source evidence into mapped product obligations and behavior compatibility contract`);
    for (const token of ['05-evidence/evidence-ledger.jsonl', 'phase_id:', 'current phase', '02-project-setup.md', '01-questions.md']) {
      if (!text.includes(token)) fail(target, `${rel} missing ${token}`);
    }
    if (/03-capabilities|09-evidence|08-evaluation|06-safety\/security-test-fixtures/i.test(text)) fail(target, `${rel} contains obsolete pre-baseline paths`);
    if (/provider_integration_proof_or_blocker/i.test(text)) fail(target, `${rel} uses soft provider blocker label; split adapter/config/test implementation from live proof blockers`);
    if (/capability_id\s*:/i.test(text)) fail(target, `${rel} must use phase_id, not capability_id, for proof rows`);
    if (/02-context\/ux-contract\.md|design-quality-bar\.md/i.test(text)) fail(target, `${rel} references missing shared UX/design context instead of inline UX contract`);
    if (!/^# [^\r\n]+(?:\r?\n){2}## How to implement this phase\r?\n/i.test(text)) fail(target, `${rel} must start with ## How to implement this phase immediately after the title`);
    if (!/Before writing code, read:[\s\S]*03-phases\/phase-flow\.md[\s\S]*\.buildprint\/next-agent\.md[\s\S]*AGENTS\.md/i.test(text)) fail(target, `${rel} must include phase-flow entry instructions before implementation`);
    if (!/requires_roles:/i.test(text)) fail(target, `${rel} must declare or seed phase-derived required roles`);
    if (!/phase-flow required artifacts/i.test(text)) fail(target, `${rel} must block evidence until phase-flow artifacts exist`);
    if (/Runtime evidence ledger:\s*`05-evidence\/evidence-ledger\.jsonl`/i.test(text)) fail(target, `${rel} must write runtime evidence to .buildprint/evidence/evidence-ledger.jsonl, not the packet seed ledger`);
    if (!/preserve|replace|merge|defer|drop/i.test(text)) fail(target, `${rel} behavior compatibility contract must include disposition language`);
    if (!/equivalent target behavior|compatibility impact/i.test(text)) fail(target, `${rel} behavior compatibility contract must preserve product obligations without forcing route/function parity`);
    for (const token of productionPhaseTokens) {
      if (!text.includes(token)) fail(target, `${rel} production proof gate missing ${token}`);
    }
    if (/ux-ui-craft/i.test(text) || /## UX\/UI requirements/i.test(text)) {
      for (const token of ['visual', 'Screenshot critique', '02-project-setup.md']) {
        if (!new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(text)) {
          fail(target, `${rel} UX/UI requirements missing ${token}`);
        }
      }
    }
    if (/06-data-lifecycle\.md$/i.test(rel) && !text.includes('migration_retention_backup_upload_limits')) fail(target, `${rel} production proof gate missing migration_retention_backup_upload_limits`);
    if (!/adapter\/config\/test\/runtime wiring exists|adapter.*config.*test/i.test(text)) fail(target, `${rel} must state missing live credentials block live proof only after adapter/config/test/runtime wiring exists`);
    const indexed = phaseEntries.find((entry) => entry.file === rel);
    if (indexed) {
      const evidencePattern = new RegExp(`phase_id:\\s*${indexed.phaseId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      if (!evidencePattern.test(text)) fail(target, `${rel} must use canonical phase_id ${indexed.phaseId} in evidence instructions`);
    }
  }

  const evaluation = safeRead(path.join(dir, '04-evaluation.md'));
  for (const token of ['provider_live', 'durable_persistence', 'security_boundary', 'no_fake', 'production_readiness', 'visual_quality_gate', 'Loop completion rule', 'Phase state model', 'checkpoint_recorded', 'phase_core_passed', 'claim_qualified', 'Blocker honesty', 'Continuation versus qualification', 'blocks_continuation: false']) {
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
  for (const token of ['BUILDPRINT.md', '01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl', '05-evidence/evidence-ledger.schema.json']) {
    if (!prompt.includes(token)) fail(target, `generated/agent-prompt.md missing ${token}`);
  }
  if (!/Evidence rows must be narrow/i.test(prompt)) fail(target, 'generated/agent-prompt.md must warn against broad evidence overclaims');
  if (!/do not automatically block downstream implementation/i.test(prompt)) fail(target, 'generated/agent-prompt.md must distinguish qualification blockers from continuation blockers');
  for (const token of ['visual_quality_gate', 'default browser controls', 'local MVP']) {
    if (!prompt.includes(token)) fail(target, `generated/agent-prompt.md missing UX quality warning token ${token}`);
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
