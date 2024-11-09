//eslint configurations

//dependensies
import globals from 'globals'
import pluginJs from '@eslint/js'
import js from '@eslint/js'

export default [
  // recommended rules for JavaScript
  pluginJs.configs.recommended,
  { ignores: ['playwright-report/**', 'test-results/**'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        expect: 'readonly',
        test: 'readonly',
        vi: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // rules for this configuration
    rules: {
      // rules to improve code quality and consistency
      ...js.configs.recommended.rules,
    },
  },
]
