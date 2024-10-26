import { logger } from '@/utils/logger';

/**
 * Handle an error and log the error message.
 * @param error The error to handle.
 */
export function handleError(error: unknown) {
  if (typeof error === 'string') {
    logger.error(error);
    logger.break();
    process.exit(1);
  }

  if (error instanceof Error) {
    logger.error(error.message);
    logger.break();
    process.exit(1);
  }

  logger.error('Something went wrong. Please try again.');
  logger.break();
  process.exit(1);
}
