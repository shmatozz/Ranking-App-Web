import '@testing-library/jest-dom';

import { expect } from '@jest/globals';
import matchers from '@testing-library/jest-dom/matchers';

jest.mock('next-auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

expect.extend(matchers);
