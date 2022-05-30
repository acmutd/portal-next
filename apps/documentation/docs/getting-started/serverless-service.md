---
sidebar_position: 1
---

# Create a Serverless Service

To setup a new serverless service using AWS Step Function + SQS with Lambda Trigger in this repo, follow these steps:

### Install Serverless Framework CLI

- To install Serverless Framework CLI, run the following:

```
npm i -g serverless
```

### Directory Setup

- Create a new folder with the name of the service inside the `services` directory
  - e.g: If your service name is `vanity`, then create the new directory `services/vanity`.
- Run the following command and follow the prompt:

```
npm init --scope @acmutd -w ./services/vanity
```

:::important

- When run the above command, or any command afterward, make sure to replace `vanity` with the name of your service.

:::

- Run `Monorepo: sync workplace features` in VSCode command palette.

### Install Serverless Function Dependencies

- To install the dependencies that will be used by Serverless Framework, run the following command:

```
npm i -w @acmutd/vanity -D serverless-iam-roles-per-function serverless-create-global-dynamodb-table serverless-offline serverless-prune-plugin serverless-step-functions
```

- To install AWS Lambda related dependencies, run the following command:

```
npm i -w @acmutd/vanity aws-sdk aws-lambda
```

- In case root `package.json` does not have powertools, run the following command to install them:

```
npm i @dazn/lambda-powertools-cloudwatchevents-client @dazn/lambda-powertools-correlation-ids @dazn/lambda-powertools-logger @dazn/lambda-powertools-pattern-basic @dazn/lambda-powertools-lambda-client @dazn/lambda-powertools-sns-client @dazn/lambda-powertools-sqs-client @dazn/lambda-powertools-dynamodb-client @dazn/lambda-powertools-kinesis-client
```

### Setup Linting

- To install linting dependencies, run the following command:

```
npm i -D -w @acmutd/vanity eslint eslint-config-airbnb-base typescript-eslint eslint-plugin-import eslint-import-resolver-alias eslint-plugin-module-resolver @typescript-eslint/eslint-plugin @typescript-eslint/parser
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
  },
  "settings": {
    "import/resolve": {
      "typescript": {
        "alwaysTryType": true,
        "paths": "./tsconfig.json"
      },
      "alias": {
        "map": [
          ["@src", "./src"],
          ["@tests", "./tests"]
        ],
        "extensions": [".ts"]
      }
    }
  }
}
```

- Create a file named `.eslintignore` with the following configuration:

```
node_modules
.build
dist
generated
*.config.*
```

- Create a file named `.lintstagedrc.json` with the following configuration:

```json
{ "**/*.{js,ts,tsx}": ["eslint --fix", "prettier --write '**/*.{js,ts,tsx}'"] }
```

### Setup Jest for Testing

- To install Jest dependencies, run the following command:

```
npm i -w @acmutd/vanity -D jest babel-jest @babel/core @babel/preset-env @babel/preset-typescript
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
    "sls:offline": "sls offline --httpPort='5000'",
    "sls:deploy": "sls deploy",
    "sls:remove": "sls remove"
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
npm i -w @acmutd/vanity -D fork-ts-checker-webpack-plugin webpack-node-externals serverless-webpack
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

### Setup Typescript

- Create a `tsconfig.json` file with the following configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    // project options
    "lib": ["ES2020"], // specifies which default set of type definitions to use ("DOM", "ES6", etc)
    "outDir": "lib", // .js (as well as .d.ts, .js.map, etc.) files will be emitted into this directory.,
    "removeComments": true, // Strips all comments from TypeScript files when converting into JavaScript- you rarely read compiled code so this saves space
    "target": "ES2020", // Target environment. Most modern browsers support ES6, but you may want to set it to newer or older. (defaults to ES3)
    "module": "ESNext",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"],
    // Module resolution
    "baseUrl": "./", // Lets you set a base directory to resolve non-absolute module names.
    "esModuleInterop": true, // fixes some issues TS originally had with the ES6 spec where TypeScript treats CommonJS/AMD/UMD modules similar to ES6 module
    "moduleResolution": "node", // Pretty much always node for modern JS. Other option is "classic"
    "paths": {
      "@src/*": ["src/*"],
      "@tests/*": ["tests/*"]
    }, // A series of entries which re-map imports to lookup locations relative to the baseUrl

    // Source Map
    "sourceMap": true, // enables the use of source maps for debuggers and error reporting etc
    "sourceRoot": "/", // Specify the location where a debugger should locate TypeScript files instead of relative source locations.

    // Strict Checks
    "alwaysStrict": true, // Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.
    "allowUnreachableCode": false, // pick up dead code paths
    "noImplicitAny": true, // In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type.
    "strictNullChecks": true, // When strictNullChecks is true, null and undefined have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

    // Linter Checks
    // "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true, // accessing index must always check for undefined
    // "noUnusedLocals": true, // Report errors on unused local variables.
    // "noUnusedParameters": true, // Report errors on unused parameters in functions

    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowSyntheticDefaultImports": true
  },
  "typeRoots": ["./node_modules/@types", "../../node_modules/@types"],
  "include": ["./**/*.ts"],
  "exclude": [
    "node_modules/**/*",
    ".serverless/**/*",
    ".webpack/**/*",
    "_warmup/**/*",
    ".vscode/**/*",
    "*.config.js"
  ],
  "extends": "../../tsconfig.json"
}
```

### Configure Serverless YML file

- Create the `serverless.yml` file with the following configuration:

```yml
service: vanity

custom:
  webpack:
    webpackConfig: webpack.config.js
    includeModules: true
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
  - serverless-step-functions

provider:
  name: aws
  region: us-east-1
  runtime: nodejs14.x
  memorySize: 256
```

