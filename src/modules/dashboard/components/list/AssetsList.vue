<template>
    <v-card class="py-0" elevation="4" :min-height="gridHeight">
        <v-card-text>
            <v-data-table-server
                v-model:sort-by="localSort"
                :height="gridHeight"
                :items-per-page="meta.per_page"
                :page="meta.current_page"
                :headers="headers"
                :items="assets"
                :items-length="totalItems"
                :loading="loading"
                fixed-header>
                <template v-slot:item.address="{ item }">
                    <AddressCell
                        :street="item.street"
                        :street-number="item.street_number"
                        :postal-code="item.postal_code" />
                </template>
                <template v-slot:item.created_at="{ item }">
                    <DateCell :date="item.available_from" />
                </template>
                <template v-slot:item.updated_at="{ item }">
                    <DateCell :date="item.updated_at" />
                </template>
                <template v-slot:bottom>
                    <div class="d-flex flex-row-reverse pt-2">
                        <div class="w-50">
                            <v-pagination
                                :model-value="currentPage"
                                @update:modelValue="onPageChange"
                                :length="pageCount" />
                        </div>
                    </div>
                </template>
                <template v-slot:item.actions="{ item }">
                    <slot name="actions-cell" :item="item"></slot>
                </template>
            </v-data-table-server>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue';
import type { IAssetItem, IAssetMeta } from '../../contracts/IAsset';
import type { ISort } from '../../contracts/ISort';

import AddressCell from '@/components/grid-cells/AddressCell.vue';
import DateCell from '@/components/grid-cells/DateCell.vue';

const emit = defineEmits(['on-page-change', 'on-sort-change']);
const props = defineProps({
    assets: {
        type: Array as PropType<IAssetItem[]>,
        required: true,
    },
    meta: {
        type: Object as PropType<IAssetMeta>,
        required: true,
    },
    headers: {
        type: Array as PropType<any[]>,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    sortBy: {
        type: Array as PropType<ISort[]>,
        required: true,
    },
});
const localSort = ref(props.sortBy);

const pageCount = computed(() => props.meta.last_page);
const currentPage = computed(() => props.meta.current_page);
const totalItems = computed(() => props.meta.total ?? 0);
const loading = computed(() => props.state === 'LOADING');

const gridHeight = 920;

watch(
    localSort,
    async (newLocalSort) => {
        emit('on-sort-change', newLocalSort);
    },
    { deep: true },
);

const onPageChange = (event: number) => {
    emit('on-page-change', event);
};
</script>
