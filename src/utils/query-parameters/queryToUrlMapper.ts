import type { IEntityFilter } from '@/contracts/IEntityFilter';
import type { IPagination } from '@/contracts/IPagination';
import { getQueryFilterParams } from './filterToUrlMapper';
import { getQueryPaginationParams } from './paginationToUrlMapper';

export const getQueryParams = (pagination: IPagination, filters: IEntityFilter): string => {
    const queryParams = [getQueryPaginationParams(pagination), getQueryFilterParams(filters)]
        .filter((param) => param !== '')
        .join('&');

    return queryParams;
};
