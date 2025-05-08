import { formatDate, getAge, getTime } from '@/shared/utils/formatDate';

describe('formatDate', () => {
  it('should return undefined for undefined input', () => {
    expect(formatDate(undefined)).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    expect(formatDate('')).toBeUndefined();
  });

  it('should format date correctly for January', () => {
    expect(formatDate('2025-01-15')).toBe('15 января 2025');
  });

  it('should format date correctly for December', () => {
    expect(formatDate('2025-12-31')).toBe('31 декабря 2025');
  });

  it('should format date correctly for March', () => {
    expect(formatDate('2025-03-13')).toBe('13 марта 2025');
  });

  it('should format date correctly for April', () => {
    expect(formatDate('2025-04-01')).toBe('1 апреля 2025');
  });

  it('should format date correctly for May', () => {
    expect(formatDate('2025-05-31')).toBe('31 мая 2025');
  });

  it('should format date correctly for June', () => {
    expect(formatDate('2025-06-30')).toBe('30 июня 2025');
  });

  it('should format date correctly for July', () => {
    expect(formatDate('2025-07-31')).toBe('31 июля 2025');
  });
  it('should format date correctly for August', () => {
    expect(formatDate('2025-08-31')).toBe('31 августа 2025');
  });

  it('should format date correctly for September', () => {
    expect(formatDate('2025-09-19')).toBe('19 сентября 2025');
  });

  it('should format date correctly for October', () => {
    expect(formatDate('2025-10-31')).toBe('31 октября 2025');
  });

  it('should format date correctly for November', () => {
    expect(formatDate('2025-11-30')).toBe('30 ноября 2025');
  });

  it('should handle single-digit day', () => {
    expect(formatDate('2025-02-05')).toBe('5 февраля 2025');
  });

  it('should handle leap year (29 February)', () => {
    expect(formatDate('2020-02-29')).toBe('29 февраля 2020');
  });

  it('should handle invalid date by returning undefined', () => {
    expect(formatDate('invalid-date')).toBeUndefined();
  });

  it('should handle ISO string with time', () => {
    expect(formatDate('2025-05-15T14:30:00Z')).toBe('15 мая 2025');
  });
});

describe('getTime', () => {
  it('should format morning time correctly', () => {
    const date = new Date('2025-05-15T09:05:00Z');
    expect(getTime(date)).toBe('9:05');
  });

  it('should format afternoon time correctly', () => {
    const date = new Date('2025-05-15T14:30:00Z');
    expect(getTime(date)).toBe('14:30');
  });

  it('should add leading zero for minutes < 10', () => {
    const date = new Date('2025-05-15T14:09:00Z');
    expect(getTime(date)).toBe('14:09');
  });

  it('should handle midnight', () => {
    const date = new Date('2025-05-15T00:00:00Z');
    expect(getTime(date)).toBe('0:00');
  });

  it('should handle single-digit hours', () => {
    const date = new Date('2025-05-15T05:30:00Z');
    expect(getTime(date)).toBe('5:30');
  });
});

describe('getAge', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-04-01')); // Фиксируем текущую дату
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should calculate age correctly when birthday passed this year', () => {
    const birthDate = new Date('1990-01-15');
    expect(getAge(birthDate)).toBe('35 лет');
  });

  it('should calculate age correctly when birthday not passed yet', () => {
    const birthDate = new Date('1990-06-15');
    expect(getAge(birthDate)).toBe('34 года');
  });

  it('should handle "год" for 1 year', () => {
    const birthDate = new Date('2024-01-15');
    expect(getAge(birthDate)).toBe('1 год');
  });

  it('should handle "лет" for 5, 6...20 years', () => {
    const birthDate5 = new Date('2020-01-15');
    expect(getAge(birthDate5)).toBe('5 лет');

    const birthDate11 = new Date('2012-01-15');
    expect(getAge(birthDate11)).toBe('13 лет');

    const birthDate20 = new Date('2005-01-15');
    expect(getAge(birthDate20)).toBe('20 лет');
  });

  it('should handle "года" for 2,3,4 years', () => {
    const birthDate2 = new Date('2023-01-15');
    expect(getAge(birthDate2)).toBe('2 года');

    const birthDate3 = new Date('2022-01-15');
    expect(getAge(birthDate3)).toBe('3 года');

    const birthDate4 = new Date('2021-01-15');
    expect(getAge(birthDate4)).toBe('4 года');
  });

  it('should handle leap year birthdays', () => {
    const birthDate = new Date('2000-02-29');
    expect(getAge(birthDate)).toBe('25 лет');
  });

  it('should handle birthday today', () => {
    const birthDate = new Date('2000-04-01');
    expect(getAge(birthDate)).toBe('25 лет');
  });

  it('should handle incorrect date', () => {
    const birthDate = new Date('incorrect-date');
    expect(getAge(birthDate)).toBe('-');
  });
});
