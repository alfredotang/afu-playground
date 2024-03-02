/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  globals: {
    React: 'readable',
  },
  settings: {
    'import/ignore': ['node_modules'],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          ['^node'],
          ['^react'],
          ['^next'],
          ['^@?\\w'],
          ['^'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'error',
  },
}
