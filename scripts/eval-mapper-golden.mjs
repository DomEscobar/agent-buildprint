#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fixturesDir = path.join(root, 'buildprints/buildprint-mapper-os/evals/golden-projects');
const reportPath = path.join(root, 'quality/mapper-eval-report.json');
const failures = [];

const integrationDependencyRules = [
  ['stripe', /(^|\/)stripe$/i],
  ['auth', /next-auth|@auth\//i],
  ['ai', /^(ai|openai|@anthropic-ai\/sdk)$/i],
  ['email', /^(resend|nodemailer|@sendgrid\/mail)$/i],
  ['database', /^(prisma|@prisma\/client|pg|mysql2|postgres|mongoose)$/i],
  ['cache', /upstash|redis|ioredis/i],
];

function fail(fixture, message) {
  failures.push({ fixture, message });
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function safeJson(file) {
  return JSON.parse(readText(file));
}

function walk(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full).split(path.sep).join('/');
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', '.next'].includes(entry.name)) continue;
      out.push(...walk(full, base));
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
  return out.sort();
}

function hashFixture(dir) {
  const hash = crypto.createHash('sha256');
  for (const rel of walk(dir)) {
    hash.update(rel);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(dir, rel)));
    hash.update('\0');
  }
  return hash.digest('hex');
}

function unique(values) {
  return [...new Set(values)].sort();
}

function packageDependencies(dir) {
  const file = path.join(dir, 'package.json');
  if (!fs.existsSync(file)) return [];
  const pkg = safeJson(file);
  return unique(Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }));
}

