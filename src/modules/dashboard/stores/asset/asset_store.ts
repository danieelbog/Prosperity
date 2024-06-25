import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetAssets } from './assetService';
import type { IAssetItem, IAssetLinks, IAssetMeta } from '../../contracts/IAsset';
import type { IPagination } from '../../contracts/IPagination';
import type { IEntityFilter } from '../../contracts/IEntityFilter';
import { mapAssetListServerDataToClientItem } from './assetMapper';

type STATE = 'INIT' | 'LOADING' | 'READY' | 'ERROR';
export const useAssetsStore = defineStore('assets', () => {
    const assets = ref<IAssetItem[]>();
    const meta = ref<IAssetMeta>();
    const links = ref<IAssetLinks>();
    const state = ref<STATE>('INIT');

    const fetchAssets = async (pagination: IPagination, filters: IEntityFilter) => {
        state.value = 'LOADING';
        const response = await GetAssets(pagination, filters);

        if (!response.data) {
            state.value = 'ERROR';
            throw new Error('Assets data is empty');
        }

        assets.value = mapAssetListServerDataToClientItem(response.data);
        meta.value = response.data.meta;
        links.value = response.data.links;
        state.value = 'READY';
    };

    return { assets, meta, state, fetchAssets };
});
