import { getAvgRating } from '@/shared/lib/data/members';
import { UserShort } from '@/entities/user';
import {createTestUser} from "@/shared/utils";

describe('getAvgRating', () => {
  it('should calculate average for integer ratings', () => {
    const members: UserShort[] = [
      createTestUser({ rating: 5 }),
      createTestUser({ rating: 7 }),
      createTestUser({ rating: 3 }),
    ];

    expect(getAvgRating(members)).toBe(5); // (5+7+3)/3 = 5
  });

  it('should calculate average for float ratings', () => {
    const members: UserShort[] = [
      createTestUser({ rating: 4.5 }),
      createTestUser({ rating: 3.5 }),
    ];

    expect(getAvgRating(members)).toBe(4); // (4.5+3.5)/2 = 4
  });

  it('should return same rating for single user', () => {
    const members: UserShort[] = [
      createTestUser({ rating: 10 })
    ];

    expect(getAvgRating(members)).toBe(10);
  });

  it('should throw error for empty array', () => {
    const members: UserShort[] = [];

    expect(getAvgRating(members)).toBe("-");
  });

  it('should handle negative ratings', () => {
    const members: UserShort[] = [
      createTestUser({ rating: -2 }),
      createTestUser({ rating: 4 })
    ];

    expect(getAvgRating(members)).toBe(1); // (-2+4)/2 = 1
  });

  it('should handle large numbers', () => {
    const members: UserShort[] = [
      createTestUser({ rating: 1000000 }),
      createTestUser({ rating: 2000000 }),
    ];

    expect(getAvgRating(members)).toBe(1500000);
  });
});
