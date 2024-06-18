import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAssetData, IAssetDataList, IAssetitem } from '@/contracts/IAsset';
import type { AxiosPromise } from 'axios';

export const GetAssets = async (): AxiosPromise<IAssetDataList> => {
    return api.get(RestRoutes.GETAssets);
};

export const GetAssetBy = async (id: string): AxiosPromise<IAssetData> => {
    return api.get(`${RestRoutes.GETAssets}/${id}`);
};

export const PutAsset = async (property: IAssetitem): AxiosPromise<void> => {
    return api.post(`${RestRoutes.PUTAsset}/${property.uuid}`, property);
};
