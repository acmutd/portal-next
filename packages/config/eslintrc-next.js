module.exports = {
  root: true,
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  ignorePatterns: [
    '*.config.js',
    '**/*',
    '*.config.js',
    '.turbo',
    '.next',
    'public',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@next/next/no-html-link-for-pages': ['error', './pages'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'no-underscore-dangle': 'off',
    'react/require-default-props': 'off',
  },
};
