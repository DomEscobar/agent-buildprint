import { loadBuildprintPackage } from './load-package.js';
import { inferPackageShape } from './infer-shape.js';
import { buildReviewPath } from './review-path.js';
import { buildEdgeChecklist } from './edge-checklist.js';
import { collectConcreteFindings } from './findings.js';
import { computeConfidence } from './confidence.js';

export function analyzeBuildprint(folder, options = {}) {
  const pkg = loadBuildprintPackage(folder, options);
  const packageShape = inferPackageShape(pkg);
  const reviewPath = buildReviewPath(pkg, packageShape, options);
  const edgeChecklist = buildEdgeChecklist(pkg, packageShape, options);
  const findings = collectConcreteFindings(pkg, packageShape);
  const partial = {
    package: {
      path: pkg.root,
      slug: pkg.slug,
      title: pkg.title,
      fileCount: pkg.files.length
    },
    phaseFocus: options.phase ?? null,
    packageShape,
    latestSafeNextStep: '',
    reviewPath,
    edgeChecklist,
    findings,
    confidence: {}
  };
  partial.latestSafeNextStep = latestSafeNextStep(partial);
  partial.confidence = computeConfidence(partial);
  partial.strictPass = partial.confidence.strictPass;
  return partial;
}

function latestSafeNextStep(report) {
  const criticalOrHigh = report.findings.find((finding) => finding.severity === 'critical' || finding.severity === 'high');
  if (criticalOrHigh) return `Fix ${criticalOrHigh.id} in ${criticalOrHigh.file} before using this Buildprint for implementation.`;
  if (report.phaseFocus) return `Review the pinned ${report.phaseFocus} checklist first, then scan global findings before claiming the phase complete.`;
  if (report.packageShape.triggeredPacks.includes('claims-parity') && !report.packageShape.maturity.includes('claims-boundary')) return 'Review claims and non-claims before public or final reporting.';
  if (report.packageShape.triggeredPacks.includes('mapper-source-analysis')) return 'Run source-analysis safety and question-policy checks before selected extraction.';
  if (report.packageShape.triggeredPacks.includes('product-ui')) return 'Walk the product/browser proof checklist before accepting UI or runtime evidence.';
  if (report.packageShape.triggeredPacks.includes('security-auth-payment')) return 'Review security, secret, auth/payment, and negative-path edges before implementation.';
  return 'Run the authority, scope, validation, and handover checklist.';
}
