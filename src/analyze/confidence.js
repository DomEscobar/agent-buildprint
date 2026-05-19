const SEVERITY_WEIGHT = { critical: 35, high: 20, medium: 8, low: 3, info: 0 };

export function computeConfidence(report) {
  const categories = {
    authority: 100,
    execution: 100,
    validation: 100,
    claimsSafety: 100,
    packageShape: 100
  };

  for (const finding of report.findings) {
    const amount = SEVERITY_WEIGHT[finding.severity] ?? 0;
    const key = categoryFor(finding.pack);
    categories[key] = Math.max(0, categories[key] - amount);
  }

  if (!report.packageShape.maturity.includes('core-spine')) categories.authority -= 15;
  if (!report.packageShape.maturity.includes('handover-aware') && report.packageShape.triggeredPacks.includes('llm-agent')) categories.execution -= 8;
  if (!report.packageShape.maturity.includes('runtime-qa-aware') && report.packageShape.triggeredPacks.includes('product-ui')) categories.validation -= 8;
  if (!report.packageShape.maturity.includes('claims-boundary') && report.packageShape.triggeredPacks.includes('claims-parity')) categories.claimsSafety -= 12;

  for (const key of Object.keys(categories)) categories[key] = clamp(Math.round(categories[key]));
  let overall = Math.round((categories.authority * 0.25) + (categories.execution * 0.2) + (categories.validation * 0.25) + (categories.claimsSafety * 0.2) + (categories.packageShape * 0.1));

  const severities = report.findings.map((finding) => finding.severity);
  if (severities.includes('critical')) overall = Math.min(overall, 59);
  else if (severities.includes('high')) overall = Math.min(overall, 79);
  else if (severities.includes('medium')) overall = Math.min(overall, 89);

  const strictPass = !severities.includes('critical') && !severities.includes('high');
  const result = !strictPass ? 'NEEDS WORK' : overall >= 90 ? 'EXCELLENT' : overall >= 75 ? 'STRONG' : 'REVIEW';
  return { ...categories, overall: clamp(overall), strictPass, result };
}

export function severityCounts(findings) {
  return ['critical', 'high', 'medium', 'low', 'info'].reduce((acc, key) => {
    acc[key] = findings.filter((finding) => finding.severity === key).length;
    return acc;
  }, {});
}

function categoryFor(pack) {
  if (pack === 'core' || pack === 'machine-mirror') return 'authority';
  if (pack === 'phase' || pack === 'llm-agent') return 'execution';
  if (pack === 'product-ui' || pack === 'data-persistence' || pack === 'proof-eval') return 'validation';
  if (pack === 'claims-parity' || pack === 'security-auth-payment' || pack === 'provider-ai-media') return 'claimsSafety';
  return 'packageShape';
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

