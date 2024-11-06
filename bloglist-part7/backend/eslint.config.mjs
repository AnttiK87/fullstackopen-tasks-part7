//eslint configurations

//dependensies
import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  // recommended rules for JavaScript
  js.configs.recommended, 
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs", 
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      // plugins for this configuration
      '@stylistic/js': stylisticJs
    },
    // rules for this configuration
    rules: {
      // Stylistic rules
      '@stylistic/js/indent': [
        'error',
        2
      ],
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
      // rules to improve code quality and consistency
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
    },
  },
  { 
    // directories to ignore
    ignores: ["dist/**", "build/**"],
  },
]
