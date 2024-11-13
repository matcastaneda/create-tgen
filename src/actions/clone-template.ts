import { cp, rm } from 'fs/promises';
import path from 'path';

import { colorText } from '@/utils/color-text';
import { TEMPLATE_CONFIG_FILE } from '@/utils/constants';
import { handleError } from '@/utils/handle-error';
import { logger } from '@/utils/logger';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';
import { getTemplatePath } from '@/utils/template-config';

export async function cloneTemplate(cwd: string, config: ProjectConfig) {
  const cloneSpinner = spinner(
    `${colorText(' Cloning template...', 'gray')}`
  ).start();

  const templatePath = getTemplatePath(config.template);
  const destination = path.join(cwd, config.name);
  const configFilePath = path.join(destination, TEMPLATE_CONFIG_FILE);

  try {
    await cp(templatePath, destination, { recursive: true });
    await rm(configFilePath);
    cloneSpinner.succeed(
      `${colorText(' Template cloned successfully.', 'green')}`
    );
  } catch (error) {
    cloneSpinner.fail(
      `${colorText(' Template cloning failed. Please try again.', 'red')}`
    );
    logger.break();
    handleError(error);
  }
}
