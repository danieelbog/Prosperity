import type { IEntityFilter } from '@/modules/dashboard/contracts/IEntityFilter';

export const getQueryFilterParams = (filters: IEntityFilter): string => {
    const params = [];

    for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
            const value = filters[key];

            if (value === undefined || value === null) continue;

            if (Array.isArray(value)) {
                params.push(`filter[${key}]=${value.join(',')}`);
            } else {
                params.push(`filter[${key}]=${value}`);
            }
        }
    }

    return params.join('&');
};
