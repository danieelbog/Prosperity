import type { ISort } from '@/modules/dashboard/contracts/ISort';

export const getQuerySortByParams = (sortBy: ISort[]): string => {
    const params: string[] = [];

    sortBy.forEach((sortByValue) => {
        if (sortByValue.key) params.push(`sort=${sortByValue.key}`);
        if (sortByValue.order)
            params.push(`sortDesc=${sortByValue.order === 'desc' ? true : false}`);
    });

    return params.join('&');
};
