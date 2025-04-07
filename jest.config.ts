import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom", // Explicitly set to jsdom for React testing

  // Add these important configurations:
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // or .js if not using TypeScript
  moduleNameMapper: {
    // Handle module aliases (if you use them in your next.config.js)
    '^@/(.*)$': '<rootDir>/$1',

    // Handle CSS imports (if you're using CSS modules)
    '\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },

  // Add these to properly transform Next.js specific syntax
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Important: ignore certain directories
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    'node_modules/(?!next-auth|@auth)/',
  ],

  // Optional but useful:
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.js'
  ],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default createJestConfig(config);
