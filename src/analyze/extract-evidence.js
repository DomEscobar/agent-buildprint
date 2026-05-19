const FILE_REF_PATTERN = /`([^`]+\.(?:md|yaml|yml|json|xml))`/gi;

export function extractEvidence(pkg, options = {}) {
  const authorityText = pkg.get('BUILDPRINT.md');
  const readOrderRefs = unique(extractFileRefs(authorityText));
  const allMarkdownRefs = unique(pkg.files
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => extractFileRefs(pkg.get(file)).map((ref) => ({ file, ref }))));

  const referencedFiles = unique(allMarkdownRefs.map((entry) => entry.ref));
  const missingReferencedFiles = referencedFiles
    .filter((ref) => !ref.includes('*') && !pkg.has(ref))
    .sort();

  const machineMirror = extractMachineMirror(pkg);
  const phaseFiles = pkg.files.filter((file) => /^plans\/.+\.md$/i.test(file)).sort();
  const phaseFocusFiles = options.phase
    ? phaseFiles.filter((file) => file.toLowerCase().includes(String(options.phase).toLowerCase()))
    : [];

  return {
    authorityRefs: {
      canonicalStart: pkg.has('BUILDPRINT.md') ? 'BUILDPRINT.md' : null,
      readOrderRefs,
      referencedFiles,
      missingReferencedFiles
    },
    machineMirror,
    files: {
      all: pkg.files,
      core: pkg.coreFiles,
      phases: phaseFiles,
      phaseFocus: phaseFocusFiles,
      acceptance: pkg.files.filter((file) => /(^|\/)(acceptance|checks\/acceptance)\.(md|ya?ml|json)$/i.test(file)).sort(),
      prompts: pkg.files.filter((file) => /(^|\/)prompts?\//i.test(file) || /prompt/i.test(file)).sort(),
      policies: pkg.files.filter((file) => /(^|\/)polic(y|ies)\//i.test(file) || /policy/i.test(file)).sort(),
      proofEval: pkg.files.filter((file) => /^(proof|evals|conformance)\//i.test(file) || /eval|proof|conformance/i.test(file)).sort(),
      machine: pkg.files.filter((file) => /^(buildprint|phases|acceptance|claims)\.(json|ya?ml)$/i.test(file)).sort()
    }
  };
}

function extractMachineMirror(pkg) {
  const refs = [];
  const controls = ['buildprint.json', 'phases.yaml', 'phases.yml', 'acceptance.yaml', 'acceptance.yml', 'claims.yaml', 'claims.yml'];
  const present = controls.filter((file) => pkg.has(file));

  if (pkg.buildprintJson?.ok) {
    refs.push(...(pkg.buildprintJson.data.files ?? []).map((file) => typeof file === 'string' ? file : file.path).filter(Boolean));
    refs.push(...(pkg.buildprintJson.data.requiredDetailFiles ?? []).filter(Boolean));
  }

  return {
    present,
    buildprintJson: pkg.buildprintJson
      ? { present: true, valid: pkg.buildprintJson.ok, error: pkg.buildprintJson.error }
      : { present: false, valid: false, error: null },
    refs: unique(refs).sort(),
    missingRefs: unique(refs).filter((ref) => !pkg.has(ref)).sort()
  };
}

function extractFileRefs(text) {
  const refs = [];
  for (const match of text.matchAll(FILE_REF_PATTERN)) {
    const ref = match[1].trim();
    if (!ref.startsWith('http')) refs.push(ref);
  }
  return refs;
}

function unique(items) {
  const normalized = items.map((item) => typeof item === 'string' ? item : `${item.file}\u0000${item.ref}`);
  const seen = new Set();
  const out = [];
  for (let index = 0; index < items.length; index++) {
    if (seen.has(normalized[index])) continue;
    seen.add(normalized[index]);
    out.push(items[index]);
  }
  return out;
}
