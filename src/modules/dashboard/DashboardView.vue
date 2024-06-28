<template>
    <ListWithFilterWrapper :isLoading="!assetTypes || !amenities || !assets || !headers || !meta">
        <template #filter>
            <div v-if="assetTypes && amenities" class="me-6">
                <AssetFilter
                    :asset-types="assetTypes"
                    :amenities="amenities"
                    @on-filter-change="onFilterChange" />
            </div>
        </template>
        <template #list>
            <div v-if="assets && headers && meta">
                <AssetsList
                    :assets="assets"
                    :meta="meta"
                    :headers="headers"
                    :state="state"
                    :sort-by="sortBy"
                    @on-page-change="onPageChange"
                    @on-fetch-items="fetchAssets"
                    @on-sort-change="onSortChange">
                    <template #actions-cell="{ item }">
                        <v-icon class="me-2" @click="showEditDialog(item)">edit</v-icon>
                    </template>
                </AssetsList>
            </div>
        </template>
        <template #dialog>
            <div v-if="assetToEdit">
                <AssetEditDialog
                    :show-edit-dialog="editDialogIsVisible"
                    :asset="assetToEdit"
                    @hide-edit-dialog="hideEditDialog" />
            </div>
        </template>
    </ListWithFilterWrapper>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAssetsStore } from './stores/asset/asset_store';
import { useAmenitiesStore } from './stores/amenity/amenity_store';
import { useAssetTypesStore } from './stores/asset-type/asset_type_store';
import { useFeedbackStore } from '../app/stores/feedback-store/feedback_store';
import type { IEntityFilter } from './contracts/IEntityFilter';
import type { IPagination } from './contracts/IPagination';
import type { IAssetItem } from './contracts/IAsset';
import type { ISort } from './contracts/ISort';

import ListWithFilterWrapper from '@/components/layouts/wrappers/ListWithFilterWrapper.vue';
import AssetEditDialog from './components/edit/AssetEditDialog.vue';
import AssetFilter from './components/filter/AssetFilter.vue';
import AssetsList from './components/list/AssetsList.vue';

const { fetchAssets } = useAssetsStore();
const { fetchAmenities } = useAmenitiesStore();
const { fetchAssetTypes } = useAssetTypesStore();
const { showFeedback } = useFeedbackStore();
const { assets, meta, state } = storeToRefs(useAssetsStore());
const { amenities } = storeToRefs(useAmenitiesStore());
const { assetTypes } = storeToRefs(useAssetTypesStore());

const filters = ref<IEntityFilter>({});
const sortBy = ref<ISort[]>([]);
const pagination = ref<IPagination>({
    itemsPerPage: 30,
    page: 1,
});
const headers = computed(() => [
    { title: 'Title', key: 'title', sortable: false },
    { title: 'Type', key: 'type.name', sortable: false },
    { title: 'Size', key: 'size' },
    { title: 'Address', key: 'address', sortable: false },
    { title: 'Description', key: 'description', sortable: false },
    { title: 'Created', key: 'created_at', width: 130 },
    { title: 'Updated', key: 'updated_at', width: 130, sortable: false },
    { title: 'Actions', key: 'actions', width: 10, sortable: false },
]);

const assetToEdit = ref<IAssetItem | null>(null);
const editDialogIsVisible = ref(false);

const onPageChange = async (page: number) => {
    pagination.value.page = page;
    await fetchAssets(pagination.value, filters.value, sortBy.value);
};

const onFilterChange = async (newFilters: IEntityFilter) => {
    pagination.value.page = 1;
    filters.value = newFilters;
    await fetchAssets(pagination.value, filters.value, sortBy.value);
};

const onSortChange = async (newSortBy: ISort[]) => {
    pagination.value.page = 1;
    sortBy.value = newSortBy;
    await fetchAssets(pagination.value, filters.value, sortBy.value);
};

const showEditDialog = (asset: IAssetItem) => {
    assetToEdit.value = asset;
    editDialogIsVisible.value = true;
};

const hideEditDialog = () => {
    assetToEdit.value = null;
    editDialogIsVisible.value = false;
};

const loadInitialData = async () => {
    try {
        await Promise.all([
            fetchAssets(pagination.value, filters.value),
            fetchAmenities(),
            fetchAssetTypes(),
        ]);
    } catch (error) {
        showFeedback('Error loading Initial data, contact your administrator!', 'red');
    }
};

onBeforeMount(loadInitialData);
</script>
