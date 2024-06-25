import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import { getQueryParams } from '@/utils/query-parameters/queryToUrlMapper';
import type { AxiosPromise } from 'axios';
import type { IEntityFilter } from '../../contracts/IEntityFilter';
import type { IAssetDataList, IAssetItem } from '../../contracts/IAsset';
import type { IPagination } from '../../contracts/IPagination';

export const GetAssets = async (
    pagination: IPagination,
    filters: IEntityFilter,
): AxiosPromise<IAssetDataList> => {
    const queryParams = getQueryParams(pagination, filters);
    const url = `${RestRoutes.GETAssets}?${queryParams}`;
    return api.get(url);
};

export const PutAsset = async (property: IAssetItem): AxiosPromise<void> => {
    return api.post(`${RestRoutes.PUTAsset}/${property.uuid}`, property);
};
