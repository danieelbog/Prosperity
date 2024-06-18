import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { GetAssetTypes } from './assetTypeService';
import type { IAssetTypeItem } from '@/contracts/IAssetType';

export const useAssetTypesStore = defineStore('assetTypes', () => {
    const assetTypes = ref<IAssetTypeItem[]>([]);

    const fetchAssetTypes = async () => {
        const response = await GetAssetTypes();
        if (!response.data) {
            throw new Error('Asset types data is empty');
        }

        assetTypes.value = response.data.data;
        console.log(assetTypes.value);
    };

    const getAssetTypes = computed(() => assetTypes.value);

    return {
        getAssetTypes,
        fetchAssetTypes,
    };
});
