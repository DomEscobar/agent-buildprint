import { loadBuildprintPackage } from './load-package.js';
import { extractEvidence } from './extract-evidence.js';

export function buildAnalyzePacket(folder, options = {}) {
  const pkg = loadBuildprintPackage(folder, options);
  const evidence = extractEvidence(pkg, options);

  return {
    schema: 'agent-buildprint/analyze-packet.v1',
    package: {
      path: pkg.root,
      slug: pkg.slug,
      title: pkg.title,
      fileCount: pkg.files.length
    },
    phaseFocus: options.phase ?? null,
    files: evidence.files,
    authorityRefs: evidence.authorityRefs,
    machineMirror: evidence.machineMirror,
    reviewProtocol: [
      'The CLI is not the reviewer.',
      'This packet is deterministic evidence and a review protocol.',
      'Run this packet through agent as the reviewer.',
      'Do not let scanner evidence replace file reading.',
      'Confirm every finding with file evidence.',
      'Do not collapse the review into one small next step.',
      'Produce a phased max-quality readiness plan with files, gates, evidence, claims, and exit criteria.',
      'Return the final answer as a chat handover.'
    ],
    reviewPrompt: buildReviewPrompt(options),
    schemas: {
      'finding.schema.json': findingSchema(),
      'phase-plan.schema.json': phasePlanSchema(),
      'review-rubric.yaml': reviewRubric(),
      'final-handover.md': finalHandoverTemplate()
    }
  };
}

function buildReviewPrompt(options) {
  const phaseLine = options.phase
    ? `Focus first on phase \`${options.phase}\`, then review global risks.`
    : 'Review the whole Buildprint package.';
  return [
    'You are the AI reviewer for a Buildprint package.',
    'Use this packet as your evidence map, not as a verdict.',
    phaseLine,
    'Read the authority file, read-order refs, machine mirror refs, phase files, acceptance files, prompts/policies, and proof/eval files that matter.',
    'Assess whether a coding agent can produce a max-quality finished result from this Buildprint without scope drift, fake completion, or weak handover.',
    'Return product-quality verdict, implementation-risk verdict, coding-agent execution risk, confirmed findings, rejected suspicions, and missing rails/schemas/prompts.',
    'Then produce a max-quality readiness phase plan. Do not stop at one recommended next action.',
    'Each phase must name its goal, files likely to change, required Buildprint/package changes, acceptance gates added or updated, proof evidence required, claim boundary changes, exit criteria, and dependencies.',
    'Include the latest safe starting phase, but only after the full phase plan.',
    'Use file evidence for every important claim.'
  ].join('\n');
}

function findingSchema() {
  return {
    type: 'object',
    required: ['severity', 'area', 'file', 'evidence', 'issue', 'whyItMatters', 'recommendedFix'],
    properties: {
      severity: { enum: ['critical', 'high', 'medium', 'low', 'info'] },
      area: { type: 'string' },
      file: { type: 'string' },
      evidence: { type: 'string' },
      issue: { type: 'string' },
      whyItMatters: { type: 'string' },
      recommendedFix: { type: 'string' }
    }
  };
}

function phasePlanSchema() {
  return {
    type: 'object',
    required: ['objective', 'latestSafeStartingPhase', 'phases'],
    properties: {
      objective: {
        type: 'string',
        description: 'Target state for making the Buildprint max-quality ready.'
      },
      latestSafeStartingPhase: {
        type: 'string',
        description: 'The first phase an implementer should run now, chosen after reading the full plan.'
      },
      phases: {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'id',
            'name',
            'goal',
            'filesLikelyToChange',
            'changes',
            'acceptanceGatesAddedOrUpdated',
            'proofEvidenceRequired',
            'validationEvidence',
            'claimsAllowedAfterPhase',
            'claimsStillForbidden',
            'exitCriteria'
          ],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            goal: { type: 'string' },
            filesLikelyToChange: { type: 'array', items: { type: 'string' } },
            changes: { type: 'array', items: { type: 'string' } },
            acceptanceGatesAddedOrUpdated: { type: 'array', items: { type: 'string' } },
            proofEvidenceRequired: { type: 'array', items: { type: 'string' } },
            validationEvidence: { type: 'array', items: { type: 'string' } },
            claimsAllowedAfterPhase: { type: 'array', items: { type: 'string' } },
            claimsStillForbidden: { type: 'array', items: { type: 'string' } },
            exitCriteria: { type: 'array', items: { type: 'string' } },
            dependencies: { type: 'array', items: { type: 'string' } },
            risksAddressed: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    }
  };
}

