import '@/assets/index.scss';
import 'vuetify/styles';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { i18n } from '@/app/plugins/i18n';

import App from './App.vue';
import router from '@/app/router';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
});

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount('#app');
