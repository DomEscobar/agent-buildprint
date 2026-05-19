export function formatPacketMarkdown(packet) {
  const lines = [];
  lines.push('# Buildprint AI Review Packet');
  lines.push('');
  lines.push('This CLI output is not a quality verdict. It is a local evidence packet and prompt for an AI reviewer.');
  lines.push('');
  lines.push('## Package');
  lines.push('');
  lines.push(`- Slug: ${packet.package.slug}`);
  lines.push(`- Title: ${packet.package.title}`);
  lines.push(`- Path: ${packet.package.path}`);
  lines.push(`- File count: ${packet.package.fileCount}`);
  if (packet.phaseFocus) lines.push(`- Phase focus: ${packet.phaseFocus}`);
  lines.push('');
  lines.push('## Review Protocol');
  lines.push('');
  for (const rule of packet.reviewProtocol) lines.push(`- ${rule}`);
  lines.push('');
  lines.push('## Reviewer Prompt');
  lines.push('');
  lines.push('```txt');
  lines.push(packet.reviewPrompt);
  lines.push('```');
  lines.push('');
  lines.push('## Reading Plan');
  lines.push('');
  listSection(lines, 'Authority/read-order refs', packet.authorityRefs.readOrderRefs);
  if (packet.phaseFocus) listSection(lines, 'Phase focus files', packet.files.phaseFocus);
  listSection(lines, 'Core files', packet.files.core);
  listSection(lines, 'Phase files', packet.files.phases);
  listSection(lines, 'Acceptance files', packet.files.acceptance);
  listSection(lines, 'Prompt files', packet.files.prompts);
  listSection(lines, 'Policy files', packet.files.policies);
  listSection(lines, 'Proof/eval files', packet.files.proofEval);
  lines.push('');
  lines.push('## Deterministic Evidence');
  lines.push('');
  lines.push(`- Canonical start: ${packet.authorityRefs.canonicalStart ?? 'not found'}`);
  lines.push(`- Machine mirror files: ${packet.machineMirror.present.join(', ') || 'none'}`);
  lines.push(`- buildprint.json valid: ${packet.machineMirror.buildprintJson.valid ? 'yes' : 'no'}`);
  if (packet.machineMirror.buildprintJson.error) lines.push(`- buildprint.json error: ${packet.machineMirror.buildprintJson.error}`);
  listSection(lines, 'Machine mirror refs', packet.machineMirror.refs);
  listSection(lines, 'Machine mirror missing refs', packet.machineMirror.missingRefs);
  listSection(lines, 'Markdown referenced files missing from package', packet.authorityRefs.missingReferencedFiles);
  lines.push('');
  lines.push('## finding.schema.json');
  lines.push('');
  lines.push('```json');
  lines.push(JSON.stringify(packet.schemas['finding.schema.json'], null, 2));
  lines.push('```');
  lines.push('');
  lines.push('## loop-gate.schema.json');
  lines.push('');
  lines.push('```json');
  lines.push(JSON.stringify(packet.schemas['loop-gate.schema.json'], null, 2));
  lines.push('```');
  lines.push('');
  lines.push('## phase-plan.schema.json');
  lines.push('');
  lines.push('```json');
  lines.push(JSON.stringify(packet.schemas['phase-plan.schema.json'], null, 2));
  lines.push('```');
  lines.push('');
  lines.push('## review-rubric.yaml');
  lines.push('');
  lines.push('```yaml');
  lines.push(formatYamlValue(packet.schemas['review-rubric.yaml']).trimEnd());
  lines.push('```');
  lines.push('');
  lines.push('## Final Chat Handover Template');
  lines.push('');
  lines.push('```txt');
  lines.push(packet.schemas['final-handover.md']);
  lines.push('```');
  lines.push('');
  lines.push('## Required AI Output');
  lines.push('');
  lines.push('- Product-quality verdict.');
  lines.push('- Implementation-risk verdict.');
  lines.push('- Coding-agent execution risk.');
  lines.push('- Confirmed findings with file evidence.');
  lines.push('- Rejected suspicions with file evidence.');
  lines.push('- Missing rails, schemas, prompts, or acceptance gates.');
  lines.push('- Recommended Loop Gates, or a brief reason why objective looping would add no value.');
  lines.push('- Max-quality readiness phase plan with goals, files likely to change, changes, acceptance gates, proof evidence, claim boundaries, validation evidence, exit criteria, dependencies, and latest safe starting phase.');
  return `${lines.join('\n')}\n`;
}

function listSection(lines, title, items) {
  lines.push(`### ${title}`);
  lines.push('');
  if (!items.length) lines.push('- none');
  else for (const item of items) lines.push(`- ${item}`);
  lines.push('');
}

function formatYamlValue(value, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return `${pad}[]\n`;
    return value.map((item) => `${pad}- ${formatYamlScalarOrNested(item, indent + 2)}`).join('');
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).map(([key, item]) => {
      if (item && typeof item === 'object') return `${pad}${key}:\n${formatYamlValue(item, indent + 2)}`;
      return `${pad}${key}: ${formatYamlScalar(item)}\n`;
    }).join('');
  }
  return `${pad}${formatYamlScalar(value)}\n`;
}

function formatYamlScalarOrNested(value, indent) {
  if (value && typeof value === 'object') return `\n${formatYamlValue(value, indent)}`;
  return `${formatYamlScalar(value)}\n`;
}

function formatYamlScalar(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
}
