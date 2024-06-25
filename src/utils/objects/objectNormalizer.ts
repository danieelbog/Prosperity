export const normalizeAsset = <T extends Record<string, any>>(object: T): T => {
    const normalized = { ...object };

    for (const key in normalized) {
        if (normalized[key] === null || normalized[key] === '') {
            normalized[key] = '' as any;
        } else if (Array.isArray(normalized[key])) {
            normalized[key] = normalized[key].slice().sort();
        } else if (typeof normalized[key] === 'object') {
            normalizeAsset(normalized[key]);
        }
    }

    return normalized;
};
