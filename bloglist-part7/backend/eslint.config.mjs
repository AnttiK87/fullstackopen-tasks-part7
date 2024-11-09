//eslint configurations

//dependensies
import globals from 'globals'
import js from '@eslint/js'

export default [
  // recommended rules for JavaScript
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
  },
  {
    // directories to ignore
    ignores: ['dist/**', 'build/**'],
  },
]
