#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const sourcePacket = path.join(root, 'buildprints/ai-presentation-generation')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'presentation-packet-eval-'))

function copyPacket(name) {
  const target = path.join(tmp, name)
  fs.cpSync(sourcePacket, target, { recursive: true })
  return target
}

function edit(folder, rel, fn) {
  const file = path.join(folder, rel)
  fs.writeFileSync(file, fn(fs.readFileSync(file, 'utf8')))
}

function runAgb(args) {
  try {
    return {
      failed: false,
      output: execFileSync(process.execPath, [path.join(root, 'bin/agb.js'), ...args], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 30000
      })
    }
  } catch (error) {
    return { failed: true, output: `${error.stdout || ''}${error.stderr || ''}` }
  }
}

function expectPass(name, args, snippets = []) {
  const { failed, output } = runAgb(args)
  const missing = snippets.filter((snippet) => !output.includes(snippet))
  if (failed || missing.length) {
    console.error(output)
    console.error(`${name} failed; missing expected output: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
}

function expectFailure(name, args, snippets) {
  const { failed, output } = runAgb(args)
  const missing = snippets.filter((snippet) => !output.includes(snippet))
  if (!failed || missing.length) {
    console.error(output)
    console.error(`${name} failed; missing expected output: ${missing.join(', ') || '(none)'}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
  console.log(snippets.map((snippet) => `  - ${snippet}`).join('\n'))
}

expectPass('presentation packet passes', ['packet', 'check', sourcePacket], ['Packet check: PASS'])

const missingLongTextGate = copyPacket('missing-long-text-gate')
edit(missingLongTextGate, 'blueprint.yaml', (s) => s.replaceAll('long_text_stress_acceptance', 'long_text_stress_removed'))
expectFailure('presentation eval rejects missing long-text gate', ['packet', 'check', missingLongTextGate], ['✗ presentation blueprint declares gate: long_text_stress_acceptance'])

const missingContentGate = copyPacket('missing-content-specificity-gate')
edit(missingContentGate, 'blueprint.yaml', (s) => s.replaceAll('content_specificity_acceptance', 'content_specificity_removed'))
expectFailure('presentation eval rejects missing content-specificity gate', ['packet', 'check', missingContentGate], ['✗ presentation blueprint declares gate: content_specificity_acceptance'])

const missingVerificationArtifacts = copyPacket('missing-verification-artifacts')
edit(missingVerificationArtifacts, 'blueprint.yaml', (s) => s.replace(/\nverification_artifacts:[\s\S]*?\nproduction_quality_gates:/, '\nproduction_quality_gates:'))
expectFailure('presentation eval rejects missing verification artifacts', ['packet', 'check', missingVerificationArtifacts], ['✗ presentation blueprint declares verification artifacts'])

const missingCriticalReviewPhase = copyPacket('missing-critical-review-phase')
fs.rmSync(path.join(missingCriticalReviewPhase, '03-phases/critical-review-pushback.md'))
edit(missingCriticalReviewPhase, '03-phases/phase-index.yaml', (s) => s.replace(/\n\s+- phase_id: 99-critical-review-pushback[\s\S]*?status: included\n/, '\n'))
expectFailure('presentation eval rejects missing critical review phase', ['packet', 'check', missingCriticalReviewPhase], ['✗ phase index includes 99-critical-review-pushback final phase'])

const weakCriticalReviewRubric = copyPacket('weak-critical-review-rubric')
edit(weakCriticalReviewRubric, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/Score each category 0 to 5/g, 'Score generally')
  .replace(/total score out of 50/g, 'overall impression')
  .replace(/at least 42\/50/g, 'good enough')
  .replace(/no category below 4/g, 'no major issues')
  .replace(/no unresolved high-severity finding/g, 'no obvious disaster'))
expectFailure('presentation eval rejects weak critical review rubric', ['packet', 'check', weakCriticalReviewRubric], ['✗ critical-review-pushback defines scored rubric and pass threshold'])

const weakCriticalReviewLoop = copyPacket('weak-critical-review-loop')
edit(weakCriticalReviewLoop, '03-phases/critical-review-pushback.md', (s) => s
  .replace(/repair loop/g, 'review notes')
  .replace(/name the flaw and severity/g, 'describe issues')
  .replace(/patch the smallest real fix/g, 'consider fixes')
  .replace(/rerun the relevant proof/g, 'look again')
  .replace(/rescore/g, 'summarize')
  .replace(/five iterations/g, 'a few tries'))
expectFailure('presentation eval rejects weak critical review loop', ['packet', 'check', weakCriticalReviewLoop], ['✗ critical-review-pushback defines repair loop for failed score'])

const missingDesignProtocol = copyPacket('missing-design-protocol')
edit(missingDesignProtocol, '02-uiux-decision.md', (s) => s.replace(/## 0\. Autonomous design decision protocol[\s\S]*?(?=\n## 1\. Design thesis)/, ''))
expectFailure('presentation eval rejects missing autonomous design protocol', ['packet', 'check', missingDesignProtocol], ['✗ ui/ux decision requires autonomous design reasoning when direction is missing'])

const weakStyleDirection = copyPacket('weak-style-direction')
edit(weakStyleDirection, '02-uiux-decision.md', (s) => s.replace(/## 2\. Chosen style direction[\s\S]*?(?=\n## 3\. Color system)/, '## 2. Chosen style direction\n\nUse a modern clean UI.\n\n'))
expectFailure('presentation eval rejects vague style direction', ['packet', 'check', weakStyleDirection], ['✗ ui/ux decision has a specific chosen style direction'])

const weakColorSystem = copyPacket('weak-color-system')
edit(weakColorSystem, '02-uiux-decision.md', (s) => s.replace(/## 3\. Color system[\s\S]*?(?=\n## 4\. Typography system)/, '## 3. Color system\n\nUse a tasteful modern palette with good contrast and clear statuses.\n\n'))
expectFailure('presentation eval rejects vague color system', ['packet', 'check', weakColorSystem], ['✗ ui/ux decision has precise color tokens and status semantics'])

const weakTypographySystem = copyPacket('weak-typography-system')
edit(weakTypographySystem, '02-uiux-decision.md', (s) => s.replace(/## 4\. Typography system[\s\S]*?(?=\n## 5\. Layout and spatial rhythm)/, '## 4. Typography system\n\nUse readable sans-serif typography with a clear hierarchy and polished labels.\n\n'))
expectFailure('presentation eval rejects vague typography system', ['packet', 'check', weakTypographySystem], ['✗ ui/ux decision has precise typography scale'])

const weakLayoutSystem = copyPacket('weak-layout-system')
edit(weakLayoutSystem, '02-uiux-decision.md', (s) => s.replace(/## 5\. Layout and spatial rhythm[\s\S]*?(?=\n## 6\. Required views)/, '## 5. Layout and spatial rhythm\n\nUse a responsive layout that works well on desktop and mobile with clean spacing.\n\n'))
expectFailure('presentation eval rejects vague layout system', ['packet', 'check', weakLayoutSystem], ['✗ ui/ux decision has precise layout and responsive rules'])

const weakPhase04 = copyPacket('weak-phase-04')
edit(weakPhase04, '03-phases/04-editable-deck-workbench.md', (s) => s
  .replace(/page-level horizontal overflow/g, 'viewport issue')
  .replace(/stable 16:9 canvas bounds/g, 'canvas shape')
  .replace(/long-text stress states/g, 'stress state'))
expectFailure('presentation eval rejects weak phase 04 geometry proof', ['packet', 'check', weakPhase04], ['✗ presentation phase 04 requires geometry and overflow assertions'])

const weakPhase08 = copyPacket('weak-phase-08')
edit(weakPhase08, '03-phases/08-verification-and-handover.md', (s) => s
  .replace(/desktop geometry/g, 'desktop check')
  .replace(/mobile overflow/g, 'mobile check')
  .replace(/content-specificity/g, 'content check')
  .replace(/long-text stress/g, 'stress check'))
expectFailure('presentation eval rejects weak phase 08 repeatable proof', ['packet', 'check', weakPhase08], ['✗ presentation phase 08 requires repeatable proof assertions'])

const weakHandover = copyPacket('weak-handover')
edit(weakHandover, 'HANDOVER.md', (s) => s.replace(/generated-app proof commands/g, 'manual review notes'))
expectFailure('presentation eval rejects handover without generated proof commands', ['packet', 'check', weakHandover], ['✗ presentation handover requires proof paths and pass/fail status'])

console.log('Presentation packet eval: PASS')
