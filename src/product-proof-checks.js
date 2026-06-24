import fs from 'node:fs'
import path from 'node:path'

const HARD_STOP_DECISION_ROWS = [
  { id: 'deployment-posture', label: 'Deployment posture', pattern: /Deployment posture/i },
  { id: 'secrets-provider-policy', label: 'Secrets and provider policy', pattern: /Secrets and provider policy/i },
  { id: 'destructive-data-loss', label: 'Destructive/data-loss behavior', pattern: /Destructive\/data-loss behavior/i },
  { id: 'privacy-compliance', label: 'Privacy/compliance exposure', pattern: /Privacy\/compliance exposure/i },
  { id: 'product-artifact-identity', label: 'Product/artifact identity', pattern: /Product\/artifact identity/i },
]

export function phaseProofChecks({ file, text, objective, isMapperTemplatePacket, isAgenticChatPacket }) {
  if (!isMapperTemplatePacket && !isAgenticChatPacket) return []

  const checks = []
  checks.push({
    label: `${file} declares product-proof phase anchors`,
    pass: hasAll(text, [
      /Named product loop/i,
      /User\/operator action/i,
      /Named output\/state/i,
      /Failure mode/i,
      /Concrete proof artifact/i,
    ]),
  })

  const genericOnly = /\bmapped artifact\b|\bcentral surface\b|\bproduct path\b/i.test(objective) &&
    !/Named product loop/i.test(objective)
  checks.push({
    label: `${file} is not generic objective filler`,
    pass: !genericOnly,
    detail: genericOnly ? 'objective uses generic packet nouns without an instantiated proof contract' : '',
  })

  if (isMapperTemplatePacket) return checks

  checks.push({
    label: `${file} instantiates named user action and output`,
    pass: hasAll(objective, [/User\/operator action/i, /Named output\/state/i]) &&
      !/\bsource-derived artifact output\b|\bmapped product loop\b/i.test(objective),
  })

  if (isAgenticChatPacket && /01-real-streaming-chat\.md$/i.test(file)) {
    checks.push({
      label: 'agentic-chat phase 01 requires real incremental streaming proof',
      pass: hasAll(text, [
        /ReadableStream|SSE|Server-Sent Events/i,
        /incremental/i,
        /not buffered|before completion|first delta/i,
        /cancel|AbortSignal/i,
        /timeout/i,
        /provider runtime interface/i,
      ]),
    })
  }

  return checks
}

export function centralOutputInstantiationChecks(blueprint, isMapperTemplatePacket, isAgenticChatPacket) {
  if (isMapperTemplatePacket || !isAgenticChatPacket) return []
  const centralOutputSection = yamlSection(blueprint, 'central_output_contract')
  const generic = /source-derived|mapped artifact|selected artifact|Replace this template-level/i.test(centralOutputSection)
  return [{
    label: 'blueprint central output is instantiated, not template filler',
    pass: !!centralOutputSection && !generic,
    detail: generic ? 'central_output_contract still contains template/generic language' : '',
  }]
}

