import {
    latitudeRules,
    longitudeRules,
    requiredField,
} from '@/utils/validation-rules/stringValidations';
import { expect } from '@storybook/test';

export const testRequiredField = async (step: any) => {
    await step('Test case 1: Valid input', async () => {
        const validator = requiredField('Name');
        expect(validator[0]('John')).toBe(true);
    });

    await step('Test case 2: Empty input', async () => {
        const validator = requiredField('Name');
        expect(validator[0]('')).toBe('You must enter a Name.');
    });
};

export const testLatitudeRules = async (step: any) => {
    await step('Test case 1: Valid latitude', async () => {
        const validator = latitudeRules();
        expect(validator[0]('45')).toBe(true);
    });

    await step('Test case 2: Empty latitude (optional)', async () => {
        const validator = latitudeRules();
        expect(validator[0]('')).toBe(true);
    });

    await step('Test case 3: Valid latitude at boundary (-90)', async () => {
        const validator = latitudeRules();
        expect(validator[0]('-90')).toBe(true);
    });

    await step('Test case 4: Valid latitude at boundary (90)', async () => {
        const validator = latitudeRules();
        expect(validator[0]('90')).toBe(true);
    });

    await step('Test case 5: Invalid latitude (out of range)', async () => {
        const validator = latitudeRules();
        expect(validator[0]('100')).toBe('Latitude must be a number between -90 and 90.');
    });

    await step('Test case 6: Invalid latitude (not a number)', async () => {
        const validator = latitudeRules();
        expect(validator[0]('abc')).toBe('Latitude must be a number between -90 and 90.');
    });
};

export const testLongitudeRules = async (step: any) => {
    await step('Test case 1: Valid longitude', async () => {
        const validator = longitudeRules();
        expect(validator[0]('100')).toBe(true);
    });

    await step('Test case 2: Empty longitude (optional)', async () => {
        const validator = longitudeRules();
        expect(validator[0]('')).toBe(true);
    });

    await step('Test case 3: Valid longitude at boundary (-180)', async () => {
        const validator = longitudeRules();
        expect(validator[0]('-180')).toBe(true);
    });

    await step('Test case 4: Valid longitude at boundary (180)', async () => {
        const validator = longitudeRules();
        expect(validator[0]('180')).toBe(true);
    });

    await step('Test case 5: Invalid longitude (out of range)', async () => {
        const validator = longitudeRules();
        expect(validator[0]('200')).toBe('Longitude must be a number between -180 and 180.');
    });

    await step('Test case 6: Invalid longitude (not a number)', async () => {
        const validator = longitudeRules();
        expect(validator[0]('xyz')).toBe('Longitude must be a number between -180 and 180.');
    });
};
