import { cp } from 'fs/promises';
import path from 'path';

import { colorText } from '@/utils/color-text';
import { getTemplateConfig } from '@/utils/get-template-config';
import { handleError } from '@/utils/handle-error';
import { logger } from '@/utils/logger';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';

export async function cloneTemplate(cwd: string, config: ProjectConfig) {
  const cloneSpinner = spinner(
    `${colorText(' Cloning template...', 'gray')}`
  ).start();

  const templatePath = getTemplateConfig(config.template);
  const destination = path.join(cwd, config.name);

  try {
    await cp(templatePath, destination, { recursive: true });
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
