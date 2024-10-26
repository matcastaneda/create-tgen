import { cp } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  target: 'esnext',
  outDir: 'dist',
  entryPoints: ['src/index.ts'],
  minify: true,
  splitting: true,
  treeshake: true,
  dts: true,
  clean: true,
  sourcemap: true,
  async onSuccess() {
    await cp(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'src/templates'),
      path.join('dist', 'templates'),
      { recursive: true }
    );
  },
});
