module.exports = {
  root: true,
  env: { es6: true },
  ignorePatterns: ['node_modules', 'build', 'coverage', '.eslintrc.js'],
  plugins: ['import', 'eslint-comments', 'functional'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:functional/lite',
    'prettier'
  ],
  globals: { BigInt: true, console: true, WebAssembly: true },
  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc' } }
    ],
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreCase: true }
    ],
    'import/order': 'off',
    'sort-imports': 'off',
    'functional/prefer-type-literal': 'off',
    'functional/prefer-readonly-type': 'off',
    'functional/no-class': 'off',
    'functional/no-this-expression': 'off',
    'functional/no-loop-statement': 'off',
    'functional/immutable-data': 'off',
    'functional/no-return-void': 'off',
    'functional/no-let': 'off',
    'functional/functional-parameters': 'off'
  }
}
