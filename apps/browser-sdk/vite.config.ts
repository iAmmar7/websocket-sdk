import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@websocket/browser-sdk',
      formats: ['es', 'cjs'],
      fileName: (ext) => `index.${ext}.js`,
    },
  },
  plugins: [dts()],
});
