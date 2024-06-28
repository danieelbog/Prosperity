import type { Meta, StoryObj } from '@storybook/vue3';
import { testDateFormatter } from './formatters.tests';

const meta: Meta = {
    title: 'Utils/formatters',
    render: (args: any) => ({
        setup() {
            return { args };
        },
        template: '<h1>Date formatter tests</h1>',
    }),
    play: async ({ step }) => {
        await testDateFormatter(step);
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
    args: {},
};
