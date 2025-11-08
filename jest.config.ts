export default {
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"]
  },
  clearMocks: true,
  coverageProvider: "v8",
  transformIgnorePatterns: [
    "node_modules/(?!(uuid)/)"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts']
};
