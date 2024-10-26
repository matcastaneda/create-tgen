import { execa } from 'execa';
import validateName from 'validate-npm-package-name';

import { colorText } from '@/utils/color-text';
import { logger } from '@/utils/logger';
import type { ProjectConfig } from '@/utils/schemas';

type PackageManagerLinks = Record<
  Exclude<ProjectConfig['packageManager'], undefined>,
  { command: string; link: string }
>;
type ValidNameResult = { isValid: true } | { isValid: false; errors: string[] };

export const packageManagerLinks: PackageManagerLinks = {
  pnpm: {
    command: 'pnpm --version',
    link: 'https://pnpm.io/installation',
  },
  yarn: {
    command: 'yarn --version',
    link: 'https://yarnpkg.com/getting-started/install',
  },
  npm: {
    command: 'npm --version',
    link: 'https://nodejs.org/en/download/',
  },
  bun: {
    command: 'bun --version',
    link: 'https://bun.sh/docs/installation',
  },
};

/**
 * Ensure that the package manager is installed.
 * @param manager The package manager to check for.
 * @returns A promise that resolves when the package manager is installed.
 */
export async function ensurePackageManager(
  manager?: ProjectConfig['packageManager']
) {
  if (!manager) return;

  const { command, link } = packageManagerLinks[manager];

  try {
    await execa(command, { stdio: 'ignore' });
  } catch (error) {
    logger.break();

    logger.error(`  It looks like ${colorText(manager)} is not installed`);
    logger.error(`  Please make sure to install it before continuing.`);

    logger.break();

    logger.error(`  For more information on how to install`);
    logger.error(`  Visit ${colorText(link)} to get started.`);

    logger.break();
    process.exit(1);
  }
}

/**
 * Validate a project name.
 * @param name The name to validate.
 * @returns An object indicating whether the name is valid.
 */
export function validateProjectName(name: string): ValidNameResult {
  const validation = validateName(name);

  if (validation.validForNewPackages && validation.validForOldPackages) {
    return { isValid: true };
  }

  return {
    isValid: false,
    errors: [...(validation.errors || []), ...(validation.warnings || [])],
  };
}

/**
 * Check if the result is an error.
 * @param result The result to check.
 * @returns A boolean indicating whether the result is an error.
 */
export function checkForErrors(
  result: ValidNameResult
): result is { isValid: false; errors: string[] } {
  return !result.isValid;
}
