import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: '@websocket/utils',
      formats: ['es', 'cjs'],
      fileName: (ext) => `index.${ext}.js`,
    },
  },
});
