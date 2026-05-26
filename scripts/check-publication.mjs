#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve('buildprints');
const schema = 'agent-buildprint/publication.v1';
const requiredScalars = [
  'schema',
  'slug',
  'title',
  'creator',
  'category',
  'tier',
  'status',
  'difficulty',
  'summary',
  'promise',
  'copyPrompt',
];
const requiredArrays = ['runtime', 'stack', 'includes', 'risks', 'checks'];
const executableReadOrder = [
  'BUILDPRINT.md',
  '01-questions.md',
  '02-project-setup.md',
  'blueprint.yaml',
  '03-phases/phase-index.yaml',
  '04-evaluation.md',
];
let failures = 0;

function fail(slug, message) {
  failures += 1;
  console.error(`x ${slug}: ${message}`);
}

function packageSlugs() {
  try {
    const output = execFileSync('git', ['ls-files', 'buildprints/*/BUILDPRINT.md'], { encoding: 'utf8' }).trim();
    if (output) {
      return [...new Set(output.split(/\r?\n/)
        .map((file) => file.split('/')[1])
        .filter(Boolean))]
        .sort();
    }
  } catch {
    // Fall through for non-Git contexts.
  }
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function trackedFiles(slug) {
  try {
    const prefix = `buildprints/${slug}/`;
    const output = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', prefix], { encoding: 'utf8' }).trim();
    return output ? output.split(/\r?\n/).map((file) => file.slice(prefix.length)).filter(Boolean).sort() : [];
  } catch {
    return [];
  }
}

function readJson(slug, file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(slug, `publication.json does not parse: ${error.message}`);
    return null;
  }
}

function buildprintFiles(slug) {
  const fromGit = trackedFiles(slug);
  if (fromGit.length) return fromGit;
  const dir = path.join(root, slug);
  const files = [];
  const walk = (current, base = dir) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (['.git', 'node_modules', 'dist'].includes(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full, base);
      else if (entry.isFile()) files.push(path.relative(base, full).split(path.sep).join('/'));
    }
  };
  walk(dir);
  return files.sort();
}

for (const slug of packageSlugs()) {
  const dir = path.join(root, slug);
  const publicationPath = path.join(dir, 'publication.json');
  if (!fs.existsSync(publicationPath)) {
    fail(slug, 'missing publication.json');
    continue;
  }

  const publication = readJson(slug, publicationPath);
  if (!publication) continue;
  if (publication.publish === false) continue;

  for (const field of requiredScalars) {
    if (typeof publication[field] !== 'string' || !publication[field].trim()) {
      fail(slug, `publication.json missing non-empty string ${field}`);
    }
  }
  if (publication.schema !== schema) fail(slug, `publication.json schema must be ${schema}`);
  if (publication.slug !== slug) fail(slug, `publication.json slug ${publication.slug} does not match folder ${slug}`);
  for (const field of requiredArrays) {
    if (!Array.isArray(publication[field]) || publication[field].length === 0) {
      fail(slug, `publication.json missing non-empty array ${field}`);
    }
  }
  if (!Array.isArray(publication.fileExcludes)) fail(slug, 'publication.json fileExcludes must be an array');

  const files = buildprintFiles(slug);
  const fileSet = new Set(files);
  for (const excluded of publication.fileExcludes ?? []) {
    if (!fileSet.has(excluded)) fail(slug, `fileExcludes lists missing tracked file ${excluded}`);
  }

  const copyPrompt = publication.copyPrompt ?? '';
  const referencedFiles = [...copyPrompt.matchAll(/(?:read|start from|bootstrap|load)\s+[`"]?([A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*\.(?:md|yaml|json|jsonl))/gi)]
    .map((match) => match[1])
    .filter((file) => !file.startsWith('http'));
  for (const file of referencedFiles) {
    if (!fileSet.has(file) && !file.startsWith('.buildprint/')) {
      fail(slug, `copyPrompt references missing file ${file}`);
    }
  }

  const isExecutable = fileSet.has('01-questions.md') && fileSet.has('02-project-setup.md') && fileSet.has('blueprint.yaml');
  if (isExecutable) {
    const expectedBootstrap = `First bootstrap exact snapshots: agb start https://agent-buildprint.com/buildprints/${slug}/package.json .`;
    if (!copyPrompt.includes(expectedBootstrap)) fail(slug, `executable packet copyPrompt must start from bootstrap command ${expectedBootstrap}`);
    if (!copyPrompt.includes('Then read .buildprint/next-agent.md and continue.')) fail(slug, 'executable packet copyPrompt must route through .buildprint/next-agent.md after bootstrap');
    if (!copyPrompt.includes('Do not write Buildprint snapshots manually.')) fail(slug, 'executable packet copyPrompt must forbid manual snapshot writing');
    const firstBootstrap = copyPrompt.indexOf('First bootstrap exact snapshots:');
    const firstBuildprintRead = copyPrompt.indexOf('BUILDPRINT.md');
    if (firstBootstrap < 0 || firstBuildprintRead < 0 || firstBootstrap > firstBuildprintRead) {
      fail(slug, 'executable packet copyPrompt must bootstrap exact snapshots before naming packet files/read order');
    }
    for (const file of executableReadOrder) {
      if (!fileSet.has(file)) fail(slug, `executable packet missing ${file}`);
      if (!copyPrompt.includes(file)) fail(slug, `executable packet copyPrompt must mention ${file}`);
    }
  }
}

if (failures) {
  console.error(`\nPublication check failed: ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Publication check passed: ${packageSlugs().length} Buildprint publication record(s).`);
