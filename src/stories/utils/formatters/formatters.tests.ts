import { expect } from '@storybook/test';
import { formatDate } from '@/utils/formatters/dateFormat';

export const testDateFormatter = async (step: any) => {
    await step('Test case 1: Check a specific date and time', async () => {
        const date1 = new Date('2022-04-27T11:20:16+00:00');
        expect(formatDate(date1)).toBe('2022-04-27');
    });

    await step('Test case 2: Check a different date and time', async () => {
        const date2 = new Date('2022-05-15T08:45:30+00:00');
        expect(formatDate(date2)).toBe('2022-05-15');
    });

    await step('Test case 3: Check a date with a different time zone offset', async () => {
        const date3 = new Date('2022-06-01T23:59:59+03:00');
        expect(formatDate(date3)).toBe('2022-06-01');
    });

    await step('Test case 4: Check a leap year date', async () => {
        const date4 = new Date('2020-02-29T00:00:00+00:00');
        expect(formatDate(date4)).toBe('2020-02-29');
    });
};
