import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'buildprints', 'api-key-management')
const secureRagSource = path.join(root, 'buildprints', 'secure-hybrid-rag-mcp')
const agenticChatEvalSource = path.join(root, 'buildprints', 'agentic-chat-eval-harness')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'agb-capability-regression-'))

function copyPacket(name) {
  const packet = path.join(temp, name)
  fs.cpSync(source, packet, { recursive: true })
  return packet
}

function copySecureRagPacket(name) {
  const packet = path.join(temp, name)
  fs.cpSync(secureRagSource, packet, { recursive: true })
  return packet
}

function copyAgenticChatEvalPacket(name) {
  const packet = path.join(temp, name)
  fs.cpSync(agenticChatEvalSource, packet, { recursive: true })
  return packet
}

function replaceInFile(packet, relativePath, replacements) {
  const file = path.join(packet, relativePath)
  let text = fs.readFileSync(file, 'utf8')
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement)
  fs.writeFileSync(file, text)
}

function replaceInAllFiles(packet, replacements) {
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!entry.isFile()) continue
      let text = fs.readFileSync(full, 'utf8')
      let changed = false
      for (const [pattern, replacement] of replacements) {
        const next = text.replace(pattern, replacement)
        changed = changed || next !== text
        text = next
      }
      if (changed) fs.writeFileSync(full, text)
    }
  }
  walk(packet)
}

function expectCapabilityFailure(name, mutate, expectedFailures) {
  const packet = copyPacket(name)
  expectPacketFailure(name, packet, mutate, expectedFailures)
}

function expectSecureRagFailure(name, mutate, expectedFailures) {
  const packet = copySecureRagPacket(name)
  expectPacketFailure(name, packet, mutate, expectedFailures)
}

function expectAgenticChatEvalFailure(name, mutate, expectedFailures) {
  const packet = copyAgenticChatEvalPacket(name)
  expectPacketFailure(name, packet, mutate, expectedFailures)
}

