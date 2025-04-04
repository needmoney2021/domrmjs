module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '^jquery$': require.resolve('jquery'),
  },
};
