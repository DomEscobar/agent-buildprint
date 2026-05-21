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
  'DESIGN_QUALITY_BAR.md',
  'EXECUTION_PROTOCOL.md',
  'IMPLEMENTATION_PLAN.md',
  'PRE_IMPLEMENTATION_QUESTIONS.md',
  'TEAM_STACK.md',
  'UX_CONTRACT.md',
  'VERIFICATION.md',
  'manifest.json',
  'capabilities',
];
const selectedCapabilityRequired = ['CAPABILITY.md', 'IMPLEMENTATION.md', 'VERIFICATION.md'];

function packageSlugs() {
  try {
    const output = execFileSync('git', ['ls-files', 'buildprints/*/BUILDPRINT.md'], { encoding: 'utf8' }).trim();
    if (output) {
      return [...new Set(output
        .split(/\r?\n/)
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
    && fs.existsSync(path.join(dir, 'TEAM_STACK.md'))
    && fs.existsSync(path.join(dir, 'CURRENT_STATE.md'))
    && fs.existsSync(path.join(dir, 'capabilities'));

  if (isSelectedOutputPackage) {
    const missing = selectedOutputRequired.filter((file) => !fs.existsSync(path.join(dir, file)));
    if (missing.length) {
      failures += missing.length;
      console.error(`âœ— ${slug}: selected output missing ${missing.join(', ')}`);
      continue;
    }

    const capabilitiesDir = path.join(dir, 'capabilities');
    const capabilityIds = fs.readdirSync(capabilitiesDir)
      .filter((name) => fs.statSync(path.join(capabilitiesDir, name)).isDirectory())
      .sort();
    if (!capabilityIds.length) {
      failures++;
      console.error(`âœ— ${slug}: selected output must contain at least one capability pack`);
    }
    for (const capabilityId of capabilityIds) {
      const capabilityDir = path.join(capabilitiesDir, capabilityId);
      const missingCapabilityFiles = selectedCapabilityRequired.filter((file) => !fs.existsSync(path.join(capabilityDir, file)));
      if (missingCapabilityFiles.length) {
        failures += missingCapabilityFiles.length;
        console.error(`âœ— ${slug}: capabilities/${capabilityId} missing ${missingCapabilityFiles.join(', ')}`);
      }
    }

    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
    const manifestFiles = Array.isArray(manifest.files)
      ? manifest.files.map((entry) => typeof entry === 'string' ? entry : entry?.path).filter(Boolean)
      : [];
    if (!manifestFiles.length) {
      failures++;
      console.error(`âœ— ${slug}: selected output manifest.json must list files`);
    }
    for (const file of manifestFiles) {
      if (!fs.existsSync(path.join(dir, file))) {
        failures++;
        console.error(`âœ— ${slug}: selected output manifest lists missing file ${file}`);
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
      ['acceptance architecture topology gate', acceptance, /architecture topology gate/i],
      ['acceptance capability depth matrix', acceptance, /capability depth matrix/i],
      ['acceptance proof ledger closure', acceptance, /Capability Proof Ledger|proof-ledger/i],
      ['acceptance fake placeholder rejection', acceptance, /FAKE_OR_PLACEHOLDER_FAIL|static-shell-only|deterministic-adapter-only/i],
      ['template architecture topology gate', fs.readFileSync(path.join(dir, 'templates/VERIFICATION.md'), 'utf8'), /architecture topology/i],
      ['template capability depth matrix', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Depth status|REAL_IMPLEMENTED|CONTRACT_SEAM_ONLY/i],
      ['template capability source evidence', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Source evidence/i],
      ['template capability product obligation', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Product obligation/i],
      ['template capability required topology', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Required topology/i],
      ['template capability proof command', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Proof command/i],
      ['template capability proof artifact', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Proof artifact/i],
      ['template capability negative test', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Negative test/i],
      ['template capability promotion blocker', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Promotion blocker/i],
      ['template capability required teams', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Required teams/i],
      ['template team stack', fs.readFileSync(path.join(dir, 'templates/TEAM_STACK.md'), 'utf8'), /product-architect|ux-ui-craft|test-and-verification/i],
      ['template UX contract', fs.readFileSync(path.join(dir, 'templates/UX_CONTRACT.md'), 'utf8'), /Browser Proof Plan|Visual Anti-Patterns/i],
      ['template design quality bar', fs.readFileSync(path.join(dir, 'templates/DESIGN_QUALITY_BAR.md'), 'utf8'), /Taste Direction|Required Screenshot Set/i],
      ['template ux skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/ux-ui-craft.md'), 'utf8'), /Skill Capsule|Taste Variables/i],
      ['template architect skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/product-architect.md'), 'utf8'), /Skill Capsule|Architecture Blueprint Workflow/i],
      ['template verification proof ledger', fs.readFileSync(path.join(dir, 'templates/VERIFICATION.md'), 'utf8'), /Capability Proof Ledger/i],
      ['template verification evidence budget', fs.readFileSync(path.join(dir, 'templates/VERIFICATION.md'), 'utf8'), /Evidence Budget Rule/i],
      ['template implementation role chain', fs.readFileSync(path.join(dir, 'templates/IMPLEMENTATION_PLAN.md'), 'utf8'), /Evidence-Producing Role Chain/i],
      ['template implementation team-pack gate', fs.readFileSync(path.join(dir, 'templates/IMPLEMENTATION_PLAN.md'), 'utf8'), /Team-Pack Gate/i],
      ['template execution proof ledger closure', fs.readFileSync(path.join(dir, 'templates/EXECUTION_PROTOCOL.md'), 'utf8'), /proof ledger closure|proof-ledger rows/i],
      ['selected extraction prompt depth gate', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /per-capability evidence\/depth matrix|per-capability depth matrix/i],
      ['selected extraction prompt proof ledger', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /Capability Proof Ledger/i],
      ['selected extraction prompt team routing', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /TEAM_STACK\.md|Team routing/i],
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
