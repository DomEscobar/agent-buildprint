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
    const mapperRequired = [
      ['acceptance executable packet spine', acceptance, /executable packet/i],
      ['acceptance capability packet index', acceptance, /03-capabilities\/capability-index\.yaml/i],
      ['acceptance proof ledger closure', acceptance, /evidence-ledger|proof/i],
      ['acceptance fake placeholder rejection', acceptance, /FAKE_OR_PLACEHOLDER_FAIL|static-shell-only|deterministic-adapter-only/i],
      ['template ux skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/ux-ui-craft.md'), 'utf8'), /Skill Capsule|Taste Variables/i],
      ['template architect skill capsule', fs.readFileSync(path.join(dir, 'templates/teams/product-architect.md'), 'utf8'), /Skill Capsule|Architecture Blueprint Workflow/i],
      ['selected extraction prompt capability packet only', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /capability-packet v4|capability packets/i],
      ['selected extraction prompt proof ledger', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /evidence-ledger\.jsonl/i],
      ['selected extraction prompt team routing', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /02-context\/team-stack\.yaml|Team routing/i],
      ['capability packet blueprint template', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /schema_version:\s*mapper-os\/capability-packet\.v4/i],
      ['execution packet primary start split', fs.readFileSync(path.join(dir, 'templates/executable-packet/blueprint.yaml'), 'utf8'), /execution_start:\s*START_HERE\.md[\s\S]*machine_contract:\s*blueprint\.yaml/i],
      ['capability packet index template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-capabilities/capability-index.yaml'), 'utf8'), /capabilities:[\s\S]*capability_id:[\s\S]*proof_gate:/i],
      ['capability packet markdown template', fs.readFileSync(path.join(dir, 'templates/executable-packet/03-capabilities/_template.md'), 'utf8'), /## Build target[\s\S]*## Required teams and gates[\s\S]*## Proof gate/i],
      ['executable packet claim upgrade template', fs.readFileSync(path.join(dir, 'templates/executable-packet/08-evaluation/claim-upgrade-rules.yaml'), 'utf8'), /provider_live[\s\S]*durable_persistence[\s\S]*no_fake/i],
      ['executable packet evidence schema template', fs.readFileSync(path.join(dir, 'templates/executable-packet/09-evidence/evidence-ledger.schema.json'), 'utf8'), /capability_id[\s\S]*proof_type[\s\S]*provider_mode[\s\S]*upgrades_claim/i],
      ['executable packet security fixtures template', fs.readFileSync(path.join(dir, 'templates/executable-packet/06-safety/security-test-fixtures.yaml'), 'utf8'), /path_traversal|secret_like_value|subprocess_runtime/i],
      ['executable packet overview template', fs.readFileSync(path.join(dir, 'templates/executable-packet/BUILDPRINT.md'), 'utf8'), /execution authority/i],
      ['executable packet start template', fs.readFileSync(path.join(dir, 'templates/executable-packet/START_HERE.md'), 'utf8'), /\.buildprint\/evidence\/evidence-ledger\.jsonl/i],
      ['executable packet pre-question template', fs.readFileSync(path.join(dir, 'templates/executable-packet/PRE_IMPLEMENTATION_QUESTIONS.md'), 'utf8'), /Safe Defaults/i],
      ['executable packet mission template', fs.readFileSync(path.join(dir, 'templates/executable-packet/00-intent/mission.md'), 'utf8'), /source-independent capability packet/i],
      ['executable packet obligations template', fs.readFileSync(path.join(dir, 'templates/executable-packet/00-intent/product-obligations.md'), 'utf8'), /OBL-<id>[\s\S]*proof expectation/i],
      ['executable packet autonomy template', fs.readFileSync(path.join(dir, 'templates/executable-packet/01-operating-model/autonomy-levels.yaml'), 'utf8'), /workflow:[\s\S]*claiming proof without evidence-ledger rows/i],
      ['executable packet stop rules template', fs.readFileSync(path.join(dir, 'templates/executable-packet/01-operating-model/stop-rules.md'), 'utf8'), /Stop and write a blocker row/i],
      ['executable packet approval policy template', fs.readFileSync(path.join(dir, 'templates/executable-packet/01-operating-model/human-approval-policy.md'), 'utf8'), /destructive actions[\s\S]*public publishing/i],
      ['executable packet workflow model template', fs.readFileSync(path.join(dir, 'templates/executable-packet/01-operating-model/workflow-vs-agentic.md'), 'utf8'), /workflow-led/i],
      ['executable packet team stack template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/team-stack.yaml'), 'utf8'), /ux-ui-craft|product-architect|test-and-verification/i],
      ['executable packet UX contract template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/ux-contract.md'), 'utf8'), /Browser Proof Plan|Workflow States/i],
      ['executable packet design quality bar template', fs.readFileSync(path.join(dir, 'templates/executable-packet/02-context/design-quality-bar.md'), 'utf8'), /Taste Direction|Required Screenshot Set/i],
      ['executable packet API contracts template', fs.readFileSync(path.join(dir, 'templates/executable-packet/04-interfaces/api-contracts.yaml'), 'utf8'), /api_contracts:[\s\S]*proof_expectation/i],
      ['executable packet provider contracts template', fs.readFileSync(path.join(dir, 'templates/executable-packet/04-interfaces/provider-contracts.yaml'), 'utf8'), /provider_contracts:[\s\S]*provider_live/i],
      ['executable packet tool contracts template', fs.readFileSync(path.join(dir, 'templates/executable-packet/04-interfaces/tool-contracts.yaml'), 'utf8'), /tool_contracts:[\s\S]*forbidden_without_approval/i],
      ['executable packet state model template', fs.readFileSync(path.join(dir, 'templates/executable-packet/05-state-runtime/state-model.yaml'), 'utf8'), /state_model:[\s\S]*proof_expectation/i],
      ['executable packet persistence template', fs.readFileSync(path.join(dir, 'templates/executable-packet/05-state-runtime/persistence.md'), 'utf8'), /persistence roundtrip evidence row/i],
      ['executable packet runtime topology template', fs.readFileSync(path.join(dir, 'templates/executable-packet/05-state-runtime/runtime-topology.md'), 'utf8'), /UI, API, worker\/job, provider adapter, storage/i],
      ['executable packet destructive actions template', fs.readFileSync(path.join(dir, 'templates/executable-packet/06-safety/destructive-actions.md'), 'utf8'), /forbidden without human approval/i],
      ['executable packet secrets policy template', fs.readFileSync(path.join(dir, 'templates/executable-packet/06-safety/secrets-policy.md'), 'utf8'), /values must be redacted/i],
      ['executable packet threat model template', fs.readFileSync(path.join(dir, 'templates/executable-packet/06-safety/threat-model.md'), 'utf8'), /fake persistence/i],
      ['executable packet quality rubric template', fs.readFileSync(path.join(dir, 'templates/executable-packet/08-evaluation/quality-rubric.yaml'), 'utf8'), /product_depth_preserved/i],
      ['executable packet test matrix template', fs.readFileSync(path.join(dir, 'templates/executable-packet/08-evaluation/test-matrix.yaml'), 'utf8'), /capability_id:[\s\S]*required_for_claim/i],
      ['executable packet unresolved blockers template', fs.readFileSync(path.join(dir, 'templates/executable-packet/09-evidence/unresolved-blockers.md'), 'utf8'), /Preserve scope honestly/i],
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
