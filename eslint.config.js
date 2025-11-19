import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
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
