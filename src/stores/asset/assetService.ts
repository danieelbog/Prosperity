import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAssetData, IAssetDataList, IAssetItem } from '@/contracts/IAsset';
import type { IEntityFilter } from '@/contracts/IEntityFilter';
import type { IPagination } from '@/contracts/IPagination';
import type { AxiosPromise } from 'axios';
import { getQueryPaginationParams } from '@/utils/paginationToUrlMapper';
import { getQueryFilterParams } from '@/utils/filterToUrlMapper';

export const GetAssets = async (
    pagination: IPagination,
    filters: IEntityFilter,
): AxiosPromise<IAssetDataList> => {
    const queryParams = [getQueryPaginationParams(pagination), getQueryFilterParams(filters)]
        .filter((param) => param !== '')
        .join('&');

    const url = `${RestRoutes.GETAssets}?${queryParams}`;
    return api.get(url);
};

export const GetAssetBy = async (id: string): AxiosPromise<IAssetData> => {
    return api.get(`${RestRoutes.GETAssets}/${id}`);
};

export const PutAsset = async (property: IAssetItem): AxiosPromise<void> => {
    return api.post(`${RestRoutes.PUTAsset}/${property.uuid}`, property);
};
