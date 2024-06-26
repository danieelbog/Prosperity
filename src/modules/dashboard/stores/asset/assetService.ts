import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import { getQueryParams } from '@/utils/query-parameters/queryToUrlMapper';
import type { AxiosPromise } from 'axios';
import type { IEntityFilter } from '../../contracts/IEntityFilter';
import type { IAssetData, IAssetDataList, IAssetItemUpdate } from '../../contracts/IAsset';
import type { IPagination } from '../../contracts/IPagination';

export const GetAssets = async (
    pagination: IPagination,
    filters: IEntityFilter,
): AxiosPromise<IAssetDataList> => {
    const queryParams = getQueryParams(pagination, filters);
    const url = `${RestRoutes.GETAssets}?${queryParams}`;
    return api.get(url);
};

export const PutAsset = async (
    assetUpdateId: string,
    assetUpdate: IAssetItemUpdate,
): AxiosPromise<IAssetData> => {
    return api.put(`${RestRoutes.PUTAsset}/${assetUpdateId}`, assetUpdate);
};
