import { colorText } from '@/utils/color-text';
import { getTemplateNames } from '@/utils/get-template-config';

/**
 * Log the help message for the `init` command.
 * @returns The help message.
 */
export function logHelpMessage() {
  const templates = getTemplateNames();
  return `
Templates:
  ${templates?.map((template) => colorText(`- ${template}`, 'cyan')).join('\n  ')}
`;
}
