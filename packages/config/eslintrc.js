module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  ignorePatterns: ['**/*', '*.config.js', '.turbo', '.next', 'public'],
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
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
};
