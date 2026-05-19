import { severityCounts } from './confidence.js';

export function formatAnalyzeText(report) {
  const counts = severityCounts(report.findings);
  const lines = [];
  lines.push('AGB Analyze - Scanner Evidence');
  lines.push('');
  lines.push(`Package: ${report.package.slug}`);
  lines.push(`Path: ${report.package.path}`);
  if (report.phaseFocus) lines.push(`Phase focus: ${report.phaseFocus}`);
  lines.push(`Scanner result: ${report.confidence.result}`);
  lines.push(`Scanner confidence: ${report.confidence.overall}/100`);
  lines.push(`Strict pass: ${report.confidence.strictPass ? 'yes' : 'no'}`);
  lines.push('');
  lines.push(`Shape: ${report.packageShape.primaryTypes.join(', ') || 'unknown'}`);
  lines.push(`Signals: ${report.packageShape.signals.join(', ') || 'none'}`);
  lines.push(`Maturity: ${report.packageShape.maturity.join(', ') || 'none'}`);
  lines.push(`Triggered packs: ${report.packageShape.triggeredPacks.join(', ')}`);
  lines.push('');
  lines.push('Latest safe next step:');
  lines.push(`- ${report.latestSafeNextStep}`);
  lines.push('');
  lines.push(`Findings: critical ${counts.critical}, high ${counts.high}, medium ${counts.medium}, low ${counts.low}, info ${counts.info}`);
  lines.push('');
  lines.push('Review path:');
  for (const [index, step] of report.reviewPath.entries()) {
    lines.push(`${index + 1}. ${step.title}`);
    if (step.files.length) lines.push(`   Files: ${step.files.join(', ')}`);
    for (const check of step.checks) lines.push(`   - ${check}`);
  }
  lines.push('');
  lines.push('Edge checklist:');
  for (const item of report.edgeChecklist) {
    const prefix = item.priority === 'phase' ? '[phase]' : '[ ]';
    lines.push(`${prefix} ${item.label}`);
    if (item.files.length) lines.push(`    Files: ${item.files.join(', ')}`);
    lines.push(`    Why: ${item.why}`);
  }
  lines.push('');
  lines.push('Scanner findings:');
  if (!report.findings.length) {
    lines.push('- none');
  } else {
    for (const finding of report.findings) {
      lines.push(`- ${finding.severity.toUpperCase()} ${finding.id} (${finding.file})`);
      lines.push(`  Evidence: ${finding.evidence}`);
      lines.push(`  Why: ${finding.why}`);
      lines.push(`  Fix: ${finding.recommendedFix}`);
    }
  }
  lines.push('');
  lines.push('Category confidence:');
  lines.push(`- authority: ${report.confidence.authority}`);
  lines.push(`- execution: ${report.confidence.execution}`);
  lines.push(`- validation: ${report.confidence.validation}`);
  lines.push(`- claims/safety: ${report.confidence.claimsSafety}`);
  lines.push(`- package shape: ${report.confidence.packageShape}`);
  return `${lines.join('\n')}\n`;
}
