import path from 'node:path';
import { exists, relativeFileMap } from '../shared/fs.js';
import { parseJson } from '../shared/json.js';

const CORE_CANDIDATES = [
  'BUILDPRINT.md',
  'README.md',
  'PLAN.md',
  'SPEC.md',
  'CONTRACTS.md',
  'TEST_MATRIX.md',
  'VALIDATION_TEMPLATE.md',
  'checks/acceptance.md'
];

export function loadBuildprintPackage(folder, options = {}) {
  const root = path.resolve(options.cwd ?? process.cwd(), folder);
  if (!exists(root)) throw new Error(`Buildprint folder missing: ${root}`);

  const { files, textByPath } = relativeFileMap(root);
  const fileSet = new Set(files);
  const get = (rel) => textByPath.get(rel) ?? '';
  const has = (rel) => fileSet.has(rel);
  const buildprintJson = has('buildprint.json') ? parseJson(get('buildprint.json'), 'buildprint.json') : null;

  return {
    root,
    slug: buildprintJson?.data?.slug ?? path.basename(root),
    title: buildprintJson?.data?.title ?? firstHeading(get('BUILDPRINT.md')) ?? path.basename(root),
    files,
    fileSet,
    textByPath,
    get,
    has,
    buildprintJson,
    coreFiles: CORE_CANDIDATES.filter(has)
  };
}

function firstHeading(text) {
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}
