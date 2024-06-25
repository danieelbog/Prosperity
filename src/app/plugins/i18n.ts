import { formatDate } from '@/utils/formatters/dateFormat';
import type { App } from 'vue';

export const i18n = {
    install(app: App) {
        app.config.globalProperties.$d = (val: Date): string => {
            return formatDate(new Date(val));
        };
    },
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $d(val: Date): string;
    }
}
