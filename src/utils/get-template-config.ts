import fs from 'fs';
import path from 'path';

import { TEMPLATE_CONFIG_FILE } from '@/utils/constants';
import { templatesDir } from '@/utils/paths';

interface Template {
  name: string;
  key: string;
  available: boolean;
}

/**
 * Retrieves the available templates by reading the template configuration files
 * from the specified templates directory.
 *
 * @returns {Template[]} An array of Template objects representing the available templates.
 */
function getAvailableTemplates(): Template[] {
  return fs
    .readdirSync(templatesDir)
    .reduce<Template[]>((templates, templateFolder) => {
      const configPath = path.join(
        templatesDir,
        templateFolder,
        TEMPLATE_CONFIG_FILE
      );

      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(
          fs.readFileSync(configPath, 'utf-8')
        ) as Template;

        templates.push(configData);
      }

      return templates;
    }, []);
}

/**
 * Retrieves and displays the available templates.
 *
 * This function fetches the available templates using the `getAvailableTemplates` function
 * and maps over the result to return an array of template objects containing the `name`,
 * `key`, and `available` properties.
 *
 * @returns {Template[]} An array of template objects with `name`, `key`, and `available` properties.
 */
export function displayTemplates(): Template[] {
  return getAvailableTemplates().map(({ name, key, available }) => ({
    name,
    key,
    available,
  }));
}

/**
 * Retrieves the template configuration for the specified template.
 *
 * @param {string} templateName The name of the template to retrieve the configuration for.
 */
export function getTemplatePath(templateName: string) {
  return path.join(templatesDir, templateName);
}
