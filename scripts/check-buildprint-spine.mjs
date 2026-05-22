import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve('buildprints');
const required = [
  'BUILDPRINT.md',
  'README.md',
  'SPEC.md',
  'CONTRACTS.md',
  'PLAN.md',
  'TEST_MATRIX.md',
  'VALIDATION_TEMPLATE.md',
  'checks/acceptance.md',
];
const packageRequired = {
  'buildprint-mapper-os': [
    'BUILDPRINT.md',
    'README.md',
    'SPEC.md',
    'CONTRACTS.md',
    'PLAN.md',
    'VERIFICATION.md',
    'EXECUTION_PROTOCOL.md',
    'IMPLEMENTATION_PLAN.md',
    'checks/acceptance.md',
  ]
};
const selectedOutputRequired = [
  'BUILDPRINT.md',
  'CAPABILITY_INDEX.md',
  'CONTRACTS.md',
  'CURRENT_STATE.md',
  'EXECUTION_PROTOCOL.md',
  'IMPLEMENTATION_PLAN.md',
  'PRE_IMPLEMENTATION_QUESTIONS.md',
  'TEAM_STACK.md',
  'VERIFICATION.md',
  'manifest.json',
  'capabilities',
];
const selectedUiRequired = ['UX_CONTRACT.md', 'DESIGN_QUALITY_BAR.md'];
const selectedCapabilityRequired = ['CAPABILITY.md', 'IMPLEMENTATION.md', 'VERIFICATION.md'];

function packageSlugs() {
  try {
    const output = execFileSync('git', ['ls-files', 'buildprints/*/BUILDPRINT.md'], { encoding: 'utf8' }).trim();
    if (output) {
      return [...new Set(output
        .split(/\r?\n/)
        .filter((file) => fs.existsSync(file))
        .map((file) => file.split('/')[1])
        .filter(Boolean))]
        .sort();
    }
  } catch {
    // Fall back to filesystem discovery outside Git checkouts.
  }
  return fs.readdirSync(root).filter((name) => fs.statSync(path.join(root, name)).isDirectory()).sort();
}

const slugs = packageSlugs();
let failures = 0;

