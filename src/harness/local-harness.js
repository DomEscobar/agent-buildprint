import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { exists, readText } from '../shared/fs.js'
import { toPosixPath } from '../shared/paths.js'
import { HARNESS_CORE_SKILL_NAMES, HARNESS_PROFILES, harnessSkillsForProfiles, normalizeHarnessProfiles } from './skill-templates.js'

const HARNESS_SECTION_START = '<!-- AGB_HARNESS_START -->'
const HARNESS_SECTION_END = '<!-- AGB_HARNESS_END -->'

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))]
}

function projectRelative(projectRoot, file) {
  return toPosixPath(path.relative(projectRoot, file))
}

function harnessSkillDirForAgent(projectRoot, agent) {
  if (agent === 'codex') return path.join(projectRoot, '.codex', 'skills')
  if (agent === 'claude') return path.join(projectRoot, '.claude', 'skills')
  if (agent === 'agents') return path.join(projectRoot, '.agents', 'skills')
  throw new Error(`unknown harness agent target: ${agent}`)
}

function harnessSkillFiles(skill) {
  return [
    { path: 'SKILL.md', body: skill.body },
    ...(skill.references || [])
  ]
}

function detectedHarnessAgents(projectRoot) {
  const detected = []
  const home = os.homedir()
  if (process.env.CODEX_HOME || exists(path.join(projectRoot, '.codex')) || exists(path.join(home, '.codex'))) detected.push('codex')
  if (process.env.CLAUDECODE || process.env.CLAUDE_CODE || exists(path.join(projectRoot, '.claude')) || exists(path.join(projectRoot, 'CLAUDE.md')) || exists(path.join(home, '.claude'))) detected.push('claude')
  if (exists(path.join(projectRoot, '.agents'))) detected.push('agents')
  return uniqueStrings(detected)
}

function harnessTargetAgents(projectRoot, requested = 'auto') {
  const value = requested || 'auto'
  if (value === 'all') return ['agents', 'codex', 'claude']
  if (['agents', 'codex', 'claude'].includes(value)) return uniqueStrings(['agents', value])
  if (value !== 'auto') throw new Error(`unknown --agent value: ${value}`)
  const detected = detectedHarnessAgents(projectRoot)
  return uniqueStrings(['agents', ...detected])
}

function profileCliArgs(profiles) {
  return normalizeHarnessProfiles(profiles).map((profile) => ` --profile ${profile}`).join('')
}

