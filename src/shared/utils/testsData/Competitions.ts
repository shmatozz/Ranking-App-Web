import {Competition} from '@/entities/competition';

export function createTestCompetition(overrides: Partial<Competition> = {}): Competition {
  return {
    competitionUuid: 'default-uuid',
    name: 'Default Competition',
    date: '2023-05-19T00:00:00',
    location: 'Default Location',
    description: 'Default Description',
    contactLink: 'http://example.com',
    participantsType: "AMATEURS",
    attachment: "123.pdf",
    competitionType: 'official',
    ...overrides
  };
}
