import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "./local-preset.js",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
