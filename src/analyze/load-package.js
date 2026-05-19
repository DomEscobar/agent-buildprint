import path from 'node:path';
import { exists, relativeFileMap } from '../shared/fs.js';
import { parseJson } from '../shared/json.js';

const HIGH_VALUE_FILES = [
  'BUILDPRINT.md',
  'README.md',
  'SPEC.md',
  'CONTRACTS.md',
  'PLAN.md',
  'TEST_MATRIX.md',
  'VALIDATION_TEMPLATE.md',
  'checks/acceptance.md',
  'questions.md',
  'PARITY_CLAIMS.md',
  'PRODUCT_QUALITY_BAR.md',
  'HEAD_TO_FOOT_QA.md',
  'BROWSER_QA_SCENARIOS.md',
  'buildprint.json',
  'phases.yaml',
  'acceptance.yaml',
  'claims.yaml'
];

export function loadBuildprintPackage(folder, options = {}) {
  const root = path.resolve(options.cwd ?? process.cwd(), folder);
  if (!exists(root)) {
    throw new Error(`Buildprint folder missing: ${root}`);
  }

  const { files, textByPath } = relativeFileMap(root);
  const fileSet = new Set(files);
  const get = (rel) => textByPath.get(rel) ?? '';
  const has = (rel) => fileSet.has(rel);
  const highValueText = HIGH_VALUE_FILES.map(get).filter(Boolean).join('\n\n');
  const allText = [...textByPath.values()].join('\n\n');
  const buildprintJson = has('buildprint.json') ? parseJson(get('buildprint.json'), 'buildprint.json') : null;
  const title = buildprintJson?.data?.title ?? firstHeading(get('BUILDPRINT.md')) ?? path.basename(root);
  const slug = buildprintJson?.data?.slug ?? path.basename(root);

  return {
    root,
    slug,
    title,
    files,
    fileSet,
    textByPath,
    get,
    has,
    highValueText,
    allText,
    buildprintJson
  };
}

function firstHeading(text) {
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}