function expectPacketFailure(name, packet, mutate, expectedFailures) {
  mutate(packet)
  let output = ''
  try {
    execFileSync('node', ['bin/agb.js', 'packet', 'check', packet], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    throw new Error(`${name} unexpectedly passed`)
  } catch (error) {
    output = `${error.stdout || ''}\n${error.stderr || ''}`
    if (new RegExp(`${name} unexpectedly passed`).test(error.message)) throw error
  }
  const missing = expectedFailures.filter((label) => !output.includes(`✗ ${label}`))
  if (missing.length) {
    console.error(output)
    throw new Error(`${name} failed for the wrong reasons; missing expected failures: ${missing.join(', ')}`)
  }
  console.log(`✓ ${name}`)
}

try {
  expectCapabilityFailure('capability regression catches composition drift', (packet) => {
    replaceInFile(packet, 'capability.yaml', [
      [/(composition:\r?\n\s+expects:\r?\n\s+- )auth\.user_identity or explicitly approved service_account owner model/, '$1auth.user_identity'],
    ])
  }, ['capability.yaml keeps requires.existing_capabilities aligned with composition.expects'])

  expectCapabilityFailure('capability regression catches missing prefix negative proof', (packet) => {
    replaceInFile(packet, 'capability.yaml', [
      [/\r?\n\s+- valid prefix with wrong secret body is denied/g, ''],
      [/\r?\n\s+- add tests or fixtures for valid, revoked, wrong-scope, missing, malformed, and valid-prefix\/wrong-secret keys/g,
        '\n    - add tests or fixtures for valid, revoked, wrong-scope, missing, and malformed keys'],
    ])
  }, ['credential capability.yaml proves full-secret verification after prefix lookup'])

  expectCapabilityFailure('capability regression catches missing discovery gate', (packet) => {
    replaceInFile(packet, '00-host-assessment.md', [
      [/\r?\n- finding classifications: `infer safely`, `patch locally`, `must ask user`, or `out of scope`/g, ''],
      [/\r?\n## Finding Classifications\r?\n/g, '\n'],
    ])
    replaceInFile(packet, 'BUILDPRINT.md', [
      [/## Discovery decision gate[\s\S]*?(?=\r?\n## Hard-stop conditions)/, ''],
    ])
    replaceInFile(packet, 'apply.md', [
      [/\r?\nHost assessment is a hard gate\.[\s\S]*?stop and ask before source edits\.\r?\n/, '\n'],
    ])
  }, ['capability packet requires discovery decision gate'])

  expectCapabilityFailure('capability regression catches missing proof reconciliation', (packet) => {
    replaceInFile(packet, 'BUILDPRINT.md', [
      [/Verification must reconcile against the assessment and plan; if a baseline command, Prisma\/schema validation, migration, runtime route, or negative security check fails, downgrade the claim instead of reporting installed success\./g, 'Verification should run the available checks.'],
    ])
    replaceInFile(packet, 'verify.md', [
      [/If a baseline command or schema validation failed before implementation, the receipt must say whether the failure was fixed, unrelated but still a claim ceiling, or blocking\./g, 'If a command failed before implementation, record it.'],
      [/\r?\n- `.buildprint\/capability-receipt.md` reconciles every host-assessment blocker, assumption, baseline failure, and hard-stop question with the final proof level/g, ''],
    ])
    replaceInFile(packet, '01-integration-plan.md', [
      [/\r?\n- reconciliation with `.buildprint\/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking/g, ''],
      [/\r?\n## Assessment Reconciliation\r?\n/g, '\n'],
    ])
  }, ['capability packet requires proof reconciliation and claim downgrade'])

  expectSecureRagFailure('capability regression catches missing secure RAG pre-retrieval invariant', (packet) => {
    replaceInFile(packet, 'BUILDPRINT.md', [
      [/Access control must happen before retrieval\.[\s\S]*?evaluation fixtures must share the same authorization boundary\./g, 'Access control must be handled consistently.'],
    ])
    replaceInFile(packet, 'README.md', [
      [/## Security invariant[\s\S]*?(?=\r?\n## Preferred baseline stack)/g, ''],
    ])
    replaceInFile(packet, 'capability.yaml', [
      [/\r?\n\s+- pre-retrieval authorization/g, ''],
    ])
    replaceInFile(packet, 'compatibility.md', [
      [/pre-retrieval filters/g, 'filters'],
    ])
    replaceInFile(packet, '02-implementation-phases/01-contract-and-config.md', [
      [/The authorized corpus is computed before dense search, keyword search, fusion, reranking, citation, and generation\. Post-retrieval filtering is not the security boundary\./g, 'Authorization must be handled consistently.'],
    ])
  }, ['secure RAG capability requires pre-retrieval authorization'])

  expectSecureRagFailure('capability regression catches missing secure RAG deny proof', (packet) => {
    replaceInFile(packet, 'verify.md', [
      [/\r?\n- Denied subject receives no candidates before dense retrieval\./g, ''],
      [/\r?\n- Denied subject receives no candidates before keyword retrieval\./g, ''],
      [/\r?\n- denied path is proven/g, ''],
    ])
    replaceInFile(packet, 'capability.yaml', [
      [/\r?\n\s+- denied retrieval test passes before dense and keyword search/g, ''],
      [/\r?\n\s+- claim success without denied-path proof/g, ''],
    ])
  }, ['secure RAG capability proves allow and deny retrieval paths'])

  expectAgenticChatEvalFailure('capability regression catches missing agentic chat trace harness', (packet) => {
    replaceInAllFiles(packet, [
      [/\btrace-aware\b/gi, 'event-aware'],
      [/trace/gi, 'event'],
      [/span/gi, 'event'],
    ])
  }, ['agentic chat eval requires trace-aware scenario harness'])

  expectAgenticChatEvalFailure('capability regression catches final-answer-only eval drift', (packet) => {
    replaceInFile(packet, 'README.md', [
      [/\r?\n- No pass from final text alone\./g, ''],
    ])
    replaceInFile(packet, 'capability.yaml', [
      [/\r?\n\s+- grade only the final answer while ignoring trace and side effects/g, ''],
      [/\r?\n\s+- final-answer-only grading hides bad tool calls or unsafe side effects/g, ''],
      [/    - adopted paths keep trace evidence as the primary signal over the final answer alone\r?\n/g, ''],
    ])
    replaceInFile(packet, 'apply.md', [
      [/\r?\n- Do not score only final assistant text\./g, ''],
    ])
    replaceInFile(packet, 'publication.json', [
      [/Use trace-aware scenario harness; do not grade only the final answer/g, 'Use trace-aware scenario harness'],
    ])
  }, ['agentic chat eval forbids final-answer-only grading'])

  expectAgenticChatEvalFailure('capability regression catches missing agentic chat examples', (packet) => {
    fs.rmSync(path.join(packet, 'examples', 'core-chat-scenario.yaml'), { force: true })
    fs.rmSync(path.join(packet, 'examples', 'eval-receipt.md'), { force: true })
  }, ['agentic chat eval ships example scenario and receipt artifacts'])
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}

console.log('capability regression checks caught expected failures')
