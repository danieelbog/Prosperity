import type { App } from 'vue/dist/vue.mjs';
import { type Preview, setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { i18n } from '@/app/plugins/i18n';
import router from '@/app/router';

import '@/assets/index.scss';

setup((app: App) => {
    app.use(createPinia());
    app.use(router);
    app.use(i18n);
});

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
