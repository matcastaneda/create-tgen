import { logger } from '@/utils/logger';

const enableTerminalCursor = () => {
  process.stdout.write('\x1B[?25h');
  process.stdout.write('\n');
};

/**
 * Handle a prompt interrupt and log a message.
 * @param state The state of the prompt.
 */
export function handlePromptInterrupt(state: {
  value: any;
  aborted: boolean;
  exited: boolean;
}) {
  if (state.aborted) {
    enableTerminalCursor();

    logger.warn('\n✨ No worries! The operation was gracefully cancelled.');
    logger.warn("   Feel free to try again whenever you're ready!");

    process.exit(0);
  }
}
