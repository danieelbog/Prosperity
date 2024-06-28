import type { Meta, StoryObj } from '@storybook/vue3';
import {
    testGetQueryFilterParams,
    testGetQueryPaginationParams,
    testGetQuerySortByParams,
} from './queryParameters.tests';

const meta: Meta = {
    title: 'Utils/query-parameters',
    render: (args: any) => ({
        setup() {
            return { args };
        },
        template: '<h1>Query Parameters Mappers Rules</h1>',
    }),
    play: async ({ step }) => {
        await testGetQueryFilterParams(step);
        await testGetQueryPaginationParams(step);
        await testGetQuerySortByParams(step);
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
    args: {},
};
