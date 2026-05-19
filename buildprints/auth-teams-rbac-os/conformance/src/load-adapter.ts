declare const process: { env: Record<string, string | undefined> };

import type { AuthRbacConformanceAdapter } from './adapter-contract.js';

export async function loadAdapter(): Promise<AuthRbacConformanceAdapter> {
  const adapterPath = process.env.AUTH_RBAC_CONFORMANCE_ADAPTER;
  if (!adapterPath) {
    throw new Error('AUTH_RBAC_CONFORMANCE_ADAPTER is required. Point it at a target-app adapter module that exports default AuthRbacConformanceAdapter.');
  }
  const imported = await import(adapterPath);
  const adapter = imported.default ?? imported.adapter;
  if (!adapter) {
    throw new Error(`No default or named adapter export found in ${adapterPath}`);
  }
  return adapter as AuthRbacConformanceAdapter;
}
