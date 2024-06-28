import { getQueryFilterParams } from '@/utils/query-parameters/filterToUrlMapper';
import { expect } from '@storybook/test';

import type { IEntityFilter } from '@/modules/dashboard/contracts/IEntityFilter';
import { getQueryPaginationParams } from '@/utils/query-parameters/paginationToUrlMapper';
import type { IPagination } from '@/modules/dashboard/contracts/IPagination';
import type { ISort } from '@/modules/dashboard/contracts/ISort';
import { getQuerySortByParams } from '@/utils/query-parameters/sortByToUrlMapper';

export const testGetQueryFilterParams = async (step: any) => {
    await step('Test case 2: Filters with array values', async () => {
        const filters1: IEntityFilter = { name: 'John', age: 30 };
        expect(getQueryFilterParams(filters1)).toBe('filter[name]=John&filter[age]=30');
    });

    await step('Test case 3: Filters with null and undefined values', async () => {
        const filters2: IEntityFilter = { status: ['active', 'inactive'] };
        expect(getQueryFilterParams(filters2)).toBe('filter[status]=active,inactive');
    });

    await step('Test case 3: Filters with null and undefined values', async () => {
        const filters3: IEntityFilter = { name: 'John', age: null, city: undefined };
        expect(getQueryFilterParams(filters3)).toBe('filter[name]=John');
    });

    await step('Test case 4: Filters with boolean values', async () => {
        const filters4: IEntityFilter = { isActive: true, isAdmin: false };
        expect(getQueryFilterParams(filters4)).toBe('filter[isActive]=true&filter[isAdmin]=false');
    });

    await step('Test case 5: Filters with mixed types', async () => {
        const filters5: IEntityFilter = {
            name: 'John',
            age: 30,
            isActive: true,
            roles: ['admin', 'user'],
        };
        expect(getQueryFilterParams(filters5)).toBe(
            'filter[name]=John&filter[age]=30&filter[isActive]=true&filter[roles]=admin,user',
        );
    });

    await step('Test case 6: Empty filters', async () => {
        const filters6: IEntityFilter = {};
        expect(getQueryFilterParams(filters6)).toBe('');
    });
};

export const testGetQueryPaginationParams = async (step: any) => {
    await step('Test case 1: Both itemsPerPage and page provided', async () => {
        const pagination1: IPagination = { itemsPerPage: 20, page: 2 };
        expect(getQueryPaginationParams(pagination1)).toBe('limit=20&page=2');
    });

    await step('Test case 2: Only itemsPerPage provided', async () => {
        const pagination2 = { itemsPerPage: 10 } as IPagination;
        expect(getQueryPaginationParams(pagination2)).toBe('limit=10');
    });

    await step('Test case 3: Only page provided', async () => {
        const pagination3 = { page: 5 } as IPagination;
        expect(getQueryPaginationParams(pagination3)).toBe('page=5');
    });

    await step('Test case 4: Neither itemsPerPage nor page provided', async () => {
        const pagination4 = {} as IPagination;
        expect(getQueryPaginationParams(pagination4)).toBe('');
    });
};

export const testGetQuerySortByParams = async (step: any) => {
    await step('Test case 1: Single sort with ascending order', async () => {
        const sortBy1: ISort[] = [{ key: 'name', order: 'asc' }];
        expect(getQuerySortByParams(sortBy1)).toBe('sort=name&sortDesc=false');
    });

    await step('Test case 2: Single sort with descending order', async () => {
        const sortBy2: ISort[] = [{ key: 'age', order: 'desc' }];
        expect(getQuerySortByParams(sortBy2)).toBe('sort=age&sortDesc=true');
    });

    await step('Test case 3: Multiple sorts', async () => {
        const sortBy3: ISort[] = [
            { key: 'name', order: 'asc' },
            { key: 'age', order: 'desc' },
        ];
        expect(getQuerySortByParams(sortBy3)).toBe(
            'sort=name&sortDesc=false&sort=age&sortDesc=true',
        );
    });

    await step('Test case 4: No sorts provided', async () => {
        const sortBy4: ISort[] = [];
        expect(getQuerySortByParams(sortBy4)).toBe('');
    });

    await step('Test case 5: Sort with undefined key', async () => {
        const sortBy5: ISort[] = [{ key: '', order: 'asc' }];
        expect(getQuerySortByParams(sortBy5)).toBe('sortDesc=false');
    });

    await step('Test case 6: Sort with undefined order', async () => {
        const sortBy6: ISort[] = [{ key: 'name', order: undefined }];
        expect(getQuerySortByParams(sortBy6)).toBe('sort=name');
    });

    await step('Test case 7: Sort with undefined key and order', async () => {
        const sortBy7: ISort[] = [{ key: '', order: undefined }];
        expect(getQuerySortByParams(sortBy7)).toBe('');
    });
};
