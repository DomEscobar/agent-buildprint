#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targets = args.length ? args : [
  'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/microfish-good-shape/selected-buildprint',
  'buildprints/buildprint-mapper-os/evals/selected-output-fixtures/executable-packet-good/selected-buildprint',
];
let failures = 0;

const rootRequired = [
  'BUILDPRINT.md',
  'CAPABILITY_INDEX.md',
  'CONTEXT_PACKET.json',
  'SOURCE_SURFACE_COVERAGE.md',
  'CONTRACTS.md',
  'TEAM_STACK.md',
  'VERIFICATION.md',
  'EXECUTION_PROTOCOL.md',
  'PRE_IMPLEMENTATION_QUESTIONS.md',
  'IMPLEMENTATION_PLAN.md',
  'CURRENT_STATE.md',
  'manifest.json',
  'capabilities',
];
const requiredCapabilityFiles = ['CAPABILITY.md', 'IMPLEMENTATION.md', 'VERIFICATION.md'];
const forbiddenFiles = new Set([
  'VERFICATION.md',
  'IMPLEMENATION.md',
  'CAPABILTY_INDEX.md',
  'AGENT_EXECUTION_BRIEF.md',
  'agent-contract.xml',
  'PHASE_PLAN.md',
  'LOOP_GATES.md',
]);
const legacyDefaults = new Set(['TEST_MATRIX.md', 'TRACEABILITY_MATRIX.md', 'IMPLEMENTATION_COMPLETENESS.md']);
const labels = new Set(['DISCOVERY_ONLY', 'SELECTED_UNQUALIFIED', 'QUALIFIED_SOURCE_INDEPENDENT']);
const knownTeams = new Set([
  'product-architect',
  'ux-ui-craft',
  'test-and-verification',
  'integration-runtime',
  'security-boundary',
  'data-persistence',
]);
const uxRequiredSections = [
  /## Taste Direction/i,
  /## Screens/i,
  /## Workflows/i,
  /## State Inventory/i,
  /## Component Inventory/i,
  /## Responsive Behavior/i,
  /## Visual Quality Bar/i,
  /## Visual Anti-Patterns/i,
  /## Interaction Polish/i,
  /## Accessibility Proof/i,
  /## Browser Proof Plan/i,
];
const designQualityRequiredSections = [
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
  'OUT_OF_SCOPE_BY_USER_ONLY',
  'BLOCKED_NEEDS_REVIEW',
  'LOW_SIGNAL_IGNORED_WITH_REASON',
];
const executableRequiredFiles = [
  'BUILDPRINT.md',
  'START_HERE.md',
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
  '07-execution/implementation-plan.yaml',
  '08-evaluation/acceptance.yaml',
  '08-evaluation/test-matrix.yaml',
  '08-evaluation/quality-rubric.yaml',
  '09-evidence/evidence-ledger.jsonl',
  '09-evidence/unresolved-blockers.md',
  'generated/agent-prompt.md',
  'generated/current-buildprint-compat/BUILDPRINT.md',
  'generated/current-buildprint-compat/CAPABILITY_INDEX.md',
  'generated/current-buildprint-compat/CURRENT_STATE.md',
  'generated/current-buildprint-compat/VERIFICATION.md',
];
const executableRequiredDirs = [
  '03-capabilities',
  '04-interfaces/schemas',
  '07-execution/phases',
  'generated/current-buildprint-compat',
];
const executableCapabilityFiles = [
  'capability.yaml',
  'source-evidence.md',
  'product-contract.md',
  'implementation-workflow.md',
  'proof-contract.yaml',
];
const executablePromotionRequires = [
  'browser_runtime_trace',
  'provider_integration_proof',
  'persistence_roundtrip',
  'security_boundary_review',
  'clean_room_implementation_trace',
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

function manifestFiles(manifest) {
  if (Array.isArray(manifest.files)) {
    return manifest.files.map((entry) => typeof entry === 'string' ? entry : entry?.path).filter(Boolean).sort();
  }
  return [];
}

function markdownCorpus(dir, files) {
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      try {
        return fs.readFileSync(path.join(dir, file), 'utf8');
      } catch {
        return '';
      }
    })
    .join('\n')
    .toLowerCase();
}

