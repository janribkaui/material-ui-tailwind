import { Config, PluginCreator } from 'tailwindcss/types/config';

declare const colorsPlugin: {
  (options: any): {
    handler: PluginCreator;
    config?: Partial<Config>;
  };
  __isOptionsFunction: true;
};

export default colorsPlugin;
