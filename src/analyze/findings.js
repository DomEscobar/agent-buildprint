import { backtickFileRefs, hasHeading, lineHasUnsafeSecretCopy } from '../shared/markdown.js';

const CORE_FILES = ['BUILDPRINT.md', 'README.md', 'SPEC.md', 'CONTRACTS.md', 'PLAN.md', 'TEST_MATRIX.md', 'VALIDATION_TEMPLATE.md', 'checks/acceptance.md'];

export function collectConcreteFindings(pkg, shape) {
  const findings = [];
  const add = (id, severity, file, evidence, why, recommendedFix, pack = 'core') => {
    findings.push({ id, severity, file, evidence, why, recommendedFix, pack });
  };

  if (!pkg.has('BUILDPRINT.md')) {
    add('CORE_MISSING_BUILDPRINT', 'critical', 'package', 'BUILDPRINT.md not found', 'Agents need a canonical authority spine.', 'Add BUILDPRINT.md or point analyzer at a Buildprint package.');
  }

  for (const file of CORE_FILES.filter((rel) => rel !== 'BUILDPRINT.md')) {
    if (!pkg.has(file)) {
      add('CORE_MISSING_SPINE_FILE', 'medium', file, `${file} not found`, 'Core spine files make review and implementation predictable.', `Add ${file} or document the stronger equivalent in BUILDPRINT.md.`);
    } else if (!pkg.get(file).trim()) {
      add('CORE_EMPTY_SPINE_FILE', 'high', file, `${file} is empty`, 'Empty spine files mislead agents into thinking a gate exists.', `Fill ${file} with real instructions or remove the reference.`);
    }
  }

  const buildprint = pkg.get('BUILDPRINT.md');
  if (buildprint && !/required read order|read order|start here|canonical/i.test(buildprint)) {
    add('CORE_NO_AUTHORITY_PATH', 'medium', 'BUILDPRINT.md', 'No obvious read order or authority path found', 'Agents need to know what to read first and what wins on conflicts.', 'Add a required read order or authority statement.');
  }
  if (buildprint && !/acceptance|validation|required validation|done criteria|gate/i.test(buildprint)) {
    add('CORE_NO_ACCEPTANCE_PATH', 'medium', 'BUILDPRINT.md', 'No obvious acceptance or validation path found', 'Agents may claim completion without evidence.', 'Add acceptance gates or required validation.');
  }

  const readme = pkg.get('README.md');
  if (readme && !/BUILDPRINT\.md/.test(readme)) {
    add('CORE_README_NO_BUILDPRINT_POINTER', 'low', 'README.md', 'README.md does not mention BUILDPRINT.md', 'Human overview should not compete with the authority spine.', 'Point readers to BUILDPRINT.md as canonical.');
  }

  if (pkg.buildprintJson) {
    if (!pkg.buildprintJson.ok) {
      add('MIRROR_INVALID_BUILDPRINT_JSON', 'high', 'buildprint.json', pkg.buildprintJson.error, 'Broken machine mirrors break snapshot tooling and agent routing.', 'Fix buildprint.json syntax.');
    } else {
      const refs = [
        ...(pkg.buildprintJson.data.files ?? []).map((file) => typeof file === 'string' ? file : file.path),
        ...(pkg.buildprintJson.data.requiredDetailFiles ?? [])
      ].filter(Boolean);
      for (const ref of refs) {
        if (!pkg.has(ref)) {
          add('MIRROR_FILE_REF_MISSING', 'high', 'buildprint.json', `references missing file ${ref}`, 'Broken file references make snapshot/bootstrap flows unreliable.', `Create ${ref} or remove/update the mirror reference.`, 'machine-mirror');
        }
      }
    }
  }

  for (const control of ['phases.yaml', 'acceptance.yaml', 'claims.yaml']) {
    if (pkg.has(control) && !pkg.get(control).trim()) {
      add('MIRROR_EMPTY_CONTROL_FILE', 'medium', control, `${control} is empty`, 'Empty control mirrors create false confidence.', `Fill ${control} or remove it until useful.`, 'machine-mirror');
    }
  }

  if (shape.triggeredPacks.includes('phase')) {
    const planRefs = backtickFileRefs(pkg.get('PLAN.md')).filter((ref) => ref.startsWith('plans/'));
    for (const ref of planRefs) {
      if (!pkg.has(ref)) {
        add('PHASE_PLAN_REF_MISSING', 'high', 'PLAN.md', `references missing ${ref}`, 'Phase routing should never point agents at missing files.', `Create ${ref} or update PLAN.md.`, 'phase');
      }
    }
    for (const phaseFile of pkg.files.filter((file) => file.startsWith('plans/') && file.endsWith('.md'))) {
      const text = pkg.get(phaseFile);
      const missing = [];
      if (!hasHeading(text, 'Goal')) missing.push('Goal');
      if (!/keep.{0,8}context|context docs|read/i.test(text)) missing.push('keep-in-context');
      if (!/do not|forbid|must not/i.test(text)) missing.push('do-not rules');
      if (!/exit criteria|exit|done when/i.test(text)) missing.push('exit criteria');
      if (!/validation evidence|evidence|proof|commands/i.test(text)) missing.push('validation evidence');
      if (missing.length >= 3) {
        add('PHASE_CARD_THIN', 'medium', phaseFile, `missing or weak: ${missing.join(', ')}`, 'Thin phase cards do not protect agents from context rot.', 'Strengthen the phase card with goal, context, do-not rules, exit criteria, and validation evidence.', 'phase');
      }
    }
  }

  const allLines = pkg.highValueText.split(/\r?\n/);
  const unsafeSecretLine = allLines.find(lineHasUnsafeSecretCopy);
  if (unsafeSecretLine) {
    add('SAFETY_SECRET_COPY_ALLOWED', 'critical', 'package text', unsafeSecretLine.trim(), 'A Buildprint must never authorize copying secrets or private data.', 'Rewrite this as an explicit no-secret-values rule.', 'security-auth-payment');
  }

  if (shape.triggeredPacks.includes('claims-parity') && !pkg.has('claims.yaml') && !pkg.has('PARITY_CLAIMS.md')) {
    add('CLAIMS_TRIGGERED_BUT_MISSING', 'high', 'package', 'parity/clone/live/provider/production claim language detected without claims.yaml or PARITY_CLAIMS.md', 'Agents may overclaim behavior or provider parity.', 'Add a claims boundary file or soften the triggered language.', 'claims-parity');
  }

  if (shape.triggeredPacks.includes('provider-ai-media') && /live provider|provider parity|api key|production provider/i.test(pkg.highValueText) && !/mock|no-network|env-gated|optional live|blocked/i.test(pkg.highValueText)) {
    add('PROVIDER_LIVE_NO_GATE', 'high', 'package', 'provider/live language found without obvious mock/no-network or env gate', 'Provider checks can become expensive, flaky, or overclaimed.', 'Add mock/no-network defaults and live-provider gating.', 'provider-ai-media');
  }

  if (shape.triggeredPacks.includes('product-ui') && !/browser qa|playwright|screenshot|runtime qa|completed-state|head-to-foot/i.test(pkg.highValueText)) {
    add('PRODUCT_UI_NO_RUNTIME_QA', 'medium', 'package', 'browser/product UI signals found without obvious runtime/browser QA gates', 'Product Buildprints need proof beyond static docs.', 'Add browser/runtime QA or explain why UI proof is out of scope.', 'product-ui');
  }

  if (shape.triggeredPacks.includes('security-auth-payment') && !/threat|security|permission|deny|secret|env var names/i.test(pkg.highValueText)) {
    add('SECURITY_SCOPE_WEAK_GATES', 'medium', 'package', 'security/auth/payment signals found with weak safety gates', 'Sensitive flows need negative paths and secret boundaries.', 'Add threat/security gates or explicit denial/idempotency checks.', 'security-auth-payment');
  }

  if (shape.triggeredPacks.includes('data-persistence') && !/restart|reload|durable|persist.*proof|persistence.*qa/i.test(pkg.highValueText)) {
    add('PERSISTENCE_NO_RESTART_QA', 'medium', 'package', 'persistence/data signals found without restart/reload proof language', 'Persistence claims are incomplete without survival checks.', 'Add restart/reload QA or mark persistence out of scope.', 'data-persistence');
  }

  if (shape.triggeredPacks.includes('llm-agent') && !/chat handover|final handover|handover/i.test(pkg.highValueText)) {
    add('LLM_NO_FINAL_HANDOVER', 'medium', 'package', 'agent/phase/question signals found without final chat handover requirement', 'Agents often stop at file reports unless handover is explicit.', 'Require a chat handover with outcome, evidence, gaps, and next direction.', 'llm-agent');
  }

  const acceptance = pkg.get('checks/acceptance.md');
  if (acceptance && !/- \[ \]/.test(acceptance)) {
    add('QA_ACCEPTANCE_NOT_CHECKLIST', 'medium', 'checks/acceptance.md', 'No markdown checklist items found', 'Acceptance should be reviewable by agents and humans.', 'Use concrete checklist items.');
  }
  if (acceptance && /works correctly|looks good|complete$/im.test(acceptance)) {
    add('QA_ACCEPTANCE_TOO_VAGUE', 'medium', 'checks/acceptance.md', 'Vague acceptance wording detected', 'Vague gates invite fake completion.', 'Replace vague acceptance with executable or manually verifiable checks.');
  }

  return findings;
}

