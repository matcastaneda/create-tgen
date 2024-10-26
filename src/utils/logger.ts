import { colorText } from '@/utils/color-text';

/**
 * A logger with different log levels.
 */
export const logger = {
  error(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'red'));
  },
  warn(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'yellow'));
  },
  info(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'cyan'));
  },
  success(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'green'));
  },
  normal(...args: unknown[]) {
    console.log(parseArgs(args));
  },
  debug(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'gray'));
  },
  command(...args: unknown[]) {
    console.log(colorText(parseArgs(args), 'magenta'));
  },
  break() {
    console.log('');
  },
};

function parseArgs(args: unknown[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      } else if (arg instanceof Error) {
        return arg.stack || arg.message;
      } else {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
    })
    .join(' ');
}
