import { splitCompetitions, sortCompetitions } from '@/shared/lib/data/competitions';
import { Competition } from '@/entities/competition';
import {createTestCompetition} from "@/shared/utils";

describe('splitCompetitions', () => {
  // Мок текущей даты для стабильности тестов
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-05-15T00:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should split competitions into upcoming and passed', () => {
    const competitions: Competition[] = [
      createTestCompetition({ competitionUuid: "1", name: 'Прошедшее соревнование', date: '2023-05-14T23:00:00Z' }),
      createTestCompetition({ competitionUuid: "2", name: 'Будущее соревнование', date: '2023-05-20T23:00:00Z' }),
      createTestCompetition({ competitionUuid: "3", name: 'Сегодняшнее соревнование', date: '2023-05-15T00:00:00Z' }),
    ];

    const result = splitCompetitions(competitions);

    expect(result.passed).toHaveLength(1);
    expect(result.passed[0].competitionUuid).toBe('1');

    expect(result.upcoming).toHaveLength(2);
    expect(result.upcoming[0].competitionUuid).toBe('2');
    expect(result.upcoming[1].competitionUuid).toBe('3');
  });

  it('should handle empty array', () => {
    const result = splitCompetitions([]);
    expect(result.passed).toHaveLength(0);
    expect(result.upcoming).toHaveLength(0);
  });

  it('should consider time when comparing dates', () => {
    const competitions: Competition[] = [
      createTestCompetition({ competitionUuid: "1", name: 'Раннее сегодня', date: '2023-05-15T00:00:00Z' }),
      createTestCompetition({ competitionUuid: "2", name: 'Позднее сегодня', date: '2023-05-15T23:59:59Z' }),
    ];

    const result = splitCompetitions(competitions);
    expect(result.upcoming).toHaveLength(2);
  });

  it('should handle invalid dates by treating them as passed', () => {
    const competitions: Competition[] = [
      createTestCompetition({ competitionUuid: '1', name: 'Invalid date', date: 'invalid-date' }),
    ];

    const result = splitCompetitions(competitions);
    expect(result.passed).toHaveLength(1);
  });
});

describe('sortCompetitions', () => {
  const mockCompetitions: Competition[] = [
    createTestCompetition({ competitionUuid: '1', name: 'B Event', date: '2023-06-01' }),
    createTestCompetition({ competitionUuid: '2', name: 'A Event', date: '2023-05-01' }),
    createTestCompetition({ competitionUuid: '3', name: 'C Event', date: '2023-07-01' }),
  ];

  it('should sort by closer date (ascending)', () => {
    const result = sortCompetitions([...mockCompetitions], 'date-closer');

    expect(result[0].competitionUuid).toBe('2');
    expect(result[1].competitionUuid).toBe('1');
    expect(result[2].competitionUuid).toBe('3');
  });

  it('should sort by farther date (descending)', () => {
    const result = sortCompetitions([...mockCompetitions], 'date-farther');

    expect(result[0].competitionUuid).toBe('3');
    expect(result[1].competitionUuid).toBe('1');
    expect(result[2].competitionUuid).toBe('2');
  });

  it('should sort by name (alphabetical)', () => {
    const result = sortCompetitions([...mockCompetitions], 'name');

    expect(result[0].competitionUuid).toBe('2');
    expect(result[1].competitionUuid).toBe('1');
    expect(result[2].competitionUuid).toBe('3');
  });

  it('should return unchanged array for unknown sort option', () => {
    const original = [...mockCompetitions];
    const result = sortCompetitions(original, 'unknown' as never);

    expect(result).toEqual(original);
  });

  it('should handle empty array', () => {
    const result = sortCompetitions([], 'date-closer');
    expect(result).toEqual([]);
  });

  it('should handle invalid dates in date sorting', () => {
    const competitions: Competition[] = [
      createTestCompetition({ competitionUuid: '1', name: 'Valid', date: '2023-01-01' }),
      createTestCompetition({ competitionUuid: '2', name: 'Invalid', date: 'invalid-date' }),
    ];

    const result = sortCompetitions(competitions, 'date-closer');
    // Проверяем что функция не падает и возвращает массив
    expect(result).toHaveLength(2);
  });
});