function implementationSignals(manifest, corpus) {
  const raw = manifest?.implementationSignals ?? {};
  const teams = new Set(Array.isArray(manifest?.teamStack?.teams) ? manifest.teamStack.teams : []);
  const outputMode = `${manifest?.outputMode ?? ''} ${manifest?.scopeSize ?? ''}`.toLowerCase();
  const hasText = (pattern) => pattern.test(corpus) || pattern.test(outputMode);
  return {
    fullOrBroad: /full-suite|medium|large/.test(outputMode) || hasText(/\b(full-suite|medium|large)\b/),
    ui: raw.hasUserFacingUI === true || teams.has('ux-ui-craft') || hasText(/\b(user-facing ui|browser workflow|dashboard|graph|report|visual editor|operator console|screen inventory|ux_contract)\b/),
    integration: raw.hasUploads === true || raw.hasExternalProviders === true || raw.hasLongRunningJobs === true || raw.hasSimulationRuntime === true || teams.has('integration-runtime') || hasText(/\b(provider|upload|webhook|external side effect|long-running job|runtime|sandbox credential)\b/),
    security: raw.hasAuthAdminOrDestructiveControls === true || raw.hasDeploymentSurface === true || teams.has('security-boundary') || hasText(/\b(auth|admin|payment|destructive|secret|public deployment|sensitive capability)\b/),
    persistence: raw.hasGraphPersistence === true || raw.hasReportsOrExports === true || teams.has('data-persistence') || hasText(/\b(persistence|persistent|durable|restart\/readback|restart|readback|import|export|reporting|project data|graph persistence|state lifecycle)\b/),
  };
}

function requiredTeamsFor(signals) {
  const required = new Set(['test-and-verification']);
  if (signals.fullOrBroad || signals.ui) required.add('product-architect');
  if (signals.ui) required.add('ux-ui-craft');
  if (signals.integration) required.add('integration-runtime');
  if (signals.security) required.add('security-boundary');
  if (signals.persistence) required.add('data-persistence');
  return required;
}

function teamStackTeams(text) {
  return [...knownTeams].filter((team) => new RegExp(`\\b${team}\\b`, 'i').test(text));
}

