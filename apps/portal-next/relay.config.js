module.exports = {
  src: 'apps/portal-next',
  schema: 'apps/portal-next/schema.gql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  language: 'typescript',
  artifactDirectory: 'queries/__generated__',
};
