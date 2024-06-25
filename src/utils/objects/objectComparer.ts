import { normalizeObject } from './objectNormalizer';

export const hasChanges = <T extends Record<string, any>>(newObj: T, oldObj: T): boolean => {
    const normalizedNewObj = normalizeObject(newObj);
    const normalizedOldObj = normalizeObject(oldObj);

    return JSON.stringify(normalizedNewObj) !== JSON.stringify(normalizedOldObj);
};
