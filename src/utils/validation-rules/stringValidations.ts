export const requiredField = (fieldName: string) => {
    return [
        (value: string) => {
            if (value) return true;
            return `You must enter a ${fieldName}.`;
        },
    ];
};

export const latitudeRules = () => {
    return [
        (value: string) => {
            if (!value) return true;

            const num = parseFloat(value);
            if (!isNaN(num) && num >= -90 && num <= 90) return true;
            return 'Latitude must be a number between -90 and 90.';
        },
    ];
};

export const longitudeRules = () => {
    return [
        (value: string) => {
            if (!value) return true;

            const num = parseFloat(value);
            if (!isNaN(num) && num >= -180 && num <= 180) return true;
            return 'Longitude must be a number between -180 and 180.';
        },
    ];
};
