import { z } from 'zod';

export const initOptionsSchema = z.object({
  cwd: z.string(),
});

export const projectConfigSchema = z.object({
  name: z.string(),
  template: z.string(),
  git: z.boolean(),
  install: z.boolean(),
  packageManager: z.enum(['npm', 'yarn', 'pnpm', 'bun']).optional(),
});

export type ProjectConfig = z.infer<typeof projectConfigSchema>;
