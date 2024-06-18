import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { IAmenitiesData } from '@/contracts/IAmenities';
import type { AxiosPromise } from 'axios';

export const GetAmenities = async (): AxiosPromise<IAmenitiesData> => {
    return api.get(RestRoutes.GETAmenities);
};
