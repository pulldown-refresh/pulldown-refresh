import type { CliPlugin, ModuleTools } from '@modern-js/module-tools';

const cssAsAssetsPlugin: () => CliPlugin<ModuleTools> = () => ({
  name: 'css-as-assets-plugin',
  setup() {
    return {
      beforeBuild: options => {
        console.log(options);
      },
    };
  },
});

export default cssAsAssetsPlugin;
