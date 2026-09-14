import fs from 'node:fs'
import path from 'node:path'
import { bytes, hash, insist, relative, safeAbsolute } from './io.js'

// Skill routing is declarative only.  This module never imports, executes, or
// installs a skill; a hash says that a file is present, not that an agent read it.
export const skillId = value => typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,95}$/.test(value)

export function skillDefinitionCheck(definition) {
  if (definition.skillRoot !== undefined) relative(definition.skillRoot)
  for (const loop of definition.loops) {
    if (loop.skills === undefined) continue
    insist(definition.skillRoot !== undefined, `loop ${loop.id} skill declarations require definition.skillRoot`)
    const skills = loop.skills
    insist(skills && typeof skills === 'object' && !Array.isArray(skills) && Object.keys(skills).every(key => key === 'required' || key === 'optional'), `invalid skills declaration for loop: ${loop.id}`)
    insist(Array.isArray(skills.required) && skills.required.length <= 100 && Array.isArray(skills.optional) && skills.optional.length <= 100, `skills require required and optional arrays of at most 100 entries for loop: ${loop.id}`)
    const ids = new Set()
    for (const id of skills.required) {
      insist(skillId(id) && !ids.has(id), `duplicate/invalid required skill id for loop: ${loop.id}`)
      ids.add(id)
    }
    for (const item of skills.optional) {
      insist(item && typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length === 2 && Object.keys(item).every(key => key === 'id' || key === 'when') && skillId(item.id) && typeof item.when === 'string' && item.when.trim().length > 0 && item.when.length <= 1000 && !ids.has(item.id), `duplicate/invalid optional skill declaration for loop: ${loop.id}`)
      ids.add(item.id)
    }
  }
  return definition
}

function fileReport(root, projectPath) {
  const absolutePath = path.resolve(root, projectPath)
  const report = { projectPath, absolutePath, availability: 'missing', sha256: null, reason: 'file does not exist' }
  try {
    // bytes() verifies every path component before opening the file.  Do not
    // retry an invalid path, particularly an optional symlinked recipe.
    const raw = bytes(absolutePath, 256 * 1024)
    insist(raw.length > 0, `empty skill file refused: ${projectPath}`)
    report.availability = 'available'
    report.sha256 = hash(raw)
    report.reason = null
    return report
  } catch (error) {
    if (error.code === 'ENOENT') return report
    return { ...report, availability: 'invalid', reason: error.message }
  }
}

function rootReport(root, skillRoot) {
  const absolutePath = path.resolve(root, skillRoot)
  try {
    safeAbsolute(absolutePath)
    const stat = fs.lstatSync(absolutePath)
    insist(!stat.isSymbolicLink(), `symlink refused: ${absolutePath}`)
    insist(stat.isDirectory(), `skill root is not a directory: ${skillRoot}`)
    return { projectPath: skillRoot, absolutePath, availability: 'available', reason: null }
  } catch (error) {
    if (error.code === 'ENOENT') return { projectPath: skillRoot, absolutePath, availability: 'missing', reason: 'directory does not exist' }
    return { projectPath: skillRoot, absolutePath, availability: 'invalid', reason: error.message }
  }
}

export function skillReadiness(root, definition, loop) {
  if (loop.skills === undefined) return { declared: false, ready: true, blockers: [], catalog: null, required: [], optional: [] }
  const skillRoot = rootReport(root, definition.skillRoot)
  const catalog = fileReport(root, path.posix.join(definition.skillRoot, 'README.md'))
  const required = loop.skills.required.map(id => ({ id, ...fileReport(root, path.posix.join(definition.skillRoot, id, 'SKILL.md')) }))
  const optional = loop.skills.optional.map(item => ({ id: item.id, when: item.when, ...fileReport(root, path.posix.join(definition.skillRoot, item.id, 'SKILL.md')) }))
  const blockers = []
  if (skillRoot.availability !== 'available') blockers.push(`install or restore skill root: ${skillRoot.projectPath} (${skillRoot.reason})`)
  if (catalog.availability !== 'available') blockers.push(`install or restore required skill catalog: ${catalog.projectPath} (${catalog.reason})`)
  for (const item of required) if (item.availability !== 'available') blockers.push(`install or restore required skill: ${item.id} (${item.projectPath}; ${item.reason})`)
  return { declared: true, ready: blockers.length === 0, blockers, skillRoot, catalog, required, optional }
}

export function requireSkills(root, definition, loop) {
  const readiness = skillReadiness(root, definition, loop)
  insist(readiness.ready, `skill setup blocked: ${readiness.blockers.join('; ')}`)
  return readiness
}

export function skillInstructions(readiness) {
  if (!readiness.declared) return ''
  const catalog = `${readiness.catalog.projectPath} (${readiness.catalog.absolutePath})`
  const required = readiness.required.map(item => `${item.projectPath} (${item.absolutePath})`).join(', ') || 'none'
  const optional = readiness.optional.map(item => `${item.projectPath} (${item.absolutePath}) is ${item.availability}; open when ${item.when}`).join('; ') || 'none'
  const blockers = readiness.blockers.length ? `\nSkill setup blockers: ${readiness.blockers.join('; ')}.` : ''
  return `\nSkill routing: open the catalog ${catalog} and required skill files ${required} before work. Open optional recipes only when applicable: ${optional}. File hashes only establish availability; they do not prove an agent read a skill.${blockers}\n`
}
