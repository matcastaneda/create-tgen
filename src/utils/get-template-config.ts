import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { colorText } from '@/utils/color-text';
import { handleError } from '@/utils/handle-error';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Get the names of the available templates.
 * @returns An array of template names.
 */
export function getTemplateNames() {
  const templateDir = path.resolve(__dirname, '../dist/templates');

  try {
    const templates = fs.readdirSync(templateDir);

    return templates.length
      ? templates
      : [
          colorText(
            'Templates are currently under construction. Please check back soon!',
            'yellow'
          ),
        ];
  } catch (error) {
    handleError(error);
  }
}

/**
 * Get the configuration for a specific template.
 * @param templateName The name of the template to get the configuration for.
 */
export function getTemplateConfig(templateName: string) {
  const templateDir = path.resolve(
    __dirname,
    '../dist/templates',
    templateName
  );

  return templateDir;
}
