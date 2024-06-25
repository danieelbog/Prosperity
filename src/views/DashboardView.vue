<template>
    <div class="d-flex justify-center my-6 mx-6">
        <div class="me-6">
            <AssetFilter />
        </div>
        <div v-if="assets && headers && meta">
            <ItemsListWithActions
                :items="assets"
                :meta="meta"
                :headers="headers"
                :state="state"
                @on-page-change="onPageChange"
                @on-fetch-items="fetchAssets">
                <template #actions-cell="{ item }">
                    <v-icon class="me-2" @click="showEditDialog(item)">edit</v-icon>
                </template>
            </ItemsListWithActions>
        </div>
    </div>
    <div v-if="assetToEdit">
        <EditAssetDialog
            :show-edit-dialog="editDialogIsVisible"
            :asset="assetToEdit"
            @hide-edit-dialog="hideEditDialog" />
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAssetsStore } from '@/stores/asset/asset_store';
import type { IPagination } from '@/contracts/IPagination';
import type { IAssetItem } from '@/contracts/IAsset';
import EditAssetDialog from '@/components/dialogs/EditAssetDialog.vue';
import AssetFilter from '@/components/asset-filter/AssetFilter.vue';
import ItemsListWithActions from '@/components/items-list/ItemsListWithActions.vue';

const { fetchAssets } = useAssetsStore();
const { assets, meta, state } = storeToRefs(useAssetsStore());
const pagination = ref<IPagination>({
    itemsPerPage: 30,
    page: 1,
});

const headers = computed(() => [
    { title: 'Title', key: 'title' },
    { title: 'Type', key: 'type.name' },
    { title: 'Size', key: 'size' },
    { title: 'Address', key: 'address' },
    { title: 'Description', key: 'description' },
    { title: 'Created', key: 'created_at' },
    { title: 'Updated', key: 'updated_at' },
    { title: 'Actions', key: 'actions' },
]);

const onPageChange = (event: number) => {
    pagination.value.page = event;
    fetchAssets(pagination.value);
};

const assetToEdit = ref<IAssetItem | null>(null);
const editDialogIsVisible = ref(false);

const showEditDialog = (asset: IAssetItem) => {
    assetToEdit.value = asset;
    editDialogIsVisible.value = true;
};

const hideEditDialog = () => {
    assetToEdit.value = null;
    editDialogIsVisible.value = false;
};

onBeforeMount(async () => {
    await fetchAssets(pagination.value);
});
</script>
