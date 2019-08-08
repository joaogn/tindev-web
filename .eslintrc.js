module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    extends: [
      'react-app',
      'airbnb',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['react', 'import', 'jsx-a11y'],
    rules: {
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/interface-name-prefix': 0,
      'react/destructuring-assignment': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-interface': 0,
      'no-underscore-dangle': 0,
      'react/no-access-state-in-setstate': 0,
      'spaced-comment': 0
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {},
      },
    },
  };