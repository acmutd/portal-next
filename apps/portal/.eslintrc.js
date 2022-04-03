module.exports = {
  ...require('@acmutd/config/eslintrc-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig(.*)?.json',
  },
};
