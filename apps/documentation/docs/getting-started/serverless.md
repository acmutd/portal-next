---
sidebar_position: 0
---

# Create a Serverless Service

To setup a new serverless service in this repo, follow these steps:

### Install Serverless Framework CLI

- To install Serverless Framework CLI, run the following:

```
npm i -g serverless
```

### Directory Setup

- Create a new folder with the name of the service inside the `services` directory
  - e.g: If your service name is `email`, then create the new directory `services/email`.
- Run the following command and follow the prompt:

```
npm init --scope @acmutd -w ./services/email
```

:::important

- When run the above command, or any command afterward, make sure to replace `email` with the name of your service.

:::

- Run `Monorepo: sync workplace features` in VSCode command palette.

### Install Serverless Function Dependencies

- To install the dependencies that will be used by Serverless Framework, run the following command:

```
npm i -w @acmutd/email -D serverless-iam-roles-per-function serverless-create-global-dynamodb-table serverless-offline serverless-prune-plugin
```

- To install AWS Lambda related dependencies, run the following command:

```
npm i -w @acmutd/email aws-sdk aws-lambda
```

- In case root `package.json` does not have powertools, run the following command to install them:

```
npm i @dazn/lambda-powertools-cloudwatchevents-client @dazn/lambda-powertools-correlation-ids @dazn/lambda-powertools-logger @dazn/lambda-powertools-pattern-basic @dazn/lambda-powertools-lambda-client @dazn/lambda-powertools-sns-client @dazn/lambda-powertools-sqs-client @dazn/lambda-powertools-dynamodb-client @dazn/lambda-powertools-kinesis-client
```

### Setup Linting

- To install linting dependencies, run the following command:

```
npm i -D -w @acmutd/email eslint eslint-config-airbnb-base typescript-eslint eslint-plugin-import eslint-import-resolver-alias eslint-plugin-module-resolver @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- Create a file named `.eslintrc.json` in your service directory with the following configurations:

```json
{
  "extends": ["../../.eslintrc.json"],
  "parserOptions": {
    "tsconfigRootDir": ".",
    "project": "./tsconfig(.*)?.json"
  },
  "env": {
    "node": true
  },
  "root": true,
  "rules": {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-var-requires": "off",
    "global-require": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off"
  }
}
```

### Setup Jest for Testing

- To install Jest dependencies, run the following command:

```
npm i -w @acmutd/email -D jest babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

- Create a file named `babel.config.js` with the following configuration:

```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};
```

### Configure Scripts

- Configure the `scripts` object in the `package.json` file as follow:

```json
"scripts": {
    "test": "NODE_ENV=test ../../node_modules/.bin/jest --ci --verbose",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "buildtest": "tsc --noEmit",
    "sls:offline": "sls offline --httpPort='5000'"
},
```

:::important
If your service is dependent on Doppler environment variable, the command for `sls:offline` should be the following:

```
doppler run -- sls offline
```

:::

### Configure Webpack

- To install dependencies for Webpack, run the following command:

```
npm i -w @acmutd/email -D fork-ts-checker-webpack-plugin webpack-node-externals serverless-webpack
```

- Create a file named `webpack.config.js` with the following configurations:

```js
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.ts'],
    // symlinks: false,
    // cacheWithContext: false,
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  // experiments: {
  //   topLevelAwait: true,
  // },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'babel-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
          ],
          plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'babel-plugin-parameter-decorator',
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
          ],
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
```

### Configure Serverless YML file

- Create the `serverless.yml` file with the following configuration:

```yml
service: email

custom:
  webpack:
    webpackConfig: webpack.config.js
    includeModules:
      forceExclude:
        - aws-sdk
    packager: npm
    packagerOptions:
      lockFile: '../../package-lock.json'
  prune:
    automatic: true
    number: 3

plugins:
  - serverless-offline
  - serverless-webpack
  - serverless-iam-roles-per-function
  - serverless-create-global-dynamodb-table
  - serverless-prune-plugin

provider:
  name: aws
  region: us-east-1
  runtime: nodejs14.x
  memorySize: 256
  httpApi:
    payload: '2.0'
    cors: true
```

### Create a Serverless function

- Create file `src/handler.ts`, in which will contain the serverless function.
- An example of the `src/handler.ts` will be as follow:

```ts
export const sendEmailHandler = async (event: APIGatewayProxyEvent) => {
  const eventBody = JSON.parse(event.body || '{}') as SendEmailConfig;
  if (!validateRequest(eventBody)) {
    return {
      msg: 'Missing fields',
    };
  }

  const sendEmailStatus = await sendEmail(eventBody);
  return {
    msg: sendEmailStatus ? 'Successfully sent email' : 'Unsucessfully sent email',
  };
};
```

- Add the following into `serverless.yml`:

```yml
functions:
  sendgrid:
    handler: src/handler.sendEmailHandler
    events:
      - httpApi:
          # This is endpoint for function
          path: /email
          # This is HTTP method
          method: post
```

### Run the function locally

- To run an emulator of the function run the following command from service directory:

```
npm run sls:offline
```

- Another way to run the service would be the following command:

```
npx turbo run sls:offline --scope="@acmutd/email"
```

- The function should now be accesible at `http://localhost:5000/email`

:::note

- `email` should be replace with your path name specified in the `serverless.yml` file.

:::
