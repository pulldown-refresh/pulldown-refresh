import * as path from 'path';
import { defineConfig } from '@modern-js/builder-cli';

export default defineConfig({
  source: {
    entries: {
      index: path.resolve(__dirname, './src/index.ts'),
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  html: {
    template: path.resolve(__dirname, './public/index.html'),
    disableHtmlFolder: true,
  },
  dev: {
    port: 10000,
  },
  output: {
    cssModules: {
      auto: true,
    },
    distPath: {
      html: '',
    },
  },
});
