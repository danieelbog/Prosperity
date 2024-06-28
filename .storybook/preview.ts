import type { App } from 'vue/dist/vue.mjs';
import { type Preview, setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { i18n } from '@/app/plugins/i18n';
import router from '@/app/router';
import { createVuetify } from 'vuetify';
import { aliases, md } from 'vuetify/iconsets/md';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@/assets/index.scss';
import 'vuetify/styles';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
    theme: {
        defaultTheme: 'dark',
    },
});

setup((app: App) => {
    app.use(createPinia());
    app.use(router);
    app.use(vuetify);
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
