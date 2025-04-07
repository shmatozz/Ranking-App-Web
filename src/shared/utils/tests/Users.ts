import {UserShort} from "@/entities/user";
import {faker} from "@faker-js/faker/locale/ru";

export function createTestUser(overrides: Partial<UserShort> = {}): UserShort {
  const defaultUser: UserShort = {
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "human" }),
    emergencyPhone: faker.phone.number({ style: "human" }),
    birthDate: faker.date.birthdate({ min: 5, max: 65, mode: 'age' }).toISOString().split('T')[0],
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
    rating: faker.number.int({ min: 0, max: 1000 }),
    image: faker.image.avatar(),
  };

  return {
    ...defaultUser,
    ...overrides,
  };
}

