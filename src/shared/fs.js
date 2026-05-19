import fs from 'node:fs';
import path from 'node:path';
import { toPosixPath } from './paths.js';

const DEFAULT_IGNORES = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.astro',
  'coverage',
  '.turbo',
  '.cache',
  '.buildprint'
]);

export function exists(file) {
  return fs.existsSync(file);
}

export function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

export function walkFiles(root, options = {}) {
  const ignored = new Set(options.ignored ?? DEFAULT_IGNORES);
  const maxFiles = options.maxFiles ?? 5000;
  const out = [];

  function visit(current) {
    if (out.length >= maxFiles || !exists(current)) return;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) visit(full);
      else out.push(full);
      if (out.length >= maxFiles) return;
    }
  }

  visit(root);
  return out;
}

export function relativeFileMap(root) {
  const files = walkFiles(root);
  const textByPath = new Map();

  for (const absolute of files) {
    const rel = toPosixPath(path.relative(root, absolute));
    let text = '';
    try {
      const raw = readText(absolute);
      text = raw.includes('\u0000') ? '' : raw;
    } catch {
      text = '';
    }
    textByPath.set(rel, text);
  }

  return { files: [...textByPath.keys()].sort(), textByPath };
}

