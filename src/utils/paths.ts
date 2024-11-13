import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const templatesDir = path.join(__dirname, 'templates');
export const packageJsonDir = path.join(__dirname, 'package.json');
