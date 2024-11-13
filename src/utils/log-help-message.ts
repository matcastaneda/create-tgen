import { colorText } from '@/utils/color-text';
import { displayTemplates } from '@/utils/get-template-config';

/**
 * Log the help message for the `init` command.
 * @returns The help message.
 */
export function logHelpMessage() {
  const availableTemplates = displayTemplates();

  return `
Templates:
  ${
    !availableTemplates?.length
      ? colorText(
          'Templates are currently under construction. Please check back soon!',
          'yellow'
        )
      : availableTemplates
          ?.map((template) => {
            const templateText = `- ${template.name}`;
            return !template.available
              ? `${colorText(templateText, 'gray')} ${colorText('(soon)', 'yellow')}`
              : colorText(templateText, 'cyan');
          })
          .join('\n  ')
  }
`;
}
