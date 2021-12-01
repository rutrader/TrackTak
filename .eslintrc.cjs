module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:eslint-comments/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/order': 'off',
    'sort-imports': 'off',
    'react/prop-types': 'off'
  }
}
