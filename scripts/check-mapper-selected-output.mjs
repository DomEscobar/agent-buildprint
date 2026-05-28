#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const rawArgs = process.argv.slice(2);
const expectedSources = [];
const requiredTerms = [];
const targets = [];
let forbidFixturePlaceholders = false;
for (let index = 0; index < rawArgs.length; index += 1) {
  const arg = rawArgs[index];
  if (arg === '--forbid-fixture-placeholders') {
    forbidFixturePlaceholders = true;
  } else if (arg === '--expect-source') {
    expectedSources.push(rawArgs[index + 1] || '');
    index += 1;
  } else if (arg === '--require-term') {
    requiredTerms.push(rawArgs[index + 1] || '');
    index += 1;
  } else {
    targets.push(arg);
  }
}
if (!targets.length) {
  targets.push('buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint');
}
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
  '06-contracts/product-architect.md',
  '06-contracts/ux-ui-craft.md',
  '06-contracts/test-and-verification.md',
  '06-contracts/integration-runtime.md',
  '06-contracts/security-boundary.md',
  '06-contracts/data-persistence.md',
  'generated/agent-prompt.md',
];
const roleContracts = [
  'product-architect',
  'ux-ui-craft',
  'test-and-verification',
  'integration-runtime',
  'security-boundary',
  'data-persistence',
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
  /## Setup defaults/i,
  /## (Product shape|Product \/ capability shape)/i,
  /## Architecture decisions/i,
  /## Production readiness contract/i,
  /## (Workbench UX quality contract|Experience quality contract)/i,
  /## Mapped contract anchors/i,
  /## (Product obligation\/surface matrix|Mapped obligation\/surface matrix)/i,
  /## Implementation project setup/i,
  /## Open assumptions/i,
  /## Phase start gate/i,
];
const phaseSections = [
  /## How to implement this phase/i,
  /## (Product outcome|Capability outcome|Operation outcome)/i,
  /## (Mapped product obligations|Mapped capability obligations|Mapped operation obligations)/i,
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
];
const uiPhaseProofTokens = [
  'repeatable_browser_e2e',
  'visual_quality_gate',
];
const allowedBlueprintModes = [
  'product',
  'framework',
  'integration',
  'automation',
  'library',
  'data-pipeline',
  'infrastructure',
  'mixed',
];
const allowedPhaseStyles = [
  'outcome_flow',
  'primitive_composition_map',
  'boundary_transaction_contract',
  'task_loop_contract',
  'callable_contract',
  'dataflow_contract',
  'operations_contract',
  'mixed_contract',
];
const modeStyleRules = {
  product: ['outcome_flow'],
  framework: ['primitive_composition_map', 'callable_contract'],
  library: ['primitive_composition_map', 'callable_contract'],
  integration: ['boundary_transaction_contract'],
  automation: ['task_loop_contract'],
  'data-pipeline': ['dataflow_contract'],
  infrastructure: ['operations_contract'],
  mixed: ['mixed_contract'],
};
const modeOutcomeHeading = {
  product: /## Product outcome/i,
  framework: /## Capability outcome/i,
  library: /## Capability outcome/i,
  integration: /## Capability outcome/i,
  automation: /## Capability outcome/i,
  'data-pipeline': /## Capability outcome/i,
  infrastructure: /## Operation outcome/i,
  mixed: /## (Product outcome|Capability outcome|Operation outcome)/i,
};
const modeObligationHeading = {
  product: /## Mapped product obligations/i,
  framework: /## Mapped capability obligations/i,
  library: /## Mapped capability obligations/i,
  integration: /## Mapped capability obligations/i,
  automation: /## Mapped capability obligations/i,
  'data-pipeline': /## Mapped capability obligations/i,
  infrastructure: /## Mapped operation obligations/i,
  mixed: /## (Mapped product obligations|Mapped capability obligations|Mapped operation obligations)/i,
};
const concreteFrameworkPattern = /\b(Vue|React|Next(?:\.js)?|Nuxt|Svelte|Angular|Flask|Django|FastAPI|Express|NestJS|Rails|Laravel|Spring|Astro)\b/i;
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

