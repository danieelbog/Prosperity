import type { IAssetDataList } from '@/contracts/IAsset';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { GetAssets } from './assetService';

export const useAssetsStore = defineStore('assets', () => {
    const assets = ref<IAssetDataList>();

    const fetchAssets = async () => {
        const response = await GetAssets();
        console.log('response', response);

        if (!response.data) {
            throw new Error('Assets data is empty');
        }

        assets.value = response.data;

        console.log(assets.value);
    };

    const getAssets = computed(() => assets.value);

    return { getAssets, fetchAssets };
});
