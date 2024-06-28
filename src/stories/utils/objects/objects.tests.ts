import { expect } from '@storybook/test';
import { hasChanges } from '@/utils/objects/objectComparer';
import { normalizeObject, isDate } from '@/utils/objects/objectNormalizer';

interface TestObject {
    a: number;
    b?: string;
    c?: string;
}

export const testObjectComparer = async (step: any) => {
    await step('Test case 1: Objects are identical', async () => {
        const obj1: TestObject = { a: 1, b: 'test' };
        const obj2: TestObject = { a: 1, b: 'test' };
        expect(hasChanges(obj1, obj2)).toBe(false);
    });

    await step('Test case 2: Objects have different values', async () => {
        const obj3: TestObject = { a: 1, b: 'test1' };
        const obj4: TestObject = { a: 1, b: 'test2' };
        expect(hasChanges(obj3, obj4)).toBe(true);
    });

    await step('Test case 3: Objects have different keys', async () => {
        const obj5: TestObject = { a: 1, b: 'test' };
        const obj6: TestObject = { a: 1, c: 'test' };
        expect(hasChanges(obj5, obj6)).toBe(true);
    });

    await step('Test case 4: Normalized objects are identical', async () => {
        const obj7: TestObject = { a: 1, b: 'test' };
        const obj8: TestObject = { a: 2, b: 'test' };
        expect(hasChanges(obj7, obj8)).toBe(true);
    });

    await step('Test case 5: Normalized objects are different', async () => {
        const obj9: TestObject = { a: 1, b: 'test' };
        const obj10: TestObject = { a: 1, c: 'test' };
        expect(hasChanges(obj9, obj10)).toBe(true);
    });
};

export const testObjectNormalizer = async (step: any) => {
    await step('Test case 1: Basic normalization of simple object', async () => {
        const obj1 = { b: 2, a: 1 };
        const expected1 = { a: 1, b: 2 };
        expect(normalizeObject(obj1)).toEqual(expected1);
    });

    await step('Test case 2: Normalizing an object with dates', async () => {
        const obj2 = { date: '2022-04-27T11:20:16+00:00' };
        const expected2 = { date: '2022-04-27' };
        expect(normalizeObject(obj2)).toEqual(expected2);
    });

    await step('Test case 3: Normalizing an object with nested objects', async () => {
        const obj3 = { nested: { b: 2, a: 1 }, c: 3 };
        const expected3 = { c: 3, nested: { a: 1, b: 2 } };
        expect(normalizeObject(obj3)).toEqual(expected3);
    });

    await step('Test case 4: Normalizing an object with arrays', async () => {
        const obj4 = { arr: [3, 1, 2] };
        const expected4 = { arr: [1, 2, 3] };
        expect(normalizeObject(obj4)).toEqual(expected4);
    });

    await step('Test case 5: Normalizing an object with null and empty string values', async () => {
        const obj5 = { a: null, b: '' };
        const expected5 = { a: '', b: '' };
        expect(normalizeObject(obj5)).toEqual(expected5);
    });

    await step('Test case 6: Normalizing an object with various types', async () => {
        const obj6 = {
            a: 1,
            b: 'string',
            c: new Date('2022-04-27T11:20:16+00:00'),
            d: { e: 2 },
            f: [3, 1, 2],
        };
        const expected6 = { a: 1, b: 'string', c: '2022-04-27', d: { e: 2 }, f: [1, 2, 3] };
        expect(normalizeObject(obj6)).toEqual(expected6);
    });
};

export const testObjectIsDate = async (step: any) => {
    await step('Test case 1: Valid Date object', async () => {
        expect(isDate(new Date('2022-04-27T11:20:16+00:00'))).toBe(true);
    });
    await step('Test case 2: Invalid Date object', async () => {
        expect(isDate(new Date('invalid-date'))).toBe(false);
    });
    await step('Test case 3: Valid date string', async () => {
        expect(isDate('2022-04-27T11:20:16+00:00')).toBe(true);
    });
    await step('Test case 4: Invalid date string', async () => {
        expect(isDate('invalid-date')).toBe(false);
    });
    await step('Test case 5: Non-date string', async () => {
        expect(isDate('just a string')).toBe(false);
    });
    await step('Test case 6: Number', async () => {
        expect(isDate(12345)).toBe(false);
    });
    await step('Test case 7: Null', async () => {
        expect(isDate(null)).toBe(false);
    });
    await step('Test case 8: Undefined', async () => {
        expect(isDate(undefined)).toBe(false);
    });
};
