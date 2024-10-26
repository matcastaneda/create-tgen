import path from 'path';
import { execa } from 'execa';

import { colorText } from '@/utils/color-text';
import { handleError } from '@/utils/handle-error';
import { logger } from '@/utils/logger';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';

/**
 * Install dependencies for the project.
 * @param cwd The current working directory.
 * @param config The project configuration.
 * @param isOnline Whether the system is online or offline.
 */
export async function installDependencies(
  cwd: string,
  config: ProjectConfig,
  isOnline: boolean
) {
  const args: string[] = ['install'];
  const offlineMessage = !isOnline ? ' (offline mode)' : '';

  const installSpinner = spinner(
    `${colorText(` Installing dependencies${offlineMessage}...`, 'gray')}`
  ).start();

  if (!config?.packageManager) {
    installSpinner.fail(`${colorText(' Package manager not found', 'red')}`);
    return;
  }

  if (!isOnline) {
    args.push('--offline');
  }

  try {
    const destination = path.join(cwd, config.name);
    const packageManager = config.packageManager;

    await execa(packageManager, args, {
      cwd: destination,
      stdio: 'pipe',
    });

    installSpinner.succeed(
      `${colorText(` Dependencies installed successfully.${offlineMessage}`, 'green')}`
    );
  } catch (error) {
    installSpinner.fail(
      `${colorText(' Dependency installation failed', 'red')}`
    );

    logger.break();
    logger.error(`   Please try to install the dependencies manually.`);
    logger.error(
      `   Run ${colorText(`${config.packageManager} install`, 'yellow')} inside the project directory.`
    );

    logger.break();
    handleError(error);
  }
}
