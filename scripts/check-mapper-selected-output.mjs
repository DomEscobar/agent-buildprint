#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targets = args.length ? args : [
  'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint',
];
let failures = 0;

const forbiddenFiles = new Set([
  'VERFICATION.md',
  'IMPLEMENATION.md',
  'CAPABILTY_INDEX.md',
  'AGENT_EXECUTION_BRIEF.md',
  'agent-contract.xml',
  'PHASE_PLAN.md',
  'LOOP_GATES.md',
]);
const forbiddenLegacyPaths = [
  'CAPABILITY_INDEX.md',
  'CONTEXT_PACKET.json',
  'SOURCE_SURFACE_COVERAGE.md',
  'TEAM_STACK.md',
  'UX_CONTRACT.md',
  'DESIGN_QUALITY_BAR.md',
  'CURRENT_STATE.md',
  'EXECUTION_PROTOCOL.md',
  'IMPLEMENTATION_PLAN.md',
  'manifest.json',
  '02-context/active-slice.yaml',
  '03-capabilities/*/capability.yaml',
  '03-capabilities/*/product-contract.md',
  '03-capabilities/*/implementation-workflow.md',
  '03-capabilities/*/proof-contract.yaml',
  '03-capabilities/*/source-evidence.md',
  '07-execution/phases/',
  'capabilities/',
  'generated/current-buildprint-compat/',
];
const labels = new Set(['DISCOVERY_ONLY', 'SELECTED_UNQUALIFIED', 'QUALIFIED_SOURCE_INDEPENDENT']);
const executableUxRequiredSections = [
  /## Screen Inventory/i,
  /## Workflow States/i,
  /## Component Inventory/i,
  /## Responsive Rules/i,
  /## Accessibility/i,
  /## Browser Proof Plan/i,
];
const executableDesignRequiredSections = [
  /## Product Category/i,
  /## Taste Direction/i,
  /## Visual Hierarchy/i,
  /## Forbidden Generic Patterns/i,
  /## Interaction Polish/i,
  /## Accessibility Gates/i,
  /## Responsive Gates/i,
  /## Required Screenshot Set/i,
];
const sourceSurfaceDispositions = [
  'OWNED_BY_CAPABILITY',
  'MERGED_INTO_CAPABILITY',
  'OWNED_BY_CAPABILITY',
  'MERGED_INTO_CAPABILITY',
  'OUT_OF_SCOPE_BY_USER_ONLY',
  'BLOCKED_NEEDS_REVIEW',
  'LOW_SIGNAL_IGNORED_WITH_REASON',
];
const executableRequiredFiles = [
  'BUILDPRINT.md',
  'START_HERE.md',
  'PRE_IMPLEMENTATION_QUESTIONS.md',
  'blueprint.yaml',
  '00-intent/mission.md',
  '00-intent/product-obligations.md',
  '00-intent/source-surface-map.md',
  '01-operating-model/workflow-vs-agentic.md',
  '01-operating-model/autonomy-levels.yaml',
  '01-operating-model/stop-rules.md',
  '01-operating-model/human-approval-policy.md',
  '02-context/context-map.yaml',
  '02-context/read-order.yaml',
  '02-context/team-stack.yaml',
  '02-context/ux-contract.md',
  '02-context/design-quality-bar.md',
  '02-context/source-evidence-index.yaml',
  '03-capabilities/capability-index.yaml',
  '04-interfaces/api-contracts.yaml',
  '04-interfaces/tool-contracts.yaml',
  '04-interfaces/provider-contracts.yaml',
  '05-state-runtime/state-model.yaml',
  '05-state-runtime/persistence.md',
  '05-state-runtime/runtime-topology.md',
  '06-safety/threat-model.md',
  '06-safety/secrets-policy.md',
  '06-safety/destructive-actions.md',
  '06-safety/security-test-fixtures.yaml',
  '07-execution/implementation-plan.yaml',
  '08-evaluation/acceptance.yaml',
  '08-evaluation/claim-upgrade-rules.yaml',
  '08-evaluation/test-matrix.yaml',
  '08-evaluation/quality-rubric.yaml',
  '09-evidence/evidence-ledger.jsonl',
  '09-evidence/evidence-ledger.schema.json',
  '09-evidence/unresolved-blockers.md',
  'generated/agent-prompt.md',
];
const executableRequiredDirs = [
  '03-capabilities',
  '04-interfaces/schemas',
];
const executablePromotionRequires = [
  'browser_runtime_trace',
  'provider_integration_proof',
  'persistence_roundtrip',
  'security_boundary_review',
  'clean_room_implementation_trace',
];
const capabilityRequiredSections = [
  /## Build target/i,
  /## Why this capability exists/i,
  /## Required global context/i,
  /## Required teams and gates/i,
  /## User-visible outcome/i,
  /## System and architecture obligations/i,
  /## UI obligations/i,
  /## Inputs/i,
  /## Outputs and downstream handoff/i,
  /## Implementation path/i,
  /## Stop rules/i,
  /## Proof gate/i,
  /## Unlocks/i,
];

function relFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...relFiles(full, base));
    else if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out.sort();
}

function fail(target, message) {
  failures++;
  console.error(`x ${target}: ${message}`);
}

function markdownCorpus(dir, files) {
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      try { return fs.readFileSync(path.join(dir, file), 'utf8'); }
      catch { return ''; }
    })
    .join('\n')
    .toLowerCase();
}

function safeRead(file) {
  try { return fs.readFileSync(file, 'utf8'); }
  catch { return ''; }
}

function hasYamlKey(text, key) {
  return new RegExp(`(^|\n)${key}:`, 'm').test(text);
}

function requireYamlKeys(target, file, text, keys) {
  for (const key of keys) {
    if (!hasYamlKey(text, key)) fail(target, `${file} missing ${key}`);
  }
}

function isExecutablePacket(dir) {
  return fs.existsSync(path.join(dir, 'blueprint.yaml'))
    || fs.existsSync(path.join(dir, 'START_HERE.md'))
    || fs.existsSync(path.join(dir, '03-capabilities', 'capability-index.yaml'));
}

function jsonlRows(target, file) {
  const text = safeRead(file);
  const rows = [];
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (let index = 0; index < lines.length; index += 1) {
    try { rows.push(JSON.parse(lines[index])); }
    catch (error) { fail(target, `09-evidence/evidence-ledger.jsonl line ${index + 1} does not parse: ${error.message}`); }
  }
  return rows;
}

function rowProves(row) {
  if (Array.isArray(row.proves)) return row.proves.map(String);
  if (typeof row.proves === 'string') return [row.proves];
  return [];
}

function hasPassingEvidence(rows, proofId) {
  return rows.some((row) => {
    const status = String(row.status ?? '').toLowerCase();
    return rowProves(row).includes(proofId) && ['passed', 'proven'].includes(status);
  });
}

