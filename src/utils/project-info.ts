import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { PackageJson } from 'type-fest';

import { logger } from '@/utils/logger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

/**
 * Extracts the name and version from a user agent string.
 *
 * @param userAgent - The user agent string to parse. If not provided, the function returns `undefined`.
 * @returns An object containing the `name` and `version` extracted from the user agent string, or `undefined` if no user agent string is provided.
 */
export function getUserAgentInfo(userAgent?: string) {
  if (!userAgent) return undefined;
  const [name, version] = userAgent.split(' ')[0]?.split('/') ?? [];
  return { name, version };
}

/**
 * Asynchronously retrieves and parses the package.json file.
 *
 * @returns {Promise<PackageJson | null>} A promise that resolves to the parsed package.json object,
 * or null if the file could not be read or parsed.
 *
 * @throws Will log an error message if reading or parsing the package.json file fails.
 */
export async function getPackageInfo(): Promise<PackageJson | null> {
  try {
    const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
    return JSON.parse(packageJson) as PackageJson;
  } catch (error) {
    logger.error('Failed to read package.json');
    return null;
  }
}
