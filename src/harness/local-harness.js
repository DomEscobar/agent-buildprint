import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { exists, readText } from '../shared/fs.js'
import { toPosixPath } from '../shared/paths.js'
import { HARNESS_SKILLS } from './skill-templates.js'

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

function buildHarnessAgentsSection(targets) {
  return [
    HARNESS_SECTION_START,
    '## Buildprint Skill Harness',
    '',
    'This project uses a local Buildprint skill harness. Keep it project-local unless the user explicitly asks for global agent configuration changes.',
    '',
    '- Initialize or repair with `agb harness init .`.',
    '- Verify with `agb harness check .` before phase implementation.',
    `- Active skill targets: ${targets.join(', ')}.`,
    '- Portable skills live in `.agents/skills/`; agent-specific copies may live in `.codex/skills/` or `.claude/skills/` when those agents are detected or requested.',
    '- Required skills: `frontend-ui-product-design`, `subagent-driven-implementation`.',
    '- Do not copy third-party skill packs blindly. Use the Buildprint-native local skills unless the user explicitly installs an upstream skill/plugin.',
    '',
    'Harness rules:',
    '',
    '- Use `frontend-ui-product-design` before building or changing UI.',
    '- Use `subagent-driven-implementation` for multi-task phase execution or implementation plans.',
    '- Record missing global/plugin skills as blockers; do not pretend they are installed.',
    HARNESS_SECTION_END,
    ''
  ].join('\n')
}

function patchAgentsMd(projectRoot, targets) {
  const file = path.join(projectRoot, 'AGENTS.md')
  const nextSection = buildHarnessAgentsSection(targets)
  const previous = exists(file) ? readText(file) : '# AGENTS.md\n\n'
  const pattern = new RegExp(`${HARNESS_SECTION_START}[\\s\\S]*?${HARNESS_SECTION_END}\\n?`, 'm')
  const next = pattern.test(previous)
    ? previous.replace(pattern, nextSection)
    : `${previous.trimEnd()}\n\n${nextSection}`
  fs.writeFileSync(file, next)
}

function writeHarnessSkillCopies(projectRoot, targets) {
  const written = []
  for (const agent of targets) {
    const root = harnessSkillDirForAgent(projectRoot, agent)
    for (const skill of HARNESS_SKILLS) {
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

export function harnessCheckResult(projectFolder = process.cwd(), requestedAgent = 'auto') {
  const projectRoot = path.resolve(projectFolder)
  const targets = harnessTargetAgents(projectRoot, requestedAgent)
  const agentsPath = path.join(projectRoot, 'AGENTS.md')
  const agentsText = exists(agentsPath) ? readText(agentsPath) : ''
  const skillResults = targets.flatMap((agent) => {
    const root = harnessSkillDirForAgent(projectRoot, agent)
    return HARNESS_SKILLS.flatMap((skill) => harnessSkillFiles(skill).map((artifact) => {
      const file = path.join(root, skill.name, artifact.path)
      return {
        agent,
        skill: skill.name,
        artifact: artifact.path,
        path: projectRelative(projectRoot, file),
        exists: exists(file)
      }
    }))
  })
  const missingSkills = skillResults.filter((item) => !item.exists)
  const hasAgents = exists(agentsPath)
  const hasSection = hasAgents && agentsText.includes(HARNESS_SECTION_START) && agentsText.includes(HARNESS_SECTION_END)
  const status = !hasAgents || missingSkills.length === skillResults.length
    ? 'missing'
    : (!hasSection || missingSkills.length ? 'warn' : 'pass')
  const nextSteps = []
  if (!hasAgents) nextSteps.push('Run `agb harness init .` to create AGENTS.md and local skills.')
  else if (!hasSection) nextSteps.push('Run `agb harness init .` to patch AGENTS.md with the Buildprint Skill Harness section.')
  if (missingSkills.length) nextSteps.push('Run `agb harness init .` to write missing local skill files.')
  if (!nextSteps.length) nextSteps.push('Harness is initialized. Run phase setup and keep AGENTS.md in the mandatory read order.')
  return {
    status,
    projectRoot,
    requestedAgent,
    targets,
    agentsMd: { path: 'AGENTS.md', exists: hasAgents, hasHarnessSection: hasSection },
    skills: skillResults,
    detectedAgents: detectedHarnessAgents(projectRoot),
    nextSteps
  }
}

export function printHarnessResult(result, json = false) {
  if (json) {
    console.log(JSON.stringify(result, null, 2))
    return
  }
  console.log(`Harness check: ${result.status.toUpperCase()}`)
  console.log(`Project: ${result.projectRoot}`)
  console.log(`Targets: ${result.targets.join(', ')}`)
  console.log(`AGENTS.md: ${result.agentsMd.exists ? (result.agentsMd.hasHarnessSection ? 'present with harness section' : 'present, harness section missing') : 'missing'}`)
  for (const skill of result.skills) {
    console.log(`${skill.exists ? '[ok]' : '[missing]'} ${skill.agent}: ${skill.path}`)
  }
  console.log('\nNext:')
  for (const step of result.nextSteps) console.log(`- ${step}`)
}

export function harnessInit(projectFolder = process.cwd(), requestedAgent = 'auto', json = false) {
  const projectRoot = path.resolve(projectFolder)
  fs.mkdirSync(projectRoot, { recursive: true })
  const targets = harnessTargetAgents(projectRoot, requestedAgent)
  const written = writeHarnessSkillCopies(projectRoot, targets)
  patchAgentsMd(projectRoot, targets)
  const result = harnessCheckResult(projectRoot, requestedAgent)
  result.written = written
  printHarnessResult(result, json)
  return result.status === 'pass'
}