function validateExecutablePacket(target, dir) {
  const files = relFiles(dir);
  const corpus = markdownCorpus(dir, files);
  const hasUiSignals = /\b(browser_runtime_trace|user-facing ui|browser workflow|dashboard|graph|report|visual editor|operator console|screen inventory|ux_contract|storyboard|workbench|screenshot_state_set|ux_design_gate)\b/i.test(corpus);

  for (const file of files) {
    const base = path.basename(file);
    if (forbiddenFiles.has(base)) fail(target, `forbidden typo/legacy file ${file}`);
    if (forbiddenLegacyPaths.some((legacy) => {
      if (legacy.includes('*')) {
        const pattern = new RegExp(`^${legacy.split('*').map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[^/]+')}$`);
        return pattern.test(file);
      }
      return legacy.endsWith('/') ? file.startsWith(legacy) : file === legacy;
    })) {
      fail(target, `legacy or fragmented packet file is forbidden in capability-packet v4: ${file}`);
    }
    if (/\b(capability\.yaml|product-contract\.md|implementation-workflow\.md|proof-contract\.yaml|source-evidence\.md)$/i.test(file)) {
      fail(target, `fragmented capability mini-file is forbidden in capability-packet v4: ${file}`);
    }
  }

  for (const file of executableRequiredFiles) {
    if (!fs.existsSync(path.join(dir, file))) fail(target, `missing executable packet file ${file}`);
  }
  for (const directory of executableRequiredDirs) {
    const full = path.join(dir, directory);
    if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) fail(target, `missing executable packet directory ${directory}`);
  }

  const blueprint = safeRead(path.join(dir, 'blueprint.yaml'));
  requireYamlKeys(target, 'blueprint.yaml', blueprint, [
    'schema_version',
    'execution_start',
    'machine_contract',
    'claim_status',
    'promotion_requires',
    'obligations',
    'capabilities',
    'context',
    'generated_artifacts',
  ]);
  if (!/schema_version:\s*mapper-os\/capability-packet\.v4/i.test(blueprint)) {
    fail(target, 'blueprint.yaml schema_version must be mapper-os/capability-packet.v4');
  }
  if (/compatibility_start|proof_contract:/i.test(blueprint)) {
    fail(target, 'blueprint.yaml must not contain compatibility_start or fragmented proof_contract routing');
  }
  const claimStatus = blueprint.match(/(?:^|\n)claim_status:\s*([A-Z_]+)/)?.[1];
  if (!labels.has(claimStatus)) fail(target, `blueprint.yaml invalid claim_status ${claimStatus ?? 'missing'}`);
  for (const proof of executablePromotionRequires) {
    if (!blueprint.includes(proof)) fail(target, `blueprint.yaml promotion_requires missing ${proof}`);
  }
  if (!/active_capability:\s*03-capabilities\//i.test(blueprint)) {
    fail(target, 'blueprint.yaml context.active_capability must point to 03-capabilities/<capability>.md');
  }

  const buildprint = safeRead(path.join(dir, 'BUILDPRINT.md'));
  if (!/START_HERE\.md/i.test(buildprint) || !/blueprint\.yaml/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must route agents to START_HERE.md and blueprint.yaml');
  }
  if (/compatibility router|compatibility_start/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must not be a legacy compatibility router in capability-packet v4');
  }

  const startHere = safeRead(path.join(dir, 'START_HERE.md'));
  if (!/blueprint\.yaml/i.test(startHere) || !/active capability/i.test(startHere) || !/evidence ledger/i.test(startHere)) {
    fail(target, 'START_HERE.md must route through blueprint.yaml, active capability, and evidence ledger');
  }
  if (!/03-capabilities\/capability-index\.yaml/i.test(startHere)) {
    fail(target, 'START_HERE.md must consult 03-capabilities/capability-index.yaml only after active proof');
  }
  if (!/PRE_IMPLEMENTATION_QUESTIONS\.md/i.test(startHere)) fail(target, 'START_HERE.md must route through PRE_IMPLEMENTATION_QUESTIONS.md before coding');
  if (!/02-context\/team-stack\.yaml/i.test(startHere) || !/team gates/i.test(startHere)) fail(target, 'START_HERE.md must route through 02-context/team-stack.yaml before coding');
  if (hasUiSignals && (!/02-context\/ux-contract\.md/i.test(startHere) || !/02-context\/design-quality-bar\.md/i.test(startHere))) {
    fail(target, 'START_HERE.md must route UI-bearing executable packets through ux-contract.md and design-quality-bar.md');
  }

  const preQuestions = safeRead(path.join(dir, 'PRE_IMPLEMENTATION_QUESTIONS.md'));
  if (!/safe defaults/i.test(preQuestions) || !/at most five/i.test(preQuestions)) fail(target, 'PRE_IMPLEMENTATION_QUESTIONS.md must include at-most-five rule and concrete safe defaults');
  if (/quality tier|choose.*team|lazy\/simple/i.test(preQuestions) && !/do not ask|forbid|forbidden/i.test(preQuestions)) fail(target, 'PRE_IMPLEMENTATION_QUESTIONS.md must forbid quality-tier and team-choice questions');

  const sourceSurfaceMap = safeRead(path.join(dir, '00-intent/source-surface-map.md'));
  const hasDisposition = sourceSurfaceDispositions.some((label) => sourceSurfaceMap.includes(label));
  if (!hasDisposition) fail(target, '00-intent/source-surface-map.md must include source surface disposition labels');
  if (!/OBL-[A-Z0-9_-]+/i.test(sourceSurfaceMap)) fail(target, '00-intent/source-surface-map.md must route surfaces to product obligations');

  const productObligations = safeRead(path.join(dir, '00-intent/product-obligations.md'));
  if (!/OBL-[A-Z0-9_-]+/i.test(productObligations)) fail(target, '00-intent/product-obligations.md must define obligation IDs');

  const claimRules = safeRead(path.join(dir, '08-evaluation/claim-upgrade-rules.yaml'));
  for (const proofType of ['provider_live', 'durable_persistence', 'security_boundary', 'no_fake']) {
    if (!claimRules.includes(proofType)) fail(target, `08-evaluation/claim-upgrade-rules.yaml missing ${proofType}`);
  }
  const evidenceSchema = safeRead(path.join(dir, '09-evidence/evidence-ledger.schema.json'));
  for (const field of ['capability_id', 'proof_type', 'provider_mode', 'upgrades_claim']) {
    if (!evidenceSchema.includes(field)) fail(target, `09-evidence/evidence-ledger.schema.json missing ${field}`);
  }


  const securityFixtures = safeRead(path.join(dir, '06-safety/security-test-fixtures.yaml'));
  for (const fixture of ['path_traversal', 'secret', 'destructive', 'subprocess']) {
    if (!securityFixtures.toLowerCase().includes(fixture)) fail(target, `06-safety/security-test-fixtures.yaml missing ${fixture} fixture`);
  }

  const contextMap = safeRead(path.join(dir, '02-context/context-map.yaml'));
  requireYamlKeys(target, '02-context/context-map.yaml', contextMap, ['active_capability', 'must_read', 'read_if_needed', 'do_not_read_yet']);
  if (!/must_read:[\s\S]*PRE_IMPLEMENTATION_QUESTIONS\.md/i.test(contextMap)) fail(target, '02-context/context-map.yaml must include PRE_IMPLEMENTATION_QUESTIONS.md in must_read');
  if (!/must_read:[\s\S]*02-context\/team-stack\.yaml/i.test(contextMap)) fail(target, '02-context/context-map.yaml must include 02-context/team-stack.yaml in must_read');
  if (!/must_read:[\s\S]*03-capabilities\//i.test(contextMap)) fail(target, '02-context/context-map.yaml must include the active capability in must_read');
  if (hasUiSignals && (!/02-context\/ux-contract\.md/i.test(contextMap) || !/02-context\/design-quality-bar\.md/i.test(contextMap))) fail(target, '02-context/context-map.yaml must route UI-bearing executable packets through ux-contract.md and design-quality-bar.md');
  if (/03-capabilities\/\*/i.test(contextMap) && !/do_not_read_yet:[\s\S]*03-capabilities\/\*/i.test(contextMap)) fail(target, '02-context/context-map.yaml must not load all capability packets upfront');

  const teamStack = safeRead(path.join(dir, '02-context/team-stack.yaml'));
  requireYamlKeys(target, '02-context/team-stack.yaml', teamStack, ['schema_version', 'selected_teams', 'review_order', 'forbidden']);
  for (const team of ['product-architect', 'test-and-verification']) {
    if (!new RegExp(`\\b${team}\\b`, 'i').test(teamStack)) fail(target, `02-context/team-stack.yaml missing required team ${team}`);
  }
  if (hasUiSignals && !/\bux-ui-craft\b/i.test(teamStack)) fail(target, '02-context/team-stack.yaml missing required team ux-ui-craft for UI-bearing executable packet');
  if (!/quality-tier|lazy\/simple|lazy|simple/i.test(teamStack)) fail(target, '02-context/team-stack.yaml must forbid quality-tier/lazy/simple team choices');

  if (hasUiSignals) {
    const ux = safeRead(path.join(dir, '02-context/ux-contract.md'));
    const design = safeRead(path.join(dir, '02-context/design-quality-bar.md'));
    if (!ux) fail(target, 'UI-bearing executable packet missing 02-context/ux-contract.md');
    if (!design) fail(target, 'UI-bearing executable packet missing 02-context/design-quality-bar.md');
    for (const pattern of executableUxRequiredSections) if (ux && !pattern.test(ux)) fail(target, `02-context/ux-contract.md missing required section ${pattern.source.replace(/\\/g, '')}`);
    if ((ux && !/Empty:/i.test(ux)) || (ux && !/Loading:/i.test(ux)) || (ux && !/Error:/i.test(ux)) || (ux && !/Blocked:/i.test(ux)) || (ux && !/Success\/ready:/i.test(ux))) fail(target, '02-context/ux-contract.md must define empty/loading/error/blocked/success UI states');
    if (ux && !/screenshot|browser trace|browser proof/i.test(ux)) fail(target, '02-context/ux-contract.md must include screenshot/browser proof plan');
    for (const pattern of executableDesignRequiredSections) if (design && !pattern.test(design)) fail(target, `02-context/design-quality-bar.md missing required section ${pattern.source.replace(/\\/g, '')}`);
    if (design && (!/Empty:/i.test(design) || !/Loading:/i.test(design) || !/Error:/i.test(design) || !/Blocked:/i.test(design) || !/Success\/ready:/i.test(design))) fail(target, '02-context/design-quality-bar.md must require screenshots for empty/loading/error/blocked/success states');
  }

  const readOrder = safeRead(path.join(dir, '02-context/read-order.yaml'));
  requireYamlKeys(target, '02-context/read-order.yaml', readOrder, ['initial', 'after_active_proof', 'forbidden_initial']);
  if (!/START_HERE\.md/i.test(readOrder) || !/blueprint\.yaml/i.test(readOrder)) fail(target, '02-context/read-order.yaml must start from START_HERE.md and blueprint.yaml');
  if (!/PRE_IMPLEMENTATION_QUESTIONS\.md/i.test(readOrder)) fail(target, '02-context/read-order.yaml must include PRE_IMPLEMENTATION_QUESTIONS.md before active capability loading');
  if (!/02-context\/team-stack\.yaml/i.test(readOrder)) fail(target, '02-context/read-order.yaml must include 02-context/team-stack.yaml before active capability loading');
  if (!/active capability/i.test(readOrder) && !/03-capabilities\//i.test(readOrder)) fail(target, '02-context/read-order.yaml must route the active capability');
  if (hasUiSignals && (!/02-context\/ux-contract\.md/i.test(readOrder) || !/02-context\/design-quality-bar\.md/i.test(readOrder))) fail(target, '02-context/read-order.yaml must include UI gate files for UI-bearing active capabilitys');

  const evidenceIndex = safeRead(path.join(dir, '02-context/source-evidence-index.yaml'));
  requireYamlKeys(target, '02-context/source-evidence-index.yaml', evidenceIndex, ['source_surfaces']);
  if (!/obligation_id:/i.test(evidenceIndex)) fail(target, '02-context/source-evidence-index.yaml must map source surfaces to obligation_id');

  const capabilityIndex = safeRead(path.join(dir, '03-capabilities/capability-index.yaml'));
  requireYamlKeys(target, '03-capabilities/capability-index.yaml', capabilityIndex, ['capabilities']);
  for (const key of ['capability_id', 'file', 'obligation_ids', 'required_teams', 'proof_gate', 'status']) {
    if (!new RegExp(`${key}:`, 'i').test(capabilityIndex)) fail(target, `03-capabilities/capability-index.yaml missing ${key}`);
  }
  if (!/OBL-[A-Z0-9_-]+/i.test(capabilityIndex)) fail(target, '03-capabilities/capability-index.yaml must route capabilities to product obligations');

  const capabilitiesDir = path.join(dir, '03-capabilities');
  const capabilityFiles = fs.existsSync(capabilitiesDir)
    ? fs.readdirSync(capabilitiesDir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')).map((entry) => entry.name).sort()
    : [];
  if (!capabilityFiles.length) fail(target, '03-capabilities/ must contain at least one capability packet markdown file');
  for (const capabilityFile of capabilityFiles) {
    const rel = `03-capabilities/${capabilityFile}`;
    const text = safeRead(path.join(capabilitiesDir, capabilityFile));
    for (const pattern of capabilityRequiredSections) {
      if (!pattern.test(text)) fail(target, `${rel} missing required section ${pattern.source.replace(/\\/g, '')}`);
    }
    for (const token of ['OBL-', 'SRC-', 'Required teams and gates', 'Proof gate', '.buildprint/evidence/evidence-ledger.jsonl', '09-evidence/evidence-ledger.jsonl']) {
      if (!text.includes(token)) fail(target, `${rel} missing ${token}`);
    }
    if (/proof-contract\.yaml|product-contract\.md|implementation-workflow\.md|capability\.yaml/i.test(text)) {
      fail(target, `${rel} must not route to fragmented legacy capability files`);
    }
    if (/browser_runtime_trace/i.test(text)) {
      if (!/ux_design_gate/i.test(text) || !/screenshot_state_set/i.test(text)) fail(target, `${rel} with browser_runtime_trace must require ux_design_gate and screenshot_state_set`);
      if (!/02-context\/ux-contract\.md/i.test(text) || !/02-context\/design-quality-bar\.md/i.test(text)) fail(target, `${rel} with browser_runtime_trace must tie proof to ux-contract.md and design-quality-bar.md`);
    }
  }

  const implementationPlan = safeRead(path.join(dir, '07-execution/implementation-plan.yaml'));
  requireYamlKeys(target, '07-execution/implementation-plan.yaml', implementationPlan, ['phases']);
  if (!/proof/i.test(implementationPlan) || !/evidence/i.test(implementationPlan)) fail(target, '07-execution/implementation-plan.yaml must include proof and evidence gates');

  const acceptance = safeRead(path.join(dir, '08-evaluation/acceptance.yaml'));
  requireYamlKeys(target, '08-evaluation/acceptance.yaml', acceptance, ['acceptance']);
  for (const proof of executablePromotionRequires) if (!acceptance.includes(proof)) fail(target, `08-evaluation/acceptance.yaml missing ${proof}`);

  const evidenceRows = jsonlRows(target, path.join(dir, '09-evidence/evidence-ledger.jsonl'));
  for (const row of evidenceRows) {
    for (const field of ['artifact_id', 'type', 'capability_id', 'status', 'source', 'proves']) {
      if (!(field in row)) fail(target, `09-evidence/evidence-ledger.jsonl row missing ${field}`);
    }
  }
  if (claimStatus === 'QUALIFIED_SOURCE_INDEPENDENT') {
    for (const proof of executablePromotionRequires) {
      if (!hasPassingEvidence(evidenceRows, proof)) fail(target, `QUALIFIED_SOURCE_INDEPENDENT requires passing evidence-ledger row for ${proof}`);
    }
  }

  const prompt = safeRead(path.join(dir, 'generated/agent-prompt.md'));
  if (!/Generated from:\s*blueprint\.yaml/i.test(prompt)) fail(target, 'generated/agent-prompt.md must declare Generated from: blueprint.yaml');
  if (!/not source of truth|not authoritative/i.test(prompt)) fail(target, 'generated/agent-prompt.md must say it is not source of truth');
  if (!/START_HERE\.md/i.test(prompt) || !/blueprint\.yaml/i.test(prompt)) fail(target, 'generated/agent-prompt.md must route back to START_HERE.md and blueprint.yaml');
  if (!/PRE_IMPLEMENTATION_QUESTIONS\.md/i.test(prompt)) fail(target, 'generated/agent-prompt.md must route through PRE_IMPLEMENTATION_QUESTIONS.md before coding');
  if (!/02-context\/team-stack\.yaml/i.test(prompt)) fail(target, 'generated/agent-prompt.md must route through 02-context/team-stack.yaml before coding');
  if (!/active capability/i.test(prompt) && !/03-capabilities\//i.test(prompt)) fail(target, 'generated/agent-prompt.md must route to the active capability');
  if (hasUiSignals && (!/02-context\/ux-contract\.md/i.test(prompt) || !/02-context\/design-quality-bar\.md/i.test(prompt))) fail(target, 'generated/agent-prompt.md must route UI-bearing executable packets through ux-contract.md and design-quality-bar.md');
}

for (const target of targets) {
  const dir = path.resolve(target);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fail(target, 'selected Buildprint directory does not exist');
    continue;
  }
  if (isExecutablePacket(dir)) {
    validateExecutablePacket(target, dir);
    continue;
  }
  fail(target, 'selected Buildprint must be capability-packet v4; legacy selected-output v1/v2 packet shapes are forbidden');
}

if (failures) {
  console.error(`\nMapper selected-output check failed: ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Mapper selected-output check passed: ${targets.length} package(s).`);
