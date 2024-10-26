import ora, { type Options } from 'ora';

/**
 * Create a new spinner instance.
 * @param text The text to display.
 * @param options The options for the spinner.
 */
export function spinner(
  text: Options['text'],
  options?: {
    silent?: boolean;
  }
) {
  return ora({
    text,
    isSilent: options?.silent,
  });
}
