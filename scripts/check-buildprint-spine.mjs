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
    'checks/acceptance.md',
  ]
};
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
    for (const forbiddenRootFile of ['CURRENT_STATE.md', 'EXECUTION_PROTOCOL.md', 'IMPLEMENTATION_PLAN.md', 'START_HERE.md', 'PRE_IMPLEMENTATION_QUESTIONS.md']) {
      if (fs.existsSync(path.join(dir, forbiddenRootFile))) {
        failures++;
        console.error(`âœ— ${slug}: root contains obsolete selected-packet file ${forbiddenRootFile}`);
      }
    }
    const mapperRequired = [
      ['acceptance executable blueprint spine', acceptance, /executable blueprint|phase-gated|PROJECT_SETUP|project setup/i],
      ['acceptance proof ledger closure', acceptance, /evidence-ledger|proof/i],
      ['acceptance fake placeholder rejection', acceptance, /FAKE_OR_PLACEHOLDER_FAIL|static-shell-only|deterministic-adapter-only/i],
      ['template ux skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/ux-ui-craft.md'), 'utf8'), /Skill Capsule|Taste Variables/i],
      ['template architect skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/product-architect.md'), 'utf8'), /Skill Capsule|Architecture Blueprint Workflow/i],
      ['selected extraction prompt executable Buildprint', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /executable-blueprint|03-phases/i],
      ['selected extraction prompt proof ledger', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /05-evidence\/evidence-ledger\.jsonl/i],
      ['selected extraction prompt project setup', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /02-project-setup\.md/i],
      ['executable blueprint schema template', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /schema_version:\s*mapper-os\/executable-blueprint\s*$/im],
      ['executable blueprint starts from BUILDPRINT', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /execution_start:\s*BUILDPRINT\.md[\s\S]*machine_contract:\s*blueprint\.yaml/i],
      ['executable blueprint questions template', fs.readFileSync(path.join(dir, 'templates/executable-packet/01-questions.md'), 'utf8'), /AI best judgment[\s\S]*highest-quality appropriate/i],
      ['executable blueprint project setup template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-project-setup.md'), 'utf8'), /## Architecture rules[\s\S]*## AGENTS\.md plan[\s\S]*## Phase start gate/i],
      ['phase index template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-phases/phase-index.yaml'), 'utf8'), /active_phase:\s*03-phases\/[\s\S]*proof_gate:/i],
      ['phase flow template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-phases/phase-flow.md'), 'utf8'), /Phase-entry protocol[\s\S]*Required phase artifacts[\s\S]*\.buildprint\/phase-runs\/<phase-id>\/plan\.md[\s\S]*\.buildprint\/evidence\/evidence-ledger\.jsonl/i],
      ['phase markdown template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-phases/01-example-phase.md'), 'utf8'), /## How to implement this phase[\s\S]*03-phases\/phase-flow\.md[\s\S]*## Product outcome[\s\S]*## Interfaces touched[\s\S]*## State\/runtime touched[\s\S]*## Repair routing/i],
      ['evaluation template', fs.readFileSync(path.join(dir, 'templates/executable-packet/04-evaluation.md'), 'utf8'), /provider_live[\s\S]*durable_persistence[\s\S]*no_fake[\s\S]*Loop completion rule/i],
      ['evidence schema template', fs.readFileSync(path.join(dir, 'templates/executable-packet/05-evidence/evidence-ledger.schema.json'), 'utf8'), /phase_id[\s\S]*proof_type[\s\S]*provider_mode[\s\S]*upgrades_claim/i],
      ['executable blueprint overview template', fs.readFileSync(path.join(dir, 'templates/executable-packet/BUILDPRINT.md'), 'utf8'), /Required read order[\s\S]*01-questions\.md[\s\S]*02-project-setup\.md[\s\S]*03-phases\/phase-flow\.md[\s\S]*Implementation loop[\s\S]*Repair routing/i],
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
