import { defineConfig, moduleTools } from '@modern-js/module-tools';
import { getComponentStyle } from '../../features/core/static';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV !== 'dev';

export default defineConfig({
  plugins: [moduleTools()],
  buildPreset: ({ extendPreset }) => {
    return extendPreset('npm-library-with-umd', {
      minify: isProd ? 'terser' : false,
      sourceMap: isProd ? false : 'external',
      target: 'es5',
      define: {
        COMPONENT_STYLE: getComponentStyle(),
      },
    });
  },
});
