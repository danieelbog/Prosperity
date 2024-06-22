<template>
    <v-data-table-server
        :height="gridHeight"
        :items-per-page="pagination.itemsPerPage"
        :page="pagination.page"
        :headers="headers"
        :items="assets"
        :items-length="totalItems"
        :loading="loading"
        @update:options="fetchAssets">
        <template v-slot:item.address="{ item }">
            <span>
                {{ item.street }}
            </span>
            <span class="mx-2"> {{ item.street_number }} </span>
            <span>
                {{ item.postal_code }}
            </span>
        </template>
        <template v-slot:item.created_at="{ item }">
            <span>
                {{ $d(item.available_from) }}
            </span>
        </template>
        <template v-slot:item.updated_at="{ item }">
            <span>
                {{ $d(item.updated_at) }}
            </span>
        </template>
        <template v-slot:bottom>
            <div class="d-flex flex-row-reverse mt-2">
                <div class="w-25">
                    <v-pagination
                        :model-value="currentPage"
                        @update:modelValue="onPageChange"
                        :length="pageCount">
                    </v-pagination>
                </div>
            </div>
        </template>
    </v-data-table-server>
</template>

<script setup lang="ts">
import type { IPagination } from '@/contracts/IPagination';
import { useAssetsStore } from '@/stores/asset/asset_store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const { fetchAssets } = useAssetsStore();
const { assets, meta, state } = storeToRefs(useAssetsStore());
const pageCount = computed(() => meta.value?.last_page);
const currentPage = computed(() => meta.value?.current_page);
const totalItems = computed(() => meta.value?.total ?? 0);
const loading = computed(() => state.value === 'LOADING');
const gridHeight = 920;
const headers = computed(() => [
    {
        title: 'Title',
        key: 'title',
    },
    {
        title: 'Type',
        key: 'type.name',
    },
    {
        title: 'Size',
        key: 'size',
    },
    {
        title: 'Address',
        key: 'address',
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Created',
        key: 'created_at',
    },
    {
        title: 'Updated',
        key: 'updated_at',
    },
]);
const pagination = ref<IPagination>({
    itemsPerPage: 30,
    page: 1,
});

const onPageChange = (event: number) => {
    pagination.value.page = event;
    fetchAssets(pagination.value);
};
</script>
