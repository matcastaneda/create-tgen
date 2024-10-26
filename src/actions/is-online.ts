import { lookup } from 'dns/promises';

import type { ProjectConfig } from '@/utils/schemas';

/**
 * Check if the user is online
 * @returns {Promise<boolean>}
 */
export async function getOnline(
  manager: ProjectConfig['packageManager']
): Promise<boolean> {
  const registry =
    manager === 'yarn' ? 'registry.yarnpkg.com' : 'registry.npmjs.org';

  try {
    await lookup(registry);
    return true;
  } catch {
    return false;
  }
}