### Configure a SQS Resource

- Add the following configuration into `serverless.yml` file:

```yml
resources:
  Resources:
    VanitySQS:
      Type: AWS::SQS::Queue
```

### Configure a Step Function workflow

- Add the following configuration into `serverless.yml` file:

```yml
stepFunctions:
  stateMachines:
    VanitySF:
      name: VanityStepFunction
      definition:
        StartAt: AddPayloadToSQS
        States:
          AddPayloadToSQS:
            Type: Task
            Resource: arn:aws:states:::sqs:sendMessage.waitForTaskToken
            Parameters:
              QueueUrl:
                Ref: VanitySQS
              MessageBody:
                payload.$: '$'
                taskToken.$: '$$.Task.Token'
            End: true
```

### Create a Serverless function

- Create file `src/handler.ts`, in which will contain the serverless function that be called when a message is added into the SQS.
- An example of the `src/handler.ts` will be as follow:

```ts
const baseHandler = async (
  event: ValidatedSQSEvent<VanityReqBody>,
  context: Context,
  callback: Callback
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record): Promise<PromiseResult<any, any>> => {
      const stepFunction = new aws.StepFunctions();
      const { taskToken, payload: vanityReqData } = record.body;

      try {
        Log.info(`Generating Vanity Link`);
        const { success, data } = await buildVanityLink(vanityReqData);
        Log.info(`Vanity Link Generation Success Status: ${success ? 'OK' : 'Failed'}`, { data });
        Log.info(
          `Sending data to Step Function with the following ARN: ${process.env.SENDGRID_ARN!}`
        );
        if (!process.env.SENDGRID_ARN) {
          return stepFunction
            .sendTaskFailure({ taskToken, error: 'No ARN for SendGrid Step Function' })
            .promise();
        }
        await stepFunction
          .startExecution({
            stateMachineArn: process.env.SENDGRID_ARN!,
            name: uuid(),
            input: JSON.stringify({
              from: 'development@acmutd.co',
              from_name: 'ACM Development',
              to: vanityReqData.email,
              template_id: process.env.VANITY_TEMPLATE_ID!,
              dynamicSubstitutions: {
                preheader: 'Successful Generation of Vanity Link',
                subject: 'Vanity Link Confirmation',
                vanity_link: `${vanityReqData.subdomain}.${vanityReqData.primaryDomain}/${vanityReqData.slashtag}`,
                first_name: vanityReqData.firstName,
                last_name: vanityReqData.lastName,
              },
            }),
          })
          .promise();
        return stepFunction
          .sendTaskSuccess({
            taskToken,
            output: '"Task execution successful"',
          })
          .promise();
      } catch (error) {
        console.log(error);
        stepFunction.sendTaskFailure({ taskToken }, (err, data) => {
          console.log(err);
        });
      }
    })
  );
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
```

- Add the following into `serverless.yml`:

```yml
functions:
  vanity:
    handler: src/handler.main
    iamRoleStatements:
      - Effect: 'Allow'
        Action:
          - states:SendTaskSuccess
          - states:SendTaskFailure
          - states:StartExecution
        Resource: '*'
    events:
      - sqs:
          arn:
            Fn::GetAtt: [VanitySQS, Arn]
    environment:
      URL_ROOT: ${env:URL_ROOT}
      REBRANDLY_APIKEY: ${env:REBRANDLY_APIKEY}
      REBRANDLY_APIKEY2: ${env:REBRANDLY_APIKEY2}
      REBRANDLY_URL: ${env:REBRANDLY_URL}
      SENDGRID_ARN: ${env:SENDGRID_ARN}
      VANITY_TEMPLATE_ID: ${env:VANITY_TEMPLATE_ID}
```

### Deploy Service

- To deploy service, run the following command:

```
npm run sls:deploy
```

### Delete Service

- To remove a service from AWS, run the following command:

```
npm run sls:remove
```

### Full YML Configuration

- After following this tutorial, the `serverless.yml` should look similar to the following:

```yml
service: vanity

custom:
  webpack:
    webpackConfig: webpack.config.js
    includeModules: true
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
  - serverless-step-functions

provider:
  name: aws
  region: us-east-1
  runtime: nodejs14.x
  memorySize: 256

resources:
  Resources:
    VanitySQS:
      Type: AWS::SQS::Queue

stepFunctions:
  stateMachines:
    VanitySF:
      name: VanityStepFunction
      definition:
        StartAt: AddPayloadToSQS
        States:
          AddPayloadToSQS:
            Type: Task
            Resource: arn:aws:states:::sqs:sendMessage.waitForTaskToken
            Parameters:
              QueueUrl:
                Ref: VanitySQS
              MessageBody:
                payload.$: '$'
                taskToken.$: '$$.Task.Token'
            End: true

functions:
  vanity:
    handler: src/handler.main
    iamRoleStatements:
      - Effect: 'Allow'
        Action:
          - states:SendTaskSuccess
          - states:SendTaskFailure
          - states:StartExecution
        Resource: '*'
    events:
      - sqs:
          arn:
            Fn::GetAtt: [VanitySQS, Arn]
    environment:
      URL_ROOT: ${env:URL_ROOT}
      REBRANDLY_APIKEY: ${env:REBRANDLY_APIKEY}
      REBRANDLY_APIKEY2: ${env:REBRANDLY_APIKEY2}
      REBRANDLY_URL: ${env:REBRANDLY_URL}
      SENDGRID_ARN: ${env:SENDGRID_ARN}
      VANITY_TEMPLATE_ID: ${env:VANITY_TEMPLATE_ID}
```
