import { existsSync } from 'fs';
import path from 'path';
import { Command } from 'commander';
import prompts from 'prompts';

import { checkDestinations } from '@/actions/check-destinations';
import { cloneTemplate } from '@/actions/clone-template';
import { customizeTemplate } from '@/actions/customize-template';
import { initGit } from '@/actions/init-git';
import { installDependencies } from '@/actions/install-dependencies';
import { getOnline } from '@/actions/is-online';
import { availableTemplates } from '@/utils/available-templates';
import { colorText } from '@/utils/color-text';
import { getUserAgentInfo } from '@/utils/get-project-info';
import { handleError } from '@/utils/handle-error';
import { handlePromptInterrupt } from '@/utils/handle-propmt-interrupt';
import { logger } from '@/utils/logger';
import {
  initOptionsSchema,
  projectConfigSchema,
  type ProjectConfig,
} from '@/utils/schemas';
import {
  checkForErrors,
  ensurePackageManager,
  validateProjectName,
} from '@/utils/validators';

export const init = new Command()
  .name('init')
  .description('Initialize your project with Tgen.')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .action(async (options) => {
    try {
      const argvOptions = initOptionsSchema.parse(options);

      const cwd = path.resolve(argvOptions.cwd);
      const userAgentInfo = getUserAgentInfo(process.env.npm_config_user_agent);
      const currentPackageManager = userAgentInfo ? userAgentInfo.name : 'npm';

      if (!existsSync(cwd)) {
        logger.error(
          `The directory "${cwd}" does not exist. Please try again.`
        );
        logger.break();
        process.exit(1);
      }

      const config = await promptForProjectCofig(cwd);
      await runInit(cwd, config);

      logger.break();
      logger.normal(
        `🚀 ${colorText('Success!', 'green')} Project ${colorText(config.name, 'cyan')} has been initialized.`
      );

      logger.break();
      logger.normal(
        `🛠️ ${colorText('Scaffolding project in', 'gray')} ${colorText(
          `${path.join(cwd, config.name)}`,
          'cyan'
        )}`
      );
      logger.break();
      logger.normal(
        `✨ ${colorText('To get started, run the following commands:', 'gray')}`
      );
      logger.break();

      logger.normal(
        `   ${colorText('>', 'gray')} cd ${colorText(config.name, 'cyan')}`
      );

      if (!config.install) {
        switch (currentPackageManager) {
          case 'yarn':
            logger.normal(`   ${colorText('>', 'gray')} yarn`);
            break;
          default:
            logger.normal(
              `   ${colorText('>', 'gray')} ${config.packageManager ?? currentPackageManager} install`
            );
            break;
        }
      }

      switch (currentPackageManager) {
        case 'yarn':
          logger.normal(`   ${colorText('>', 'gray')} yarn dev`);
          break;
        default:
          logger.normal(
            `   ${colorText('>', 'gray')} ${config.packageManager ?? currentPackageManager} run dev`
          );
          break;
      }

      logger.break();
      logger.normal(
        colorText(
          `🎉 Thank you for using ${colorText('Tgen', 'cyan')}!`,
          'gray'
        )
      );
    } catch (error) {
      handleError(error);
    }
  });

export async function promptForProjectCofig(cwd: string) {
  const baseQuestions: prompts.PromptObject<string>[] = [
    {
      type: 'text',
      name: 'name',
      message: `What is the ${colorText('name', 'cyan')} of your project?`,
      initial: 'tgen-project',
      validate: (name: string) => {
        const validatedName = validateProjectName(name);
        if (checkForErrors(validatedName)) {
          return validatedName.errors[0] || 'Invalid project name';
        }
        return true;
      },
      onState: handlePromptInterrupt,
    },
    {
      type: 'select',
      name: 'template',
      message: `Which ${colorText('template', 'cyan')} do you want to use?`,
      choices: availableTemplates.map((template) => ({
        title: template.title,
        value: template.value,
        disabled: template.disabled,
      })),
      warn: 'This template is not yet implemented.',
      onState: handlePromptInterrupt,
    },
    {
      type: 'toggle',
      name: 'install',
      message: `Do you want to ${colorText('install dependencies', 'cyan')} after creating the project?`,
      active: 'Yes',
      inactive: 'No',
      initial: true,
      onState: handlePromptInterrupt,
    },
  ];

  const options = await prompts(baseQuestions);

  if (options.install) {
    const packageManagerOption = await prompts([
      {
        type: 'select',
        name: 'packageManager',
        message: `Which ${colorText('package manager', 'cyan')} do you want to use?`,
        choices: [
          { title: 'pnpm', value: 'pnpm' },
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'bun', value: 'bun' },
        ],
        onState: handlePromptInterrupt,
      },
    ]);

    options.packageManager = packageManagerOption.packageManager;
  }

  const gitOption = await prompts([
    {
      type: 'toggle',
      name: 'git',
      message: `Do you want to ${colorText('initialize git', 'cyan')}?`,
      active: 'Yes',
      inactive: 'No',
      initial: true,
      onState: handlePromptInterrupt,
    },
  ]);

  options.git = gitOption.git;

  const config = projectConfigSchema.parse(options);

  if (config.install) {
    await ensurePackageManager(config.packageManager);
  }

  return config;
}

export async function runInit(cwd: string, config: ProjectConfig) {
  try {
    logger.break();

    await checkDestinations(cwd, config);
    await cloneTemplate(cwd, config);
    await customizeTemplate(cwd, config);

    if (config.install) {
      const isOnline = await getOnline(config.packageManager);
      await installDependencies(cwd, config, isOnline);
    }

    if (config.git) {
      await initGit(cwd, config);
    }
  } catch (error) {
    handleError(error);
  }
}
