import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAssetData, IAssetDataList, IAssetItem } from '@/contracts/IAsset';
import type { IPagination } from '@/contracts/IPagination';
import { getQueryParams } from '@/utils/paginationToUrlMapper';
import type { AxiosPromise } from 'axios';

export const GetAssets = async (pagination: IPagination): AxiosPromise<IAssetDataList> => {
    const url = `${RestRoutes.GETAssets}?${getQueryParams(pagination)}`;
    return api.get(url);
};

export const GetAssetBy = async (id: string): AxiosPromise<IAssetData> => {
    return api.get(`${RestRoutes.GETAssets}/${id}`);
};

export const PutAsset = async (property: IAssetItem): AxiosPromise<void> => {
    return api.post(`${RestRoutes.PUTAsset}/${property.uuid}`, property);
};
