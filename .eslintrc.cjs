module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: false,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    node: true,
    es2022: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn'
  }
};

