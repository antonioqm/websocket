module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(@ionic/angular|@ionic/core|ionicons|@stencil/core|@angular/*)/)'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/src/test.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@env': '<rootDir>/src/environments/environment',
    '^src/(.*)$': '<rootDir>/src/$1' // Adiciona este mapeamento
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/environments/**',
    '!src/app/**/index.ts',
    '!src/app/**/*.{spec,test}.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.model.ts'
  ]
}


