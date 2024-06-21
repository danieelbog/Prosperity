<template>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
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
    </v-data-table-server>
</template>

<script setup lang="ts">
import { useAssetsStore } from '@/stores/asset/asset_store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { fetchAssets } = useAssetsStore();
const { assets, meta, state } = storeToRefs(useAssetsStore());

const loading = computed(() => state.value === 'LOADING');
const itemsPerPage = computed(() => meta.value?.per_page ?? 0);
const totalItems = computed(() => meta.value?.total ?? 0);
const headers = computed(() => {
    return [
        {
            title: 'Title',
            // align: 'start',
            // sortable: false,
            key: 'title',
        },
        {
            title: 'Type',
            // align: 'start',
            // sortable: false,
            key: 'type.name',
        },
        {
            title: 'Size',
            // align: 'start',
            // sortable: false,
            key: 'size',
        },
        {
            title: 'Address',
            // align: 'start',
            // sortable: false,
            key: 'address',
        },
        {
            title: 'Description',
            // align: 'start',
            // sortable: false,
            key: 'description',
        },
        {
            title: 'Created',
            // align: 'start',
            // sortable: false,
            key: 'created_at',
        },
        {
            title: 'Updated',
            // align: 'start',
            // sortable: false,
            key: 'updated_at',
        },
    ];
});
</script>