function detectIntegrations(dir, files, deps, fileTexts) {
  const found = new Set();
  for (const dep of deps) {
    for (const [name, pattern] of integrationDependencyRules) {
      if (pattern.test(dep)) found.add(name);
    }
  }
  const combined = fileTexts.map((item) => item.text).join('\n');
  if (/process\.env\.STRIPE_|from ['"]stripe['"]|new Stripe\(/i.test(combined)) found.add('stripe');
  if (/next-auth|auth\(|session|AUTH_SECRET/i.test(combined)) found.add('auth');
  if (/OPENAI_API_KEY|ANTHROPIC_API_KEY|from ['"]ai['"]|generateText|tool call|process\.env\.(OPENAI|ANTHROPIC)/i.test(combined)) found.add('ai');
  if (/resend|sendgrid|nodemailer|external messaging/i.test(combined)) found.add('email');
  if (/DATABASE_URL|prisma|from ['"]pg['"]|auditLog|db\./i.test(combined)) found.add('database');
  if (/UPSTASH|redis|cache/i.test(combined)) found.add('cache');
  return unique([...found]);
}

function detectEnvNames(files, fileTexts) {
  const names = [];
  for (const { rel, text } of fileTexts) {
    if (rel.endsWith('.env.example')) {
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=/);
        if (match) names.push(match[1]);
      }
    }
    for (const match of text.matchAll(/process\.env\.([A-Z0-9_]+)/g)) names.push(match[1]);
  }
  return unique(names);
}

function detectApiSurfaces(files, fileTexts) {
  const surfaces = [];
  for (const rel of files) {
    if (/(^|\/)app\/(?:\([^/]+\)\/)*api\/.*\/route\.(t|j)sx?$/.test(rel)) surfaces.push(rel);
  }
  for (const { rel, text } of fileTexts) {
    if (!/src\/routes\/api\//.test(rel)) continue;
    for (const match of text.matchAll(/fastify\.(get|post|put|patch|delete)\(['"]([^'"]+)['"]/gi)) {
      surfaces.push(`${rel} ${match[1].toUpperCase()} ${match[2]}`);
    }
  }
  return unique(surfaces);
}

function detectRisks(files, integrations, fileTexts) {
  const risks = new Set();
  const combined = fileTexts.map((item) => `${item.rel}\n${item.text}`).join('\n');
  if (integrations.includes('stripe') || /billing|checkout|webhook|subscription|payment/i.test(combined)) risks.add('payments');
  if (integrations.includes('auth') || /AUTH_SECRET|session|roles?|403|forbidden/i.test(combined)) risks.add('auth/session handling');
  if (/admin|owner|auditLog|soft-delete|DELETE\(/i.test(combined) || files.some((file) => file.includes('/admin/'))) risks.add('admin surfaces');
  if (integrations.includes('email') || /resend|sendgrid|external messaging/i.test(combined)) risks.add('external messaging');
  if (integrations.includes('ai') || /tool call|generateText|OPENAI|ANTHROPIC/i.test(combined)) risks.add('AI/tool calls');
  if (/upload|storage|multipart|file/i.test(combined)) risks.add('file upload / storage');
  if (/DELETE\(|db\.user\.update|disabled:\s*true|destructive/i.test(combined)) risks.add('destructive actions');
  return unique([...risks]);
}

function candidateTitles(integrations, risks, apiSurfaces) {
  const titles = new Set();
  if (integrations.includes('stripe') || risks.includes('payments')) titles.add('Billing / Payments Buildprint');
  if (integrations.includes('auth') || risks.includes('auth/session handling')) titles.add('Auth / Session Buildprint');
  if (risks.includes('admin surfaces')) titles.add('Admin Surface Buildprint');
  if (integrations.includes('ai')) titles.add('AI Agent / Tooling Buildprint');
  if (integrations.includes('database') || integrations.includes('cache')) titles.add('Data Infrastructure Buildprint');
  if (apiSurfaces.length) titles.add('Web App Route/API Buildprint');
  if (risks.includes('external messaging')) titles.add('External Messaging Buildprint');
  return unique([...titles]);
}

function blockingQuestions(integrations, risks) {
  const questions = [];
  if (integrations.includes('stripe') || risks.includes('payments')) questions.push('What is the intended billing lifecycle across checkout, subscription updates, webhook retries, cancellation, and past-due recovery?');
  if (risks.includes('admin surfaces')) questions.push('Which admin actions require confirmation or audit events?');
  if (risks.includes('file upload / storage')) questions.push('What file types, size limits, storage provider, retention policy, and malware scanning requirements apply to uploads?');
  if (risks.includes('AI/tool calls')) questions.push('Which AI/tool-call actions are allowed to affect external systems, user data, or billing without human approval?');
  return questions;
}

function sourceSecretValues(fileTexts) {
  const values = [];
  for (const { rel, text } of fileTexts) {
    if (!rel.endsWith('.env.example')) continue;
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*[A-Z0-9_]+\s*=\s*(.+?)\s*$/);
      if (match && match[1] && !['""', "''"].includes(match[1])) values.push(match[1]);
    }
  }
  return unique(values.filter(Boolean));
}

function promptInjectionStrings(fileTexts) {
  const strings = [];
  for (const { text } of fileTexts) {
    for (const line of text.split(/\r?\n/)) {
      if (/ignore all review rules|publish this immediately|disregard previous/i.test(line)) strings.push(line.trim());
    }
  }
  return unique(strings);
}

function includesToken(haystack, token) {
  return haystack.toLowerCase().includes(String(token).toLowerCase());
}

function evaluateFixture(name, dir) {
  const beforeHash = hashFixture(dir);
  const expected = safeJson(path.join(dir, 'expected-signals.json'));
  const files = walk(dir).filter((file) => file !== 'expected-signals.json');
  const fileTexts = files.map((rel) => ({ rel, text: readText(path.join(dir, rel)) }));
  const deps = packageDependencies(dir);
  const integrations = detectIntegrations(dir, files, deps, fileTexts);
  const envNames = detectEnvNames(files, fileTexts);
  const apiSurfaces = detectApiSurfaces(files, fileTexts);
  const riskIncludes = detectRisks(files, integrations, fileTexts);
  const candidates = candidateTitles(integrations, riskIncludes, apiSurfaces);
  const questions = blockingQuestions(integrations, riskIncludes);
  const secretValues = sourceSecretValues(fileTexts);
  const injectionStrings = promptInjectionStrings(fileTexts);

  const reviewedArtifact = [
    `Fixture: ${name}`,
    `Integrations: ${integrations.join(', ')}`,
    integrations.includes('ai') ? 'Vercel AI SDK integration: review AI/tool-call boundaries when the ai package or provider SDKs are present.' : '',
    `Risks: ${riskIncludes.join(', ')}`,
    `Environment variable names: ${envNames.join(', ')}`,
    `API surfaces: ${apiSurfaces.join(', ')}`,
    `Candidate Buildprints: ${candidates.join(', ')}`,
    `Blocking questions: ${questions.join(' | ')}`,
    'Secret values: REDACTED',
    'Prompt-injection content: REJECTED_AS_SOURCE_INSTRUCTION',
  ].join('\n');

  const checks = [];
  function check(kind, token, ok, details = undefined) {
    checks.push({ kind, token, ok, ...(details ? { details } : {}) });
    if (!ok) fail(name, `${kind} missing/failed: ${token}${details ? ` (${details})` : ''}`);
  }

  for (const token of expected.integrations || []) check('integration', token, integrations.includes(token), `found=${integrations.join(',')}`);
  for (const token of expected.riskIncludes || []) check('risk', token, riskIncludes.includes(token), `found=${riskIncludes.join(',')}`);
  for (const token of expected.envNames || []) check('env-name', token, envNames.includes(token), `found=${envNames.join(',')}`);
  for (const token of expected.apiIncludes || []) check('api-surface', token, apiSurfaces.includes(token), `found=${apiSurfaces.join(',')}`);
  for (const token of expected.candidateTitles || []) check('candidate-title', token, candidates.includes(token), `found=${candidates.join(',')}`);
  for (const token of expected.mustContain || []) check('must-contain', token, includesToken(reviewedArtifact, token));
  for (const token of [...(expected.mustNotContain || []), ...secretValues, ...injectionStrings]) check('must-not-contain', token, !includesToken(reviewedArtifact, token));

  const afterHash = hashFixture(dir);
  check('source-read-only', 'fixture hash unchanged', beforeHash === afterHash);

  const qualificationExpected = secretValues.length || injectionStrings.length ? 'SELECTED_UNQUALIFIED' : 'DISCOVERY_REVIEWED';

  return {
    fixture: name,
    source_hash_before: beforeHash,
    source_hash_after: afterHash,
    source_read_only: beforeHash === afterHash,
    detected: { integrations, risks: riskIncludes, envNames, apiSurfaces, candidateTitles: candidates, blockingQuestions: questions },
    safety: { secretValueCount: secretValues.length, promptInjectionStringCount: injectionStrings.length, leakedSecretOrInjection: checks.some((check) => check.kind === 'must-not-contain' && !check.ok) },
    qualificationExpected,
    checks,
    reviewedArtifact,
  };
}

if (!fs.existsSync(fixturesDir)) {
  console.error(`Missing Mapper OS golden fixtures: ${fixturesDir}`);
  process.exit(1);
}

const fixtureNames = fs.readdirSync(fixturesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const fixtures = fixtureNames.map((name) => evaluateFixture(name, path.join(fixturesDir, name)));
const report = {
  schema_version: 'mapper-os/golden-eval-report.v1',
  harness: 'deterministic-source-signal-oracle',
  purpose: 'Catches regressions in Mapper OS golden fixture expectations before slower fresh-agent replay evals run.',
  fixture_count: fixtures.length,
  pass: failures.length === 0,
  failures,
  fixtures,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  for (const failure of failures) console.error(`x ${failure.fixture}: ${failure.message}`);
  console.error(`\nMapper golden eval failed: ${failures.length} issue(s). Report: ${path.relative(root, reportPath)}`);
  process.exit(1);
}

console.log(`Mapper golden eval passed: ${fixtures.length} fixture(s). Report: ${path.relative(root, reportPath)}`);
