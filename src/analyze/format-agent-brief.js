import { severityCounts } from './confidence.js';

export function formatAgentBrief(report) {
  const counts = severityCounts(report.findings);
  const lines = [];
  lines.push('AGB Analyze - AI-First Buildprint Review Brief');
  lines.push('');
  lines.push('You are the AI reviewer. The CLI scanner is not the reviewer.');
  lines.push('Use scanner output as a map of where to look.');
  lines.push('Read the referenced Buildprint files.');
  lines.push('Confirm, reject, or deepen every important finding.');
  lines.push('Do not mutate files unless explicitly asked.');
  lines.push('Final answer must be a chat handover.');
  lines.push('');
  lines.push('Scanner evidence is not final judgment. Treat it as deterministic routing evidence for your review.');
  lines.push('');
  lines.push('Package:');
  lines.push(`- slug: ${report.package.slug}`);
  lines.push(`- path: ${report.package.path}`);
  if (report.phaseFocus) lines.push(`- phase focus: ${report.phaseFocus}`);
  lines.push(`- scanner result: ${report.confidence.result}`);
  lines.push(`- scanner confidence: ${report.confidence.overall}/100`);
  lines.push(`- strict pass: ${report.strictPass ? 'yes' : 'no'}`);
  lines.push('');
  lines.push('Scanner evidence summary:');
  lines.push(`- shape: ${report.packageShape.primaryTypes.join(', ') || 'unknown'}`);
  lines.push(`- triggered packs: ${report.packageShape.triggeredPacks.join(', ')}`);
  lines.push(`- findings: critical ${counts.critical}, high ${counts.high}, medium ${counts.medium}, low ${counts.low}, info ${counts.info}`);
  lines.push(`- latest safe next step: ${report.latestSafeNextStep}`);
  lines.push('');
  lines.push('AI review path:');
  for (const [index, step] of report.reviewPath.entries()) {
    lines.push(`${index + 1}. ${step.title}`);
    if (step.files.length) lines.push(`   Read: ${step.files.join(', ')}`);
    for (const check of step.checks) lines.push(`   Check: ${check}`);
  }
  lines.push('');
  lines.push('Edge checklist to verify manually:');
  for (const item of report.edgeChecklist.slice(0, 16)) {
    const prefix = item.priority === 'phase' ? '[phase]' : '[ ]';
    lines.push(`${prefix} ${item.label}`);
    if (item.files.length) lines.push(`    Evidence files: ${item.files.join(', ')}`);
  }
  if (report.edgeChecklist.length > 16) {
    lines.push(`- plus ${report.edgeChecklist.length - 16} more scanner checklist item(s); use --scan or --json for the full list.`);
  }
  lines.push('');
  lines.push('Scanner findings to confirm or reject:');
  if (!report.findings.length) {
    lines.push('- none from scanner; still inspect the review path before declaring no gaps.');
  } else {
    for (const finding of report.findings) {
      lines.push(`- ${finding.severity.toUpperCase()} ${finding.id} (${finding.file})`);
      lines.push(`  Evidence: ${finding.evidence}`);
      lines.push(`  AI task: confirm, reject, or deepen this with file evidence.`);
      lines.push(`  Suggested fix if confirmed: ${finding.recommendedFix}`);
    }
  }
  lines.push('');
  lines.push('Required AI review rules:');
  lines.push('- Do not stop at this scanner output.');
  lines.push('- Do not claim a gap unless you verified it in the referenced files.');
  lines.push('- Do not dismiss a scanner finding without explaining the evidence that rejects it.');
  lines.push('- Inspect product, provider, security, claims, phase, and proof packs only when the scanner triggered them or the files prove they apply.');
  lines.push('- Keep raw JSON/debug evidence secondary to the Buildprint quality and execution contract.');
  lines.push('');
  lines.push('Final chat handover template:');
  lines.push('Outcome:');
  lines.push('Package shape:');
  lines.push('Evidence read:');
  lines.push('Confirmed gaps:');
  lines.push('Rejected scanner suspicions:');
  lines.push('Critical/high risks:');
  lines.push('Recommended next direction:');
  lines.push('');
  lines.push('For raw scanner evidence, rerun with `--scan` for text or `--json` for machine-readable output.');
  return `${lines.join('\n')}\n`;
}
