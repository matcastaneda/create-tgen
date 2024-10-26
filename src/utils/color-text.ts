import picocolors from 'picocolors';
import type { Colors, Formatter } from 'picocolors/types';

/**
 * Colorize text using picocolors.
 * @param text The text to colorize.
 * @param color The color to use. Defaults to `white`.
 * @returns The colorized text.
 */
export function colorText(
  text: string | number | null | undefined,
  color: keyof Colors = 'white'
) {
  const colorFormatter: Formatter = picocolors[color] as Formatter;
  return colorFormatter ? colorFormatter(text) : text;
}
