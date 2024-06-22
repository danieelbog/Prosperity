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
            <AddressCell
                :street="item.street"
                :street-number="item.street_number"
                :postal-code="item.postal_code" />
        </template>
        <template v-slot:item.created_at="{ item }">
            <DateCell :date="new Date(item.available_from)" />
        </template>
        <template v-slot:item.updated_at="{ item }">
            <DateCell :date="new Date(item.updated_at)" />
        </template>
        <template v-slot:bottom>
            <div class="d-flex flex-row-reverse mt-2">
                <div class="w-25">
                    <v-pagination
                        :model-value="currentPage"
                        @update:modelValue="onPageChange"
                        :length="pageCount" />
                </div>
            </div>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" @click="showEditDialog(item)">edit</v-icon>
        </template>
    </v-data-table-server>
    <EditAssetDialog
        v-if="assetToEdit"
        :show-edit-dialog="editDialogIsVisible"
        :asset="assetToEdit"
        @hide-edit-dialog="hideEditDialog" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAssetsStore } from '@/stores/asset/asset_store';
import type { IPagination } from '@/contracts/IPagination';
import type { IAssetItem } from '@/contracts/IAsset';
import AddressCell from '@/components/grid/AddressCell.vue';
import DateCell from '@/components/grid/DateCell.vue';
import EditAssetDialog from '@/components/dialogs/EditAssetDialog.vue';

const { fetchAssets } = useAssetsStore();
const { assets, meta, state } = storeToRefs(useAssetsStore());

const pageCount = computed(() => meta.value?.last_page);
const currentPage = computed(() => meta.value?.current_page);
const totalItems = computed(() => meta.value?.total ?? 0);
const loading = computed(() => state.value === 'LOADING');

const gridHeight = 920;
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

const pagination = ref<IPagination>({
    itemsPerPage: 30,
    page: 1,
});

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
</script>
