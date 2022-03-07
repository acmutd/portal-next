module.exports = {
  ...require('config/eslintrc-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig(.*)?.json',
  },
};
