import { type StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        '@storybook/addon-coverage',
    ],
    build: {
        test: {
            disabledAddons: ['@storybook/addon-docs', '@storybook/addon-essentials/docs'],
        },
    },
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
