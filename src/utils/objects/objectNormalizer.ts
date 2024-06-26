import { formatDate } from '../formatters/dateFormat';

export const normalizeObject = <T extends Record<string, any>>(object: T): T => {
    const normalized: Record<string, any> = {};
    const keys = Object.keys(object).sort();

    for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(object, key)) {
            continue;
        }

        const value = object[key];

        if (typeof value === 'number') {
            normalized[key] = value;
            continue;
        }

        if (isDate(value)) {
            normalized[key] = formatDate(new Date(value));
        } else if (value === null || value === '') {
            normalized[key] = '';
        } else if (Array.isArray(value)) {
            normalized[key] = value.slice().sort();
        } else if (typeof value === 'object') {
            normalized[key] = normalizeObject(value);
        } else {
            normalized[key] = value;
        }
    }

    return normalized as T;
};

export const isDate = (value: any): boolean => {
    return (
        (value instanceof Date && !isNaN(value.getTime())) ||
        (typeof value === 'string' && !isNaN(Date.parse(value)))
    );
};
