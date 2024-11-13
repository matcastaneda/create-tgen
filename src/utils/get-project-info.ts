import fs from 'fs/promises';
import type { PackageJson } from 'type-fest';

import { logger } from '@/utils/logger';
import { packageJsonDir } from '@/utils/paths';

export function getUserAgentInfo(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec?.split('/');
  return {
    name: pkgSpecArr?.[0],
    version: pkgSpecArr?.[1],
  };
}

export async function getPackageInfo() {
  try {
    const packageJson = await fs.readFile(packageJsonDir, 'utf-8');
    return JSON.parse(packageJson) as PackageJson;
  } catch (error) {
    logger.error('  Failed to read package.json');
    return null;
  }
}
