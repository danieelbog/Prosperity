import { type StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    build: {
        test: {
            disabledAddons: ['@storybook/addon-docs', '@storybook/addon-essentials/docs'],
        },
    },
    framework: '@storybook/vue3-vite',
    docs: {
        autodocs: 'tag',
    },
};
export default config;
