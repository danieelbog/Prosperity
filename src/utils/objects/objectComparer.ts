import { normalizeAsset } from './objectNormalizer';

export const hasChanges = <T extends Record<string, any>>(newObj: T, oldObj: T): boolean => {
    const normalizedNewObj = normalizeAsset(newObj);
    const normalizedOldObj = normalizeAsset(oldObj);

    return JSON.stringify(normalizedNewObj) !== JSON.stringify(normalizedOldObj);
};
