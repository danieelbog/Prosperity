import { getQueryFilterParams } from './filterToUrlMapper';
import { getQueryPaginationParams } from './paginationToUrlMapper';
import type { IEntityFilter } from '@/modules/dashboard/contracts/IEntityFilter';
import type { IPagination } from '@/modules/dashboard/contracts/IPagination';

export const getQueryParams = (pagination: IPagination, filters: IEntityFilter): string => {
    const queryParams = [getQueryPaginationParams(pagination), getQueryFilterParams(filters)]
        .filter((param) => param !== '')
        .join('&');

    return queryParams;
};
