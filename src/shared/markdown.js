export function hasHeading(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^#{1,6}\\s+${escaped}\\s*$`, 'im').test(text);
}

export function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

export function lineHasUnsafeSecretCopy(line) {
  if (/(do not|don't|never|must not|forbid|forbidden|excluded|without|no\s+|avoid|prohibit)/i.test(line)) return false;
  return /(may|can|should|must|will|allowed to|ok to).{0,24}(copy|include|paste|store|commit).{0,24}(secret|token|private key|credential|\.env value|customer data)/i.test(line)
    || /(copy|include|paste|store|commit).{0,24}(secret value|token value|private key value|credential value|\.env value|customer data)/i.test(line);
}

export function backtickFileRefs(text) {
  const refs = new Set();
  for (const match of text.matchAll(/`([^`]+\.(?:md|yaml|yml|json|xml))`/gi)) {
    const value = match[1].trim();
    if (!value.includes('*') && !value.startsWith('http')) refs.add(value);
  }
  return [...refs];
}
