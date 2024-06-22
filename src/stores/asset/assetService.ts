import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAssetData, IAssetDataList, IAssetItem } from '@/contracts/IAsset';
import type { IPagination } from '@/contracts/IPagination';
import type { AxiosPromise } from 'axios';

//{{protocol}}://{{host}}/{{basePath}}/listings/?limit=1&page=2
export const GetAssets = async (pagination?: IPagination): AxiosPromise<IAssetDataList> => {
    const url = `${RestRoutes.GETAssets}?${getQueryParams(pagination)}`;
    return api.get(url);

    // return api.get(`${RestRoutes.GETAssets}?limit=${pagination?.limit}&page=${pagination?.page}`);
};

export const GetAssetBy = async (id: string): AxiosPromise<IAssetData> => {
    return api.get(`${RestRoutes.GETAssets}/${id}`);
};

export const PutAsset = async (property: IAssetItem): AxiosPromise<void> => {
    return api.post(`${RestRoutes.PUTAsset}/${property.uuid}`, property);
};

const getQueryParams = (pagination?: IPagination): string => {
    if (!pagination) return ''; // Return empty string if pagination is undefined

    const { itemsPerPage, page } = pagination;
    const params = [];

    if (itemsPerPage) params.push(`limit=${itemsPerPage}`);
    if (page) params.push(`page=${page}`);

    return params.join('&');
};