function buildHarnessAgentsSection(targets, profiles = ['default']) {
  const normalizedProfiles = normalizeHarnessProfiles(profiles)
  const selectedSkillNames = harnessSkillsForProfiles(normalizedProfiles).map((skill) => skill.name)
  const profileLine = normalizedProfiles.length === 1 && normalizedProfiles[0] === 'default'
    ? '- Active profile: `default`.'
    : `- Active profiles: ${normalizedProfiles.map((profile) => `\`${profile}\``).join(', ')} (selected skills: ${selectedSkillNames.map((name) => `\`${name}\``).join(', ')}).`
  return [
    HARNESS_SECTION_START,
    '## Buildprint Skill Harness',
    '',
    'This project uses a local Buildprint skill harness. Keep it project-local unless the user explicitly asks for global agent configuration changes.',
    '',
    '- Initialize or repair with `agb harness init .`.',
    '- Verify with `agb harness check .` before phase implementation; use `agb harness checkup .` for the stricter setup doctor.',
    `- Active skill targets: ${targets.join(', ')}.`,
    profileLine,
    '- Portable skills live in `.agents/skills/`; agent-specific copies may live in `.codex/skills/` or `.claude/skills/` when those agents are detected or requested.',
    `- Required core skills: ${HARNESS_CORE_SKILL_NAMES.map((name) => `\`${name}\``).join(', ')}.`,
    '- Optional profiles: `webapp`, `backend`, `agentic`, `full`. Do not use `full` unless broad coverage is worth the extra context.',
    '- Do not copy third-party skill packs blindly. Use the Buildprint-native local skills unless the user explicitly installs an upstream skill/plugin.',
    '',
    'Harness rules:',
    '',
    '- Use `setup-runbook` during `01-project-setup.md`; it must leave `docs/architecture.md`, `.env.example`, and `.buildprint/setup-receipt.md` or honest blockers.',
    '- Use `frontend-ui-product-design` before building or changing UI.',
    '- Use `subagent-driven-implementation` only for multi-task phases with clean file ownership.',
    '- Use `verify-and-review` before claiming a phase, checkpoint, or handover is done.',
    '- Respect each skill frontmatter `triggers`, `skips`, and `completion_signal`; completion signals are required in handoff notes when a skill governs the work.',
    '- Record missing global/plugin skills as blockers; do not pretend they are installed.',
    HARNESS_SECTION_END,
    ''
  ].join('\n')
}

function patchAgentsMd(projectRoot, targets, profiles = ['default']) {
  const file = path.join(projectRoot, 'AGENTS.md')
  const nextSection = buildHarnessAgentsSection(targets, profiles)
  const previous = exists(file) ? readText(file) : '# AGENTS.md\n\n'
  const pattern = new RegExp(`${HARNESS_SECTION_START}[\\s\\S]*?${HARNESS_SECTION_END}\\n?`, 'm')
  const next = pattern.test(previous)
    ? previous.replace(pattern, nextSection)
    : `${previous.trimEnd()}\n\n${nextSection}`
  fs.writeFileSync(file, next)
}

function writeHarnessSkillCopies(projectRoot, targets, profiles = ['default']) {
  const written = []
  const skills = harnessSkillsForProfiles(profiles)
  for (const agent of targets) {
    const root = harnessSkillDirForAgent(projectRoot, agent)
    for (const skill of skills) {
      const dir = path.join(root, skill.name)
      for (const artifact of harnessSkillFiles(skill)) {
        const file = path.join(dir, artifact.path)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, artifact.body)
        written.push(projectRelative(projectRoot, file))
      }
    }
  }
  return written
}

function textHasSkillContract(text) {
  return /triggers:/i.test(text) && /skips:/i.test(text) && /completion_signal:/i.test(text)
}

function checkupArtifacts(projectRoot, agentsText) {
  const checks = [
    {
      id: 'agents-harness-section',
      label: 'AGENTS.md has Buildprint Skill Harness section',
      status: agentsText.includes(HARNESS_SECTION_START) && agentsText.includes(HARNESS_SECTION_END) ? 'pass' : 'fail'
    },
    {
      id: 'setup-receipt',
      label: '.buildprint/setup-receipt.md exists',
      status: exists(path.join(projectRoot, '.buildprint', 'setup-receipt.md')) ? 'pass' : 'warn'
    },
    {
      id: 'architecture',
      label: 'docs/architecture.md exists',
      status: exists(path.join(projectRoot, 'docs', 'architecture.md')) ? 'pass' : 'warn'
    },
    {
      id: 'env-example',
      label: '.env.example exists',
      status: exists(path.join(projectRoot, '.env.example')) ? 'pass' : 'warn'
    },
    {
      id: 'ui-identity',
      label: 'UI identity artifact exists when the project is UI-bearing',
      status: exists(path.join(projectRoot, 'docs', 'ui-identity.md')) || exists(path.join(projectRoot, 'UI-IDENTITY.md')) ? 'pass' : 'warn'
    },
    {
      id: 'completion-signals',
      label: 'AGENTS.md mentions skill completion signals',
      status: /completion_signal/i.test(agentsText) || /completion signals/i.test(agentsText) ? 'pass' : 'warn'
    }
  ]
  return checks
}

export function harnessCheckResult(projectFolder = process.cwd(), requestedAgent = 'auto', profiles = ['default'], mode = 'check') {
  const projectRoot = path.resolve(projectFolder)
  const targets = harnessTargetAgents(projectRoot, requestedAgent)
  const normalizedProfiles = normalizeHarnessProfiles(profiles)
  const skills = harnessSkillsForProfiles(normalizedProfiles)
  const agentsPath = path.join(projectRoot, 'AGENTS.md')
  const agentsText = exists(agentsPath) ? readText(agentsPath) : ''
  const skillResults = targets.flatMap((agent) => {
    const root = harnessSkillDirForAgent(projectRoot, agent)
    return skills.flatMap((skill) => harnessSkillFiles(skill).map((artifact) => {
      const file = path.join(root, skill.name, artifact.path)
      const artifactText = exists(file) ? readText(file) : ''
      return {
        agent,
        skill: skill.name,
        artifact: artifact.path,
        path: projectRelative(projectRoot, file),
        exists: exists(file),
        hasContract: artifact.path === 'SKILL.md' && exists(file) ? textHasSkillContract(artifactText) : null
      }
    }))
  })
  const missingSkills = skillResults.filter((item) => !item.exists)
  const badContracts = mode === 'checkup' ? skillResults.filter((item) => item.artifact === 'SKILL.md' && item.exists && !item.hasContract) : []
  const hasAgents = exists(agentsPath)
  const hasSection = hasAgents && agentsText.includes(HARNESS_SECTION_START) && agentsText.includes(HARNESS_SECTION_END)
  const checkup = mode === 'checkup' ? checkupArtifacts(projectRoot, agentsText) : []
  const failedCheckups = checkup.filter((item) => item.status === 'fail')
  const warnedCheckups = checkup.filter((item) => item.status === 'warn')
  const status = !hasAgents || missingSkills.length === skillResults.length || failedCheckups.length
    ? 'missing'
    : (!hasSection || missingSkills.length || badContracts.length || warnedCheckups.length ? 'warn' : 'pass')
  const nextSteps = []
  const profileArg = profileCliArgs(normalizedProfiles)
  if (!hasAgents) nextSteps.push(`Run \`agb harness init .${profileArg}\` to create AGENTS.md and local skills.`)
  else if (!hasSection) nextSteps.push(`Run \`agb harness init .${profileArg}\` to patch AGENTS.md with the Buildprint Skill Harness section.`)
  if (missingSkills.length) nextSteps.push(`Run \`agb harness init .${profileArg}\` to write missing local skill files.`)
  if (badContracts.length) nextSteps.push('Repair skill frontmatter so every SKILL.md has triggers, skips, and completion_signal.')
  if (warnedCheckups.length) nextSteps.push('Complete setup artifacts or record honest blockers before phase work.')
  if (!nextSteps.length) nextSteps.push('Harness is initialized. Run phase setup and keep AGENTS.md in the mandatory read order.')
  return {
    status,
    projectRoot,
    requestedAgent,
    profile: normalizedProfiles.join(','),
    profiles: normalizedProfiles,
    mode,
    targets,
    selectedSkills: skills.map((skill) => skill.name),
    availableProfiles: Object.keys(HARNESS_PROFILES),
    agentsMd: { path: 'AGENTS.md', exists: hasAgents, hasHarnessSection: hasSection },
    skills: skillResults,
    checkup,
    detectedAgents: detectedHarnessAgents(projectRoot),
    nextSteps
  }
}

