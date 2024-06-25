import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { AxiosPromise } from 'axios';
import type { IAssetTypeData } from '../../contracts/IAssetType';

export const GetAssetTypes = async (): AxiosPromise<IAssetTypeData> => {
    return api.get(RestRoutes.GETAssetTypes);
};
