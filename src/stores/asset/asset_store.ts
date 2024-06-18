import type { IAssetitem } from '@/contracts/IAsset';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { GetAssetBy, GetAssets, PutAsset } from './assetService';

export const useAssetsStore = defineStore('assets', () => {
    const assets = ref<IAssetitem[]>([]);

    const fetchAssets = async () => {
        const response = await GetAssets();
        if (!response.data) {
            throw new Error('Assets data is empty');
        }

        assets.value = response.data.data;

        console.log(assets.value);
    };

    const fetchAssetBy = async (id: string) => {
        const response = await GetAssetBy(id);
        if (!response.data) {
            throw new Error('Asset data is empty');
        }

        assets.value = [];
        assets.value.push(response.data.data);

        console.log(assets.value);
    };

    const updateAsset = async (asset: IAssetitem) => {
        await PutAsset(asset);
        const index = assets.value.findIndex((p) => p.uuid === asset.uuid);
        if (index !== -1) {
            assets.value[index] = asset;
        } else {
            throw new Error('Asset to update was not found');
        }
    };

    const getAssets = computed(() => assets.value);

    return { getAssets, fetchAssets, fetchAssetBy, updateAsset };
});
