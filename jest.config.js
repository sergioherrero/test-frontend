module.exports = {
  moduleNameMapper: {
    'testEnvironment': 'jsdom',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
};
