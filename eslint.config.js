import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    ignores: [
      'packages/text-search-worker/src/textSearchWorkerMain.ts',
      'src/main.ts',
      'src/main.d.ts',
    ],
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'unicorn/no-process-exit': 'off',
      'no-console': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'jest/no-restricted-jest-methods': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
]
