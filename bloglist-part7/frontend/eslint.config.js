import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
//import eslintPluginPrettier from 'eslint-plugin-prettier' // Lisää tämä
//import eslintConfigPrettier from 'eslint-config-prettier' // Lisää tämä

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        expect: 'readonly', // määrittele globaalit
        test: 'readonly',
        vi: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest', // Uusin ECMAScript-versio
        sourceType: 'module', // Käytetään moduuleja
        ecmaFeatures: {
          jsx: true, // Sallitaan JSX
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // Tämä kertoo ESLintille, että Reactin versio tunnistetaan automaattisesti paketeista
      },
    },
    plugins: {
      react: pluginReact,
      //prettier: eslintPluginPrettier, // Lisää Prettier plugin
    },
    rules: {
      // ESLintin suositellut säännöt
      ...pluginJs.configs.recommended.rules,
      // Reactin suositellut säännöt (flat-konfiguraatiosta)
      ...pluginReact.configs.flat.recommended.rules,
      // Omat lisäsäännöt
      'react/jsx-no-undef': 'error', // Varmistaa, että JSX-komponentit eivät ole määrittelemättömiä
      'react/react-in-jsx-scope': 'off', // Ei tarvitse aina olla JSX-syntaksissa
      'react/prop-types': 'warn', // tarkistetaan prop-tyyppejä
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }], // Hälyttää käyttämättömistä muuttujista
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      //'prettier/prettier': 'error', // Lisää tämä, jotta Prettierin virheet tunnistetaan ESLintissä
    },
  },
  //eslintConfigPrettier, // Lisää tämä, jotta Prettierin säännöt eivät mene ristiriitaan muiden sääntöjen kanssa
  { ignores: ['dist/**', 'build/**'] }, // Ignoroi build-kansiot
]
