import fs from 'node:fs';
import path from 'node:path';

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

const slugs = fs.readdirSync(root).filter((name) => fs.statSync(path.join(root, name)).isDirectory()).sort();
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
      ['acceptance architecture topology gate', acceptance, /architecture topology gate/i],
      ['acceptance capability depth matrix', acceptance, /capability depth matrix/i],
      ['acceptance fake placeholder rejection', acceptance, /FAKE_OR_PLACEHOLDER_FAIL|static-shell-only|deterministic-adapter-only/i],
      ['template architecture topology gate', fs.readFileSync(path.join(dir, 'templates/VERIFICATION.md'), 'utf8'), /architecture topology/i],
      ['template capability depth matrix', fs.readFileSync(path.join(dir, 'templates/CAPABILITY_INDEX.md'), 'utf8'), /Depth status|REAL_IMPLEMENTED|CONTRACT_SEAM_ONLY/i],
      ['selected extraction prompt depth gate', fs.readFileSync(path.join(dir, 'prompts/extract-selected.md'), 'utf8'), /per-capability depth matrix/i],
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
