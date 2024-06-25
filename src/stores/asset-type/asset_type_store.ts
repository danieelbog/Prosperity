import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetAssetTypes } from './assetTypeService';
import { mapAssetTypeServerDataToClientItem } from './assetTypeMapper';
import type { IAssetTypeItem } from '@/contracts/IAssetType';

export const useAssetTypesStore = defineStore('assetTypes', () => {
    const assetTypes = ref<IAssetTypeItem[]>();

    const fetchAssetTypes = async () => {
        const response = await GetAssetTypes();
        if (!response.data) {
            throw new Error('Asset types data is empty');
        }

        assetTypes.value = mapAssetTypeServerDataToClientItem(response.data);
    };

    return {
        assetTypes,
        fetchAssetTypes,
    };
});