export function uiEvidenceChecks({ projectRoot, uiEvidenceFile, isUiBearing }) {
  if (!isUiBearing) return []
  const uiEvidence = safeReadText(uiEvidenceFile)
  const checks = []
  const requiredFields = [
    /claim:/i,
    /evidence_type:/i,
    /screenshot_path_or_file_line:/i,
    /viewport_state:/i,
    /nearest_bad_silhouette:/i,
    /pass_fail:/i,
    /structural_difference:/i,
  ]
  checks.push({
    id: 'ui-evidence-structured',
    pass: requiredFields.every((pattern) => pattern.test(uiEvidence)),
    evidence: uiEvidence
      ? 'ui-evidence.md must include claim, evidence_type, screenshot_path_or_file_line, viewport_state, nearest_bad_silhouette, pass_fail, and structural_difference fields'
      : 'missing .buildprint/ui-evidence.md',
  })

  const screenshotRefs = [...uiEvidence.matchAll(/\.buildprint\/screenshots\/[^\s)`'"]+/g)].map((match) => match[0])
  const missingRefs = screenshotRefs.filter((ref) => !fs.existsSync(path.join(projectRoot, ref)))
  checks.push({
    id: 'ui-evidence-screenshot-refs-exist',
    pass: screenshotRefs.length > 0 && missingRefs.length === 0,
    evidence: screenshotRefs.length === 0
      ? 'ui-evidence.md must reference at least one .buildprint/screenshots path'
      : (missingRefs.length > 0 ? `missing screenshot references: ${missingRefs.join(', ')}` : ''),
  })

  return checks
}

export function designSystemChecks({ projectRoot, designSystemFile, isUiBearing }) {
  if (!isUiBearing) return []
  const designSystem = safeReadText(designSystemFile)
  const checks = []
  const requiredSections = [
    /Visual Thesis/i,
    /Exact Tokens/i,
    /Type Scale/i,
    /Layout Contract/i,
    /Component Specs/i,
    /State Matrix/i,
    /Implementation Mapping/i,
    /Screenshot Acceptance/i,
    /Banned Patterns/i,
  ]
  checks.push({
    id: 'design-system-construction-sections',
    pass: requiredSections.every((pattern) => pattern.test(designSystem)),
    evidence: 'docs/DESIGN.md must use construction sections: Visual Thesis, Exact Tokens, Type Scale, Layout Contract, Component Specs, State Matrix, Implementation Mapping, Screenshot Acceptance, and Banned Patterns',
  })

  checks.push({
    id: 'design-system-token-specificity',
    pass: hasAll(designSystem, [
      /Exact Tokens/i,
      /--[a-z0-9-]+/i,
      /#[0-9a-f]{3,8}\b|rgb\(|oklch\(|file:\d+/i,
      /canvas/i,
      /surface/i,
      /primary/i,
      /focus/i,
      /danger/i,
      /spacing/i,
      /radius/i,
    ]),
    evidence: 'Exact Tokens must include CSS variable names, exact values or file:line refs, and semantic roles for color, spacing, radius, and state',
  })

  checks.push({
    id: 'design-system-type-layout-specificity',
    pass: hasAll(designSystem, [
      /Type Scale/i,
      /font stack|font-family/i,
      /line-height/i,
      /weight/i,
      /Layout Contract/i,
      /desktop/i,
      /tablet/i,
      /mobile/i,
      /narrow/i,
      /\b\d+(\.\d+)?(px|rem)\b/i,
      /scroll ownership/i,
    ]),
    evidence: 'Type Scale and Layout Contract must include exact type roles, desktop/tablet/mobile/narrow dimensions, numeric values, and scroll ownership',
  })

  checks.push({
    id: 'design-system-component-state-matrix',
    pass: hasAll(designSystem, [
      /Component Specs/i,
      /hover/i,
      /focus-visible/i,
      /active/i,
      /disabled/i,
      /loading|streaming/i,
      /error/i,
      /blocked/i,
      /State Matrix/i,
      /empty/i,
      /saved/i,
      /restored|recovered/i,
      /offline|no-provider/i,
      /visible UI/i,
      /forbidden UI/i,
      /proof screenshot/i,
    ]),
    evidence: 'Component Specs and State Matrix must cover interaction states plus empty, loading/streaming, blocked, error, saved, restored, offline/no-provider, and proof screenshot columns',
  })

  checks.push({
    id: 'design-system-implementation-mapping',
    pass: /Implementation Mapping/i.test(designSystem) &&
      (/\b[\w./-]+\.(css|html|js|ts|tsx|jsx):\d+\b/i.test(designSystem) || /\b(selector|component|class|id):/i.test(designSystem)),
    evidence: 'Implementation Mapping must cite selectors, component names, or file:line references for major tokens, regions, and components',
  })

  const screenshotRefs = [...designSystem.matchAll(/\.buildprint\/screenshots\/[^\s)`'"]+/g)].map((match) => match[0])
  const missingRefs = screenshotRefs.filter((ref) => !fs.existsSync(path.join(projectRoot, ref)))
  checks.push({
    id: 'design-system-screenshot-acceptance-refs',
    pass: /Screenshot Acceptance/i.test(designSystem) && screenshotRefs.length > 0 && missingRefs.length === 0,
    evidence: screenshotRefs.length === 0
      ? 'Screenshot Acceptance must reference at least one .buildprint/screenshots path'
      : (missingRefs.length > 0 ? `missing DESIGN.md screenshot references: ${missingRefs.join(', ')}` : ''),
  })

  return checks
}

export function architectureUiStackChecks({ architectureText, isUiBearing }) {
  if (!isUiBearing) return []
  const text = architectureText || ''
  const selectedStackText = text
    .split(/\r?\n/)
    .filter((line) => !/rejected alternatives?|reject(ed|s)|avoid|not use/i.test(line))
    .join('\n')
  const staticUiPattern = /static (chat-native )?WebUI|static DOM|plain CSS|custom DOM scripting|custom DOM updates|vanilla (JS|JavaScript|CSS|DOM)/i
  const hasException = /ui_stack_exception/i.test(text) &&
    /why|because|inappropriate|not appropriate/i.test(text) &&
    /proof/i.test(text) &&
    /stateful screen composition|component states|design tokens|responsive viewport proof|UI-state complexity/i.test(text)
  const frameworkPattern = /React|Vite|Next\.?js|Remix|Vue|Nuxt|Svelte|SvelteKit|Solid|Astro/i
  const stylingPattern = /Tailwind CSS v?4?|tokenized CSS variables|CSS modules|vanilla-extract|Panda CSS|Radix|shadcn|Mantine|Chakra|MUI|design system/i
  const checks = [
    {
      id: 'architecture-ui-framework-section',
      pass: /Framework And Styling Decisions/i.test(text),
      evidence: 'docs/architecture.md must include ## Framework And Styling Decisions for UI-bearing artifacts',
    },
    {
      id: 'architecture-ui-framework-choice',
      pass: hasException || (/selected.*(framework|runtime)|frontend.*(framework|runtime)|UI runtime/i.test(text) && frameworkPattern.test(text)),
      evidence: 'architecture must choose a proven frontend framework/runtime such as React + Vite + TypeScript, or record ui_stack_exception',
    },
    {
      id: 'architecture-ui-styling-choice',
      pass: hasException || (/styling|design-system|design system/i.test(text) && stylingPattern.test(text) && /token/i.test(text)),
      evidence: 'architecture must choose a proven styling/design-system path such as Tailwind CSS v4 + tokenized CSS variables, or record ui_stack_exception',
    },
    {
      id: 'architecture-ui-proof-commands',
      pass: hasException || (/proof commands?|commands?/i.test(text) && /(npm|pnpm|bun|yarn) run/i.test(text) && /typecheck|build|test|verify|playwright/i.test(text)),
      evidence: 'Framework And Styling Decisions must expose proof commands that verify the frontend and styling path',
    },
    {
      id: 'architecture-ui-state-complexity-mapping',
      pass: hasException || hasAll(text, [/stateful screen composition/i, /component states/i, /design tokens/i, /responsive viewport proof/i]),
      evidence: 'architecture must map framework/styling choices to stateful screen composition, component states, design tokens, and responsive viewport proof',
    },
    {
      id: 'architecture-ui-static-exception',
      pass: !staticUiPattern.test(selectedStackText) || hasException,
      evidence: 'static WebUI/plain CSS/custom DOM scripting requires explicit ui_stack_exception with equivalent proof',
    },
  ]
  return checks
}

export function claimChecks(projectRoot) {
  const buildprintDir = path.join(projectRoot, '.buildprint')
  const artifactCheck = safeReadText(path.join(buildprintDir, 'artifact-check.md'))
  const uiEvidence = safeReadText(path.join(buildprintDir, 'ui-evidence.md'))
  const criticalReview = safeReadText(path.join(buildprintDir, 'critical-review-pushback.md'))
  const state = parseJson(safeReadText(path.join(buildprintDir, 'state.json')))
  const completed = Array.isArray(state.completedPhases) ? state.completedPhases : []
  const checks = [
    ...hardStopDecisionChecks(projectRoot),
    {
      id: 'claim-phase-core-vs-qualified',
      pass: /phase_core_passed/i.test(`${artifactCheck}\n${criticalReview}`) && /claim_qualified/i.test(`${artifactCheck}\n${criticalReview}`),
      evidence: 'final claim evidence must distinguish phase_core_passed from claim_qualified',
    },
    {
      id: 'claim-artifact-check-pass',
      pass: /Artifact check:[\s\S]*PASS/i.test(artifactCheck),
      evidence: '.buildprint/artifact-check.md must report PASS before final claim qualification',
    },
    {
      id: 'claim-ui-evidence-present',
      pass: /pass_fail:\s*PASS/i.test(uiEvidence) && /structural_difference:/i.test(uiEvidence),
      evidence: '.buildprint/ui-evidence.md must include PASS rows with structural_difference evidence',
    },
    {
      id: 'claim-independent-critical-review',
      pass: /## Reviewer independence/i.test(criticalReview) && /PASS/i.test(criticalReview) && !/REVIEW_INVALID|FAIL/i.test(criticalReview),
      evidence: '.buildprint/critical-review-pushback.md must record independent PASS without REVIEW_INVALID or FAIL',
    },
    {
      id: 'claim-completed-phases-have-review',
      pass: completed.length === 0 || !!criticalReview,
      evidence: 'completed phases in state.json require critical review evidence before final qualification',
    },
  ]
  return checks
}

export function hardStopDecisionChecks(projectRoot) {
  const decisionsFile = path.join(projectRoot, '.buildprint', 'decisions.md')
  const text = safeReadText(decisionsFile)
  const hasStub = /No implementation decisions recorded yet/i.test(text)
  const checks = [
    {
      id: 'hard-stop-decisions-present',
      pass: !!text.trim() && !hasStub,
      evidence: hasStub
        ? '.buildprint/decisions.md still contains the empty bootstrap stub'
        : 'all setup-changing hard-stop decisions must be recorded before setup or phase work',
    },
    {
      id: 'hard-stop-decisions-required-fields',
      pass: hasAll(text, [/\bconfirmed_by\b/i, /\banswer\b/i, /\breversible\b/i, /\bblocks_setup\b/i]),
      evidence: '.buildprint/decisions.md must include confirmed_by, answer, reversible, and blocks_setup fields',
    },
    {
      id: 'hard-stop-decisions-no-agent-assumption',
      pass: !/\bagent_assumption\b/i.test(text),
      evidence: 'hard-stop rows may not use confirmed_by: agent_assumption',
    },
  ]

  const missingRows = HARD_STOP_DECISION_ROWS.filter((row) => !row.pattern.test(text)).map((row) => row.label)
  checks.push({
    id: 'hard-stop-decisions-five-rows',
    pass: missingRows.length === 0,
    evidence: missingRows.length ? `missing hard-stop rows: ${missingRows.join(', ')}` : '',
  })

  const unconfirmedRows = HARD_STOP_DECISION_ROWS
    .map((row) => ({ row, block: decisionRowBlock(text, row.pattern) }))
    .filter(({ block }) => block && !/(confirmed_by\s*[:|]\s*(user|explicit_user_delegation|blocker)|\|\s*(user|explicit_user_delegation|blocker)\s*\|)/i.test(block))
    .map(({ row }) => row.label)
  checks.push({
    id: 'hard-stop-decisions-confirmed',
    pass: missingRows.length > 0 || unconfirmedRows.length === 0,
    evidence: unconfirmedRows.length
      ? `hard-stop rows must be confirmed_by user, explicit_user_delegation, or blocker: ${unconfirmedRows.join(', ')}`
      : '',
  })

  const blankRows = HARD_STOP_DECISION_ROWS
    .map((row) => ({ row, block: decisionRowBlock(text, row.pattern) }))
    .filter(({ block }) => block && /\b(TBD|TODO|unknown|blank|stub|pending answer)\b/i.test(block))
    .map(({ row }) => row.label)
  checks.push({
    id: 'hard-stop-decisions-not-stubbed',
    pass: blankRows.length === 0,
    evidence: blankRows.length ? `stubbed hard-stop rows: ${blankRows.join(', ')}` : '',
  })

  return checks
}

function hasAll(text, patterns) {
  return patterns.every((pattern) => pattern.test(text))
}

function decisionRowBlock(text, pattern) {
  const lines = text.split(/\r?\n/)
  const index = lines.findIndex((line) => pattern.test(line))
  if (index < 0) return ''
  if (/^\s*\|/.test(lines[index])) return lines[index]
  const block = [lines[index]]
  for (let i = index + 1; i < Math.min(lines.length, index + 10); i++) {
    const line = lines[i]
    if (/^#{1,6}\s+/.test(line) || (/^\s*-\s+\*\*/.test(line) && i > index + 1)) break
    block.push(line)
  }
  return block.join('\n')
}

function safeReadText(file) {
  try { return fs.readFileSync(file, 'utf8') } catch { return '' }
}

function parseJson(text) {
  try { return JSON.parse(text) } catch { return {} }
}

function yamlSection(text, key) {
  const lines = text.split(/\r?\n/)
  const index = lines.findIndex((line) => new RegExp(`^\\s*${escapeRegExp(key)}:\\s*$`, 'i').test(line))
  if (index < 0) return ''
  const keyIndent = (lines[index].match(/^\s*/) || [''])[0].length
  const collected = []
  for (let i = index + 1; i < lines.length; i++) {
    const line = lines[i]
    const indent = (line.match(/^\s*/) || [''])[0].length
    if (line.trim() && indent <= keyIndent && /^\s*[\w.-]+:/.test(line)) break
    collected.push(line)
  }
  return collected.join('\n')
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
