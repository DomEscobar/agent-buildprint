import { focusedPhaseFiles } from './review-path.js';

export function buildEdgeChecklist(pkg, shape, options = {}) {
  const items = [];
  const add = (id, pack, label, files, why, priority = 'normal') => {
    items.push({ id, pack, priority, label, files: files.filter((file) => pkg.has(file)), why, status: 'review' });
  };

  for (const file of focusedPhaseFiles(pkg, options.phase)) {
    add(`phase.${options.phase}.read`, 'phase', `Review focused phase file ${file}.`, [file], 'Phase mode pins local work while preserving global risk checks.', 'phase');
    add(`phase.${options.phase}.exit`, 'phase', 'Confirm focused phase has exit criteria and validation evidence.', [file], 'A phase is unsafe to claim complete without evidence gates.', 'phase');
  }

  add('core.authority', 'core', 'Confirm `BUILDPRINT.md` is canonical and owns read order/acceptance.', ['BUILDPRINT.md'], 'Agents need one authority spine.');
  add('core.scope', 'core', 'Confirm included and excluded scope are explicit.', ['BUILDPRINT.md', 'SPEC.md'], 'Ambiguous scope causes broad fake implementations.');
  add('core.validation', 'core', 'Confirm validation template captures commands, evidence, gaps, blockers, and handover.', ['VALIDATION_TEMPLATE.md'], 'Final reports must be evidence-backed.');

  if (shape.triggeredPacks.includes('llm-agent')) {
    add('llm.context', 'llm-agent', 'Confirm attention anchors, read order, current-state, or handover guidance exist.', ['BUILDPRINT.md', 'PLAN.md', 'AGENT_HANDOFF.md', 'CURRENT_STATE.md'], 'Long agent runs need context-rot protection.');
    add('llm.questions', 'llm-agent', 'Confirm questions are closed/minimal where alignment is needed.', ['questions.md'], 'Broad questions make agents stall or overfit user preferences.');
  }

  if (shape.triggeredPacks.includes('phase')) {
    add('phase.cards', 'phase', 'Review phase cards for goal, keep-in-context, steps, do-not rules, exit criteria, and validation evidence.', pkg.files.filter((file) => file.startsWith('plans/')).slice(0, 12), 'Phase files should be active-context rails.');
  }

  if (shape.triggeredPacks.includes('product-ui')) {
    add('product.completed_state', 'product-ui', 'Confirm completed-state product/browser proof is required.', ['HEAD_TO_FOOT_QA.md', 'BROWSER_QA_SCENARIOS.md', 'TEST_MATRIX.md'], 'Product Buildprints can regress into empty or debug-first demos.');
    add('product.primary_surface', 'product-ui', 'Confirm raw JSON/log/debug surfaces are not accepted as the primary user experience.', ['PRODUCT_QUALITY_BAR.md', 'WORKBENCH_UX_SPEC.md', 'BUILDPRINT.md'], 'A Buildprint should guide agents toward the intended product surface.');
  }

  if (shape.triggeredPacks.includes('provider-ai-media')) {
    add('provider.mock_default', 'provider-ai-media', 'Confirm mock/no-network default and live-provider gating.', ['PROVIDER_ADAPTERS.md', 'BUILDPRINT.md', 'acceptance.yaml'], 'Provider costs and network flakiness must be explicit.');
    add('provider.artifact_boundary', 'provider-ai-media', 'Confirm provider/media/export artifacts are scoped and not overclaimed.', ['PREVIEW_COMPOSITION_SPEC.md', 'PARITY_CLAIMS.md', 'claims.yaml'], 'Provider and export claims need evidence boundaries.');
  }

  if (shape.triggeredPacks.includes('security-auth-payment')) {
    add('security.secrets', 'security-auth-payment', 'Confirm secret values are forbidden and env names only are allowed.', ['policies/safety.md', 'BUILDPRINT.md', 'THREAT_MODEL.md'], 'Secret leakage is a hard safety failure.');
    add('security.permissions', 'security-auth-payment', 'Confirm auth, admin, payment, upload, or destructive-action denial paths are checked.', ['CONTRACTS.md', 'TEST_MATRIX.md', 'THREAT_MODEL.md'], 'Sensitive flows need explicit negative paths.');
  }

  if (shape.triggeredPacks.includes('data-persistence')) {
    add('data.restart', 'data-persistence', 'Confirm restart/reload proof when persistence is claimed.', ['DATA_LIFECYCLE.md', 'HEAD_TO_FOOT_QA.md', 'TEST_MATRIX.md'], 'Persistence claims are weak without restart proof.');
    add('data.lifecycle', 'data-persistence', 'Confirm ownership, deletion, import/export, and migration expectations where relevant.', ['DATA_LIFECYCLE.md', 'CONTRACTS.md'], 'Data behavior often hides edge-case product risk.');
  }

  if (shape.triggeredPacks.includes('proof-eval')) {
    add('proof.boundary', 'proof-eval', 'Confirm proof/eval scope is separated from production/runtime claims.', ['PARITY_CLAIMS.md', 'VALIDATION_TEMPLATE.md', 'TEST_MATRIX.md'], 'Proofs are useful only when their evidence boundary is honest.');
    add('proof.commands', 'proof-eval', 'Confirm exact proof/eval commands are listed.', ['BUILDPRINT.md', 'TEST_MATRIX.md', 'VALIDATION_TEMPLATE.md'], 'Future agents need repeatable evidence.');
  }

  if (shape.triggeredPacks.includes('claims-parity')) {
    add('claims.safe_unsafe', 'claims-parity', 'Confirm safe claims, unsafe claims, and upgrade evidence are explicit.', ['claims.yaml', 'PARITY_CLAIMS.md'], 'Parity/live/provider wording can mislead users without a claim contract.');
  }

  return items.sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
}

function priorityRank(value) {
  return value === 'phase' ? 0 : value === 'global' ? 1 : 2;
}

