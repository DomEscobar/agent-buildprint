export function formatPacketYaml(packet) {
  return formatYamlValue(packet);
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
