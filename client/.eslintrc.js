module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'react-app',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // 다른 규칙...
    'react/react-in-jsx-scope': 'off', // React 17 이후에서는 비활성화
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
