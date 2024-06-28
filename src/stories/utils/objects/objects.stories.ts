import type { Meta, StoryObj } from '@storybook/vue3';
import { testObjectComparer, testObjectIsDate, testObjectNormalizer } from './objects.tests';

const meta: Meta = {
    title: 'Utils/objects',
    render: (args: any) => ({
        setup() {
            return { args };
        },
        template: '<h1>Objects comparer and Normalizer tests</h1>',
    }),
    play: async ({ step }) => {
        await testObjectComparer(step);
        await testObjectNormalizer(step);
        await testObjectIsDate(step);
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
    args: {},
};
