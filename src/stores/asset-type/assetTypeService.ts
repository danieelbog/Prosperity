import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAssetTypeData } from '@/contracts/IAssetType';
import type { AxiosPromise } from 'axios';

export const GetAssetTypes = async (): AxiosPromise<IAssetTypeData> => {
    return api.get(RestRoutes.GETAssetTypes);
};