function readOrderBlock(markdown) {
  const match = markdown.match(/## Read Order\s*([\s\S]*?)(?:\n## |\n# |$)/i);
  return match ? match[1] : '';
}

function normalizeCapabilityBase(activeCapability) {
  if (!activeCapability || typeof activeCapability !== 'string') return '';
  const trimmed = activeCapability.replace(/\\/g, '/').replace(/\/+$/g, '');
  if (trimmed.startsWith('capabilities/')) return trimmed;
  return `capabilities/${trimmed}`;
}

function safeRead(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function hasYamlKey(text, key) {
  return new RegExp(`(^|\\n)${key}:`, 'm').test(text);
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
    try {
      rows.push(JSON.parse(lines[index]));
    } catch (error) {
      fail(target, `09-evidence/evidence-ledger.jsonl line ${index + 1} does not parse: ${error.message}`);
    }
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
  for (const file of files) {
    const base = path.basename(file);
    if (forbiddenFiles.has(base)) fail(target, `forbidden typo/legacy file ${file}`);
  }

  for (const file of executableRequiredFiles) {
    if (!fs.existsSync(path.join(dir, file))) fail(target, `missing executable packet file ${file}`);
  }
  for (const directory of executableRequiredDirs) {
    const full = path.join(dir, directory);
    if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) {
      fail(target, `missing executable packet directory ${directory}`);
    }
  }

  const blueprint = safeRead(path.join(dir, 'blueprint.yaml'));
  requireYamlKeys(target, 'blueprint.yaml', blueprint, [
    'schema_version',
    'canonical_start',
    'claim_status',
    'promotion_requires',
    'obligations',
    'capabilities',
    'context',
    'generated_artifacts',
  ]);
  if (!/schema_version:\s*mapper-os\/executable-packet\.v2/i.test(blueprint)) {
    fail(target, 'blueprint.yaml schema_version must be mapper-os/executable-packet.v2');
  }
  const claimStatus = blueprint.match(/(?:^|\n)claim_status:\s*([A-Z_]+)/)?.[1];
  if (!labels.has(claimStatus)) fail(target, `blueprint.yaml invalid claim_status ${claimStatus ?? 'missing'}`);
  for (const proof of executablePromotionRequires) {
    if (!blueprint.includes(proof)) fail(target, `blueprint.yaml promotion_requires missing ${proof}`);
  }

  const buildprint = safeRead(path.join(dir, 'BUILDPRINT.md'));
  if (!/START_HERE\.md/i.test(buildprint) || !/blueprint\.yaml/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must route agents to START_HERE.md and blueprint.yaml');
  }
  if (!/compatibility router|compatibility/i.test(buildprint)) {
    fail(target, 'BUILDPRINT.md must identify itself as a compatibility router');
  }

  const startHere = safeRead(path.join(dir, 'START_HERE.md'));
  if (!/blueprint\.yaml/i.test(startHere) || !/active capability/i.test(startHere) || !/evidence ledger/i.test(startHere)) {
    fail(target, 'START_HERE.md must route through blueprint.yaml, active capability, and evidence ledger');
  }

  const sourceSurfaceMap = safeRead(path.join(dir, '00-intent/source-surface-map.md'));
  const hasDisposition = sourceSurfaceDispositions.some((label) => sourceSurfaceMap.includes(label));
  if (!hasDisposition) fail(target, '00-intent/source-surface-map.md must include source surface disposition labels');
  if (!/OBL-[A-Z0-9_-]+/i.test(sourceSurfaceMap)) {
    fail(target, '00-intent/source-surface-map.md must route surfaces to product obligations');
  }

  const productObligations = safeRead(path.join(dir, '00-intent/product-obligations.md'));
  if (!/OBL-[A-Z0-9_-]+/i.test(productObligations)) {
    fail(target, '00-intent/product-obligations.md must define obligation IDs');
  }

  const contextMap = safeRead(path.join(dir, '02-context/context-map.yaml'));
  requireYamlKeys(target, '02-context/context-map.yaml', contextMap, ['active_capability', 'must_read', 'read_if_needed', 'do_not_read_yet']);
  if (/03-capabilities\/\*/i.test(contextMap) && !/do_not_read_yet:[\s\S]*03-capabilities\/\*/i.test(contextMap)) {
    fail(target, '02-context/context-map.yaml must not load all capability packs upfront');
  }

  const readOrder = safeRead(path.join(dir, '02-context/read-order.yaml'));
  requireYamlKeys(target, '02-context/read-order.yaml', readOrder, ['initial', 'after_active_proof', 'forbidden_initial']);
  if (!/START_HERE\.md/i.test(readOrder) || !/blueprint\.yaml/i.test(readOrder)) {
    fail(target, '02-context/read-order.yaml must start from START_HERE.md and blueprint.yaml');
  }

  const evidenceIndex = safeRead(path.join(dir, '02-context/source-evidence-index.yaml'));
  requireYamlKeys(target, '02-context/source-evidence-index.yaml', evidenceIndex, ['source_surfaces']);
  if (!/obligation_id:/i.test(evidenceIndex)) {
    fail(target, '02-context/source-evidence-index.yaml must map source surfaces to obligation_id');
  }

  const capabilityIndex = safeRead(path.join(dir, '03-capabilities/capability-index.yaml'));
  requireYamlKeys(target, '03-capabilities/capability-index.yaml', capabilityIndex, ['capabilities']);
  for (const key of ['capability_id', 'obligation_ids', 'autonomy_level', 'proof_contract', 'status']) {
    if (!new RegExp(`${key}:`, 'i').test(capabilityIndex)) {
      fail(target, `03-capabilities/capability-index.yaml missing ${key}`);
    }
  }

  const capsDir = path.join(dir, '03-capabilities');
  const capabilityDirs = fs.existsSync(capsDir)
    ? fs.readdirSync(capsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];
  if (!capabilityDirs.length) fail(target, '03-capabilities/ must contain at least one capability packet');
  for (const pack of capabilityDirs) {
    const packBase = `03-capabilities/${pack.name}`;
    for (const file of executableCapabilityFiles) {
      if (!fs.existsSync(path.join(capsDir, pack.name, file))) {
        fail(target, `${packBase} missing ${file}`);
      }
    }

    const capability = safeRead(path.join(capsDir, pack.name, 'capability.yaml'));
    requireYamlKeys(target, `${packBase}/capability.yaml`, capability, [
      'capability_id',
      'status',
      'product_obligation_ids',
      'source_surface_ids',
      'autonomy_level',
      'proof_contract',
      'stable',
      'free',
      'stop_rules',
    ]);
    if (!/OBL-[A-Z0-9_-]+/i.test(capability)) {
      fail(target, `${packBase}/capability.yaml must route to at least one product obligation`);
    }
    if (!/SRC-[A-Z0-9_-]+|routes\.|api\.|tables\.|jobs\.|providerAdapters\.|auth\.|admin\./i.test(capability)) {
      fail(target, `${packBase}/capability.yaml must list source surface IDs or explicit source-independent reason`);
    }

    const proofContract = safeRead(path.join(capsDir, pack.name, 'proof-contract.yaml'));
    requireYamlKeys(target, `${packBase}/proof-contract.yaml`, proofContract, [
      'proof_contract_id',
      'required_proofs',
      'negative_tests',
      'evidence_ledger',
      'promotion_blockers',
    ]);
    if (!/09-evidence\/evidence-ledger\.jsonl/i.test(proofContract)) {
      fail(target, `${packBase}/proof-contract.yaml must write evidence to 09-evidence/evidence-ledger.jsonl`);
    }
  }

  const implementationPlan = safeRead(path.join(dir, '07-execution/implementation-plan.yaml'));
  requireYamlKeys(target, '07-execution/implementation-plan.yaml', implementationPlan, ['phases']);
  if (!/proof/i.test(implementationPlan) || !/evidence/i.test(implementationPlan)) {
    fail(target, '07-execution/implementation-plan.yaml must include proof and evidence gates');
  }

  const acceptance = safeRead(path.join(dir, '08-evaluation/acceptance.yaml'));
  requireYamlKeys(target, '08-evaluation/acceptance.yaml', acceptance, ['acceptance']);
  for (const proof of executablePromotionRequires) {
    if (!acceptance.includes(proof)) fail(target, `08-evaluation/acceptance.yaml missing ${proof}`);
  }

  const evidenceRows = jsonlRows(target, path.join(dir, '09-evidence/evidence-ledger.jsonl'));
  for (const row of evidenceRows) {
    for (const field of ['artifact_id', 'type', 'capability_id', 'status', 'source', 'proves']) {
      if (!(field in row)) fail(target, `09-evidence/evidence-ledger.jsonl row missing ${field}`);
    }
  }
  if (claimStatus === 'QUALIFIED_SOURCE_INDEPENDENT') {
    for (const proof of executablePromotionRequires) {
      if (!hasPassingEvidence(evidenceRows, proof)) {
        fail(target, `QUALIFIED_SOURCE_INDEPENDENT requires passing evidence-ledger row for ${proof}`);
      }
    }
  }

  const prompt = safeRead(path.join(dir, 'generated/agent-prompt.md'));
  if (!/Generated from:\s*blueprint\.yaml/i.test(prompt)) {
    fail(target, 'generated/agent-prompt.md must declare Generated from: blueprint.yaml');
  }
  if (!/not source of truth|not authoritative/i.test(prompt)) {
    fail(target, 'generated/agent-prompt.md must say it is not source of truth');
  }
  if (!/START_HERE\.md/i.test(prompt) || !/blueprint\.yaml/i.test(prompt)) {
    fail(target, 'generated/agent-prompt.md must route back to START_HERE.md and blueprint.yaml');
  }
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

  for (const file of rootRequired) {
    if (!fs.existsSync(path.join(dir, file))) fail(target, `missing required root ${file}`);
  }

  const files = relFiles(dir);
  const corpus = markdownCorpus(dir, files);
  for (const file of files) {
    const base = path.basename(file);
    if (forbiddenFiles.has(base)) fail(target, `forbidden typo/legacy file ${file}`);
    if (legacyDefaults.has(base)) fail(target, `legacy matrix file must not be a default selected-output spine file: ${file}`);
  }

  if (files.includes('HANDOFF.md') && files.includes('HANDOVER.md')) {
    fail(target, 'duplicate canonical handoff files: HANDOFF.md and HANDOVER.md');
  }

  const manifestPath = path.join(dir, 'manifest.json');
  let manifest = null;
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      fail(target, `manifest.json does not parse: ${error.message}`);
    }
  }

  if (manifest) {
    const label = manifest.qualificationStatus ?? manifest.status;
    if (!labels.has(label)) fail(target, `invalid qualification label ${label}`);
    const listed = manifestFiles(manifest);
    if (!listed.length) fail(target, 'manifest.json must list files');
    for (const listedFile of listed) {
      if (!files.includes(listedFile)) fail(target, `manifest lists missing file ${listedFile}`);
      if (forbiddenFiles.has(path.basename(listedFile))) fail(target, `manifest lists forbidden typo/legacy file ${listedFile}`);
    }
    for (const file of files) {
      if (file === 'manifest.json') continue;
      if (!listed.includes(file)) fail(target, `manifest omits actual file ${file}`);
    }
  }

  const signals = implementationSignals(manifest, corpus);
  const requiredTeams = requiredTeamsFor(signals);
  const teamStackPath = path.join(dir, 'TEAM_STACK.md');
  let teamStack = '';
  if (fs.existsSync(teamStackPath)) {
    teamStack = fs.readFileSync(teamStackPath, 'utf8');
    for (const section of [/Selected Teams/i, /Review Order/i, /Blocking Gates/i]) {
      if (!section.test(teamStack)) fail(target, `TEAM_STACK.md missing ${section.source.replace(/\\/g, '')}`);
    }
    if (!/quality tiers|lazy|simple|quick/i.test(teamStack)) {
      fail(target, 'TEAM_STACK.md must explicitly forbid quality-tier/lazy-team selection');
    }
    const selectedTeams = new Set(teamStackTeams(teamStack));
    for (const team of requiredTeams) {
      if (!selectedTeams.has(team)) fail(target, `TEAM_STACK.md missing required team ${team}`);
    }
  }

  const sourceSurfaceCoveragePath = path.join(dir, 'SOURCE_SURFACE_COVERAGE.md');
  if (fs.existsSync(sourceSurfaceCoveragePath)) {
    const coverage = fs.readFileSync(sourceSurfaceCoveragePath, 'utf8');
    const hasDisposition = sourceSurfaceDispositions.some((label) => coverage.includes(label));
    if (!hasDisposition) fail(target, 'SOURCE_SURFACE_COVERAGE.md must include at least one source surface disposition label');
    if (!/Product obligation|Capability obligation|Owned by capability|OWNED_BY_CAPABILITY|Behavior Loss Review/i.test(coverage)) {
      fail(target, 'SOURCE_SURFACE_COVERAGE.md must connect surfaces to product obligations, capabilities, blockers, merges, or explicit exclusions');
    }
    if (/route parity|required route count|1:1 route|one-to-one route/i.test(coverage) && !/not|anti-parity|not a route|not require/i.test(coverage)) {
      fail(target, 'SOURCE_SURFACE_COVERAGE.md must not require route/function parity');
    }
  }

  if (signals.ui) {
    const uxPath = path.join(dir, 'UX_CONTRACT.md');
    if (!fs.existsSync(uxPath)) {
      fail(target, 'UI-bearing selected output missing UX_CONTRACT.md');
    } else {
      const ux = fs.readFileSync(uxPath, 'utf8');
      for (const pattern of uxRequiredSections) {
        if (!pattern.test(ux)) fail(target, `UX_CONTRACT.md missing required section ${pattern.source.replace(/\\/g, '')}`);
      }
      if (!/screenshot|browser/i.test(ux)) fail(target, 'UX_CONTRACT.md must include screenshot/browser proof plan');
      if (/generic dashboard|static mock|dead\/no-op/i.test(ux) && !/risk|forbidden|anti-pattern/i.test(ux)) {
        fail(target, 'UX_CONTRACT.md mentions generic/static/no-op UI without marking it as a risk or anti-pattern');
      }
    }

    const designPath = path.join(dir, 'DESIGN_QUALITY_BAR.md');
    if (!fs.existsSync(designPath)) {
      fail(target, 'UI-bearing selected output missing DESIGN_QUALITY_BAR.md');
    } else {
      const design = fs.readFileSync(designPath, 'utf8');
      for (const pattern of designQualityRequiredSections) {
        if (!pattern.test(design)) fail(target, `DESIGN_QUALITY_BAR.md missing required section ${pattern.source.replace(/\\/g, '')}`);
      }
      if (!/Empty:/i.test(design) || !/Loading:/i.test(design) || !/Error:/i.test(design) || !/Blocked:/i.test(design) || !/Success\/ready:/i.test(design)) {
        fail(target, 'DESIGN_QUALITY_BAR.md must require screenshots for empty/loading/error/blocked/success states');
      }
    }
  }

  const capsDir = path.join(dir, 'capabilities');
  if (fs.existsSync(capsDir) && fs.statSync(capsDir).isDirectory()) {
    const packs = fs.readdirSync(capsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
    if (!packs.length) fail(target, 'capabilities/ has no capability packs');
    for (const pack of packs) {
      for (const file of requiredCapabilityFiles) {
        if (!fs.existsSync(path.join(capsDir, pack.name, file))) {
          fail(target, `capability pack ${pack.name} missing ${file}`);
        }
      }
      const capabilityPath = path.join(capsDir, pack.name, 'CAPABILITY.md');
      if (fs.existsSync(capabilityPath)) {
        const capability = fs.readFileSync(capabilityPath, 'utf8');
        if (!/Owned source surfaces/i.test(capability)) {
          fail(target, `capability pack ${pack.name} missing Owned source surfaces section`);
        }
        if (/routes?\.|api\.|tables?\.|jobs?\.|providerAdapters?\.|auth\.|admin\.|uploads?\.|exports?\.|imports?\.|fileStores?\.|env\.|deployment\.|docs\./i.test(capability) && !/Product obligations?/i.test(capability)) {
          fail(target, `capability pack ${pack.name} lists source surfaces without Product obligations section`);
        }
      }
    }
  }

  const currentStatePath = path.join(dir, 'CURRENT_STATE.md');
  if (fs.existsSync(currentStatePath)) {
    const currentState = fs.readFileSync(currentStatePath, 'utf8');
    if (!/Read Next/i.test(currentState)) fail(target, 'CURRENT_STATE.md missing Read Next router section');
    if (!/Execution mode/i.test(currentState)) fail(target, 'CURRENT_STATE.md missing execution mode');
    if (!/Active capability/i.test(currentState)) fail(target, 'CURRENT_STATE.md missing active capability');
    if (!/Continue after proof/i.test(currentState)) fail(target, 'CURRENT_STATE.md missing continue-after-proof rule');
    if (!/Stop only on|Stop conditions/i.test(currentState)) fail(target, 'CURRENT_STATE.md missing stop conditions');
    if (!/Do not (open|read).*unrelated|unrelated capability packs/i.test(currentState)) {
      fail(target, 'CURRENT_STATE.md must tell agents not to read unrelated packs upfront');
    }
  }

  const contextPacketPath = path.join(dir, 'CONTEXT_PACKET.json');
  if (fs.existsSync(contextPacketPath)) {
    let packet = null;
    try {
      packet = JSON.parse(fs.readFileSync(contextPacketPath, 'utf8'));
    } catch (error) {
      fail(target, `CONTEXT_PACKET.json does not parse: ${error.message}`);
    }
    if (packet) {
      for (const field of ['schemaVersion', 'executionMode', 'activeCapability', 'mustRead', 'readIfNeeded', 'doNotReadYet', 'proofGate', 'advanceAfterProofTo', 'stopConditions']) {
        if (!(field in packet)) fail(target, `CONTEXT_PACKET.json missing ${field}`);
      }
      if (!['continuous-full-suite', 'active-capability-handoff'].includes(packet.executionMode)) {
        fail(target, `CONTEXT_PACKET.json invalid executionMode ${packet.executionMode}`);
      }
      const activeBase = normalizeCapabilityBase(packet.activeCapability);
      const mustRead = Array.isArray(packet.mustRead) ? packet.mustRead.map((entry) => `${entry}`.replace(/\\/g, '/')) : [];
      const readIfNeeded = Array.isArray(packet.readIfNeeded) ? packet.readIfNeeded : [];
      const doNotReadYet = Array.isArray(packet.doNotReadYet) ? packet.doNotReadYet : [];
      const stopConditions = Array.isArray(packet.stopConditions) ? packet.stopConditions : [];
      if (!mustRead.length) fail(target, 'CONTEXT_PACKET.json mustRead must be a non-empty array');
      if (!readIfNeeded.length) fail(target, 'CONTEXT_PACKET.json readIfNeeded must be a non-empty array');
      if (!doNotReadYet.length) fail(target, 'CONTEXT_PACKET.json doNotReadYet must be a non-empty array');
      if (!stopConditions.length) fail(target, 'CONTEXT_PACKET.json stopConditions must be a non-empty array');
      if (mustRead.includes('CAPABILITY_INDEX.md')) {
        fail(target, 'CONTEXT_PACKET.json mustRead must not include CAPABILITY_INDEX.md; use it only after proof to advance');
      }
      for (const requiredFile of ['CURRENT_STATE.md', 'EXECUTION_PROTOCOL.md', 'TEAM_STACK.md']) {
        if (!mustRead.includes(requiredFile)) fail(target, `CONTEXT_PACKET.json mustRead missing ${requiredFile}`);
      }
      for (const requiredFile of ['CAPABILITY.md', 'IMPLEMENTATION.md', 'VERIFICATION.md']) {
        const expected = `${activeBase}/${requiredFile}`;
        if (!mustRead.includes(expected)) fail(target, `CONTEXT_PACKET.json mustRead missing active pack file ${expected}`);
      }
      for (const entry of mustRead) {
        if (entry.startsWith('capabilities/') && !entry.startsWith(`${activeBase}/`)) {
          fail(target, `CONTEXT_PACKET.json mustRead includes unrelated capability pack file ${entry}`);
        }
      }
      if (!doNotReadYet.some((entry) => /capabilities\/\*/i.test(`${entry}`) || /unrelated capability/i.test(`${entry}`) || /^capabilities\//i.test(`${entry}`))) {
        fail(target, 'CONTEXT_PACKET.json doNotReadYet must block unrelated capability packs');
      }
    }
  }

  const buildprintPath = path.join(dir, 'BUILDPRINT.md');
  if (fs.existsSync(buildprintPath)) {
    const buildprint = fs.readFileSync(buildprintPath, 'utf8');
    const readOrder = readOrderBlock(buildprint);
    if (!/CURRENT_STATE\.md/i.test(readOrder) || !/EXECUTION_PROTOCOL\.md/i.test(readOrder) || !/TEAM_STACK\.md/i.test(readOrder)) {
      fail(target, 'BUILDPRINT.md read order must include CURRENT_STATE.md, EXECUTION_PROTOCOL.md, and TEAM_STACK.md');
    }
    const capabilityIndexPosition = readOrder.search(/CAPABILITY_INDEX\.md/i);
    const currentStatePosition = readOrder.search(/CURRENT_STATE\.md/i);
    if (capabilityIndexPosition !== -1 && currentStatePosition !== -1 && capabilityIndexPosition < currentStatePosition) {
      fail(target, 'BUILDPRINT.md read order must not put CAPABILITY_INDEX.md before CURRENT_STATE.md');
    }
  }

  const executionProtocolPath = path.join(dir, 'EXECUTION_PROTOCOL.md');
  if (fs.existsSync(executionProtocolPath)) {
    const protocol = fs.readFileSync(executionProtocolPath, 'utf8');
    for (const line of protocol.split(/\r?\n/)) {
      if (/read|load|context/i.test(line) && /CAPABILITY_INDEX\.md/i.test(line) && !/proof|prove|advance|dependency|continuation|consult/i.test(line)) {
        fail(target, 'EXECUTION_PROTOCOL.md must not include CAPABILITY_INDEX.md in initial context load');
        break;
      }
    }
  }

  const capabilityIndexPath = path.join(dir, 'CAPABILITY_INDEX.md');
  if (fs.existsSync(capabilityIndexPath)) {
    const index = fs.readFileSync(capabilityIndexPath, 'utf8');
    for (const requiredColumn of ['Required teams', 'Owned source surfaces', 'Topology status', 'UI/UX status', 'Promotion blocker']) {
      if (!index.includes(requiredColumn)) fail(target, `CAPABILITY_INDEX.md missing ${requiredColumn} column`);
    }
    for (const team of requiredTeams) {
      if (!new RegExp(`\\b${team}\\b`, 'i').test(index)) fail(target, `CAPABILITY_INDEX.md missing required team ${team}`);
    }
  }

  const planPath = path.join(dir, 'IMPLEMENTATION_PLAN.md');
  if (fs.existsSync(planPath)) {
    const plan = fs.readFileSync(planPath, 'utf8');
    if (!/Team-Pack Gate/i.test(plan)) fail(target, 'IMPLEMENTATION_PLAN.md missing Team-Pack Gate');
    if (!/First real vertical slice/i.test(plan)) fail(target, 'IMPLEMENTATION_PLAN.md missing first real vertical slice language');
    if (signals.fullOrBroad && !/Architecture Decision Notes|ADR|Decision \| Chosen approach/i.test(plan)) {
      fail(target, 'IMPLEMENTATION_PLAN.md missing architecture decision notes for broad/full-suite output');
    }
  }
}

if (failures) {
  console.error(`\nMapper selected-output check failed: ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Mapper selected-output check passed: ${targets.length} package(s).`);
