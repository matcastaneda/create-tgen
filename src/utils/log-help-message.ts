import { availableTemplates } from '@/utils/available-templates';
import { colorText } from '@/utils/color-text';

/**
 * Log the help message for the `init` command.
 * @returns The help message.
 */
export function logHelpMessage() {
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
            const templateText = `- ${template.title}`;
            return template.disabled
              ? `${colorText(templateText, 'gray')} ${colorText('(soon)', 'yellow')}`
              : colorText(templateText, 'cyan');
          })
          .join('\n  ')
  }
`;
}