export function printHarnessResult(result, json = false) {
  if (json) {
    console.log(JSON.stringify(result, null, 2))
    return
  }
  console.log(`Harness ${result.mode === 'checkup' ? 'checkup' : 'check'}: ${result.status.toUpperCase()}`)
  console.log(`Project: ${result.projectRoot}`)
  console.log(`Targets: ${result.targets.join(', ')}`)
  console.log(`Profiles: ${(result.profiles || [result.profile]).join(', ')}`)
  console.log(`AGENTS.md: ${result.agentsMd.exists ? (result.agentsMd.hasHarnessSection ? 'present with harness section' : 'present, harness section missing') : 'missing'}`)
  for (const skill of result.skills) {
    const contract = skill.hasContract === false ? ' contract-missing' : ''
    console.log(`${skill.exists ? '[ok]' : '[missing]'} ${skill.agent}: ${skill.path}${contract}`)
  }
  if (result.checkup.length) {
    console.log('\nCheckup:')
    for (const check of result.checkup) console.log(`[${check.status}] ${check.label}`)
  }
  console.log('\nNext:')
  for (const step of result.nextSteps) console.log(`- ${step}`)
}

export function harnessInit(projectFolder = process.cwd(), requestedAgent = 'auto', json = false, profiles = ['default']) {
  const projectRoot = path.resolve(projectFolder)
  fs.mkdirSync(projectRoot, { recursive: true })
  const targets = harnessTargetAgents(projectRoot, requestedAgent)
  const normalizedProfiles = normalizeHarnessProfiles(profiles)
  const written = writeHarnessSkillCopies(projectRoot, targets, normalizedProfiles)
  patchAgentsMd(projectRoot, targets, normalizedProfiles)
  const result = harnessCheckResult(projectRoot, requestedAgent, normalizedProfiles)
  result.written = written
  printHarnessResult(result, json)
  return result.status === 'pass'
}
