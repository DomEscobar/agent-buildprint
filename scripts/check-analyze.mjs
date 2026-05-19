import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeBuildprint } from '../src/analyze/index.js';
import { formatAgentBrief } from '../src/analyze/format-agent-brief.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;
const agb = path.join(repoRoot, 'bin', 'agb.js');

function analyze(rel, options) {
  return analyzeBuildprint(path.join(repoRoot, rel), options);
}

const mapper = analyze('buildprints/buildprint-mapper-os');
assert.equal(mapper.strictPass, true, 'Mapper OS should pass strict analyzer gates');
assert.ok(mapper.packageShape.triggeredPacks.includes('mapper-source-analysis'), 'Mapper OS should trigger source-analysis pack');
assert.ok(!mapper.packageShape.triggeredPacks.includes('product-ui'), 'Mapper OS examples must not trigger product UI pack');
assert.ok(!mapper.packageShape.triggeredPacks.includes('security-auth-payment'), 'Mapper OS examples must not trigger auth/payment pack');
assert.equal(mapper.latestSafeNextStep, 'Run source-analysis safety and question-policy checks before selected extraction.');

const brief = formatAgentBrief(mapper);
assert.ok(brief.includes('AGB Analyze - AI-First Buildprint Review Brief'), 'Default formatter should produce an AI-first brief');
assert.ok(brief.includes('You are the AI reviewer. The CLI scanner is not the reviewer.'), 'Brief should assign the AI reviewer role');
assert.ok(brief.includes('Scanner evidence is not final judgment.'), 'Brief should not present scanner evidence as final analysis');
assert.ok(brief.includes('Final answer must be a chat handover.'), 'Brief should require chat handover');
assert.ok(brief.includes('Outcome:'), 'Brief should include final handover template');

const defaultOut = execFileSync(node, [agb, 'analyze', path.join(repoRoot, 'buildprints/buildprint-mapper-os')], { encoding: 'utf8' });
assert.ok(defaultOut.includes('AI-First Buildprint Review Brief'), 'CLI default analyze output should be the AI-first brief');

const scanOut = execFileSync(node, [agb, 'analyze', path.join(repoRoot, 'buildprints/buildprint-mapper-os'), '--scan'], { encoding: 'utf8' });
assert.ok(scanOut.includes('AGB Analyze - Scanner Evidence'), '--scan should return the deterministic scanner report');
assert.ok(scanOut.includes('Scanner findings:'), '--scan should expose scanner findings');

const jsonOut = execFileSync(node, [agb, 'analyze', path.join(repoRoot, 'buildprints/buildprint-mapper-os'), '--json'], { encoding: 'utf8' });
assert.equal(JSON.parse(jsonOut).package.slug, 'buildprint-mapper-os', '--json should remain parseable scanner evidence');

const storyboard = analyze('buildprints/portable-novel-storyboard-pipeline', { phase: '04-workbench-ui' });
assert.equal(storyboard.strictPass, true, 'Storyboard Buildprint should pass strict analyzer gates');
assert.ok(storyboard.packageShape.triggeredPacks.includes('product-ui'), 'Storyboard Buildprint should trigger product UI pack');
assert.equal(storyboard.reviewPath[0]?.id, 'phase-focus', 'Phase mode should pin phase review first');
assert.equal(storyboard.edgeChecklist[0]?.priority, 'phase', 'Phase checklist items should be highest priority');

const weakDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-analyze-eval-'));
try {
  fs.writeFileSync(path.join(weakDir, 'README.md'), '# Weak package\n');
  const weak = analyzeBuildprint(weakDir);
  assert.equal(weak.strictPass, false, 'Weak package should fail strict analyzer gates');
  assert.ok(weak.findings.some((finding) => finding.id === 'CORE_MISSING_BUILDPRINT' && finding.severity === 'critical'), 'Weak package should report missing BUILDPRINT.md as critical');
  let strictFailed = false;
  try {
    execFileSync(node, [agb, 'analyze', weakDir, '--strict'], { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    strictFailed = error.status === 1;
  }
  assert.equal(strictFailed, true, 'Weak package should fail CLI --strict mode');
} finally {
  fs.rmSync(weakDir, { recursive: true, force: true });
}

console.log('Analyze eval passed');
