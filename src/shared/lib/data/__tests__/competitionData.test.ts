import { getDistances, getAgeRange, getSwimShort, isPassed, getSwimsDropDown } from '@/shared/lib/data/competitionData';
import { Swim } from '@/entities/swim';
import {describe, expect, it} from "@jest/globals";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

describe('getDistances', () => {
  it('should return "-" for empty array', () => {
    expect(getDistances([])).toBe('-');
  });

  it('should return single distance for one swim', () => {
    const swims: Swim[] = [{ distance: 50 } as Swim];
    expect(getDistances(swims)).toBe('50-50');
  });

  it('should return min-max for multiple swims', () => {
    const swims: Swim[] = [
      { distance: 100 } as Swim,
      { distance: 50 } as Swim,
      { distance: 200 } as Swim,
    ];
    expect(getDistances(swims)).toBe('50-200');
  });

  it('should handle negative distances', () => {
    const swims: Swim[] = [
      { distance: -10 } as Swim,
      { distance: -5 } as Swim,
    ];
    expect(getDistances(swims)).toBe('-10--5');
  });
});

describe('getAgeRange', () => {
  it('should return correct range for years', () => {
    expect(getAgeRange(10, 15)).toBe('от 10 до 15 лет');
  });

  it('should return correct singular form for 1 year', () => {
    expect(getAgeRange(5, 21)).toBe('от 5 до 21 года');
  });

  it('should handle same age', () => {
    expect(getAgeRange(10, 10)).toBe('от 10 до 10 лет');
  });

  it('should handle ages ending with 2-4', () => {
    expect(getAgeRange(10, 12)).toBe('от 10 до 12 лет');
    expect(getAgeRange(10, 13)).toBe('от 10 до 13 лет');
    expect(getAgeRange(10, 14)).toBe('от 10 до 14 лет');
  });

  it('should handle ages ending with 11-14 (special case)', () => {
    expect(getAgeRange(10, 11)).toBe('от 10 до 11 лет');
    expect(getAgeRange(10, 12)).toBe('от 10 до 12 лет');
    expect(getAgeRange(10, 13)).toBe('от 10 до 13 лет');
    expect(getAgeRange(10, 14)).toBe('от 10 до 14 лет');
  });
});

describe('isPassed', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return false for undefined date', () => {
    expect(isPassed()).toBe(false);
  });

  it('should return true for past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(isPassed(pastDate.toISOString())).toBe(true);
  });

  it('should return false for future date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(isPassed(futureDate.toISOString())).toBe(false);
  });

  it('should return true for today', () => {
    const today = new Date().toISOString();
    expect(isPassed(today)).toBe(true);
  });

  it('should ignore time part', () => {
    const now = new Date();
    const todayWithTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    expect(isPassed(todayWithTime.toISOString())).toBe(true);
  });
});

describe('getSwimShort', () => {
  it('should format swim info correctly', () => {
    const swim: Swim = {
      distance: 100,
      ageFrom: 10,
      ageTo: 15,
      style: 'вольный',
    } as Swim;

    expect(getSwimShort(swim)).toBe('100м, от 10 до 15 лет, стиль вольный');
  });
});

describe('getSwimsDropDown', () => {
  it('should return empty array for empty input', () => {
    expect(getSwimsDropDown([])).toEqual([]);
  });

  it('should convert swims to dropdown items', () => {
    const swims: Swim[] = [
      { eventUuid: '1', distance: 50, ageFrom: 10, ageTo: 12, style: 'баттерфляй' } as Swim,
      { eventUuid: '2', distance: 100, ageFrom: 13, ageTo: 15, style: 'вольный' } as Swim,
    ];

    const expected: DropdownItem[] = [
      { id: '1', name: '50м, от 10 до 12 лет, стиль баттерфляй' },
      { id: '2', name: '100м, от 13 до 15 лет, стиль вольный' },
    ];

    expect(getSwimsDropDown(swims)).toEqual(expected);
  });

  it('should maintain order of swims', () => {
    const swims: Swim[] = [
      { eventUuid: '1', distance: 200 } as Swim,
      { eventUuid: '2', distance: 100 } as Swim,
    ];

    const result = getSwimsDropDown(swims);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });
});
