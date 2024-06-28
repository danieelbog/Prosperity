import type { Meta, StoryObj } from '@storybook/vue3';
import AssetFilter from '@/modules/dashboard/components/filter/AssetFilter.vue';
import ListWithFilterWrapper from '@/components/layouts/wrappers/ListWithFilterWrapper.vue';

const meta: Meta<typeof AssetFilter> = {
    title: 'Filters',
    component: AssetFilter,
    args: {
        amenities: [
            'Elevator',
            'Balcony',
            'Air Conditioning',
            'Microwave',
            'Refrigerator',
            'Dishwasher',
            'Hair Dryer',
            'Iron',
            'WiFi',
            'Nespresso',
        ],
        assetTypes: [
            {
                name: 'Apartment',
                uuid: '510c384b-411f-494a-b0c6-0b0809a7226e',
                value: 1,
            },
            {
                name: 'Detached House',
                uuid: 'ff28d0d0-1e62-47d8-b1cb-f96b538d86e5',
                value: 2,
            },
            {
                name: 'Maisonette',
                uuid: 'd55777a5-6f63-4ddc-a022-5def1fe0cccb',
                value: 3,
            },
            {
                name: 'Parking space',
                uuid: '93c07b30-1e9f-43fa-8f4f-d62e4914d535',
                value: 4,
            },
            {
                name: 'Residential Complex',
                uuid: '6c3483b8-b5d2-48da-9cbe-da52a05dc5ef',
                value: 5,
            },
            {
                name: 'Storage unit',
                uuid: 'dad19575-7601-478b-a4a8-cc5a69933e51',
                value: 6,
            },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
    render: (args) => ({
        components: { AssetFilter, ListWithFilterWrapper },
        setup() {
            return { args };
        },
        template: `
            <ListWithFilterWrapper :isLoading='false'>
                <template #filter>
                    <AssetFilter 
                        v-bind="args" 
                        @on-filter-change="onFilterChange" 
                    />
                </template>        
            </ListWithFilterWrapper>
        `,
        methods: {
            onFilterChange() {
                alert('This will filter the data inside a list');
            },
        },
    }),
};
