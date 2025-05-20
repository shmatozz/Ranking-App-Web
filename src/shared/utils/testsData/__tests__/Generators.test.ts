import { createTestCompetition, createTestUser } from '@/shared/utils/testsData';
import {faker} from "@faker-js/faker/locale/ru";

describe('createTestCompetition', () => {
  it('should create competition with default values', () => {
    const competition = createTestCompetition();

    expect(competition).toEqual({
      competitionUuid: 'default-uuid',
      attachment: "123.pdf",
      name: 'Default Competition',
      date: '2023-05-19T00:00:00',
      location: 'Default Location',
      description: 'Default Description',
      contactLink: 'http://example.com',
      participantsType: 'AMATEURS',
      competitionType: 'official',
    });
  });

  it('should override default values', () => {
    const customCompetition = createTestCompetition({
      name: 'Custom Name',
      participantsType: 'PROFESSIONALS',
    });

    expect(customCompetition.name).toBe('Custom Name');
    expect(customCompetition.participantsType).toBe('PROFESSIONALS');
    expect(customCompetition.competitionType).toBe('official');
  });

  it('should return valid Competition type', () => {
    const competition = createTestCompetition();

    expect(competition).toHaveProperty('competitionUuid');
    expect(competition).toHaveProperty('name');
    expect(competition).toHaveProperty('date');
  });

  it('should handle empty overrides', () => {
    const competition = createTestCompetition({});
    expect(competition.name).toBe('Default Competition');
  });
});

describe('createTestUser', () => {
  beforeAll(() => {
    faker.seed(42);
  });

  it('should create user with default structure', () => {
    const user = createTestUser();

    expect(user).toMatchObject({
      email: expect.any(String),
      phone: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      rating: expect.any(Number),
    });
  });

  it('should override default values', () => {
    const user = createTestUser({
      firstName: 'Иван',
      lastName: 'Иванов',
      rating: 100,
    });

    expect(user.firstName).toBe('Иван');
    expect(user.lastName).toBe('Иванов');
    expect(user.rating).toBe(100);
    expect(user.email).toContain('@');
  });

  it('should generate valid russian names', () => {
    const user = createTestUser();

    expect(user.firstName).toMatch(/^[А-Яа-яЁё]+$/);
    expect(user.lastName).toMatch(/^[А-Яа-яЁё]+$/);
  });

  it('should generate valid birth date', () => {
    const user = createTestUser();
    const birthYear = new Date(user.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();

    expect(birthYear).toBeGreaterThanOrEqual(currentYear - 65);
    expect(birthYear).toBeLessThanOrEqual(currentYear - 5);
  });

  it('should handle empty overrides', () => {
    const user = createTestUser({});
    expect(user.email).toContain('@');
  });
});