function isSelectedOutputFixtureDir(dir) {
  return dir.split(path.sep).join('/').includes('/evals/selected-output-fixtures/');
}

function validateNoFixtureLeakage(target, dir, files) {
  if (!forbidFixturePlaceholders && isSelectedOutputFixtureDir(path.resolve(dir))) return;
  const fixtureLeakPatterns = [
    /fixtures\/executable-packet/i,
    /executable packet good fixture/i,
    /framework primitive fixture/i,
    /unavailable-fixture/i,
    /OBL-INGEST(?:-|\b)/i,
    /SRC-INGEST-(?:API|PRIMITIVE)/i,
    /api\/records\.ts/i,
    /accept user-submitted records/i,
    /accept a submitted record/i,
    /Upload and persist submitted records/i,
  ];
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.yaml') && !file.endsWith('.json') && !file.endsWith('.jsonl')) continue;
    const text = safeRead(path.join(dir, file));
    for (const pattern of fixtureLeakPatterns) {
      if (pattern.test(text)) fail(target, `${file} contains selected-output fixture placeholder text (${pattern.source}); real generated packets must be grounded in the target repo`);
    }
  }
}

function validateExpectedSourceAndTerms(target, dir, files) {
  if (!expectedSources.length && !requiredTerms.length) return;
  const blueprint = safeRead(path.join(dir, 'blueprint.yaml'));
  for (const expected of expectedSources.filter(Boolean)) {
    if (!blueprint.includes(expected)) fail(target, `blueprint.yaml source block must include expected source ${expected}`);
  }
  const corpus = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.yaml') || file.endsWith('.json') || file.endsWith('.jsonl'))
    .map((file) => safeRead(path.join(dir, file)))
    .join('\n');
  for (const term of requiredTerms.filter(Boolean)) {
    if (!new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(corpus)) {
      fail(target, `selected packet missing required target-grounding term: ${term}`);
    }
  }
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
  validateNoFixtureLeakage(target, dir, files);
  validateExpectedSourceAndTerms(target, dir, files);
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
  const hasBlueprintMode = hasYamlKey(blueprint, 'blueprint_mode');
  let blueprintPrimary = '';
  let blueprintPhaseStyle = '';
  if (hasBlueprintMode) {
    blueprintPrimary = blueprint.match(/blueprint_mode:[\s\S]*?\n\s*primary:\s*([^\s#]+)/i)?.[1]?.trim() || '';
    blueprintPhaseStyle = blueprint.match(/blueprint_mode:[\s\S]*?\n\s*phase_style:\s*([^\s#]+)/i)?.[1]?.trim() || '';
    if (!blueprintPrimary || !allowedBlueprintModes.includes(blueprintPrimary)) fail(target, `blueprint.yaml blueprint_mode.primary must be one of ${allowedBlueprintModes.join(', ')}`);
    if (!blueprintPhaseStyle || !allowedPhaseStyles.includes(blueprintPhaseStyle)) fail(target, `blueprint.yaml blueprint_mode.phase_style must be one of ${allowedPhaseStyles.join(', ')}`);
    const allowedForMode = modeStyleRules[blueprintPrimary] || [];
    if (blueprintPrimary && blueprintPhaseStyle && allowedForMode.length && !allowedForMode.includes(blueprintPhaseStyle)) {
      fail(target, `blueprint.yaml blueprint_mode.phase_style ${blueprintPhaseStyle} does not match primary mode ${blueprintPrimary}; expected ${allowedForMode.join(' or ')}`);
    }
  }
  if (!/schema_version:\s*mapper-os\/executable-blueprint\s*$/im.test(blueprint)) fail(target, 'blueprint.yaml schema_version must be mapper-os/executable-blueprint');
  if (!/execution_start:\s*BUILDPRINT\.md/i.test(blueprint)) fail(target, 'blueprint.yaml execution_start must be BUILDPRINT.md');
  if (!/questions:\s*01-questions\.md/i.test(blueprint) || !/project_setup:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml setup_gate must route 01-questions.md and 02-project-setup.md');
  if (!/observe[\s\S]*plan[\s\S]*execute[\s\S]*verify[\s\S]*reflect[\s\S]*record/i.test(blueprint)) fail(target, 'blueprint.yaml implementation_loop must include observe/plan/execute/verify/reflect/record');
  if (!/proof_gate_failed:\s*current_phase/i.test(blueprint) || !/architecture_contradiction:\s*02-project-setup\.md/i.test(blueprint)) fail(target, 'blueprint.yaml repair_loop must route failures to current phase/setup/questions/evidence');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities|08-evaluation|09-evidence|04-interfaces|05-state-runtime/i.test(blueprint)) fail(target, 'blueprint.yaml contains obsolete pre-baseline paths');
  if (new RegExp('\\nsource:\\s*\\ninput:', 'i').test(`\n${blueprint}`)) fail(target, 'blueprint.yaml source.input must be indented under source');

  const buildprint = safeRead(path.join(dir, 'BUILDPRINT.md'));
  if (!/^# BUILDPRINT:/m.test(buildprint)) fail(target, 'BUILDPRINT.md must be the canonical start file');
  if (!/## Product brief/i.test(buildprint)) fail(target, 'BUILDPRINT.md must include a short Product brief before execution routing');
  for (const token of ['Primary outcome', 'Primary users', 'Main surfaces', 'What this packet must not become']) {
    if (!buildprint.includes(token)) fail(target, `BUILDPRINT.md Product brief missing ${token}`);
  }
  const productBrief = buildprint.match(/## Product brief[\s\S]*?(?=\n## Required read order|$)/i)?.[0] || '';
  if (concreteFrameworkPattern.test(productBrief)) {
    fail(target, 'BUILDPRINT.md Product brief must describe capability surfaces, not freeze source framework names; stack preferences belong in 01-questions.md/setup decisions');
  }
  for (const token of ['01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '06-contracts/', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl']) {
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
  if (!/06-contracts\/<role>\.md|06-contracts\/`? required/i.test(buildprint)) fail(target, 'BUILDPRINT.md must route required roles through 06-contracts/<role>.md');
  if (!/subagents|delegated workers/i.test(buildprint) || !/self-simulate/i.test(buildprint)) fail(target, 'BUILDPRINT.md must permit subagents and require self-simulation fallback');
  if (/\.buildprint\/phase-runs\/<phase-id>\/team\.md/i.test(buildprint)) fail(target, 'BUILDPRINT.md must use team-gates.md, not obsolete team.md');
  if (/START_HERE|PRE_IMPLEMENTATION_QUESTIONS|03-capabilities/i.test(buildprint)) fail(target, 'BUILDPRINT.md contains obsolete pre-baseline entrypoint/capability wording');

  const questions = safeRead(path.join(dir, '01-questions.md'));
  for (const n of [1, 2, 3, 4, 5, 6]) if (!new RegExp(`## ${n}\\.`, 'i').test(questions)) fail(target, `01-questions.md missing numbered question ${n}`);
  if (!/AI best judgment/i.test(questions) || !/highest-quality appropriate/i.test(questions)) fail(target, '01-questions.md must define AI best-judgment defaults');
  if (!/production-grade architecture/i.test(questions) || !/Missing credentials block live proof only/i.test(questions)) fail(target, '01-questions.md must default full-suite packets to production-grade architecture and keep missing credentials scoped to live proof');
  if (!/Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks/i.test(questions)) fail(target, '01-questions.md must avoid blocking on ordinary engineering choices');
  if (concreteFrameworkPattern.test(questions)) fail(target, '01-questions.md must ask generic stack preferences without biasing toward source framework names');

  const setup = safeRead(path.join(dir, '02-project-setup.md'));
  for (const pattern of setupSections) if (!pattern.test(setup)) fail(target, `02-project-setup.md missing ${pattern.source.replace(/\\/g, '')}`);
  for (const obsolete of [
    /## Human preferences/i,
    /## Inferred project shape/i,
    /## Stack decisions/i,
    /## Architecture rules/i,
    /## Team operating model/i,
    /## Execution authority model/i,
    /## Delegation and handoff protocol/i,
    /## AGENTS\.md plan/i,
    /## Quality gates/i,
    /## Safety and permissions/i,
    /## Open questions and assumptions/i,
    /## Product obligation\/surface ledger/i,
  ]) {
    if (obsolete.test(setup)) fail(target, `02-project-setup.md contains obsolete noisy setup section ${obsolete.source.replace(/\\/g, '')}`);
  }
  if (/## Source contract anchors|## Source capability\/surface ledger/i.test(setup)) fail(target, '02-project-setup.md must compile source facts into mapped product obligations, not expose obsolete source evidence sections');
  if (!/Root `AGENTS\.md`|Local `AGENTS\.md`|implementation-project `AGENTS\.md`/i.test(setup)) fail(target, '02-project-setup.md must define implementation-project AGENTS.md plan');
  if (hasBlueprintMode) {
    for (const token of ['Blueprint mode', 'Primary:', 'Phase style:', 'Why this mode fits']) {
      if (!setup.includes(token)) fail(target, `02-project-setup.md missing blueprint mode setup token ${token}`);
    }
  }
  if (!/Runtime setup artifact/i.test(setup) || !/\.buildprint\/setup\.md|\.buildprint\/setup\//i.test(setup) || !/Creating only `AGENTS\.md` is not enough/i.test(setup)) fail(target, '02-project-setup.md must require a runtime .buildprint/setup artifact; AGENTS.md alone is not enough');
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
  for (const token of ['Source evidence', 'Target disposition', 'preserve | replace | merge | defer | drop', 'Target contract', 'Required proof', 'not route/function parity']) {
    if (!setup.includes(token)) fail(target, `02-project-setup.md mapped obligation/surface matrix missing ${token}`);
  }
  if (!/Product obligation|Mapped obligation|Capability obligation|Operation obligation/i.test(setup)) fail(target, '02-project-setup.md mapped obligation/surface matrix missing obligation label');
  if (!/every high-signal mapped surface.*exactly once|No mapped surface may disappear silently/i.test(setup)) fail(target, '02-project-setup.md mapped obligation/surface matrix must enforce per-surface coverage ownership');
  if (!/one owning phase|primary owning phase|Phase\(s\):|Owning phase/i.test(setup)) fail(target, '02-project-setup.md mapped obligation/surface matrix must name owning phase semantics');
  if (!/tests pass|app builds|feature preserved/i.test(setup) || !/Required proof/i.test(setup)) fail(target, '02-project-setup.md mapped obligation/surface matrix must reject generic proof in favor of surface-specific proof');

  const phaseFlow = safeRead(path.join(dir, '03-phases/phase-flow.md'));
  for (const token of ['Phase-Entry Protocol', 'Required Phase Artifacts', '.buildprint/phase-runs/<phase-id>/plan.md', '.buildprint/phase-runs/<phase-id>/team-gates.md', '06-contracts/<role>.md', 'handoffs/<role>.md', 'returns/<role>.md', 'reviews/architecture.md', 'reviews/ux.md', 'reviews/qa.md', '.buildprint/evidence/evidence-ledger.jsonl']) {
    if (!phaseFlow.includes(token)) fail(target, `03-phases/phase-flow.md missing ${token}`);
  }
  if (!/Use subagents, delegated workers, or parallel specialist sessions/i.test(phaseFlow) || !/self-simulate/i.test(phaseFlow)) fail(target, '03-phases/phase-flow.md must include subagent permission plus self-simulation fallback');
  if (!/Subagents are optional tooling\. Role-gated delegation artifacts are mandatory/i.test(phaseFlow)) fail(target, '03-phases/phase-flow.md must make role-gated delegation artifacts mandatory');
  if (/Compiled team skill gates|templates\/teams\/\*|taste variables|domain-fit rubric|ADR-lite tradeoffs before coding/i.test(phaseFlow)) fail(target, '03-phases/phase-flow.md must route role expertise to 06-contracts instead of carrying copied team capsule bodies');
  for (const token of [
    'Do not copy every required proof label into every evidence row',
    'HTTP/API runtime traces prove API/runtime behavior, not browser behavior',
    'Provider adapter/config tests can prove adapter seams',
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

  const contractChecks = {
    'product-architect': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'ADR-lite', 'First vertical slice'],
    'ux-ui-craft': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'Visual quality bar', 'Screenshot critique'],
    'test-and-verification': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'evidence ceiling rule', 'no_fake_scan_pass'],
    'integration-runtime': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'Missing credentials block live proof only'],
    'security-boundary': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'Denied-path'],
    'data-persistence': ['When Active', 'Handoff Scope', 'Reject If', 'Required Return Headings', 'Proof/Evidence Expectations', 'restart/readback'],
  };
  for (const [role, tokens] of Object.entries(contractChecks)) {
    const contract = safeRead(path.join(dir, `06-contracts/${role}.md`));
    for (const token of tokens) {
      if (!contract.toLowerCase().includes(token.toLowerCase())) fail(target, `06-contracts/${role}.md missing ${token}`);
    }
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
    if (hasBlueprintMode) {
      if (!/## Phase mode contract/i.test(text)) fail(target, `${rel} missing ## Phase mode contract for blueprint_mode packet`);
      for (const token of ['blueprint_mode', 'phase_style']) {
        if (!text.includes(token)) fail(target, `${rel} Phase mode contract missing ${token}`);
      }
      const phaseMode = text.match(/blueprint_mode:\s*([^\s#]+)/i)?.[1]?.trim() || '';
      const phaseStyle = text.match(/phase_style:\s*([^\s#]+)/i)?.[1]?.trim() || '';
      if (blueprintPrimary && phaseMode !== blueprintPrimary) fail(target, `${rel} Phase mode contract blueprint_mode ${phaseMode || '(missing)'} must match blueprint.yaml primary ${blueprintPrimary}`);
      if (blueprintPhaseStyle && phaseStyle !== blueprintPhaseStyle) fail(target, `${rel} Phase mode contract phase_style ${phaseStyle || '(missing)'} must match blueprint.yaml phase_style ${blueprintPhaseStyle}`);
      const expectedOutcomeHeading = modeOutcomeHeading[blueprintPrimary];
      const expectedObligationHeading = modeObligationHeading[blueprintPrimary];
      if (expectedOutcomeHeading && !expectedOutcomeHeading.test(text)) fail(target, `${rel} uses wrong outcome heading for blueprint_mode ${blueprintPrimary}`);
      if (expectedObligationHeading && !expectedObligationHeading.test(text)) fail(target, `${rel} uses wrong mapped-obligations heading for blueprint_mode ${blueprintPrimary}`);
    }
    if (/## Source evidence|## Source surface dispositions|Source evidence|source evidence/i.test(text)) fail(target, `${rel} must compile source evidence into mapped product obligations and behavior compatibility contract`);
    for (const token of ['05-evidence/evidence-ledger.jsonl', 'phase_id:', 'current phase', '02-project-setup.md', '01-questions.md']) {
      if (!text.includes(token)) fail(target, `${rel} missing ${token}`);
    }
    if (/03-capabilities|09-evidence|08-evaluation|06-safety\/security-test-fixtures/i.test(text)) fail(target, `${rel} contains obsolete pre-baseline paths`);
    if (/provider_integration_proof_or_blocker/i.test(text)) fail(target, `${rel} uses soft provider blocker label; split adapter/config/test implementation from live proof blockers`);
    if (/Treat each named file as a runtime artifact output/i.test(text)) fail(target, `${rel} uses generic artifact-ownership prose; state/runtime must be phase-owned and distinguish upstream inputs from downstream artifacts`);
    if (/capability_id\s*:/i.test(text)) fail(target, `${rel} must use phase_id, not capability_id, for proof rows`);
    if (/02-context\/ux-contract\.md|design-quality-bar\.md/i.test(text)) fail(target, `${rel} references missing shared UX/design context instead of inline UX contract`);
    if (!/^# [^\r\n]+(?:\r?\n){2}## How to implement this phase\r?\n/i.test(text)) fail(target, `${rel} must start with ## How to implement this phase immediately after the title`);
    if (!/Before writing code, read:[\s\S]*03-phases\/phase-flow\.md[\s\S]*\.buildprint\/next-agent\.md[\s\S]*AGENTS\.md/i.test(text)) fail(target, `${rel} must include phase-flow entry instructions before implementation`);
    if (!/requires_roles:/i.test(text)) fail(target, `${rel} must declare or seed phase-derived required roles`);
    const roles = phaseRoles(text);
    for (const role of roles) {
      if (!roleContracts.includes(role)) fail(target, `${rel} declares unknown requires_roles value ${role}`);
      if (!files.includes(`06-contracts/${role}.md`)) fail(target, `${rel} requires missing role contract 06-contracts/${role}.md`);
    }
    if (roles.length && !/06-contracts\/<role>\.md|06-contracts\/[a-z0-9-]+\.md/i.test(text)) fail(target, `${rel} must tell the agent to resolve requires_roles through 06-contracts/<role>.md`);
    if (roles.length && !/handoff[\s\S]*return/i.test(text)) fail(target, `${rel} must require handoff and return artifacts for every required role before phase_core_passed`);
    if (!/phase-flow required artifacts/i.test(text)) fail(target, `${rel} must block evidence until phase-flow artifacts exist`);
    if (/Runtime evidence ledger:\s*`05-evidence\/evidence-ledger\.jsonl`/i.test(text)) fail(target, `${rel} must write runtime evidence to .buildprint/evidence/evidence-ledger.jsonl, not the packet seed ledger`);
    if (!/preserve|replace|merge|defer|drop/i.test(text)) fail(target, `${rel} behavior compatibility contract must include disposition language`);
    if (!/equivalent target behavior|compatibility impact/i.test(text)) fail(target, `${rel} behavior compatibility contract must preserve product obligations without forcing route/function parity`);
    for (const token of productionPhaseTokens) {
      if (!text.includes(token)) fail(target, `${rel} production proof gate missing ${token}`);
    }
    const uiBearingPhase = blueprintPrimary === 'product' || /\bThis phase is UI-bearing\b|ux-ui-craft/i.test(text);
    if (uiBearingPhase) {
      for (const token of uiPhaseProofTokens) {
        if (!text.includes(token)) fail(target, `${rel} UI proof gate missing ${token}`);
      }
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
  for (const token of ['BUILDPRINT.md', '01-questions.md', '02-project-setup.md', 'blueprint.yaml', '03-phases/phase-index.yaml', '03-phases/phase-flow.md', '06-contracts/', '04-evaluation.md', '05-evidence/evidence-ledger.jsonl', '05-evidence/evidence-ledger.schema.json']) {
    if (!prompt.includes(token)) fail(target, `generated/agent-prompt.md missing ${token}`);
  }
  if (!/subagents|delegated workers/i.test(prompt) || !/self-simulate/i.test(prompt)) fail(target, 'generated/agent-prompt.md must mention subagents/delegated workers and self-simulation fallback');
  if (!/Evidence rows must be narrow/i.test(prompt)) fail(target, 'generated/agent-prompt.md must warn against broad evidence overclaims');
  if (!/do not automatically block downstream implementation/i.test(prompt)) fail(target, 'generated/agent-prompt.md must distinguish qualification blockers from continuation blockers');
  for (const token of ['visual_quality_gate', 'default browser controls', 'local MVP']) {
    if (!prompt.includes(token)) fail(target, `generated/agent-prompt.md missing UX quality warning token ${token}`);
  }
}

function phaseRoles(text) {
  const inline = text.match(/requires_roles:\s*\[([^\]]+)\]/i);
  if (inline) return inline[1].split(',').map((role) => role.trim()).filter(Boolean);
  const block = text.match(/requires_roles:\s*\r?\n((?:\s*-\s*[a-z0-9-]+\s*\r?\n?)+)/i);
  if (!block) return [];
  return [...block[1].matchAll(/^\s*-\s*([a-z0-9-]+)\s*$/gmi)].map((match) => match[1]);
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
