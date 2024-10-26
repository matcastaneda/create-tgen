import { access, constants } from 'fs/promises';
import path from 'path';

import { colorText } from '@/utils/color-text';
import { getTemplateConfig } from '@/utils/get-template-config';
import { logger } from '@/utils/logger';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';

export async function checkDestinations(cwd: string, config: ProjectConfig) {
  const check = spinner(`${colorText(' Checking destinations...', 'gray')}`);

  const templatePath = getTemplateConfig(config.template);
  const destination = path.join(cwd, config.name);

  try {
    const templateExists = await checkAccess(templatePath, constants.R_OK);

    if (!templateExists) {
      check.fail(
        `${colorText(' Template not found. Please try again.', 'red')}`
      );
      logger.break();
      process.exit(1);
    }

    const destinationExists = await checkAccess(destination, constants.W_OK);

    if (destinationExists) {
      check.fail(
        `${colorText(' Destination already exists. Please try again.', 'red')}`
      );
      logger.break();
      process.exit(1);
    }

    check.succeed(`${colorText(' Destinations checked.', 'green')}`);
  } catch (error) {
    check.fail(
      `${colorText(' Error checking destinations. Please try again.', 'red')}`
    );
    logger.break();
    process.exit(1);
  }
}

async function checkAccess(cwd: string, mode: number) {
  try {
    await access(cwd, mode);
    return true;
  } catch (error: any) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}
