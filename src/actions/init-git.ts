import { rmSync } from 'fs';
import path, { join } from 'path';
import { execa } from 'execa';

import { colorText } from '@/utils/color-text';
import type { ProjectConfig } from '@/utils/schemas';
import { spinner } from '@/utils/spinner';

/**
 * Verify if git is installed.
 * @returns A boolean value.
 */
async function verifyGit(): Promise<Boolean> {
  try {
    await execa('git', ['--version'], {
      stdio: 'ignore',
    });
    return true;
  } catch (_) {}
  return false;
}

/**
 * Check if the current directory is a git repository.
 * @param cwd The current working directory.
 * @returns A boolean value.
 */
async function isInitGit(cwd: string): Promise<boolean> {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree'], {
      stdio: 'ignore',
      cwd,
    });
    return true;
  } catch (_) {}
  return false;
}

/**
 * Check if the default branch is set.
 * @param cwd The current working directory.
 * @returns A boolean value.
 */
async function isDefaultBranch(cwd: string): Promise<Boolean> {
  try {
    await execa('git', ['config', 'init.defaultBranch'], {
      stdio: 'ignore',
      cwd,
    });
    return true;
  } catch (_) {}
  return false;
}

/**
 * Initialize git in the project directory.
 * @param cwd The current working directory.
 * @param config The project configuration.
 */
export async function initGit(cwd: string, config: ProjectConfig) {
  const gitSpinner = spinner(
    `${colorText(' Initializing git...', 'gray')}`
  ).start();

  const destination = path.join(cwd, config.name);

  try {
    const isGit = await verifyGit();
    if (!isGit) {
      gitSpinner.fail(`${colorText(' Git is not installed.', 'red')}`);
      return;
    }

    const isGitInit = await isInitGit(destination);
    if (isGitInit) {
      gitSpinner.fail(`${colorText(' Git is already initialized.', 'red')}`);
      return;
    }

    await execa('git', ['init'], {
      stdio: 'ignore',
      cwd: destination,
    });

    const isDefault = await isDefaultBranch(destination);
    if (!isDefault) {
      await execa('git', ['checkout', '-b', 'main'], {
        stdio: 'ignore',
        cwd: destination,
      });
    }

    await execa('git', ['add', '-A'], {
      stdio: 'ignore',
      cwd: destination,
    });
    await execa('git', ['commit', '-m', 'feat: initial commit'], {
      stdio: 'ignore',
      cwd: destination,
    });

    gitSpinner.succeed(`${colorText(' Git initialized.', 'green')}`);
  } catch (error) {
    gitSpinner.fail(`${colorText(' Error initializing git.', 'red')}`);
    rmSync(join(destination, '.git'), { recursive: true, force: true });
  }
}
