import { hasAny } from '../shared/markdown.js';

export function inferPackageShape(pkg) {
  const targetText = sliceText(pkg, ['BUILDPRINT.md', 'SPEC.md', 'CONTRACTS.md']).toLowerCase();
  const coreText = sliceText(pkg, [
    'BUILDPRINT.md',
    'SPEC.md',
    'CONTRACTS.md',
    'PLAN.md',
    'TEST_MATRIX.md',
    'VALIDATION_TEMPLATE.md',
    'checks/acceptance.md',
    'questions.md',
    'PARITY_CLAIMS.md',
    'claims.yaml'
  ]).toLowerCase();
  const highValueText = pkg.highValueText.toLowerCase();
  const files = pkg.files;
  const hasFile = (rel) => pkg.has(rel);
  const anyFile = (predicate) => files.some(predicate);
  const signals = new Set();
  const primaryTypes = new Set();
  const maturity = new Set();
  const triggeredPacks = new Set(['core']);
  const isMapperSourceAnalysis = /buildprint mapper os|mapper os|repo census|buildprint candidates|selected extraction|source-analysis/.test(targetText)
    || hasFile('prompts/discover.md')
    || hasFile('prompts/extract-selected.md')
    || hasFile('policies/questions.md');
  const hasProductUiPack = hasFile('PRODUCT_QUALITY_BAR.md')
    || hasFile('WORKBENCH_UX_SPEC.md')
    || hasFile('WEBAPP_TARGET_SPEC.md')
    || hasFile('UI_CANVAS_MAP.md')
    || hasFile('BROWSER_QA_SCENARIOS.md');
  const targetProductUi = /storyboard|creative workbench|workbench ux|browser ui|webapp|frontend|canvas|dashboard|mobile screenshot|completed-state|primary ui/.test(targetText);

  const coreFiles = ['BUILDPRINT.md', 'README.md', 'SPEC.md', 'CONTRACTS.md', 'PLAN.md', 'TEST_MATRIX.md', 'VALIDATION_TEMPLATE.md', 'checks/acceptance.md'];
  if (coreFiles.every((file) => hasFile(file))) maturity.add('core-spine');
  if (anyFile((file) => file.startsWith('plans/'))) {
    signals.add('phase-choreographed');
    maturity.add('phase-choreographed');
    triggeredPacks.add('phase');
  }
  if (hasFile('buildprint.json') || hasFile('phases.yaml') || hasFile('acceptance.yaml') || hasFile('claims.yaml')) {
    signals.add('machine-mirrored');
    maturity.add('machine-mirrored');
    triggeredPacks.add('machine-mirror');
  }
  if (hasFile('AGENT_EXECUTION_BRIEF.md') || hasFile('templates/AGENT_EXECUTION_BRIEF.md') || hasFile('CURRENT_STATE.md') || hasFile('templates/CURRENT_STATE.md')) {
    signals.add('agent-execution-rails');
    maturity.add('agent-execution-rails');
  }
  if (anyFile((file) => file.startsWith('proof/'))) {
    signals.add('proof-backed');
    maturity.add('proof-backed');
    triggeredPacks.add('proof-eval');
  }
  if (anyFile((file) => file.startsWith('evals/'))) {
    signals.add('eval-harness');
    maturity.add('eval-backed');
    triggeredPacks.add('proof-eval');
  }
  if (anyFile((file) => file.startsWith('conformance/'))) {
    signals.add('conformance-harness');
    maturity.add('conformance-backed');
    triggeredPacks.add('proof-eval');
  }

  if (isMapperSourceAnalysis) {
    signals.add('source-analysis');
    primaryTypes.add('workflow-os');
    triggeredPacks.add('mapper-source-analysis');
  }
  if (hasProductUiPack || (!isMapperSourceAnalysis && targetProductUi)) {
    signals.add('product-workbench');
    primaryTypes.add('product-workflow');
    triggeredPacks.add('product-ui');
  }
  if (hasProductUiPack || hasFile('HEAD_TO_FOOT_QA.md') || (!isMapperSourceAnalysis && /browser|ui\b|webapp|frontend|dashboard|canvas|mobile|screenshot|route|page|preview/.test(targetText))) {
    signals.add('browser-ui');
    triggeredPacks.add('product-ui');
  }
  if (hasFile('PROVIDER_ADAPTERS.md') || (!isMapperSourceAnalysis && /provider|live api|api key|mock|no-network|openai|anthropic|wavespeed|model provider|adapter/.test(targetText))) {
    signals.add('provider-sensitive');
    triggeredPacks.add('provider-ai-media');
  }
  if (hasFile('PREVIEW_COMPOSITION_SPEC.md') || (!isMapperSourceAnalysis && /image|video|media|preview manifest|portablepreviewmanifest|export package|media record|artifact/.test(targetText))) {
    signals.add('media-or-export');
    triggeredPacks.add('provider-ai-media');
  }
  if (!isMapperSourceAnalysis && hasPositiveLine(targetText, /\b(auth|rbac|tenant|admin|session|upload|destructive)\b|permission (denial|denied|check|gate)|permissions\b/)) {
    signals.add('security-sensitive');
    triggeredPacks.add('security-auth-payment');
  }
  if (!isMapperSourceAnalysis && hasPositiveLine(targetText, /\b(stripe|billing|payment|webhook|subscription|entitlement|invoice)\b/)) {
    signals.add('payment-sensitive');
    triggeredPacks.add('security-auth-payment');
  }
  if (hasFile('DATA_LIFECYCLE.md') || (!isMapperSourceAnalysis && /persist|database|storage|restart|reload|cache|migration|data lifecycle|durable|import\/export/.test(targetText))) {
    signals.add('persistence-sensitive');
    triggeredPacks.add('data-persistence');
  }
  if (/clone|parity|equivalence|drop-in|exact|production-ready|provider parity|final video|live provider/.test(coreText) || hasFile('PARITY_CLAIMS.md') || hasFile('claims.yaml')) {
    signals.add('claims-sensitive');
    triggeredPacks.add('claims-parity');
  }
  if (/agent|llm|subagent|tool call|skill|runtime|context rot|handover|questions\.md/.test(coreText) || hasFile('questions.md')) {
    signals.add('agentic-execution');
    triggeredPacks.add('llm-agent');
  }
  if (hasPositiveLine(targetText, /\brag\b|retrieval|embedding|vector database|semantic search|ranking model/)) {
    signals.add('retrieval-system');
    primaryTypes.add('system-or-feature');
  }
  if (!isMapperSourceAnalysis && hasPositiveLine(targetText, /feature extension|billing extension|\brbac\b|\bauth\b/)) {
    primaryTypes.add('feature-extension');
  }
  if (/proof|harness|eval|transcript|conformance/.test(coreText)) {
    primaryTypes.add('proof-or-eval-harness');
  }
  if (!primaryTypes.size && hasAny(pkg.get('BUILDPRINT.md'), [/workflow/i])) primaryTypes.add('workflow');
  if (!primaryTypes.size) primaryTypes.add('buildprint-package');

  if (/required read order/i.test(pkg.get('BUILDPRINT.md'))) maturity.add('read-order-declared');
  if (/chat handover|final handover|handover/i.test(highValueText)) maturity.add('handover-aware');
  if (/browser qa|playwright|screenshot|head-to-foot/i.test(highValueText)) maturity.add('runtime-qa-aware');
  if (/mock\/no-network|no-network|no external api calls|mock mode/i.test(pkg.highValueText)) maturity.add('mock-safe');
  if (/safe claims|unsafe claims|claims boundary|non-claims/i.test(highValueText)) maturity.add('claims-boundary');

  return {
    primaryTypes: [...primaryTypes].sort(),
    signals: [...signals].sort(),
    maturity: [...maturity].sort(),
    triggeredPacks: [...triggeredPacks].sort()
  };
}

function sliceText(pkg, files) {
  return files.map((file) => pkg.get(file)).filter(Boolean).join('\n\n');
}

function hasPositiveLine(text, pattern) {
  return text.split(/\r?\n/).some((line) => {
    if (!pattern.test(line)) return false;
    return !/(do not|don't|never|must not|forbid|forbidden|excluded|exclude|out of scope|non-claim|non claim|parity|not claim|without|no\s+)/i.test(line);
  });
}
