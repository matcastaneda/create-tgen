import { cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  dts: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
  entryPoints: ['src/index.ts'],
  splitting: true,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
  async onSuccess() {
    await cp(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'src/templates'),
      path.join('dist', 'templates'),
      { recursive: true }
    );
  },
});
