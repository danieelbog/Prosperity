import { api } from '@/app/api';
import { RestRoutes } from '@/app/api/restRoutes';
import type { AxiosPromise } from 'axios';
import type { IAmenitiesData } from '../../contracts/IAmenities';

export const GetAmenities = async (): AxiosPromise<IAmenitiesData> => {
    return api.get(RestRoutes.GETAmenities);
};
