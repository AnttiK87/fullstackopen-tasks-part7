//eslint configurations

//dependensies
import globals from "globals"
import pluginJs from "@eslint/js"
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'


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
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      // plugins for this configuration
      '@stylistic/js': stylisticJs,
    },
    // rules for this configuration
    rules: {
    // rules to improve code quality and consistency
    ...js.configs.recommended.rules,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 0,
    '@stylistic/js/indent': [
      'error',
      2
    ],
    // Stylistic rules
    '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
    '@stylistic/js/quotes': [
      'error',
      'single'
    ],
    '@stylistic/js/semi': [
      'error',
      'never'
    ],
  },
 },
 {
  files: ['**/*.test.{js,ts,jsx,tsx}'],
  languageOptions: {
    globals: {
      // For preventing the testing commands to cause errors
      expect: 'readonly',
      test: 'readonly',
      vi: 'readonly',
    },
  },
},
];