for (const slug of slugs) {
  const dir = path.join(root, slug);
  const isSelectedOutputPackage = slug !== 'buildprint-mapper-os'
    && fs.existsSync(path.join(dir, 'CAPABILITY_INDEX.md'))
    && fs.existsSync(path.join(dir, 'capabilities'));

  if (isSelectedOutputPackage) {
    const missing = selectedOutputRequired.filter((file) => !fs.existsSync(path.join(dir, file)));
    if (missing.length) {
      failures += missing.length;
      console.error(`✗ ${slug}: selected output missing ${missing.join(', ')}`);
    }

    let manifest = null;
    if (fs.existsSync(path.join(dir, 'manifest.json'))) {
      try {
        manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
      } catch (error) {
        failures++;
        console.error(`✗ ${slug}: selected output manifest.json must parse as JSON (${error.message})`);
      }
    }

    const teamStack = manifest?.teamStack;
    if (!teamStack || !Array.isArray(teamStack.teams) || teamStack.teams.length === 0) {
      failures++;
      console.error(`✗ ${slug}: selected output manifest.json must define teamStack.teams`);
    }

    const hasUserFacingUI = manifest?.implementationSignals?.hasUserFacingUI === true
      || (Array.isArray(teamStack?.teams) && teamStack.teams.includes('ux-ui-craft'));
    if (hasUserFacingUI) {
      const missingUi = selectedUiRequired.filter((file) => !fs.existsSync(path.join(dir, file)));
      if (missingUi.length) {
        failures += missingUi.length;
        console.error(`✗ ${slug}: UI-bearing selected output missing ${missingUi.join(', ')}`);
      }
    }

    if (fs.existsSync(path.join(dir, 'CAPABILITY_INDEX.md'))) {
      const capabilityIndex = fs.readFileSync(path.join(dir, 'CAPABILITY_INDEX.md'), 'utf8');
      if (!/Required teams/i.test(capabilityIndex)) {
        failures++;
        console.error(`✗ ${slug}: CAPABILITY_INDEX.md must include Required teams column`);
      }
      if (hasUserFacingUI && !/UX_CONTRACT\.md|ux-ui-craft|UI\/UX status/i.test(capabilityIndex)) {
        failures++;
        console.error(`✗ ${slug}: UI-bearing CAPABILITY_INDEX.md must route UI/UX gates to UX_CONTRACT.md or ux-ui-craft`);
      }
    }

    const capabilitiesDir = path.join(dir, 'capabilities');
    const capabilityIds = fs.existsSync(capabilitiesDir)
      ? fs.readdirSync(capabilitiesDir).filter((name) => fs.statSync(path.join(capabilitiesDir, name)).isDirectory()).sort()
      : [];
    if (!capabilityIds.length) {
      failures++;
      console.error(`✗ ${slug}: selected output must contain at least one capability pack`);
    }
    for (const capabilityId of capabilityIds) {
      const capabilityDir = path.join(capabilitiesDir, capabilityId);
      const missingCapabilityFiles = selectedCapabilityRequired.filter((file) => !fs.existsSync(path.join(capabilityDir, file)));
      if (missingCapabilityFiles.length) {
        failures += missingCapabilityFiles.length;
        console.error(`✗ ${slug}: capabilities/${capabilityId} missing ${missingCapabilityFiles.join(', ')}`);
      }
    }

    const manifestFiles = Array.isArray(manifest?.files)
      ? manifest.files.map((entry) => typeof entry === 'string' ? entry : entry?.path).filter(Boolean)
      : [];
    if (!manifestFiles.length) {
      failures++;
      console.error(`✗ ${slug}: selected output manifest.json must list files`);
    }
    for (const file of manifestFiles) {
      if (!fs.existsSync(path.join(dir, file))) {
        failures++;
        console.error(`✗ ${slug}: selected output manifest lists missing file ${file}`);
      }
    }
    continue;
  }

  const requiredForPackage = packageRequired[slug] ?? required;
  const missing = requiredForPackage.filter((file) => !fs.existsSync(path.join(dir, file)));
  if (missing.length) {
    failures += missing.length;
    console.error(`✗ ${slug}: missing ${missing.join(', ')}`);
    continue;
  }

  const readme = fs.readFileSync(path.join(dir, 'README.md'), 'utf8');
  if (!/BUILDPRINT\.md/.test(readme)) {
    failures++;
    console.error(`✗ ${slug}: README.md must point agents to BUILDPRINT.md`);
  }

  const plan = fs.readFileSync(path.join(dir, 'PLAN.md'), 'utf8');
  if (!/(Phase|Plan|Implementation|Roadmap|Read Order)/i.test(plan)) {
    failures++;
    console.error(`✗ ${slug}: PLAN.md must describe or route implementation phases`);
  }

  const validationFile = fs.existsSync(path.join(dir, 'VALIDATION_TEMPLATE.md')) ? 'VALIDATION_TEMPLATE.md' : 'VERIFICATION.md';
  const validation = fs.readFileSync(path.join(dir, validationFile), 'utf8');
  const validationChecks = [
    ['Scope', /scope/i],
    ['Commands', /commands? run|command:/i],
    ['Evidence', /evidence|proof|result|files created/i],
    ['Blockers', /blockers?|gaps?/i],
  ];
  for (const [label, pattern] of validationChecks) {
    if (!pattern.test(validation)) {
      failures++;
      console.error(`✗ ${slug}: VALIDATION_TEMPLATE.md missing ${label}`);
    }
  }

  const acceptance = fs.readFileSync(path.join(dir, 'checks/acceptance.md'), 'utf8');
  if (!/- \[ \]/.test(acceptance)) {
    failures++;
    console.error(`✗ ${slug}: checks/acceptance.md must be a checklist`);
  }

  if (slug === 'buildprint-mapper-os') {
    const mapperRequired = [
      ['acceptance executable packet spine', acceptance, /executable packet/i],
      ['acceptance capability index', acceptance, /03-capabilities\/capability-index\.yaml/i],
      ['acceptance proof ledger closure', acceptance, /evidence-ledger|proof/i],
      ['acceptance fake placeholder rejection', acceptance, /FAKE_OR_PLACEHOLDER_FAIL|static-shell-only|deterministic-adapter-only/i],
      ['template ux skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/ux-ui-craft.md'), 'utf8'), /Skill Capsule|Taste Variables/i],
      ['template architect skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/product-architect.md'), 'utf8'), /Skill Capsule|Architecture Blueprint Workflow/i],
      ['selected extraction prompt executable packet only', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /legacy selected-output v1 files/i],
      ['selected extraction prompt proof ledger', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /evidence-ledger\.jsonl/i],
      ['selected extraction prompt team routing', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /02-context\/team-stack\.yaml|Team routing/i],
      ['executable packet blueprint template', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /schema_version:\s*mapper-os\/executable-packet\.v2/i],
      ['executable packet execution start split', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /compatibility_start:\s*BUILDPRINT\.md[\s\S]*execution_start:\s*START_HERE\.md[\s\S]*machine_contract:\s*blueprint\.yaml/i],
      ['executable packet active slice template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/active-slice.yaml'), 'utf8'), /read_only:[\s\S]*write_only:[\s\S]*forbidden_actions:/i],
      ['executable packet claim upgrade template', fs.readFileSync(path.join(dir, 'templates/executable-packet/08-evaluation/claim-upgrade-rules.yaml'), 'utf8'), /provider_live[\s\S]*durable_persistence[\s\S]*no_fake/i],
      ['executable packet evidence schema template', fs.readFileSync(path.join(dir, 'templates/executable-packet/09-evidence/evidence-ledger.schema.json'), 'utf8'), /proof_type[\s\S]*provider_mode[\s\S]*upgrades_claim/i],
      ['executable packet security fixtures template', fs.readFileSync(path.join(dir, 'templates/executable-packet/06-safety/security-test-fixtures.yaml'), 'utf8'), /path_traversal|secret_like_value|subprocess_runtime/i],
      ['executable packet router template', fs.readFileSync(path.join(dir, 'templates/executable-packet/BUILDPRINT.md'), 'utf8'), /compatibility router/i],
      ['executable packet start template', fs.readFileSync(path.join(dir, 'templates/executable-packet/START_HERE.md'), 'utf8'), /\.buildprint\/evidence\/evidence-ledger\.jsonl/i],
      ['executable packet pre-question template', fs.readFileSync(path.join(dir, 'templates/executable-packet/PRE_IMPLEMENTATION_QUESTIONS.md'), 'utf8'), /Safe Defaults/i],
      ['executable packet team stack template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/team-stack.yaml'), 'utf8'), /ux-ui-craft|product-architect|test-and-verification/i],
      ['executable packet UX contract template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/ux-contract.md'), 'utf8'), /Browser Proof Plan|Workflow States/i],
      ['executable packet design quality bar template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/design-quality-bar.md'), 'utf8'), /Taste Direction|Required Screenshot Set/i],
      ['executable packet capability template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-capabilities/_template/capability.yaml'), 'utf8'), /product_obligation_ids:/i],
      ['executable packet proof template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-capabilities/_template/proof-contract.yaml'), 'utf8'), /evidence_ledger:\s*\.buildprint\/evidence\/evidence-ledger\.jsonl/i],
      ['executable packet generated prompt template', fs.readFileSync(path.join(dir, 'templates/executable-packet/generated/agent-prompt.md'), 'utf8'), /Generated from:\s*blueprint\.yaml/i],
    ];
    for (const [label, text, pattern] of mapperRequired) {
      if (!pattern.test(text)) {
        failures++;
        console.error(`✗ ${slug}: missing ${label}`);
      }
    }
  }
}

if (failures) {
  console.error(`\nBuildprint spine check failed: ${failures} issue(s). See BUILDPRINT_STANDARD.md.`);
  process.exit(1);
}

console.log(`Buildprint spine check passed: ${slugs.length} package(s).`);
