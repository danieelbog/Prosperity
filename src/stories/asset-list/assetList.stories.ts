import AssetsList from '@/modules/dashboard/components/list/AssetsList.vue';
import { formatDate } from '@/utils/formatters/dateFormat';
import type { IAssetItem } from '@/modules/dashboard/contracts/IAsset';
import type { Meta, StoryObj } from '@storybook/vue3';
import ListWithFilterWrapper from '@/components/layouts/wrappers/ListWithFilterWrapper.vue';

const meta: Meta<typeof AssetsList> = {
    title: 'Lists',
    component: AssetsList,
    args: {
        assets: [
            {
                uuid: 'b325f07b-87a8-475f-8ac9-dead44d47164',
                amenities: [
                    'Air Conditioning',
                    'Balcony',
                    'Refrigerator',
                    'Nespresso',
                    'Hair Dryer',
                ],
                bathrooms: 1,
                bedrooms: 2,
                description: 'test tes',
                floor: 0,
                latitude: undefined,
                longitude: undefined,
                postal_code: '50100',
                price: '2970000.0000',
                size: 90,
                street: 'test',
                street_number: '6',
                title: 'my edited title',
                type: {
                    uuid: 'ff28d0d0-1e62-47d8-b1cb-f96b538d86e5',
                    name: 'Detached House',
                },
                available_from: new Date('2023-01-12T14:51:07.000Z'),
                created_at: new Date('2022-02-07T19:41:32.000Z'),
                updated_at: new Date('2024-06-26T14:51:07.000Z'),
            },
            {
                uuid: 'e412f07b-87a8-475f-8ac9-dead44d47165',
                amenities: ['Wi-Fi', 'Gym', 'Swimming Pool', 'Microwave', 'Washer'],
                bathrooms: 2,
                bedrooms: 3,
                description: 'Modern apartment in city center',
                floor: 3,
                latitude: undefined,
                longitude: undefined,
                postal_code: '60200',
                price: '3500000.0000',
                size: 120,
                street: 'central',
                street_number: '15',
                title: 'Luxurious Apartment',
                type: {
                    uuid: 'bb28d0d0-1e62-47d8-b1cb-f96b538d86e6',
                    name: 'Apartment',
                },
                available_from: new Date('2023-05-10T14:51:07.000Z'),
                created_at: new Date('2022-06-10T19:41:32.000Z'),
                updated_at: new Date('2024-07-01T14:51:07.000Z'),
            },
            {
                uuid: 'd325f07b-87a8-475f-8ac9-dead44d47166',
                amenities: ['Garage', 'Garden', 'Fireplace', 'Dishwasher', 'Security System'],
                bathrooms: 3,
                bedrooms: 4,
                description: 'Spacious family house with garden',
                floor: 1,
                latitude: undefined,
                longitude: undefined,
                postal_code: '50300',
                price: '5000000.0000',
                size: 200,
                street: 'suburb',
                street_number: '21',
                title: 'Family House',
                type: {
                    uuid: 'cc28d0d0-1e62-47d8-b1cb-f96b538d86e7',
                    name: 'House',
                },
                available_from: new Date('2023-08-20T14:51:07.000Z'),
                created_at: new Date('2022-08-20T19:41:32.000Z'),
                updated_at: new Date('2024-07-01T14:51:07.000Z'),
            },
            {
                uuid: 'f425f07b-87a8-475f-8ac9-dead44d47167',
                amenities: ['Elevator', 'Concierge', 'Roof Terrace', 'Sauna', 'Jacuzzi'],
                bathrooms: 2,
                bedrooms: 2,
                description: 'Luxury penthouse with city views',
                floor: 12,
                latitude: undefined,
                longitude: undefined,
                postal_code: '60400',
                price: '10000000.0000',
                size: 150,
                street: 'skyline',
                street_number: '50',
                title: 'Penthouse',
                type: {
                    uuid: 'dd28d0d0-1e62-47d8-b1cb-f96b538d86e8',
                    name: 'Penthouse',
                },
                available_from: new Date('2023-11-15T14:51:07.000Z'),
                created_at: new Date('2022-10-15T19:41:32.000Z'),
                updated_at: new Date('2024-07-01T14:51:07.000Z'),
            },
            {
                uuid: 'g625f07b-87a8-475f-8ac9-dead44d47168',
                amenities: ['Playground', 'Park View', 'BBQ Area', 'Home Office', 'Solar Panels'],
                bathrooms: 2,
                bedrooms: 3,
                description: 'Eco-friendly home in quiet area',
                floor: 2,
                latitude: undefined,
                longitude: undefined,
                postal_code: '60500',
                price: '4500000.0000',
                size: 140,
                street: 'green',
                street_number: '8',
                title: 'Eco Home',
                type: {
                    uuid: 'ee28d0d0-1e62-47d8-b1cb-f96b538d86e9',
                    name: 'Eco House',
                },
                available_from: new Date('2023-12-01T14:51:07.000Z'),
                created_at: new Date('2022-12-01T19:41:32.000Z'),
                updated_at: new Date('2024-07-01T14:51:07.000Z'),
            },
        ],
        meta: {
            current_page: 1,
            last_page: 10,
            per_page: 10,
            total: 500,
            path: 'A path',
            to: 2,
            links: [],
            from: 1,
        },
        headers: [
            { title: 'Title', key: 'title', sortable: false },
            { title: 'Type', key: 'type.name', sortable: false },
            { title: 'Size', key: 'size' },
            { title: 'Address', key: 'address', sortable: false },
            { title: 'Description', key: 'description', sortable: false },
            { title: 'Created', key: 'created_at', width: 130 },
            { title: 'Updated', key: 'updated_at', width: 130, sortable: false },
            { title: 'Actions', key: 'actions', width: 10, sortable: false },
        ],
        state: 'COMPLETED',
        sortBy: [],
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { AssetsList, ListWithFilterWrapper },
        setup() {
            return { args, formatDate };
        },
        template: `
        <ListWithFilterWrapper :isLoading='false'>
            <template #list>
                <AssetsList 
                    v-bind="args"
                    @on-page-change="onPageChange"
                    @on-fetch-items="onFetchItems"
                    @on-sort-change="onSortChange">
                    <template #actions-cell="{ item }">
                        <v-icon class="me-2" @click="showEditDialog(item)">edit</v-icon>
                    </template>
                </AssetsList>
            </template>
        </ListWithFilterWrapper>
        `,
        methods: {
            onPageChange() {
                alert('This will change the page');
            },
            onFetchItems() {
                alert('This will fetch more items');
            },
            onSortChange() {
                alert('This will sort the items');
            },
            showEditDialog(item: IAssetItem) {
                alert(`This will show the edit dialog for asset with id: ${item.uuid}`);
            },
        },
    }),
};
