#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targets = args.length ? args : ['buildprints/buildprint-mapper-os/evals/selected-output-fixtures/microfish-good-shape/selected-buildprint'];
let failures = 0;

const rootRequired = [
  'BUILDPRINT.md',
  'CAPABILITY_INDEX.md',
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

for (const target of targets) {
  const dir = path.resolve(target);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fail(target, 'selected Buildprint directory does not exist');
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
    if (!/Do not (open|read).*unrelated|unrelated capability packs/i.test(currentState)) {
      fail(target, 'CURRENT_STATE.md must tell agents not to read unrelated packs upfront');
    }
  }

  const buildprintPath = path.join(dir, 'BUILDPRINT.md');
  if (fs.existsSync(buildprintPath)) {
    const buildprint = fs.readFileSync(buildprintPath, 'utf8');
    if (!/CAPABILITY_INDEX\.md/i.test(buildprint) || !/CURRENT_STATE\.md/i.test(buildprint) || !/TEAM_STACK\.md/i.test(buildprint)) {
      fail(target, 'BUILDPRINT.md read order must include CAPABILITY_INDEX.md, CURRENT_STATE.md, and TEAM_STACK.md');
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
