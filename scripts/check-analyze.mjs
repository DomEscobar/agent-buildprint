import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAnalyzePacket } from '../src/analyze/build-packet.js';
import { formatPacketMarkdown } from '../src/analyze/format-markdown.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;
const agb = path.join(repoRoot, 'bin', 'agb.js');
const mapperPath = path.join(repoRoot, 'buildprints/buildprint-mapper-os');
const storyboardPath = path.join(repoRoot, 'buildprints/portable-novel-storyboard-pipeline');

const mapper = buildAnalyzePacket(mapperPath);
const markdown = formatPacketMarkdown(mapper);

assert.ok(markdown.includes('Buildprint AI Review Packet'), 'Markdown output should name the packet');
assert.ok(markdown.includes('Reviewer Prompt'), 'Markdown output should include reviewer prompt');
assert.ok(markdown.includes('finding.schema.json'), 'Markdown output should include finding schema');
assert.ok(markdown.includes('phase-plan.schema.json'), 'Markdown output should include phase plan schema');
assert.ok(markdown.includes('Max-quality readiness phase plan'), 'Markdown output should require a max-quality readiness phase plan');
assert.ok(markdown.includes('Files likely to change'), 'Markdown handover should require files likely to change');
assert.ok(markdown.includes('Acceptance gates added/updated'), 'Markdown handover should require acceptance gate changes');
assert.ok(markdown.includes('Proof command/screenshot/API evidence required'), 'Markdown handover should require concrete proof evidence');
assert.ok(markdown.includes('Claims allowed after this phase'), 'Markdown handover should require claim boundary upgrades');
assert.ok(markdown.includes('Claims still forbidden after this phase'), 'Markdown handover should preserve forbidden claims');
assert.ok(markdown.includes('Final Chat Handover Template'), 'Markdown output should include final handover template');
assert.ok(!markdown.includes('Recommended next direction:'), 'Markdown output should not request a single next-direction handover');
assert.ok(!forbiddenVerdictLanguage(markdown), 'Markdown output must not contain scanner verdict language');

const defaultOut = execFileSync(node, [agb, 'analyze', mapperPath], { encoding: 'utf8' });
assert.ok(defaultOut.includes('Buildprint AI Review Packet'), 'Default CLI output should be the packet');
assert.ok(defaultOut.includes('The CLI is not the reviewer'), 'Default CLI output should deny reviewer status');

const jsonOut = execFileSync(node, [agb, 'analyze', mapperPath, '--json'], { encoding: 'utf8' });
const json = JSON.parse(jsonOut);
assert.equal(json.schema, 'agent-buildprint/analyze-packet.v1', 'JSON output should expose packet schema');
assert.ok(json.files, 'JSON output should include files');
assert.ok(json.authorityRefs, 'JSON output should include authorityRefs');
assert.ok(json.machineMirror, 'JSON output should include machineMirror');
assert.ok(json.reviewPrompt, 'JSON output should include reviewPrompt');
assert.ok(json.schemas, 'JSON output should include schemas');
assert.ok(json.schemas['phase-plan.schema.json'], 'JSON output should include phase plan schema');
assert.ok(json.schemas['phase-plan.schema.json'].properties.phases.items.required.includes('filesLikelyToChange'), 'Phase plan schema should require files likely to change');
assert.ok(json.schemas['phase-plan.schema.json'].properties.phases.items.required.includes('acceptanceGatesAddedOrUpdated'), 'Phase plan schema should require acceptance gates');
assert.ok(json.schemas['phase-plan.schema.json'].properties.phases.items.required.includes('proofEvidenceRequired'), 'Phase plan schema should require proof evidence');
assert.ok(json.schemas['phase-plan.schema.json'].properties.phases.items.required.includes('claimsAllowedAfterPhase'), 'Phase plan schema should require allowed claims');
assert.ok(json.schemas['phase-plan.schema.json'].properties.phases.items.required.includes('claimsStillForbidden'), 'Phase plan schema should require forbidden claims');
assert.ok(json.reviewPrompt.includes('max-quality readiness phase plan'), 'JSON review prompt should require a phase plan');
assert.ok(!forbiddenVerdictLanguage(jsonOut), 'JSON output must not contain scanner verdict language');

const yamlOut = execFileSync(node, [agb, 'analyze', mapperPath, '--yaml'], { encoding: 'utf8' });
for (const section of ['schema:', 'files:', 'authorityRefs:', 'machineMirror:', 'reviewPrompt:', 'schemas:']) {
  assert.ok(yamlOut.includes(section), `YAML output should include ${section}`);
}
assert.ok(!forbiddenVerdictLanguage(yamlOut), 'YAML output must not contain scanner verdict language');

assertUnsupported('--strict');
assertUnsupported('--scan');

const phase = buildAnalyzePacket(storyboardPath, { phase: '04-workbench-ui' });
assert.equal(phase.phaseFocus, '04-workbench-ui', 'Phase focus should be recorded');
assert.ok(phase.files.phaseFocus.some((file) => file.includes('04-workbench-ui')), 'Phase focus should pin matching phase files');
assert.ok(phase.authorityRefs.readOrderRefs.length > 0, 'Phase packet should preserve global read-order refs');

console.log('Analyze packet eval passed');

function forbiddenVerdictLanguage(text) {
  return /\b(EXCELLENT|STRONG|NEEDS WORK|confidence|strict pass|scanner result)\b/i.test(text);
}

function assertUnsupported(flag) {
  let failed = false;
  try {
    execFileSync(node, [agb, 'analyze', mapperPath, flag], { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    failed = error.status === 1 && String(error.stderr).includes('unsupported option');
  }
  assert.equal(failed, true, `${flag} should be unsupported for packet analyze`);
}
