import { defineConfig, moduleTools } from '@modern-js/module-tools';

const { BUILD_ENV } = process.env;
const isProd = BUILD_ENV !== 'dev';

export default defineConfig({
  plugins: [moduleTools()],
  buildPreset: ({ extendPreset }) => {
    return extendPreset('npm-library-with-umd', {
      minify: isProd ? 'terser' : false,
      sourceMap: isProd ? false : 'external',
      target: 'es5',
    });
  },
});