function reviewRubric() {
  return {
    verdicts: {
      product_quality: ['max_quality_ready', 'needs_tightening', 'prototype_only', 'blocked'],
      implementation_risk: ['low', 'medium', 'high'],
      coding_agent_execution_risk: ['low', 'medium', 'high']
    },
    required_review_areas: [
      'authority and read order',
      'binding slice and non-goals',
      'product experience and UX quality gates',
      'contracts and operational protocols',
      'phase exits and implementation rails',
      'provider/network/security boundaries',
      'proof, QA, screenshots, and runtime evidence',
      'claims and final handover'
    ],
    required_plan_qualities: [
      'plan covers the path to max-quality readiness, not only the first fix',
      'each phase names files likely to change',
      'each phase has concrete file/doc/spec changes',
      'each phase names acceptance gates added or updated',
      'each phase names proof evidence required, including command, screenshot, or API evidence when relevant',
      'each phase states which claims become allowed and which claims remain forbidden',
      'each phase has validation evidence and exit criteria',
      'phase order separates urgent blockers from product-quality hardening',
      'latest safe starting phase is named after the full plan'
    ],
    forbidden_shortcuts: [
      'do not report CLI evidence as final judgment',
      'do not claim a gap without file evidence',
      'do not end with only a small recommended next step',
      'do not ignore broad surface area or fakeable subsystems',
      'do not accept placeholders or route-shaped behavior as product quality'
    ]
  };
}

function finalHandoverTemplate() {
  return [
    'Outcome:',
    'Product-quality verdict:',
    'Implementation-risk verdict:',
    'Coding-agent execution risk:',
    'Evidence read:',
    'Confirmed findings:',
    'Rejected suspicions:',
    'Missing rails/schemas/prompts:',
    'Critical/high risks:',
    'Max-quality readiness phase plan:',
    '- Phase 0 - Stabilize evidence and scope:',
    '  Goal:',
    '  Files likely to change:',
    '  Required changes:',
    '  Acceptance gates added/updated:',
    '  Proof command/screenshot/API evidence required:',
    '  Claims allowed after this phase:',
    '  Claims still forbidden after this phase:',
    '  Validation evidence:',
    '  Exit criteria:',
    '- Phase 1 - Close critical implementation rails:',
    '  Goal:',
    '  Files likely to change:',
    '  Required changes:',
    '  Acceptance gates added/updated:',
    '  Proof command/screenshot/API evidence required:',
    '  Claims allowed after this phase:',
    '  Claims still forbidden after this phase:',
    '  Validation evidence:',
    '  Exit criteria:',
    '- Phase 2 - Product-quality hardening:',
    '  Goal:',
    '  Files likely to change:',
    '  Required changes:',
    '  Acceptance gates added/updated:',
    '  Proof command/screenshot/API evidence required:',
    '  Claims allowed after this phase:',
    '  Claims still forbidden after this phase:',
    '  Validation evidence:',
    '  Exit criteria:',
    '- Phase 3 - Final proof and handover gates:',
    '  Goal:',
    '  Files likely to change:',
    '  Required changes:',
    '  Acceptance gates added/updated:',
    '  Proof command/screenshot/API evidence required:',
    '  Claims allowed after this phase:',
    '  Claims still forbidden after this phase:',
    '  Validation evidence:',
    '  Exit criteria:',
    'Latest safe starting phase:'
  ].join('\n');
}
