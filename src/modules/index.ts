import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'dashboard',
        meta: {
            pageTitle: 'Prosperity | Dashboard',
        },
        component: () => import('./dashboard/DashboardView.vue'),
    },
];
