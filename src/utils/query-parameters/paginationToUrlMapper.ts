import type { IPagination } from '@/modules/dashboard/contracts/IPagination';

export const getQueryPaginationParams = (pagination: IPagination): string => {
    const { itemsPerPage, page } = pagination;
    const params = [];

    if (itemsPerPage) params.push(`limit=${itemsPerPage}`);
    if (page) params.push(`page=${page}`);

    return params.join('&');
};
