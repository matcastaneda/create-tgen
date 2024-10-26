#!/usr/bin/env node
import { Command } from 'commander';

import { init } from '@/commands/init';
import { getPackageInfo } from '@/utils/get-project-info';
import { logHelpMessage } from '@/utils/log-help-message';

const handleSigTerm = () => process.exit(0);

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name(packageInfo?.name || 'create-tgen')
    .description(packageInfo?.description || '')
    .version(
      packageInfo?.version || '0.1.0',
      '-v, --version',
      'output the current version'
    )
    .addHelpText('after', logHelpMessage());

  program.addCommand(init);
  program.parse();
}

main();
