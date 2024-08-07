import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetAssets, PutAsset } from './assetService';
import type { IAssetItem, IAssetLinks, IAssetMeta } from '../../contracts/IAsset';
import type { IPagination } from '../../contracts/IPagination';
import type { IEntityFilter } from '../../contracts/IEntityFilter';
import type { ISort } from '../../contracts/ISort';
import { mapAssetItemToUpdateAssetItem, mapAssetListServerDataToClientItem } from './assetMapper';

type STATE = 'INIT' | 'LOADING' | 'READY' | 'ERROR';
export const useAssetsStore = defineStore('assets', () => {
    const assets = ref<IAssetItem[]>();
    const meta = ref<IAssetMeta>();
    const links = ref<IAssetLinks>();
    const state = ref<STATE>('INIT');

    const lastPagination = ref<IPagination>();
    const lastFilters = ref<IEntityFilter>();
    const lastSortBy = ref<ISort[]>();

    const fetchAssets = async (
        pagination?: IPagination,
        filters?: IEntityFilter,
        sortBy?: ISort[],
    ) => {
        state.value = 'LOADING';

        if (!pagination) pagination = { itemsPerPage: 30, page: 1 };
        if (!filters) filters = {};
        if (!sortBy) sortBy = [];

        const response = await GetAssets(pagination, filters, sortBy);

        if (!response.data) {
            state.value = 'ERROR';
            throw new Error('Assets data is empty');
        }

        assets.value = mapAssetListServerDataToClientItem(response.data);

        meta.value = response.data.meta;
        links.value = response.data.links;

        lastPagination.value = pagination;
        lastFilters.value = filters;
        lastSortBy.value = sortBy;

        state.value = 'READY';
    };

    const updateAsset = async (assetToUpdate: IAssetItem) => {
        state.value = 'LOADING';

        const response = await PutAsset(
            assetToUpdate.uuid,
            mapAssetItemToUpdateAssetItem(assetToUpdate),
        );

        if (!response) {
            state.value = 'ERROR';
            throw new Error('Asset not updated');
        }

        await fetchAssets(lastPagination.value, lastFilters.value, lastSortBy.value);
    };

    return { assets, meta, state, fetchAssets, updateAsset };
});
