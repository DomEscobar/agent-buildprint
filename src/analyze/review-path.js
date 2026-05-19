export function buildReviewPath(pkg, shape, options = {}) {
  const paths = [];
  const add = (id, title, files, checks) => {
    paths.push({ id, title, files: existing(pkg, files), checks });
  };

  const focused = focusedPhaseFiles(pkg, options.phase);
  if (options.phase) {
    add('phase-focus', `Phase focus: ${options.phase}`, focused.length ? focused : ['PLAN.md'], [
      'Review phase-local intent before broader hardening.',
      'Keep global blockers visible while working the current phase.'
    ]);
  }

  add('authority-scope', 'Authority and scope', ['BUILDPRINT.md', 'README.md', 'PLAN.md'], [
    'Confirm the canonical authority and binding scope.',
    'Confirm read order and acceptance path are clear.',
    'Confirm excluded scope and unsafe claims are visible.'
  ]);

  if (shape.triggeredPacks.includes('mapper-source-analysis')) {
    add('source-safety', 'Source analysis safety and questions', ['policies/safety.md', 'policies/questions.md', 'questions.md', 'prompts/discover.md'], [
      'Confirm discovery-first behavior.',
      'Confirm no source mutation and no secret value copying.',
      'Confirm questions are closed and asked after soft discovery.'
    ]);
  }

  if (shape.triggeredPacks.includes('phase')) {
    add('phase-choreography', 'Phase choreography', ['PLAN.md', ...pkg.files.filter((file) => file.startsWith('plans/')).slice(0, 12)], [
      'Confirm each phase card has goal, context, steps, do-not rules, exit criteria, and validation evidence.',
      'Confirm phase files reduce active context instead of duplicating the whole package.'
    ]);
  }

  if (shape.triggeredPacks.includes('product-ui')) {
    add('product-ui', 'Product/browser proof path', ['PRODUCT_QUALITY_BAR.md', 'WORKBENCH_UX_SPEC.md', 'HEAD_TO_FOOT_QA.md', 'BROWSER_QA_SCENARIOS.md', 'TEST_MATRIX.md'], [
      'Confirm primary user experience is described, not just debug/reporting panels.',
      'Confirm browser/runtime QA proves completed user-facing state.',
      'Confirm responsive/mobile or relevant UI states are covered.'
    ]);
  }

  if (shape.triggeredPacks.includes('provider-ai-media')) {
    add('provider-media', 'Provider, AI, media, and export boundaries', ['PROVIDER_ADAPTERS.md', 'PREVIEW_COMPOSITION_SPEC.md', 'CONTRACTS.md', 'TEST_MATRIX.md'], [
      'Confirm mock/no-network defaults and live-provider gates.',
      'Confirm provider/media/export claims match validation evidence.',
      'Confirm raw provider refs are debug evidence, not product proof.'
    ]);
  }

  if (shape.triggeredPacks.includes('security-auth-payment')) {
    add('security-payment', 'Security, auth, admin, and payment edges', ['THREAT_MODEL.md', 'SECURITY_POLICY.md', 'CONTRACTS.md', 'TEST_MATRIX.md'], [
      'Confirm permission denial, ownership, and destructive/admin behavior.',
      'Confirm webhook/idempotency/retry behavior for payment or external callbacks.',
      'Confirm env var names are documented without secret values.'
    ]);
  }

  if (shape.triggeredPacks.includes('data-persistence')) {
    add('data-persistence', 'Data lifecycle and persistence proof', ['DATA_LIFECYCLE.md', 'CONTRACTS.md', 'TEST_MATRIX.md', 'HEAD_TO_FOOT_QA.md'], [
      'Confirm durable vs mock/in-memory boundaries.',
      'Confirm restart/reload QA when persistence is claimed.',
      'Confirm ownership, deletion, import/export, and migration notes where relevant.'
    ]);
  }

  if (shape.triggeredPacks.includes('proof-eval')) {
    add('proof-eval', 'Proof, eval, and conformance boundary', ['TEST_MATRIX.md', 'VALIDATION_TEMPLATE.md', ...pkg.files.filter((file) => /^(proof|evals|conformance)\//.test(file)).slice(0, 10)], [
      'Confirm proof scope is not overclaimed as production behavior.',
      'Confirm eval/proof commands and expected evidence are recorded.',
      'Confirm fixture/mock boundaries are explicit.'
    ]);
  }

  if (shape.triggeredPacks.includes('claims-parity')) {
    add('claims', 'Claims and non-claims', ['claims.yaml', 'PARITY_CLAIMS.md', 'BUILDPRINT.md', 'VALIDATION_TEMPLATE.md'], [
      'Confirm safe and unsafe wording exists.',
      'Confirm evidence needed to upgrade parity/live/provider claims.',
      'Confirm final report cannot overstate validation.'
    ]);
  }

  add('validation', 'Validation and final handover', ['TEST_MATRIX.md', 'VALIDATION_TEMPLATE.md', 'checks/acceptance.md', 'AGENT_HANDOFF.md'], [
    'Confirm commands run, evidence, gaps, blockers, and next direction are recorded.',
    'Confirm final chat handover is required when the package is agent-facing.'
  ]);

  return paths;
}

export function focusedPhaseFiles(pkg, phase) {
  if (!phase) return [];
  const normalized = phase.toLowerCase();
  return pkg.files.filter((file) => file.startsWith('plans/') && file.toLowerCase().includes(normalized));
}

function existing(pkg, files) {
  return [...new Set(files)].filter((file) => pkg.has(file));
}

