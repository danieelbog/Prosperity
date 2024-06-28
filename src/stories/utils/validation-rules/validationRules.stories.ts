import type { Meta, StoryObj } from '@storybook/vue3';
import { testLatitudeRules, testLongitudeRules, testRequiredField } from './validationRules';

const meta: Meta = {
    title: 'Utils/validation-rules',
    render: (args: any) => ({
        setup() {
            return { args };
        },
        template: '<h1>Validation Rules Tests</h1>',
    }),
    play: async ({ step }) => {
        await testRequiredField(step);
        await testLatitudeRules(step);
        await testLongitudeRules(step);
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
    args: {},
};
