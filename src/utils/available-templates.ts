import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

interface Template {
  name: string;
  key: string;
  available: boolean;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, 'templates');
const TEMPLATE_CONFIG_FILE = 'template-config.json';

function getAvailableTemplates(): Template[] {
  const templates: Template[] = [];

  const templateFolders = fs.readdirSync(templatesDir);

  templateFolders.forEach((templateFolder) => {
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
  });

  return templates;
}

export function displayTemplates(): Template[] {
  const templates = getAvailableTemplates();

  return templates.map((template) => {
    return {
      name: template.name,
      key: template.key,
      available: template.available,
    };
  });
}
