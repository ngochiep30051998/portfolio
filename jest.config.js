module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^@/(.*)$': '<rootDir>/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^context/(.*)$': '<rootDir>/context/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
    '^services/(.*)$': '<rootDir>/services/$1',
    '^app/(.*)$': '<rootDir>/app/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/out/'
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
};