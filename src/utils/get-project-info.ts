import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { PackageJson } from 'type-fest';

import { logger } from '@/utils/logger';

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
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const packageJsonPath = path.join(__dirname, '..', 'package.json');

  try {
    const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
    return JSON.parse(packageJson) as PackageJson;
  } catch (error) {
    logger.error('  Failed to read package.json');
    return null;
  }
}
