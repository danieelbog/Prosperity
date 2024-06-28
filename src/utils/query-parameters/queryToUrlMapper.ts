import type { ISort } from '@/modules/dashboard/contracts/ISort';
import type { IEntityFilter } from '@/modules/dashboard/contracts/IEntityFilter';
import type { IPagination } from '@/modules/dashboard/contracts/IPagination';

import { getQueryFilterParams } from './filterToUrlMapper';
import { getQueryPaginationParams } from './paginationToUrlMapper';
import { getQuerySortByParams } from './sortByToUrlMapper';

export const getQueryParams = (
    pagination: IPagination,
    filters: IEntityFilter,
    sortBy: ISort[],
): string => {
    const queryParams = [
        getQueryPaginationParams(pagination),
        getQueryFilterParams(filters),
        getQuerySortByParams(sortBy),
    ]
        .filter((param) => param !== '')
        .join('&');

    return queryParams;
};
