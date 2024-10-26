import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';

import { colorText } from '@/utils/color-text';
import { handleError } from '@/utils/handle-error';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';

export async function customizeTemplate(cwd: string, config: ProjectConfig) {
  const customize = spinner(
    `${colorText(' Customizing template...', 'gray')}`
  ).start();

  const destination = path.join(cwd, config.name);

  try {
    const files = await fg.glob('**/*', {
      cwd: destination,
      dot: true,
      absolute: true,
      stats: false,
    });

    const promises = files.map(async (file) => {
      const data = await fs.readFile(file, 'utf-8');
      const newData = data.replace(/{{name}}/g, config.name);

      if (newData !== data) {
        await fs.writeFile(file, newData, 'utf-8');
      }
    });

    await Promise.all(promises);

    customize.succeed(
      `${colorText(' Template customized successfully.', 'green')}`
    );
  } catch (error) {
    customize.fail(
      `${colorText(' Customization failed. Please try again.', 'red')}`
    );
    handleError(error);
  }
}
